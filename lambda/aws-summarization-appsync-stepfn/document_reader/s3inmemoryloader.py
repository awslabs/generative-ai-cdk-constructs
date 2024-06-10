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
from langchain.docstore.document import Document
from langchain.document_loaders.base import BaseLoader
from langchain.docstore.document import Document
from langchain.text_splitter import NLTKTextSplitter
from pypdf import PdfReader
from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

@tracer.capture_method
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
            logger.exception('ImportError boto3')
         # read S3
        try:
            s3 = boto3.resource('s3')
            logger.info(f"Reading file from s3: bucket: {self.bucket}, key: {self.key}")
            obj = s3.Object(self.bucket, self.key)
            encodedpdf = obj.get()['Body'].read()
            pdfFile = PdfReader(BytesIO(encodedpdf))
            # read pdf
            raw_text = []
            for page in pdfFile.pages:
                raw_text.append(page.extract_text())
            return '\n'.join(raw_text)
        except s3.meta.client.exceptions.NoSuchBucket as exception:
            logger.exception('NoSuchBucket')
            return ""
        except s3.meta.client.exceptions.NoSuchKey as exception:
            logger.exception('NoSuchKey')
            return ""
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
