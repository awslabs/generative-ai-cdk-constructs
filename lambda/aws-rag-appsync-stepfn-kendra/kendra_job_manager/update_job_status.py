# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
# SPDX-License-Identifier: MIT-0

import boto3
from aws_lambda_powertools import Logger
import os

logger = Logger(service="KENDRA_JOB_MANAGER")

ddb_client = boto3.client('dynamodb')
DOCUMENTS_TABLE = os.environ["DOCUMENTS_TABLE"]
dynamodb_client = boto3.resource('dynamodb')

def lambda_handler(event, context):
    try:
        table = dynamodb_client.Table(DOCUMENTS_TABLE)
        response = table.update_item(
            Key={
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
