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
import uuid

import boto3
import botocore.exceptions
import logging
import os
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential_jitter,
)

from typing import TypedDict, NotRequired, Dict

from .cr_types import CustomResourceRequest, CustomResourceResponse
from .exceptions import AWSRetryableError, can_retry

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class KnowledgeBaseResponse(TypedDict):
    knowledgeBaseId: str
    knowledgeBaseArn: NotRequired[str]
    name: NotRequired[str]


def on_event(event: CustomResourceRequest[Dict], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]
    bedrock_agent = boto3.client("bedrock-agent")

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    if request_type == "Create":
        return on_create(event, bedrock_agent, str(uuid.uuid1()))
    if request_type == "Update":
        return on_update(event, bedrock_agent)
    if request_type == "Delete":
        return on_delete(event, bedrock_agent)
    raise Exception("Invalid request type: %s" % request_type)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(7),
    wait=wait_exponential_jitter(1, 15),
)
def on_create(
    event: CustomResourceRequest[Dict], bedrock_agent, client_token=None
) -> CustomResourceResponse:
    try:
        response = bedrock_agent.create_knowledge_base(
            **event["ResourceProperties"],
            clientToken=client_token,
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["knowledgeBase"]["knowledgeBaseId"],
            Data=KnowledgeBaseResponse(
                knowledgeBaseArn=response["knowledgeBase"]["knowledgeBaseArn"],
                knowledgeBaseId=response["knowledgeBase"]["knowledgeBaseId"],
                name=response["knowledgeBase"]["name"],
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(7),
    wait=wait_exponential_jitter(1, 15),
)
def on_update(
    event: CustomResourceRequest[Dict], bedrock_agent
) -> CustomResourceResponse:
    if "tags" in event["ResourceProperties"]:
        del event["ResourceProperties"]["tags"]
    try:
        response = bedrock_agent.update_knowledge_base(
            **event["ResourceProperties"], knowledgeBaseId=event["PhysicalResourceId"]
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["knowledgeBase"]["knowledgeBaseId"],
            Data=KnowledgeBaseResponse(
                knowledgeBaseArn=response["knowledgeBase"]["knowledgeBaseArn"],
                knowledgeBaseId=response["knowledgeBase"]["knowledgeBaseId"],
                name=response["knowledgeBase"]["name"],
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def on_delete(
    event: CustomResourceRequest[Dict], bedrock_agent
) -> CustomResourceResponse:
    try:
        response = bedrock_agent.delete_knowledge_base(
            knowledgeBaseId=event["PhysicalResourceId"],
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["knowledgeBaseId"],
            Data=KnowledgeBaseResponse(
                knowledgeBaseId=response["knowledgeBaseId"],
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)
