# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0


import json
import logging
import boto3
import random
import os
import datetime
from datetime import datetime, timezone

logger = logging.getLogger()
logger.setLevel(logging.INFO)

KENDRA_INDEX_ID = os.environ['KENDRA_INDEX_ID']
KENDRA_DATA_SOURCE_INDEX_ID = os.environ['KENDRA_DATA_SOURCE_INDEX_ID']
DOCUMENTS_TABLE = os.environ['DOCUMENTS_TABLE']

AWS_REGION = os.environ['AWS_REGION']

kendra_client = boto3.client('kendra')
ddb_resource = boto3.resource("dynamodb")
table = ddb_resource.Table(DOCUMENTS_TABLE)


def lambda_handler(event, context):
    print('event notification: ' + json.dumps(event))
    created = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    resp = kendra_client.start_data_source_sync_job(Id=KENDRA_DATA_SOURCE_INDEX_ID, IndexId=KENDRA_INDEX_ID)

    table.put_item(
        TableName=DOCUMENTS_TABLE,
        Item={
            "Id":  resp['ExecutionId'],
            "CreatedOn": created,
            "Status": "Syncing"
        }
    )

    return {
        "KendraJobExecId": resp['ExecutionId'],
        "CreatedOn": str(created)
    }
