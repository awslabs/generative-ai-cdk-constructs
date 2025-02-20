
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