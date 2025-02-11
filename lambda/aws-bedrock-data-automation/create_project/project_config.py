import os
import json
from enum import Enum
from typing import Dict, Any, Optional, List
import uuid
from aws_lambda_powertools import Logger,Tracer, Metrics

logger = Logger(service="BEDROCK_DATA_AUTOMATION")
tracer = Tracer(service="BEDROCK_DATA_AUTOMATION")
metrics = Metrics(namespace="CREATE_PROJECT", service="BEDROCK_DATA_AUTOMATION")

class ConfigState(str, Enum):
    ENABLED = "ENABLED"
    DISABLED = "DISABLED"

class ProjectStage(str, Enum):
    DEVELOPMENT = "DEVELOPMENT"
    LIVE = "LIVE"

class DocumentGranularity(str, Enum):
    DOCUMENT = "DOCUMENT"
    PAGE = "PAGE"
    ELEMENT = "ELEMENT"
    WORD = "WORD"
    LINE = "LINE"

class TextFormat(str, Enum):
    PLAIN_TEXT = "PLAIN_TEXT"
    MARKDOWN = "MARKDOWN"
    HTML = "HTML"
    CSV = "CSV"

class ImageCategory(str, Enum):
    CONTENT_MODERATION = "CONTENT_MODERATION"
    TEXT_DETECTION = "TEXT_DETECTION"

class ImageGenerativeField(str, Enum):
    IMAGE_SUMMARY = "IMAGE_SUMMARY"
    IAB = "IAB"

class VideoCategory(str, Enum):
    CONTENT_MODERATION = "CONTENT_MODERATION"
    TEXT_DETECTION = "TEXT_DETECTION"
    TRANSCRIPT = "TRANSCRIPT"

class VideoGenerativeField(str, Enum):
    VIDEO_SUMMARY = "VIDEO_SUMMARY"
    SCENE_SUMMARY = "SCENE_SUMMARY"
    IAB = "IAB"

class AudioCategory(str, Enum):
    AUDIO_CONTENT_MODERATION = "AUDIO_CONTENT_MODERATION"
    CHAPTER_CONTENT_MODERATION = "CHAPTER_CONTENT_MODERATION"
    TRANSCRIPT = "TRANSCRIPT"

class AudioGenerativeField(str, Enum):
    AUDIO_SUMMARY = "AUDIO_SUMMARY"
    CHAPTER_SUMMARY = "CHAPTER_SUMMARY"
    IAB = "IAB"

