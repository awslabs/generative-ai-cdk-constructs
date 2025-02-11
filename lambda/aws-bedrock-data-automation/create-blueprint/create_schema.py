
from typing import Annotated, List, Dict, Type
from pydantic import BaseModel
from custom_blueprint_schema import create_schema_fields,custom_blue_print

def create_schema(fields: List[Dict[str, str]]) -> Type[custom_blue_print]:
    """
    Create a schema class based on a list of field configurations.
    
    Args:
        fields (List[Dict[str, str]]): List of field configurations
            Format: [
                {
                    "name": "field_name",
                    "description": "field description",
                    "alias": "field alias"
                }
            ]
    
    Returns:
        Type[BaseBlueprintSchema]: A new schema class
    """
    annotations = {}
    
    # Process each field in the list
    for field in fields:
        field_name = field["name"]
        annotations[field_name] = Annotated[
            List[str],
            create_schema_fields(
                description=field["description"],
                alias=field["alias"]
            )
        ]
    
    # Create a new schema class dynamically
    return type(
        "DynamicSchema",
        (custom_blue_print,),
        {
            "__annotations__": annotations
        }
    )