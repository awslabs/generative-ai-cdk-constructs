from llms import gptj6b
from langchain.llms import BedrockEmbeddings, Bedrock
from enum import Enum
import os
import boto3
from .helper import get_credentials

from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from aws_lambda_powertools.utilities.validation import validate, SchemaValidationError

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

sts_client = boto3.client("sts")

aws_region = boto3.Session().region_name
bedrock_client = boto3.client(
    service_name='bedrock', 
    region_name=aws_region,
    endpoint_url=f'https://bedrock.{aws_region}.amazonaws.com'
)

def get_bedrock_client(service_name="bedrock-runtime"):
    config = {}
    bedrock_config = config.get("bedrock", {})
    bedrock_enabled = bedrock_config.get("enabled", False)
    if not bedrock_enabled:
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

def get_llm():
    bedrock = get_bedrock_client(service_name="bedrock-runtime")
    params = {
        "maxTokens": 2048, 
        "temperature": 0, 
        "topP": 0.5, 
        "stopSequences": [], 
        "countPenalty": {"scale": 0 }, 
        "presencePenalty": {"scale": 0 }, 
        "frequencyPenalty": {"scale": 0 } 
    }

    return Bedrock(
        client=bedrock,
        model_id='anthropic.claude-v2',
        model_kwargs=params,
        streaming=False,
    )

def get_embeddings_llm():
    return BedrockEmbeddings(client=bedrock_client)
    
def get_max_tokens():
    return 100000
    