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
from typing import Dict, Any
from enum import Enum

class ProjectStage(str, Enum):
    DEVELOPMENT = "DEVELOPMENT"
    LIVE = "LIVE"

class State(str, Enum):
    ENABLED = "ENABLED"
    DISABLED = "DISABLED"

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
    LOGOS = "LOGOS"

class ImageGenerativeField(str, Enum):
    IMAGE_SUMMARY = "IMAGE_SUMMARY"
    IAB = "IAB"

class VideoCategory(str, Enum):
    CONTENT_MODERATION = "CONTENT_MODERATION"
    TEXT_DETECTION = "TEXT_DETECTION"
    TRANSCRIPT = "TRANSCRIPT"
    LOGOS = "LOGOS"

class VideoGenerativeField(str, Enum):
    VIDEO_SUMMARY = "VIDEO_SUMMARY"
    SCENE_SUMMARY = "SCENE_SUMMARY"
    IAB = "IAB"

class AudioCategory(str, Enum):
    AUDIO_CONTENT_MODERATION = "AUDIO_CONTENT_MODERATION"
    CHAPTER_CONTENT_MODERATION = "CHAPTER_CONTENT_MODERATION"
    TOPIC_CONTENT_MODERATION = "TOPIC_CONTENT_MODERATION"
    TRANSCRIPT = "TRANSCRIPT"

class AudioGenerativeField(str, Enum):
    AUDIO_SUMMARY = "AUDIO_SUMMARY"
    CHAPTER_SUMMARY = "CHAPTER_SUMMARY"
    TOPIC_SUMMARY = "TOPIC_SUMMARY"
    IAB = "IAB"

class Modality(str, Enum):
    DOCUMENT = "document"
    IMAGE = "image"
    VIDEO = "video"
    AUDIO = "audio"

class ResourceOwner(str, Enum):
    SERVICE = "SERVICE"
    ACCOUNT = "ACCOUNT"

class ProjectStageFilter(str, Enum):
    DEVELOPMENT = "DEVELOPMENT"
    LIVE = "LIVE"
    ALL = "ALL"

def ensure_list(x):
    """
    Ensures the input is always returned as a list.
    If input is not a list, converts it to a single-item list.
    If input is already a list, returns it unchanged.
    
    Args:
        x: Any type of input
    
    Returns:
        list: Input converted to or kept as list
    """
    return [x] if not isinstance(x, list) else x
class ProjectConfig:
    """Configuration class for Bedrock Data Automation project settings"""
    
    def __init__(self, project_details: Dict[str, Any]):
        """
        Initialize project configuration with project details
        
        Args:
            project_details: Dictionary containing project configuration values
        """
        self.project_details = project_details
        self._validate_required_fields()

    def _validate_required_fields(self) -> None:
        """Validate required fields are present in project_details"""
        required_fields = ['project_name', 'modality']
        missing_fields = [field for field in required_fields 
                         if not self.project_details.get(field)]
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
        
        # Validate project stage
        project_stage = self.project_details.get('project_stage')
        if project_stage and project_stage not in [e.value for e in ProjectStage]:
            raise ValueError(f"Invalid project_stage. Must be one of: {[e.value for e in ProjectStage]}")

    def _get_standard_output_config(self) -> Dict[str, Any]:
        """Get standard output configuration if present"""
        config = self.project_details.get('standardOutputConfiguration', {})
        modality = self.project_details.get('modality')
        
        # If modality is not provided, return empty dict
        if not modality:
            return {}
            
        # Convert modality to lowercase for case-insensitive comparison
        modality = modality.lower()
            
        if modality == Modality.DOCUMENT.value:
            return {'document': self._get_document_config(config.get('document', {}))}
        elif modality == Modality.IMAGE.value:
            return {'image': self._get_image_config(config.get('image', {}))}
        elif modality == Modality.VIDEO.value:
            return {'video': self._get_video_config(config.get('video', {}))}
        elif modality == Modality.AUDIO.value:
            return {'audio': self._get_audio_config(config.get('audio', {}))}
        else:
            raise ValueError(f"Invalid modality: {modality}. Must be one of {[e.value for e in Modality]}")
        

    def _get_document_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process document configuration"""
        
        return {
            'extraction': {
                'granularity': {
                    'types': ensure_list(
                    config.get('extraction', {}).get('granularity', {}).get('types', [DocumentGranularity.DOCUMENT.value])
                )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value)
            },
            'outputFormat': {
                'textFormat': {
                    'types': ensure_list(
                        config.get('outputFormat', {}).get('textFormat', {}).get('types', [TextFormat.PLAIN_TEXT.value])
                    )
                },
                'additionalFileFormat': {
                    'state': config.get('outputFormat', {}).get('additionalFileFormat', {}).get('state', State.DISABLED.value)
                }
            }
        }

    def _get_image_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process image configuration"""
        
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [ImageCategory.CONTENT_MODERATION.value])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [ImageGenerativeField.IMAGE_SUMMARY.value])
                )
            }
        }

    def _get_video_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process video configuration"""
       
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [VideoCategory.CONTENT_MODERATION.value])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [VideoGenerativeField.VIDEO_SUMMARY.value])
                )
            }
        }

    def _get_audio_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process audio configuration"""
        if not config:
            return {}
        
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [AudioCategory.TRANSCRIPT.value])
                    )
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [AudioGenerativeField.AUDIO_SUMMARY.value])
                )
            }
        }

    @property
    def project_config(self) -> Dict[str, Any]:
        """Get complete project configuration"""
        config = {
            'projectName': self.project_details.get('project_name'),
            'projectDescription': self.project_details.get('project_description', 'sample description'),
            'projectStage': self.project_details.get('project_stage', 'LIVE')
        }

        # Add standard output configuration if present
        standard_output = self._get_standard_output_config()
        if standard_output:
            config['standardOutputConfiguration'] = standard_output

        # Add custom output configuration if present
        if 'customOutputConfiguration' in self.project_details:
            config['customOutputConfiguration'] = self.project_details['customOutputConfiguration']

        # Add override configuration if present
        if 'overrideConfiguration' in self.project_details:
            config['overrideConfiguration'] = self.project_details['overrideConfiguration']

        # Add client token if present
        if 'clientToken' in self.project_details:
            config['clientToken'] = self.project_details['clientToken']

        # Add encryption configuration if present
        if 'encryptionConfiguration' in self.project_details:
            config['encryptionConfiguration'] = self.project_details['encryptionConfiguration']
        
        # Add tags if present
        if 'tags' in self.project_details:
            config['tags'] = self.project_details['tags']

        return config

    def __str__(self) -> str:
        """String representation of project configuration"""
        return f"ProjectConfig(name={self.project_details.get('project_name')}, stage={self.project_details.get('project_stage')})"

