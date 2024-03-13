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
from opensearchpy import OpenSearch, RequestsHttpConnection, AWSV4SignerAuth
from langchain_community.vectorstores import OpenSearchVectorSearch
from langchain_community.embeddings import BedrockEmbeddings
from typing import Tuple
import boto3, os
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from helpers.image_loader import image_loader


logger = Logger(service="INGESTION_EMBEDDING_JOB")
tracer = Tracer(service="INGESTION_EMBEDDING_JOB")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_EMBEDDING_JOB")


@tracer.capture_method
def check_if_index_exists(index_name: str, region: str, host: str, http_auth: Tuple[str, str]) -> OpenSearch:
    aos_client = OpenSearch(
        hosts = [{'host': host.replace("https://", ""), 'port': 443}],
        http_auth = http_auth,
        use_ssl = True,
        verify_certs = True,
        connection_class = RequestsHttpConnection
    )
    exists = aos_client.indices.exists(index_name)
    print(f"index_name={index_name}, exists={exists}")
    return exists

def process_shard(shard, os_index_name, os_domain_ep, os_http_auth,model_id) -> int: 
    bedrock_client = boto3.client('bedrock-runtime')
    embeddings = BedrockEmbeddings(client=bedrock_client,model_id=model_id)
   
    opensearch_url = os_domain_ep if os_domain_ep.startswith("https://") else f"https://{os_domain_ep}"
    docsearch = OpenSearchVectorSearch(index_name=os_index_name,
                                       embedding_function=embeddings,
                                       opensearch_url=opensearch_url,
                                       http_auth=os_http_auth,
                                       use_ssl = True,
                                       verify_certs = True,
                                       connection_class = RequestsHttpConnection)    
    docsearch.add_documents(documents=shard)
    print(f'Shard completed')
    return 0

# TODO - Use this to create index in OS if langchain community process_shard throws issues with image.
# otherwise remove this function.
def create_index_for_image(index_name: str, region: str, host: str, http_auth: Tuple[str, str],document):
    # Create Index, generates a warning if index already exists
    print(f' create index on os without langchain utility ')
    aos_client = OpenSearch(
        hosts = [{'host': host.replace("https://", ""), 'port': 443}],
        http_auth = http_auth,
        use_ssl = True,
        verify_certs = True,
        connection_class = RequestsHttpConnection
    )

     # Create an index
    if not aos_client.indices.exists(index=index_name):
        print(f' conection made , creating index....')
        aos_client.indices.create(
            index=index_name,
            body={
                "settings":{
                "index.knn": True,
                "index.knn.space_type": "cosinesimil",
                "analysis": {
                    "analyzer": {"default": {"type": "standard", "stopwords": "_english_"}}
                },
            },
            "mappings":{
                "properties": {
                    "image_vector": {
                        "type": "knn_vector",
                        "dimension": len(document["image_vector"]),
                        "store": True,
                    },
                    "image_path": {"type": "text", "store": True},
                    "image_words": {"type": "text", "store": True},
                    "celebrities": {"type": "text", "store": True},
                }
                }
                }

             )
    else:
         print(f' index already exist , document loading ....')
    # Create documents
    result=  aos_client.index(
        index=index_name, body=document
    )
    print(' embeddings uploaded in os {result}')