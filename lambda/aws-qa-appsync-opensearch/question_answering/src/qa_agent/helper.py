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
from langchain.vectorstores import OpenSearchVectorSearch
from opensearchpy import RequestsHttpConnection
from llms import get_embeddings_llm
import requests
import os
import boto3
import json
from requests_aws4auth import AWS4Auth

aws_region = boto3.Session().region_name
credentials = boto3.Session().get_credentials()
aws_auth_appsync = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    aws_region,
    'appsync',
    session_token=credentials.token,
)

aws_auth_os = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    aws_region,
    'es',
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
    
    if secret_id != 'NONE': # user uses username/password 
        creds = get_credentials(secret_id, aws_region)
        http_auth = (creds['username'], creds['password'])
    else: # sigv4
        http_auth = aws_auth_os

    embedding_function = get_embeddings_llm()

    vector_db = OpenSearchVectorSearch(index_name=opensearch_index,
                                       embedding_function=embedding_function,
                                       opensearch_url=f"https://{opensearch_domain_endpoint}",
                                       http_auth=http_auth,
                                       use_ssl = True,
                                       verify_certs = True,
                                       connection_class = RequestsHttpConnection,
                                       is_aoss=False)
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
        auth=aws_auth_appsync
    )
    print('res :: {}',responseJobstatus)
