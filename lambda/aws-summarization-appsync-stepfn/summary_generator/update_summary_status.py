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
import base64
from enum import Enum
import os
import requests
import json
import boto3
from requests_aws4auth import AWS4Auth
from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")

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


class JobStatus(Enum):
    DONE = (
        'Done', 
        ''
    )
    WORKING = (
        'Working on generating the summary', 
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
    

    def __init__(self, status, message):
        self.status = status
        self.message = message

    def get_message(self):
        return self.message
    
    
@tracer.capture_method
def get_credentials(secret_id: str, region_name: str) -> str:
    
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_id)
    secrets_value = response['SecretString']    
    
    return secrets_value

@tracer.capture_method
def updateSummaryJobStatus(variables):

    logger.info(f"send  status variables :: {variables}")
    summary = variables['summary']

    query = """
        mutation updateSummaryJobStatus {
            updateSummaryJobStatus(summary_job_id: \"$summary_job_id\",
            name: \"$name\",status: \"$status\",summary: \""""+summary+"""\",) {       
                    summary_job_id
                    name
                    status
                    summary
                      
            }
        }
    """

    query = query.replace("$summary_job_id", variables['summary_job_id'])
    query = query.replace("$name", variables['name'])
    query = query.replace("$status", variables['status'])
    
    

    query = query.replace("\n", "")
    
    request = {'query':query}

    logger.info({"request": request})

    GRAPHQL_URL = os.environ['GRAPHQL_URL']
    HEADERS={
        "Content-Type": "application/json",
    }

    responseJobstatus = requests.post(
        json=request,
        url=GRAPHQL_URL,
        headers=HEADERS,
        auth=aws_auth,
        timeout=10
    )
    logger.info({'res :: ': responseJobstatus})