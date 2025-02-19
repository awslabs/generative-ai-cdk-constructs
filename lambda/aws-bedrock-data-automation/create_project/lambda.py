import boto3
import json
from typing import Dict, Any
from aws_lambda_powertools import Logger, Metrics, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent, APIGatewayProxyEvent
from create_project import create_project,get_project,update_project,delete_project

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="CREATE_PROJECT")


def process_event_bridge_event(event: Dict[str, Any]) -> Dict[str, Any]:
    """
    Process EventBridge events
    """
    event_bridge_event = EventBridgeEvent(event)
    logger.info("Received EventBridge event", extra={
        "detail_type": event_bridge_event.detail_type,
        "source": event_bridge_event.source
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


@tracer.capture_lambda_handler
def handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    """
    Create a new project
    """
    try:
        # Determine event source and process accordingly
        if event.get("source") and event.get("detail-type"):
            project_config = process_event_bridge_event(event)
        else:
            project_config = process_api_gateway_event(event)

        operation = project_config.get('operation', '')
           
        logger.info("Project configuration", extra={"config": project_config})
       
        if operation == 'create':
            response = create_project(project_config)
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Project created successfully',
                    'response': response,
                })
            }
            
        elif operation == 'update':
            # Validate project ARN for update
            if 'projectArn' not in project_config:
                raise ValueError("projectArn is required for update operation")
                
            response = update_project(project_config)
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Project updated successfully',
                    'response': response
                })
            }
            
        elif operation == 'delete':
            # Validate project ARN for delete
            if 'projectArn' not in project_config:
                raise ValueError("projectArn is required for delete operation")
            
            delete_project(project_config['projectArn'])
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'Project deleted successfully',
                    'projectArn': project_config['projectArn']
                })
            }
            
        elif operation == 'get':
            # Validate project ARN for get
            if 'projectArn' not in project_config:
                raise ValueError("projectArn is required for get operation")
                
            response = get_project(project_config )
            
            return {
                'statusCode': 200,
                'body': json.dumps({
                    'message': 'project fetched',
                    'response': response
                })
            }
        logger.info("Project configuration", extra={"config": project_config})

    except Exception as e:
        logger.error("Unexpected error", extra={"error": str(e)})
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Internal server error',
                'error': str(e)
            })
        }


