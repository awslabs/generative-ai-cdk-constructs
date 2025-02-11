from enum import Enum
import json
from typing import Any, Dict, Optional
import uuid
import boto3
import os
from aws_lambda_powertools import Logger,Metrics,Tracer
from custom_blueprint_schema import BlueprintStage,BlueprintType

logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="CREATE_BLUEPRINT_VERSION", service="BEDROCK_DATA_AUTOMATION")

bda_client = boto3.client("bedrock-data-automation")



def create_blueprint_version(blueprint_details):
    """
    Create a blueprint version using boto3 client
    """

    try:
        blueprint_arn = blueprint_details.get('blueprint_arn')
        if blueprint_arn is None:
            raise ValueError("Blueprint ARN is required to create a version")
    
        client_token =blueprint_details.get('client_token','')
        
        # Prepare request parameters
        request_params = {
            'blueprintArn': blueprint_arn,
        }

       # Add client token if provided
        if client_token:
            request_params['clientToken'] = client_token


        logger.info("Creating blueprint", extra={
            "blueprintArn": blueprint_arn,
        })

        # Create blueprint
        response = bda_client.create_blueprint_version(**request_params)
        
        logger.info("Successfully created blueprint", extra={
            "response": response,
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Blueprint created successfully',
                'response': response
            })
        }
        
    except Exception as e:
        logger.error("Error creating blueprint version", extra={
            "error": str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error creating blueprint version',
                'error': str(e)
            })
        }

