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
from enum import Enum
import os
import json
from typing import Any, Dict
import boto3
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.utilities.data_classes import EventBridgeEvent, APIGatewayProxyEvent
from manage_blueprint import create_blueprint,delete_blueprint,list_blueprints,get_blueprint,update_blueprint,DateTimeEncoder
from create_schema import create_schema


logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="MANAGE_BLUEPRINT")

input_bucket = os.environ.get('INPUT_BUCKET')

COMMON_HEADERS = {
    "Access-Control-Allow-Headers" : "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
}
class OperationType(str, Enum):
    CREATE_BLUEPRINT = "CREATE"
    DELETE_BLUEPRINT = "DELETE"
    LIST_BLUEPRINTS = "LIST"
    UPDATE_BLUEPRINT = "UPDATE"
    GET_BLUEPRINT = "GET"
    

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
        "body":api_event.body
    })
    
    if not api_event.body:
        raise ValueError("Request body is required")
    
    try:
        return json.loads(api_event.body)
    except json.JSONDecodeError as e:
        logger.error("Invalid JSON in request body", extra={"error": str(e)})
        raise ValueError("Invalid JSON in request body")
    
    
    
def get_schema(bucket_name: str, schema_key: str) -> Dict[str, Any]:
    """
    Get and parse schema JSON from S3 bucket
    
    Args:
        bucket_name: Name of the S3 bucket containing the schema
        schema_key: Object key (path) of the schema file in S3
        
    Returns:
        Dict[str, Any]: Parsed schema content
        
    Raises:
        ValueError: If schema file is not found or invalid JSON
        ClientError: If S3 access fails
    """
    try:
        logger.info("Retrieving schema from S3", extra={
            "bucket": bucket_name,
            "key": schema_key
        })
        s3_client = boto3.client('s3')
        response = s3_client.get_object(
            Bucket=bucket_name,
            Key=schema_key
        )
        schema_content = json.loads(response['Body'].read().decode('utf-8'))
        logger.info(f"Successfully retrieved and parsed schema {schema_content}")
        
        return schema_content
    
    except Exception as e:
        logger.error("Unexpected error retrieving schema", extra={
            "bucket": bucket_name,
            "key": schema_key,
            "error": str(e)
        })
        raise

@logger.inject_lambda_context
def handler(event, context: LambdaContext):
    """
    Lambda handler function
    """
    try:
        logger.info(f"Received event: {json.dumps(event)}")
        if event.get("source") and event.get("detail-type"):
            blueprint_details = process_event_bridge_event(event)
        else:
            blueprint_details = process_api_gateway_event(event)
       
        
        schema_content=""
        operation_type = blueprint_details.get('operation', 'CREATE')
        if operation_type not in [stage.value for stage in OperationType]:
            raise ValueError(f"Invalid operation type: {operation_type}. Must be one of {[stage.value for stage in OperationType]}")

        status_code = 200
        match operation_type.lower():
            case "delete":
                logger.info(f"deleteing blueprint {blueprint_details}")
                blueprint_arn = blueprint_details.get('blueprint_arn')
                blueprint_version = blueprint_details.get('blueprint_version')
                
                if not blueprint_arn:
                    raise ValueError("blueprint_arn is required for delete operation")
                    
                response= delete_blueprint(blueprint_arn, blueprint_version)
                response_msg='Blueprint deleted successfully' 
            case "list":
                logger.info("Listing all blueprints")
                response= list_blueprints(blueprint_details)
                response_msg='Blueprints fetched successfully' 
        
            case "get":
                logger.info(f"Get blueprint {blueprint_details}")
                response= get_blueprint(blueprint_details)
                response_msg='Blueprint fetched successfully' 
        
            case "update":
                logger.info(f"update  blueprint {blueprint_details}")
                response= update_blueprint(blueprint_details)
                response_msg='Blueprint updated successfully'
            
            case "create":
                logger.info("create blueprint")

                # Check if schema_file_name is provided
                if 'schema_file_name' in blueprint_details:
                    input_key = blueprint_details['schema_file_name']
                    
                    logger.info(f"Retrieving schema from S3: {input_bucket}/{input_key}")
                    schema_content = get_schema(input_bucket, input_key)
                    
                    # Convert schema_content to a JSON string if it's a dictionary
                    if isinstance(schema_content, dict):
                        schema_content = json.dumps(schema_content)
                
                # Only use schema_fields if schema_file_name is not provided
                elif 'schema_fields' in blueprint_details:
                    schema_fields = blueprint_details['schema_fields']
                    
                    # Validate schema_fields format
                    if not isinstance(schema_fields, list):
                        raise ValueError("schema_fields must be a list of field configurations")
                    
                    # Validate each field has required properties
                    for field in schema_fields:
                        if not all(key in field for key in ['name', 'description', 'alias']):
                            raise ValueError("Each field must contain 'name', 'description', and 'alias'")
                    
                    # Create schema using AWS BDA format
                    try:
                        # Get document class and description from blueprint_details if provided
                        document_class = blueprint_details.get('document_class', "")
                        document_description = blueprint_details.get('document_description', "")
                        
                        # Create schema with the provided fields, class, and description
                        schema_class = create_schema(
                            schema_fields, 
                            document_class=document_class, 
                            document_description=document_description
                        )
                        
                        # Convert the schema class to a JSON schema dictionary and then to a JSON string
                        schema_json = schema_class.model_json_schema()
                        schema_content = json.dumps(schema_json)

                    except Exception as e:
                        logger.error("Error creating schema", extra={"error": str(e)})
                        return {
                            'statusCode': 500,
                            'body': json.dumps({
                                'message': 'Error creating schema',
                                'error': str(e)
                            })
                        }
                else:
                    raise ValueError("Either schema_file_name or schema_fields must be provided")
                
                
                response= create_blueprint(schema_content,blueprint_details)
                response_msg='Blueprint created successfully'
            
            case _:
                response_msg = (f"Unknown operation type: {operation_type}. "
                              "The supported operations are - create, update, delete, list and get.")
                logger.warning(response_msg)
                status_code = 400
                
        return {
                  'statusCode': status_code,
                  'headers': COMMON_HEADERS,
                  'body': json.dumps({
                      'message': response_msg,
                      'response': response
                  }, cls=DateTimeEncoder)
              }


    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {
            'statusCode': 500,
            'headers': COMMON_HEADERS,
            'body': json.dumps({
                'message': 'Unexpected error occurred',
                'error': str(e)
            }, cls=DateTimeEncoder)
        }
