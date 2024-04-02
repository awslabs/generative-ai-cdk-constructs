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
import base64
from enum import Enum
import os
import nltk
import boto3
import tempfile
from aws_lambda_powertools import Logger, Tracer

s3 = boto3.client('s3')


logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")

class Modality(Enum):
    TEXT = (
        'Text'
    )
    IMAGE = (
        'Image'
        
    )
    def __init__(self, status):
        self.status = status

    

# read text file √from s3 bucket
def read_file_from_s3(bucket, key):
    try:
        s3 = boto3.resource("s3")
        obj = s3.Object(bucket, key)
        return obj.get()["Body"].read().decode("utf-8")
    except Exception as e:
        logger.exception(
            f"An error occured while attempting to read {key} from {bucket}.\n"
            f"Reason: {e}"
        )
        return None

def download_file(bucket,key )-> str:
        try: 
            file_path = os.path.join(tempfile.gettempdir(), os.path.basename(key))
            s3.download_file(bucket, key,file_path)
            return file_path
        except Exception as exp:
            logger.error(f"Couldn\'t download file {key}/{file_path} from {bucket}: {exp}")


def encode_image_to_base64(image_file_path,image_file) -> str:
        with open(image_file_path, "rb") as image_file:
            b64_image = base64.b64encode(image_file.read()).decode('utf8')       
        return b64_image