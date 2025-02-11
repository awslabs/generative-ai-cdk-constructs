from enum import Enum
import os
import json
from typing import Any, Dict
import boto3
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext

from create_blueprint import create_blueprint,delete_blueprint,list_blueprints,get_blueprint,update_blueprint
from create_schema import create_schema


logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="CREATE_BLUEPRINT", service="BEDROCK_DATA_AUTOMATION")

class OperationType(str, Enum):
    CREATE_BLUEPRINT = "CREATE"
    DELETE_BLUEPRINT = "DELETE"
    LIST_BLUEPRINTS = "LIST"
    UPDATE_BLUEPRINT = "UPDATE"
    GET_BLUEPRINT = "GET"

input_bucket = os.environ.get('INPUT_BUCKET')
    

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
        logger.info("Successfully retrieved and parsed schema", extra={
            "schema_size": len(json.dumps(schema_content)),
            "bucket": bucket_name,
            "key": schema_key
        })
        
        return schema_content
    
    except Exception as e:
        logger.error("Unexpected error retrieving schema", extra={
            "bucket": bucket_name,
            "key": schema_key,
            "error": str(e)
        })
        raise

#@logger.inject_lambda_context
def handler(event, context: LambdaContext):
    """
    Lambda handler function
    """
    try:
        logger.info(f"Received event: {json.dumps(event)}")
        # Get input bucket and key from environment variables
       
        if 'detail' not in event:
            logger.error("Event detail section is missing")
            return {
                'statusCode': 400,
                'body': json.dumps({
                    'message': 'Invalid event format',
                    'error': 'detail section is missing'
                })
            }

        blueprint_details = event['detail']
        
        operation_type = blueprint_details.get('operation', 'CREATE')
        if operation_type not in [stage.value for stage in OperationType]:
            raise ValueError(f"Invalid operation type: {operation_type}. Must be one of {[stage.value for stage in OperationType]}")

        if operation_type.lower() == 'delete':
            blueprint_arn = blueprint_details.get('blueprint_arn')
            blueprint_version = blueprint_details.get('blueprint_version')
            
            if not blueprint_arn:
                raise ValueError("blueprint_arn is required for delete operation")
                
            return delete_blueprint(blueprint_arn, blueprint_version)
            
        elif operation_type.lower() == 'list':
            logger.info("Listing all blueprints")
            return list_blueprints(blueprint_details)
        
        elif operation_type.lower() == 'get':
            logger.info("Get  blueprint")
            return get_blueprint(blueprint_details)
        
        elif operation_type.lower() == 'update':
            logger.info("update  blueprints")
            return update_blueprint(blueprint_details)
            
        elif operation_type.lower() == 'create':
            # Check if schema_file_name is present
            if 'schema_file_name' in event['detail']:
                input_key = event['detail']['schema_file_name']
                # Get schema from S3
                logger.info(f"Retrieving schema from S3: {input_bucket}/{input_key}")
                schema_content = get_schema(input_bucket, input_key)
                if isinstance(schema_content, dict) and 'statusCode' in schema_content:
                    return schema_content

            
            # Check if schema_fields is present
            if 'schema_fields' in event['detail']:
                schema_fields = event['detail']['schema_fields']
                
                # Validate schema_fields format
                if not isinstance(schema_fields, list):
                    raise ValueError("schema_fields must be a list of field configurations")
                
                # Validate each field has required properties
                for field in schema_fields:
                    if not all(key in field for key in ['name', 'description', 'alias']):
                        raise ValueError("Each field must contain 'name', 'description', and 'alias'")
                
                # Create schema using the fields
                try:
                    DynamicSchema = create_schema(schema_fields)
                    schema_instance = DynamicSchema()
                    schema_content = json.dumps(schema_instance.model_json_schema())

                except Exception as e:
                    print("Error creating schema")
                    return {
                        'statusCode': 500,
                        'body': json.dumps({
                            'message': 'Error creating schema',
                            'error': str(e)
                        })
                    }
            
            # Create blueprint with schema content
            return create_blueprint(schema_content,blueprint_details)
        
        else:
            logger.warning(f"Unknown operation type: {operation_type}")
        

    except Exception as e:
        print(f"Unexpected error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Unexpected error occurred',
                'error': str(e)
            })
        }


# input = {'version': '0', 'id': 
#     '6a87491e-b865-19df-1c97-1c29f0a57d2b', 
#     'detail-type': 'FileProcessingEvent', 
#     'source': 'custom.fileprocessing',
#     'account': '551246883740',
#     'time': '2025-02-06T17:36:58Z', 
#     'region': 'us-west-2',
#     'resources': [], 
#     'detail': {"blueprint_name": "my-blueprint",
#         "blueprint_type": "DOCUMENT",
#         "blueprint_stage": "LIVE",
#                'operation':'DELETE_BLUEPRINT',
#                'blueprint_arn': 'arn:aws:bedrock:us-west-2:551246883740:blueprint/368bf3185d82',
#                'schema_fields' : [
#                     {
#                         "name": "Total income",
#                         "description": "Please analyze the following Notice of assesment report and extract information about Total income.",
#                         "alias": "Total income"
#                     },
#                     {
#                         "name": "Taxable Income",
#                         "description": "Please analyze the following Notice of assesment report and extract information about Taxable income.",
#                         "alias": "Taxable Income"
#                     },
#                     {
#                         "name": "Tax payable ",
#                         "description": "Please analyze the following Notice of assesment report and extract information about Tax payable.",
#                         "alias": "Tax payable"
#                     },
#                     {
#                         "name": "Balance ",
#                         "description": "Please analyze the following Notice of assesment report and extract information about balance. Does the user has to pay tax or will he get the return.",
#                         "alias": "Balance"
#                     }
#                 ]
#                }
#     }

# handler(input, None)