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
    def __init__(self, session_id, user_id, model_kwargs={}, adapter_kwargs={}):
        self.session_id = session_id
        self.user_id = user_id
        self._mode = adapter_kwargs.get("mode", "qa_chain")
        self.model_kwargs = model_kwargs

        self.callback_handler = BaseCallbackHandler()
        self.__bind_callbacks()

        history_enabled = adapter_kwargs.get("chat_history", False)
        if (history_enabled == True):
            self.chat_history = self.get_chat_history()
        else:
            self.chat_history = None
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

    def get_chat_history(self):
        raise ValueError("get_chat_history must be implemented")

    def get_memory(self, output_key=None):
        return ConversationBufferMemory(
            memory_key="chat_history",
            chat_memory=self.chat_history,
            return_messages=True,
            output_key=output_key,
        )
    
    def get_prompt_no_history(self):
        template = """\n\nHuman: {context}
        Answer from this text: {question}
        \n\nAssistant:"""
        prompt_template = PromptTemplate(template=template, input_variables=["context", "question"])

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

    def run_with_chain(self, user_prompt, workspace_id=None):
        if not self.llm:
            raise ValueError("llm must be set")

        if workspace_id:
            conversation = ConversationalRetrievalChain.from_llm(
                self.llm,
                condense_question_prompt=self.get_condense_question_prompt(),
                combine_docs_chain_kwargs={"prompt": self.get_qa_prompt()},
                return_source_documents=True,
                memory=self.get_memory(output_key="answer"),
                verbose=True,
                callbacks=[self.callback_handler],
            )
            result = conversation({"question": user_prompt})
            print(result["source_documents"])
            documents = [
                {
                    "page_content": doc.page_content,
                    "metadata": doc.metadata,
                }
                for doc in result["source_documents"]
            ]

            metadata = {
                "modelId": self.model_id,
                "modelKwargs": self.model_kwargs,
                "mode": self._mode,
                "sessionId": self.session_id,
                "userId": self.user_id,
                "workspaceId": workspace_id,
                "documents": documents,
            }

            self.chat_history.add_metadata(metadata)

            return {
                "sessionId": self.session_id,
                "type": "text",
                "content": result["answer"],
                "metadata": metadata,
            }

        if self.chat_history != None:
            conversation = ConversationChain(
                llm=self.llm,
                prompt=self.get_prompt(),
                memory=self.get_memory(),
                verbose=True,
            )
            answer = conversation.predict(
                input=user_prompt, callbacks=[self.callback_handler]
            )

            metadata = {
                "modelId": self.model_id,
                "modelKwargs": self.model_kwargs,
                "mode": self._mode,
                "sessionId": self.session_id,
                "userId": self.user_id,
                "documents": [],
            }

            self.chat_history.add_metadata(metadata)

            return {
                "sessionId": self.session_id,
                "type": "text",
                "content": answer,
                "metadata": metadata,
            }
        
        chain = LLMChain(llm=self.llm, prompt=self.get_prompt_no_history(), verbose=True)
        try:
            response = chain.predict(context='', question=user_prompt, callbacks=[self.callback_handler])
            raise PredictionException("claude")
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

    def run(self, prompt, workspace_id=None, *args, **kwargs):
        print(f"run with {kwargs}")
        print(f"workspace_id {workspace_id}")
        print(f"mode: {self._mode}")

        if self._mode == "qa_chain":
            return self.run_with_chain(prompt, workspace_id)

        raise ValueError(f"unknown mode {self._mode}")
