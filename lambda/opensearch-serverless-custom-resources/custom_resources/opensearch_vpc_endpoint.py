#
# Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
# with the License. A copy of the License is located at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
# OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
# and limitations under the License.
#

from opensearchpy import (OpenSearch, AuthorizationException)

import boto3
import logging
import os
import uuid

from tenacity import (
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential_jitter,
)

from typing import List, TypedDict

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse
from custom_resources.opensearch_index import connect_opensearch

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class VpcEndpointProperties(TypedDict):
    Endpoint: str
    DomainArn: str
    SubnetIds: List[str]
    SecurityGroupIds: List[str]

def validate_event(event: CustomResourceRequest[VpcEndpointProperties]) -> bool:
    if event["ResourceProperties"] is None:
        raise ValueError("ResourceProperties is required")
    if event["ResourceProperties"]["Endpoint"] is None:
        raise ValueError("Endpoint is required")
    if event["ResourceProperties"]["DomainArn"] is None:
        raise ValueError("DomainArn is required")
    if event["ResourceProperties"]["SubnetIds"] is None:
        raise ValueError("SubnetIds is required")
    if event["ResourceProperties"]["SecurityGroupIds"] is None:
        raise ValueError("SecurityGroupIds is required")

@retry(
    retry=retry_if_exception_type(AuthorizationException),
    stop=stop_after_attempt(30),
    wait=wait_exponential_jitter(1, 3),
)
def handle_create(
    client: OpenSearch,
    domain_arn: str,
    subnet_ids: List[str],
    security_group_ids: List[str],
    client_token: str
):
    try:
        response = client.create_vpc_endpoint(
            DomainArn= domain_arn,
            VpcOptions={
                "SubnetIds": subnet_ids,
                "SecurityGroupIds": security_group_ids,
            },
            ClientToken=client_token,
        )
    except Exception as e:
        logger.error(f"Error creating VPC endpoint for domain: {domain_arn}")
        logger.exception(e)
        raise e
    return response["VpcEndpoint"]["VpcEndpointId"]

@retry(
    retry=retry_if_exception_type(AuthorizationException),
    stop=stop_after_attempt(30),
    wait=wait_exponential_jitter(1, 3),
)    
def handle_update(
    client: OpenSearch,
    vpc_endpoint_id: str,
    subnet_ids: List[str],
    security_group_ids: List[str]
):
    try:
        response = client.update_vpc_endpoint(
            VpcEndpointId=vpc_endpoint_id,
            VpcOptions={
                "SubnetIds": subnet_ids,
                "SecurityGroupIds": security_group_ids,
            },
        )
    except Exception as e:
        logger.error(f"Error updating VPC endpoint: {vpc_endpoint_id}")
        logger.exception(e)
        raise e
    return response["VpcEndpoint"]["VpcEndpointId"]

@retry(
    retry=retry_if_exception_type(AuthorizationException),
    stop=stop_after_attempt(30),
    wait=wait_exponential_jitter(1, 3),
)
def handle_delete(
        client: OpenSearch,
        vpc_endpoint_id: str,
):
    try:
        response = client.delete_vpc_endpoint(
            VpcEndpointId=vpc_endpoint_id,
        )
    except Exception as e:
        logger.error(f"Error deleting VPC endpoint: {vpc_endpoint_id}")
        logger.exception(e)
        raise e
    return response["VpcEndpointSummary"]["VpcEndpointId"]

def on_create(event: CustomResourceRequest[VpcEndpointProperties]) -> CustomResourceResponse:
    validate_event(event)
    client = connect_opensearch(event["ResourceProperties"]["Endpoint"])
    physical_id = handle_create(client, 
                  event["ResourceProperties"]["DomainArn"], 
                  event["ResourceProperties"]["SubnetIds"], 
                  event["ResourceProperties"]["SecurityGroupIds"], 
                  str(uuid.uuid4())
                  )
    return {"PhysicalResourceId": physical_id}

def on_update(
    event: CustomResourceRequest[VpcEndpointProperties],
) -> CustomResourceResponse:
    validate_event(event)
    client = connect_opensearch(event["ResourceProperties"]["Endpoint"])
    physical_id = handle_update(client,
                  event["PhysicalResourceId"],
                  event["ResourceProperties"]["SubnetIds"],
                  event["ResourceProperties"]["SecurityGroupIds"]
                  )
    return {"PhysicalResourceId": physical_id}
def on_delete(
    event: CustomResourceRequest[VpcEndpointProperties],
) -> CustomResourceResponse:
    validate_event(event)
    client = connect_opensearch(event["ResourceProperties"]["Endpoint"])
    pyhiscal_id = handle_delete(client, event["PhysicalResourceId"])

    return {"PhysicalResourceId": pyhiscal_id}


def on_event(event, context):
    logger.info(f"event: {event}")
    request_type = event["RequestType"]
    if request_type == "Create":
        return on_create(event, context)
    if request_type == "Update":
        return on_update(event, context)
    if request_type == "Delete":
        return on_delete(event, context)
    raise Exception("Invalid request type: %s" % request_type)