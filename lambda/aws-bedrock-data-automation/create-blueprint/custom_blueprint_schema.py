from pydantic import BaseModel, Field
from enum import Enum

class BlueprintStage(str, Enum):
    DEVELOPMENT = "DEVELOPMENT"
    LIVE = "LIVE"
    
class BlueprintType(str, Enum):
    DOCUMENT = "DOCUMENT"
    IMAGE = "IMAGE"
    
class custom_blue_print(BaseModel):
    """
    Base model class for creating custom blueprints with standardized schema configuration.
    Inherits from Pydantic's BaseModel for data validation and serialization.
    """

    # Default configuration for all schema instances
    model_config = {
        "title": None,  
        "json_schema_extra": {
            # Specify JSON Schema version and default metadata
            "$schema": "http://json-schema.org/draft-07/schema#",
            "description": "default",
            "documentClass": "default",
        },
    }

    @classmethod
    def model_json_schema(cls, *args, **kwargs) -> dict:
        """
        Customizes the JSON schema generation for the model.
        
        Args:
            *args: Variable length argument list passed to parent schema generator
            **kwargs: Arbitrary keyword arguments passed to parent schema generator
            
        Returns:
            dict: Modified JSON schema with customized property handling
        """
        # Get base schema from parent class without aliases
        schema = super().model_json_schema(*args, by_alias=False, **kwargs)
        
        # Remove top-level title if present
        schema.pop("title", None)

        # Process each field in the model
        properties = {}
        for field_name, field in cls.model_fields.items():
            field_schema = schema["properties"][field_name]
            alias = field.alias or field_name
            field_schema.pop("title", None)
            properties[alias] = field_schema
            
        schema["properties"] = properties
        return schema

def create_schema_fields(description: str, alias: str | None = None):
    """
    Creates a field configuration for extractive schema fields.
    
    Args:
        description (str): Description of what should be extracted from the document
        alias (str | None): Optional alternative name for the field in the output
        
    Returns:
        Field: Configured Pydantic Field with extractive properties
    """
    return Field(
        default_factory=list,
        description=description,
        alias=alias,
        json_schema_extra={
            "inferenceType": "extractive",  
            "items": {"type": "string"},   
        },
    )
