#
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
# with the License. A copy of the License is located at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
# OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
# and limitations under the License.
#
import os
import sys
import time
import json
import boto3, json
import numpy as np
import tempfile
from helpers.credentials_helper import get_credentials
from helpers.image_loader import image_loader


from helpers.opensearch_helper import check_if_index_exists, process_shard, create_index_for_image
from helpers.update_ingestion_status import updateIngestionJobStatus
from langchain_community.embeddings import BedrockEmbeddings
from helpers.s3inmemoryloader import S3TxtFileLoaderInMemory
from opensearchpy import RequestsHttpConnection
from langchain_community.vectorstores import OpenSearchVectorSearch
from langchain.text_splitter import RecursiveCharacterTextSplitter
import multiprocessing as mp
from functools import partial
from requests_aws4auth import AWS4Auth
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="INGESTION_EMBEDDING_JOB")
tracer = Tracer(service="INGESTION_EMBEDDING_JOB")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_EMBEDDING_JOB")

aws_region = boto3.Session().region_name
session = boto3.session.Session()
credentials = session.get_credentials()


opensearch_secret_id = os.environ['OPENSEARCH_SECRET_ID']
bucket_name = os.environ['OUTPUT_BUCKET']
opensearch_index = os.environ['OPENSEARCH_INDEX']
opensearch_domain = os.environ['OPENSEARCH_DOMAIN_ENDPOINT']
opensearch_api_name = os.environ['OPENSEARCH_API_NAME']

DATA_DIR = tempfile.gettempdir()
CHUNCK_SIZE_DOC_SPLIT=500
OVERLAP_FOR_DOC_SPLIT=20
MAX_OS_DOCS_PER_PUT = 500
TOTAL_INDEX_CREATION_WAIT_TIME = 1
PER_ITER_SLEEP_TIME = 5
PROCESS_COUNT=5
INDEX_FILE="index_file"

def process_documents_in_es(index_exists, shards, http_auth,model_id):
    bedrock_client = boto3.client('bedrock-runtime')
    embeddings = BedrockEmbeddings(client=bedrock_client,model_id=model_id)
    print(f' Bedrock embeddings model id :: {embeddings.model_id}')

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

def process_documents_in_aoss(index_exists, shards, http_auth,model_id):
    bedrock_client = boto3.client('bedrock-runtime')
    embeddings = BedrockEmbeddings(client=bedrock_client,model_id=model_id)
   
    shard_start_index = 0
    if index_exists is False:
        OpenSearchVectorSearch.from_documents(
            shards[0],
            embeddings,
            opensearch_url=opensearch_domain,
            http_auth=http_auth,
            timeout=300,
            use_ssl=True,
            verify_certs=True,
            connection_class=RequestsHttpConnection,
            index_name=opensearch_index,
            engine="faiss",
        )
        # we now need to start the loop below for the second shard
        shard_start_index = 1
    for shard in shards[shard_start_index:]:
        print(f'processing shard index {shard_start_index}')
        results = process_shard(shard=shard,
                    os_index_name=opensearch_index,
                    os_domain_ep=opensearch_domain,
                    os_http_auth=http_auth,
                    model_id=model_id)
        

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event,  context: LambdaContext) -> dict:
    print(f'event {event}')
    # if the secret id is not provided
    # uses username password
    if opensearch_secret_id != 'NONE': # nosec
        creds = get_credentials(opensearch_secret_id, aws_region)
        http_auth = (creds['username'], creds['password'])
    else: #
        http_auth = AWS4Auth(
            credentials.access_key,
            credentials.secret_key,
            aws_region,
            opensearch_api_name,
            session_token=credentials.token
        )
    job_id = event[0]['s3_transformer_result']['Payload']['jobid']
    modelid = event[0]['s3_transformer_result']['Payload']['modelid']

    logger.info(f' model id :: {modelid}')

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    files = []
    for transformed_file in event:
        files.append({'name':transformed_file['name'],
                       'status':transformed_file['s3_transformer_result']['Payload']['status'],
                       'imageurl':''})
    updateIngestionJobStatus({'jobid': job_id, 'files': files})

    
    
    logger.info(f'Loading txt raw files from {bucket_name}')

    docs = []
    
    # Images are stored in s3 with presigned url, embeddings is not required.

    for transformed_file in event:
        if transformed_file['s3_transformer_result']['Payload']['status'] == 'File transformed':
            filename = transformed_file['s3_transformer_result']['Payload']['name']
            original_filename = transformed_file['name']
            name, extension = os.path.splitext(original_filename)
            print(f" the original_filename {name} and extension {extension}")
            if(extension == '.pdf'):
                loader = S3TxtFileLoaderInMemory(bucket_name, filename)
                sub_docs = loader.load()
                for doc in sub_docs:
                    doc.metadata['source'] = original_filename
                docs.extend(sub_docs)
                process_text_embeddings(docs,modelid,http_auth,files,job_id)
            if(extension == '.jpg' or extension == '.jpeg' or extension == '.png' or extension == '.svg'):
                img_load = image_loader(bucket_name, filename,f"{name}.txt",modelid)
                docs = img_load.load()
                url=img_load.get_presigned_url()
                for doc in docs:
                    doc.metadata['image_path'] = url
                process_image_embeddings(docs,modelid,http_auth,files,job_id,url)

    if not docs:
            return {
                'status':'nothing to ingest'
            }

   

def process_text_embeddings(docs,modelid,http_auth,files,job_id):
    logger.info("process image embeddings with chunks")
    text_splitter = RecursiveCharacterTextSplitter(
                # Set a really small chunk size, just to show.
                chunk_size=CHUNCK_SIZE_DOC_SPLIT,
                chunk_overlap=OVERLAP_FOR_DOC_SPLIT,
                length_function=len,
            )

    # add a custom metadata field, such as timestamp
    # we can augment data here probably (PII present ? ...)
    for doc in docs:
        doc.metadata['timestamp'] = time.time()
        doc.metadata['embeddings_model'] = modelid
    chunks = text_splitter.create_documents([doc.page_content for doc in docs], metadatas=[doc.metadata for doc in docs])

    db_shards = (len(chunks) // MAX_OS_DOCS_PER_PUT) + 1
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
    
    if opensearch_api_name == "es":
            process_documents_in_es(index_exists, shards, http_auth,modelid)
    elif opensearch_api_name == "aoss":
            process_documents_in_aoss(index_exists, shards, http_auth,modelid)

    for file in files:
        if file['status'] == 'File transformed':
           file['status'] = 'Ingested'
        else:
            file['status'] = 'Error_'+file['status']
    updateIngestionJobStatus({'jobid': job_id, 'files': files})

    return {
        'status':'succeed'
    }

def process_image_embeddings(docs,modelid,http_auth,files,job_id,url):
    logger.info("process image embeddings")
    print(f' docs :: {docs}')
    
    for doc in docs:
        doc.metadata['timestamp'] = time.time()
        doc.metadata['embeddings_model'] = modelid
    # not using text splitter , using whole image embedding as one array
    shards = np.array_split(docs,1)

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
    
    if opensearch_api_name == "es":
            process_documents_in_es(index_exists, shards, http_auth,modelid)
    elif opensearch_api_name == "aoss":
            process_documents_in_aoss(index_exists, shards, http_auth,modelid)

    for file in files:
        if file['status'] == 'File transformed':
           file['status'] = 'Ingested'
           file['imageurl'] = url
        else:
            file['status'] = 'Error_'+file['status']
    updateIngestionJobStatus({'jobid': job_id, 'files': files})

    return {
        'status':'succeed'
    }
