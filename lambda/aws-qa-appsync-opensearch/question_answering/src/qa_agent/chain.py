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


import boto3
import os
import base64

from langchain.chains import LLMChain
from llms.types import Modality
from llms import  get_max_tokens
from typing import Any, Dict, List, Union
from .s3inmemoryloader import S3FileLoaderInMemory
from .helper import  send_job_status, JobStatus
from .image_qa import  run_qa_agent_on_image_no_memory,run_qa_agent_rag_on_image_no_memory
from .doc_qa import run_qa_agent_rag_no_memory, run_qa_agent_from_single_document_no_memory

from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")



@tracer.capture_method
def run_question_answering(arguments):
    response_generation_method = arguments.get('responseGenerationMethod', 'LONG_CONTEXT')

    try:
        filename = arguments['filename']       
    except:
        filename = ''
        arguments['filename'] = ''
    
    #set deafult modality to text
    qa_model= arguments['qa_model']
    modality=qa_model.get('modality','Text')
    
    # Visual QA
    if modality == Modality.IMAGE: 
         logger.info("Running QA for Image modality")             

          # user didn't provide a image url as input, we use the RAG source against the entire knowledge base
         if response_generation_method == 'LONG_CONTEXT':
                if not filename: 
                    warning = 'Error: Filename url is required for LONG_CONTEXT approach, defaulting to RAG.'
                    logger.warning(warning)
                    llm_response = run_qa_agent_rag_on_image_no_memory(arguments)
                    return llm_response
                else:
                    llm_response = run_qa_agent_on_image_no_memory(arguments)
         if response_generation_method == 'RAG':
                llm_response = run_qa_agent_rag_on_image_no_memory(arguments)
                return llm_response
    #pdf,txt QA     
    else: 
        logger.info("Running QA for text modality")
        if not filename:  # user didn't provide a specific file as input, we use the RAG source against the entire knowledge base
            if response_generation_method == 'LONG_CONTEXT':
                error = 'Error: Filename required for LONG_CONTEXT approach, defaulting to RAG.'
                logger.error(error)

            llm_response = run_qa_agent_rag_no_memory(arguments)
            return llm_response
        
        if response_generation_method == 'RAG':
            logger.info('Running qa agent with a RAG approach')
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

        model_id=qa_model['modelId']
        model_provider=qa_model['provider']
        model_max_tokens = get_max_tokens(model_provider+'.'+model_id)
        logger.info(
            f'For the current question, we have a max model length of {model_max_tokens} and a document containing {document_number_of_tokens} tokens')

        # LONG CONTEXT
        # why add 500 ? on top of the document content, we add the prompt. So we keep an extra 500 tokens of space just in case
        if (document_number_of_tokens + 250) < model_max_tokens:
            logger.info('Running qa agent with full document in context')
            llm_response = run_qa_agent_from_single_document_no_memory(arguments)
        else:
            logger.info('Running qa agent with a RAG approach due to document size')
            llm_response = run_qa_agent_rag_no_memory(arguments)
        return llm_response
    
