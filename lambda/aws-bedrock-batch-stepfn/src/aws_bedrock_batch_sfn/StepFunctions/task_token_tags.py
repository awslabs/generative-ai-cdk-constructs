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

import logging
from typing import TypedDict

logger = logging.getLogger(__name__)


class Tag(TypedDict):
    key: str
    value: str


def build_task_token_tags(task_token: str | None) -> list[Tag]:
    """
    Convert a Step Functions task token into a set of tags.

    Step Functions task tokens can be up to 1024 characters long, but tag
    values can only be up to 256 characters. We split the task token into 4
    parts and store them as the tags TaskToken:0 through TaskToken:3.
    Args:
        task_token (str): A Step Functions Task Token up to 1024 characters

    Returns:
        list[Tag]: A list of tags TaskToken:0 through TaskToken:3.
    """
    if not task_token:
        return []

    if len(task_token) > 1024:
        raise ValueError("Task token must be 1024 characters or less")
    tags: list[Tag] = []
    for i in range(4):
        start = i * 256
        end = start + 256
        tag_value = task_token[start:end]
        if tag_value:
            tags.append({"key": f"TaskToken:{i}", "value": tag_value})
    return tags


def get_task_token_from_tags(tags: list[Tag]):
    """
    Retrieves the AWS Step Functions task token from the TaskToken tags of a resource.

    This function extracts the task token value from the 'TaskToken:{0-3}' tags. The task token is used
    to report task status back to Step Functions.

    Args:
        tags (list[Tag]): The tags for the resource

    Returns:
        str: The Step Functions task token value stored in the TaskToken:{0-3} tags.

    Raises:
        KeyError: If either:
            - The job has no tags at all
            - The job's tags do not include any 'TaskToken:{0-3}' tags
    """
    task_token_tags = [tag for tag in tags if tag["key"].startswith("TaskToken:")]
    if not task_token_tags:
        raise KeyError(f"No TaskToken tags found")
    task_token_tags.sort(key=lambda x: x["key"])
    logger.debug(f"Task token tags: {task_token_tags}")
    task_token = "".join((tag["value"] for tag in task_token_tags))
    if task_token == "":
        raise KeyError(f"No task token found")
    return task_token
