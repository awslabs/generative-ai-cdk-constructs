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

def get_bedrock_client():
    """Until Bedrock goes GA, we need to assume a role to use it."""
    region_name = os.environ["BEDROCK_REGION"]
    endpoint_url = os.environ["BEDROCK_ENDPOINT_URL"]
    return boto3.client(
        "bedrock",
        region_name=region_name,
        endpoint_url=endpoint_url,
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
        client=get_bedrock_client(),
    )
    docsearch = OpenSearchVectorSearch(index_name=os_index_name,
                                       embedding_function=embeddings,
                                       opensearch_url=os_domain_ep,
                                       http_auth=os_http_auth)    
    docsearch.add_documents(documents=shard)
    print(f'Shard completed')
    return 0