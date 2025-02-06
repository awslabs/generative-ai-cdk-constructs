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

import os

# Set up the environment for testing
os.environ["AWS_DEFAULT_REGION"] = "us-west-2"
from unittest.mock import patch, MagicMock

import pytest
from aws_lambda_powertools.utilities.typing import LambdaContext

from aws_bedrock_batch_sfn.BedrockBatch.event_handler import BatchInferenceJobStateChange
from aws_bedrock_batch_sfn.bedrock_inference_job_event import handler


@pytest.fixture
def lambda_context():
    return LambdaContext()


@pytest.fixture
def event_bridge_event():
    return {
        "version": "0",
        "id": "12345678-1234-1234-1234-123456789012",
        "detail-type": "Batch Inference Job State Change",
        "source": "aws.bedrock",
        "account": "123456789012",
        "time": "2023-05-03T12:00:00Z",
        "region": "us-west-2",
        "resources": ["arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job"],
        "detail": {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": "Completed",
            "creationTime": "2023-05-03T11:00:00Z",
        },
    }


@patch("aws_bedrock_batch_sfn.bedrock_inference_job_event.bedrock")
@patch("aws_bedrock_batch_sfn.bedrock_inference_job_event.s3")
@patch("aws_bedrock_batch_sfn.bedrock_inference_job_event.sfn")
@patch(
    "aws_bedrock_batch_sfn.bedrock_inference_job_event.BedrockBatchEventHandler"
)
def test_handler(mock_bedrock_batch_event_handler, mock_sfn, mock_s3, mock_bedrock, event_bridge_event, lambda_context):
    # Set up mock BedrockBatchEventHandler
    mock_handler_instance = MagicMock()
    mock_bedrock_batch_event_handler.return_value = mock_handler_instance

    # Call the handler
    handler(event_bridge_event, lambda_context)

    # Assert that BedrockBatchEventHandler was instantiated correctly
    mock_bedrock_batch_event_handler.assert_called_once_with(bedrock=mock_bedrock, sfn=mock_sfn, s3=mock_s3)

    # Assert that handle_job_event was called with the correct event
    mock_handler_instance.handle_job_event.assert_called_once()
    called_event = mock_handler_instance.handle_job_event.call_args[0][0]
    assert isinstance(called_event, BatchInferenceJobStateChange)
    assert called_event.batchJobName == "test-job"
    assert called_event.status.value == "Completed"


@patch(
    "aws_bedrock_batch_sfn.bedrock_inference_job_event.BedrockBatchEventHandler"
)
def test_handler_with_invalid_event(mock_bedrock_batch_event_handler, lambda_context):
    invalid_event = {
        "version": "0",
        "id": "12345678-1234-1234-1234-123456789012",
        "detail-type": "Batch Inference Job State Change",
        "source": "aws.bedrock",
        "account": "123456789012",
        "time": "2023-05-03T12:00:00Z",
        "region": "us-west-2",
        "resources": ["arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job"],
        "detail": {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": "InvalidStatus",  # Invalid status
            "creationTime": "2023-05-03T11:00:00Z",
        },
    }

    # Expect a ValueError to be raised due to invalid status
    with pytest.raises(ValueError):
        handler(invalid_event, lambda_context)

    # Assert that BedrockBatchEventHandler was not instantiated
    mock_bedrock_batch_event_handler.assert_not_called()
