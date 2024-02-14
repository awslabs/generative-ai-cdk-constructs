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

from langchain.document_loaders.base import BaseLoader
from helpers.s3inmemoryloader import S3FileLoaderInMemory

from aws_lambda_powertools import Logger, Tracer
from PyPDF2 import PdfReader
from io import BytesIO


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
            # TODO: add transformation logic
            encodedpdf = S3FileLoaderInMemory(self.bucket, self.key).load
            pdfFile = PdfReader(BytesIO(encodedpdf))        
            raw_text = []
            for page in pdfFile.pages:
                raw_text.append(page.extract_text())
            return '\n'.join(raw_text)    
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
        