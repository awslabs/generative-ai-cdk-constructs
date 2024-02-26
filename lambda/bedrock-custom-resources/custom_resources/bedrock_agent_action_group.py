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

import logging
import os
from typing import TypedDict, NotRequired

import boto3
import botocore.exceptions
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential_jitter,
)

from .bedrock_prepare_agent import prepare_agent
from .cr_types import CustomResourceRequest, CustomResourceResponse
from .exceptions import AWSRetryableError, can_retry

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class S3Identifier(TypedDict):
    s3BucketName: str
    s3ObjectKey: str


class APISchema(TypedDict):
    payload: NotRequired[str]
    s3: NotRequired[S3Identifier]


ActionGroupExecutor = TypedDict("ActionGroupExecutor", {"lambda": str})


class AgentActionGroupProps(TypedDict):
    agentId: str
    actionGroupExecutor: NotRequired[ActionGroupExecutor]
    actionGroupName: str
    actionGroupState: str
    apiSchema: NotRequired[APISchema]
    description: NotRequired[str]
    parentActionGroupSignature: NotRequired[str]
    shouldPrepareAgent: NotRequired[str]


class AgentActionGroupResponse(TypedDict):
    actionGroupId: str
    updatedAt: str


def on_event(event: CustomResourceRequest[AgentActionGroupProps], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
    reraise=True,
)
def on_create(
        event: CustomResourceRequest[AgentActionGroupProps]
) -> CustomResourceResponse:
    bedrock_agent = boto3.client("bedrock-agent")
    if "shouldPrepareAgent" in event["ResourceProperties"]:
        should_prepare_agent = event["ResourceProperties"]["shouldPrepareAgent"].upper() == 'TRUE'
        del event["ResourceProperties"]["shouldPrepareAgent"]
    else:
        should_prepare_agent = False
    try:
        response = bedrock_agent.create_agent_action_group(
            **event["ResourceProperties"],
            agentVersion="DRAFT",

        )
        if should_prepare_agent:
            prepare_agent(event["ResourceProperties"]["agentId"])
        return CustomResourceResponse(
            PhysicalResourceId=response["agentActionGroup"]["actionGroupId"],
            Data=AgentActionGroupResponse(
                actionGroupId=response["agentActionGroup"]["actionGroupId"],
                updatedAt=str(response["agentActionGroup"]["updatedAt"]),
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
    reraise=True,
)
def on_update(
        event: CustomResourceRequest[AgentActionGroupProps]
) -> CustomResourceResponse:
    bedrock_agent = boto3.client("bedrock-agent")
    if "shouldPrepareAgent" in event["ResourceProperties"]:
        should_prepare_agent = event["ResourceProperties"]["shouldPrepareAgent"].upper() == 'TRUE'
        del event["ResourceProperties"]["shouldPrepareAgent"]
    else:
        should_prepare_agent = False
    try:
        response = bedrock_agent.update_agent_action_group(
            actionGroupId=event["PhysicalResourceId"],
            **event["ResourceProperties"],
            agentVersion="DRAFT",
        )
        if should_prepare_agent:
            prepare_agent(event["ResourceProperties"]["agentId"])
        return CustomResourceResponse(
            PhysicalResourceId=response["agentActionGroup"]["actionGroupId"],
            Data=AgentActionGroupResponse(
                actionGroupId=response["agentActionGroup"]["actionGroupId"],
                updatedAt=str(response["agentActionGroup"]["updatedAt"]),
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
    reraise=True,
)
def on_delete(
        event: CustomResourceRequest[AgentActionGroupProps]
) -> CustomResourceResponse:
    bedrock_agent = boto3.client("bedrock-agent")
    if "shouldPrepareAgent" in event["ResourceProperties"]:
        should_prepare_agent = event["ResourceProperties"]["shouldPrepareAgent"].upper() == 'TRUE'
        del event["ResourceProperties"]["shouldPrepareAgent"]
    else:
        should_prepare_agent = False
    try:
        bedrock_agent.delete_agent_action_group(
            agentId=event["ResourceProperties"]["agentId"],
            agentVersion="DRAFT",
            actionGroupId=event["PhysicalResourceId"],
            skipResourceInUseCheck=True,
        )
        if should_prepare_agent:
            prepare_agent(event["ResourceProperties"]["agentId"])
        return CustomResourceResponse(
            PhysicalResourceId=event["PhysicalResourceId"],
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            logger.error(
                f"Agent action group {event['PhysicalResourceId']} not found"
            )
            return CustomResourceResponse(
                PhysicalResourceId=event["PhysicalResourceId"],
            )
        can_retry(e)
