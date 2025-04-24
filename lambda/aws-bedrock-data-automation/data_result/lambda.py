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
import asyncio
from typing import Dict, Any
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from data_automation_result import DataAutomationResult
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent, APIGatewayProxyEvent


logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="DATA_AUTOMATION_STATUS")

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
        "path": api_event.path
    })
    
    if not api_event.body:
        raise ValueError("Request body is required")
    
    try:
        return json.loads(api_event.body)
    except json.JSONDecodeError as e:
        logger.error("Invalid JSON in request body", extra={"error": str(e)})
        raise ValueError("Invalid JSON in request body")
    
    
    

async def data_automation_status(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Lambda handler for processing EventBridge events for data automation results
    
    Expected EventBridge event structure:
    {
        "version": "0",
        "id": "event-id",
        "detail-type": "DataAutomationStatus",
        "source": "custom.bedrock.data.automation",
        "account": "123456789012",
        "time": "2024-01-01T00:00:00Z",
        "region": "us-east-1",
        "detail": {
            "invocation_arn": "arn:aws:bedrock:region:account:data-automation-job/id",
            "wait": false,
        }
    }
    """
    try:
        # Determine event source and process accordingly
        if event.get("source") and event.get("detail-type"):
            detail = process_event_bridge_event(event)
        else:
            detail = process_api_gateway_event(event)

        # Extract and validate required parameters
        if 'invocation_arn' not in detail:
            error_msg = "Missing required parameter: invocation_arn in event detail"
            logger.error(error_msg)
            return {
                'statusCode': 400,
                'headers': COMMON_HEADERS,
                'body': {
                    'message': error_msg
                }
            }
            
        invocation_arn = detail['invocation_arn']
        wait = detail.get('wait', False)
                
        logger.info("Processing data automation status request", extra={
            "invocationArn": invocation_arn,
            "wait": wait,
        })
        
        # Initialize result processor
        processor = DataAutomationResult()
        
        # Get results with optional waiting
        results = await processor.get_results(invocation_arn, wait=wait)
        
        logger.info("Successfully retrieved results", extra={
            "invoke_arn": invocation_arn,
            "status": results.get("status"),
            "wait": wait,
        })
        
        return {
            'statusCode': 200,
            'headers': COMMON_HEADERS,
            'body': {
                **results,
            }
        }
            
    except Exception as e:
        logger.error("Unexpected error", extra={
            "error": str(e),
            "event_id": event.get("id")
        })
        metrics.add_metadata(key="errorType", value="UnexpectedError")
        return {
            'statusCode': 500,
            'headers': COMMON_HEADERS,
            'body': {
                'message': 'Internal server error',
                'error': str(e),
                'event_id': event.get("id")
            }
        }

def handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    """
    Main Lambda handler that wraps the async handler
    """
    return asyncio.run(data_automation_status(event, context))


