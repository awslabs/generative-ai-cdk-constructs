import os
import boto3

from aws_lambda_powertools import Logger

logger = Logger(service="GENERATE_PRESIGNED_URL")

s3_client = boto3.client('s3')
S3_BUCKET_NAME = os.environ['S3_BUCKET_NAME']

def generate_presigned_url(bucket_name, object_name, expiration):
    try:
        return s3_client.generate_presigned_url(
            'put_object',
            Params={'Bucket': bucket_name,'Key': object_name},
            ExpiresIn=expiration)
    except Exception as e:
        logger.error(f"Error generating presigned url: {str(e)}")
        return None

def lambda_handler(event, context):
    file_name = event.get('fileName', '')
    expiration = event.get('expiration', 3600)
    if not file_name:
        return {
            'success': False,
            'message': 'FileName is required',
            'fileName': None,
            'url': None,
        }
    try:
        presigned_url = generate_presigned_url(S3_BUCKET_NAME, file_name, expiration)

    except Exception as e:
        logger.error(f"Error generating presigned url: {str(e)}")
        return {
            'success': False,
            'message': 'Error generating presigned URL',
            'fileName': file_name,
            'url': None,
        }

    return {
        'success': True,
        'message': 'Presigned URL generated successfully',
        'fileName': file_name,
        'url': presigned_url,
    }
