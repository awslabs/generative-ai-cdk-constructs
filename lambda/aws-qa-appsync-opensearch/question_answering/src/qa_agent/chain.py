# all
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
from .helper import load_vector_db_opensearch, send_job_status, JobStatus
from .s3inmemoryloader import S3FileLoaderInMemory
from langchain import PromptTemplate
from langchain.callbacks.base import BaseCallbackHandler
from langchain.schema import LLMResult
from llms import get_llm, get_max_tokens
from langchain import LLMChain

import boto3
import os
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


@tracer.capture_method
def run_question_answering(arguments):
    response_generation_method = arguments.get('responseGenerationMethod', 'LONG_CONTEXT')

    try:
        filename = arguments['filename']
    except:

        filename = ''
        arguments['filename'] = ''

    if not filename:  # user didn't provide a specific file as input, we use the RAG source against the entire knowledge base
        if response_generation_method == 'LONG_CONTEXT':
            error = 'Error: Filename required for LONG_CONTEXT approach, defaulting to RAG.'
            logger.error(error)

        llm_response = run_qa_agent_rag_no_memory(arguments)
        return llm_response

    bucket_name = os.environ['INPUT_BUCKET']

    # select the methodology based on the input size
    document_number_of_tokens = S3FileLoaderInMemory(bucket_name, filename).get_document_tokens()

    if document_number_of_tokens is None:
        logger.exception(
            f'Failed to compute the number of tokens for file {filename} in bucket {bucket_name}, returning')
        error = JobStatus.ERROR_LOAD_INFO.get_message()
        status_variables = {
            'jobstatus': JobStatus.ERROR_LOAD_INFO.status,
            'answer': error.decode("utf-8"),
            'jobid': arguments['jobid'],
            'filename': filename,
            'question': '',
            'sources': ['']
        }
        send_job_status(status_variables)
        return ''

    model_max_tokens = get_max_tokens()
    logger.info(
        f'For the current question, we have a max model length of {model_max_tokens} and a document containing {document_number_of_tokens} tokens')

    if response_generation_method == 'RAG':
        logger.info('Running qa agent with a RAG approach')
        llm_response = run_qa_agent_rag_no_memory(arguments)
    else:
        # LONG CONTEXT
        # why add 500 ? on top of the document content, we add the prompt. So we keep an extra 500 tokens of space just in case
        if (document_number_of_tokens + 250) < model_max_tokens:
            logger.info('Running qa agent with full document in context')
            llm_response = run_qa_agent_from_single_document_no_memory(arguments)
        else:
            logger.info('Running qa agent with a RAG approach due to document size')
            llm_response = run_qa_agent_rag_no_memory(arguments)
    return llm_response
