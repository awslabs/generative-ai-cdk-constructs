import os
import boto3
from helpers.s3inmemoryloader import S3FileLoaderInMemory
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_FILE_TRANSFORMER")

s3 = boto3.resource('s3')

input_bucket = os.environ['INPUT_BUCKET']
output_bucket = os.environ['OUTPUT_BUCKET']

@tracer.capture_method
def file_exists_in_bucket(bucket_name, object_name):
    s3_client = boto3.client('s3')

    try:
        resp = s3_client.head_object(Bucket=bucket_name, Key=object_name)
        return True
    except s3_client.exceptions.ClientError as e:
        if e.response['Error']['Code'] == '404':
            logger.exception('Object doesn\'t exist')
            return False # object does not exist
        else:
            # Handle Any other type of error
            logger.exception('An error occured')
            print(e)
            return False

@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event,  context: LambdaContext) -> dict:

    job_id = event['jobid']
    # Add a correlationId (tracking code).
    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)
    
    if event['status'] == "Unsupported":
        return event
    
    response = {
        'status':event['status'],
        'name':event['name'],
        'jobid':job_id
    }
    
    # verify that the file doesn't already exist in the output bucket, otherwise we will process a duplicate
    name, extension = os.path.splitext(event['name'])
    output_file_name = name + '_transformed.txt'
    if (file_exists_in_bucket(output_bucket, output_file_name) == False):
        #load the file from input S3 bucket and save its content as a txt file in the output bucket
        if (event['name'].lower().endswith('.pdf')):
            metrics.add_metric(name="pdf", unit=MetricUnit.Count, value=1)
            loader = S3FileLoaderInMemory(input_bucket, event['name'])
            document_content = loader.load()
            if not document_content:
                response['status'] = 'Error'
                response['name'] = ''
                return response 
            encoded_string = document_content.encode("utf-8")
            s3.Bucket(output_bucket).put_object(Key=output_file_name, Body=encoded_string)
            response['status'] = 'File transformed'
            response['name'] = output_file_name
        else:
            response['status'] = 'Duplicate'
            response['name'] = ''
    else:
        response['status'] = 'File already exists'
        response['name'] = output_file_name

    return response 
        