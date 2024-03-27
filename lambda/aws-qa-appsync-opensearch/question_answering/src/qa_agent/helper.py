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
import tempfile
import boto3
import json
import base64
from pathlib import Path
from aiohttp import ClientError
from langchain_community.vectorstores import OpenSearchVectorSearch
from opensearchpy import RequestsHttpConnection
import requests
from enum import Enum
from requests_aws4auth import AWS4Auth
s3 = boto3.client('s3')
from aws_lambda_powertools import Logger, Tracer, Metrics


logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")


class JobStatus(Enum):
    DONE = (
        'Done', 
        ''
    )
    WORKING = (
        'Working on the question', 
        ''
    )
    STREAMING_NEW_TOKEN = (
        'New LLM token', 
        ''
    )
    STREAMING_ENDED = (
        'LLM streaming ended', 
        ''
    )
    ERROR_LOAD_DOC = (
        'Failed to load document content',
        base64.b64encode("It seems I cannot load the document you are referring to, please verify that the document was correctly ingested or contect an administrator to get more information.".encode('utf-8'))
    )
    ERROR_LOAD_ARGS = (
        'Failed to load the llm arguments provided', 
        base64.b64encode("An internal error happened, and I am not able to load the args, please make sure the arguments provided are correctly structured.".encode('utf-8'))
    )
    ERROR_LOAD_LLM = (
        'Failed to load the llm', 
        base64.b64encode("An internal error happened, and I am not able to load my brain, please contact an administrator.".encode('utf-8'))
    )
    ERROR_LOAD_INFO = (
        'Failed to load information about the requested file', 
        base64.b64encode("Sorry, but I am not able to access the document specified.".encode('utf-8'))
    )
    ERROR_PREDICTION = (
        'Exception during prediction,Please verify model for the selected modality', 
        base64.b64encode("Sorry, it seems an issue happened on my end, and I'm not able to answer your question. Please contact an administrator to understand why !".encode('utf-8'))
    )
    ERROR_SEMANTIC_SEARCH = (
        'Exception during similarity search, Please verify model for the selected modality', 
        base64.b64encode("Sorry, it seems an issue happened on my end, and I'm not able to answer your question. Please contact an administrator to understand why !".encode('utf-8'))
    )

    def __init__(self, status, message):
        self.status = status
        self.message = message

    def get_message(self):
        return self.message

aws_region = boto3.Session().region_name
credentials = boto3.Session().get_credentials()
aws_auth_appsync = AWS4Auth(
    credentials.access_key,
    credentials.secret_key,
    aws_region,
    'appsync',
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
                              opensearch_api_name: str,
                              opensearch_domain_endpoint: str,
                              opensearch_index: str,
                              secret_id: str,
                              llm) -> OpenSearchVectorSearch:
    logger.info(f"load_vector_db_opensearch, region={region}, "
                f"opensearch_domain_endpoint={opensearch_domain_endpoint}, opensearch_index={opensearch_index}")
    
    # if the secret id is not provided
    # uses username password
    if secret_id != 'NONE': # nosec
        creds = get_credentials(secret_id, aws_region)
        http_auth = (creds['username'], creds['password'])
    else: # sigv4
        http_auth = AWS4Auth(
            credentials.access_key,
            credentials.secret_key,
            aws_region,
            opensearch_api_name,
            session_token=credentials.token,
        )

    opensearch_url = opensearch_domain_endpoint if opensearch_domain_endpoint.startswith("https://") else f"https://{opensearch_domain_endpoint}"
    
    vector_db = OpenSearchVectorSearch(index_name=opensearch_index,
                                        embedding_function=llm,
                                        opensearch_url=opensearch_url,
                                        http_auth=http_auth,
                                        use_ssl = True,
                                        verify_certs = True,
                                        connection_class = RequestsHttpConnection)
   
    logger.info(f"returning handle to OpenSearchVectorSearch, vector_db={vector_db}")
    return vector_db

def send_job_status(variables):

    answer = variables['answer']
    question = variables['question']

    query = """
    mutation updateQAJobStatus {
        updateQAJobStatus (jobstatus: \"$jobstatus\", jobid: \"$jobid\", answer: \""""+answer+"""\", question: \""""+question+"""\", filename: \"$filename\", sources: $sources) 
        {
            jobstatus, 
            jobid, 
            answer, 
            question, 
            filename,
            sources
        }
    }
    """

    query = query.replace("$jobstatus", variables['jobstatus'])
    query = query.replace("$filename", variables['filename'])
    query = query.replace("$jobid", variables['jobid'])
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
        auth=aws_auth_appsync,
        timeout=10
    )
    #logger.info('res :: {}',responseJobstatus)

def get_presigned_url(bucket,key) -> str:
        try:
             url = s3.generate_presigned_url(
                ClientMethod='get_object', 
                Params={'Bucket': bucket, 'Key': key},
                ExpiresIn=900
                )
             logger.info(f"presigned url generated for {key} from {bucket}")
             return url
        except Exception as exception:
            logger.error(f"Reason: {exception}")
            return None

def download_file(bucket,key )-> str:
        try: 
            file_path = os.path.join(tempfile.gettempdir(), os.path.basename(key))
            s3.download_file(bucket, key,file_path)
            logger.info(f"file downloaded {file_path}")
            return file_path
        except ClientError as client_err:
            logger.error(f"Couldn\'t download file {key}/{file_path} from {bucket}: {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            logger.error(f"Couldn\'t download file {key}/{file_path} from {bucket}: {exp}")
 
def encode_image_to_base64(image_file_path,image_file) -> str:
        with open(image_file_path, "rb") as image_file:
            b64_image = base64.b64encode(image_file.read()).decode('utf8')       
        return b64_image