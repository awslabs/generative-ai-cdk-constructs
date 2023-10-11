import os
import requests
import json
import boto3
from requests_aws4auth import AWS4Auth

from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_INPUT_VALIDATION")
tracer = Tracer(service="SUMMARY_INPUT_VALIDATION")

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
def updateFileStatus(variables):

    print(f"send  status variables :: {variables}")
    query = """
        mutation updateFileStatus {
            updateFileStatus(files: $files, summary_job_id: \"$jobid\") {
                files {
                    name
                    status
                    summary
                }
                summary_job_id
            }
        }
    """

    query = query.replace("$jobid", str(variables['jobid']))
    query = query.replace("$files", str(variables['files']).replace("\'", "\""))
    query = query.replace("\"name\"", "name")
    query = query.replace("\"status\"", "status")
    query = query.replace("\"summary\"", "summary")

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