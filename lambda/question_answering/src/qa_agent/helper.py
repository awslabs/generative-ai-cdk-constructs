from langchain.vectorstores import OpenSearchVectorSearch
from llms import get_embeddings_llm
import requests
import os
import boto3
import json

aws_region = boto3.Session().region_name

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

    GRAPHQL_URL = os.environ['GRAPHQL_API_ENDPOINT']
    api_key_secret_name = os.environ['GRAPHQL_API_KEY']
    GRAPHQL_API_KEY= get_credentials_string(api_key_secret_name, aws_region)
    HEADERS={
        "Content-Type": "application/json",
        "x-api-key":GRAPHQL_API_KEY
        }
    
    responseJobstatus = requests.post(
        json=request,
        url=GRAPHQL_URL,
        headers=HEADERS
    )
    print('res :: {}',responseJobstatus)