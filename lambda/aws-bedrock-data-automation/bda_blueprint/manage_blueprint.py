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
import json
from typing import Any, Dict
import uuid
import boto3
from datetime import datetime
from aws_lambda_powertools import Logger,Metrics,Tracer
from custom_blueprint_schema import BlueprintStage,BlueprintType

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="MANAGE_BLUEPRINT")

bda_client = boto3.client("bedrock-data-automation")

class ResourceOwner(Enum):
    """Enum for valid resource owner filters"""
    SERVICE = "SERVICE"
    ACCOUNT = "ACCOUNT"

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)


def create_blueprint(schema_content,blueprint_details):
    """
    Create a blueprint using boto3 client
    
    Args:
        schema_content (str): JSON schema content as a string
        blueprint_details (dict): Dictionary containing blueprint configuration details
        
    Returns:
        dict: Response from the create_blueprint API call
        
    Raises:
        ValueError: If required parameters are missing or invalid
    """

    try:
        blueprint_default_name = f"custom_blueprint_{str(uuid.uuid4())[:8]}"
        blueprint_name = blueprint_details.get('blueprint_name', blueprint_default_name)

        blueprint_stage = blueprint_details.get('blueprint_stage', BlueprintStage.LIVE)
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")

        blueprint_type = blueprint_details.get('blueprint_type', BlueprintType.DOCUMENT)
        if blueprint_type not in [type_val.value for type_val in BlueprintType]:
            raise ValueError(f"Invalid blueprint type: {blueprint_type}. Must be one of {[type_val.value for type_val in BlueprintType]}")

        client_token = blueprint_details.get('client_token', '')
        tags = blueprint_details.get('tags', [])
        
        logger.info(" collecting request params...")
        # Prepare request parameters
        request_params = {
            'blueprintName': blueprint_name,
            'type': blueprint_type,
            'blueprintStage': blueprint_stage,
        }

        # Add schema if provided and not empty
        #schema_json = json.loads(schema_content)
        request_params['schema'] = json.dumps(schema_content) if isinstance(schema_content, dict) else schema_content
        
        logger.info("Added schema_json...")
        # Add client token if provided
        if client_token:
            request_params['clientToken'] = client_token
            
        # Add tags if provided
        if tags:
            request_params['tags'] = tags


        # Add encryption configuration if provided
        encryption_config = blueprint_details.get('encryption_config')
        if encryption_config:
            # If encryption_config is a string, try to parse it as JSON
            if isinstance(encryption_config, str):
                try:
                    encryption_config = json.loads(encryption_config)
                except json.JSONDecodeError:
                    logger.error("Invalid JSON in encryption configuration")
                    raise ValueError("Invalid JSON in encryption configuration")
            
            # Ensure encryption configuration has the correct structure
            valid_encryption_config = {}
            
            if 'kmsKeyId' in encryption_config:
                valid_encryption_config['kmsKeyId'] = encryption_config['kmsKeyId']
                
            if 'kmsEncryptionContext' in encryption_config:
                valid_encryption_config['kmsEncryptionContext'] = encryption_config['kmsEncryptionContext']
                
            request_params['encryptionConfiguration'] = valid_encryption_config
        
        logger.info(f"Creating blueprint with request params: {request_params}" )

        # Create blueprint
        response = bda_client.create_blueprint(**request_params)
        blueprint_arn = response["blueprint"]["blueprintArn"]

        logger.info("Successfully created blueprint", extra={
            "blueprint_arn": blueprint_arn
        })
        return response
        
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
        raise e
        

