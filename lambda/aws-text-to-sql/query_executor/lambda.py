import os
import time
import json
import boto3
import json
from bedrock import get_llm
from langchain_core.prompts import  PromptTemplate
from langchain.chains import  LLMChain
from config_types import WorkflowStrategy,ConfigFilesName
from custom_errors import LLMNotLoadedException,FileNotFound,GeneratedQueryNotFound
from db_helper  import get_db_connection

# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger(service="QUERY_EXECUTOR")
tracer = Tracer(service="QUERY_EXECUTOR")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_EXECUTOR")

db_name = os.environ["DB_NAME"]
config_bucket = os.environ["CONFIG_BUCKET"]

s3 = boto3.client('s3')


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info("Executing query for the input", event)
    response = {
        'status':'Fail',
        'result':''
    }
    
    
    keys = [ConfigFilesName.WORKFLOW_JSON,ConfigFilesName.KNOWLEDGE_LAYER_JSON]
    file_contents = load_files_from_s3(keys)
    
    if ConfigFilesName.WORKFLOW_JSON in file_contents:
        config = json.loads(file_contents[ConfigFilesName.WORKFLOW_JSON])
        
    else:
        raise ValueError(f"{ConfigFilesName.WORKFLOW_JSON} not found in file_contents")
    
    
    execute_query_config = config.get("sql_execution",None)
    reformulated_user_question = event.get("reformulated_user_question",None)
    
    
    logger.info(f"Retrieve schema from:: {db_name}")
    
    generated_sql_query = event.get("generated_query",None)
    if generated_sql_query is None or generated_sql_query == "":
        # generated query is set in validated_sql_query for execute_query_strategy = auto 
        queryConfig = event.get("queryConfig").get("Payload", None)
        generated_sql_query = queryConfig.get("result",None)
        
        logger.info(f"validated_sql_query  {generated_sql_query}")
        
        if generated_sql_query is None or generated_sql_query == "":
            raise GeneratedQueryNotFound("generated_sql_query is None or empty")
        

    logger.info(f"generated SQL Query: {generated_sql_query}")
    sql_synth = config.get("sql_synth")
    
    
    execute_query_strategy = execute_query_config.get('strategy', WorkflowStrategy.AUTO)
    
    if (execute_query_strategy != WorkflowStrategy.DISABLED):
        db = get_db_connection(db_name)
        
        logger.info(db.get_usable_table_names())
        start_time = time.time()
        query_result = execute_query(generated_sql_query,db)
        end_time = time.time()
        if "QUERY_ERROR" in query_result:
            response['status'] = 'QUERY_ERROR'
        else:
            response['status'] = 'success'
    else:
        logger.info('Executing query against the database disabled')
        response['status'] = 'success'
        
    formatted_output = format_output(query_result, sql_synth,reformulated_user_question,generated_sql_query)
    response ['result'] = formatted_output
    
    
    return response



def execute_query(generated_sql_query,db):
    """
    Execute a SQL query against the database.

    Args:
        generated_sql_query (str): The SQL query to be executed.
        db (object): The database connection object.

    Returns:
        str: The result of the query execution or an error message.
    """

    logger.info(f'Executing query against the database :: {generated_sql_query}')
    try:
        start_time = time.time()
        query_result = db.run(generated_sql_query)
        end_time = time.time()

    except Exception as exp:
        end_time = time.time()
        execution_time = end_time - start_time
        logger.error(f"Error executing query: {exp}")
        query_result = "QUERY_ERROR :: " + str(exp)

    else:
        execution_time = end_time - start_time

    logger.info(f"DB execution Query result : {query_result}")
    logger.info(f"Query execution time: {execution_time} seconds")

    return query_result



def format_output(query_result,sql_synth,user_question,generated_sql_query):
    """
    Format the output of a SQL query execution based on the provided configurations.

    Args:
        query_result (str): The result of the SQL query execution.
        user_question (str): The user's original question.
        generated_sql_query (str): The SQL query generated from the user's question.
        sql_synth (dict): Configuration for the SQL synthesis strategy.
        execute_query_strategy (types.WorkflowStrategy): The strategy for executing the SQL query.
        bedrock (object): The Bedrock object for accessing language models.
        verbose (bool, optional): Whether to enable verbose logging. Defaults to False.

    Returns:
        str: The formatted output response.
    """
    
    sql_synthesize_strategy = sql_synth.get('strategy', WorkflowStrategy.AUTO)
    if sql_synthesize_strategy != WorkflowStrategy.DISABLED:
        answer_synth_llm = get_llm(sql_synth)
        if answer_synth_llm is None:
            raise LLMNotLoadedException("answer_synth_llm")

        # Define the prompt template for answer synthesis
        answer_prompt = PromptTemplate.from_template(
            """Given the following user question, corresponding SQL query, and SQL result, answer the user question.

                Question: {question}
                SQL Query: {query}
                SQL Result: {result}
                Answer: """
        )

        chain = LLMChain(llm=answer_synth_llm, prompt=answer_prompt, verbose=False)
        synthesized_answer = chain.predict(question=user_question, query=generated_sql_query, result=query_result)
        final_response = synthesized_answer

    logger.info(f"Final response:: {final_response}")

    return final_response



def load_files_from_s3(keys, bucket_name=config_bucket):
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

