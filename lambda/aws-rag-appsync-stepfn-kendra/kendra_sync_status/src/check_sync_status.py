# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

from aws_lambda_powertools import Logger
import boto3
import os

logger = Logger(service="KENDRA_SYNC_STATUS")

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
                    return job['Status']
        return None
    except Exception as e:
        logger.error(f"Error retrieving Kendra data source sync job status: {str(e)}")
        return "Error"

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
        return {
            "status": "Error",
            "errorMessage": str(e)
        }
