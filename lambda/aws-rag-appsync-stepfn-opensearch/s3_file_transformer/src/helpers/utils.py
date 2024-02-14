
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
s3 = boto3.client('s3')

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
        document_content = pdf_transformer(input_bucket,file_name)
        if not document_content:
                return 'Unable to load document'             
        else:
                encoded_string = document_content.encode("utf-8")
                s3.Bucket(output_bucket).put_object(Key=output_file_name, Body=encoded_string) 
                return 'File transformed' 

@tracer.capture_method
def transform_image_document(input_bucket: str,file_name: str,output_bucket: str):  
        
        image = download_file(input_bucket,file_name)        
        imt= image_transformer.from_file(image, rekognition)
        if(imt.check_moderation()):
                return 'Image not supported'
        else:
                result_lables = imt.detect_image_lables()
                result_celeb =  imt.recognize_celebrities()
                image_details = {
                        "image_lables":result_lables,
                        "image_celeb":result_celeb
                        }
                               
                name, extension = os.path.splitext(file_name)

                lables_txt= convert_lables_to_sentence(result_lables)
                # with open ('/tmp/'+name+'.txt','w') as f:
                #         f.write(json.dumps(image_details))
                # checking with senetence, save the senetence instead of lables
               
                with open ('/tmp/'+name+'.txt','w') as f:
                         f.write(json.dumps(lables_txt))
                
                s3.upload_file('/tmp/'+name+'.txt',output_bucket,name+".txt")
                downloaded_file = download_file(input_bucket,file_name)
                print(f'downloaded_file:: {downloaded_file}')
                
                resize_image = imt.image_resize()
                upload_file(output_bucket,resize_image,file_name)
                #upload_file(output_bucket,file_name)
                return 'File transformed'
               

@tracer.capture_method
def convert_lables_to_sentence(labels_str)-> str:
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
            s3.download_file(bucket, object,file_path)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")

def upload_file(bucket, file_name,key )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(file_name)
            s3.upload_file(file_path, bucket,key)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")