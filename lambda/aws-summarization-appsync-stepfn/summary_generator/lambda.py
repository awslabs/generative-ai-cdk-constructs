import os,boto3
import base64

from langchain.llms.bedrock import Bedrock
from update_summary_status import updateSummaryJobStatus

# external files
from langchain.docstore.document import Document
from langchain.chains.summarize import load_summarize_chain

import redis


from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_GENERATION")


# internal files
from helper import  read_file_from_s3

transformed_bucket_name = os.environ["ASSET_BUCKET_NAME"]
chain_type = os.environ["SUMMARY_LLM_CHAIN_TYPE"]

aws_region = boto3.Session().region_name
bedrock_client = boto3.client(
        service_name='bedrock-runtime', 
        region_name=aws_region,
        endpoint_url=f'https://bedrock-runtime.{aws_region}.amazonaws.com'
    )

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info("Starting summary agent with input", event)


    job_id = event["summary_job_id"]

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    original_file_name = event["file_name"]
    transformed_file_name = event["transformed_file_name"]
    
    # create response
    response = {
        "summary_job_id": job_id,
        "file_name": original_file_name,
        "status": "Pending",
        "summary": ""
    }
  
    

    summary_llm = Bedrock(
        model_id="anthropic.claude-v2",
        client=bedrock_client,
    )
    
    redis_host = os.environ.get("REDIS_HOST", "N/A")
    redis_port = os.environ.get("REDIS_PORT", "N/A")

    if redis_host and redis_port:
        logger.info("connecting to redis host...")
        redis_client = redis.Redis(host=redis_host, port=redis_port)
    else:
        logger.info("Redis host or port not set in environment variables")

    inputFile = read_file_from_s3(transformed_bucket_name, transformed_file_name)
    if inputFile is None:
        response["status"] = "Failed to load file from S3"
        return response

    finalsummary = generate_summary(summary_llm,chain_type,inputFile)
    
    llm_answer_bytes = finalsummary.encode("utf-8")
    base64_bytes = base64.b64encode(llm_answer_bytes)
    llm_answer_base64_string = base64_bytes.decode("utf-8")
    logger.info(finalsummary)
    logger.info("Summarization done")

    response.update({
        'file_name':original_file_name,
        'status':"Completed",
        'summary':llm_answer_base64_string
    }
    )

    logger.info("Saving respone in Redis :: ",response)
    try:
        redis_client.set(original_file_name,
                         llm_answer_base64_string, ex=604800)
        logger.info("Saved summary in Redis")
    except (ValueError, redis.ConnectionError) as e:
        logger.exception(
            "An error occured while trying to connect to Redis.\n"
            f'Host: "{redis_host}", Port: "{redis_port}".\n'
            f"Exception: {e}"
        )
    updateSummaryJobStatus({'jobid': job_id, 
                            'file_name':response["file_name"]
                            ,'status':response['status']  ,
                            'summary':response["summary"]})
    return response




def generate_summary(_summary_llm,chain_type,inputFile)-> str:
    
    logger.info(f" Using chain_type as {chain_type} for the document")    
    docs = [Document(page_content=inputFile)]
         # run LLM
   # prompt = load_prompt("prompt.json")
    chain = load_summarize_chain(
                _summary_llm, 
                chain_type=chain_type, 
                verbose=False
                )
    return chain.run(docs)



