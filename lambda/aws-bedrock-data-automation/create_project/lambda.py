
import boto3
from typing import Dict, Any
from aws_lambda_powertools import Logger,Metrics,Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent
from create_project import create_project, delete_project,update_project,get_project


logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="CREATE_PROJECT", service="BEDROCK_DATA_AUTOMATION")

bda_client = boto3.client("bedrock-data-automation")



def handler(event: Dict[str, Any], context: LambdaContext) -> Dict[str, Any]:
    """
    Lambda handler for processing EventBridge events
    
    Expected EventBridge event format:
    {
        "version": "0",
        "id": "event-id",
        "detail-type": "ProjectAutomation",
        "source": "custom.project.automation",
        "account": "123456789012",
        "time": "2024-01-01T00:00:00Z",
        "region": "us-east-1",
        "detail": {
            "operation": "create" | "delete",
            "project_arn": "string"  # Required for delete operation
        }
    }
    """
    try:
        # Parse EventBridge event
        event_bridge_event = EventBridgeEvent(event)
        logger.info("Received EventBridge event", extra={
            "detail_type": event_bridge_event.detail_type,
            "source": event_bridge_event.source,
            "detail": event_bridge_event.detail
        })

        # Get operation from event detail
        detail = event_bridge_event.detail
        operation = detail.get('operation')
        if operation is None:
            logger.error("operation is required in the event detail", extra={"event": event})
            raise ValueError("operation is required in the event detail")  
        
        project_name = detail.get('project_name', '')
        project_description = detail.get('project_description', '')
        project_stage = detail.get('project_stage', '')

        project_details = {
            'project_name': project_name,
            'project_description': project_description,
            'project_stage': project_stage
        }
        logger.info("Project details", extra={"project_details": project_details})
        
        if operation.lower() == 'create':
            project_arn = create_project(project_details)
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Project created successfully',
                    'project_arn': project_arn,
                }
            }
        
        elif operation.lower() =='update':
            logger.info("Update project details", extra={"project_details": project_details})
            return update_project(project_details)
       
        elif operation.lower() =='get':
            logger.info("get project details", extra={"project_details": project_details})
            return get_project(project_details)
            
        elif operation == 'delete':
            project_arn = detail.get('project_arn')
            if not project_arn:
                return {
                    'statusCode': 400,
                    'body': {
                        'message': 'project_arn is required for delete operation',
                    }
                }
                
            delete_project(project_arn)
            return {
                'statusCode': 200,
                'body': {
                    'message': 'Project deleted successfully',
                    'project_arn': project_arn,
                }
            }
            
        else:
            return {
                'statusCode': 400,
                'body': {
                    'message': f'Invalid operation: {operation}. Supported actions: create, delete',
                }
            }

    except Exception as e:
        logger.error("Unexpected error", extra={"error": str(e)})
        return {
            'statusCode': 500,
            'body': {
                'message': 'Internal server error',
                'error': str(e)
            }
        }
        
        
input = {
    "version": "0",
    "id": "89d1a02d-5ec7-412e-82f5-13505f9a91bd",
    "detail-type": "ProjectAutomation",
    "source": "custom.project.automation",
    "account": "123456789012",
    "time": "2024-01-01T00:00:00Z",
    "region": "us-east-1",
    "detail": {
        "operation": "create",
        # "project_name":"noa_proj",
        # "project_description": "noa assessment",
        # "project_stage": "LIVE",
        "project_arn":"arn:aws:bedrock:us-west-2:551246883740:data-automation-project/48fdec15e1e2"
        
    }
}

handler(input, None )