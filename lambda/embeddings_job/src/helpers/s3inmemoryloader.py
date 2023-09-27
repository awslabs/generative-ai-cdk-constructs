"""Loading logic for loading documents in memory from an s3 file."""
from typing import List
from langchain.document_loaders.base import BaseLoader
from langchain.docstore.document import Document

class S3TxtFileLoaderInMemory(BaseLoader):
    """Loading logic for loading documents from s3."""

    def __init__(self, bucket: str, key: str):
        """Initialize with bucket and key name."""
        self.bucket = bucket
        self.key = key

    def load(self) -> List[Document]:
        """Load documents."""
        try:
            import boto3
        except ImportError:
            raise ImportError(
                "Could not import `boto3` python package. "
                "Please install it with `pip install boto3`."
            )
         # read S3
        s3 = boto3.resource('s3')
        obj = s3.Object(self.bucket, self.key)
        raw_text = obj.get()['Body'].read().decode('utf-8') 

        metadata = {"source": self.key}
        return [Document(page_content=raw_text, metadata=metadata)]
