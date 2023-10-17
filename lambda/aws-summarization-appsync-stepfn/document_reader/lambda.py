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
import redis

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

    response = {
        "is_summary_available": False,
        "summary_job_id": job_id,
        "file_name": original_file_name,
        "status": "Pending",
        "summary": "",
        "transformed_file_name":'',
    }

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)
    
    filesummary = get_summary_from_cache(original_file_name)
    
    if filesummary is not None:
        metrics.add_metric(name="summary_cache_hit",unit=MetricUnit.Count, value=1)
        response.update(
            {
                "file_name": original_file_name, 
                "status": "Completed", 
                "summary": filesummary,
                "is_summary_available": True,
            }
        )
    else:
        metrics.add_metric(name="summary_llm_hit", unit=MetricUnit.Count, value=1)
        transformed_file_name = original_file_name.replace(".pdf", "_transformed.txt")
        
        if(is_file_tranformation_required):
             transformed_file  = get_file_transformation(transformed_bucket_name, 
                                                         transformed_file_name,
                                                         input_bucket_name,
                                                         original_file_name)
             response.update(
                {
                  "file_name": original_file_name, 
                  "status": transformed_file['status'], 
                  "summary": '',
                  "transformed_file_name":transformed_file_name,
                  "is_summary_available": False  
                }
            )
        else:
             pdf_transformed_file = check_file_exists(transformed_bucket_name,
                                                      transformed_file_name)
             if not pdf_transformed_file:
                response.update(
                    {
                     "file_name": original_file_name, 
                     "status": "Error", 
                     "summary": f"No file {transformed_file_name} available to generate the summary.",   
                    }
                )
                logger.exception({"No file {transformed_file_name} available to generate the summary."})
                return response
            

    logger.info({"document reader response:": response})
    updateSummaryJobStatus({'jobid': job_id, 
                            'file_name':response["file_name"]
                            ,'status':response['status']  ,
                            'summary':response["summary"]})
    return response

@tracer.capture_method
def get_summary_from_cache(file_name):

    logger.info({"Searching Redis for cached summary file: "+file_name})
    redis_host = os.environ.get("REDIS_HOST", "N/A")
    redis_port = os.environ.get("REDIS_PORT", "N/A")
    
    logger.info({"Redis host: "+redis_host})
    logger.info({"Redis port: "+redis_port})

    try:
        redis_client = redis.Redis(host=redis_host, port=redis_port)
        fileSummary = redis_client.get(file_name)
    except (ValueError, redis.ConnectionError) as e:
        logger.exception({"An error occured while connecting to Redis" : e})
        return

    if fileSummary:
        logger.info({"File summary found in cache: ": fileSummary})
        return fileSummary.decode()


    logger.info("File summary not found in cache, generating it from llm")

