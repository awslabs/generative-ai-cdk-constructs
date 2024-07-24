import os
import boto3
import botocore
import tempfile
import json
from config_types import  WorkflowStrategy,Metadata_source,Database_supported
from bedrock import get_llm
from custom_errors  import LLMNotLoadedException,KnowledgeBaseIDNotFound,FileNotFound
# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from langchain_core.prompts import  load_prompt
from langchain.chains import LLMChain
from parser import extract_reformulated_question



logger = Logger(service="QUERY_CONFIG")
tracer = Tracer(service="QUERY_CONFIG")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_CONFIG")

db_name = os.environ["DB_NAME"]
metadata_source = os.environ["METADATA_SOURCE"]
config_bucket = os.environ["CONFIG_BUCKET"]
knowledge_base_id = os.environ["KNOWLEDGE_BASE_ID"]

s3 = boto3.client('s3')
bedrock_agent_runtime = boto3.client('bedrock-agent-runtime')

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    user_question = event['user_question']
    logger.info(f"Load texttpsql config files for input  :: {event}", )
    
    keys = ['config/workflow_config.json', 'config/few_shots.json','config/knowledge_layer.json']
    file_contents = load_files_from_s3(keys)
    # check if file_contents has key workflow_config.json
    if 'config/workflow_config.json' in file_contents:
        config = json.loads(file_contents['config/workflow_config.json'])
        
    else:
        raise ValueError("workflow_config.json not found in file_contents")
    
    if 'config/knowledge_layer.json' in file_contents:
        knowledge_layer = json.loads(file_contents["config/knowledge_layer.json"])
    else:
        raise ValueError("knowledge_layer.json not found in file_contents")
    
    #print(f'config :: {config}')
    few_shots_config = 'config/few_shots.json'
    execute_query_config = config.get("execute_sql")
    sql_generation_config = config.get("sql_generation")
    sql_synth_config = config.get("sql_synth")
    semantic_layer = config.get("semantic_layer")
    knowledge_base=config.get("knowledge_base")
    

    
    semantic_layer_strategy = semantic_layer.get('strategy', WorkflowStrategy.AUTO)

    if (semantic_layer_strategy != WorkflowStrategy.DISABLED ):    
        reformulated_user_question = get_reformulated_question(semantic_layer, knowledge_layer, knowledge_base,user_question,metadata_source)
    else:
        logger.info('Semantic validation strategy disabled, using the same question as asked by the user...')
        reformulated_user_question = user_question
        
    response = {
        'reformulated_user_question':reformulated_user_question,
        'user_question':user_question,
        'db_name':db_name,
        'metadata_source':metadata_source,
        'sql_generation_config':sql_generation_config,
        'sql_synth':sql_synth_config,
        'few_shots_config':few_shots_config,
        'execute_query_config':execute_query_config,
        'semantic_layer_strategy':semantic_layer_strategy
        
    }
    logger.info(f"Returning response :: {response}")
    return response






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


def get_reformulated_question(semantic_layer, knowledge_layer, knowledge_base, user_question, metadata_source):
    """
    Reformulates the user's question using a language model based on the provided knowledge layer and metadata source.

    Args:
        semantic_layer (dict): Configuration for the semantic layer.
        knowledge_layer (dict): Data representing the knowledge layer.
        knowledge_base (dict): Configuration for the knowledge base.
        user_question (str): The user's original question.
        metadata_source (str): The source of the metadata, either "config_file" or "knowledge_base".

    Returns:
        str: The reformulated question.

    Raises:
        LLMNotLoadedException: If the language model for the semantic layer cannot be loaded.
    """

    logger.info(f'Reformulating user question :: {user_question}')
    semantic_layer_llm = get_llm(semantic_layer)
    if semantic_layer_llm is None:
        raise LLMNotLoadedException("semantic_layer")

    if metadata_source == Metadata_source.CONFIG_FILE: 
        downloaded_file=download_file_from_s3(config_bucket, semantic_layer['prompt_template_path'])
        answer_prompt = load_prompt(downloaded_file)
        knowledge_layer_data=knowledge_layer
    else:
        downloaded_file=download_file_from_s3(config_bucket, semantic_layer['kb_prompt_template_path'])
        answer_prompt = load_prompt(downloaded_file)
        knowledge_layer_data = get_knowledge_layer_data(metadata_source, knowledge_base, user_question, semantic_layer)

    chain = LLMChain(llm=semantic_layer_llm, prompt=answer_prompt, verbose=False)
    response = chain.predict(knowledge_layer=knowledge_layer_data, question=user_question)
    new_question = extract_reformulated_question(response)

    return new_question


def get_knowledge_layer_data(metadata_source, knowledge_base, user_question, semantic_layer):
    """
    Retrieves the knowledge layer data based on the metadata source.

    Args:
        metadata_source (str): The source of the metadata, either "config_file" or "knowledge_base".
        knowledge_base (dict): Configuration for the knowledge base.
        user_question (str): The user's original question.
        semantic_layer (dict): Configuration for the semantic layer.

    Returns:
        dict: The knowledge layer data.
    """
    if metadata_source == Metadata_source.CONFIG_FILE:
        logger.info('Semantic validation strategy enabled, running LLM against question + knowledge layer config file')
        return 
    else:
        logger.info('Semantic validation strategy enabled, running LLM against question + knowledge base')
        if  knowledge_base_id is None:
            raise KnowledgeBaseIDNotFound("KNOWLEDGE_BASE_ID environment variable is not set")
        
        response = bedrock_agent_runtime.retrieve(
            retrievalQuery={'text': user_question},
            knowledgeBaseId=knowledge_base_id,
            retrievalConfiguration={'vectorSearchConfiguration': {'numberOfResults': 1}}
        )
        return response['retrievalResults']




def download_file_from_s3(bucket_name, object_key):
    """
    Download a file from an Amazon S3 bucket.

    Args:
        bucket_name (str): The name of the S3 bucket.
        object_key (str): The key (path) of the object in the bucket.

    Returns:
        bool: True if the file was downloaded successfully, False otherwise.
    """
    s3 = boto3.client('s3')

    try:
        download_path = os.path.join(tempfile.gettempdir(), os.path.basename(object_key))
        s3.download_file(bucket_name, object_key, download_path)
    except botocore.exceptions.ClientError as e:
        raise FileNotFound(f"Error loading file from S3: {e}")

    return download_path