def list_blueprints(detail) -> dict:
    """
    List available Bedrock blueprints based on specified filters.

    Args:
        detail (dict): Dictionary containing filter parameters:
            blueprintArn (str, optional): ARN of the blueprint to filter by
            resourceOwner (str, optional): Filter blueprints by owner.
                Valid values: 'SERVICE', 'ACCOUNT'. 
            blueprintStageFilter (str, optional): Filter blueprints by stage.
                Valid values: 'DEVELOPMENT', 'LIVE', 'ALL'.
            maxResults (int, optional): Maximum number of results to return.
                Must be between 1 and 100.
            nextToken (str, optional): Token for pagination.
            projectFilter (dict, optional): Filter by project details:
                projectArn (str, optional): ARN of the project to filter by
                projectStage (str, optional): Stage of the project to filter by.
                    Valid values: 'DEVELOPMENT', 'LIVE'
                    
    Note:
        For backward compatibility, the function also accepts snake_case parameter names:
        blueprint_arn, resource_owner, blueprint_stage_filter, max_results, next_token,
        project_filter, project_arn, project_stage

    Returns:
        str: JSON string containing list of blueprints and pagination details.
            Format: {
                'blueprints': [...],
                'nextToken': str
            }

    Raises:
        ValueError: If invalid values are provided for resourceOwner or blueprintStageFilter
        ClientError: If AWS API call fails
    """
    try:
        # Extract parameters from detail
        # Map input parameter names to API parameter names
        blueprint_arn = detail.get('blueprintArn', detail.get('blueprint_arn'))
        resource_owner = detail.get('resourceOwner', detail.get('resource_owner'))
        blueprint_stage_filter = detail.get('blueprintStageFilter', 
                                           detail.get('blueprint_stage_filter', 
                                                     detail.get('blueprint_stage')))
        max_results = detail.get('maxResults', detail.get('max_results'))
        next_token = detail.get('nextToken', detail.get('next_token'))
        
        # Initialize request parameters
        request_params = {}
        
        # Add parameters to request if they exist
        if blueprint_arn:
            request_params['blueprintArn'] = blueprint_arn
            
        if resource_owner:
            # Validate resource_owner
            if resource_owner not in [owner.value for owner in ResourceOwner]:
                raise ValueError(f"Invalid resource owner: {resource_owner}. Must be one of {[owner.value for owner in ResourceOwner]}")
            request_params['resourceOwner'] = resource_owner
            
        if blueprint_stage_filter:
            # Validate blueprint_stage_filter
            valid_stages = ['DEVELOPMENT', 'LIVE', 'ALL']
            if blueprint_stage_filter not in valid_stages:
                raise ValueError(f"Invalid blueprint stage filter: {blueprint_stage_filter}. Must be one of {valid_stages}")
            request_params['blueprintStageFilter'] = blueprint_stage_filter
            
        if max_results:
            # Validate max_results
            if not isinstance(max_results, int) or max_results < 1 or max_results > 100:
                raise ValueError("maxResults must be an integer between 1 and 100")
            request_params['maxResults'] = max_results
            
        if next_token:
            request_params['nextToken'] = next_token
            
        # Handle project filter
        project_filter = detail.get('projectFilter', detail.get('project_filter', {}))
        if not project_filter:
            # For backward compatibility, check for individual project parameters
            project_arn = detail.get('projectArn', detail.get('project_arn'))
            project_stage = detail.get('projectStage', detail.get('project_stage'))
            
            if project_arn or project_stage:
                project_filter = {}
                if project_arn:
                    project_filter['projectArn'] = project_arn
                if project_stage:
                    project_filter['projectStage'] = project_stage
        
        if project_filter:
            project_filter_params = {}
            
            project_arn = project_filter.get('projectArn', project_filter.get('project_arn'))
            if project_arn:
                project_filter_params['projectArn'] = project_arn
                
            project_stage = project_filter.get('projectStage', project_filter.get('project_stage'))
            if project_stage:
                valid_project_stages = ['DEVELOPMENT', 'LIVE']
                if project_stage not in valid_project_stages:
                    raise ValueError(f"Invalid project stage: {project_stage}. Must be one of {valid_project_stages}")
                project_filter_params['projectStage'] = project_stage
                
            if project_filter_params:
                request_params['projectFilter'] = project_filter_params
        
        # Log request parameters for debugging
        logger.info("Listing blueprints with params", extra={"params": request_params})

        # Make API call to list blueprints
        response = bda_client.list_blueprints(**request_params)

        # Log success and return response
        logger.info(
            "Successfully retrieved blueprints",
            extra={"blueprint_count": len(response.get('blueprints', []))}
        )
        
        logger.info("List blueprints response", extra={"response": response})
        return json.dumps(response, cls=DateTimeEncoder)

    except bda_client.exceptions.ValidationException as e:
        logger.error("Validation error in list_blueprints", extra={"error": str(e)})
        raise e
    except Exception as e:
        logger.error("Unexpected error in list_blueprints", extra={"error": str(e)})
        raise e
    
    
