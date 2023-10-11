
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from update_summary_status import updateSummaryJobStatus

logger = Logger(service="SUMMARY_VALIDATE_INPUT_JOB")
tracer = Tracer(service="SUMMARY_VALIDATE_INPUT_JOB")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_INPUT_VALIDATION")


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
     summary_input = event["detail"]["summaryInput"]
     job_id = summary_input['summaryjobid']

     # Add a correlationId (tracking code).
     logger.set_correlation_id(job_id)
     metrics.add_metadata(key='correlationId', value=job_id)
     tracer.put_annotation(key="correlationId", value=job_id)

     input_files = summary_input['files']

     response = process_files(input_files)

     updateSummaryJobStatus({'jobid': job_id, 'files': response['files']})

     response_transformed = add_job_id_to_response(response, job_id)
    
     logger.info({"response": response_transformed})
     return response_transformed
       

@tracer.capture_method
def process_files(input_files):
    files_to_process = []
    valid = True
    for i in range(len(input_files)):
        filename = input_files[i]['name']
        status = "Unsupported"
        if filename.lower().endswith(('.pdf')):
            status = "Supported"
            metrics.add_metric(name="SupportedFile", unit=MetricUnit.Count, value=1)
        else:
            logger.info("file {filename} extension is currently not supported")
            metrics.add_metric(name="UnsupportedFile", unit=MetricUnit.Count, value=1)
        file_to_process = {
            'status':status,
            'name':filename,
            'summary':''
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
def add_job_id_to_response(response, job_id):
    for file in response['files']:
        file['jobid'] = job_id
    return response