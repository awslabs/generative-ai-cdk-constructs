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

from typing import TypedDict, NotRequired, Dict, Literal, Sequence

from .bedrock_prepare_agent import prepare_agent
from .cr_types import CustomResourceRequest, CustomResourceResponse
from .exceptions import AWSRetryableError, can_retry

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class InferenceConfiguration(TypedDict):
    temperature: NotRequired[float]
    topP: NotRequired[float]
    topK: NotRequired[int]
    stopSequences: NotRequired[Sequence[str]]
    maximumLength: NotRequired[int]


class PromptConfiguration(TypedDict):
    promptType: NotRequired[
        Literal[
            "PRE_PROCESSING",
            "ORCHESTRATION",
            "POST_PROCESSING",
            "KNOWLEDGE_BASE_RESPONSE_GENERATION",
        ]
    ]
    inferenceConfiguration: NotRequired[InferenceConfiguration]
    basePromptTemplate: NotRequired[str]
    parserMode: NotRequired[Literal["DEFAULT", "OVERRIDDEN"]]
    promptCreationMode: NotRequired[Literal["DEFAULT", "OVERRIDDEN"]]
    promptState: NotRequired[Literal["ENABLED", "DISABLED"]]


class PromptOverride(TypedDict):
    promptConfigurations: Sequence[PromptConfiguration]
    overrideLambda: NotRequired[str]


class AgentRequest(TypedDict):
    agentName: str
    agentResourceRoleArn: str
    description: NotRequired[str]
    instruction: NotRequired[str]
    foundationModel: NotRequired[str]
    idleSessionTTLInSeconds: NotRequired[int]
    customerEncryptionKeyArn: NotRequired[str]
    promptOverrideConfiguration: NotRequired[PromptOverride]
    tags: NotRequired[Dict[str, str]]
    shouldPrepareAgent: NotRequired[str]


class AgentResponse(TypedDict):
    agentId: str
    agentArn: NotRequired[str]
    agentName: NotRequired[str]
    updatedAt: NotRequired[str]


session = boto3.session.Session()


def validate_prompt_configuration(config: PromptConfiguration) -> PromptConfiguration:
    if "promptType" in config:
        if config["promptType"] not in [
            "PRE_PROCESSING",
            "ORCHESTRATION",
            "POST_PROCESSING",
            "KNOWLEDGE_BASE_RESPONSE_GENERATION",
        ]:
            raise ValueError(f"Invalid prompt type: {config['promptType']}")
    if "inferenceConfiguration" in config:
        if "temperature" in config["inferenceConfiguration"]:
            config["inferenceConfiguration"]["temperature"] = float(
                config["inferenceConfiguration"]["temperature"]
            )
        if "topP" in config["inferenceConfiguration"]:
            config["inferenceConfiguration"]["topP"] = float(
                config["inferenceConfiguration"]["topP"]
            )
        if "topK" in config["inferenceConfiguration"]:
            config["inferenceConfiguration"]["topK"] = int(
                config["inferenceConfiguration"]["topK"]
            )
        if "maximumLength" in config["inferenceConfiguration"]:
            config["inferenceConfiguration"]["maximumLength"] = int(
                config["inferenceConfiguration"]["maximumLength"]
            )
            if (
                config["inferenceConfiguration"]["maximumLength"] < 0
                or config["inferenceConfiguration"]["maximumLength"] > 4096
            ):
                raise ValueError(
                    f"Invalid maximum length: {config['inferenceConfiguration']['maximumLength']}"
                )
        if "stopSequences" in config["inferenceConfiguration"]:
            if not all(
                [
                    isinstance(s, str)
                    for s in config["inferenceConfiguration"]["stopSequences"]
                ]
            ):
                raise ValueError(
                    f"Invalid stop sequences: {config['inferenceConfiguration']['stopSequences']}"
                )
            if len(config["inferenceConfiguration"]["stopSequences"]) > 4:
                raise ValueError(
                    f"Too many stop sequences: {config['inferenceConfiguration']['stopSequences']}"
                )
    if "basePromptTemplate" in config:
        if not isinstance(config["basePromptTemplate"], str):
            raise ValueError(
                f"Invalid base prompt template: {config['basePromptTemplate']}"
            )
    if "parserMode" in config:
        if config["parserMode"] not in ["DEFAULT", "OVERRIDDEN"]:
            raise ValueError(f"Invalid parser mode: {config['parserMode']}")
    if "promptCreationMode" in config:
        if config["promptCreationMode"] not in ["DEFAULT", "OVERRIDDEN"]:
            raise ValueError(
                f"Invalid prompt creation mode: {config['promptCreationMode']}"
            )
    if "promptState" in config:
        if config["promptState"] not in ["ENABLED", "DISABLED"]:
            raise ValueError(f"Invalid prompt state: {config['promptState']}")
    return config


