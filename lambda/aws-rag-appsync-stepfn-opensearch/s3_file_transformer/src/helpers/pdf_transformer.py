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
import boto3
from io import BytesIO
from typing import List
from PyPDF2 import PdfReader
from langchain.document_loaders.base import BaseLoader

from aws_lambda_powertools import Logger, Tracer



logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")

@tracer.capture_method
class pdf_transformer(BaseLoader):
    """Transforming logic for pdf documents from s3 ."""

    def __init__(self, bucket: str, key: str):
        """Initialize with bucket and key name."""
        self.bucket = bucket
        self.key = key

    def load(self) -> str:
        """Load documents."""
        try:
            s3 = boto3.resource('s3')
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
        