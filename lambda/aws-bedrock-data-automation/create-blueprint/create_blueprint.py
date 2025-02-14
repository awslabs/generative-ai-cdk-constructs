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
metrics = Metrics(namespace="CREATE_BLUEPRINT", service="BEDROCK_DATA_AUTOMATION")

bda_client = boto3.client("bedrock-data-automation")

class ResourceOwner(Enum):
    """Enum for valid resource owner filters"""
    SERVICE = "SERVICE"
    ACCOUNT = "ACCOUNT"


def create_blueprint(schema_content,blueprint_details):
    """
    Create a blueprint using boto3 client
    """

    try:
        blueprint_default_name = f"custom_blueprint_{str(uuid.uuid4())[:8]}"
        blueprint_name = blueprint_details.get('blueprint_name', blueprint_default_name)


        blueprint_stage = blueprint_details.get('blueprint_stage', BlueprintStage.LIVE)
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")

        blueprint_type = blueprint_details.get('blueprint_type', BlueprintType.DOCUMENT)
        if  blueprint_type not in [stage.value for stage in BlueprintType]:
            raise ValueError(f"Invalid blueprint type: {blueprint_type}. Must be one of {[stage.value for stage in BlueprintType]}")

    
        client_token =blueprint_details.get('client_token','')
        encryption_config = blueprint_details.get('encryption_config','')
        
        
        # Prepare request parameters
        request_params = {
            'blueprintName': blueprint_name,
           'type': blueprint_type,
            'blueprintStage': blueprint_stage,
            'schema': schema_content,
        }

        # Add client token if provided
        if client_token:
            request_params['clientToken'] = client_token

        print("get message")

        logger.info("Creating blueprint", extra={
            "blueprint_name": blueprint_name,
            "blueprint_type": blueprint_type,
            "blueprint_stage": blueprint_stage,
            "schema_content": schema_content
        })

        # Add encryption configuration if provided
        if encryption_config:
            request_params['encryptionConfiguration'] = json.loads(encryption_config)
            
        # Create blueprint
        response = bda_client.create_blueprint(**request_params)
        blueprint_arn = response["blueprint"]["blueprintArn"]

        logger.info("Successfully created blueprint", extra={
            "response": response,
            "blueprint_arn": blueprint_arn
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Blueprint created successfully',
                'blueprint_arn': blueprint_arn
            })
        }

    except bda_client.exceptions.ConflictException as ce:
        logger.warning("Blueprint already exists. Getting existing blueprint.", extra={
            "error": str(ce)
        })
        
        blueprints = bda_client.list_blueprints(blueprintStageFilter="ALL")["blueprints"]
        try:
            blueprint_arn = next(
                (
                    blueprint["blueprintArn"]
                    for blueprint in blueprints
                    if "blueprintName" in blueprint
                    and blueprint["blueprintName"] == blueprint_name
                )
            )
            logger.info("Retrieved existing blueprint", extra={
                "blueprint_arn": blueprint_arn
            })
            return blueprint_arn
            
        except StopIteration:
            logger.error("Error getting the blueprint ARN")
            raise ce

    except Exception as e:
        logger.error("Error creating blueprint", extra={
            "error": str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error creating blueprint',
                'error': str(e)
            })
        }

def list_blueprints(detail) -> dict:
    """
    List available Bedrock blueprints based on specified filters.

    Args:
        resource_owner (str, optional): Filter blueprints by owner.
            Valid values: 'SELF', 'AWS', 'ALL'. Defaults to None.
        blueprint_stage_filter (str, optional): Filter blueprints by stage.
            Valid values: 'DRAFT', 'LIVE', 'ALL'. Defaults to None.
        next_token (str, optional): Token for pagination. Defaults to None.
        max_results (int, optional): Maximum number of results to return.
            Must be between 1 and 100. Defaults to None.

    Returns:
        dict: Response containing list of blueprints and pagination details.
            Format: {
                'blueprintSummaries': [...],
                'nextToken': str
            }

    Raises:
        ValueError: If invalid values are provided for resource_owner or blueprint_stage_filter
        ClientError: If AWS API call fails
    """
    try:
        request_params = {}
        
        blueprint_stage = detail.get('blueprint_stage')
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")

        resource_owner = detail.get('resource_owner')
        if resource_owner not in [stage.value for stage in ResourceOwner]:
            raise ValueError(f"Invalid resource owner: {resource_owner}. Must be one of {[stage.value for stage in ResourceOwner]}")

        if 'blueprint_arn' in detail:
            request_params['blueprint_arn'] = detail['blueprint_arn']
            
        if 'max_results' in detail:
            request_params['max_results'] = detail.get('max_results', 1)
            
        if 'next_token' in detail:
            request_params['next_token'] = detail['next_token']
            
        if 'project_arn' in detail:
            request_params['project_arn'] = detail['project_arn']
            
        if 'project_stage' in detail:
            request_params['project_stage'] = detail['project_stage']

       
        
        # Log request parameters for debugging
        logger.info("Listing blueprints with params", extra={"params": request_params})

        # Make API call to list blueprints
        response = bda_client.list_blueprints(**request_params)

        # Log success and return response
        logger.info(
            "Successfully retrieved blueprints",
            extra={"blueprint_count": len(response.get('blueprintSummaries', []))}
        )
        logger.info("List blueprints response", extra={"response": response})
        return response

    except bda_client.exceptions.ValidationException as e:
        logger.error("Validation error in list_blueprints", extra={"error": str(e)})
        raise e
    except Exception as e:
        logger.error("Unexpected error in list_blueprints", extra={"error": str(e)})
        raise e
    
    