class ProjectConfig:
    def __init__(self, project_details: dict):
        """
        Initialize ProjectConfig with values from request parameters
        
        Args:
            project_details (dict): Dictionary containing project configuration details
        """
        self.project_name = project_details.get('project_name')
        if not self.project_name:
            logger.info("Project name is not set, using deafult project name")
            project_default_name = f"bda_project_{str(uuid.uuid4())[:8]}"
            self.project_name = project_default_name

        self.project_description = project_details.get('project_description', 'Default project description')
        
        # Get project stage from request, default to LIVE if not provided
        project_stage_str = project_details.get('project_stage', ProjectStage.LIVE.value)
        
        # Validate project stage
        if project_stage_str not in [stage.value for stage in ProjectStage]:
            raise ValueError(f"Invalid project stage: {project_stage_str}. Must be one of {[stage.value for stage in ProjectStage]}")
        
        self.project_stage = ProjectStage(project_stage_str)
        

    def to_dict(self) -> dict:
        """
        Convert ProjectConfig to dictionary format
        
        Returns:
            dict: Dictionary representation of ProjectConfig
        """
        return {
            'project_name': self.project_name,
            'project_description': self.project_description,
            'project_stage': self.project_stage.value
        }


    def _get_document_config(self) -> Dict[str, Any]:
        """Get document configuration"""
        return {
            'extraction': {
                'granularity': {
                    'types': [
                        os.getenv('DOCUMENT_GRANULARITY_TYPES', 'DOCUMENT')
                    ]
                },
                'boundingBox': {
                    'state': os.getenv('DOCUMENT_BOUNDING_BOX_STATE', ConfigState.DISABLED.value)
                }
            },
            'generativeField': {
                'state': os.getenv('DOCUMENT_GENERATIVE_FIELD_STATE', ConfigState.DISABLED.value)
            },
            'outputFormat': {
                'textFormat': {
                    'types': [
                        os.getenv('DOCUMENT_TEXT_FORMAT_TYPES', 'PLAIN_TEXT')
                    ]
                },
                'additionalFileFormat': {
                    'state': os.getenv('DOCUMENT_ADDITIONAL_FILE_FORMAT_STATE', ConfigState.DISABLED.value)
                }
            }
        }

    def _get_image_config(self) -> Optional[Dict[str, Any]]:
        """Get image configuration if enabled"""
        if os.getenv('ENABLE_IMAGE', 'false').lower() != 'true':
            return None

        return {
            'extraction': {
                'category': {
                    'state': os.getenv('IMAGE_CATEGORY_STATE', ConfigState.DISABLED.value),
                    'types': [
                        os.getenv('IMAGE_CATEGORY_TYPES', ImageCategory.TEXT_DETECTION)
                    ]
                },
                'boundingBox': {
                    'state': os.getenv('IMAGE_BOUNDING_BOX_STATE', ConfigState.DISABLED.value)
                }
            },
            'generativeField': {
                'state': os.getenv('IMAGE_GENERATIVE_FIELD_STATE', ConfigState.DISABLED.value),
                'types': [
                    os.getenv('IMAGE_GENERATIVE_FIELD_TYPES', ImageGenerativeField.IMAGE_SUMMARY)
                ]
            }
        }

    def _get_video_config(self) -> Optional[Dict[str, Any]]:
        """Get video configuration if enabled"""
        if os.getenv('ENABLE_VIDEO', 'false').lower() != 'true':
            return None

        return {
            'extraction': {
                'category': {
                    'state': os.getenv('VIDEO_CATEGORY_STATE', ConfigState.DISABLED.value),
                    'types': [
                        os.getenv('VIDEO_CATEGORY_TYPES',VideoCategory.CONTENT_MODERATION)
                    ]
                },
                'boundingBox': {
                    'state': os.getenv('VIDEO_BOUNDING_BOX_STATE', ConfigState.DISABLED.value)
                }
            },
            'generativeField': {
                'state': os.getenv('VIDEO_GENERATIVE_FIELD_STATE', ConfigState.DISABLED.value),
                'types': [
                    os.getenv('VIDEO_GENERATIVE_FIELD_TYPES', VideoGenerativeField.VIDEO_SUMMARY)
                ]
            }
        }

    def _get_audio_config(self) -> Optional[Dict[str, Any]]:
        """Get audio configuration if enabled"""
        if os.getenv('ENABLE_AUDIO', 'false').lower() != 'true':
            return None

        return {
            'extraction': {
                'category': {
                    'state': os.getenv('AUDIO_CATEGORY_STATE', ConfigState.DISABLED.value),
                    'types': [
                        os.getenv('AUDIO_CATEGORY_TYPES', AudioCategory.AUDIO_CONTENT_MODERATION)
                    ]
                }
            },
            'generativeField': {
                'state': os.getenv('AUDIO_GENERATIVE_FIELD_STATE', ConfigState.DISABLED.value),
                'types': [
                     os.getenv('AUDIO_GENERATIVE_FIELD_TYPES', AudioGenerativeField.AUDIO_SUMMARY)
                ]
            }
        }



    def get_standard_output_config(self) -> Dict[str, Any]:
        """Get standard output configuration"""
        config = {'document': self._get_document_config()}

        # Add optional configurations if enabled
        image_config = self._get_image_config()
        if image_config:
            config['image'] = image_config

        video_config = self._get_video_config()
        if video_config:
            config['video'] = video_config

        audio_config = self._get_audio_config()
        if audio_config:
            config['audio'] = audio_config

        return config

    def get_custom_output_config(self) -> Optional[Dict[str, Any]]:
        """Get custom output configuration"""
        blueprint_arn = os.getenv('BLUEPRINT_ARN')
        if not blueprint_arn:
            return None

        blueprint_config = {
            'blueprintArn': blueprint_arn,
            'blueprintStage': os.getenv('BLUEPRINT_STAGE', ProjectStage.LIVE.value)
        }

        # Add version only if available
        blueprint_version = os.getenv('BLUEPRINT_VERSION')
        if blueprint_version:
            blueprint_config['blueprintVersion'] = blueprint_version

        return {'blueprints': [blueprint_config]}

    def get_override_config(self) -> Optional[Dict[str, Any]]:
        """Get override configuration"""
        splitter_state = os.getenv('DOCUMENT_SPLITTER_STATE')
        if not splitter_state:
            return None

        return {
            'document': {
                'splitter': {
                    'state': splitter_state
                }
            }
        }

    def get_encryption_config(self) -> Optional[Dict[str, Any]]:
        """Get encryption configuration"""
        kms_key_id = os.getenv('KMS_KEY_ID')
        if not kms_key_id:
            return None

        config = {'kmsKeyId': kms_key_id}

        # Add encryption context if available
        kms_context = os.getenv('KMS_ENCRYPTION_CONTEXT')
        if kms_context:
            try:
                config['kmsEncryptionContext'] = json.loads(kms_context)
            except json.JSONDecodeError:
                logger.warning("Invalid KMS encryption context JSON", extra={"kms_context": kms_context})

        return config

    def get_project_config(self) -> Dict[str, Any]:
        """Get complete project configuration"""
        config = {
            'projectName': self.project_name,
            'projectStage': self.project_stage.value,
            'standardOutputConfiguration': self.get_standard_output_config()
        }

        # Add optional project description
        if self.project_description:
            config['projectDescription'] = self.project_description

        # Add optional configurations
        custom_output = self.get_custom_output_config()
        if custom_output:
            config['customOutputConfiguration'] = custom_output

        override_config = self.get_override_config()
        if override_config:
            config['overrideConfiguration'] = override_config

        encryption_config = self.get_encryption_config()
        if encryption_config:
            config['encryptionConfiguration'] = encryption_config

        # Add client token if available
        client_token = os.getenv('CLIENT_TOKEN')
        if client_token:
            config['clientToken'] = client_token

        return config

