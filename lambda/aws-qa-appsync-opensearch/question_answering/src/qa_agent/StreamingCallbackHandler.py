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
from .helper import  send_job_status, JobStatus
from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import LLMResult
import base64
from typing import Any, Dict, List, Union

from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

class StreamingCallbackHandler(BaseCallbackHandler):
    def __init__(self, status_variables: Dict):
        self.status_variables = status_variables
        logger.info("[StreamingCallbackHandler::__init__] Initialized")

    def on_llm_start(self, serialized: Dict[str, Any], prompts: List[str], **kwargs: Any) -> None:
        """Runs when streaming is started."""
        logger.info(f"[StreamingCallbackHandler::on_llm_start] Streaming started!")

    def on_llm_new_token(self, token: str, **kwargs: Any) -> None:
        """Run on new LLM token. Only available when streaming is enabled."""
        try:
            logger.info(f'[StreamingCallbackHandler::on_llm_new_token] token is: {token}')
            llm_answer_bytes = token.encode("utf-8")
            base64_bytes = base64.b64encode(llm_answer_bytes)
            llm_answer_base64_string = base64_bytes.decode("utf-8")

            self.status_variables['jobstatus'] = JobStatus.STREAMING_NEW_TOKEN.status
            self.status_variables['answer'] = llm_answer_base64_string
            send_job_status(self.status_variables)

        except Exception as err:
            logger.exception(err)
            self.status_variables['jobstatus'] = JobStatus.ERROR_PREDICTION.status
            error = JobStatus.ERROR_PREDICTION.get_message()
            self.status_variables['answer'] = error.decode("utf-8")
            send_job_status(self.status_variables)

    def on_llm_end(self, response: LLMResult, **kwargs: Any) -> None:
        """Run when LLM ends running."""
        logger.info(f"[StreamingCallbackHandler::on_llm_end] Streaming ended. Response: {response}")
        try:
            self.status_variables['jobstatus'] = JobStatus.STREAMING_ENDED.status
            self.status_variables['answer'] = ""
            send_job_status(self.status_variables)

        except Exception as err:
            logger.exception(err)
            self.status_variables['jobstatus'] = JobStatus.ERROR_PREDICTION.status
            error = JobStatus.ERROR_PREDICTION.get_message()
            self.status_variables['answer'] = error.decode("utf-8")
            send_job_status(self.status_variables)

    def on_llm_error(self, error: Union[Exception, KeyboardInterrupt], **kwargs: Any) -> None:
        """Run when LLM errors."""
        logger.exception(error)
        self.status_variables['jobstatus'] = JobStatus.ERROR_PREDICTION.status
        error = JobStatus.ERROR_PREDICTION.get_message()
        self.status_variables['answer'] = error.decode("utf-8")
        send_job_status(self.status_variables)