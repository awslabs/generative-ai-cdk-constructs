#  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
#  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
#  with the License. A copy of the License is located at
#      http://www.apache.org/licenses/LICENSE-2.0
#
#  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
#  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
#  and limitations under the License.
#
import json
import boto3
from aws_lambda_powertools import Logger,Metrics,Tracer

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="CREATE_BLUEPRINT_VERSION")

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

