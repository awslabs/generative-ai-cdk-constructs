import os


# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from bedrock import get_llm
from custom_errors  import LLMNotLoadedException,StrategyNotFoundException,QueryGenerationException
from db_helper  import get_db_connection
from config_types import  FewShotsStrategy,WorkflowStrategy
from langchain_core.prompts import FewShotPromptTemplate, PromptTemplate,ChatPromptTemplate
from langchain.chains import create_sql_query_chain
from langchain_core.output_parsers import StrOutputParser

from parser import extract_sql_query

logger = Logger(service="QUERY_CONFIG")
tracer = Tracer(service="QUERY_CONFIG")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_CONFIG")




@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info(f"Starting query Generator with input :: {event}" )
    
    sql_generation_config = event.get("sql_generation")
    db_name = event.get("db_name")
    user_question = event.get("user_question")
    few_shots_config = event.get("few_shots")   
    sql_generation_config = event.get("sql_generation_config")
    
    sql_validation_strategy = sql_generation_config.get('strategy', WorkflowStrategy.AUTO)

    text_to_sql_query_generation_llm = get_llm(sql_generation_config)
    if text_to_sql_query_generation_llm is None:
        raise LLMNotLoadedException("text_to_sql_query_generation_llm")

    db= get_db_connection(db_name)
    table_info = db.get_usable_table_names()
    logger.info(f"table_info :: {db.get_usable_table_names()}" ) 
    sql_generation_strategy = sql_generation_config.get('few_shots_strategy', FewShotsStrategy.STATIC)

    if sql_generation_strategy == FewShotsStrategy.STATIC:
        max_number_few_shots = sql_generation_config.get("few_shots_max", 5)
        few_shots_prompt = get_fewshots_static_prompt(few_shots_config,max_number_few_shots)
    elif sql_generation_strategy == FewShotsStrategy.DYNAMIC:
        few_shots_prompt = get_fewshots_dynamic_prompt()
    else:
        raise StrategyNotFoundException(sql_generation_strategy)

    generated_sql_query = generate_sql_from_text(text_to_sql_query_generation_llm,user_question,db,few_shots_prompt)
    if generated_sql_query is None:
        logger.error('Query generation failed')
   
    if (sql_validation_strategy != WorkflowStrategy.DISABLED):
        validated_sql_query = valiate_sql(text_to_sql_query_generation_llm,sql_validation_strategy,generated_sql_query,db)
    else:
        logger.info('Semantic validation strategy not enabled, running sql query as is')

    response = {
        'validated_sql_query':validated_sql_query,
        'sql_validation_strategy':sql_validation_strategy
    }

    return response


def get_fewshots_dynamic_prompt():
    logger.info("Not implemented right now")


def get_fewshots_static_prompt(few_shots,max_number_few_shots,autocorrect,db_name,error=None,generated_sql=None):
        # Static strategy means data is loaded from a user-provided file
        
    if autocorrect:
        # Auto-correction mode
        logger.info("Autocorrect is enabled, running LLM against few shots prompt")
        example_prompt = PromptTemplate.from_template("User input: {input}\n<query>{query}</query>")
        prompt_prefix = f"You are a {db_name} expert. This is the error {error} in this sql {generated_sql}. To correct this error, please generate an alternative syntactically correct {db_name} query for the question {user_question} and write it between the xml tags <query></query>."
        prompt = FewShotPromptTemplate(
            examples=few_shots[:max_number_few_shots],
            example_prompt=example_prompt,
            prefix=prompt_prefix + " Unless otherwise specificed, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries.",
            suffix="User input: {input}\n<query> </query>",
            input_variables=["input", "top_k", "table_info"],
            )
    else:
        # Regular mode
        example_prompt = PromptTemplate.from_template("User input: {input}\n<query>{query}</query>")
        prompt = FewShotPromptTemplate(
            examples=few_shots[:max_number_few_shots],
            example_prompt=example_prompt,
            prefix="You are a SQLlite expert. Given an input question, create a syntactically correct SQLlite query to run and write it between the xml tags <query></query>. Unless otherwise specificed, do not return more than {top_k} rows.\n\nHere is the relevant table info: {table_info}\n\nBelow are a number of examples of questions and their corresponding SQL queries.",
            suffix="User input: {input}\n<query> </query>",
            input_variables=["input", "top_k", "table_info"],
            )
   
    return prompt
    

def generate_sql_from_text(text_to_sql_query_generation_llm,user_question, db, prompt):
    """
    Generate a SQL query from the given user question using a language model and the provided configurations.

    Args:
        text_to_sql_query_generation_llm (LLM): The language model for SQL query generation.
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

                If there are any of the above mistakes, rewrite the query. If there are no mistakes, just reproduce the original query.

                Output the final SQL query only between tags <query> </query>."""


    prompt = ChatPromptTemplate.from_messages(
                [("system", system), ("human", "{query}")]
                ).partial(dialect=db.dialect)
    validation_chain = prompt | text_to_sql_query_generation_llm | StrOutputParser()
    response = validation_chain.invoke({"query": generated_sql_query})
    validated_sql_query = extract_sql_query(response)
    logger.info(f'Validated SQL query: {validated_sql_query}')      
                
    return validated_sql_query
