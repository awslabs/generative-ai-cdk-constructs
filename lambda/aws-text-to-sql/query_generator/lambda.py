import os
import boto3
import json
# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from bedrock import get_llm
from custom_errors  import LLMNotLoadedException,StrategyNotFoundException,QueryGenerationException,FileNotFound
from db_helper  import get_db_connection
from config_types import  FewShotsStrategy,WorkflowStrategy,ConfigFilesName
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate,ChatPromptTemplate
from langchain.chains import create_sql_query_chain
from langchain_core.output_parsers import StrOutputParser

from parser import extract_sql_query

logger = Logger(service="QUERY_GENERATOR")
tracer = Tracer(service="QUERY_GENERATOR")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_GENERATOR")

s3 = boto3.client('s3')

db_name = os.environ["DB_NAME"]
config_bucket = os.environ["CONFIG_BUCKET"]


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info(f"Starting query Generator with input :: {event}" )
    
    keys = [ConfigFilesName.WORKFLOW_JSON]
    file_contents = load_files_from_s3(keys,config_bucket)
    
    if ConfigFilesName.WORKFLOW_JSON in file_contents:
       config = json.loads(file_contents[ConfigFilesName.WORKFLOW_JSON])
    else:
        raise ValueError(f"{ConfigFilesName.WORKFLOW_JSON} not found in file_contents")

    
    sql_generation_config = config.get("sql_generation")
    execute_sql_config = config.get("execute_sql")
    sql_validation_strategy = sql_generation_config.get('strategy', WorkflowStrategy.AUTO)
    execute_sql_strategy = execute_sql_config.get('strategy', WorkflowStrategy.DISABLED)
    text_to_sql_query_generation_llm = get_llm(sql_generation_config)
    if text_to_sql_query_generation_llm is None:
        raise LLMNotLoadedException("text_to_sql_query_generation_llm")

    db= get_db_connection(db_name)
    table_info = db.get_usable_table_names()
    logger.info(f"table_info :: {db.get_usable_table_names()}" ) 
    sql_generation_strategy = sql_generation_config.get('few_shots_strategy', FewShotsStrategy.STATIC)

    reformulated_user_question = event.get("reformulated_user_question")    
    original_user_question = event.get("user_question")  
    
    logger.info(f' reforumlated question :: {reformulated_user_question}')
    logger.info(f' original question ::{original_user_question}')

    if sql_generation_strategy == FewShotsStrategy.STATIC:
        # Static strategy means data is loaded from a user-provided file
        few_shots_prompt = get_fewshots_static_prompt(event, sql_generation_config,
                                                      original_user_question,table_info)
    
    elif sql_generation_strategy == FewShotsStrategy.DYNAMIC:
        few_shots_prompt = get_fewshots_dynamic_prompt()
    
    else:
        raise StrategyNotFoundException(sql_generation_strategy)

    
    generated_sql_query = generate_sql_from_text(text_to_sql_query_generation_llm,
                                                 reformulated_user_question,db,few_shots_prompt)
    if generated_sql_query is None:
        logger.error('Query generation failed')
   
    if (sql_validation_strategy != WorkflowStrategy.DISABLED):
        validated_sql_query = valiate_sql(text_to_sql_query_generation_llm,sql_validation_strategy,
                                          generated_sql_query,db)
    else:
        logger.info('Semantic validation strategy not enabled, running sql query as is')

    response = {
        'validated_sql_query':validated_sql_query,
        'sql_validation_strategy':sql_validation_strategy,
        'execute_sql_strategy':execute_sql_strategy
    }

    return response


def get_fewshots_dynamic_prompt():
    logger.info("Not implemented right now")


def get_fewshots_static_prompt(event, sql_generation_config,original_user_question,table_info):
    """
    Generate a few-shot prompt for SQL generation based on the provided event,
    configuration,and user question.

    Args:
        event (dict): The event data containing information about the generated query 
        and query status.
        sql_generation_config (dict): The configuration for SQL generation,
        including the maximum number of few-shots.
        orignal_user_question (str): The user's original question.
        table_info (str): Information about the relevant tables.

    Raises:
        ValueError: If the few-shot configuration file is not found in the file contents.

    Returns:
        str: The generated few-shot prompt.
    """
    few_shots_config = ConfigFilesName.FEW_SHOTS_JSON
    file_contents = load_files_from_s3([few_shots_config], config_bucket)

    if ConfigFilesName.FEW_SHOTS_JSON in file_contents:
        few_shots = json.loads(file_contents[ConfigFilesName.FEW_SHOTS_JSON])
    else:
        raise ValueError(f"{ConfigFilesName.FEW_SHOTS_JSON} not found in file_contents")

    
    query_status = event.get("queryStatus", None)

    autocorrect = False
    if query_status is not None and query_status.get("Payload").get("status") == "QUERY_ERROR":
        autocorrect = True
        error_message = query_status.get("Payload").get("result")
        generated_sql_query = event.get("generated_query", None)
        if generated_sql_query is None or generated_sql_query == "":
            logger.info("generated_sql_query is not found. Generating alternative sql...")
    else:
        logger.info("autocorrect is False, execute query without autocorrect")

    max_number_few_shots = sql_generation_config.get("few_shots_max", 5)

    # Generate the few-shot prompt based on the autocorrect flag
    if autocorrect:
        few_shots_prompt = get_fewshots_static_autocorrect_prompt(
            few_shots,
            max_number_few_shots,
            original_user_question,
            error_message,
            generated_sql_query,
            table_info
        )
    else:
        few_shots_prompt = get_fewshots_static_regular_prompt(
            few_shots,
            max_number_few_shots,
            table_info
        )

    return few_shots_prompt
    
    
