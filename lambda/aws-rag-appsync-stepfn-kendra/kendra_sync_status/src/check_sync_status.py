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
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit
import boto3
import os

logger = Logger(service="KENDRA_SYNC_STATUS")
tracer = Tracer(service="KENDRA_SYNC_STATUS")
metrics = Metrics(namespace="KendraSyncService", service="KENDRA_SYNC_STATUS")

KENDRA_INDEX_ID = os.environ['KENDRA_INDEX_ID']
KENDRA_DATA_SOURCE_INDEX_ID = os.environ['KENDRA_DATA_SOURCE_INDEX_ID']
DOCUMENTS_TABLE = os.environ['DOCUMENTS_TABLE']

kendra_client = boto3.client('kendra')
def get_kendra_data_sync_job_status(execution_id: str):
    try:
        jobs = kendra_client.list_data_source_sync_jobs(Id=KENDRA_DATA_SOURCE_INDEX_ID, IndexId=KENDRA_INDEX_ID)
        logger.info(f"Kendra jobs: {jobs}")
        if 'History' in jobs:
            for job in jobs['History']:
                if execution_id == job['ExecutionId']:
                    metrics.add_metric(name="SuccessfulStatusRetrievals", unit=MetricUnit.Count, value=1)
                    return job['Status']
        return None
    except Exception as e:
        logger.error(f"Error retrieving Kendra data source sync job status: {str(e)}")
        metrics.add_metric(name="StatusRetrievalErrors", unit=MetricUnit.Count, value=1)
        return "Error"

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def lambda_handler(event, context):
    try:
        job_status = get_kendra_data_sync_job_status(event['KendraJobExecId'])

        return {
            "KendraJobExecId": event['KendraJobExecId'],
            "KendraJobStatus": job_status if job_status else 'Syncing',
            "CreatedOn": event['CreatedOn'],
        }
    except Exception as e:
        logger.error(f"Error processing Lambda handler: {str(e)}")
        metrics.add_metric(name="LambdaHandlerErrors", unit=MetricUnit.Count, value=1)

        return {
            "status": "Error",
            "errorMessage": str(e)
        }
