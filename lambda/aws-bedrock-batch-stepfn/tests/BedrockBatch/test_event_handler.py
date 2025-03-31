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

import json
from unittest.mock import Mock

import pytest

from aws_bedrock_batch_sfn.BedrockBatch.event_handler import (
    BedrockBatchEventHandler,
    BatchInferenceJobStateChange,
    BatchInferenceJobSFNOutput,
    BatchInferenceJobSFNFailure,
)


@pytest.fixture
def mock_clients():
    return {"bedrock": Mock(), "sfn": Mock(), "s3": Mock()}


@pytest.fixture
def handler(mock_clients):
    return BedrockBatchEventHandler(mock_clients["bedrock"], mock_clients["sfn"], mock_clients["s3"])


@pytest.fixture
def completed_event_json():
    return json.dumps(
        {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": "Completed",
            "creationTime": "2023-01-01T00:00:00Z",
        }
    )


@pytest.fixture
def failed_event_json():
    return json.dumps(
        {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": "Failed",
            "failureMessage": "Test failure",
            "creationTime": "2023-01-01T00:00:00Z",
        }
    )


@pytest.fixture
def in_progress_event_json():
    return json.dumps(
        {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": "InProgress",
            "creationTime": "2023-01-01T00:00:00Z",
        }
    )


def test_handle_job_event_completed(handler, mock_clients, completed_event_json):
    event = BatchInferenceJobStateChange.model_validate_json(completed_event_json)

    handler.get_task_token = Mock(return_value="task-token")
    handler.get_output_keys = Mock(return_value=("test-bucket", ["output1.jsonl.out", "output2.jsonl.out"]))

    handler.handle_job_event(event)

    mock_clients["sfn"].send_task_success.assert_called_once()
    assert "test-bucket" in mock_clients["sfn"].send_task_success.call_args[1]["output"]
    assert "output1.jsonl.out" in mock_clients["sfn"].send_task_success.call_args[1]["output"]


def test_handle_job_event_failed(handler, mock_clients, failed_event_json):
    event = BatchInferenceJobStateChange.model_validate_json(failed_event_json)

    handler.get_task_token = Mock(return_value="task-token")

    handler.handle_job_event(event)

    mock_clients["sfn"].send_task_failure.assert_called_once()
    assert mock_clients["sfn"].send_task_failure.call_args[1]["error"] == "Failed"
    assert mock_clients["sfn"].send_task_failure.call_args[1]["cause"] == "Test failure"


def test_handle_job_event_in_progress(handler, mock_clients, in_progress_event_json):
    event = BatchInferenceJobStateChange.model_validate_json(in_progress_event_json)

    handler.handle_job_event(event)

    mock_clients["sfn"].send_task_success.assert_not_called()
    mock_clients["sfn"].send_task_failure.assert_not_called()


def test_get_task_token(handler, mock_clients):
    mock_clients["bedrock"].list_tags_for_resource.return_value = {
        "tags": [{"key": "TaskToken:0", "value": "test-token"}]
    }

    token = handler.get_task_token("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job")

    assert token == "test-token"
    mock_clients["bedrock"].list_tags_for_resource.assert_called_once()


def test_get_task_token_4parts(handler, mock_clients):
    mock_clients["bedrock"].list_tags_for_resource.return_value = {
        "tags": [
            {"key": "TaskToken:0", "value": "test-token-part-1"},
            {"key": "TaskToken:1", "value": "test-token-part-2"},
            {"key": "TaskToken:2", "value": "test-token-part-3"},
            {"key": "TaskToken:3", "value": "test-token-part-4"},
        ]
    }

    token = handler.get_task_token("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job")

    assert token == "test-token-part-1test-token-part-2test-token-part-3test-token-part-4"
    mock_clients["bedrock"].list_tags_for_resource.assert_called_once()


def test_get_task_token_2parts(handler, mock_clients):
    mock_clients["bedrock"].list_tags_for_resource.return_value = {
        "tags": [
            {"key": "TaskToken:0", "value": "test-token-part-1"},
            {"key": "TaskToken:1", "value": "test-token-part-2"},
        ]
    }

    token = handler.get_task_token("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job")

    assert token == "test-token-part-1test-token-part-2"
    mock_clients["bedrock"].list_tags_for_resource.assert_called_once()


def test_get_task_token_empty_part(handler, mock_clients):
    mock_clients["bedrock"].list_tags_for_resource.return_value = {
        "tags": [
            {"key": "TaskToken:0", "value": "test-token-part-1"},
            {"key": "TaskToken:1", "value": "test-token-part-2"},
            {"key": "TaskToken:2", "value": "test-token-part-3"},
            {"key": "TaskToken:3", "value": ""},
        ]
    }

    token = handler.get_task_token("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job")

    assert token == "test-token-part-1test-token-part-2test-token-part-3"
    mock_clients["bedrock"].list_tags_for_resource.assert_called_once()


def test_get_task_token_no_tags(handler, mock_clients):
    mock_clients["bedrock"].list_tags_for_resource.return_value = {"tags": []}

    with pytest.raises(KeyError):
        handler.get_task_token("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job")


def test_get_output_keys(handler, mock_clients):
    mock_clients["bedrock"].get_model_invocation_job.return_value = {
        "outputDataConfig": {"s3OutputDataConfig": {"s3Uri": "s3://test-bucket/test-prefix/"}}
    }

    mock_clients["s3"].get_paginator.return_value.paginate.return_value = [
        {"Contents": [{"Key": "test-prefix/job-id/output1.jsonl.out"}, {"Key": "test-prefix/job-id/output2.jsonl.out"}]}
    ]

    bucket, keys = handler.get_output_keys("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/job-id")

    assert bucket == "test-bucket"
    assert keys == ["test-prefix/job-id/output1.jsonl.out", "test-prefix/job-id/output2.jsonl.out"]


def test_get_output_keys_no_output(handler, mock_clients):
    mock_clients["bedrock"].get_model_invocation_job.return_value = {
        "outputDataConfig": {"s3OutputDataConfig": {"s3Uri": "s3://test-bucket/test-prefix/"}}
    }

    mock_clients["s3"].get_paginator.return_value.paginate.return_value = [{"Contents": []}]

    with pytest.raises(KeyError):
        handler.get_output_keys("arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/job-id")


@pytest.mark.parametrize(
    "status,expected_output",
    [
        ("Completed", BatchInferenceJobSFNOutput),
        ("Failed", BatchInferenceJobSFNFailure),
        ("Expired", BatchInferenceJobSFNFailure),
        ("Stopped", BatchInferenceJobSFNFailure),
        ("InProgress", type(None)),
    ],
)
def test_prepare_step_functions_output(handler, status, expected_output):
    event_json = json.dumps(
        {
            "version": "1.0",
            "accountId": "123456789012",
            "batchJobName": "test-job",
            "batchJobArn": "arn:aws:bedrock:us-west-2:123456789012:model-invocation-job/test-job",
            "batchModelId": "arn:aws:bedrock:us-west-2:123456789012:model/model-id",
            "status": status,
            "failureMessage": "Test failure" if status == "Failed" else None,
            "creationTime": "2023-01-01T00:00:00Z",
        }
    )
    event = BatchInferenceJobStateChange.model_validate_json(event_json)

    if status == "Completed":
        handler.get_output_keys = Mock(return_value=("test-bucket", ["output.jsonl.out"]))

    output = handler.prepare_step_functions_output(event)

    assert isinstance(output, expected_output)
