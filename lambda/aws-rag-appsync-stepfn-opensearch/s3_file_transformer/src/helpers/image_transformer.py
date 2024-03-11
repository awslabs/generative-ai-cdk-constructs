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
import boto3


from PIL import Image
from typing import List
from aws_lambda_powertools import Logger, Tracer



logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")


class image_transformer():
    """Transforming logic for uploaded image from s3 ."""

    def __init__(self, image_bytes, file_name, rekognition_client):
        """Initialize with bucket , key and rekognition_client."""
        self.image_bytes = image_bytes
        self.file_name = file_name
        self.rekognition_client = rekognition_client

    @classmethod
    def from_file(cls, image_file_name, rekognition_client, file_name=None):
        """
        Creates a RekognitionImage object from a local file.

        :param image_file_name: The file name of the image_bytes. The file is opened and its
                                bytes are read.
        :param rekognition_client: A Boto3 Rekognition client.
        :param file_name: The name of the image_bytes. If this is not specified, the
                           file name is used as the image_bytes name.
        :return: The RekognitionImage object, initialized with image_bytes bytes from the
                 file.
        """
        with open(image_file_name, "rb") as img_file:
            image_bytes = {"Bytes": img_file.read()}
        name = image_file_name if file_name is None else file_name
        return cls(image_bytes, name, rekognition_client)
    

    @tracer.capture_method
    def check_moderation(self)-> str:
        isToxicImage = False
        rekognition_response = self.rekognition_client.detect_moderation_labels(
                         Image=self.image_bytes)
        print('lables detected!')
        print(rekognition_response)
        for label in rekognition_response['ModerationLabels']:
                if(label['Confidence'] > 0.60):
                        isToxicImage=True
                        print(f'Image failed moderation check, exit image uploading')
                        break   

        return isToxicImage
    
    @tracer.capture_method
    def detect_image_lables(self)-> str:
        try:
            labels=''
            response = self.rekognition_client.detect_labels(Image=self.image_bytes,MaxLabels=20 )       
            for label in response['Labels']:
                name = label['Name']
                if(label['Confidence'] > 0.80):
                    labels = labels + label['Name'] + ","
        except Exception as exp:
            print(f"Couldn't analyze image: {exp}")
        return labels
    
   
    @tracer.capture_method
    def recognize_celebrities(self)-> str:
        try:
            celebrities=[]
            response = self.rekognition_client.recognize_celebrities(Image=self.image_bytes)
            print(f'Detected faces for :: { response}')
            for celebrity in response['CelebrityFaces']:
                celebrities.append(celebrity['Name'])
        except Exception as exp:
            print(f"Couldn't analyze image: {exp}")
            
        return celebrities

    @tracer.capture_method
    def image_resize(self)-> str:
        width = 2048
        height = 2048 

        print(f'self.image {self.image_bytes} ')
        
        Image.MAX_IMAGE_PIXELS = 100000000
        fileshort = os.path.basename(self.file_name)


        file_tmp = os.path.join(tempfile.gettempdir(), os.path.basename(self.file_name)) 

        with Image.open(file_tmp) as image:
                image.verify()
        with Image.open(file_tmp) as image:  
        
            if image.format in ["JPEG","JPG", "PNG"]:
                file_type = image.format.lower()
                path = image.filename.rsplit(".", 1)[0]

                image.thumbnail((width, height))
                image.save(f"{path}-resized.{file_type}")

                fileshort = os.path.basename(path)
                print(f"file resized ")
                
            else:
                raise Exception("Unsupported image format")
            
        return f"{fileshort}-resized.{file_type}"