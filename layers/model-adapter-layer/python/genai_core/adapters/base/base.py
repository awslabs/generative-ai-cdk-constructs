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
from enum import Enum
from langchain import LLMChain
from langchain.callbacks.base import BaseCallbackHandler
from langchain.chains import ConversationalRetrievalChain, ConversationChain
from langchain.memory import ConversationBufferMemory
from langchain.prompts.prompt import PromptTemplate
from langchain.chains.conversational_retrieval.prompts import (
    QA_PROMPT,
    CONDENSE_QUESTION_PROMPT,
)
from genai_core.utils import PredictionException


class Mode(Enum):
    CHAIN = "qa_chain"


class ModelAdapter:
    def __init__(self, session_id=None, user_id=None, model_kwargs={}, adapter_kwargs={}):
        self.session_id = session_id
        self.user_id = user_id
        self._mode = adapter_kwargs.get("mode", "qa_chain")
        self.model_kwargs = model_kwargs

        self.callback_handler = BaseCallbackHandler()
        self.__bind_callbacks()

        self.llm = self.get_llm(model_kwargs)

    def __bind_callbacks(self):
        callback_methods = [method for method in dir(self) if method.startswith("on_")]
        valid_callback_names = [
            attr for attr in dir(self.callback_handler) if attr.startswith("on_")
        ]

        for method in callback_methods:
            if method in valid_callback_names:
                setattr(self.callback_handler, method, getattr(self, method))

    def get_llm(self, model_kwargs={}):
        raise ValueError("llm must be implemented")

    def get_embeddings_model(self, embeddings):
        raise ValueError("embeddings must be implemented")
    
    def get_prompt_no_history_no_context(self):
        template = """The following is a friendly conversation between a human and an AI. If the AI does not know the answer to a question, it truthfully says it does not know.

        Question: {input}"""
        input_variables = ["input"]
        prompt_template_args = {
            "input_variables": input_variables,
            "template": template,
        }
        prompt_template = PromptTemplate(**prompt_template_args)

        return prompt_template

    def get_prompt(self):
        template = """The following is a friendly conversation between a human and an AI. If the AI does not know the answer to a question, it truthfully says it does not know.

        Current conversation:
        {chat_history}

        Question: {input}"""
        input_variables = ["input", "chat_history"]
        prompt_template_args = {
            "chat_history": "{chat_history}",
            "input_variables": input_variables,
            "template": template,
        }
        prompt_template = PromptTemplate(**prompt_template_args)

        return prompt_template

    def get_condense_question_prompt(self):
        return CONDENSE_QUESTION_PROMPT

    def get_qa_prompt(self):
        return QA_PROMPT

    def run_with_chain(self, user_prompt):
        if not self.llm:
            raise ValueError("llm must be set")
        
        chain = LLMChain(llm=self.llm, prompt=self.get_prompt_no_history_no_context(), verbose=True)
        try:
            response = chain.predict(input=user_prompt, callbacks=[self.callback_handler])
            raise PredictionException(self.llm._llm_type)
        except PredictionException as e:
            print(e.message)
            #TODO return response

        metadata = {
                "modelId": self.model_id,
                "modelKwargs": self.model_kwargs,
                "mode": self._mode,
                "sessionId": self.session_id,
                "userId": self.user_id,
                "documents": [],
            }
        
        return {
                "sessionId": self.session_id,
                "type": "text",
                "content": response,
                "metadata": metadata,
            }

    def run(self, prompt, *args, **kwargs):
        print(f"run with {kwargs}")
        print(f"mode: {self._mode}")

        if self._mode == "qa_chain":
            return self.run_with_chain(prompt)

        raise ValueError(f"unknown mode {self._mode}")
