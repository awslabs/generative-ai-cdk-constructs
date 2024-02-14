
from .helper import  send_job_status, JobStatus
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from .sagemaker_endpoint import Ideficsllm
from .StreamingCallbackHandler import StreamingCallbackHandler
import os
import base64
from aws_lambda_powertools import Logger, Tracer, Metrics

logger = Logger(service="QUESTION_ANSWERING")
tracer = Tracer(service="QUESTION_ANSWERING")
metrics = Metrics(namespace="question_answering", service="QUESTION_ANSWERING")


def run_qa_agent_on_image_no_memory(input_params):
    logger.info("starting qa agent without memory on uploaded image")

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

    
    filename = input_params['filename']
    image_url = input_params['presignedurl']
    logger.info(f"Generating response to question for file {filename}")


    
    status_variables['sources'] = [filename]
    if image_url is None:
        status_variables['jobstatus'] = JobStatus.ERROR_LOAD_DOC.status
        error = JobStatus.ERROR_LOAD_DOC.get_message()
        status_variables['answer'] = error.decode("utf-8")
        send_job_status(status_variables)
        return

    streaming = input_params.get("streaming", False)
    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None  
    _qa_llm = Ideficsllm.sagemakerendpoint_llm("idefics")
    
    if (_qa_llm is None):
        logger.info('llm is None, returning')
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
        logger.info(f'image is: {filename}')
        logger.info(f'decoded_question is: {decoded_question}')
        tmp = chain.predict(image=image_url, question=decoded_question)
        answer=tmp.split("Assistant:",1)[1]

        logger.info(f'tmp is: {tmp}')
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


def run_qa_agent_rag_image_no_memory(input_params):
    logger.info("starting qa agent RAG without memory on uploaded image")