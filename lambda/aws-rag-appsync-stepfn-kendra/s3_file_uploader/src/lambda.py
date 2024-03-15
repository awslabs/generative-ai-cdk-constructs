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
import os

from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools import Logger
import boto3
import base64
import mimetypes

logger = Logger(service="KENDRA_INGESTION_FILE_UPLOADER")

s3_client = boto3.client('s3')
S3_BUCKET_NAME = os.environ['S3_BUCKET_NAME']

allowed_mime_types = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'text/plain',
    'text/html',
    'application/rtf',
    'application/epub+zip'
]

def file_exists_in_bucket(bucket_name, object_name,):

    try:
        resp = s3_client.head_object(Bucket=bucket_name, Key=object_name)
        return True
    except s3_client.exceptions.ClientError as e:
        if e.response['Error']['Code'] == '404':
            logger.exception('Object doesn\'t exist')
            return False
        else:
            logger.exception('An error occured')
            print(e)
            return False

def handler(event,  context: LambdaContext) -> str:
    for record in event['Records']:

        file_content_base64 = record['fileContent']
        file_name = record['fileName']

        file_content = base64.b64decode(file_content_base64)

        mime_type, _ = mimetypes.guess_type(file_name)

        if mime_type in allowed_mime_types:
            s3_client.put_object(Bucket=S3_BUCKET_NAME, Key=file_name, Body=file_content)
            print(f'Uploaded {file_name} to S3 bucket {S3_BUCKET_NAME}')
        else:
            print(f'File type of {file_name} not allowed. MIME type: {mime_type}')

    return 'success'
