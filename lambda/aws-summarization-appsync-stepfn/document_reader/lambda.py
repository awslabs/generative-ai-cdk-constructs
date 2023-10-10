import os
from helper import read_file_from_s3
import redis
from jproperties import Properties
import os.path as path


from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="SUMMARY_DOCUMENT_READER")
tracer = Tracer(service="SUMMARY_DOCUMENT_READER")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_DOCUMENT_READER")

transformed_bucket_name = os.environ["ASSETBUCKETNAME"]
# TODO: for local dev
#transformed_bucket_name = 'processed-assets-bucket-dev-383119320704'
configs = Properties()
#property_file= path.join(path.dirname(path.abspath(__file__)),"../app.properties")
with open('app.properties', 'rb') as config_file:
    configs.load(config_file)


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext):
    
    print(f"{event=}")

    file_name = event["name"]
    job_id = event["jobid"]

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)
    
    filesummary = get_summary_from_cache(file_name)
    transformed_file_name = file_name.replace(".pdf", "_transformed.txt")

    response = {
        "isTokenLimitBreached": False,
        "isSummaryAvailable": False,
        "summary": "",
        "summaryjobid": job_id,
        "filename": file_name,
        "status": "Pending",
        "suggestedchunksize": 4096,
        "key": "",
        "bucket": "",
        "errorcode":"",
        "errormessage":""
    }

    if filesummary is not None:
        metrics.add_metric(name="summary_from_cache", unit=MetricUnit.Count, value=1)
        response.update(
            {
                "isSummaryAvailable": True,
                "summary": filesummary,
                "status": "Completed",
            }
        )
    else:
        pdf_transformed_file = read_file_from_s3(transformed_bucket_name, transformed_file_name)
        if not pdf_transformed_file:
            response.update(
                {
                    "summary": f"No file {transformed_file_name} available to generate the summary.",
                    "status": "Error",
                    "errorcode":configs.get("FILE_NOT_PRESENT_ERROR_CODE").data,
                    "errormessage":configs.get("FILE_NOT_PRESENT_ERROR").data
                }
            )
            logger.exception({"No file {transformed_file_name} available to generate the summary."})
            return response
      
        response.update(
            {"key": transformed_file_name, "bucket": transformed_bucket_name}
        )

    logger.info({"S3 reader response:": response})
    return response


def get_summary_from_cache(file_name):

    logger.info({"Searching Redis for cached summary file: "+file_name})
    redis_host = os.environ.get("REDISHOST", "N/A")
    redis_port = os.environ.get("REDISPORT", "N/A")
    
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

# TODO-REMOVE BEFORE CHECK IN
# input= {
#     'status': 'Supported',
#     'name': 'light_speed.pdf',
#     'jobid': '1234'
#     }

# handler(input,LambdaContext)
