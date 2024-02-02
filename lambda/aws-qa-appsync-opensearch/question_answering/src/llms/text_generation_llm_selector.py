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
from langchain_community.embeddings import BedrockEmbeddings
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


def get_llm(callbacks=None):
    bedrock = boto3.client('bedrock-runtime')

    params = {
        "max_tokens_to_sample": 600,
        "temperature": 0,
        "top_k": 250,
        "top_p": 1,
        "stop_sequences": ["\\n\\nHuman:"],
    }

    kwargs = {
        "client": bedrock,
        "model_id": "anthropic.claude-v2:1",
        "model_kwargs": params,
        "streaming": False 
    }

    if callbacks:
        kwargs["callbacks"] = callbacks
        kwargs["streaming"] = True

    return Bedrock(**kwargs)

def get_embeddings_llm():
    bedrock = boto3.client('bedrock-runtime')
    return BedrockEmbeddings(client=bedrock, model_id="amazon.titan-embed-text-v1")
    
def get_max_tokens():
    return 200000
    