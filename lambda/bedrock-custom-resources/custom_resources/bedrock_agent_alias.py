# Copyright 2023 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# Licensed under the Amazon Software License (the "License"). You may not
# use this file except in compliance with the License. A copy of the
# License is located at:
# http://aws.amazon.com/asl/
# or in the "license" file accompanying this file. This file is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.
# See the License for the specific language governing permissions and
# limitations under the License.

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

from typing import TypedDict, NotRequired, Dict, List

from .cr_types import CustomResourceRequest, CustomResourceResponse
from .exceptions import AWSRetryableError, can_retry

import uuid

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


def bedrock_agent_client():
    session = boto3.Session()
    client = session.client("bedrock-agent")
    return client


class AgentAliasResponse(TypedDict):
    agentAliasId: str
    agentAliasArn: NotRequired[str]
    agentAliasName: NotRequired[str]
    agentVersion: NotRequired[str]


def on_event(event: CustomResourceRequest[Dict], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    client = bedrock_agent_client()

    if request_type == "Create":
        return on_create(event, str(uuid.uuid1()), client)
    if request_type == "Update":
        return on_update(event, client)
    if request_type == "Delete":
        return on_delete(event, client)
    raise Exception(f"Invalid request type: {request_type}")


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def prepare_agent(agent_id: str, client) -> str:
    try:
        response = client.prepare_agent(agentId=agent_id)
        return response["agentStatus"]
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(10),
    wait=wait_exponential_jitter(1, 15),
)
def wait_for_agent_status(agent_id: str, status: str, client) -> str:
    try:
        response = client.get_agent(agentId=agent_id)
        if response["agent"]["agentStatus"] == status:
            return response["agent"]["agentStatus"]
        else:
            raise AWSRetryableError(
                f"Agent {agent_id} not in {status} state: {response['agent']['agentStatus']}"
            )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)
    return status


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def list_agent_versions(agent_id: str, client) -> List[int]:
    try:
        response = client.list_agent_versions(agentId=agent_id)
        return sorted(
            [
                int(version["agentVersion"])
                for version in response["agentVersionSummaries"]
                if version["agentVersion"] != "DRAFT"
            ]
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)
    return []


def get_version(routing_configuration: List[Dict]) -> str:
    if len(routing_configuration) == 1:
        return routing_configuration[0]["agentVersion"]
    else:
        return None


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def create_agent_alias(
    agent_id: str, alias_name: str, client, client_token: str = None
) -> AgentAliasResponse:
    try:
        response = client.create_agent_alias(
            agentId=agent_id,
            agentAliasName=alias_name,
        )
        agent_version = get_version(
            response["agentAlias"].get("routingConfiguration", [])
        )
        return AgentAliasResponse(
            agentAliasId=response["agentAlias"]["agentAliasId"],
            agentAliasArn=response["agentAlias"]["agentAliasArn"],
            agentAliasName=response["agentAlias"]["agentAliasName"],
            agentVersion=agent_version,
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def update_agent_alias(
    agent_id: str, agent_alias_id: str, alias_name: str, client
) -> AgentAliasResponse:
    try:
        response = client.update_agent_alias(
            agentId=agent_id,
            agentAliasId=agent_alias_id,
            agentAliasName=alias_name,
        )
        agent_version = get_version(
            response["agentAlias"].get("routingConfiguration", [])
        )
        return AgentAliasResponse(
            agentAliasId=response["agentAlias"]["agentAliasId"],
            agentAliasArn=response["agentAlias"]["agentAliasArn"],
            agentAliasName=response["agentAlias"]["agentAliasName"],
            agentVersion=agent_version,
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def delete_agent_version(agent_id: str, version: int, client) -> None:
    try:
        client.delete_agent_version(
            agentId=agent_id, agentVersion=str(version), skipResourceInUseCheck=True
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            logger.info(
                f"Agent {agent_id} or version {version} not found during delete"
            )
        can_retry(e)
    return None


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def delete_agent_alias(
    agent_id: str, agent_alias_id: str, client
) -> AgentAliasResponse:
    try:
        response = client.delete_agent_alias(
            agentId=agent_id, agentAliasId=agent_alias_id
        )
        return AgentAliasResponse(
            agentAliasId=response["agentAliasId"],
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            logger.info(
                f"Agent {agent_id} or alias {agent_alias_id} not found during delete"
            )
        can_retry(e)


def on_create(
    event: CustomResourceRequest[Dict], client_token: str, client
) -> CustomResourceResponse:
    """
    1. PrepareAgent
    2. Call GetAgent until agentStatus is PREPARED
    3. CreateAgentAlias with version 1
    """
    agent_id = event["ResourceProperties"]["agentId"]
    alias_name = event["ResourceProperties"]["aliasName"]

    prepare_agent(agent_id, client)
    wait_for_agent_status(agent_id, "PREPARED", client)
    response = create_agent_alias(agent_id, alias_name, client, client_token)
    return CustomResourceResponse(
        PhysicalResourceId=response["agentAliasId"],
        Data=response,
    )


def on_update(event: CustomResourceRequest[Dict], client) -> CustomResourceResponse:
    """
    1. PrepareAgent
    2. Call GetAgent until agentStatus is PREPARED
    3. ListAgentVersions to get the latest and previous version numbers excluding DRAFT
    4. Determine the next version number
    5. UpdateAgentAlias with the next version number
    6. Delete all but two most recent versions excluding DRAFT
    """
    agent_id = event["ResourceProperties"]["agentId"]
    agent_alias_id = event["PhysicalResourceId"]
    alias_name = event["ResourceProperties"]["aliasName"]

    prepare_agent(agent_id, client)
    wait_for_agent_status(agent_id, "PREPARED", client)
    versions = list_agent_versions(agent_id, client)
    response = update_agent_alias(agent_id, agent_alias_id, alias_name, client)
    for version in versions[:-1]:
        delete_agent_version(agent_id, version, client)

    return CustomResourceResponse(
        PhysicalResourceId=response["agentAliasId"],
        Data=response,
    )


def on_delete(event: CustomResourceRequest[Dict], client) -> CustomResourceResponse:
    """
    Deletion:
    1. DeleteAgentAlias
    2. Delete all versions excluding DRAFT
    """

    agent_id = event["ResourceProperties"]["agentId"]
    agent_alias_id = event["PhysicalResourceId"]

    delete_agent_alias(agent_id, agent_alias_id, client)
    versions = list_agent_versions(agent_id, client)
    for version in versions:
        delete_agent_version(agent_id, version, client)

    return CustomResourceResponse(PhysicalResourceId=agent_alias_id)
