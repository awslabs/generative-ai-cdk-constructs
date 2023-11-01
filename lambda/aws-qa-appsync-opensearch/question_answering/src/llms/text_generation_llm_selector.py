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
from langchain.llms.bedrock import Bedrock
from langchain.embeddings import BedrockEmbeddings
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

def get_llm(callbacks=None):
    bedrock = get_bedrock_client(service_name="bedrock-runtime")

    params = {
        "max_tokens_to_sample": 600,
        "temperature": 0,
        "top_k": 250,
        "top_p": 1,
        "stop_sequences": ["\\n\\nHuman:"],
    }

    kwargs = {
        "client": bedrock,
        "model_id": "anthropic.claude-v2",
        "model_kwargs": params,
        "streaming": False 
    }

    if callbacks:
        kwargs["callbacks"] = callbacks
        kwargs["streaming"] = True

    return Bedrock(**kwargs)

def get_embeddings_llm():
    bedrock = get_bedrock_client(service_name="bedrock-runtime")
    return BedrockEmbeddings(client=bedrock, model_id="amazon.titan-embed-text-v1")
    
def get_max_tokens():
    return 100000
    