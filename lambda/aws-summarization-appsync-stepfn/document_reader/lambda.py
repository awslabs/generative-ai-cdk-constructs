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
from helper import check_file_exists,get_file_transformation

from update_summary_status import updateSummaryJobStatus
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_DOCUMENT_READER")

transformed_bucket_name = os.environ["TRANSFORMED_ASSET_BUCKET"]
input_bucket_name = os.environ["INPUT_ASSET_BUCKET"]
is_file_tranformation_required = os.environ["IS_FILE_TRANSFORMED"]


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext):
      
    logger.info(f"{event=}")
    
    original_file_name = event["name"]
    job_id = event["jobid"] 
    summary_model = event["summary_model"] 
    language = event["language"]  
    response = {
        "summary_job_id": job_id,
        "file_name": original_file_name,
        "status": "Working on generating the summary",
        "summary": "",
        "transformed_file_name":'',
        "summary_model": summary_model,
        "language": language,
    }

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)
    
    
    metrics.add_metric(name="summary_llm_hit", unit=MetricUnit.Count, value=1)
    transformed_file_name = original_file_name.replace(".pdf", ".txt")
        
    if(is_file_tranformation_required):
             logger.info("File transformation required")
             transformed_file  = get_file_transformation(transformed_bucket_name, 
                                                         transformed_file_name,
                                                         input_bucket_name,
                                                         original_file_name)
             response.update(
                {
                  "file_name": original_file_name, 
                  "status": transformed_file['status'], 
                  "summary": transformed_file['summary'],
                  "transformed_file_name":transformed_file_name,
                }
            )
    else:
        pdf_transformed_file = check_file_exists(transformed_bucket_name,
                                                      transformed_file_name)
        if pdf_transformed_file is False:
                response.update(
                    {
                     "file_name": original_file_name, 
                     "status": "Error",
                     "summary": f"Error occured. No file {transformed_file_name} available to generate the summary."   
                    }
                )
                logger.exception({"No file {transformed_file_name} available to generate the summary."})
            

    logger.info({"document reader response:::": response})
    updateSummaryJobStatus({'summary_job_id': job_id,
                            'status':response["status"],
                            'name':response['file_name'] , 
                            'summary':response["summary"] })
    return response
