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
import json
import datetime
from datetime import datetime, timezone
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit
import boto3
import os

logger = Logger(service="KENDRA_SYNC_JOB")
tracer = Tracer(service="KENDRA_SYNC_JOB")
metrics = Metrics(namespace="KendraSyncService", service="KENDRA_SYNC_JOB")
STEP_FUNCTION_ARN = os.environ['STEP_FUNCTION_ARN']
sfn_client = boto3.client('stepfunctions')

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def lambda_handler(event, context):
    created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    try:
        response = sfn_client.start_execution(
            stateMachineArn=STEP_FUNCTION_ARN,
        )
        logger.info(f"Started step  function execution: {response['executionArn']}")
        return {
            "ExecutionArn": response['executionArn'],
            "StartDate": str(created)
        }
    except Exception as e:
        metrics.add_metric(name="StepFnErrors", unit=MetricUnit.Count, value=1)
        return {
            "Status": "Error",
            "errorMessage": str(e),
            "CreatedOn": str(created)
        }
