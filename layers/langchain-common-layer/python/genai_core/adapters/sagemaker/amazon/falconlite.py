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
from langchain.prompts.prompt import PromptTemplate

from ...base import ModelAdapter
from ...registry import registry


class FalconLiteContentHandler(LLMContentHandler):
    content_type = "application/json"
    accepts = "application/json"

    def transform_input(self, prompt, model_kwargs) -> bytes:
        input_str = json.dumps(
            {
                "inputs": prompt,
                "parameters": {
                    "max_new_tokens": model_kwargs.get("max_new_tokens", 512),
                    "do_sample": True,
                    "temperature": model_kwargs.get("temperature", 0.6),
                    "return_full_text": False,
                    "typical_p": 0.2,
                    "use_cache": True,
                    "seed": 1,
                },
            }
        )
        return input_str.encode("utf-8")

    def transform_output(self, output: bytes):
        response_json = json.loads(output.read().decode("utf-8"))
        return response_json[0]["generated_text"]


content_handler = FalconLiteContentHandler()


class SMFalconLiteAdapter(ModelAdapter):
    def __init__(self, model_id, **kwargs):
        self.model_id = model_id

        super().__init__(**kwargs)

    def get_llm(self, model_kwargs={}):
        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "maxTokens" in model_kwargs:
            params["max_new_tokens"] = model_kwargs["maxTokens"]

        return SagemakerEndpoint(
            endpoint_name=self.model_id,
            region_name=os.environ["AWS_REGION"],
            content_handler=content_handler,
            model_kwargs=params,
            callbacks=[self.callback_handler],
        )

    def get_prompt(self):
        template = """<|prompter|>Our current conversation: {chat_history}

        {input}<|endoftext|><|assistant|>"""

        input_variables = ["input", "chat_history"]
        prompt_template_args = {
            "chat_history": "{chat_history}",
            "input_variables": input_variables,
            "template": template,
        }
        prompt_template = PromptTemplate(**prompt_template_args)

        return prompt_template


# Register the adapter
registry.register(r"(?i)sagemaker\.amazon-FalconLite*", SMFalconLiteAdapter)
