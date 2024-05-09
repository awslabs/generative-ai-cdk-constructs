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
from langchain.prompts.prompt import PromptTemplate

from langchain_community.llms import Bedrock
from langchain_community.embeddings import BedrockEmbeddings

from ..base import ModelAdapter
from ..registry import registry


class BedrockTitanAdapter(ModelAdapter):
    def __init__(self, model_id, *args, **kwargs):
        self.model_id = model_id

        super().__init__(*args, **kwargs)

    def get_llm(self, model_kwargs={}):
        bedrock = boto3.client('bedrock-runtime')

        params = {}
        if "temperature" in model_kwargs:
            params["temperature"] = model_kwargs["temperature"]
        if "topP" in model_kwargs:
            params["topP"] = model_kwargs["topP"]
        if "maxTokenCount" in model_kwargs:
            params["maxTokenCount"] = model_kwargs["maxTokens"]
        if "stopSequences" in model_kwargs:
            params["stopSequences"] = model_kwargs["stopSequences"]

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
    
    def get_embeddings_model(self, model_kwargs={}):
        bedrock = boto3.client('bedrock-runtime')

        return BedrockEmbeddings(client=bedrock, model_id=self.model_id)

    def get_prompt(self):
        template = """Human: The following is a friendly conversation between a human and an AI. The AI is talkative and provides lots of specific details from its context. If the AI does not know the answer to a question, it truthfully says it does not know.

        {context}

        Question: {question}

        Assistant:"""

        return PromptTemplate(
            template=template, input_variables=["context", "question"]
        )

# Register the adapter
registry.register(r"^Bedrock.amazon.titan-t*", BedrockTitanAdapter)
registry.register(r"^Bedrock.amazon.titan-e*", BedrockTitanAdapter)
registry.register(r"^Bedrock.amazon.titan-p*", BedrockTitanAdapter)
