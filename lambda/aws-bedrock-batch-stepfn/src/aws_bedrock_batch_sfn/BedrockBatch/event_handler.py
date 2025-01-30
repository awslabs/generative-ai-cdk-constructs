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
from enum import Enum
from typing import TYPE_CHECKING, Optional

from pydantic import BaseModel, Field

from aws_bedrock_batch_sfn.StepFunctions.task_token_tags import get_task_token_from_tags

logger = logging.getLogger(__name__)

if TYPE_CHECKING:
    from mypy_boto3_bedrock import BedrockClient
    from mypy_boto3_stepfunctions import SFNClient
    from mypy_boto3_s3 import S3Client


class BatchJobStatus(Enum):
    SUBMITTED = "Submitted"
    IN_PROGRESS = "InProgress"
    COMPLETED = "Completed"
    FAILED = "Failed"
    STOPPING = "Stopping"
    STOPPED = "Stopped"
    PARTIALLY_COMPLETED = "PartiallyCompleted"
    EXPIRED = "Expired"
    VALIDATING = "Validating"
    SCHEDULED = "Scheduled"


class BatchInferenceJobStateChange(BaseModel):
    version: str = Field(..., description="Version of the schema")
    accountId: str = Field(..., description="AWS account ID")
    batchJobName: str = Field(..., description="Name of the batch job")
    batchJobArn: str = Field(..., description="ARN of the batch job")
    batchModelId: str = Field(..., description="ARN of the model")
    status: BatchJobStatus = Field(..., description="Status of the batch job")
    failureMessage: Optional[str] = Field(default=None, description="Failure message")
    creationTime: str = Field(..., description="Creation time of the batch job")


class BatchInferenceJobSFNOutput(BaseModel):
    status: BatchJobStatus = Field(..., description="Status of the batch job")
    bucket: str = Field(..., description="S3 bucket where the output is stored")
    keys: list[str] = Field(..., description="Keys of the output files")


class BatchInferenceJobSFNFailure(BaseModel):
    status: BatchJobStatus = Field(..., description="Status of the batch job")
    error: str = Field(..., description="Error code")
    cause: str = Field(..., description="Error message")


