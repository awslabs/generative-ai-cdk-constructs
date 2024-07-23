import os


# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext

logger = Logger(service="QUERY_CONFIG")
tracer = Tracer(service="QUERY_CONFIG")
metrics = Metrics(namespace="textToSql_pipeline", service="QUERY_CONFIG")

db_name = os.environ["DB_NAME"]
metadata_source = os.environ["METADATA_SOURCE"]



@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info("Execute query", event)
    response = {
        'db_name':db_name,
        'metadata_source':metadata_source
    }

    return response
