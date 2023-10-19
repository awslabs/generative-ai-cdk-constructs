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
from .helper import load_vector_db_opensearch, send_job_status
from .s3inmemoryloader import S3FileLoaderInMemory
from langchain import PromptTemplate
from llms import get_llm, get_max_tokens
from langchain import LLMChain

import boto3
import os
import base64
from typing import Dict ,List,Union
import re
import json

from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext
from aws_lambda_powertools.metrics import MetricUnit

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

@tracer.capture_method
def run_question_answering(arguments):

    # select the methodology based on the input size
    filename = arguments['filename']
    if not filename: # user didn't provide a specific file as input, we use the RAG source against the entire knowledge base
        llm_response = run_qa_agent_rag_no_memory(arguments)
        return llm_response
    
    bucket_name = os.environ['INPUT_BUCKET']

    document_number_of_tokens = S3FileLoaderInMemory(bucket_name, filename).get_document_tokens()

    if document_number_of_tokens is None:
        logger.exception(f'Failed to compute the number of tokens for file {filename} in bucket {bucket_name}, returning')
        status_variables = {
            'jobstatus':'Failed to load information about the requested file',
            #Sorry, but I am not able to access the document specified.
            'answer':'U29ycnksIGJ1dCBJIGFtIG5vdCBhYmxlIHRvIGFjY2VzcyB0aGUgZG9jdW1lbnQgc3BlY2lmaWVkLg==',
            'jobid': arguments['jobid'],
            'filename': filename,
            'question': '',
            'sources': ['']
        }
        send_job_status(status_variables)
        return ''

    model_max_tokens = get_max_tokens()
    logger.info(f'For the current question, we have a max model length of {model_max_tokens} and a document containing {document_number_of_tokens} tokens')

    # why add 500 ? on top of the document content, we add the prompt. So we keep an extra 500 tokens of space just in case
    if (document_number_of_tokens + 250) < model_max_tokens:
        logger.info('Running qa agent with full document in context')
        llm_response = run_qa_agent_from_single_document_no_memory(arguments)
    else:
        logger.info('Running qa agent with a RAG approach')
        llm_response = run_qa_agent_rag_no_memory(arguments)
    
    return llm_response

_doc_index = None
_current_doc_index = None

def run_qa_agent_rag_no_memory(input_params):
    logger.info("starting qa agent with rag approach without memory single document")

    base64_bytes = input_params['question'].encode("utf-8")

    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")

    logger.info(decoded_question)

    status_variables = {
        'jobstatus': 'Working on the question',
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'answer': '',
        'question': '',
        'sources': ['']
    }
    send_job_status(status_variables)

    # 1. Load index and question related content

    handler_type = input_params['handler_type']

    global _doc_index
    global _current_doc_index

    if handler_type != _current_doc_index:
        logger.info(f"_retriever={handler_type} does not match _current_retriever={_current_doc_index}, "
                    f"resetting retriever")
        _doc_index = None

    if _doc_index is None:
        logger.info("loading opensearch retriever")
        doc_index = load_vector_db_opensearch(boto3.Session().region_name,
                                               os.environ.get('OPENSEARCH_DOMAIN_ENDPOINT'),
                                               os.environ.get('OPENSEARCH_INDEX'),
                                               os.environ.get('OPENSEARCH_SECRET_ID'))

    elif _doc_index is not None:
        logger.info("_retriever already exists")
    else:
        logger.exception(f"requested retriever type={handler_type} which is not supported, _retriever={_doc_index}")
        return

    _current_doc_index = _doc_index

    logger.info("Starting similarity search")
    max_docs = input_params['max_docs']
    output_file_name = input_params['filename']
    source_documents = []
    if not output_file_name: # no input file provided, question against the whole knowledge base
        logger.info(f'Similarity search on the entire knowledge base')
        source_documents = doc_index.similarity_search(decoded_question, k=max_docs)
    else: #a file has been specified, using a filter for similarity search against the knowledge base
        logger.info(f'Similarity search on {output_file_name}')
        # since we want to get a response only by looking at chuncks related to a specific file, we add a filter.
        # the source metadata is added when creating embeddings in the ingestion pipeline
        filter = {"bool": {"filter": {"term": {"source":output_file_name}}}}
        docs = doc_index.similarity_search(decoded_question, pre_filter=filter, k=max_docs)

        #TODO: hopefully we can get rid of this : filtering doesn't seem to work properly
        # so doing a manual filtering
        for doc in docs:
            if doc.metadata['source'] == output_file_name:
                source_documents.append(doc)

        logger.info(source_documents)

    # 2 : load llm using the selector
    _qa_llm = get_llm()

    if (_qa_llm is None):
        print('llm is None, returning')
        return
    
    # 3. Run it

    template = """\n\nHuman: {context}
    Answer from this text: {question}
    \n\nAssistant:"""
    prompt = PromptTemplate(template=template, input_variables=["context", "question"])
    chain = LLMChain(llm=_qa_llm, prompt=prompt, verbose=input_params['verbose'])

    try:
        tmp = chain.predict(context=source_documents, question=decoded_question)
        answer = tmp.removeprefix(' ')
    except Exception as err:
        logger.exception(err)
        status_variables['jobstatus'] = 'Exception during prediction'
        #Sorry, it seems an issue happened on my end, and I'm not able to answer your question. Please contact an administrator to understand why !
        status_variables['answer'] = "U29ycnksIGl0IHNlZW1zIGFuIGlzc3VlIGhhcHBlbmVkIG9uIG15IGVuZCwgYW5kIEknbSBub3QgYWJsZSB0byBhbnN3ZXIgeW91ciBxdWVzdGlvbi4gUGxlYXNlIGNvbnRhY3QgYW4gYWRtaW5pc3RyYXRvciB0byB1bmRlcnN0YW5kIHdoeSAh"
        send_job_status(status_variables)
        return
    
    logger.info(f'answer is: {answer}')

    llm_answer_bytes = answer.encode("utf-8")

    base64_bytes = base64.b64encode(llm_answer_bytes)
    llm_answer_base64_string = base64_bytes.decode("utf-8")

    status_variables['jobstatus'] = 'Done'
    status_variables['answer'] = llm_answer_base64_string
    status_variables['question'] = input_params['question']
    status_variables['sources'] = ['']
    send_job_status(status_variables)

    response = {'question': input_params['question'], 'answer': answer, 'sources': [''], 'filename': input_params['filename']}

    return response

