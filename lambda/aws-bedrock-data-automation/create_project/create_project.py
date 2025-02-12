
import json
import boto3
from typing import Dict, Any
from aws_lambda_powertools import Logger,Metrics,Tracer
from botocore.exceptions import ClientError
from project_config import ProjectConfig

logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="CREATE_PROJECT", service="BEDROCK_DATA_AUTOMATION")

bda_client = boto3.client("bedrock-data-automation")



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
        
        return {
            'statusCode': 200,
            'body': json.dumps({
                'message': 'data automation project fetched successfully',
                'response': response
            })
        }
        
    except Exception as e:
        logger.error("Error fetching project ", extra={
            "error": str(e)
        })
        return {
            'statusCode': 500,
            'body': json.dumps({
                'message': 'Error fetching project',
                'error': str(e)
            })
        }


def delete_project(project_arn: str) -> None:
    """
    Delete a data automation project
    
    Args:
        project_arn: ARN of the project to delete
    """
    try:
        logger.info("Deleting project", extra={"project_arn": project_arn})

        bda_client.delete_data_automation_project(projectArn=project_arn)

        logger.info("Project deleted successfully", extra={"project_arn": project_arn})

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

        return {
            'statusCode': 200,
            'body': {
                'message': 'Project updated successfully',
                'projectArn': response.get('projectArn'),
                'projectStatus': response.get('projectStatus'),
                'lastUpdatedAt': str(response.get('lastUpdatedAt'))
            }
        }

    except ClientError as e:
        error_code = e.response.get('Error', {}).get('Code', 'Unknown')
        error_message = e.response.get('Error', {}).get('Message', str(e))
        logger.error("AWS API error updating project", extra={
            "error_code": error_code,
            "error_message": error_message
        })
        return {
            'statusCode': 400,
            'body': {
                'message': 'Failed to update project',
                'error_code': error_code,
                'error_message': error_message
            }
        }

    except Exception as e:
        logger.error("Unexpected error updating project", extra={"error": str(e)})
        return {
            'statusCode': 500,
            'body': {
                'message': 'Internal server error',
                'error': str(e)
            }
        }

