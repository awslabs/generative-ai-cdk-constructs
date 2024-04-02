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
from update_file_status import updateFileStatus

logger = Logger(service="SUMMARY_VALIDATE_INPUT_JOB")
tracer = Tracer(service="SUMMARY_VALIDATE_INPUT_JOB")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_INPUT_VALIDATION")


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
     summary_input = event["detail"]["summaryInput"]
     job_id = summary_input['summary_job_id']
     
     
     # Add a correlationId (tracking code).
     logger.set_correlation_id(job_id)
     metrics.add_metadata(key='correlationId', value=job_id)
     tracer.put_annotation(key="correlationId", value=job_id)

     input_files = summary_input['files']
     


     response = process_files(input_files,job_id)
     
     response_transformed = append_job_info(response, summary_input)
    
     logger.info({"response": response_transformed})
     return response_transformed
       

@tracer.capture_method
def process_files(input_files,job_id):
    files_list = []
    files_to_process = []
    files_to_reject = []
    valid = True

    for i in range(len(input_files)):
        filename = input_files[i]['name']
        file_list = {
                'status':"Pending",
                'name':filename  , 
                'summary':""     
            }       
        if isvalid_file_format(filename):
            metrics.add_metric(name="SupportedFile", unit=MetricUnit.Count, value=1)          
            file_list.update({'status':'Supported'})
        else:
            file_list.update({'status':"Error"})
            file_list.update({'summary':"Invalid file format"})
            logger.info(f"file {filename} extension is currently not supported, skipping this file from summary generation")
            metrics.add_metric(name="UnsupportedFile", unit=MetricUnit.Count, value=1)
        
        status_variables = {
        "summary_job_id": job_id,
        "name": filename,
        "status": "Working on generating the summary",
        "summary": '',
        }

        updateFileStatus(status_variables)
        
        files_list.append(file_list)

    for file in files_list:
        if file['status'] == "Error":
            files_to_reject.append(file)
            logger.info({" Rejected file :: file_name":file['name'],"status":file['status']})
        else:
            files_to_process.append(file)
            logger.info({"Valid file :: file_name":file['name'],"status":file['status']})
        

    if not files_to_process:
        valid = False
        logger.info("No valid file to process. Stopping the job.")
    
    response = {
        'isValid':valid,
        'files':files_to_process
    }

    return response

@tracer.capture_method
def append_job_info(response, summary_input):
    """
    Append job ID , ignore_existing flag,summary_model 
    and language to each file in the provided response
    """
    language = summary_input['language']
    summary_model = summary_input['summary_model']
    job_id= summary_input['summary_job_id']
    ignore_existing = summary_input.get("ignore_existing", False)

    for file in response['files']:
        file['jobid'] = job_id
        file['ignore_existing'] = ignore_existing
        file['summary_model']=summary_model
        file['language']=language
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