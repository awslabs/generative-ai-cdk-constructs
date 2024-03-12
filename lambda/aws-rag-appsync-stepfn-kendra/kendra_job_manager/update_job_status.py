# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

import boto3
import json
import os
import re
import datetime
from datetime import datetime, timezone
import uuid

ddb_client = boto3.client('dynamodb')
DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE"]
dynamodb_client = boto3.resource('dynamodb')

def lambda_handler(event, context):
    table = dynamodb_client.Table(DOCUMENTS_TABLE)
    table.update_item(
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

    return {
        "status": "Job status Updated"
    }

