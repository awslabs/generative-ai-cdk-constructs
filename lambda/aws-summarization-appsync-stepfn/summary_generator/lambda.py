import os,boto3,json
import base64
from typing import Dict

from langchain.llms.bedrock import Bedrock
from update_summary_status import updateSummaryJobStatus

# external files
from langchain.docstore.document import Document
from langchain.chains.summarize import load_summarize_chain
from langchain.text_splitter import NLTKTextSplitter
from langchain.chains.llm import LLMChain
from langchain.chains.combine_documents.stuff import StuffDocumentsChain
from langchain.chains import ReduceDocumentsChain, MapReduceDocumentsChain

import redis

from langchain.prompts import load_prompt

from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_GENERATION")


# internal files
from helper import set_nltk_data, set_transformer_cache_dir, read_file_from_s3

transformed_bucket_name = os.environ["ASSET_BUCKET_NAME"]
#transformed_bucket_name = "processed-assets-bucket-dev-383119320704"

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info("Starting summary agent with input", event)
    logger.info("boto 3 version "+boto3.__version__)

    # set input params
    set_transformer_cache_dir(os.environ["TRANSFORMERS_CACHE"])
    #set_transformer_cache_dir(os.environ["/tmp"])
    set_nltk_data()

    job_id = event["summaryjobid"]

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    original_file_name = event["filename"]
    text_file_name = original_file_name.replace(".pdf", "_transformed.txt")
    chain_type = get_chain_type(event)
    #isTokenLimitBreached = event["isTokenLimitBreached"]
    #chunk_size = event["suggestedchunksize"]

    # create response
    response = {
        "summaryjobid": job_id,
        "files": [{
            "name": original_file_name,
            "status": "Pending",
            "summary": ""
        }]
    }
  
    aws_region = boto3.Session().region_name
    bedrock_client = boto3.client(
        service_name='bedrock-runtime', 
        region_name=aws_region,
        endpoint_url=f'https://bedrock-runtime.{aws_region}.amazonaws.com'
    )

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

    inputFile = read_file_from_s3(transformed_bucket_name, text_file_name)
    if inputFile is None:
        response['files'][0]["status"] = "Failed to load file from S3"
        return response

    # read pdf text and split it into chunks'
    metrics.add_metric(name="summary_from_llm", unit=MetricUnit.Count, value=1)
    finalsummary = generate_summary(summary_llm,"stuff",inputFile)
    
    llm_answer_bytes = finalsummary.encode("utf-8")
    base64_bytes = base64.b64encode(llm_answer_bytes)
    llm_answer_base64_string = base64_bytes.decode("utf-8")
    logger.info(finalsummary)
    logger.info("Summarization done")

    file_result = {
            'name':original_file_name,
            'status':"Completed",
            'summary':llm_answer_base64_string
        }

    response.update({
        'files':[file_result]
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
    updateSummaryJobStatus({'jobid': job_id, 'files': response['files']})
    return response




def generate_summary(_summary_llm,chain_type,inputFile)-> str:
    
    logger.info(" Using chain_type as stuff for the document")
    
    docs = [Document(page_content=inputFile)]
         # run LLM
   # prompt = load_prompt("prompt.json")
    logger.info("Start summary genration")
    chain = load_summarize_chain(
                _summary_llm, 
                chain_type=chain_type, 
                verbose=False
                )
    return chain.run(docs)


#Gnerates summary faster than refine but the summary quality is not good.
def map_reduce_summary(_summary_llm,chunk_size,inputFile)-> str:
   
   # This might time out if the file is too big.
    
    logger.info("chunking is required, Using chain_type as map-reduce for the split document. ")
    docs = [Document(page_content=inputFile)]
    text_splitter = NLTKTextSplitter(chunk_size=chunk_size)
    split_docs = text_splitter.split_documents(docs)        
    
    logger.info("Start summary generation")
    map_prompt = load_prompt("map_prompt.json")
    map_chain = LLMChain(llm=_summary_llm, prompt=map_prompt)


    reduce_prompt = load_prompt("reduce_prompt.json")
    reduce_chain = LLMChain(llm=_summary_llm, prompt=reduce_prompt)

    #create a chain for all summaries 
    combine_documents_chain = StuffDocumentsChain(
    llm_chain=reduce_chain, document_variable_name="doc_summaries"
    )

    #take all smmaries and reduce it 
    reduce_documents_chain = ReduceDocumentsChain(
    combine_documents_chain=combine_documents_chain,
    collapse_documents_chain=combine_documents_chain,
    token_max=4000,
    )

    #map-reduce chain
    map_reduce_chain = MapReduceDocumentsChain(
    llm_chain=map_chain,
    reduce_documents_chain=reduce_documents_chain,
    document_variable_name="docs"
    )

    return map_reduce_chain.run(split_docs)


def get_chain_type(input_params: Dict) -> str:
    chain_type = input_params.get("chain_type")

    if chain_type:
        logger.info(f"{chain_type=}")
    else:
        chain_type = "stuff"
        logger.info("Using default chain type", chain_type)

    return chain_type

# input={
#         "isTokenLimitBreached": False,
#         "isSummaryAvailable": False,
#         "summary": "",
#         "summaryjobid": "1234",
#         "filename": "light_speed.pdf",
#         "status": "Pending",
#         "suggestedchunksize": 4096,
#         "key": "light_speed_transformed.txt",
#         "bucket": "processed-assets-bucket-dev-383119320704",
#         "errorcode": "",
#         "errormessage": ""
#     }

# handler(input,LambdaContext)