class ListProjectsConfig:
    """Configuration class for listing Bedrock Data Automation projects"""
    
    def __init__(self, list_details: Dict[str, Any]):
        """
        Initialize list configuration with list details
        
        Args:
            list_details: Dictionary containing list configuration values
        """
        self.list_details = list_details
        self._validate_parameters()

    def _validate_parameters(self) -> None:
        """Validate parameters for listing projects"""
        # Validate project_stage_filter if provided
        if 'project_stage_filter' in self.list_details:
            project_stage_filter = self.list_details['project_stage_filter']
            if project_stage_filter not in [e.value for e in ProjectStageFilter]:
                raise ValueError(f"Invalid project_stage_filter: {project_stage_filter}. Must be one of: {[e.value for e in ProjectStageFilter]}")
        
        # Validate blueprint_stage if provided
        if 'blueprint_stage' in self.list_details:
            blueprint_stage = self.list_details['blueprint_stage']
            if blueprint_stage not in [e.value for e in ProjectStage]:
                raise ValueError(f"Invalid blueprint_stage: {blueprint_stage}. Must be one of: {[e.value for e in ProjectStage]}")
        
        # Validate resource_owner if provided
        if 'resource_owner' in self.list_details:
            resource_owner = self.list_details['resource_owner']
            if resource_owner not in [e.value for e in ResourceOwner]:
                raise ValueError(f"Invalid resource_owner: {resource_owner}. Must be one of: {[e.value for e in ResourceOwner]}")
        
        # Validate max_results if provided
        if 'max_results' in self.list_details:
            try:
                max_results = int(self.list_details['max_results'])
                if max_results <= 0:
                    raise ValueError("max_results must be a positive integer")
            except ValueError:
                raise ValueError("max_results must be a valid integer")

    @property
    def list_config(self) -> Dict[str, Any]:
        """Get complete list configuration"""
        config = {}
        
        # Add maxResults if provided
        if 'max_results' in self.list_details:
            config['maxResults'] = int(self.list_details['max_results'])
        
        # Add nextToken if provided
        if 'next_token' in self.list_details:
            config['nextToken'] = self.list_details['next_token']
        
        # Add projectStageFilter if provided
        if 'project_stage_filter' in self.list_details:
            config['projectStageFilter'] = self.list_details['project_stage_filter']
        
        # Add blueprintFilter if any blueprint parameters are provided
        blueprint_arn = self.list_details.get('blueprint_arn')
        blueprint_version = self.list_details.get('blueprint_version')
        blueprint_stage = self.list_details.get('blueprint_stage')
        
        if blueprint_arn or blueprint_version or blueprint_stage:
            blueprint_filter = {}
            
            if blueprint_arn:
                blueprint_filter['blueprintArn'] = blueprint_arn
            
            if blueprint_version:
                blueprint_filter['blueprintVersion'] = blueprint_version
            
            if blueprint_stage:
                blueprint_filter['blueprintStage'] = blueprint_stage
            
            # Only add blueprintFilter if it has at least one property
            if blueprint_filter:
                config['blueprintFilter'] = blueprint_filter
        
        # Add resourceOwner if provided
        if 'resource_owner' in self.list_details:
            config['resourceOwner'] = self.list_details['resource_owner']
        
        return config

    def __str__(self) -> str:
        """String representation of list configuration"""
        return f"ListProjectsConfig(max_results={self.list_details.get('max_results')}, project_stage_filter={self.list_details.get('project_stage_filter')})"

