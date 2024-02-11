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
import time
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


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
    reraise=True,
)
def get_agent_status(agent_id: str) -> str:
    client = boto3.client("bedrock-agent")

    try:
        response = client.get_agent(agentId=agent_id)
        return response["agent"]["agentStatus"]
    except botocore.exceptions.ClientError as e:
        can_retry(e)

@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(10),
    wait=wait_exponential_jitter(1, 15),
    reraise=True,
)
def wait_for_agent(agent_id: str) -> str:
    terminal_states = {"PREPARED", "NOT_PREPARED", "FAILED"}

    status = get_agent_status(agent_id)
    if status in terminal_states:
        if status == "FAILED":
            raise Exception(f"Agent in failed state")
        else:
            return status
    else:
        logger.info(f"Agent status is {status}, waiting...")
        raise AWSRetryableError(f"Agent status is {status}")


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
    reraise=True,
)
def prepare_agent(agent_id: str) -> str:
    client = boto3.client("bedrock-agent")

    wait_for_agent(agent_id)

    try:
        client.prepare_agent(agentId=agent_id)
    except botocore.exceptions.ClientError as e:
        if e.response["Error"]["Code"] == "ResourceNotFoundException":
            raise Exception(f"Agent {agent_id} not found")
        can_retry(e)
    status = wait_for_agent(agent_id)
    if status == "PREPARED":
        logger.info(f"Agent {agent_id} prepared")
        return status
    else:
        raise Exception(f"Agent {agent_id} not prepared")
