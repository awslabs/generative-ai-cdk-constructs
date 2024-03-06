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
import json
import os
from typing import Dict
from qa_agent import run_question_answering
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit
from aws_lambda_powertools.utilities.validation import validate, SchemaValidationError

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

#@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event,  context: LambdaContext) -> dict:

    arguments = event['detail']

    job_id = arguments['jobid']

    # Add a correlationId (tracking code).
    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    llm_response = run_question_answering(arguments)

    print(f"llm_response is {llm_response}")
    return llm_response

input ={"detail": {
            "jobid": "111",
            "jobstatus": "",
            "qa_model": {
                "provider": "Bedrock",
                "modelId": "anthropic.claude-3-sonnet-20240229-v1:0",
                "streaming": True,
                "modality": "Image"
            },
            "embeddings_model": {
                "provider": "Bedrock",
                "modelId": "amazon.titan-embed-image-v1",
                "streaming": True
            },
            "retrieval": {
                "max_docs": 1,
                "index_name": "",
                "filter_filename": ""
            },
            "filename": "two_cats.jpeg",
            "presignedurl": "",
            "question": "d2hhdCBhcmUgdGhlIGNhdHMgZG9pbmc/",
            "verbose": False,
            "responseGenerationMethod": "LONG_CONTEXT"
        }
    }

handler(input, None)