import os
import sys
import time
import json
import boto3, json
import numpy as np
from helpers.credentials_helper import get_credentials
from helpers.opensearch_helper import check_if_index_exists, process_shard
from helpers.update_ingestion_status import updateIngestionJobStatus
from langchain.embeddings import BedrockEmbeddings
from helpers.s3inmemoryloader import S3TxtFileLoaderInMemory
from langchain.vectorstores import OpenSearchVectorSearch
from langchain.text_splitter import RecursiveCharacterTextSplitter
import multiprocessing as mp
from functools import partial
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="INGESTION_EMBEDDING_JOB")
tracer = Tracer(service="INGESTION_EMBEDDING_JOB")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_EMBEDDING_JOB")

aws_region = boto3.Session().region_name
bedrock_client = boto3.client(
    service_name='bedrock', 
    region_name=aws_region,
    endpoint_url=f'https://bedrock.{aws_region}.amazonaws.com'
)

opensearch_secret_id = os.environ['OPENSEARCH_SECRET_ID']
bucket_name = os.environ['OUTPUT_BUCKET']
opensearch_index = os.environ['OPENSEARCH_INDEX']
opensearch_domain = os.environ['OPENSEARCH_DOMAIN_ENDPOINT']

DATA_DIR = "/tmp"
CHUNCK_SIZE_DOC_SPLIT=500
OVERLAP_FOR_DOC_SPLIT=20
MAX_OS_DOCS_PER_PUT = 500
TOTAL_INDEX_CREATION_WAIT_TIME = 60
PER_ITER_SLEEP_TIME = 5
PROCESS_COUNT=5
INDEX_FILE="index_file"

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event,  context: LambdaContext) -> dict:

    creds = get_credentials(opensearch_secret_id, aws_region)
    http_auth = (creds['username'], creds['password'])
    job_id = event[0]['s3_transformer_result']['Payload']['jobid']

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    files = []
    for transformed_file in event:
        files.append({'name':transformed_file['name'], 'status':transformed_file['s3_transformer_result']['Payload']['status']})
    updateIngestionJobStatus({'jobid': job_id, 'files': files})

    print(f'Loading txt raw files from {bucket_name}')

    docs = []

    for transformed_file in event:
        if transformed_file['s3_transformer_result']['Payload']['status'] == 'File transformed':
            filename = transformed_file['s3_transformer_result']['Payload']['name']
            loader = S3TxtFileLoaderInMemory(bucket_name, filename)
            sub_docs = loader.load()
            docs.extend(sub_docs)

    if not docs:
        return {
            'status':'nothing to ingest'
        } 

    text_splitter = RecursiveCharacterTextSplitter(
                # Set a really small chunk size, just to show.
                chunk_size=CHUNCK_SIZE_DOC_SPLIT,
                chunk_overlap=OVERLAP_FOR_DOC_SPLIT,
                length_function=len,
            )

    print('Documents loaded locally')

    # add a custom metadata field, such as timestamp
    # we can augment data here probably (PII present ? ...)
    for doc in docs:
        doc.metadata['timestamp'] = time.time()
        doc.metadata['embeddings_model'] = 'amazon.titan-embed-text-v1'
    chunks = text_splitter.create_documents([doc.page_content for doc in docs], metadatas=[doc.metadata for doc in docs])

    db_shards = (len(chunks) // MAX_OS_DOCS_PER_PUT) + 1
    print(f'Loading chunks into vector store ... using {db_shards} shards') 
    shards = np.array_split(chunks, db_shards)

    # first check if index exists, if it does then call the add_documents function
    # otherwise call the from_documents function which would first create the index
    # and then do a bulk add. Both add_documents and from_documents do a bulk add
    # but it is important to call from_documents first so that the index is created
    # correctly for K-NN
    try:
        index_exists = check_if_index_exists(opensearch_index,
                                                aws_region,
                                                opensearch_domain,
                                                http_auth)
    except Exception as e:
        logger.exception(f'Failed to verify the existence of the os index : {e}')
        for file in files:
            file['status'] = 'Error - internal os error cannot connect'
        updateIngestionJobStatus({'jobid': job_id, 'files': files})
        return {
            'status':'failed'
        }


    embeddings = BedrockEmbeddings(client=bedrock_client)

    if index_exists is False:
        # create an index if the create index hint file exists
        path = os.path.join(DATA_DIR, INDEX_FILE)
        if os.path.isfile(path) is True:
            print(f"index {opensearch_index} does not exist but {path} file is present so will create index")
            # by default langchain would create a k-NN index and the embeddings would be ingested as a k-NN vector type
            docsearch = OpenSearchVectorSearch.from_documents(index_name=opensearch_index,
                                                                documents=shards[0],
                                                                embedding=embeddings,
                                                                opensearch_url=opensearch_domain,
                                                                http_auth=http_auth)
            # we now need to start the loop below for the second shard
            shard_start_index = 1  
        else:
            print(f"index {opensearch_index} does not exist and {path} file is not present, "
                        f"will wait for some other node to create the index")
            shard_start_index = 0
            # start a loop to wait for index creation by another node
            time_slept = 0
            while True:
                print(f"index {opensearch_index} still does not exist, sleeping...")
                time.sleep(PER_ITER_SLEEP_TIME)
                index_exists = check_if_index_exists(opensearch_index,
                                                        aws_region,
                                                        opensearch_domain,
                                                        http_auth)
                if index_exists is True:
                    print(f"index {opensearch_index} now exists")
                    break
                time_slept += PER_ITER_SLEEP_TIME
                if time_slept >= TOTAL_INDEX_CREATION_WAIT_TIME:
                    print(f"time_slept={time_slept} >= {TOTAL_INDEX_CREATION_WAIT_TIME}, not waiting anymore for index creation")
                    break
                
    else:
        print(f"index={opensearch_index} does exists, going to call add_documents")
        shard_start_index = 0

    for shard in shards[shard_start_index:]:
        results = process_shard(shard=shard, 
                    os_index_name=opensearch_index,
                    os_domain_ep=opensearch_domain,
                    os_http_auth=http_auth)
        
    for file in files:
        if file['status'] == 'File transformed':
            file['status'] = 'Ingested'
        else:
            file['status'] = 'Error_'+file['status']
    updateIngestionJobStatus({'jobid': job_id, 'files': files})
        
    return {
        'status':'succeed'
    }