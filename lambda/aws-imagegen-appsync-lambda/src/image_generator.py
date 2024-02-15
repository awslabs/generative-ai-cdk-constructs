import boto3,os,base64,json
import requests as reqs
from aws_lambda_powertools import Logger, Tracer, Metrics
from requests_aws4auth import AWS4Auth


logger = Logger(service="IMAGE_GENERATION")
tracer = Tracer(service="IMAGE_GENERATION")
metrics = Metrics(namespace="image_generation", service="IMAGE_GENERATION")


ENDPOINT_ARN=os.environ['COMPREHEND_ENDPOINT_ARN']

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

    def __init__(self,input_text,image_name, rekognition_client,comprehend_client,bedrock_client,bucket):
                """Initialize with bucket , key and rekognition_client."""
                
                self.image_name = image_name
                self.rekognition_client = rekognition_client
                self.comprehend_client = comprehend_client
                self.input_text =input_text
                self.bucket = bucket
                self.bedrock_client= bedrock_client
    
    

    @tracer.capture_method
    def upload_file_to_s3(self,imgbase64encoded):
        
        """Upload generated file to S3 bucket"""

        s3 = boto3.resource('s3')
        logger.info(f"uploading file to s3 bucket: {self.bucket}, key: {self.image_name}")
        try:
            respImg= s3.Object(self.bucket, self.image_name).put(Body=base64.b64decode(imgbase64encoded))
        
        except Exception as e:
            logger.error(f"Error occured :: {e}")
            return False
        return {
            "image_name":self.image_name,
            "bucket_name":self.bucket,
        }

    @tracer.capture_method
    def text_moderation(self):
        
        """Check input text has any toxicity or not. The comprehend is trained 
        with specific set of data set for toxicity.
        """
        textModerationClassesResponse = self.comprehend_client.classify_document(
        Text= self.input_text,
        EndpointArn=ENDPOINT_ARN
        )
        response={
            "isToxic":False,
            "confidence":0
        }
        logger.info(f"text moderation :: {textModerationClassesResponse}")
        for label in textModerationClassesResponse["Classes"]:
            if(label['Name']=='Toxic' and label['Score'] > 0.50):
                    response['isToxic']=True
                    response['confidence']=label['Score']
                    break
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
                'Name':self.image_name}
                }
        )
        for label in rekognition_response['ModerationLabels']:
            if(label['Confidence'] > 0.50):
                response['isToxic']=True
                response['confidence']=str(label['Confidence'])
                logger.info(f"image moderation :: {label}")
                break
                
        return response

    @tracer.capture_method
    def generate_image(self,input_params):
        
        """Generate image using Using bedrock with configured modelid"""


        input_text=input_params['input_text']
        model_id=input_params['model_config']['modelId']
        cfg_scale=input_params['model_config']['model_kwargs']['cfg_scale']
        seed=input_params['model_config']['model_kwargs']['seed']
        steps=input_params['model_config']['model_kwargs']['steps']
        
        promptTemplate="{\"text_prompts\":[{\"text\":\"$input_text\\n\"}],\"cfg_scale\":$cfg_scale,\"seed\":$seed,\"steps\":$steps}"
        
        prompt=promptTemplate.replace("$input_text", input_text).replace("$cfg_scale", str(cfg_scale)).replace("$seed", str(seed)).replace("$steps", str(steps))
        
        
        logger.info(f" prompt :: {prompt}")

        return self.bedrock_client.invoke_model(
            modelId= model_id,
            contentType= "application/json",
            accept= "application/json",
            body=prompt
            )

    @tracer.capture_method
    def send_job_status(self,variables):
 
        logger.info(f"send  status variables :: {variables}")
        query ="""mutation updateGenerateImageStatus 
                {updateGenerateImageStatus 
                    (status: \"$status\",
                    jobid: $jobid, 
                    bucket :\"$bucket\",
                    filename: \"$filename\",
                    input_text: \"$input_text\",message: \"$message\" )
                    {
                        status, 
                    jobid,
                    bucket,
                    filename,input_text,
                    message
                    }
                    }
                """

        query = query.replace("$status", variables['status'])
        query = query.replace("$jobid", str(variables['jobid']))
        query = query.replace("$bucket", str(variables['bucket']))
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