
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
import boto3
from typing import Dict, Any
from datetime import datetime
from aws_lambda_powertools import Logger,Metrics,Tracer
from botocore.exceptions import ClientError
from project_config import ProjectConfig

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="CREATE_PROJECT")

bda_client = boto3.client("bedrock-data-automation")

class DateTimeEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        return super().default(obj)

def create_project(project_details: dict) -> str:
    """Create a data automation project"""
    try:
        project_config = ProjectConfig(project_details)

        logger.info("Creating project with configuration", extra={"config": project_config.project_config})
        
        response = bda_client.create_data_automation_project(**project_config.project_config)

        project_arn = response["projectArn"]
        logger.info("Project created successfully", extra={"project_arn": project_arn})

        return project_arn

    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        logger.error("AWS API error creating project", extra={
            "error_code": error_code,
            "error_message": error_message
        })
        raise

    except Exception as e:
        logger.error("Error creating project", extra={"error": str(e)})
        raise


def get_project(project_details):
    """
    get  project  using boto3 client
    """
    try:
        project_arn = project_details.get('projectArn')
        if project_arn is None:
            raise ValueError("Project ARN is required to get a project") 
        
        project_stage = project_details.get('projectStage')
        
    
        # Prepare request parameters
        request_params = {
            'projectArn': project_arn,
            
        }

        if project_stage:
            request_params['projectStage'] = project_stage
        
        logger.info("get project", extra={
            "request_params": request_params
        })

        response = bda_client.get_data_automation_project(**request_params)
        
        logger.info("Successfully get project", extra={
            "response": response,
        })
    
        return json.dumps(response, cls=DateTimeEncoder)
        
    except Exception as e:
        logger.error("Error fetching project ", extra={
            "error": str(e)
        })
        
    

def list_projects(project_details):
    """
    list  bda projects  using boto3 client
    """
    try:
        
        blueprint_stage = project_details.get('blueprint_stage')
        resource_owner = project_details.get('resource_owner')    
        blueprint_arn =project_details.get('blueprint_arn')
        blueprint_version =project_details.get('blueprint_version')
        max_results =project_details.get('max_results')
        project_stage =project_details.get('project_stage')
        next_token =project_details.get('next_token', '')
        
        request_params = {}
        
        if blueprint_arn:
            request_params['blueprintArn'] = blueprint_arn
        if max_results:
            request_params['maxResults'] = max_results
        if next_token:
            request_params['nextToken'] = next_token
        if project_stage:
            request_params['projectStageFilter'] = project_stage
        if blueprint_version:
            request_params['blueprintVersion'] = blueprint_version
        if blueprint_stage:
            request_params['blueprintStage'] = blueprint_stage
        if resource_owner:
            request_params['resourceOwner'] = resource_owner
        
        
        logger.info("list project", extra={
            "request_params": request_params
        })

        response = bda_client.list_data_automation_projects(**request_params)
        
        logger.info("Successfully fethed project list", extra={
            "response": response,
        })   
        return json.dumps(response, cls=DateTimeEncoder)

        
    except Exception as e:
        logger.error("Error fetching project ", extra={
            "error": str(e)
        })
        

def delete_project(project_arn: str) -> None:
    """
    Delete a data automation project
    
    Args:
        project_arn: ARN of the project to delete
    """
    try:
        logger.info("Deleting project", extra={"project_arn": project_arn})

        response = bda_client.delete_data_automation_project(projectArn=project_arn)
        logger.info("Project deleted successfully", extra={"project_arn": project_arn})
        return response
        
    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        logger.error("AWS API error deleting project", extra={
            "project_arn": project_arn,
            "error_code": error_code,
            "error_message": error_message
        })
        raise

    except Exception as e:
        logger.error("Error deleting project", extra={
            "project_arn": project_arn,
            "error": str(e)
        })
        raise
    

def update_project(project_details: dict) -> Dict[str, Any]:
    """Update a data automation project
    
    Args:
        project_details: Dictionary containing project configuration and ARN
        
    Returns:
        Dict containing response with status code and message
        
    Raises:
        ValueError: If project ARN is missing or invalid
        ClientError: If AWS API call fails
    """
    try:
        project_arn = project_details.get('projectArn')
        if not project_arn:
            raise ValueError("Project ARN is required to update a project")

        project_config = ProjectConfig(project_details)
        
        update_config = project_config.project_config
        update_config['projectArn'] = project_arn

        logger.info("Updating project with configuration", extra={
            "project_arn": project_arn,
            "config": update_config
        })

        # Call Bedrock API to update project
        response = bda_client.update_data_automation_project(**update_config)

        logger.info("Project updated successfully", extra={
            "project_arn": project_arn,
            "response": response
        })

        return response

    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        logger.error("AWS API error updating project", extra={
            "error_code": error_code,
            "error_message": error_message
        })
        

    except Exception as e:
        logger.error("Unexpected error updating project", extra={"error": str(e)})
        

