import os
import boto3
import json
import tempfile
import csv
import time
# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from bedrock import get_llm
from custom_errors  import LLMNotLoadedException,StrategyNotFoundException,QueryGenerationException,FileNotFound,InvalidWorkFlowJson
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
    generate_metrics= config.get("generate_metrics")
    sql_validation_strategy = sql_generation_config.get('strategy', WorkflowStrategy.AUTO)
    text_to_sql_query_generation_llm = get_llm(sql_generation_config)
    if text_to_sql_query_generation_llm is None:
        raise LLMNotLoadedException("text_to_sql_query_generation_llm")

    db= get_db_connection(db_name)
    table_info = db.get_usable_table_names()
    logger.info(f"table_info :: {db.get_usable_table_names()}" ) 
    sql_generation_strategy = sql_generation_config.get('few_shots_strategy', FewShotsStrategy.STATIC)

    reformulated_user_question = event.get("reformulated_user_question")    
    original_user_question = event.get("user_question")  
    unique_id = event.get("question_unique_id")  
    execution_start_time = event.get("execution_start_time")  
    
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
        'result':validated_sql_query,
        'sql_validation_strategy':sql_validation_strategy,
        
    }
    end_time = time.time()
    if end_time is not None and execution_start_time is not None:
        query_generation_time = end_time - execution_start_time
    else:
        query_generation_time = None

    generate_metrics_strategy = generate_metrics.get(
        'strategy', WorkflowStrategy.DISABLED)
    metrics_file_name = generate_metrics.get(
        'metrics_file_name', "metric/texttosql_metrics.csv")
    if generate_metrics_strategy == WorkflowStrategy.AUTO:
        metrics_data={
                'user_question':original_user_question,
                'reformulated_question':reformulated_user_question,
                'unique_id':unique_id,
                'generated_sql': validated_sql_query,
                'expected_sql': '',
                'generated_sql_correct':'' ,
                'generated_sql_match_pinned_sql': '',
                'query_generation_time':  query_generation_time,
                'generated_result_correct': ''
            }
        
        save_metrics(metrics_data, metrics_file_name)
    else:
        logger.info('Metrics generation strategy disabled...')
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
   
    
    few_shots_file_path = sql_generation_config.get("few_shots_examples", None)
    
    if few_shots_file_path is None:
        
        raise InvalidWorkFlowJson("few_shots_examples not found in sql_generation_config ")
    else:
        keys = [few_shots_file_path]
        file_contents = load_files_from_s3(keys,config_bucket)
    
    if few_shots_file_path in file_contents:
        few_shots = json.loads(file_contents[few_shots_file_path])    
    else:
        raise ValueError(f"{few_shots_file_path} not found in file_contents")

    
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
    guardrails =  " Do not suggest any query with write operation for example no UPDATE, DELETE, TRUNCATE, ALTER, DROP key word in the suggested query."
    prompt_prefix = f"You are a {db_name} expert. This is the error {error} in this sql {generated_sql}. To correct this error, please generate an alternative syntactically correct {db_name} query for the question {user_question} and write it between the xml tags <query></query>."+guardrails
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
        table_info (str): Information about the relevant tables.

    Returns:
        PromptTemplate: The generated few-shot prompt for regular SQL generation.
    """
    logger.info("Running LLM against few shots prompt")

    top_k = 5
    guardrails =  " Do not suggest any query with write operation for example no UPDATE, DELETE, TRUNCATE, ALTER, DROP key word in the suggested query."
    example_prompt = PromptTemplate.from_template("User input: {input}\n<query>{query}</query>")
    db_expert=f'You are a {db_name} expert. Given an input question, create a syntactically correct {db_name} query to run and write it between the xml tags <query></query>'+guardrails
    prompt_prefix = db_expert+" \n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries." 
    prompt_suffix = "Unless otherwise specificed, do not return more than {top_k} rows. User input: {input}\n<query> </query>"
    logger.info(f"query prompt :: {prompt_prefix} {prompt_suffix}")
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

        logger.info(f"llm response .. {response}")
        generated_sql_query = extract_sql_query(response)
        if generated_sql_query:
            logger.info(f'Generated SQL query: {generated_sql_query}')
        else:
            print("couldn't parse any genearted sql, returning...")
            generated_sql_query = None
    except Exception as e:
        logger.error(f"Error generating SQL query: {e}")
        raise QueryGenerationException(e)

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
            raise FileNotFound(f"Error loading file {key} from S3 {bucket_name}: {e}")

    logger.info(f"Loaded {len(file_contents)} files from S3")   
    return file_contents

def save_metrics(data, file_key):
    columns = list(data.keys())
    unique_id = data['unique_id']

    # List files in the S3 bucket
    bucket_objects = s3.list_objects_v2(Bucket=config_bucket)
    file_exists = False

    if 'Contents' in bucket_objects:
        for obj in bucket_objects['Contents']:
            if obj['Key'] == file_key:
                file_exists = True
                break

    if file_exists:
        # Download the file from S3
        with tempfile.NamedTemporaryFile(mode='w+b', delete=False) as temp_file:
            s3.download_fileobj(config_bucket, file_key, temp_file)
            temp_file.seek(0)

        with open(temp_file.name, 'r') as csvfile:
            reader = csv.DictReader(csvfile)
            rows = list(reader)
    else:
        rows = []

    row_exists = False
    for row in rows:
        if row['unique_id'] == unique_id:
            row_exists = True
            rows.remove(row)
            rows.append(data)
            break

    if not row_exists:
        rows.append(data)

    # Write the updated data to a temporary file
    with tempfile.NamedTemporaryFile(mode='w', delete=False) as temp_file:
        writer = csv.DictWriter(temp_file, fieldnames=columns)
        writer.writeheader()
        writer.writerows(rows)

    # Upload the temporary file to S3
    with open(temp_file.name, 'rb') as file_data:
        s3.upload_fileobj(file_data, config_bucket, file_key)

    os.unlink(temp_file.name)
    print(f"Data saved to s3://{config_bucket}/{file_key}")

