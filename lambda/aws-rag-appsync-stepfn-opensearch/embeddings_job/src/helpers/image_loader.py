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
import json
import os
from typing import List
from aiohttp import ClientError

from aws_lambda_powertools import Logger, Tracer
#from langchain_community.document_loaders.image import UnstructuredImageLoader
from langchain.docstore.document import Document

import boto3

s3 = boto3.client('s3')

logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")

@tracer.capture_method
class image_loader():
    """Loading logic for pdf documents from s3 ."""

    def __init__(self, bucket: str, image_file: str,image_detail_file: str):
        """Initialize with bucket and key name."""
        self.bucket = bucket
        self.image_file = image_file
        self.image_detail_file = image_detail_file
       

    
    @tracer.capture_method
    def load(self):
        """Load documents."""
        try:
            local_file_path = self.download_file(self.image_file)
            print(f"file downloaded :: {local_file_path}")
            
            with open(f"{local_file_path}", "rb") as image_file:
                input_image = base64.b64encode(image_file.read()).decode("utf8")
            
            s3 = boto3.resource('s3')
            obj = s3.Object(self.bucket, self.image_detail_file)
            raw_text = obj.get()['Body'].read().decode('utf-8') 

            metadata = {"source": self.image_file}

            docs = json.dumps({
                    "inputImage": input_image,
                    #"inputText": raw_text,
                               })
            #print(f'docs for titan embeddings {docs}')
            return [Document(page_content=docs, metadata=metadata)]
            
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
        
    @tracer.capture_method
    def get_presigned_url(self) -> str:
        try:
             url = s3.generate_presigned_url(
                ClientMethod='get_object', 
                Params={'Bucket': self.bucket, 'Key': self.image_file},
                ExpiresIn=900
                )
             print(f"presigned url generated for {self.image_file} from {self.bucket}")
             return url
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
        
    @tracer.capture_method
    def download_file(self,key )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(key)
            s3.download_file(self.bucket, key,file_path)
            print(f"file downloaded {file_path}")
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")

    @tracer.capture_method
    def prepare_document_for_direct_load(self)->any:
            local_file_path = self.download_file(self.image_file)
            print(f" prepare os_document")
            
            with open(f"{local_file_path}", "rb") as image_file:
                input_image = base64.b64encode(image_file.read()).decode("utf8")
            
            s3 = boto3.resource('s3')
            obj = s3.Object(self.bucket, self.image_detail_file)
            raw_text = obj.get()['Body'].read().decode('utf-8') 

            metadata = {"source": self.image_file}

            docs = json.dumps({
                    "inputImage": input_image,
                    #"inputText": raw_text,
                               })
            
            os_document = {
                "image_words": raw_text,
                "image_vector": input_image,
            }
            print (f'os_document prepared ')
            return os_document