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

import logging
import os
import json
import boto3
from botocore.exceptions import ClientError
from typing import TypedDict

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse

LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")
logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class AutoDeleteProperties(TypedDict):
    BucketName: str


def on_create(
    event: CustomResourceRequest[AutoDeleteProperties],
) -> CustomResourceResponse:
    """
    On create, we don't need to do anything. The bucket is being created.
    """
    logger.info(f"Create event for bucket: {event['ResourceProperties'].get('BucketName')}")
    return {
        "PhysicalResourceId": f"s3vectors-auto-delete-{event['ResourceProperties']['BucketName']}",
        "Data": {
            "Message": "Auto-delete handler initialized."
        }
    }


def on_update(
    event: CustomResourceRequest[AutoDeleteProperties],
) -> CustomResourceResponse:
    """
    On update, we don't need to do anything. The bucket configuration may have changed
    but we only care about deletion.
    """
    logger.info(f"Update event for bucket: {event['ResourceProperties'].get('BucketName')}")
    return {
        "PhysicalResourceId": event["PhysicalResourceId"],
        "Data": {
            "Message": "Update completed."
        }
    }


def on_delete(
    event: CustomResourceRequest[AutoDeleteProperties],
) -> CustomResourceResponse:
    """
    On delete, list all indexes in the bucket and delete them.
    """
    bucket_name = event["ResourceProperties"]["BucketName"]
    logger.info(f"Delete event for bucket: {bucket_name}")

    s3vectors_client = boto3.client("s3vectors")

    try:
        # List all indexes in the bucket
        indexes = []
        paginator = s3vectors_client.get_paginator("list_indexes")
        for page in paginator.paginate(vectorBucketName=bucket_name):
            indexes.extend(page.get("Indexes", []))

        logger.info(f"Found {len(indexes)} indexes to delete in bucket {bucket_name}")

        # Delete each index
        deleted_count = 0
        for index in indexes:
            index_name = index.get("IndexName")
            if not index_name:
                continue

            try:
                logger.info(f"Deleting index: {index_name} from bucket: {bucket_name}")
                s3vectors_client.delete_index(
                    vectorBucketName=bucket_name,
                    indexName=index_name
                )
                deleted_count += 1
            except ClientError as e:
                error_code = e.response.get("Error", {}).get("Code", "Unknown")
                if error_code == "ResourceNotFoundException":
                    logger.warning(f"Index {index_name} not found, may have been already deleted")
                else:
                    logger.error(f"Error deleting index {index_name}: {e}")
                    raise

        logger.info(f"Successfully deleted {deleted_count} indexes from bucket {bucket_name}")

        return {
            "PhysicalResourceId": event["PhysicalResourceId"],
            "Data": {
                "Message": f"Deleted {deleted_count} indexes from bucket {bucket_name}",
                "DeletedCount": deleted_count
            }
        }

    except ClientError as e:
        error_code = e.response.get("Error", {}).get("Code", "Unknown")
        if error_code == "ResourceNotFoundException":
            logger.warning(f"Bucket {bucket_name} not found, may have been already deleted")
            return {
                "PhysicalResourceId": event["PhysicalResourceId"],
                "Data": {
                    "Message": "Bucket not found, may have been already deleted"
                }
            }
        else:
            logger.error(f"Error during delete operation: {e}")
            raise


def on_event(event: CustomResourceRequest[AutoDeleteProperties], context):
    """
    Main handler for CloudFormation custom resource events.
    """
    logger.debug(f"Received event: {event}")

    request_type = event["RequestType"]

    try:
        if request_type == "Create":
            response = on_create(event)
        elif request_type == "Update":
            response = on_update(event)
        elif request_type == "Delete":
            response = on_delete(event)
        else:
            raise ValueError(f"Unknown request type: {request_type}")

        logger.info(f"Successfully processed {request_type} request")
        return response

    except Exception as e:
        logger.error(f"Error processing {request_type} request: {e}", exc_info=True)
        raise

