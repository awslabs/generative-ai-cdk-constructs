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


class AgentKBProps(TypedDict):
    agentId: str
    knowledgeBaseId: str
    description: NotRequired[str]


class AgentKBResponse(TypedDict):
    changeId: str


def on_event(event: CustomResourceRequest[AgentKBProps], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]
    bedrock_agent = boto3.client("bedrock-agent")

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    if request_type == "Create":
        return on_create(event, bedrock_agent)
    if request_type == "Update":
        return on_update(event, bedrock_agent)
    if request_type == "Delete":
        return on_delete(event, bedrock_agent)
    raise Exception("Invalid request type: %s" % request_type)


def get_physical_id(resource_props: AgentKBProps) -> str:
    return f"{resource_props['agentId']}#{resource_props['knowledgeBaseId']}"


def get_change_id(resource_props: AgentKBProps) -> str:
    return str(
        hash(
            resource_props["agentId"]
            + "#"
            + resource_props["knowledgeBaseId"]
            + "#"
            + resource_props["description"]
        )
    )


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def on_create(
    event: CustomResourceRequest[AgentKBProps], bedrock_agent
) -> CustomResourceResponse:
    try:
        response = bedrock_agent.associate_agent_knowledge_base(
            agentId=event["ResourceProperties"]["agentId"],
            knowledgeBaseId=event["ResourceProperties"]["knowledgeBaseId"],
            agentVersion="DRAFT",
            description=event["ResourceProperties"]["description"],
            knowledgeBaseState="ENABLED",
        )
        return CustomResourceResponse(
            PhysicalResourceId=get_physical_id(event["ResourceProperties"]),
            Data=AgentKBResponse(changeId=get_change_id(event["ResourceProperties"])),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def on_update(
    event: CustomResourceRequest[AgentKBProps], bedrock_agent
) -> CustomResourceResponse:
    try:
        response = bedrock_agent.update_agent_knowledge_base(
            agentId=event["ResourceProperties"]["agentId"],
            knowledgeBaseId=event["ResourceProperties"]["knowledgeBaseId"],
            agentVersion="DRAFT",
            description=event["ResourceProperties"]["description"],
            knowledgeBaseState="ENABLED",
        )
        return CustomResourceResponse(
            PhysicalResourceId=get_physical_id(event["ResourceProperties"]),
            Data=AgentKBResponse(changeId=get_change_id(event["ResourceProperties"])),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def on_delete(
    event: CustomResourceRequest[AgentKBProps], bedrock_agent
) -> CustomResourceResponse:
    try:
        response = bedrock_agent.disassociate_agent_knowledge_base(
            agentId=event["ResourceProperties"]["agentId"],
            knowledgeBaseId=event["ResourceProperties"]["knowledgeBaseId"],
            agentVersion="DRAFT",
        )
        return CustomResourceResponse(
            PhysicalResourceId=get_physical_id(event["ResourceProperties"]),
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            logger.error(
                f"Agent {event['ResourceProperties']['agentId']} is not associated with knowledge base {event['ResourceProperties']['knowledgeBaseId']}"
            )
            return CustomResourceResponse(
                PhysicalResourceId=get_physical_id(event["ResourceProperties"]),
            )
        can_retry(e)
