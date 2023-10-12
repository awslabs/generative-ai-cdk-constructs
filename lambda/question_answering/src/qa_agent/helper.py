from langchain.vectorstores import OpenSearchVectorSearch
from llms import get_embeddings_llm
import requests
import os
import boto3
import json
from requests_aws4auth import AWS4Auth

aws_region = boto3.Session().region_name
credentials = boto3.Session().get_credentials()
service = 'appsync'
aws_auth = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    aws_region,
    service,
    session_token=credentials.token,
)

def get_credentials(secret_id: str, region_name: str) -> str:
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_id)
    secrets_value = json.loads(response['SecretString'])
    return secrets_value

def get_credentials_string(secret_id: str, region_name: str) -> str:
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_id)
    secrets_value = response['SecretString']
    return secrets_value

def load_vector_db_opensearch(region: str,
                              opensearch_domain_endpoint: str,
                              opensearch_index: str,
                              secret_id: str) -> OpenSearchVectorSearch:
    print(f"load_vector_db_opensearch, region={region}, "
                f"opensearch_domain_endpoint={opensearch_domain_endpoint}, opensearch_index={opensearch_index}")
    
    creds = get_credentials(secret_id, region)
    http_auth = (creds['username'], creds['password'])

    embedding_function = get_embeddings_llm()

    vector_db = OpenSearchVectorSearch(index_name=opensearch_index,
                                       embedding_function=embedding_function,
                                       opensearch_url=opensearch_domain_endpoint,
                                       http_auth=http_auth)
    print(f"returning handle to OpenSearchVectorSearch, vector_db={vector_db}")
    return vector_db

def send_job_status(variables):

    answer = variables['answer']
    question = variables['question']

    query = """
    mutation updateQAJobStatus {
        updateQAJobStatus (jobstatus: \"$jobstatus\", jobid: $jobid, answer: \""""+answer+"""\", question: \""""+question+"""\", filename: \"$filename\", sources: $sources) 
        {
            jobstatus, 
            jobid, 
            answer, 
            question, 
            sources
        }
    }
    """

    query = query.replace("$jobstatus", variables['jobstatus'])
    query = query.replace("$filename", variables['filename'])
    query = query.replace("$jobid", str(variables['jobid']))
    query = query.replace("$sources", str(variables['sources']).replace("\'", "\""))

    request = {'query':query}

    print(request)

    GRAPHQL_URL = os.environ['GRAPHQL_URL']
    HEADERS={
        "Content-Type": "application/json",
        }
    
    responseJobstatus = requests.post(
        json=request,
        url=GRAPHQL_URL,
        headers=HEADERS,
        auth=aws_auth
    )
    print('res :: {}',responseJobstatus)