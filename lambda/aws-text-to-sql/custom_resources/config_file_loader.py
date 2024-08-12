import logging
import os
import boto3


from botocore.exceptions import ClientError

from custom_resources.cr_types import CustomResourceRequest, CustomResourceResponse

from typing import TypedDict

# Set the LD_LIBRARY_PATH to include the /opt/lib directory
# if os.environ.get('AWS_EXECUTION_ENV'):
#     os.environ['LD_LIBRARY_PATH'] = '/opt/lib'
#     try:
#         import psycopg2
#         # Your code that uses psycopg2
#     except ImportError:
#         sys.exit('Unable to import module: %s' % 'psycopg2')


LOG_LEVEL = os.getenv("LOG_LEVEL", "INFO")

logger = logging.getLogger(__name__)
logger.setLevel(LOG_LEVEL)


class ConfigLoaderProperties(TypedDict):
    Host: str
    DatabaseName: str
    Port: int
    SecretName: str


def on_create(
    event: CustomResourceRequest[ConfigLoaderProperties]
) -> CustomResourceResponse:
    config_bucket = event["ResourceProperties"]["configBucket"]
    config_file_path = event["ResourceProperties"]["configFilePath"]

    s3 = boto3.client('s3')

    # Upload all files from the configFilePath to the configBucket
    for root, dirs, files in os.walk(config_file_path):
        for file in files:
            local_file_path = os.path.join(root, file)
            s3_key = os.path.relpath(local_file_path, config_file_path)

            try:
                s3.upload_file(local_file_path, config_bucket, s3_key)
                logger.info(f"Uploaded {local_file_path} to {
                            config_bucket}/config/{s3_key}")
            except ClientError as e:
                logger.error(f"Error uploading {local_file_path}: {e}")

    return {
        "PhysicalResourceId": f"{config_bucket}-config-files",
        "Data": {
            "Message": "Config files uploaded successfully"
        }
    }


def on_update(
    _event: CustomResourceRequest[ConfigLoaderProperties],
) -> CustomResourceResponse:
    raise ValueError("Update not supported")


def on_delete(
    _event: CustomResourceRequest[ConfigLoaderProperties],
) -> CustomResourceResponse:
    return {
        "PhysicalResourceId": _event["PhysicalResourceId"],
        "Data": {
            "Message": "Deletion is not needed. Ignoring."
        }
    }


def on_event(event: CustomResourceRequest[ConfigLoaderProperties], context):
    logger.debug(f"Received event: {event}")
    request_type = event["RequestType"]

    if "ServiceToken" in event["ResourceProperties"]:
        del event["ResourceProperties"]["ServiceToken"]

    if request_type == "Create":
        return on_create(event)
    if request_type == "Update":
        return on_update(event)
    if request_type == "Delete":
        return on_delete(event)
    raise Exception("Invalid request type: %s" % request_type)
