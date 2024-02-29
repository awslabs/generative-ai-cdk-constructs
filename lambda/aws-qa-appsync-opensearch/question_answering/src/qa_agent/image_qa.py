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
import base64

from llms import get_llm
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from .sagemaker_endpoint import MultiModal
from aws_lambda_powertools import Logger, Tracer, Metrics
from .StreamingCallbackHandler import StreamingCallbackHandler

from .helper import  load_vector_db_opensearch,send_job_status, JobStatus,get_presigned_url


logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")

bucket_name = os.environ['INPUT_BUCKET']

def run_qa_agent_on_image_no_memory(input_params):
    logger.info("starting qa agent without memory on uploaded image")

    status_variables = {
        'jobstatus': JobStatus.WORKING.status,
        'answer': JobStatus.WORKING.get_message(),
        'jobid': input_params['jobid'],
        'filename': input_params['filename'],
        'question': input_params['question'],
        'sources': ['']
    }

    qa_model=input_params['qa_model']
    
    if 'modelId' in qa_model:
         qa_modelId= qa_model['modelId']
    else:
         logger.error(' No model id defined, cannot answer question , returning...')
         status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
         status_variables['answer'] = JobStatus.ERROR_LOAD_LLM.status
         send_job_status(status_variables)
         return status_variables


    base64_bytes = input_params['question'].encode("utf-8")
    sample_string_bytes = base64.b64decode(base64_bytes)
    decoded_question = sample_string_bytes.decode("utf-8")
    logger.info(decoded_question)

    filename = input_params['filename']
    image_url = input_params['presignedurl']
    model_provider = input_params['qa_model']['provider']
    logger.info(f"Generating response to question for file {filename} image_url {image_url}")
    
    status_variables['sources'] = [filename]
    if image_url is None:
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_DOC.status
        error = JobStatus.ERROR_LOAD_DOC.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables

    streaming = input_params.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None  
    if model_provider=='Sagemaker Endpoint':
        _qa_llm = MultiModal.sagemakerendpoint_llm(qa_modelId)
    elif model_provider=='Bedrock':
        _qa_llm = get_llm(callback_manager)
    else:
        logger.error('Invalid Model provider, cannot load  LLM , returning..')
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables
    
    template = """\n\nUser: {question}![]({image})<end_of_utterance>
         \n\nAssistant:"""
    prompt = PromptTemplate(template=template, input_variables=["image", "question"])
    chain = LLMChain(llm=_qa_llm, prompt=prompt, verbose=input_params['verbose'])

    try:
       
        logger.info(f'decoded_question is: {decoded_question}')
        tmp = chain.predict(image=image_url, question=decoded_question)
        answer=tmp.split("Assistant:",1)[1]

        
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

_doc_index = None
_current_doc_index = None

def run_qa_agent_rag_on_image_no_memory(input_params):
    logger.info("starting qa agent with rag approach without memory :: {input_params}")

    base64_bytes = input_params['question'].encode("utf-8")
    embedding_model_id = input_params['embeddings_model']['modelId']
    model_provider = input_params['qa_model']['provider']
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

    filename = input_params['filename']
    logger.info(f"Generating response to question for file {filename}")

    qa_model=input_params['qa_model']
    
    if 'modelId' in qa_model:
         qa_model_id= qa_model['modelId']
    else:
         logger.error(' No model id is defined in qa_model, cannot answer question , returning...')
         status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
         status_variables['answer'] = JobStatus.ERROR_LOAD_LLM.status
         send_job_status(status_variables)
         return 
    
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
                                              embedding_model_id)

    else:
        logger.info("_retriever already exists")

    _current_doc_index = _doc_index

    logger.info("Starting similarity search")
    max_docs = input_params['retrieval']['max_docs']
    output_file_name = input_params['filename']

    source_documents = doc_index.similarity_search(decoded_question, k=max_docs)
    logger.info(f'source is :: {source_documents}')
    # --------------------------------------------------------------------------
    # If an output file is specified, filter the response to only include chunks  
    # related to that file. The source metadata is added when embeddings are 
    # created in the ingestion pipeline.
    # 
    # --------------------------------------------------------------------------
    logger.info(f'output_file_name is :: {output_file_name}')
    if output_file_name:
        source_documents = [doc for doc in source_documents if doc.metadata['source'] == output_file_name]
    status_variables['sources'] = list(set(doc.metadata['source'] for doc in source_documents))
    
    # get new presigned url for RAG from source metadata
    if source_documents is not None:
        filename = source_documents[0].metadata['filename']
        image_url = get_presigned_url(bucket_name,filename)
        logger.info(f'image_url: {image_url}')
        status_variables['filename']=filename
    
    if image_url is None:
        logger.error(f'cannot find image url, returning..') 
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_DOC.status
        error = JobStatus.ERROR_LOAD_DOC.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return
    
    # 2 : load llm using the selector
    streaming = input_params.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    #_qa_llm = get_llm(callback_manager)
    if model_provider=='Sagemaker Endpoint':
        _qa_llm = MultiModal.sagemakerendpoint_llm(qa_model_id)
    elif model_provider=='Bedrock':
        _qa_llm = get_llm(callback_manager)
    else:
        logger.info('Invalid Model provider, cannot load  LLM , returning..')
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_LLM.status
        error = JobStatus.ERROR_LOAD_LLM.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return status_variables
        

    logger.info(f"going to answer the question=\"{decoded_question}\" using the image \"{image_url}\"")

    # 3. Run it
    template = """\n\nUser: {question}![]({image})<end_of_utterance>
         \n\nAssistant:"""
    prompt = PromptTemplate(template=template, input_variables=["image", "question"])
    chain = LLMChain(llm=_qa_llm, prompt=prompt, verbose=input_params['verbose'])


    try:
        
        logger.info(f'decoded_question is: {decoded_question}')
        
        tmp = chain.predict(image=image_url, question=decoded_question)
        answer=tmp.split("Assistant:",1)[1]
        
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

