
import boto3
import os
import json
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit
from helpers.image_transformer import image_transformer
from helpers.pdf_transformer import pdf_transformer
from botocore.exceptions import ClientError
from langchain_core.prompts import PromptTemplate



rekognition=boto3.client('rekognition')
s3 = boto3.resource('s3')

logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_FILE_TRANSFORMER")

@tracer.capture_method
def isvalid_file_format(file_name: str) -> bool:
    file_format = ['.pdf','.txt','.jpg','.png','.jpeg','.svg']
    if file_name.endswith(tuple(file_format)):
        return True
    else:
        print(f'Invalid file format :: {file_format}')
        return False
    
@tracer.capture_method
def transform_pdf_document(input_bucket: str,file_name: str,output_bucket: str,output_file_name:str):
        document_content = pdf_transformer(input_bucket,file_name).load()
        if not document_content:
                return 'Unable to load document'             
        else:
                encoded_string = document_content.encode("utf-8")
                s3.Bucket(output_bucket).put_object(Key=output_file_name, Body=encoded_string) 
                return 'File transformed' 

@tracer.capture_method
def transform_image_document(input_bucket: str,file_name: str,output_bucket: str):  
        
        image = download_file(input_bucket,file_name)        
        imt_object= image_transformer.from_file(image, rekognition)
        if(imt_object.check_moderation()):
                return 'Image not supported'
        else:
                result_lables = imt_object.detect_image_lables()
                # result_celeb =  imt_object.recognize_celebrities()
                # image_details = {
                #         "image_lables":result_lables,
                #         "image_celeb":result_celeb
                #         }
                               
                name, extension = os.path.splitext(file_name)
                lables_txt= convert_lables_to_sentence(result_lables)            
                
                # upload descriptive text file as .txt for ingested image
                with open ('/tmp/'+name+'.txt','w') as f:
                         f.write(json.dumps(lables_txt))  
                #s3.upload_file('/tmp/'+name+'.txt',output_bucket,name+".txt")
                upload_file(output_bucket,f'{name}.txt',f'{name}.txt')
                
                # download ingested image and resize it for amazon titan image embed model
                downloaded_file = download_file(input_bucket,file_name)
                print(f'downloaded_file:: {downloaded_file}')
                resize_image = imt_object.image_resize()
                
                # upload resized image for amazon titan image embed model
                upload_file(output_bucket,resize_image,file_name)
                #upload_file(output_bucket,file_name)
                return 'File transformed'
               

@tracer.capture_method
def convert_lables_to_sentence(labels_str)-> str:
        """ Convert image lables to descriptive text using anthropic.claude model"""
        try:
            print(f"lables:: {labels_str}")
            bedrock_client = boto3.client('bedrock-runtime')
            
            prompt ="""\n\nHuman: Here are the comma seperated list of labels seen in the image:
                        <labels>
                        {labels}
                        </labels>
                        Please provide a human readable and understandable summary based on these labels
                        \n\nAssistant:"""
            
                    
            prompt_template = PromptTemplate.from_template(prompt)
            prompt_template_for_lables = prompt_template.format(labels=labels_str)
            
            body = json.dumps({"prompt": prompt_template_for_lables,
                 "max_tokens_to_sample":300,
                 "temperature":1,
                 "top_k":250,
                 "top_p":0.999,
                 "stop_sequences":[]
                  }) 
            modelId = 'anthropic.claude-v2' 
            accept = 'application/json'
            contentType = 'application/json'

            response = bedrock_client.invoke_model(body=body,
                                                    modelId=modelId, accept=accept, contentType=contentType)
            response_body = json.loads(response.get('body').read())
            response_text_claud = response_body.get('completion')
            print(f"response_text_claud:: {response_text_claud}")
            return response_text_claud
        except Exception as exp:
            print(f"Couldn't convert lables to sentence: {exp}")
        


def download_file(bucket, object )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(object)
            s3.Bucket(bucket).download_file(object, file_path)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")

def upload_file(bucket, file_name,key )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(file_name)
            s3.meta.client.upload_file(file_path, bucket,key)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t upload file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t upload file : {exp}")