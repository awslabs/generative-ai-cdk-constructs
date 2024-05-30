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
import json
import base64
import os,boto3

# langchain files
from langchain.prompts import PromptTemplate
from langchain.llms.bedrock import Bedrock
from langchain_core.messages import HumanMessage
from langchain.docstore.document import Document
from langchain_community.chat_models import BedrockChat
from langchain_core.prompts import ChatPromptTemplate
from langchain.chains.summarize import load_summarize_chain

from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import (
    SystemMessage,
    HumanMessage,
    AIMessage,
)

# aws libs
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.utilities.typing import LambdaContext

# internal files
from StreamingCallbackHandler import StreamingCallbackHandler
from update_summary_status import JobStatus, updateSummaryJobStatus
from helper import  read_file_from_s3,download_file,encode_image_to_base64,Modality


logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")
metrics = Metrics(namespace="summary_pipeline", service="SUMMARY_GENERATION")



transformed_bucket_name = os.environ["ASSET_BUCKET_NAME"]
chain_type = os.environ["SUMMARY_LLM_CHAIN_TYPE"]
bedrock_client = boto3.client('bedrock-runtime')


@logger.inject_lambda_context(log_event=True)
@tracer.capture_lambda_handler
@metrics.log_metrics(capture_cold_start_metric=True)
def handler(event, context: LambdaContext)-> dict:
    logger.info("Starting summary agent with input", event)

    job_id = event["summary_job_id"]

    language = event["language"]
    summary_model= event["summary_model"]
    model_id=summary_model.get('modelId','anthropic.claude-v2:1')
    modality=summary_model.get('modality','Text')
    model_args = summary_model.get('model_kwargs', {})
    streaming = summary_model.get("streaming", False)
 

    logger.set_correlation_id(job_id)
    metrics.add_metadata(key='correlationId', value=job_id)
    tracer.put_annotation(key="correlationId", value=job_id)

    original_file_name = event["file_name"]
    transformed_file_name = event["transformed_file_name"]
    
   
    status_variables = {
        "summary_job_id": job_id,
        "name": original_file_name,
        "status": JobStatus.WORKING.status,
        "summary": '',
        
    }


    callback_manager = [StreamingCallbackHandler(status_variables)] if streaming else None
    summary_llm = BedrockChat(
            model_id=model_id,
            streaming=streaming,
            callbacks=callback_manager,
            model_kwargs=model_args,
        )

    if (modality==Modality.TEXT.status) :
        try:
            inputFile = read_file_from_s3(transformed_bucket_name, transformed_file_name)
        except Exception as exp:
            status_variables['status']=JobStatus.ERROR_LOAD_DOC.status
            logger.exception(f"Error occured while processing  {transformed_file_name} from {transformed_bucket_name}, Reason : exp {exp}")
            updateSummaryJobStatus(status_variables) 
            return
        generate_summary(summary_llm,inputFile,language)
    
    elif(modality==Modality.IMAGE.status) :
        try:
            local_file_path= download_file(transformed_bucket_name,transformed_file_name)
            base64_images=encode_image_to_base64(local_file_path,transformed_file_name)  
        except Exception as exp:
            status_variables['status']=JobStatus.ERROR_LOAD_DOC.status
            logger.exception(f"Error occured while processing  {transformed_file_name} from {transformed_bucket_name}, Reason : exp {exp}")
            updateSummaryJobStatus(status_variables) 
            return
        generate_summary_for_image(summary_llm,base64_images,language)
    
    else:
        logger.error(f"Modality {modality} is not supported with {Modality.IMAGE}")
        status_variables['status']=JobStatus.ERROR_LOAD_LLM.status
        updateSummaryJobStatus(status_variables)
        return
   
    logger.info("Summary Genrated and published")
   


def generate_summary(_summary_llm,inputFile,language)-> str:
    
    logger.info(f" Using chain_type as {chain_type} for the document")    
    docs = [Document(page_content=inputFile)]
    messages = [
    ("system", "Please read the text and summarize in {language} language"),
    ("human", "{text},{language}"),
    ]

    prompt = ChatPromptTemplate.from_messages(messages)
    chain = prompt | _summary_llm 

    response = chain.invoke({"text": docs,"language":language})
    logger.info(f'generated response is:::: {response}')
   
    
def generate_summary_for_image(_summary_llm,base64_images,language)-> str:
    
    logger.info(f" generating image description...") 
    prompt =f"Think step by step and then describe this image in {language} language."
     
    system_message = f"Respond only in {language}."
    human_message=[
        
            {
                "type": "image",
                "source": {
                    "type": "base64",
                    "media_type": "image/jpeg",
                    "data": base64_images
                }
            },
            {
                "type": "text",
                "text": prompt
            
            }
       ]
    ai_message = "Here is my response after thinking step by step ." 
    prompt = ChatPromptTemplate.from_messages(
    [
        SystemMessage(content=system_message),
        HumanMessage(content=human_message),
        AIMessage(content=ai_message),
    ]
    )

    chain = prompt | _summary_llm | StrOutputParser()
    chain.invoke({"question": prompt})
