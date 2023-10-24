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
sts_client = boto3.client("sts")

def get_bedrock_client(service_name="bedrock-runtime"):
    config = {}
    bedrock_config = config.get("bedrock", {})
    bedrock_enabled = bedrock_config.get("enabled", False)
    if not bedrock_enabled:
        print("bedrock not enabled")
        return None

    bedrock_config_data = {"service_name": service_name}
    region_name = bedrock_config.get("region")
    endpoint_url = bedrock_config.get("endpointUrl")
    role_arn = bedrock_config.get("roleArn")

    if region_name:
        bedrock_config_data["region_name"] = region_name
    if endpoint_url:
        bedrock_config_data["endpoint_url"] = endpoint_url

    if role_arn:
        assumed_role_object = sts_client.assume_role(
            RoleArn=role_arn,
            RoleSessionName="AssumedRoleSession",
        )

        credentials = assumed_role_object["Credentials"]
        bedrock_config_data["aws_access_key_id"] = credentials["AccessKeyId"]
        bedrock_config_data["aws_secret_access_key"] = credentials["SecretAccessKey"]
        bedrock_config_data["aws_session_token"] = credentials["SessionToken"]

    return boto3.client(**bedrock_config_data)

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
    bedrock_client = get_bedrock_client()
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