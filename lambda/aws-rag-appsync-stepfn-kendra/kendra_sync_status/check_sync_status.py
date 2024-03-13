# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

import boto3
import json
import os
import re
import datetime
from datetime import datetime, timezone
import uuid

KENDRA_INDEX_ID = os.environ['KENDRA_INDEX_ID']
KENDRA_DATA_SOURCE_INDEX_ID = os.environ['KENDRA_DATA_SOURCE_INDEX_ID']
DOCUMENTS_TABLE = os.environ['DOCUMENTS_TABLE']

kendra_client = boto3.client('kendra')

def get_kendra_daya_sync_job_status(execution_id: str):
    jobs = kendra_client.list_data_source_sync_jobs(Id=KENDRA_DATA_SOURCE_INDEX_ID, IndexId=KENDRA_INDEX_ID)
    print(f"jobs={jobs}")
    if 'History' in jobs:
        for job in jobs['History']:
            if execution_id == job['ExecutionId']:
                return job['Status']

    return None

def lambda_handler(event, context):
    print(json.dumps(event))
    job_status = get_kendra_daya_sync_job_status(event['KendraJobExecId'])
    return {
        "KendraJobExecId": event['KendraJobExecId'],
        "KendraJobStatus": job_status if job_status else 'Syncing',
        "CreatedOn": event['CreatedOn'],
    }