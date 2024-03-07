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
import boto3


from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from helpers.utils import isvalid_file_format,transform_pdf_document,transform_image_document




logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_FILE_TRANSFORMER")

s3 = boto3.resource('s3')

input_bucket = os.environ['INPUT_BUCKET']
output_bucket = os.environ['OUTPUT_BUCKET']


@tracer.capture_method
def file_exists_in_bucket(bucket_name, object_name,):
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
    modelid = event['modelid']
    ignore_existing = event.get("ignore_existing", False)

    # Add a correlationId (tracking code).
    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)
    
    if event['status'] == "Unsupported":
        return event
    
    response = {
        'status':event['status'],
        'name':event['name'],
        'jobid':job_id,
        'modelid':modelid
    }
   
    
    # verify that the file doesn't already exist in the output bucket, otherwise we will process a duplicate
    file_name = event['name']
    name, extension = os.path.splitext(file_name)
    if (extension =='.pdf'):
        output_file_name= name + '.txt'
    else:
        output_file_name=file_name
    print(f'output file name {output_file_name}')
    if (isvalid_file_format(file_name)):
        #load the file from input S3 bucket and save its content as a txt file in the output bucket
        if (ignore_existing or file_exists_in_bucket(output_bucket, output_file_name) == False):
            response['name'] = output_file_name
            if(extension == '.pdf'):
                response['status'] = transform_pdf_document(input_bucket,file_name,output_bucket,output_file_name)
            elif(extension == '.jpg'or extension == '.jpeg' or extension == '.png' or extension == '.svg'):
                response['status'] = transform_image_document(input_bucket,file_name,output_bucket)
            #TODO add csv, doc, docx file type support as well.
            else:
                response['status'] = 'File Not transformed'            
        else:
            response['status'] = 'File already exists'
            response['name'] = output_file_name
    else:
        response['status'] = 'Unsupported'
        response['name'] = ''
        
    print(f' response :: {response}')
    return response 
        

