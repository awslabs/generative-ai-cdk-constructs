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
import boto3

from langchain_community.llms import Bedrock
from langchain_community.chat_models import BedrockChat
from langchain.prompts.prompt import PromptTemplate

from ..base import ModelAdapter
from ..registry import registry


class BedrockClaudeAdapter(ModelAdapter):
    def __init__(self, model_id, *args, **kwargs):
        self.model_id = model_id

        super().__init__(*args, **kwargs)

    def get_llm(self, model_kwargs={}):
        bedrock = boto3.client('bedrock-runtime')

        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "top_p" in model_kwargs:
            params["top_p"] = model_kwargs["top_p"]
        if "max_tokens_to_sample" in model_kwargs:
            params["max_tokens_to_sample"] = model_kwargs["max_tokens_to_sample"]
        if "stop_sequences" in model_kwargs:
            params["stop_sequences"] = model_kwargs["stop_sequences"]
        if "top_k" in model_kwargs:
            params["top_k"] = model_kwargs["top_k"]

        params["anthropic_version"] = "bedrock-2023-05-31"

        kwargs = {
            "client": bedrock,
            "model_id": self.model_id,
            "model_kwargs": params,
            "streaming": False 
        }

        if self.callback_handler and self.streaming:
            kwargs["callbacks"] = self.callback_handler
            kwargs["streaming"] = True

        return Bedrock(
            **kwargs
        )

    def get_prompt(self):
        template = """

        Human: Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

        {context}

        Question: {question}

        Assistant:"""

        return PromptTemplate(
            template=template, input_variables=["context", "question"]
        )

# For claude v3, at the moment we need to use BedrockChat
class BedrockClaudev3Adapter(ModelAdapter):
    def __init__(self, model_id, *args, **kwargs):
        self.model_id = model_id

        super().__init__(*args, **kwargs)

    def get_llm(self, model_kwargs={}):
        bedrock = boto3.client('bedrock-runtime')

        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "top_p" in model_kwargs:
            params["top_p"] = model_kwargs["top_p"]
        if "max_tokens" in model_kwargs:
            params["max_tokens"] = model_kwargs["max_tokens"]
        if "stop_sequences" in model_kwargs:
            params["stop_sequences"] = model_kwargs["stop_sequences"]
        if "top_k" in model_kwargs:
            params["top_k"] = model_kwargs["top_k"]

        params["anthropic_version"] = "bedrock-2023-05-31"

        kwargs = {
            "client": bedrock,
            "model_id": self.model_id,
            "model_kwargs": params,
            "streaming": False 
        }

        if self.callback_handler and self.streaming:
            kwargs["callbacks"] = self.callback_handler
            kwargs["streaming"] = True

        return BedrockChat(
            **kwargs
        )

    def get_prompt(self):
        template = """

        Human: Use the following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

        {context}

        Question: {question}

        Assistant:"""

        return PromptTemplate(
            template=template, input_variables=["context", "question"]
        )


# Register the adapter
registry.register(r"^Bedrock.anthropic.claude-v2*", BedrockClaudeAdapter)
registry.register(r"^Bedrock.anthropic.claude-instant*", BedrockClaudeAdapter)
registry.register(r"^Bedrock.anthropic.claude-3*", BedrockClaudev3Adapter)