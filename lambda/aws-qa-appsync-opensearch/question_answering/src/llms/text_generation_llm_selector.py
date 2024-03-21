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
from aiohttp import ClientError
from langchain_community.llms import Bedrock
from langchain_community.embeddings import BedrockEmbeddings
import os
import boto3
from .helper import get_credentials
from .types import Provider, BedrockModel, MAX_TOKENS_MAP

from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from aws_lambda_powertools.utilities.validation import validate, SchemaValidationError

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

def get_bedrock_fm(model_id,modality):
    bedrock_client = boto3.client('bedrock-runtime')
    validation_status= validate_model_id_in_bedrock(model_id,modality)
    logger.info(f' validation_status :: {validation_status}')
    if(validation_status['status']):
        return bedrock_client
    else:
        logger.error(f"reason ::{validation_status['message']} ")
        return None

   
def get_max_tokens(model):

    # if model_id is not provided, we default to Claude v2
    if not model:
        return MAX_TOKENS_MAP[BedrockModel.ANTHROPIC_CLAUDE_V2_1]
    try:
        return MAX_TOKENS_MAP[model]
    except:
        logger.error('unable to get the max tokens for the specified model')
        return -1

        
def validate_model_id_in_bedrock(model_id,modality):
        """
        Validate if the listed model id is supported with given modality
        in bedrock or not.
        """
        response={
            "status":False,
            "message":f"model {model_id} is not supported in bedrock."
        }
        try:
            bedrock_client = boto3.client(service_name="bedrock")
            bedrock_model_list = bedrock_client.list_foundation_models()
            models = bedrock_model_list["modelSummaries"]
            for model in models:
                if model["modelId"].lower() == model_id.lower():   
                    response["message"]=f"model {model_id} does not support modality {modality} "                 
                    for inputModality in model["inputModalities"]:
                        if inputModality.lower() == modality.lower():
                            response["message"]=f"model {model_id} with modality {modality} is supported with bedrock "                 
                            response["status"] = True

            logger.info(f' response :: {response}')
            return response         
        except ClientError as ce:
            message=f"error occured while validating model in bedrock {ce}"
            logger.error(message)
            response["status"] = False
            response["message"] = message
            return response     
