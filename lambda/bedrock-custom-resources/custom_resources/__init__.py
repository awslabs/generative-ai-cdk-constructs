# Copyright 2023 Amazon.com, Inc. or its affiliates. All Rights Reserved.
# Licensed under the Amazon Software License (the "License"). You may not
# use this file except in compliance with the License. A copy of the
# License is located at:
# http://aws.amazon.com/asl/
# or in the "license" file accompanying this file. This file is distributed
# on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND.
# See the License for the specific language governing permissions and
# limitations under the License.

__version__ = "0.1.0"

import logging
import os
import time

from .cr_types import CustomResourceRequest, CustomResourceResponse
from .bedrock_knowledgebase import on_event as on_event_bedrock_knowledgebase
from .bedrock_datasource import on_event as on_event_bedrock_datasource
from .bedrock_agent import on_event as on_event_bedrock_agent
from .bedrock_agent_alias import on_event as on_event_bedrock_agent_alias
from .bedrock_agent_knowledgebase import (
    on_event as on_event_bedrock_agent_knowledgebase,
)

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


def on_event(event: CustomResourceRequest, context):
    logger.debug(f"Received event: {event}")
    resource_type = event["ResourceType"]

    if resource_type == "Custom::Bedrock-Agent":
        return on_event_bedrock_agent(event, context)
    if resource_type == "Custom::Bedrock-AgentKnowledgeBase":
        return on_event_bedrock_agent_knowledgebase(event, context)
    if resource_type == "Custom::Bedrock-AgentAlias":
        return on_event_bedrock_agent_alias(event, context)
    if resource_type == "Custom::Bedrock-KnowledgeBase":
        return on_event_bedrock_knowledgebase(event, context)
    if resource_type == "Custom::Bedrock-DataSource":
        return on_event_bedrock_datasource(event, context)
    if resource_type == "Custom::NoOp":
        logger.info("NoOp resource type")
        # Return a response with a physical resource ID that is not empty.
        # This is required by CloudFormation to avoid a race condition.
        time.sleep(event["ResourceProperties"].get("delay", 0))
        return CustomResourceResponse(
            PhysicalResourceId=event["ResourceProperties"].get("message", "no-op")
        )
    raise Exception("Invalid resource type: %s" % resource_type)