def update_blueprint(blueprint_details):
    """
    Update a blueprint using boto3 client
    """

    try:
        blueprint_arn = blueprint_details.get('blueprint_arn')
        if blueprint_arn is None:
            raise ValueError("Blueprint ARN is required to update a blueprint")
    
        schema = blueprint_details.get('schema')
        if schema is None:
            raise ValueError("schema  is required to update a blueprint")

        blueprint_stage = blueprint_details.get('blueprint_stage', BlueprintStage.LIVE)
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")

        
        # Prepare request parameters
        request_params = {
            'blueprintArn': blueprint_arn,
           'schema': schema,
            'blueprintStage': blueprint_stage,
        }

        logger.info("Updating blueprint", extra={
            "request_params": request_params,
        })

          
        # Update blueprint
        response = bda_client.update_blueprint(**request_params)
       
        logger.info("Successfully updated blueprint", extra={
            "response": response,
            "blueprint_arn": blueprint_arn
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Blueprint updated successfully',
                'response': response
            })
        }

    except Exception as e:
        logger.error("Error updating blueprint", extra={
            "error": str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error updating blueprint',
                'error': str(e)
            })
        }
        
        
def get_blueprint(blueprint_details):
    """
    get  blueprint  using boto3 client
    """
    try:
        blueprint_arn = blueprint_details.get('blueprint_arn')
        if blueprint_arn is None:
            raise ValueError("Blueprint ARN is required to create a version")
        
        blueprint_version = blueprint_details.get('blueprint_version')
        
        blueprint_stage = blueprint_details.get('blueprint_stage')
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")


        # Prepare request parameters
        request_params = {
            'blueprintArn': blueprint_arn,
            
        }

        if blueprint_version:
            request_params['blueprintVersion'] = blueprint_version
        if blueprint_stage:
            request_params['blueprintStage'] = blueprint_stage


        logger.info("get blueprint", extra={
            "request_params": request_params
        })

        # Create blueprint
        response = bda_client.get_blueprint(**request_params)
        
        logger.info("Successfully get blueprint", extra={
            "response": response,
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Blueprint fetched successfully',
                'response': response
            })
        }
        
    except Exception as e:
        logger.error("Error fetching blueprint ", extra={
            "error": str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error creating blueprint version',
                'error': str(e)
            })
        }


    
def delete_blueprint(blueprint_arn: str, blueprint_version: str = None) -> Dict[str, Any]:
    """
    Delete a blueprint or specific version of a blueprint
    
    Args:
        blueprint_arn (str): ARN of the blueprint to delete
        blueprint_version (str, optional): Version of the blueprint to delete
        
    Returns:
        Dict[str, Any]: Response containing status and message
    """
    try:
        
        logger.info("Deleting blueprint", extra={
            "blueprint_arn": blueprint_arn,
            "blueprint_version": blueprint_version
        })
        
        delete_params = {
            'blueprintArn': blueprint_arn
        }
        
        # Add version if provided
        if blueprint_version:
            delete_params['blueprintVersion'] = blueprint_version
            
        # Delete blueprint
        response = bda_client.delete_blueprint(**delete_params)
        
        logger.info("Successfully deleted blueprint", extra={
            "response": response
        })
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'Blueprint deleted successfully',
            })
        }
        
    except bda_client.exceptions.ResourceNotFoundException as e:
        logger.error("Blueprint not found", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version
        })
        return {
            'statusCode': 404,
            'body': json.dumps({
                'message': 'Blueprint not found',
                'error': str(e)
            })
        }
        
    except bda_client.exceptions.ValidationException as e:
        logger.error("Validation error", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version
        })
        return {
            'statusCode': 400,
            'body': json.dumps({
                'message': 'Validation error while deleting blueprint',
                'error': str(e)
            })
        }
        
    except Exception as e:
        logger.error("Error deleting blueprint", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version,
            'error': str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error deleting blueprint',
                'error': str(e)
            })
        }