def get_fewshots_static_autocorrect_prompt(few_shots, max_number_few_shots, user_question,
                                           error, generated_sql, table_info ):
    """
    Generate a few-shot prompt for SQL auto-correction based on the provided parameters.

    Args:
        few_shots (list): A list of few-shot examples.
        max_number_few_shots (int): The maximum number of few-shots to include in the prompt.
        user_question (str): The user's original question.
        error (str): The error message associated with the generated SQL query.
        generated_sql (str): The generated SQL query that caused the error.
        table_info (str): Information about the relevant tables.

    Returns:
        PromptTemplate: The generated few-shot prompt for SQL auto-correction.
    """
    logger.info("Autocorrect is enabled, running LLM against few shots prompt")

    example_prompt = PromptTemplate.from_template("User input: {input}\n<query>{query}</query>")
    prompt_prefix = f"You are a {db_name} expert. This is the error {error} in this sql {generated_sql}. To correct this error, please generate an alternative syntactically correct {db_name} query for the question {user_question} and write it between the xml tags <query></query>."
    prompt_suffix = "User input: {input}\n<query> </query>"
    prompt = FewShotPromptTemplate(
        examples=few_shots[:max_number_few_shots],
        example_prompt=example_prompt,
        prefix=prompt_prefix + " Unless otherwise specificed, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries.",
        suffix=prompt_suffix,
        input_variables=["input", "top_k", "table_info"],
    )

    return prompt



def get_fewshots_static_regular_prompt(few_shots, max_number_few_shots, table_info):
    """
    Generate a few-shot prompt for regular SQL generation based on the 
    provided parameters.

    Args:
        few_shots (list): A list of few-shot examples.
        max_number_few_shots (int): The maximum number of few-shots to include in the prompt.
        top_k (int): The maximum number of rows to return in the SQL query.
        table_info (str): Information about the relevant tables.

    Returns:
        PromptTemplate: The generated few-shot prompt for regular SQL generation.
    """
    logger.info("Running LLM against few shots prompt")

    example_prompt = PromptTemplate.from_template("User input: {input}\n<query>{query}</query>")
    prompt_prefix = "You are a SQLlite expert. Given an input question, create a syntactically correct SQLlite query to run and write it between the xml tags <query></query>. Unless otherwise specificed, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries."
    prompt_suffix = "User input: {input}\n<query> </query>"
    prompt = FewShotPromptTemplate(
        examples=few_shots[:max_number_few_shots],
        example_prompt=example_prompt,
        prefix=prompt_prefix,
        suffix=prompt_suffix,
        input_variables=["input", "top_k", "table_info"],
    )

    return prompt

    

def generate_sql_from_text(text_to_sql_query_generation_llm,user_question, db, prompt):
    """
    Generate a SQL query from the given user question using a language model 
    and the provided configurations.

    Args:
        text_to_sql_query_generation_llm (LLM): The language model for 
        SQL query generation.
        db (Database): The database object.
        prompt (str): The prompt to use for SQL query generation.
        user_question (str): The user's natural language question.

    Returns:
        str: The generated SQL query, or None if no query was generated.
    """
    # Get the language model for SQL query generation
    try:
        chain = create_sql_query_chain(text_to_sql_query_generation_llm, db, prompt)
        logger.info(f"question :: {user_question}")
        response = chain.invoke({"question": user_question})

        generated_sql_query = extract_sql_query(response)
        if generated_sql_query:
            logger.info(f'Generated SQL query: {generated_sql_query}')
        else:
            print("couldn't parse any genearted sql, returning...")
    except Exception as e:
        raise QueryGenerationException("generated_sql_query")

    logger.info(f' return Generated SQL query: {generated_sql_query}')
    return generated_sql_query




def valiate_sql(text_to_sql_query_generation_llm,sql_validation_strategy,generated_sql_query,db):
    system = """Double check the user's {dialect} query for common mistakes, including:
                - Using NOT IN with NULL values
                - Using UNION when UNION ALL should have been used
                - Using BETWEEN for exclusive ranges
                - Data type mismatch in predicates
                - Properly quoting identifiers
                - Using the correct number of arguments for functions
                - Casting to the correct data type
                - Using the proper columns for joins

                If there are any of the above mistakes, rewrite the query. 
                If there are no mistakes, just reproduce the original query.

                Output the final SQL query only between tags <query> </query>."""


    prompt = ChatPromptTemplate.from_messages(
                [("system", system), ("human", "{query}")]
                ).partial(dialect=db.dialect)
    validation_chain = prompt | text_to_sql_query_generation_llm | StrOutputParser()
    response = validation_chain.invoke({"query": generated_sql_query})
    validated_sql_query = extract_sql_query(response)
    logger.info(f'Validated SQL query: {validated_sql_query}')      
                
    return validated_sql_query



def load_files_from_s3(keys, bucket_name):
    """
    Load files from an Amazon S3 bucket based on a list of keys and a prefix.

    Args:
        keys (list): A list of object keys (file paths) to load.
        bucket_name (str): The name of the S3 bucket.

    Returns:
        dict: A dictionary containing the file contents, with file paths as keys.
    """
    file_contents = {}
    
    # Iterate over the list of keys
    for key in keys:
        try:
            logger.info(f"Loading files from S3: {bucket_name} key {key} ")   
            file_obj = s3.get_object(Bucket=f"{bucket_name}", Key=key)
            file_data = file_obj['Body'].read().decode('utf-8')

            file_contents[key] = file_data
        except Exception as e:
            raise FileNotFound(f"Error loading file from S3: {e}")

    logger.info(f"Loaded {len(file_contents)} files from S3")   
    return file_contents

