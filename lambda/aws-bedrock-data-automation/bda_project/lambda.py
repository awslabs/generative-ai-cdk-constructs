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
from typing import Dict, Any
from aws_lambda_powertools import Logger, Metrics, Tracer
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent, APIGatewayProxyEvent
from manage_project import create_project,get_project,update_project,delete_project,list_projects

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="MANAGE_PROJECT")

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
        "path": api_event.path,
        "body": api_event.body
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
        logger.info(f"Received event: {json.dumps(event)}")

        if event.get("source") and event.get("detail-type"):
            project_config = process_event_bridge_event(event)
        else:
            project_config = process_api_gateway_event(event)

        operation_type = project_config.get('operation', '')
           
        logger.info("Project configuration", extra={"config": project_config})
        
        status_code = 200
        match operation_type.lower():
            case "create":
                response = create_project(project_config)
                response_msg='Project created successfully'

            case "update":
                if 'projectArn' not in project_config:
                    raise ValueError("projectArn is required for update operation")
                    
                response = update_project(project_config)
                response_msg='Project updated successfully'          
            
            
            case "delete":
                if 'projectArn' not in project_config:
                    raise ValueError("projectArn is required for delete operation")
                delete_project(project_config['projectArn'])
                response_msg='Project deleted successfully'  
                
            case "get":
                if 'projectArn' not in project_config:
                    raise ValueError("projectArn is required for get operation")
                
                response = get_project(project_config )
                response_msg='Project fetched successfully' 
                
            case "list":
                
                response = list_projects(project_config )
                response_msg='Project fetched successfully'  
               
                
            case _:
                response_msg = (f"Unknown operation type: {operation_type}. "
                              "The supported operations are - create, update, delete , get and list.")
                logger.warning(response_msg)
                status_code = 400

        return {
                  'statusCode': status_code,
                  'headers': COMMON_HEADERS,
                  'body': json.dumps({
                      'message': response_msg,
                      'response': response
                  })
              }

    except Exception as e:
        logger.error("Unexpected error", extra={"error": str(e)})
        return {
            'statusCode': 500,
            'headers': COMMON_HEADERS,
            'body': json.dumps({
                'message': 'Internal server error',
                'error': str(e)
            })
        }