_file_content = None
_current_file_name = None

def run_qa_agent_from_single_document_no_memory(input_params):
    logger.info("starting qa agent without memory single document")

    base64_bytes = input_params['question'].encode("utf-8")

    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")

    logger.info(decoded_question)

    status_variables = {
        'jobstatus': 'Working on the question',
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'answer': '',
        'question': '',
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

    if _file_content is None:
        status_variables['jobstatus'] = 'Failed to load document content'
        #It seems I cannot load the document you are referring to, please verify that the document was correctly ingested or contect an administrator to get more information.
        status_variables['answer'] = 'SXQgc2VlbXMgSSBjYW5ub3QgbG9hZCB0aGUgZG9jdW1lbnQgeW91IGFyZSByZWZlcnJpbmcgdG8sIHBsZWFzZSB2ZXJpZnkgdGhhdCB0aGUgZG9jdW1lbnQgd2FzIGNvcnJlY3RseSBpbmdlc3RlZCBvciBjb250ZWN0IGFuIGFkbWluaXN0cmF0b3IgdG8gZ2V0IG1vcmUgaW5mb3JtYXRpb24u'
        send_job_status(status_variables)
        return

    # 2 : run the question
    _qa_llm = get_llm()

    if (_qa_llm is None):
        logger.info('llm is None, returning')
        status_variables['jobstatus'] = 'Failed to load the llm'
        #An internal error happened, and I am not able to load my brain, please contact an administrator 
        status_variables['answer'] = 'QW4gaW50ZXJuYWwgZXJyb3IgaGFwcGVuZWQsIGFuZCBJIGFtIG5vdCBhYmxlIHRvIGxvYWQgbXkgYnJhaW4sIHBsZWFzZSBjb250YWN0IGFuIGFkbWluaXN0cmF0b3Ig'
        send_job_status(status_variables)
        return

    # run LLM

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
    except Exception as err:
        logger.exception(err)
        status_variables['jobstatus'] = 'Exception during prediction'
        #Sorry, it seems an issue happened on my end, and I'm not able to answer your question. Please contact an administrator to understand why !
        status_variables['answer'] = "U29ycnksIGl0IHNlZW1zIGFuIGlzc3VlIGhhcHBlbmVkIG9uIG15IGVuZCwgYW5kIEknbSBub3QgYWJsZSB0byBhbnN3ZXIgeW91ciBxdWVzdGlvbi4gUGxlYXNlIGNvbnRhY3QgYW4gYWRtaW5pc3RyYXRvciB0byB1bmRlcnN0YW5kIHdoeSAh"
        send_job_status(status_variables)
        return
    
    logger.info(f'answer is: {answer}')

    llm_answer_bytes = answer.encode("utf-8")

    base64_bytes = base64.b64encode(llm_answer_bytes)
    llm_answer_base64_string = base64_bytes.decode("utf-8")

    status_variables['jobstatus'] = 'Done'
    status_variables['answer'] = llm_answer_base64_string
    status_variables['question'] = input_params['question']
    status_variables['sources'] = ['']
    send_job_status(status_variables)

    response = {'question': input_params['question'], 'answer': answer, 'sources': [''], 'filename': input_params['filename']}

    return response