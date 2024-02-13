
import boto3
import os
import json
from aws_lambda_powertools import Logger, Tracer, Metrics
from aws_lambda_powertools.metrics import MetricUnit
from helpers.image_transformer import image_transformer
from botocore.exceptions import ClientError



rekognition=boto3.client('rekognition')
s3 = boto3.client('s3')

logger = Logger(service="INGESTION_FILE_TRANSFORMER")
tracer = Tracer(service="INGESTION_FILE_TRANSFORMER")
metrics = Metrics(namespace="ingestion_pipeline", service="INGESTION_FILE_TRANSFORMER")

@tracer.capture_method
def isvalid_file_format(file_name: str) -> bool:
    file_format = ['.pdf','.txt','.jpg','.png','.csv','.docx','.ppt','.html','.jpeg']
    if file_name.endswith(tuple(file_format)):
        return True
    else:
        print(f'Invalid file format :: {file_format}')
        return False
    


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
                with open ('/tmp/'+name+'.txt','w') as f:
                        f.write(json.dumps(image_details))
                s3.upload_file('/tmp/'+name+'.txt',output_bucket,name+".txt")
                downloaded_file = download_file(input_bucket,file_name)
                print(f'downloaded_file:: {downloaded_file}')
                
                resize_image = imt.image_resize()
                upload_file(output_bucket,resize_image)
                #upload_file(output_bucket,file_name)
                return 'File transformed'
               
def download_file(bucket, object )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(object)
            s3.download_file(bucket, object,file_path)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")

def upload_file(bucket, object )-> str:
        try: 
            file_path = "/tmp/" + os.path.basename(object)
            s3.upload_file(file_path, bucket,object)
            return file_path
        except ClientError as client_err:
            print(f"Couldn\'t download file {client_err.response['Error']['Message']}")
        
        except Exception as exp:
            print(f"Couldn\'t download file : {exp}")