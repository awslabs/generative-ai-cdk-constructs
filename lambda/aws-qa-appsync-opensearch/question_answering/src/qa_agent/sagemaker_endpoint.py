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
from langchain.llms.sagemaker_endpoint import LLMContentHandler, SagemakerEndpoint
from aws_lambda_powertools import Logger, Tracer, Metrics
logger = Logger(service="QUESTION_ANSWERING")



class ContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt, model_kwargs) -> bytes:
        input_str = json.dumps({"inputs": prompt, "parameters": model_kwargs})
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes) -> str:
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json[0]["generated_text"]


content_handler = ContentHandler()

class MultiModal():

    parameters = {
        "do_sample": True,
        "top_p": 0.2,
        "temperature": 0.4,
        "top_k": 50,
        "max_new_tokens": 512,
        "stop": ["User:","<end_of_utterance>"]
     }


    @classmethod
    def sagemakerendpoint_llm(self,model_id):
            try: 
                endpoint= SagemakerEndpoint(
                endpoint_name=model_id,
                region_name=os.environ["AWS_REGION"],
                model_kwargs=self.parameters,
                content_handler=content_handler,
                )
                return endpoint
            except Exception as err:
                logger.error(f' Error when accessing sagemaker endpoint :: {model_id} , returning...')
                return None
        
            


   