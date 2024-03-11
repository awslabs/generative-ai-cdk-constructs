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
import tempfile
import time
import base64
import json
import numpy as np

from pathlib import Path
from typing import List
from aiohttp import ClientError




from aws_lambda_powertools import Logger, Tracer
from langchain.docstore.document import Document

import boto3

s3_client = boto3.client('s3')
bedrock_client = boto3.client('bedrock-runtime')

logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")

#@tracer.capture_method
class image_loader():
    """Loading logic for pdf documents from s3 ."""

    def __init__(self, bucket: str, image_file: str,image_detail_file: str,modelid:str):
        """Initialize with bucket and key name."""
        self.bucket = bucket
        self.image_file = image_file
        self.image_detail_file = image_detail_file
        self.modelid=modelid
        print(f"load  image {image_file}, and image txt {image_detail_file} from :: {bucket}")


     # convert each file to base64 and store the base64 in a new file
    def encode_image_to_base64(self,image_file_path,image_file) -> str:
        with open(image_file_path, "rb") as image_file:
            b64_image = base64.b64encode(image_file.read()).decode('utf8')
            b64_image_path = os.path.join(tempfile.gettempdir(), f"{Path(image_file_path).stem}.b64")
            with open(b64_image_path, "wb") as b64_image_file:
                b64_image_file.write(bytes(b64_image, 'utf-8'))
        return b64_image_path
    
    
    def load(self):
        """Load documents."""
        try:
            local_file_path = self.download_file(self.image_file)
           
            b64_image_file_path = self.encode_image_to_base64(local_file_path,self.image_file)
            
            with open(b64_image_file_path, "rb") as b64_image_file:
                input_image_b64 = b64_image_file.read().decode('utf-8')

            
            obj = s3_client.get_object(Bucket=self.bucket, Key=self.image_detail_file)
            raw_text = obj['Body'].read().decode('utf-8') 

            metadata= {
                    "filename": self.image_file,
                    "model_id": self.modelid,                 
                    "source": self.image_file
                        }
            
            docs = json.dumps({
                    "inputImage": input_image_b64,
                    "inputText": raw_text
                    
                      })
            documents= [Document(page_content=docs, metadata=metadata)]
            return documents
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""



    @tracer.capture_method
    def get_presigned_url(self) -> str:
        try:
             url = s3_client.generate_presigned_url(
                ClientMethod='get_object', 
                Params={'Bucket': self.bucket, 'Key': self.image_file},
                ExpiresIn=2700
                )
             print(f"presigned url generated for {self.image_file} from {self.bucket}")
             return url
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
        
    @tracer.capture_method
    def download_file(self,key )-> str:
        try:
            file_path = os.path.join(tempfile.gettempdir(), os.path.basename(key)) 
            s3_client.download_file(self.bucket, key,file_path)
            print(f"file downloaded {file_path}")
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")

    