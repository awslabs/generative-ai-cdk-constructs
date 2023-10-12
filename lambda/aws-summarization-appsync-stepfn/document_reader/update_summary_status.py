import os
import requests
import json
import boto3
from requests_aws4auth import AWS4Auth

from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

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

@tracer.capture_method
def get_credentials(secret_id: str, region_name: str) -> str:
    
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_id)
    secrets_value = response['SecretString']    
    
    return secrets_value

@tracer.capture_method
def updateSummaryJobStatus(variables):

    logger.info(f"send  status variables :: {variables}")
    query = """mutation updateSummaryJobStatus {
            updateSummaryJobStatus(summary_job_id: \"$jobid\",file_name: \"$file_name\", status: \"$status\", summary: \"$summary\") {  
                    summary_job_id
                    file_name
                    status
                    summary
            }
        }
    """

    query = query.replace("$jobid", variables['jobid'])
    query = query.replace("$file_name", variables['file_name'])
    query = query.replace("$status", variables['status'])
    query = query.replace("$summary", variables['summary'])
    

    # query = query.replace("\"file_name\"", "file_name")
    # query = query.replace("\"status\"", "status")
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
        auth=aws_auth
    )
    logger.info({'res :: ': responseJobstatus})