# Example usage:
# def create_project() -> str:
#     """Create a data automation project"""
#     try:
#         project_config = ProjectConfig()
#         config = project_config.get_project_config()

#         logger.info("Creating project with configuration", extra={"config": config})

#         client = boto3.client('bedrock')
#         response = client.create_data_automation_project(**config)

#         project_arn = response["projectArn"]
#         logger.info("Project created successfully", extra={"project_arn": project_arn})

#         return project_arn

#     except Exception as e:
#         logger.error("Error creating project", extra={"error": str(e)})
#         raise

# Required
# PROJECT_NAME=MyProject
# PROJECT_STAGE=LIVE

# # Document Configuration (default enabled)
# DOCUMENT_GRANULARITY_TYPES=DOCUMENT,PAGE
# DOCUMENT_BOUNDING_BOX_STATE=ENABLED
# DOCUMENT_GENERATIVE_FIELD_STATE=ENABLED
# DOCUMENT_TEXT_FORMAT_TYPES=PLAIN_TEXT,HTML
# DOCUMENT_ADDITIONAL_FILE_FORMAT_STATE=DISABLED

# # Image Configuration (optional)
# ENABLE_IMAGE=true
# IMAGE_CATEGORY_STATE=ENABLED
# IMAGE_CATEGORY_TYPES=CONTENT_MODERATION,TEXT_DETECTION
# IMAGE_BOUNDING_BOX_STATE=ENABLED
# IMAGE_GENERATIVE_FIELD_STATE=ENABLED
# IMAGE_GENERATIVE_FIELD_TYPES=IMAGE_SUMMARY

# # Video Configuration (optional)
# ENABLE_VIDEO=true
# VIDEO_CATEGORY_STATE=ENABLED
# VIDEO_CATEGORY_TYPES=CONTENT_MODERATION,TRANSCRIPT
# VIDEO_BOUNDING_BOX_STATE=ENABLED
# VIDEO_GENERATIVE_FIELD_STATE=ENABLED
# VIDEO_GENERATIVE_FIELD_TYPES=VIDEO_SUMMARY,SCENE_SUMMARY

# # Audio Configuration (optional)
# ENABLE_AUDIO=true
# AUDIO_CATEGORY_STATE=ENABLED
# AUDIO_CATEGORY_TYPES=TRANSCRIPT
# AUDIO_GENERATIVE_FIELD_STATE=ENABLED
# AUDIO_GENERATIVE_FIELD_TYPES=AUDIO_SUMMARY

# # Blueprint Configuration (optional)
# BLUEPRINT_ARN=arn:aws:bedrock:region:account:blueprint/id
# BLUEPRINT_VERSION=1.0
# BLUEPRINT_STAGE=LIVE

# # Override Configuration (optional)
# DOCUMENT_SPLITTER_STATE=ENABLED

# # Encryption Configuration (optional)
# KMS_KEY_ID=arn:aws:kms:region:account:key/key-id
# KMS_ENCRYPTION_CONTEXT={"key1": "value1"}

# # Client Token (optional)
# CLIENT_TOKEN=unique-client-token
