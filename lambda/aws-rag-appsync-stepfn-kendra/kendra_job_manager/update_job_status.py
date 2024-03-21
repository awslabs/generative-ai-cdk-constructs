# SPDX-License-Identifier: MIT-0

import boto3
import json
from aws_lambda_powertools import Logger
import os
import re
import datetime
from datetime import datetime, timezone
import uuid

ddb_client = boto3.client('dynamodb')
logger = Logger(service="KENDRA_JOB_MANAGER")

DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE"]
dynamodb_client = boto3.resource('dynamodb')

def lambda_handler(event, context):
    table = dynamodb_client.Table(DOCUMENTS_TABLE)
    table.update_item(
table = dynamodb_client.Table(DOCUMENTS_TABLE)

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

    return {
        "status": "Job status Updated"
    }
                'Id': event['KendraJobExecId'],
                'CreatedOn': event['CreatedOn']
            },
            ExpressionAttributeNames={
                '#status': 'Status'
            },
            UpdateExpression="SET #status = :s",
            ExpressionAttributeValues={
                ':s': event['KendraJobStatus']
            },
            ReturnValues="UPDATED_NEW"
        )
        logger.info(f"Update item response: {response}")
        return {
            "status": "Job status updated",
            "response": response
        }

    except Exception as e:
        logger.error(f"Error updating DynamoDB: {str(e)}")
        return {
            "status": "Error",
            "errorMessage": str(e)
        }