class UpdateProjectConfig:
    """Configuration class for updating Bedrock Data Automation project settings"""
    
    def __init__(self, project_details: Dict[str, Any]):
        """
        Initialize update configuration with project details
        
        Args:
            project_details: Dictionary containing project configuration values
        """
        self.project_details = project_details
        self._validate_required_fields()

    def _validate_required_fields(self) -> None:
        """Validate required fields are present in project_details"""
        # projectArn is required for update
        if not self.project_details.get('projectArn'):
            raise ValueError("projectArn is required for update operation")
        
        # Validate project stage if provided
        if 'projectStage' in self.project_details and self.project_details['projectStage'] not in [e.value for e in ProjectStage]:
            raise ValueError(f"Invalid projectStage. Must be one of: {[e.value for e in ProjectStage]}")

    def _get_standard_output_config(self) -> Dict[str, Any]:
        """Get standard output configuration if present"""
        config = self.project_details.get('standardOutputConfiguration', {})
        modality = self.project_details.get('modality')
        
        result = {}
        
        # Include document configuration if present
        if 'document' in config:
            result['document'] = self._get_document_config(config.get('document', {}))
            
        # Include image configuration if present
        if 'image' in config:
            result['image'] = self._get_image_config(config.get('image', {}))
            
        # Include video configuration if present
        if 'video' in config:
            result['video'] = self._get_video_config(config.get('video', {}))
            
        # Include audio configuration if present
        if 'audio' in config:
            result['audio'] = self._get_audio_config(config.get('audio', {}))
            
        return result

    def _get_document_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process document configuration"""
        
        return {
            'extraction': {
                'granularity': {
                    'types': ensure_list(
                    config.get('extraction', {}).get('granularity', {}).get('types', [DocumentGranularity.DOCUMENT.value])
                )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value)
            },
            'outputFormat': {
                'textFormat': {
                    'types': ensure_list(
                        config.get('outputFormat', {}).get('textFormat', {}).get('types', [TextFormat.PLAIN_TEXT.value])
                    )
                },
                'additionalFileFormat': {
                    'state': config.get('outputFormat', {}).get('additionalFileFormat', {}).get('state', State.DISABLED.value)
                }
            }
        }

    def _get_image_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process image configuration"""
        
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [ImageCategory.CONTENT_MODERATION.value])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [ImageGenerativeField.IMAGE_SUMMARY.value])
                )
            }
        }

    def _get_video_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process video configuration"""
       
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [VideoCategory.CONTENT_MODERATION.value])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [VideoGenerativeField.VIDEO_SUMMARY.value])
                )
            }
        }

    def _get_audio_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process audio configuration"""
        if not config:
            return {}
        
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': ensure_list(
                        config.get('extraction', {}).get('category', {}).get('types', [AudioCategory.TRANSCRIPT.value])
                    )
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': ensure_list(
                    config.get('generativeField', {}).get('types', [AudioGenerativeField.AUDIO_SUMMARY.value])
                )
            }
        }

    @property
    def update_config(self) -> Dict[str, Any]:
        """Get complete update configuration"""
        config = {
            'projectArn': self.project_details['projectArn']
        }
        
        # Add project description if present
        if 'projectDescription' in self.project_details:
            config['projectDescription'] = self.project_details['projectDescription']
            
        # Add project stage if present
        if 'projectStage' in self.project_details:
            config['projectStage'] = self.project_details['projectStage']

        # Add standard output configuration if present
        if 'standardOutputConfiguration' in self.project_details:
            standard_output = self._get_standard_output_config()
            if standard_output:
                config['standardOutputConfiguration'] = standard_output

        # Add custom output configuration if present
        if 'customOutputConfiguration' in self.project_details:
            config['customOutputConfiguration'] = self.project_details['customOutputConfiguration']

        # Add override configuration if present
        if 'overrideConfiguration' in self.project_details:
            config['overrideConfiguration'] = self.project_details['overrideConfiguration']

        # Add encryption configuration if present
        if 'encryptionConfiguration' in self.project_details:
            config['encryptionConfiguration'] = self.project_details['encryptionConfiguration']

        return config

    def __str__(self) -> str:
        """String representation of update configuration"""
        return f"UpdateProjectConfig(arn={self.project_details['projectArn']}, stage={self.project_details.get('projectStage', 'Not specified')})"
