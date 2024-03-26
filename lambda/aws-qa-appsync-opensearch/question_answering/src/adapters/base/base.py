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
import os
from langchain.callbacks.base import BaseCallbackHandler
from langchain.prompts.prompt import PromptTemplate


class ModelAdapter:
    def __init__(self, callback=None, modality='Text', model_kwargs={}, streaming=False):
        self.model_kwargs = model_kwargs
        self.modality = modality
        self.streaming = streaming

        self.callback_handler = callback

        self.llm = self.get_llm(model_kwargs)

    def get_llm(self, model_kwargs={}):
        raise ValueError("llm must be implemented")

    def get_embeddings_model(self, model_kwargs={}):
        raise ValueError("embeddings must be implemented")

    def get_prompt(self):

        template = """

        The following pieces of context to answer the question at the end. If you don't know the answer, just say that you don't know, don't try to make up an answer.

        {context}

        Question: {question}"""

        prompt_template = PromptTemplate(template=template, input_variables=["context", "question"])

        return prompt_template
