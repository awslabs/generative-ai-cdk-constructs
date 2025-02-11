import os
import json
import asyncio
from dataclasses import dataclass
from typing import Dict, Any, Optional
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent
from data_automation_result import DataAutomationResult

logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="DATA_AUTOMATION_STATUS", service="BEDROCK_DATA_AUTOMATION")


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
        # Parse EventBridge event
        event_bridge = EventBridgeEvent(event)
        detail = event_bridge.detail

        # Extract and validate required parameters
        if 'invoke_arn' not in detail:
            error_msg = "Missing required parameter: invoke_arn in event detail"
            logger.error(error_msg)
            return {
                'statusCode': 400,
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
            'body': {
                **results,
            }
        }
        
    except ValueError as e:
        logger.error("Validation error", extra={
            "error": str(e),
            "event_id": event.get("id")
        })
        metrics.add_metadata(key="errorType", value="ValidationError")
        return {
            'statusCode': 400,
            'body': {
                'message': 'Validation error',
                'error': str(e),
                'event_id': event.get("id")
            }
        }
        
    except TimeoutError as e:
        logger.error("Operation timed out", extra={
            "error": str(e),
            "event_id": event.get("id")
        })
        metrics.add_metadata(key="errorType", value="TimeoutError")
        return {
            'statusCode': 408,
            'body': {
                'message': 'Operation timed out',
                'error': str(e),
                'event_id': event.get("id")
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


# input = {
#   "source": ["custom.bedrock.data.automation"],
#   "detail-type": ["DataAutomationStatus"],
#   "detail": {
#     "invoke_arn": [{
#       "exists": True
#     }]
#   }
# }


# handler(input, None)