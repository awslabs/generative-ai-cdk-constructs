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
import json

from langchain.chains import LLMChain
from llms.types import Provider, BedrockModel, Modality
from typing import Any, Dict, List, Union
from .s3inmemoryloader import S3FileLoaderInMemory
from .StreamingCallbackHandler import StreamingCallbackHandler
from .helper import load_vector_db_opensearch, send_job_status, JobStatus
from adapters import registry

from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")


_doc_index = None
_current_doc_index = None


def run_qa_agent_rag_no_memory(input_params):
    logger.info("starting qa agent with rag approach without memory :: {input_params}")

    base64_bytes = input_params['question'].encode("utf-8")
    
    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")

    status_variables = {
        'jobstatus': JobStatus.WORKING.status,
        'answer': JobStatus.WORKING.get_message(),
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'question': input_params['question'],
        'sources': ['']
    }
    send_job_status(status_variables)

    # load models

    # get model 
    qa_model= input_params['qa_model']
    streaming = qa_model.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    qa_model_id = qa_model.get('modelId',BedrockModel.ANTHROPIC_CLAUDE_V2_1)
    qa_model_args = qa_model.get('model_kwargs', {})
    qa_modality=qa_model.get('modality', Modality.TEXT)
    model_provider=qa_model.get("provider",Provider.BEDROCK) 

    model_adapter = registry.get_adapter(f"{model_provider}.{qa_model_id}")

    if model_adapter is None:
        logger.error(f"Model adapter not found for {model_provider}.{qa_model_id}")
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    question_answering_model = model_adapter(
        model_id=qa_model_id,
        callback=callback_manager,
        modality=qa_modality,
        model_kwargs=qa_model_args,
        streaming=streaming
    )

    # get embeddings model
    em_model= input_params['embeddings_model']
    em_model_id = em_model.get('modelId',BedrockModel.AMAZON_TITAN_EMBED_TEXT_V1)
    em_model_args = em_model.get('model_kwargs', {})
    em_modality=em_model.get('modality', Modality.TEXT)
    em_model_provider=em_model.get("provider",Provider.BEDROCK)

    embeddings_model_adapter = registry.get_adapter(f"{em_model_provider}.{em_model_id}")

    if embeddings_model_adapter is None:
        logger.error(f"Model adapter not found for {model_provider}.{qa_model_id}")
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    embeddings_model = embeddings_model_adapter(
        model_id=em_model_id,
        modality=qa_modality,
        model_kwargs=em_model_args,
        streaming=streaming
    )

    logger.info(decoded_question)

    # 1. Load index and question related content
    global _doc_index
    global _current_doc_index

    if _doc_index is None:
        logger.info("loading opensearch retriever")
        doc_index = load_vector_db_opensearch(boto3.Session().region_name,
                                              os.environ.get('OPENSEARCH_API_NAME'),
                                              os.environ.get('OPENSEARCH_DOMAIN_ENDPOINT'),
                                              os.environ.get('OPENSEARCH_INDEX'),
                                              os.environ.get('OPENSEARCH_SECRET_ID'),
                                              embeddings_model.get_embeddings_model())

    else:
        logger.info("_retriever already exists")

    _current_doc_index = _doc_index

    logger.info("Starting similarity search")
    max_docs = input_params['retrieval']['max_docs']
    output_file_name = input_params['filename']
    try:
        source_documents = doc_index.similarity_search(decoded_question, k=max_docs)
        logger.info(f'source is :: {source_documents}')
    except Exception as e:
         logger.error(f" error occured, reason {e}")
         status_variables['jobstatus'] = JobStatus.ERROR_SEMANTIC_SEARCH.status
         error = JobStatus.ERROR_SEMANTIC_SEARCH.get_message()
         send_job_status(status_variables)
         return status_variables
    # --------------------------------------------------------------------------
    # If an output file is specified, filter the response to only include chunks  
    # related to that file. The source metadata is added when embeddings are 
    # created in the ingestion pipeline.
    #  
    # TODO: Evaluate if this filter can be optimized by using the  
    # OpenSearchVectorSearch.max_marginal_relevance_search() method instead.
    # See https://github.com/langchain-ai/langchain/issues/10524
    # --------------------------------------------------------------------------
    logger.info(f'output_file_name is :: {output_file_name}')
    if output_file_name:
        file_without_extension = os.path.splitext(output_file_name)[0]
        source_documents = [doc for doc in source_documents if file_without_extension in doc.metadata['source']]
        logger.info(source_documents)
    status_variables['sources'] = list(set(doc.metadata['source'] for doc in source_documents))

    # 2. Run it
    
    verbose = input_params.get('verbose',False)
    prompt = question_answering_model.get_prompt()
    chain = LLMChain(llm=question_answering_model.get_llm(), prompt=prompt, verbose=verbose)

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

    # get model 
    qa_model= input_params['qa_model']
    streaming = qa_model.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    qa_model_id = qa_model.get('modelId')
    qa_model_args = qa_model.get('model_kwargs', {})
    qa_modality=qa_model.get('modality', 'Text')
    model_provider=qa_model.get("provider",Provider.BEDROCK)

    model_adapter = registry.get_adapter(f"{model_provider}.{qa_model_id}")

    if model_adapter is None:
        logger.error(f"Model adapter not found for {model_provider}.{qa_model_id}")
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    question_answering_model = model_adapter(
        model_id=qa_model_id,
        callback=callback_manager,
        modality=qa_modality,
        model_kwargs=qa_model_args,
        streaming=streaming
    )

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

    # 3: run LLM
    verbose = input_params.get('verbose',False)
    prompt = question_answering_model.get_prompt()
    chain = LLMChain(llm=question_answering_model.get_llm(), prompt=prompt, verbose=verbose)

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