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
from langchain.vectorstores import OpenSearchVectorSearch
from langchain.embeddings import BedrockEmbeddings
from typing import Tuple
import boto3, os
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="INGESTION_EMBEDDING_JOB")
tracer = Tracer(service="INGESTION_EMBEDDING_JOB")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_EMBEDDING_JOB")

aws_region = boto3.Session().region_name
bedrock_client = boto3.client(
    service_name='bedrock-runtime', 
    region_name=aws_region,
    #endpoint_url=f'https://bedrock.{aws_region}.amazonaws.com'
)

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

def process_shard(shard, os_index_name, os_domain_ep, os_http_auth) -> int: 
    print(f'Starting process_shard of {len(shard)} chunks.')
    embeddings = BedrockEmbeddings(
        client=bedrock_client, 
        model_id="amazon.titan-embed-text-v1")
    docsearch = OpenSearchVectorSearch(index_name=os_index_name,
                                       embedding_function=embeddings,
                                       opensearch_url=f"https://{os_domain_ep}",
                                       http_auth=os_http_auth,
                                       use_ssl = True,
                                       verify_certs = True,
                                       connection_class = RequestsHttpConnection)    
    docsearch.add_documents(documents=shard)
    print(f'Shard completed')
    return 0