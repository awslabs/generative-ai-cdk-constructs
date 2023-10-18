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
from typing import List
from io import BytesIO
from langchain.document_loaders.base import BaseLoader
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

class S3FileLoaderInMemory(BaseLoader):
    """Loading logic for loading documents from s3."""

    def __init__(self, bucket: str, key: str):
        """Initialize with bucket and key name."""
        self.bucket = bucket
        self.key = key

    def load(self) -> str:
        """Load documents."""
        try:
            import boto3
        except ImportError:
            raise ImportError(
                "Could not import `boto3` python package. "
                "Please install it with `pip install boto3`."
            )
         # read S3
        try:
            s3 = boto3.resource('s3')
            obj = s3.Object(self.bucket, self.key)
            return obj.get()['Body'].read().decode('utf-8')
        except Exception as e:
            print(f'An error occured while loading {self.key} from bucket {self.bucket} : {e}')
            return None
        
    def get_document_tokens(self) -> int:
        """Give an estimate of the number of tokens for a document"""
        try:
            import boto3
        except ImportError:
            raise ImportError(
                "Could not import `boto3` python package. "
                "Please install it with `pip install boto3`."
            )
         # read S3
        try:
            s3_client = boto3.client('s3')
            resp = s3_client.head_object(Bucket=self.bucket, Key=self.key)
            logger.info(resp)
            content_length_bytes = resp['ContentLength']
            #Assuming a binary gigabyte (1,073,741,824 bytes), then at 6 bytes per word you could store about 179 million words. 
            #For English text, 1 token is approximately 4 characters or 0.75 words. For 179M words, we have ~134 250 000 tokens
            number_of_tokens = int((content_length_bytes * 134250000) / 1073741824)
            logger.info(f'The document {self.key} contains {content_length_bytes} bytes which gives an estimated amount of {number_of_tokens} tokens')
            return number_of_tokens
        except Exception as e:
            logger.exception(f'An error occured while loading metadata for {self.key} from bucket {self.bucket} : {e}')
            return None 