def validate_agent_request(request: AgentRequest) -> AgentRequest:
    if "agentName" not in request:
        raise ValueError("agentName is required")
    if "agentResourceRoleArn" not in request:
        raise ValueError("agentResourceRoleArn is required")
    if request.get("idleSessionTTLInSeconds") is not None:
        request["idleSessionTTLInSeconds"] = int(request["idleSessionTTLInSeconds"])
    if "promptOverrideConfiguration" in request:
        if "promptConfigurations" not in request["promptOverrideConfiguration"]:
            raise ValueError("promptConfigurations is required")
        request["promptOverrideConfiguration"]["promptConfigurations"] = [
            validate_prompt_configuration(config)
            for config in request["promptOverrideConfiguration"]["promptConfigurations"]
        ]
    return request


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
    raise Exception("Invalid request type: %s" % request_type)


@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(7),
    wait=wait_exponential_jitter(1, 15),
)
def on_create(
    event: CustomResourceRequest[Dict], client_token=None
) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")

    if "shouldPrepareAgent" in event["ResourceProperties"]:
        should_prepare_agent = event["ResourceProperties"]["shouldPrepareAgent"].upper() == 'TRUE'
        del event["ResourceProperties"]["shouldPrepareAgent"]
    else:
        should_prepare_agent = False

    request = AgentRequest(**event["ResourceProperties"])
    request = validate_agent_request(request)

    try:
        response = bedrock_agent.create_agent(clientToken=client_token, **request)

    except botocore.exceptions.ClientError as e:
        can_retry(e)
    if should_prepare_agent:
        prepare_agent(response["agent"]["agentId"])
    return CustomResourceResponse(
            PhysicalResourceId=response["agent"]["agentId"],
            Data=AgentResponse(
                agentArn=response["agent"]["agentArn"],
                agentId=response["agent"]["agentId"],
                agentName=response["agent"]["agentName"],
                updatedAt=str(response["agent"]["updatedAt"]),
            ),
        )

@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(7),
    wait=wait_exponential_jitter(1, 15),
)
def on_update(event: CustomResourceRequest[Dict]) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")
    if "shouldPrepareAgent" in event["ResourceProperties"]:
        should_prepare_agent = event["ResourceProperties"]["shouldPrepareAgent"].upper() == 'TRUE'
        del event["ResourceProperties"]["shouldPrepareAgent"]
    else:
        should_prepare_agent = False
    request = AgentRequest(**event["ResourceProperties"])
    request = validate_agent_request(request)
    if "tags" in request:
        del request["tags"]

    try:
        response = bedrock_agent.update_agent(
            **request,
            agentId=event["PhysicalResourceId"],
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)
    if should_prepare_agent:
        prepare_agent(response["agent"]["agentId"])
    return CustomResourceResponse(
        PhysicalResourceId=response["agent"]["agentId"],
        Data=AgentResponse(
            agentArn=response["agent"]["agentArn"],
            agentId=response["agent"]["agentId"],
            agentName=response["agent"]["agentName"],
            updatedAt=str(response["agent"]["updatedAt"]),
        ),
    )

@retry(
    retry=retry_if_exception_type(AWSRetryableError),
    stop=stop_after_attempt(3),
    wait=wait_exponential_jitter(1, 3),
)
def on_delete(event: CustomResourceRequest[Dict]) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")

    try:
        response = bedrock_agent.delete_agent(
            agentId=event["PhysicalResourceId"],
            skipResourceInUseCheck=True,
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["agentId"],
            Data=AgentResponse(
                agentId=response["agentId"],
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)
