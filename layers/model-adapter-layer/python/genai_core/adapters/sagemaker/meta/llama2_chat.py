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

from ...base import ModelAdapter
from ...registry import registry


class Llama2ChatContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt, model_kwargs) -> bytes:
        input_str = json.dumps(
            {
                "inputs": [
                    [
                        {"role": "user", "content": prompt},
                    ],
                ],
                "parameters": model_kwargs,
            }
        )
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes):
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json[0]["generation"]["content"]


content_handler = Llama2ChatContentHandler()


class SMLlama2ChatAdapter(ModelAdapter):
    def __init__(self, model_id, **kwargs):
        self.model_id = model_id

        super().__init__(**kwargs)

    def get_llm(self, model_kwargs={}):
        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "topP" in model_kwargs:
            params["top_p"] = model_kwargs["topP"]
        if "maxTokens" in model_kwargs:
            params["max_new_tokens"] = model_kwargs["maxTokens"]

        return SagemakerEndpoint(
            endpoint_name=self.model_id,
            region_name=os.environ.get("AWS_REGION"),
            model_kwargs=params,
            endpoint_kwargs={"CustomAttributes": "accept_eula=true"},
            content_handler=content_handler,
            callbacks=[self.callback_handler],
        )


# Register the adapter
registry.register(r"(?i)sagemaker\.meta-LLama.*\d+b.*chat.*", SMLlama2ChatAdapter)
