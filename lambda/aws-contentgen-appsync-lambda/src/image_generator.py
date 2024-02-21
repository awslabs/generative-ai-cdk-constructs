import boto3,os,base64,json
import requests as reqs
from aws_lambda_powertools import Logger, Tracer, Metrics
from requests_aws4auth import AWS4Auth


logger = Logger(service="IMAGE_GENERATION")
tracer = Tracer(service="IMAGE_GENERATION")
metrics = Metrics(namespace="image_generation", service="IMAGE_GENERATION")


s3 = boto3.resource('s3')
aws_region = boto3.Session().region_name
credentials = boto3.Session().get_credentials()
aws_auth_appsync = AWS4Auth(
credentials.access_key,
credentials.secret_key,
aws_region,
'appsync',
session_token=credentials.token,
        )

class image_generator():
    """Generate image  ."""

    def __init__(self,input_text,file_name, rekognition_client,comprehend_client,bedrock_client,bucket):
                """Initialize with bucket , key and rekognition_client."""
                
                self.file_name = file_name
                self.rekognition_client = rekognition_client
                self.comprehend_client = comprehend_client
                self.input_text =input_text
                self.bucket = bucket
                self.bedrock_client= bedrock_client
    
    

    @tracer.capture_method
    def upload_file_to_s3(self,imgbase64encoded):
        
        """Upload generated file to S3 bucket"""

        logger.info(f"uploading file to s3 bucket: {self.bucket}, key: {self.file_name}")
        try:
            respImg= s3.Object(self.bucket, self.file_name).put(Body=base64.b64decode(imgbase64encoded))
        
        except Exception as e:
            logger.error(f"Error occured :: {e}")
            return False
        return {
            "file_name":self.file_name,
            "bucket_name":self.bucket,
        }

    @tracer.capture_method
    def text_moderation(self):
        
        """Check input text has any toxicity or not. The comprehend is trained 
        with specific set of data set for toxicity.
        """
        textModerationClassesResponse = self.comprehend_client.detect_toxic_content(
        TextSegments= [{'Text': self.input_text}],
        LanguageCode='en',

        )
        response={
            "isToxic":False,
            "confidence":0
        }
        logger.info(f"text moderation :: {textModerationClassesResponse}")
        
        for label in textModerationClassesResponse["ResultList"]:
            logger.info(f"label  :: {label}")
            if(label['Toxicity'] > 0.50):
                logger.info("  toxicity score is  greater than 0.50")
                response['isToxic']=True
            else:
                 logger.info(f"Toxicity  :: {label['Toxicity']}")
                 logger.info(" No toxicity in entered text")
            
        return response

    @tracer.capture_method
    def image_moderation(self):
        
        """Detect image moderation on the generated image to avoid any toxicity/nudity"""

        response={
            "isToxic":False,
            "confidence":0
        }
        
        rekognition_response = self.rekognition_client.detect_moderation_labels(
        Image={
            'S3Object':{
                'Bucket':self.bucket,
                'Name':self.file_name}
                }
        )
        for label in rekognition_response['ModerationLabels']:
            if(label['Confidence'] > 0.50):
                response['isToxic']=True
                response['confidence']=str(label['Confidence'])
                logger.info(f"image moderation :: {label}")
                break
                
        return response

    def generate_image(self,input_params):
        
        """Generate image using Using bedrock with configured modelid"""

        input_text=self.input_text
        model_id=input_params['model_config']['modelId']
        cfg_scale=input_params['model_config']['model_kwargs']['cfg_scale'] 
        seed=input_params['model_config']['model_kwargs']['seed']
        steps=input_params['model_config']['model_kwargs']['steps']
        
        promptTemplate="{\"text_prompts\":[{\"text\":\"$input_text\\n\"}],\"cfg_scale\":$cfg_scale,\"seed\":$seed,\"steps\":$steps}"
        
        prompt=promptTemplate.replace("$input_text", input_text).replace("$cfg_scale", str(cfg_scale)).replace("$seed", str(seed)).replace("$steps", str(steps))
        
        try:
            return  self.bedrock_client.invoke_model(
                modelId= model_id,
                contentType= "application/json",
                accept= "application/json",
                body=prompt
                )
        except Exception as e:
            logger.error(f"Error occured during generating image:: {e}")
            return ''
        


    def send_job_status(self,variables):
 
        logger.info(f"send  status variables :: {variables}")
        query ="""
        mutation updateGenerateImageStatus  {
                updateGenerateImageStatus (status: \"$status\", jobid: \"$jobid\", image_path: \"$image_path\", input_text: \"$input_text\", filename: \"$filename\", message: \"$message\") 
                {
                    status, 
                    jobid,
                    image_path,
                    filename,
                    input_text,
                    message
                }
        }
                """

        query = query.replace("$status", variables['status'])
        query = query.replace("$jobid", str(variables['jobid']))
        query = query.replace("$image_path", str(variables['image_path']))
        query = query.replace("$filename", str(variables['filename']))
        query = query.replace("$input_text", str(variables['input_text']))
        query = query.replace("$message", str(variables['message']))
        request = {'query':query}

        logger.info(request)

        GRAPHQL_URL = os.environ['GRAPHQL_URL']
        HEADERS={
            "Content-Type": "application/json",
        }
        
        responseJobstatus = reqs.post(
            json=request,
            url=GRAPHQL_URL,
            headers=HEADERS,
            auth=aws_auth_appsync,
            timeout=10
        )
        logger.info('res :: {}',responseJobstatus)