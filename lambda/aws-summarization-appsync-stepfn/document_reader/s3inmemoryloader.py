"""Loading logic for loading documents in memory from an s3 file."""
from typing import List
from io import BytesIO
from langchain.docstore.document import Document
from langchain.document_loaders.base import BaseLoader
from langchain.docstore.document import Document
from langchain.text_splitter import NLTKTextSplitter
from PyPDF2 import PdfReader
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
            obj = s3.Object(self.bucket, self.key)
            encodedpdf = obj.get()['Body'].read()
            pdfFile = PdfReader(BytesIO(encodedpdf))
        except s3.meta.client.exceptions.NoSuchBucket as exception:
            logger.exception('NoSuchBucket')
            return ""
        except s3.meta.client.exceptions.NoSuchKey as exception:
            logger.exception('NoSuchKey')
            return ""
        # read pdf
        raw_text = []
        for page in pdfFile.pages:
            raw_text.append(page.extract_text())
        return '\n'.join(raw_text)