class BedrockBatchEventHandler:
    def __init__(self, bedrock: "BedrockClient", sfn: "SFNClient", s3: "S3Client"):
        self.bedrock = bedrock
        self.sfn = sfn
        self.s3 = s3

    def handle_job_event(self, event: BatchInferenceJobStateChange) -> None:
        """
        Handles the state change event from AWS Batch and sends the output to Step Functions.

        Args:
            event (BatchInferenceJobStateChange): The state change event from AWS Batch.
        """
        logger.info(f"Handling job event: {event.batchJobArn}")
        logger.debug(f"Event: {event.model_dump_json()}")
        output = self.prepare_step_functions_output(event)
        if output is None:
            logger.info(f"Job {event.batchJobArn} is still running")
            return
        task_token = self.get_task_token(event.batchJobArn)
        logger.debug(f"Got task token: {task_token}")
        if isinstance(output, BatchInferenceJobSFNOutput):
            logger.info(f"Job {event.batchJobArn} completed successfully")
            logger.debug(f"Sending success to Step Functions: {output.model_dump_json()}")
            self.sfn.send_task_success(taskToken=task_token, output=output.model_dump_json())
        elif isinstance(output, BatchInferenceJobSFNFailure):
            logger.info(f"Job {event.batchJobArn} failed with {output.error}: {output.cause}")
            logger.debug(f"Sending failure to Step Functions: {output.model_dump_json()}")
            self.sfn.send_task_failure(taskToken=task_token, error=output.error, cause=output.cause)

    def prepare_step_functions_output(
            self, event: BatchInferenceJobStateChange
    ) -> BatchInferenceJobSFNOutput | BatchInferenceJobSFNFailure | None:
        """
        Evaluates the state change event from AWS Batch and prepares the output to send to Step Functions.

        Args:
            event (BatchInferenceJobStateChange): The state change event from AWS Batch.

        Returns:
            BatchInferenceJobSFNOutput | BatchInferenceJobSFNFailure | None: The output or failure message to be sent to Step Functions. None if the job is still running.
        """
        if event.status in [BatchJobStatus.COMPLETED, BatchJobStatus.PARTIALLY_COMPLETED]:
            bucket, keys = self.get_output_keys(event.batchJobArn)
            return BatchInferenceJobSFNOutput(status=event.status, bucket=bucket, keys=keys)
        elif event.status == BatchJobStatus.FAILED:
            return BatchInferenceJobSFNFailure(
                status=event.status, error=event.status.value, cause=event.failureMessage
            )
        elif event.status == BatchJobStatus.EXPIRED:
            return BatchInferenceJobSFNFailure(status=event.status, error=event.status.value, cause="Job expired")
        elif event.status == BatchJobStatus.STOPPED:
            return BatchInferenceJobSFNFailure(status=event.status, error=event.status.value, cause="Job stopped")
        else:
            return None

    def get_task_token(self, job_arn: str) -> str:
        """
        Retrieves the AWS Step Functions task token from the TaskToken tags of a Bedrock job.

        This method queries the tags associated with a Bedrock job using its ARN and
        extracts the task token value from the 'TaskToken:{0-3}' tags. The task token is used
        to report task status back to Step Functions.

        Args:
            job_arn (str): The Amazon Resource Name (ARN) of the Bedrock inference job.
                Must be a valid ARN string.

        Returns:
            str: The Step Functions task token value stored in the TaskToken:{0-3} tags.

        Raises:
            ValueError: The job_arn is invalid
            KeyError: If either:
                - The job has no tags at all
                - The job's tags do not include any 'TaskToken:{0-3}' tags
        """
        if not job_arn.startswith("arn:aws:bedrock:"):
            raise ValueError(f"Invalid job ARN: {job_arn}")
        response = self.bedrock.list_tags_for_resource(resourceARN=job_arn)
        logger.debug({"list_tags": response})
        tags = response.get("tags")
        if not tags:
            raise KeyError(f"No tags found for job {job_arn}")
        task_token = get_task_token_from_tags(tags)
        return task_token

    def get_output_keys(self, job_arn: str) -> tuple[str, list[str]]:
        """
        Retrieves the output keys from the outputLocation S3 prefix of a Bedrock job.

        Args:
            job_arn (str): The Amazon Resource Name (ARN) of the Bedrock inference job.

        Returns:
            tuple[str, list[str]]: A tuple containing the S3 bucket name and a list of output keys.

        Raises:
            ValueError: The job_arn is invalid
            KeyError: If job has no outputLocation or no output files found
        """
        self._validate_job_arn(job_arn)
        job_id = self._extract_job_id(job_arn)
        s3uri = self._get_s3_uri(job_arn)
        bucket, prefix = self._parse_s3_uri(s3uri)
        full_prefix = f"{prefix}{job_id}"
        return bucket, self._get_s3_keys(bucket, full_prefix)

    def _validate_job_arn(self, job_arn: str) -> None:
        if not job_arn.startswith("arn:aws:bedrock:"):
            raise ValueError(f"Invalid job ARN: {job_arn}")

    def _extract_job_id(self, job_arn: str) -> str:
        return job_arn.split(":model-invocation-job/")[-1]

    def _get_s3_uri(self, job_arn: str) -> str:
        response = self.bedrock.get_model_invocation_job(jobIdentifier=job_arn)
        s3uri = response.get("outputDataConfig", {}).get("s3OutputDataConfig", {}).get("s3Uri")
        if not s3uri:
            raise KeyError(f"No outputLocation found for job {job_arn}")
        return s3uri

    def _parse_s3_uri(self, s3uri: str) -> tuple[str, str]:
        if not s3uri.startswith("s3://"):
            raise ValueError(f"Invalid outputLocation: {s3uri}")
        bucket, prefix = s3uri[5:].split("/", 1)
        return bucket, prefix

    def _get_s3_keys(self, bucket: str, prefix: str) -> list[str]:
        paginator = self.s3.get_paginator("list_objects_v2")  # from boto3 import client
        keys = []
        for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
            keys.extend([obj["Key"] for obj in page.get("Contents", []) if obj["Key"].endswith(".jsonl.out")])
        if not keys:
            raise KeyError(f"No output files found for prefix {prefix}")
        return keys
