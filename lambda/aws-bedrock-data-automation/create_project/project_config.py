from typing import Dict, Any, List, Optional
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
        required_fields = ['projectName']
        missing_fields = [field for field in required_fields 
                         if not self.project_details.get(field)]
        if missing_fields:
            raise ValueError(f"Missing required fields: {', '.join(missing_fields)}")
        
        # Validate project stage
        if self.project_details['projectStage'] not in [e.value for e in ProjectStage]:
            raise ValueError(f"Invalid projectStage. Must be one of: {[e.value for e in ProjectStage]}")

    def _get_standard_output_config(self) -> Dict[str, Any]:
        """Get standard output configuration if present"""
        config = self.project_details.get('standardOutputConfiguration', {})
       
        return {
            'document': self._get_document_config(config.get('document', {})),
            'image': self._get_image_config(config.get('image', {})),
            'video': self._get_video_config(config.get('video', {})),
            'audio': self._get_audio_config(config.get('audio', {}))
        }

    def _get_document_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process document configuration"""
        
        return {
            'extraction': {
                'granularity': {
                    'types': (lambda x: [x] if not isinstance(x, list) else x)(
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
                    'types': (lambda x: [x] if not isinstance(x, list) else x)(
                        config.get('document', {}).get('outputFormat', {}).get('textFormat', {}).get('types', ['PLAIN_TEXT'])
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
                    'types': (lambda x: [x] if not isinstance(x, list) else x)(
                        config.get('image', {}).get('extraction', {}).get('category', {}).get('types', ['CONTENT_MODERATION'])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': (lambda x: [x] if not isinstance(x, list) else x)(
                    config.get('image', {}).get('generativeField', {}).get('types', ['IMAGE_SUMMARY'])
                )
            }
        }

    def _get_video_config(self, config: Dict[str, Any]) -> Dict[str, Any]:
        """Process video configuration"""
       
        return {
            'extraction': {
                'category': {
                    'state': config.get('extraction', {}).get('category', {}).get('state', State.DISABLED.value),
                    'types': (lambda x: [x] if not isinstance(x, list) else x)(
                        config.get('video', {}).get('extraction', {}).get('category', {}).get('types', ['CONTENT_MODERATION'])
                    )
                },
                'boundingBox': {
                    'state': config.get('extraction', {}).get('boundingBox', {}).get('state', State.DISABLED.value)
                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': (lambda x: [x] if not isinstance(x, list) else x)(
                    config.get('video', {}).get('generativeField', {}).get('types', ['VIDEO_SUMMARY'])
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
                    'types': (lambda x: [x] if not isinstance(x, list) else x)(
                        config.get('audio', {}).get('extraction', {}).get('category', {}).get('types', ['TRANSCRIPT'])
                    )                }
            },
            'generativeField': {
                'state': config.get('generativeField', {}).get('state', State.DISABLED.value),
                'types': (lambda x: [x] if not isinstance(x, list) else x)(
                    config.get('audio', {}).get('generativeField', {}).get('types', ['AUDIO_SUMMARY'])
                )            }
        }

    @property
    def project_config(self) -> Dict[str, Any]:
        """Get complete project configuration"""
        config = {
            'projectName': self.project_details['projectName'],
            'projectDescription': self.project_details.get('projectDescription','sample description'),
            'projectStage': self.project_details.get('projectStage','LIVE')
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

        return config

    def __str__(self) -> str:
        """String representation of project configuration"""
        return f"ProjectConfig(name={self.project_details['projectName']}, stage={self.project_details['projectStage']})"
