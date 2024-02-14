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
import boto3
import os
from aws_lambda_powertools import Logger, Tracer
from PIL import Image



logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")


class image_transformer():
    """Transforming logic for uploaded image from s3 ."""

    def __init__(self, image, image_name, rekognition_client):
        """Initialize with bucket , key and rekognition_client."""
        self.image = image
        self.image_name = image_name
        self.rekognition_client = rekognition_client

    @classmethod
    def from_file(cls, image_file_name, rekognition_client, image_name=None):
        """
        Creates a RekognitionImage object from a local file.

        :param image_file_name: The file name of the image. The file is opened and its
                                bytes are read.
        :param rekognition_client: A Boto3 Rekognition client.
        :param image_name: The name of the image. If this is not specified, the
                           file name is used as the image name.
        :return: The RekognitionImage object, initialized with image bytes from the
                 file.
        """
        with open(image_file_name, "rb") as img_file:
            image = {"Bytes": img_file.read()}
        name = image_file_name if image_name is None else image_name
        return cls(image, name, rekognition_client)
    
    @tracer.capture_method
    def load(self) -> str:
        """Load documents."""
        try:
            # TODO add transformation logic
            print(f"No transformation logic implemented, copy the file {self.key} to processed bucket")        
        except Exception as exception:
            logger.exception(f"Reason: {exception}")
            return ""
        

    @tracer.capture_method
    def check_moderation(self)-> str:
        isToxicImage = False
        rekognition_response = self.rekognition_client.detect_moderation_labels(
                         Image=self.image)
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
            response = self.rekognition_client.detect_labels(Image=self.image,MaxLabels=20 )       
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
            response = self.rekognition_client.recognize_celebrities(Image=self.image)
            print(f'Detected faces for :: { response}')
            for celebrity in response['CelebrityFaces']:
                celebrities.append(celebrity['Name'])
            # for face in response['UnrecognizedFaces']:
            #     celebrities.append(face['UnrecognizedFaces'])
            
        except Exception as exp:
            print(f"Couldn't analyze image: {exp}")
            
        return celebrities

    @tracer.capture_method
    def image_resize(self)-> str:
        width = 2048
        height = 2048 

        print(f'self.image {self.image} ')
        
        Image.MAX_IMAGE_PIXELS = 100000000
        fileshort = os.path.basename(self.image_name)

        print(f'fileshort {fileshort} ')
        file_tmp = "/tmp/" + fileshort
        
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