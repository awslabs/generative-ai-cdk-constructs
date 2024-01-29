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

"""
Input should be agentId, alias name, and hashes of any knowledge bases and action groups attached to identify changes.

Creation:
1. PrepareAgent
2. Call GetAgent until agentStatus is PREPARED
3. CreateAgentAlias with version 1

Updates:
1. PrepareAgent
2. Call GetAgent until agentStatus is PREPARED
3. ListAgentVersions to get the latest and previous version numbers excluding DRAFT
4. Determine the next version number
5. UpdateAgentAlias with the next version number
6. Delete all but two most recent versions excluding DRAFT

Deletion:
1. DeleteAgentAlias
2. Delete all versions excluding DRAFT
"""

import logging
import os
from typing import TypedDict, Dict

import boto3
import botocore.exceptions
from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential_jitter,
)

from .cr_types import CustomResourceRequest, CustomResourceResponse
from .exceptions import AWSRetryableError, can_retry

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class PrepareAgentRequest(TypedDict):
    agentId: str


def on_event(event: CustomResourceRequest[Dict], context):
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
    raise Exception(f"Invalid request type: {request_type}")


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def prepare_agent(agent_id: str, session: boto3.Session) -> str:
    client = session.client("bedrock-agent")

    try:
        response = client.prepare_agent(agentId=agent_id)
        return response["agentStatus"]
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)


def on_create(event: CustomResourceRequest[PrepareAgentRequest]) -> CustomResourceResponse:
    session = boto3.session.Session()
    agent_id = event["ResourceProperties"]["agentId"]

    prepare_agent(agent_id, session)
    return CustomResourceResponse(
        PhysicalResourceId=agent_id,
    )


def on_update(event: CustomResourceRequest[PrepareAgentRequest]) -> CustomResourceResponse:
    session = boto3.session.Session()
    agent_id = event["ResourceProperties"]["agentId"]

    prepare_agent(agent_id, session)
    return CustomResourceResponse(
        PhysicalResourceId=agent_id,
    )


def on_delete(event: CustomResourceRequest[PrepareAgentRequest]) -> CustomResourceResponse:
    agent_id = event["ResourceProperties"]["agentId"]

    return CustomResourceResponse(PhysicalResourceId=agent_id)