def update_blueprint(blueprint_details):
    """
    Update a blueprint using boto3 client
    
    Args:
        blueprint_details (dict): Dictionary containing blueprint update parameters:
            blueprint_arn/blueprintArn (str): ARN of the blueprint to update (required)
            schema (str): JSON schema content as a string
            blueprint_stage/blueprintStage (str): Blueprint stage.
                Valid values: 'DEVELOPMENT', 'LIVE'
            encryption_config/encryptionConfiguration (dict): Encryption configuration:
                kmsKeyId (str): KMS key ID
                kmsEncryptionContext (dict): KMS encryption context
                
    Returns:
        dict: Response from the update_blueprint API call
        
    Raises:
        ValueError: If required parameters are missing or invalid
        ClientError: If AWS API call fails
    """

    try:
        # Extract parameters from blueprint_details
        # Support both camelCase and snake_case parameter names for backward compatibility
        blueprint_arn = blueprint_details.get('blueprintArn', blueprint_details.get('blueprint_arn'))
        if blueprint_arn is None:
            raise ValueError("Blueprint ARN is required to update a blueprint")
    
        schema = blueprint_details.get('schema')
        if schema is None:
            logger.warning("Updating a blueprint without schema")

        blueprint_stage = blueprint_details.get('blueprintStage', 
                                              blueprint_details.get('blueprint_stage', 
                                                                  BlueprintStage.LIVE))
        if blueprint_stage not in [stage.value for stage in BlueprintStage]:
            raise ValueError(f"Invalid blueprint stage: {blueprint_stage}. Must be one of {[stage.value for stage in BlueprintStage]}")

        # Prepare request parameters
        request_params = {
            'blueprintArn': blueprint_arn,
            'blueprintStage': blueprint_stage,
        }
        
        # Add schema if provided
        if schema:
            request_params['schema'] = schema

        # Handle encryption configuration
        encryption_config = blueprint_details.get('encryptionConfiguration', 
                                                blueprint_details.get('encryption_config'))
        if encryption_config:
            # If encryption_config is a string, try to parse it as JSON
            if isinstance(encryption_config, str):
                try:
                    encryption_config = json.loads(encryption_config)
                except json.JSONDecodeError:
                    logger.error("Invalid JSON in encryption configuration")
                    raise ValueError("Invalid JSON in encryption configuration")
            
            # Ensure encryption configuration has the correct structure
            valid_encryption_config = {}
            
            if 'kmsKeyId' in encryption_config:
                valid_encryption_config['kmsKeyId'] = encryption_config['kmsKeyId']
                
            if 'kmsEncryptionContext' in encryption_config:
                valid_encryption_config['kmsEncryptionContext'] = encryption_config['kmsEncryptionContext']
                
            if valid_encryption_config:
                request_params['encryptionConfiguration'] = valid_encryption_config

        logger.info("Updating blueprint", extra={
            "blueprint_arn": blueprint_arn,
            "blueprint_stage": blueprint_stage,
        })
          
        # Update blueprint
        response = bda_client.update_blueprint(**request_params)
       
        logger.info("Successfully updated blueprint", extra={
            "blueprint_arn": blueprint_arn
        })
        return response

    except Exception as e:
        logger.error("Error updating blueprint", extra={
            "error": str(e)
        })
        raise e
        
        
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
        
        return json.dumps(response, cls=DateTimeEncoder)

        
    except Exception as e:
        logger.error("Error fetching blueprint ", extra={
            "error": str(e)
        })
        raise e
       


    
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
        return response
        
    except bda_client.exceptions.ResourceNotFoundException as e:
        logger.error("Blueprint not found", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version
        })
        
        
    except bda_client.exceptions.ValidationException as e:
        logger.error("Validation error", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version
        })
        
        
    except Exception as e:
        logger.error("Error deleting blueprint", extra={
            'blueprint_arn': blueprint_arn,
            'blueprint_version': blueprint_version,
            'error': str(e)
        })
        raise e
