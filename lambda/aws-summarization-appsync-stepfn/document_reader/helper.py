from typing import Dict
import boto3
from PyPDF2 import PdfReader

from aws_lambda_powertools import Logger, Tracer
from s3inmemoryloader import S3FileLoaderInMemory

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

s3 = boto3.resource('s3')

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
    s3_client = boto3.client('s3')
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
                            input_asset_bucket,original_file_name):
    response = {
        'status':'File transformation Pending',
        'name':original_file_name,
    }
    if (check_file_exists(transformed_asset_bucket, transformed_file_name) == False):
            loader = S3FileLoaderInMemory(input_asset_bucket, original_file_name)
            document_content = loader.load()
            if not document_content:
                response['status'] = 'Error'
                response['name'] = ''
                return response 
            encoded_string = document_content.encode("utf-8")
            s3.Bucket(transformed_asset_bucket).put_object(Key=transformed_file_name, Body=encoded_string)
            response['status'] = 'File transformed'
            response['name'] = transformed_file_name
    else:
            response['status'] = 'File already exists'
            
    return response
