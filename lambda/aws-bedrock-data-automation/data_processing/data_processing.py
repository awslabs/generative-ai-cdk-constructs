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
import boto3
from dataclasses import dataclass
from typing import Dict, Any, Optional
from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger()
tracer = Tracer()
metrics = Metrics(namespace="data_processing")



@dataclass
class BlueprintConfig:
    """Blueprint configuration"""
    blueprint_arn: str
    version: Optional[str] = None
    stage: str = 'LIVE'

    def to_dict(self) -> Dict[str, Any]:
        """Convert blueprint config to dictionary format"""
        blueprint_dict = {
            'blueprintArn': self.blueprint_arn,
            'stage': self.stage
        }
        if self.version:
            blueprint_dict['version'] = self.version
        return blueprint_dict

@dataclass
class DataAutomationConfig:
    """Data automation configuration"""
    data_automation_project_arn: str
    stage: str = 'LIVE'

@dataclass
class EncryptionConfig:
    """Encryption configuration"""
    kms_key_id: str
    kms_encryption_context: Optional[Dict[str, str]] = None

@dataclass
class NotificationConfig:
    """Notification configuration"""
    eventbridge_enabled: bool = False

def validate_configs(
        blueprint_config: Optional[BlueprintConfig] = None,
        data_automation_config: Optional[DataAutomationConfig] = None
    ) -> None:
        """
        Validate that either blueprint_config or data_automation_config is present
        
        Args:
            blueprint_config: Optional BlueprintConfig
            data_automation_config: Optional DataAutomationConfig
            
        Raises:
            ValueError: If neither or both configs are provided
        """
        if blueprint_config is None and data_automation_config is None:
            raise ValueError("Either blueprint_config or data_automation_config must be provided")
            
        if blueprint_config is not None and data_automation_config is not None:
            raise ValueError("Cannot provide both blueprint_config and data_automation_config")


class DataProcessor:
    def __init__(self, input_bucket: str, output_bucket: str, client=None):
        """
        Initialize the processor
        
        Args:
            input_bucket (str): Input S3 bucket name
            output_bucket (str): Output S3 bucket name
            client: Optional pre-configured boto3 client
        """
        self.client = boto3.client("bedrock-data-automation-runtime") 
        self.input_bucket = input_bucket
        self.output_bucket = output_bucket
       

    def invoke_data_automation_async(
        self,
        input_filename: str,
        output_filename: str,
        client_token: Optional[str] = None,
        blueprint_config: Optional[BlueprintConfig] = None,
        data_automation_config: Optional[DataAutomationConfig] = None,
        encryption_config: Optional[EncryptionConfig] = None,
        notification_config: Optional[NotificationConfig] = None,
        data_automation_profile_arn: Optional[str] = None,
        tags: Optional[list] = None,
        **kwargs  # To handle any additional parameters that might be passed but not used
    ) -> Dict[str, Any]:
        """
        Invoke data automation asynchronously
        
        Args:
            input_filename (str): Input file name/key
            output_filename (str): Output file name/key
            blueprint_config (BlueprintConfig): Blueprint configuration
            client_token (str): Unique identifier for the request
            data_automation_config (DataAutomationConfig, optional): Data automation configuration
            encryption_config (EncryptionConfig, optional): Encryption configuration
            notification_config (NotificationConfig, optional): Notification configuration
            data_automation_profile_arn (str, optional): Data automation profile ARN
            tags (list, optional): List of tags to apply to the job
            
        Returns:
            Dict[str, Any]: Response containing job details
        """
        
        try:
            
            validate_configs(blueprint_config, data_automation_config)

            input_s3_uri = f"s3://{self.input_bucket}/{input_filename}"
            output_s3_uri = f"s3://{self.output_bucket}/{output_filename}"

            logger.info("Invoking data automation", extra={
                "input_location": input_s3_uri,
                "output_location": output_s3_uri,
                "blueprint_config": blueprint_config

            })

            # Prepare base request parameters
            request_params = {
                'inputConfiguration': {
                    's3Uri': input_s3_uri
                },
                'outputConfiguration': {
                    's3Uri': output_s3_uri
                }
            }

            if client_token:
                request_params['clientToken'] = client_token
                
            # Add blueprint configuration if provided
            if blueprint_config:
                request_params['blueprints'] = [blueprint_config.to_dict()]
                logger.info("Added blueprint configuration", extra={
                    "blueprint_config": blueprint_config.to_dict()
                })
                
            # Add data automation configuration if provided
            if data_automation_config:
                request_params['dataAutomationConfiguration'] = {
                    'dataAutomationProjectArn': data_automation_config.data_automation_project_arn,
                    'stage': data_automation_config.stage
                }
                
            # Add data automation profile ARN if provided
            if data_automation_profile_arn:
                # The AWS documentation shows this parameter as dataAutomationProfileArn
                request_params['dataAutomationProfileArn'] = data_automation_profile_arn
                logger.info("Added data automation profile ARN", extra={
                    "data_automation_profile_arn": data_automation_profile_arn
                })

            # Add encryption configuration if provided
            if encryption_config:
                encryption_params = {
                    'kmsKeyId': encryption_config.kms_key_id
                }
                if encryption_config.kms_encryption_context:
                    encryption_params['kmsEncryptionContext'] = (
                        encryption_config.kms_encryption_context
                    )
                request_params['encryptionConfiguration'] = encryption_params

            # Add notification configuration if provided
            if notification_config:
                request_params['notificationConfiguration'] = {
                    'eventBridgeConfiguration': {
                        'eventBridgeEnabled': notification_config.eventbridge_enabled
                    }
                }
                
            # Add tags if provided
            if tags:
                request_params['tags'] = tags

            # Invoke data automation
            logger.info("Invoking data automation", extra={
                "request_params": request_params
            })
            
            response = self.client.invoke_data_automation_async(**request_params)

            logger.info("Successfully invoked data automation", extra={
                "job_id": response.get('jobId')
            })

            return {
                'statusCode': 200,
                'body': {
                    'message': 'Data automation invoked successfully',
                    'jobId': response.get('jobId'),
                    'response': response
                }
            }

        except self.client.exceptions.ValidationException as e:
            logger.error("Validation error", exc_info=True)
            return {
                'statusCode': 400,
                'body': {
                    'message': 'Validation error',
                    'error': str(e)
                }
            }

        except Exception as e:
            logger.error("Error invoking data automation", exc_info=True)
            return {
                'statusCode': 500,
                'body': {
                    'message': 'Error invoking data automation',
                    'error': str(e)
                }
            }
