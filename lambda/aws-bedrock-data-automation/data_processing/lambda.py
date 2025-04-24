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
import os
import json
from typing import Dict, Any
from aws_lambda_powertools import Logger,Tracer,Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from data_processing import DataProcessor, BlueprintConfig,EncryptionConfig,NotificationConfig,DataAutomationConfig
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent, APIGatewayProxyEvent


logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="DATA_PROCESSING")

COMMON_HEADERS = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}

def process_event_bridge_event(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Process EventBridge events
    """
    event_bridge_event = EventBridgeEvent(event)
    logger.info("Received EventBridge event", extra={
        "detail_type": event_bridge_event.detail_type,
        "source": event_bridge_event.source,
        "detail":event_bridge_event.detail
    })
    
    return event_bridge_event.detail

def process_api_gateway_event(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Process API Gateway events
    """
    api_event = APIGatewayProxyEvent(event)
    logger.info("Received API Gateway event", extra={
        "http_method": api_event.http_method,
        "path": api_event.path,
        "body":api_event.body
    })
    
    if not api_event.body:
        raise ValueError("Request body is required")
    try:
        # If body is already a string, parse it
        if isinstance(api_event.body, str):
            return json.loads(api_event.body)
        # If body is already a dict, return it
        elif isinstance(api_event.body, dict):
            return api_event.body
        else:
            raise ValueError(f"Unexpected body type: {type(api_event.body)}")
    
    except json.JSONDecodeError as e:
        logger.error("Invalid JSON in request body", extra={"error": str(e)})
        raise ValueError("Invalid JSON in request body")
    
    
def get_env_var(var_name: str, default: str = None) -> str:
    """Get environment variable with validation"""
    value = os.environ.get(var_name, default)
    if value is None:
        raise ValueError(f"Environment variable {var_name} is not set")
    return value

@logger.inject_lambda_context
def handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    """
    Lambda handler to process EventBridge events and invoke data automation
    
    Expected event structure:
    {
        "detail-type": "DataAutomationRequest",
        "client_token": "optional-client-token",  # Optional
        "detail": {
            "input_filename": "document.pdf",
            "output_filename": "results.json",
            "blueprints": [
                {
                    "blueprint_arn": "arn:aws:bedrock:region:account:blueprint/id",
                    "version": "1",
                    "stage": "LIVE"
                }
            ],
            "data_automation": {
                "data_automation_project_arn": "arn:aws:bedrock:region:account:automation/id",
                "stage": "LIVE"
            },
            "data_automation_profile_arn": "arn:aws:bedrock:region:account:profile/id",
            "encryption": {
                "kms_key_id": "arn:aws:kms:region:account:key/id",
                "kms_encryption_context": {"purpose": "data-processing"}
            },
            "notification": {
                "eventbridge_enabled": true
            },
            "tags": [
                {
                    "key": "string",
                    "value": "string"
                }
            ]
        }
    }
    """
    try:
        # Determine event source and process accordingly
        if event.get("source") and event.get("detail-type"):
            detail = process_event_bridge_event(event)
        else:
            detail = process_api_gateway_event(event)
            
        # Validate required fields
        input_filename = detail.get('input_filename')
        
        if not input_filename :
            raise ValueError("input_filename is required")
        
        default_output_filename = os.path.splitext(input_filename)[0] + '.json'
        output_filename = detail.get('output_filename',default_output_filename)
            
        # Get environment variables
        input_bucket = get_env_var('INPUT_BUCKET')
        output_bucket = get_env_var('OUTPUT_BUCKET')
        
        
        # Initialize processor
        processor = DataProcessor(
            input_bucket=input_bucket,
            output_bucket=output_bucket
        )

        configs = {}
        
        if client_token := detail.get('client_token'):
            configs['client_token']=client_token
        
        if blueprint_data := detail.get('blueprints'):
            try:
                blueprint_config = blueprint_data[0]
                configs['blueprint_config'] = BlueprintConfig(
                blueprint_arn=blueprint_config['blueprint_arn'],
                version=blueprint_config.get('version'),
                stage=blueprint_config.get('stage', 'LIVE')
                 )
                logger.info("Blueprint configuration initialized", extra={
                "blueprint_config": configs['blueprint_config']
                })
                    
            except (IndexError, KeyError) as e:
                logger.error(f"Missing required blueprint parameter: {e}")
                raise ValueError(f"Missing required blueprint parameter: {e}")

        # Check and initialize DataAutomationConfig
        if automation_data := detail.get('data_automation'):
            try:
                configs['data_automation_config'] = DataAutomationConfig(
                    data_automation_project_arn=automation_data['data_automation_project_arn'],
                    stage=automation_data.get('stage', 'LIVE')
                )
                logger.info("Data automation configuration initialized", extra={
                    "data_automation_config": configs['data_automation_config']
                })
            except KeyError as e:
                logger.error(f"Missing required data automation parameter: {e}")
                raise ValueError(f"Missing required data automation parameter: {e}")

        # Check and initialize EncryptionConfig
        if encryption_data := detail.get('encryption'):
            try:
                configs['encryption_config'] = EncryptionConfig(
                    kms_key_id=encryption_data['kms_key_id'],
                    kms_encryption_context=encryption_data.get('kms_encryption_context')
                )
                logger.info("Encryption configuration initialized", extra={
                    "encryption_config": configs['encryption_config']
                })
            except KeyError as e:
                logger.error(f"Missing required encryption parameter: {e}")
                raise ValueError(f"Missing required encryption parameter: {e}")

        # Check and initialize NotificationConfig
        if notification_data := detail.get('notification'):
            configs['notification_config'] = NotificationConfig(
                eventbridge_enabled=notification_data.get('eventbridge_enabled', True)
            )
            logger.info("Notification configuration initialized", extra={
                "notification_config": configs['notification_config']
            })
            
        # Add data_automation_profile_arn to configs if provided
        if profile_arn := detail.get('data_automation_profile_arn'):
            configs['data_automation_profile_arn'] = profile_arn
            logger.info("Data automation profile ARN added", extra={
                "data_automation_profile_arn": profile_arn
            })
            
        # Check and add tags
        if tags := detail.get('tags'):
            configs['tags'] = tags
            logger.info("Tags added", extra={
                "tags": tags
            })
        
        # Invoke data automation with all configurations
        response = processor.invoke_data_automation_async(
            input_filename=input_filename,
            output_filename=output_filename,
            **configs
        )
        
        # Log response
        logger.info("Data automation invocation response", extra={
            "status_code": response['statusCode'],
            "response": response['body']
        })
        
        # Check response
        if response['statusCode'] == 200:
            job_id = response['body']['jobId']
            logger.info(f"Job started successfully", extra={"job_id": job_id})
            response_msg = "Job started successfully"
            status_code =200
        else:
            response_msg = response['body'].get('message', 'Unknown error')
            logger.error("Failed to start job", extra={
                "error": response_msg
            })
            status_code =500
            
        return {
                  'statusCode': status_code,
                  'headers': COMMON_HEADERS,
                  'body': json.dumps({
                      'message': response_msg,
                      'response': response
                  })
              }    
    except Exception as e:
        logger.error("Unexpected error", exc_info=True)
        return {
            'statusCode': 500,
            'headers': COMMON_HEADERS,
            'body': {
                'message': 'Internal server error',
                'error': str(e)
            }
        }


