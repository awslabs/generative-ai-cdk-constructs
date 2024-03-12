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
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from update_ingestion_status import updateIngestionJobStatus

logger = Logger(service="INGESTION_INPUT_VALIDATION")
tracer = Tracer(service="INGESTION_INPUT_VALIDATION")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_INPUT_VALIDATION")

@tracer.capture_method
def process_files(input_files):
    files_to_process = []
    valid = True
    for i in range(len(input_files)):
        filename = input_files[i]['name']
        status = "Unsupported"
        if isvalid_file_format(filename):
            status = "Supported"
            metrics.add_metric(name="SupportedFile", unit=MetricUnit.Count, value=1)
        else:
            logger.info("file {filename} extension is currently not supported")
            metrics.add_metric(name="UnsupportedFile", unit=MetricUnit.Count, value=1)
        file_to_process = {
            'status':status,
            'name':filename
        }
        files_to_process.append(file_to_process)

    if not files_to_process:
        valid = False

    response = {
        'isValid':valid,
        'files':files_to_process
    }

    return response

@tracer.capture_method
def append_job_info(response, job_id, ignore_existing,modelid):
    """
    Append job ID and ignore_existing flag to 
    each file in the provided response
    """
    for file in response['files']:
        file['jobid'] = job_id
        file['ignore_existing'] = ignore_existing
        file['modelid']=modelid
    return response

@tracer.capture_method
def isvalid_file_format(file_name: str) -> bool:
    file_format = ['.pdf','.txt','.jpg','.jpeg','.png','.svg']
    if file_name.endswith(tuple(file_format)):
        print(f'valid file format :: {file_format}')
        return True
    else:
        print(f'Invalid file format :: {file_format}')
        return False


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event,  context: LambdaContext) -> dict:
    
    ingestion_input = event['detail']['ingestioninput']
    job_id = ingestion_input['ingestionjobid']
    ignore_existing = ingestion_input.get("ignore_existing", False)

    # Add a correlationId (tracking code).
    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    input_files = ingestion_input['files']
    embeddings_model = ingestion_input['embeddings_model']
    print(f'embeddings_model :: {embeddings_model}')
    modelid = embeddings_model['modelId']
    print(f'modelid :: {modelid}')
    
    response = process_files(input_files)

    updateIngestionJobStatus({'jobid': job_id, 'files': response['files']})

    response_transformed = append_job_info(response, job_id, ignore_existing,modelid)
    
    logger.info({"response": response_transformed})
    return response_transformed