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
import boto3
from PyPDF2 import PdfReader

from aws_lambda_powertools import Logger, Tracer
from s3inmemoryloader import S3FileLoaderInMemory

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

#s3 = boto3.resource('s3')

@tracer.capture_method
def get_boto3_config(solution_identifier):
        logger.info("solution_identifier :: "+solution_identifier)
        user_agent_extra_param = {"user_agent_extra":solution_identifier}
        config = config.Config(**user_agent_extra_param)
        return config
    
@tracer.capture_method
def get_s3_client(solution_identifier):
    if solution_identifier != 'NA':
        config= get_boto3_config(solution_identifier)
        s3_client = boto3.client('s3', config=config)
        logger.info("s3_client with operational metric ")
    else:
        s3_client = boto3.client('s3')
    return s3_client
     

@tracer.capture_method
def read_file_from_s3(bucket, key,solution_identifier):
    logger.info(f"Fetching file from S3: bucket: {bucket}, key: {key}")
  
    try:
        obj = get_s3_client(solution_identifier).Object(bucket, key)
        return obj.get()["Body"].read().decode("utf-8")
    except Exception as e:
        logger.exception({"An error occured while attempting to read key  " : key })
        return None        

@tracer.capture_method
def check_file_exists(bucket,key,solution_identifier):
    logger.info(f"Checking if file exists: bucket: {bucket}, key: {key}")

    s3_client = get_s3_client(solution_identifier)
    
    try:
        resp = s3_client.head_object(Bucket=bucket, Key=key)
        return True
    except s3_client.exceptions.ClientError as exp:
        if exp.response['Error']['Code'] == '404':
            logger.exception('Object doesn\'t exist')
            return False 
        else:
            logger.exception('An error occured')
            return False


@tracer.capture_method
def get_file_transformation(transformed_asset_bucket,transformed_file_name,
                            input_asset_bucket,original_file_name,solution_identifier):
    
    response = {
        'status':'File transformation Pending',
        'name':original_file_name,
        'summary':''
    }
    if (check_file_exists(transformed_asset_bucket, transformed_file_name) is False):
            logger.info("Starting file transformation")
            loader = S3FileLoaderInMemory(input_asset_bucket, original_file_name)
            document_content = loader.load()
            if not document_content:
                response['status'] = 'Error'
                response['summary'] = 'Not able to transform the file.'
                return response 
            encoded_string = document_content.encode("utf-8")
            get_s3_client(solution_identifier).Bucket(transformed_asset_bucket).put_object(Key=transformed_file_name, Body=encoded_string)
            response['status'] = 'File transformed'
            response['name'] = transformed_file_name
            response['summary']=''
    else:   
            logger.info("File already exists,skip transformation.")
            
    return response
