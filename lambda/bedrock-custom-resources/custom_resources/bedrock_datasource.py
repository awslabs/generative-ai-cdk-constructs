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

from .exceptions import AWSRetryableError, can_retry
from .cr_types import CustomResourceRequest, CustomResourceResponse

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)

session = boto3.Session()


class S3DataSourceConfiguration(TypedDict):
    bucketArn: str
    inclusionPrefixes: NotRequired[Sequence[str]]


class DataSourceConfiguration(TypedDict):
    type: Literal["S3"]
    s3Configuration: NotRequired[S3DataSourceConfiguration]


class ServerSideEncryptionConfiguration(TypedDict):
    kmsKeyArn: NotRequired[str]


class FixedSizeChunkingConfiguration(TypedDict):
    maxTokens: int
    overlapPercentage: int


class ChunkingConfiguration(TypedDict):
    chunkingStrategy: Literal["FIXED_SIZE", "NONE"]
    fixedSizeChunkingConfiguration: NotRequired[FixedSizeChunkingConfiguration]


class VectorIngestionConfiguration(TypedDict):
    chunkingConfiguration: NotRequired[ChunkingConfiguration]


class DataSourceRequest(TypedDict):
    knowledgeBaseId: str
    name: str
    dataSourceConfiguration: DataSourceConfiguration
    description: str
    serverSideEncryptionConfiguration: NotRequired[ServerSideEncryptionConfiguration]
    vectorIngestionConfiguration: NotRequired[VectorIngestionConfiguration]


class DataSourceResponse(TypedDict):
    dataSourceId: str
    name: NotRequired[str]


def coerce_ints(request: DataSourceRequest) -> DataSourceRequest:
    try:
        request["vectorIngestionConfiguration"]["chunkingConfiguration"][
            "fixedSizeChunkingConfiguration"
        ]["maxTokens"] = int(
            request["vectorIngestionConfiguration"]["chunkingConfiguration"][
                "fixedSizeChunkingConfiguration"
            ]["maxTokens"]
        )
    except KeyError:
        pass
    try:
        request["vectorIngestionConfiguration"]["chunkingConfiguration"][
            "fixedSizeChunkingConfiguration"
        ]["overlapPercentage"] = int(
            request["vectorIngestionConfiguration"]["chunkingConfiguration"][
                "fixedSizeChunkingConfiguration"
            ]["overlapPercentage"]
        )
    except KeyError:
        pass
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
    stop=stop_after_attempt(10),
    wait=wait_exponential_jitter(1, 15),
    reraise=True,
)
def on_create(
    event: CustomResourceRequest[DataSourceRequest], client_token=None
) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")
    try:
        request = coerce_ints(event["ResourceProperties"])

        response = bedrock_agent.create_data_source(
            **request,
            clientToken=client_token,
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["dataSource"]["dataSourceId"],
            Data=DataSourceResponse(
                dataSourceId=response["dataSource"]["dataSourceId"],
                name=response["dataSource"]["name"],
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
    event: CustomResourceRequest[DataSourceRequest],
) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")

    try:
        request = coerce_ints(event["ResourceProperties"])
        response = bedrock_agent.update_data_source(
            **request, dataSourceId=event["PhysicalResourceId"]
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["dataSource"]["dataSourceId"],
            Data=DataSourceResponse(
                dataSourceId=response["dataSource"]["dataSourceId"],
                name=response["dataSource"]["name"],
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
def on_delete(event: CustomResourceRequest[Dict]) -> CustomResourceResponse:
    bedrock_agent = session.client("bedrock-agent")

    try:
        response = bedrock_agent.delete_data_source(
            dataSourceId=event["PhysicalResourceId"],
            knowledgeBaseId=event["ResourceProperties"]["knowledgeBaseId"],
        )
        return CustomResourceResponse(
            PhysicalResourceId=response["dataSourceId"],
            Data=DataSourceResponse(
                dataSourceId=response["dataSourceId"],
            ),
        )
    except botocore.exceptions.ClientError as e:
        can_retry(e)
