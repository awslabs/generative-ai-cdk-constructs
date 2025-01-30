#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
#  with the License. A copy of the License is located at
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
#  and limitations under the License.
#

import logging
import os
from typing import TypedDict, NotRequired

import boto3

from aws_bedrock_batch_sfn.StepFunctions.task_token_tags import Tag, build_task_token_tags

logger = logging.getLogger("CreateModelInvocationJob")
logger.setLevel(os.getenv("LOG_LEVEL", logging.INFO))
# reducing noise from logs, if you really need DEBUG level logs from these libraries, customize the levels below
logging.getLogger("boto").setLevel(logging.INFO)
logging.getLogger("boto3").setLevel(logging.INFO)
logging.getLogger("botocore").setLevel(logging.WARNING)
logging.getLogger("urllib3").setLevel(logging.WARNING)
logging.getLogger("s3transfer").setLevel(logging.WARNING)

bedrock = boto3.client("bedrock")


class S3InputDataConfig(TypedDict):
    s3Uri: str
    s3InputFormat: NotRequired[str]
    s3BucketOwner: NotRequired[str]


class InputDataConfig(TypedDict):
    s3InputDataConfig: S3InputDataConfig


class S3OutputDataConfig(TypedDict):
    s3Uri: str
    s3EncryptionKeyId: NotRequired[str]
    s3BucketOwner: NotRequired[str]


class OutputDataConfig(TypedDict):
    s3OutputDataConfig: S3OutputDataConfig


class CreateModelInvocationJobInput(TypedDict):
    jobName: str
    roleArn: str
    clientRequestToken: NotRequired[str]
    modelId: str
    inputDataConfig: InputDataConfig
    outputDataConfig: OutputDataConfig
    vpcConfig: NotRequired[dict]
    timeoutDurationInHours: NotRequired[int]
    tags: NotRequired[list[Tag]]
    TaskToken: NotRequired[str]


def validate_event(event: CreateModelInvocationJobInput):
    # Validate required fields
    if not isinstance(event.get("jobName"), str):
        raise ValueError("jobName must be a string")
    if not isinstance(event.get("roleArn"), str):
        raise ValueError("roleArn must be a string")
    if not isinstance(event.get("modelId"), str):
        raise ValueError("modelId must be a string")

    # Validate inputDataConfig
    validate_input_data_config(event)

    # Validate outputDataConfig
    validate_output_data_config(event)

    # Validate optional fields if present
    validate_optional(event)


def validate_optional(event):
    if "clientRequestToken" in event and not isinstance(event["clientRequestToken"], str):
        raise ValueError("clientRequestToken must be a string")
    if "timeoutDurationInHours" in event and not isinstance(event["timeoutDurationInHours"], int):
        raise ValueError("timeoutDurationInHours must be an integer")
    if "vpcConfig" in event and not isinstance(event["vpcConfig"], dict):
        raise ValueError("vpcConfig must be a dict")
    if "TaskToken" in event and not isinstance(event["TaskToken"], str):
        raise ValueError("TaskToken must be a string")

    # Validate tags if present
    validate_tags(event)


def validate_tags(event):
    if "tags" in event:
        if not isinstance(event["tags"], list):
            raise ValueError("tags must be a list")
        for tag in event["tags"]:
            if not isinstance(tag, dict):
                raise ValueError("each tag must be a dict")
            if not isinstance(tag.get("key"), str):
                raise ValueError("tag key must be a string")
            if not isinstance(tag.get("value"), str):
                raise ValueError("tag value must be a string")


def validate_output_data_config(event):
    output_config = event.get("outputDataConfig")
    if not isinstance(output_config, dict):
        raise ValueError("outputDataConfig must be a dict")
    s3_output = output_config.get("s3OutputDataConfig")
    if not isinstance(s3_output, dict):
        raise ValueError("s3OutputDataConfig must be a dict")
    if not isinstance(s3_output.get("s3Uri"), str):
        raise ValueError("s3OutputDataConfig.s3Uri must be a string")


def validate_input_data_config(event):
    input_config = event.get("inputDataConfig")
    if not isinstance(input_config, dict):
        raise ValueError("inputDataConfig must be a dict")
    s3_input = input_config.get("s3InputDataConfig")
    if not isinstance(s3_input, dict):
        raise ValueError("s3InputDataConfig must be a dict")
    if not isinstance(s3_input.get("s3Uri"), str):
        raise ValueError("s3InputDataConfig.s3Uri must be a string")


def handler(event: CreateModelInvocationJobInput, _context):
    logger.info(f"Received event: {event}")
    validate_event(event)
    task_token_tags = event.pop("TaskToken", None)
    if event.get("tags"):
        event["tags"].extend(build_task_token_tags(task_token_tags))
    elif task_token_tags:
        event["tags"] = build_task_token_tags(task_token_tags)
    job = bedrock.create_model_invocation_job(**event)
    return {"jobArn": job["jobArn"]}