_doc_index = None
_current_doc_index = None
def run_qa_agent_rag_no_memory(input_params):
    logger.info("starting qa agent with rag approach without memory")

    base64_bytes = input_params['question'].encode("utf-8")

    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")

    logger.info(decoded_question)

    status_variables = {
        'jobstatus': JobStatus.WORKING.status,
        'answer': JobStatus.WORKING.get_message(),
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'question': input_params['question'],
        'sources': ['']
    }
    send_job_status(status_variables)

    # 1. Load index and question related content
    global _doc_index
    global _current_doc_index

    if _doc_index is None:
        logger.info("loading opensearch retriever")
        doc_index = load_vector_db_opensearch(boto3.Session().region_name,
                                              os.environ.get('OPENSEARCH_DOMAIN_ENDPOINT'),
                                              os.environ.get('OPENSEARCH_INDEX'),
                                              os.environ.get('OPENSEARCH_SECRET_ID'))

    else:
        logger.info("_retriever already exists")

    _current_doc_index = _doc_index

    logger.info("Starting similarity search")
    max_docs = input_params['max_docs']
    output_file_name = input_params['filename']

    source_documents = doc_index.similarity_search(decoded_question, k=max_docs)
    # --------------------------------------------------------------------------
    # If an output file is specified, filter the response to only include chunks  
    # related to that file. The source metadata is added when embeddings are 
    # created in the ingestion pipeline.
    #  
    # TODO: Evaluate if this filter can be optimized by using the  
    # OpenSearchVectorSearch.max_marginal_relevance_search() method instead.
    # See https://github.com/langchain-ai/langchain/issues/10524
    # --------------------------------------------------------------------------
    if output_file_name:
        source_documents = [doc for doc in source_documents if doc.metadata['source'] == output_file_name]
    logger.info(source_documents)
    status_variables['sources'] = list(set(doc.metadata['source'] for doc in source_documents))

    # 2 : load llm using the selector
    streaming = input_params.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    _qa_llm = get_llm(callback_manager)

    if (_qa_llm is None):
        logger.info('llm is None, returning')
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    # 3. Run it
    template = """\n\nHuman: {context}
    Answer from this text: {question}
    \n\nAssistant:"""
    prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    chain = LLMChain(llm=_qa_llm, prompt=prompt, verbose=input_params['verbose'])

    try:
        tmp = chain.predict(context=source_documents, question=decoded_question)
        answer = tmp.removeprefix(' ')

        logger.info(f'answer is: {answer}')
        llm_answer_bytes = answer.encode("utf-8")
        base64_bytes = base64.b64encode(llm_answer_bytes)
        llm_answer_base64_string = base64_bytes.decode("utf-8")

        status_variables['jobstatus'] = JobStatus.DONE.status
        status_variables['answer'] = llm_answer_base64_string
        send_job_status(status_variables) if not streaming else None

    except Exception as err:
        logger.exception(err)
        status_variables['jobstatus'] = JobStatus.ERROR_PREDICTION.status
        error = JobStatus.ERROR_PREDICTION.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)

    return status_variables


_file_content = None
_current_file_name = None


def run_qa_agent_from_single_document_no_memory(input_params):
    logger.info("starting qa agent without memory single document")

    base64_bytes = input_params['question'].encode("utf-8")

    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")

    logger.info(decoded_question)

    status_variables = {
        'jobstatus': JobStatus.WORKING.status,
        'answer': JobStatus.WORKING.get_message(),
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'question': input_params['question'],
        'sources': ['']
    }
    send_job_status(status_variables)

    # 1 : load the document
    global _file_content
    global _current_file_name

    bucket_name = os.environ['INPUT_BUCKET']
    filename = input_params['filename']
    logger.info(f"Generating response to question for file {filename}")

    if _current_file_name != filename:
        logger.info('loading file content')
        _file_content = S3FileLoaderInMemory(bucket_name, filename).load()
    else:
        if _file_content is None:
            logger.info('loading cached file content')
        else:
            logger.info('same file as before, but nothing cached')
            _file_content = S3FileLoaderInMemory(bucket_name, filename).load()

    _current_file_name = filename
    status_variables['sources'] = [filename]
    if _file_content is None:
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_DOC.status
        error = JobStatus.ERROR_LOAD_DOC.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return

    # 2 : run the question
    streaming = input_params.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    _qa_llm = get_llm(callback_manager)

    if (_qa_llm is None):
        logger.info('llm is None, returning')
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    # 3: run LLM
    template = """\n\nHuman: {context}
    Answer from this text: {question}
    \n\nAssistant:"""
    prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    chain = LLMChain(llm=_qa_llm, prompt=prompt, verbose=input_params['verbose'])

    try:
        logger.info(f'file content is: {_file_content}')
        logger.info(f'decoded_question is: {decoded_question}')
        tmp = chain.predict(context=_file_content, question=decoded_question)
        answer = tmp.removeprefix(' ')

        logger.info(f'answer is: {answer}')
        llm_answer_bytes = answer.encode("utf-8")
        base64_bytes = base64.b64encode(llm_answer_bytes)
        llm_answer_base64_string = base64_bytes.decode("utf-8")

        status_variables['jobstatus'] = JobStatus.DONE.status
        status_variables['answer'] = llm_answer_base64_string
        send_job_status(status_variables) if not streaming else None

    except Exception as err:
        logger.exception(err)
        status_variables['jobstatus'] = JobStatus.ERROR_PREDICTION.status
        error = JobStatus.ERROR_PREDICTION.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)

    return status_variables
