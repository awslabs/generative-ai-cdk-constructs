from typing import Dict
import boto3
from PyPDF2 import PdfReader

from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")

@tracer.capture_method
def read_file_from_s3(bucket, key):
    logger.info(f"Fetching file from S3: bucket: {bucket}, key: {key}")
    try:
        s3 = boto3.resource("s3")
        obj = s3.Object(bucket, key)
        return obj.get()["Body"].read().decode("utf-8")
    except Exception as e:
        logger.exception({"An error occured while attempting to read key  " : key })
        return None        

