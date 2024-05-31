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
from typing import Dict
from aiohttp import ClientError
import boto3
from pypdf import PdfReader
import tempfile
import os

from aws_lambda_powertools import Logger, Tracer
from s3inmemoryloader import S3FileLoaderInMemory

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

s3 = boto3.resource('s3')
rekognition_client=boto3.client('rekognition')

s3_client = boto3.client('s3')

@tracer.capture_method
def read_file_from_s3(bucket, key):
    logger.info(f"Fetching file from S3: bucket: {bucket}, key: {key}")
    try:
        obj = s3.Object(bucket, key)
        return obj.get()["Body"].read().decode("utf-8")
    except Exception as e:
        logger.exception({"An error occured while attempting to read key  " : key })
        return None        

@tracer.capture_method
def check_file_exists(bucket,key):
    logger.info(f"Checking if file exists: bucket: {bucket}, key: {key}")
    s3_client = boto3.client('s3')
    try:
        resp = s3_client.head_object(Bucket=bucket, Key=key)
        return True
    except s3_client.exceptions.ClientError as exp:
        if exp.response['Error']['Code'] == '404':
            logger.info('Object doesn\'t already exist in tranformed bucket, processing it now.. ')
            return False 
        else:
            logger.exception('Object doesn\'t already exist in tranformed bucket, processing it now..')
            return False


@tracer.capture_method
def get_file_transformation(transformed_asset_bucket,transformed_file_name,
                            input_asset_bucket,original_file_name):
    
    response = {
        'status':'File transformation Pending',
        'name':original_file_name,
        'summary':''
    }
    if (check_file_exists(transformed_asset_bucket, transformed_file_name) is False):
            logger.info("Starting file transformation")
            if(original_file_name.endswith('.pdf')):
                loader = S3FileLoaderInMemory(input_asset_bucket, original_file_name)
                document_content = loader.load()
                if not document_content:
                    response['status'] = 'Error'
                    response['summary'] = 'Not able to transform the file.'
                    return response 
                encoded_string = document_content.encode("utf-8")
                s3.Bucket(transformed_asset_bucket).put_object(Key=transformed_file_name, Body=encoded_string)
                response['status'] = 'File transformed'
                response['name'] = transformed_file_name
                response['summary']=''
            else:
                input_file= download_file(input_asset_bucket,original_file_name)
                with open(input_file, "rb") as img_file:
                    image_bytes = {"Bytes": img_file.read()}
                if(moderate_image(image_bytes) is False):
                     logger.info("Upload image to processed assets bucket")
                     s3_client.copy_object(Bucket=transformed_asset_bucket, 
                                           Key=original_file_name, 
                                           CopySource=input_asset_bucket+'/'+original_file_name
                                            )
                     response['status'] = 'File transformed'
                     response['name'] = original_file_name
                     response['summary']=''
                 
    else:   
            logger.info("File already exists,skip transformation.")           
    return response

def download_file(bucket,key )-> str:
        try: 
            file_path = os.path.join(tempfile.gettempdir(), os.path.basename(key))
            s3_client.download_file(bucket, key,file_path)
            logger.info(f"file downloaded {file_path}")
            return file_path
        except ClientError as client_err:
            logger.error(f"Couldn\'t download file {key}/{file_path} from {bucket}: {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            logger.error(f"Couldn\'t download file {key}/{file_path} from {bucket}: {exp}")


def moderate_image(image_bytes)-> str:
        isToxicImage = False
        try: 
            rekognition_response = rekognition_client.detect_moderation_labels(
                            Image=image_bytes)
            print(rekognition_response)
            for label in rekognition_response['ModerationLabels']:
                    if(label['Confidence'] > 0.60):
                            isToxicImage=True
                            print(f'Image failed moderation check, exit image uploading')
                            break  
        except Exception as exp:
            print(f"Couldn't analyze image: {exp}")  
        
        return isToxicImage