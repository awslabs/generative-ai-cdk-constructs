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
        
        """Generate image using Using bedrock with configured modelid and params"""

        input_text=self.input_text
        
        # add default negative prompts
        if 'negative_prompts' in input_params:
               sample_string_bytes = base64.b64decode(input_params['negative_prompts'])
               decoded_negative_prompts = sample_string_bytes.decode("utf-8")
               logger.info(f"decoded negative prompts are :: {decoded_negative_prompts}")
               negative_prompts= decoded_negative_prompts
        else:
              negative_prompts= ["poorly rendered","poor background details"]
    
        model_id=input_params['model_config']['modelId']
      
        model_kwargs=input_params['model_config']['model_kwargs']
        params= get_inference_parameters(model_kwargs)

        logger.info(f'SD params :: {params}')
    

        request = json.dumps({
                "text_prompts": (
                        [{"text": input_text, "weight": 1.0}]
                        + [{"text": negprompt, "weight": -1.0} for negprompt in negative_prompts]
                ),
                "cfg_scale":params['cfg_scale'],
                "seed": params['seed'],
                "steps": params['steps'],
                "style_preset": params['style_preset'],
                "clip_guidance_preset": params['clip_guidance_preset'],
                "sampler": params['sampler'],
                "width": params['width'],
                "height": params['height']
                })
                        
        try:
            return  self.bedrock_client.invoke_model(
                modelId= model_id,
                contentType= "application/json",
                accept= "application/json",
                body=request
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


def get_inference_parameters(model_kwargs):
      """ Read inference parameters and set default values"""
      if 'seed' in model_kwargs:
              seed= model_kwargs['seed']
      else:
              seed=452345
      if 'cfg_scale' in model_kwargs:
              cfg_scale= model_kwargs['cfg_scale']
      else:
              cfg_scale=10
      if 'steps' in model_kwargs:
              steps= model_kwargs['steps']
      else:
              steps=10
      if 'style_preset' in model_kwargs:
              style_preset= model_kwargs['style_preset']
      else:
              style_preset='photographic'
      if 'clip_guidance_preset' in model_kwargs:
              clip_guidance_preset= model_kwargs['clip_guidance_preset']
      else:
              clip_guidance_preset='FAST_GREEN'
      if 'width' in model_kwargs:
              width= model_kwargs['width']
      else:
              width=512
      if 'height' in model_kwargs:
              height= model_kwargs['height']
      else:
              height=512
      if 'sampler' in model_kwargs:
              sampler= model_kwargs['sampler']
      else:
              sampler='K_DPMPP_2S_ANCESTRAL'
      return {
            "cfg_scale": cfg_scale,
            "seed": seed,
            "steps": steps,
            "style_preset": style_preset,
            "clip_guidance_preset": clip_guidance_preset,
            "sampler": sampler,
            "width": width,
            "height": height,
      }
