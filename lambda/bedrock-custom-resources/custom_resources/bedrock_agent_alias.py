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

import logging
import os
import uuid
from typing import TypedDict, NotRequired, Dict, List

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


class AgentAliasRequest(TypedDict):
    agentId: str
    aliasName: str
    agentVersion: NotRequired[str]
    tags: NotRequired[Dict[str, str]]


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

    if request_type == "Create":
        return on_create(event, str(uuid.uuid1()))
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


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(10),
    wait=wait_exponential_jitter(1, 15),
)
def wait_for_agent_status(agent_id: str, status: str, session: boto3.Session) -> str:
    client = session.client("bedrock-agent")

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
def list_alias_versions(agent_id: str, session: boto3.Session) -> List[int]:
    client = session.client("bedrock-agent")

    try:
        response = client.list_agent_aliases(agentId=agent_id)
        return sorted(
            [
                int(version["agentVersion"])
                for alias in response["agentAliasSummaries"]
                for version in alias["routingConfiguration"]
                if version["agentVersion"] != "DRAFT"
            ]
        )
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)
    return []


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def list_unused_agent_versions(agent_id: str, session: boto3.Session) -> List[int]:
    client = session.client("bedrock-agent")

    alias_versions = list_alias_versions(agent_id, session)

    try:
        response = client.list_agent_versions(agentId=agent_id)
        return sorted(
            [
                int(version["agentVersion"])
                for version in response["agentVersionSummaries"]
                if version["agentVersion"] not in alias_versions and version["agentVersion"] != "DRAFT"
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


def get_routing_configuration(agent_version: str | None) -> List[Dict[str, str]] | None:
    if agent_version:
        routing_configuration = [{"agentVersion": agent_version}]
    else:
        routing_configuration = None
    return routing_configuration


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def create_agent_alias(
        agent_id: str, alias_name: str, session: boto3.Session, agent_version: str = None, client_token: str = None
) -> AgentAliasResponse:
    client = session.client("bedrock-agent")

    try:
        response = client.create_agent_alias(
            clientToken=client_token,
            agentId=agent_id,
            agentAliasName=alias_name,
            routingConfiguration=get_routing_configuration(agent_version),
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
        agent_id: str, agent_alias_id: str, alias_name: str, session: boto3.Session, agent_version: str | None = None
) -> AgentAliasResponse:
    client = session.client("bedrock-agent")

    try:
        response = client.update_agent_alias(
            agentId=agent_id,
            agentAliasId=agent_alias_id,
            agentAliasName=alias_name,
            routingConfiguration=get_routing_configuration(agent_version)
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
def delete_agent_version(agent_id: str, version: int, session: boto3.Session) -> None:
    client = session.client("bedrock-agent")

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
        agent_id: str, agent_alias_id: str, session: boto3.Session
) -> AgentAliasResponse:
    client = session.client("bedrock-agent")

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
        event: CustomResourceRequest[AgentAliasRequest], client_token: str
) -> CustomResourceResponse:
    """
    1. PrepareAgent
    2. Call GetAgent until agentStatus is PREPARED
    3. CreateAgentAlias with version 1
    """
    session = boto3.session.Session()
    agent_id = event["ResourceProperties"]["agentId"]
    alias_name = event["ResourceProperties"]["aliasName"]
    agent_version = event["ResourceProperties"].get("agentVersion")

    prepare_agent(agent_id, session)
    wait_for_agent_status(agent_id, "PREPARED", session)
    response = create_agent_alias(agent_id, alias_name, session, agent_version, client_token)
    return CustomResourceResponse(
        PhysicalResourceId=response["agentAliasId"],
        Data=response,
    )


def on_update(event: CustomResourceRequest[AgentAliasRequest]) -> CustomResourceResponse:
    """
    1. PrepareAgent
    2. Call GetAgent until agentStatus is PREPARED
    3. ListAgentVersions to get the latest and previous version numbers excluding DRAFT
    4. Determine the next version number
    5. UpdateAgentAlias with the next version number
    6. Delete all but two most recent versions excluding DRAFT
    """
    session = boto3.session.Session()
    agent_id = event["ResourceProperties"]["agentId"]
    agent_alias_id = event["PhysicalResourceId"]
    alias_name = event["ResourceProperties"]["aliasName"]
    agent_version = event["ResourceProperties"].get("agentVersion")

    prepare_agent(agent_id, session)
    wait_for_agent_status(agent_id, "PREPARED", session)
    versions = list_unused_agent_versions(agent_id, session)
    response = update_agent_alias(agent_id, agent_alias_id, alias_name, session, agent_version)
    for version in versions[:-1]:
        delete_agent_version(agent_id, version, session)

    return CustomResourceResponse(
        PhysicalResourceId=response["agentAliasId"],
        Data=response,
    )


def on_delete(event: CustomResourceRequest[AgentAliasRequest]) -> CustomResourceResponse:
    """
    Deletion:
    1. DeleteAgentAlias
    2. Delete all versions excluding DRAFT
    """
    session = boto3.session.Session()
    agent_id = event["ResourceProperties"]["agentId"]
    agent_alias_id = event["PhysicalResourceId"]

    delete_agent_alias(agent_id, agent_alias_id, session)
    versions = list_unused_agent_versions(agent_id, session)
    for version in versions:
        delete_agent_version(agent_id, version, session)

    return CustomResourceResponse(PhysicalResourceId=agent_alias_id)
