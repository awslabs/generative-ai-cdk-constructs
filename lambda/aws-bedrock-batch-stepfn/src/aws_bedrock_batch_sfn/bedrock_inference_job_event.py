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

from typing import TYPE_CHECKING

import boto3
from aws_lambda_powertools.utilities.parser import envelopes, event_parser
from aws_lambda_powertools.utilities.typing import LambdaContext

from aws_bedrock_batch_sfn.BedrockBatch.event_handler import BatchInferenceJobStateChange, BedrockBatchEventHandler

if TYPE_CHECKING:
    # mypy_boto3_* is a test-dependency only and not available at runtime
    # It is also only ever used as type-hints, so we can import it during TYPE_CHECKING only
    from mypy_boto3_bedrock import BedrockClient
    from mypy_boto3_stepfunctions import SFNClient
    from mypy_boto3_s3 import S3Client

bedrock: "BedrockClient" = boto3.client("bedrock")
sfn: "SFNClient" = boto3.client("stepfunctions")
s3: "S3Client" = boto3.client("s3")


@event_parser(model=BatchInferenceJobStateChange, envelope=envelopes.EventBridgeEnvelope)
def handler(event: BatchInferenceJobStateChange, _: LambdaContext) -> None:
    """
    Handles the state change event from AWS Batch and sends the output to Step Functions.

    Args:
        event (BatchInferenceJobStateChange): The state change event from AWS Batch.
        _ (LambdaContext): The Lambda context.
    """
    inference_job_event_handler = BedrockBatchEventHandler(bedrock=bedrock, sfn=sfn, s3=s3)
    inference_job_event_handler.handle_job_event(event)
