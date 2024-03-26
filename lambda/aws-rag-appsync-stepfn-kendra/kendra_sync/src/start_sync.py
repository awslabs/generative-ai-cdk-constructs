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

KENDRA_INDEX_ID = os.environ['KENDRA_INDEX_ID']
KENDRA_DATA_SOURCE_INDEX_ID = os.environ['KENDRA_DATA_SOURCE_INDEX_ID']
DOCUMENTS_TABLE = os.environ['DOCUMENTS_TABLE']
AWS_REGION = os.environ['AWS_REGION']

kendra_client = boto3.client('kendra')
ddb_resource = boto3.resource("dynamodb")
table = ddb_resource.Table(DOCUMENTS_TABLE)

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def lambda_handler(event, context):
    try:
        logger.info('event notification: ' + json.dumps(event))
        created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
        resp = kendra_client.start_data_source_sync_job(Id=KENDRA_DATA_SOURCE_INDEX_ID, IndexId=KENDRA_INDEX_ID)
        table.put_item(
            Item={
                "Id": resp['ExecutionId'],
                "CreatedOn": created,
                "Status": "Syncing"
            }
        )

        logger.info(f"Kendra data source sync job started with Execution ID: {resp['ExecutionId']}")
        metrics.add_metric(name="SuccessfulSyncJobs", unit=MetricUnit.Count, value=1)

        return {
            "KendraJobExecId": resp['ExecutionId'],
            "CreatedOn": str(created)
        }

    except Exception as e:
        logger.error(f"Error starting Kendra data source sync job or writing to DynamoDB: {str(e)}")
        metrics.add_metric(name="SyncJobErrors", unit=MetricUnit.Count, value=1)

        return {
            "status": "Error",
            "errorMessage": str(e)
        }
