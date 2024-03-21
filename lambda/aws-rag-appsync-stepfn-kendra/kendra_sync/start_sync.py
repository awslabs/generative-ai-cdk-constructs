# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0


import json
import datetime
from datetime import datetime, timezone
from aws_lambda_powertools import Logger
import boto3
import os

logger = Logger(service="KENDRA_SYNC_JOB")

KENDRA_INDEX_ID = os.environ['KENDRA_INDEX_ID']
KENDRA_DATA_SOURCE_INDEX_ID = os.environ['KENDRA_DATA_SOURCE_INDEX_ID']
DOCUMENTS_TABLE = os.environ['DOCUMENTS_TABLE']
AWS_REGION = os.environ['AWS_REGION']

kendra_client = boto3.client('kendra')
ddb_resource = boto3.resource("dynamodb")
table = ddb_resource.Table(DOCUMENTS_TABLE)


def lambda_handler(event, context):
    try:
        print('event notification: ' + json.dumps(event))
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

        return {
            "KendraJobExecId": resp['ExecutionId'],
            "CreatedOn": str(created)
        }

    except Exception as e:
        logger.error(f"Error starting Kendra data source sync job or writing to DynamoDB: {str(e)}")
        return {
            "status": "Error",
            "errorMessage": str(e)
        }
