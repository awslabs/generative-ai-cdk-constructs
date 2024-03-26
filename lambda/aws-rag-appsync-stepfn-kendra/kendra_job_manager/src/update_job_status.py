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
import boto3
from aws_lambda_powertools import Logger, Metrics, Tracer
import os
from aws_lambda_powertools.metrics import MetricUnit

ddb_client = boto3.client('dynamodb')
logger = Logger(service="KENDRA_JOB_MANAGER")
tracer = Tracer(service="KENDRA_JOB_MANAGER")
metrics = Metrics(namespace="KendraJobManagerService", service="KENDRA_JOB_MANAGER")

DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE"]
dynamodb_client = boto3.resource('dynamodb')
table = dynamodb_client.Table(DOCUMENTS_TABLE)

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def lambda_handler(event, context):
    try:
        response = table.update_item(
            Key={
                    'Id': event['KendraJobExecId'],
                    'CreatedOn': event['CreatedOn']
                },
                ExpressionAttributeNames={
                    '#status': 'Status'
                },
                UpdateExpression="SET #status= :s",
                ExpressionAttributeValues={':s': event['KendraJobStatus']},
                ReturnValues="UPDATED_NEW"
            )
        logger.info(f"Update item response: {response}")
        metrics.add_metric(name="SuccessfulUpdates", unit=MetricUnit.Count, value=1)
        return {
            "status": "Job status updated",
            "response": response
        }

    except Exception as e:
        logger.error(f"Error updating DynamoDB: {str(e)}")
        metrics.add_metric(name="UpdateFailures", unit=MetricUnit.Count, value=1)
        return {
            "status": "Error",
            "errorMessage": str(e)
        }
