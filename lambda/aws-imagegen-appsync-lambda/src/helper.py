import boto3,os,base64,json
import requests as reqs
from aws_lambda_powertools import Logger, Tracer, Metrics


logger = Logger(service="IMAGE_GENERATION")
tracer = Tracer(service="IMAGE_GENERATION")
metrics = Metrics(namespace="image_generation", service="IMAGE_GENERATION")

#bucket = os.environ['OUTPUT_BUCKET']
bucket='apistack-joyrideimagegenerationserveraccesslogbuck-db87e4cqjuum'
#aws_region = boto3.Session().region_name
aws_region='us-east-1'
print(f'region :: {aws_region}')
#ENDPOINT_ARN=os.environ['COMPREHEND_ENDPOINT_ARN']
ENDPOINT_ARN='arn:aws:comprehend:us-east-1:587962093730:document-classifier-endpoint/toxicity-endpoint'

@tracer.capture_method
def get_credentials(secret_id: str, region_name: str) -> str:
    client = boto3.client('secretsmanager', region_name=region_name)
    response = client.get_secret_value(SecretId=secret_id)
    secrets_value = response['SecretString']
    return secrets_value

@tracer.capture_method
def upload_file_to_s3(imgbase64encoded,image_name):
    
    """Upload generated file to S3 bucket"""

    s3 = boto3.resource('s3')
    logger.info(f"uploading file to s3 bucket: {bucket}, key: {image_name}")
    try:
        respImg= s3.Object(bucket, image_name).put(Body=base64.b64decode(imgbase64encoded))
    
    except Exception as e:
        logger.error(f"Error occured :: {e}")
        return False
    return {
        "image_name":image_name,
        "bucket_name":bucket,
    }

@tracer.capture_method
def check_text_moderation(text):
    
    """Check input text has any toxicity or not. The comprehend is trained 
       with specific set of data set for toxicity.
    """

    comprehend=boto3.client('comprehend', region_name=aws_region)
    textModerationClassesResponse = comprehend.classify_document(
    Text= text,
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
def check_image_moderation(bucket,img_key):
    
    """Detect image moderation on the generated image to avoid any toxicity/nudity"""

    response={
        "isToxic":False,
        "confidence":0
    }
    rekognition=boto3.client('rekognition')
    rekognition_response = rekognition.detect_moderation_labels(
    Image={
        'S3Object':{
            'Bucket':bucket,
            'Name':img_key}
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
def generate_image(input_params,bedrock_client):
    
    """Generate image using Using bedrock with configured modelid"""


    input_text=input_params['input_text']
    model_id=input_params['model_config']['modelId']
    cfg_scale=input_params['model_config']['model_kwargs']['cfg_scale']
    seed=input_params['model_config']['model_kwargs']['seed']
    steps=input_params['model_config']['model_kwargs']['steps']
    
    promptTemplate="{\"text_prompts\":[{\"text\":\"$input_text\\n\"}],\"cfg_scale\":$cfg_scale,\"seed\":$seed,\"steps\":$steps}"
    
    prompt=promptTemplate.replace("$input_text", input_text)
    prompt=promptTemplate.replace("$cfg_scale", str(cfg_scale))
    prompt=promptTemplate.replace("$seed", str(seed))
    prompt=promptTemplate.replace("$steps", str(steps))
    
    logger.info(f" prompt :: {prompt}")

    return bedrock_client.invoke_model(
        modelId= model_id,
        contentType= "application/json",
        accept= "application/json",
        body=prompt
        )

@tracer.capture_method
def send_job_status(variables):



    answer = variables['answer']
    question = variables['question']

    logger.info(f"send  status variables :: {variables}")
    query ="""mutation updateGenerateImageStatus 
            {updateGenerateImageStatus 
                (status: \"$status\",
                  jobid: $jobid, 
                  generatedImagePath :\"$generatedImagePath\",
                  filename: \"$filename\",
                  input_text: \"$input_text\",message: \"$message\" )
                  {status, 
                  jobid,generatedImagePath,
                  filename,input_text,
                  message}
                  }"""

    query = query.replace("$status", variables['status'])
    query = query.replace("$jobid", str(variables['jobid']))
    query = query.replace("$generatedImagePath", str(variables['generatedImagePath']))
    query = query.replace("$filename", str(variables['filename']))
    query = query.replace("$input_text", str(variables['input_text']))
    query = query.replace("$message", str(variables['message']))
    request = {'query':query}

    print(request)

    GRAPHQL_URL = os.environ['GRAPHQL_URL']
    HEADERS={
        "Content-Type": "application/json",
        }
    
    responseJobstatus = requests.post(
        json=request,
        url=GRAPHQL_URL,
        headers=HEADERS,
        auth=aws_auth_appsync,
        timeout=10
    )


    logger.info(f"send  status variables :: {variables}")
    query ="""mutation updateGenerateImageStatus {updateGenerateImageStatus (status: \"$status\", jobid: $jobid, generatedImagePath : \"$generatedImagePath\", filename: \"$filename\", input_text: \"$input_text\",message: \"$message\" ){status, jobid,generatedImagePath,filename,input_text,message}}"""

    query = query.replace("$status", variables['status'])
    query = query.replace("$jobid", str(variables['jobid']))
    query = query.replace("$generatedImagePath", str(variables['generatedImagePath']))
    query = query.replace("$filename", str(variables['filename']))
    query = query.replace("$input_text", str(variables['input_text']))
    query = query.replace("$message", str(variables['message']))

    request = {'query':query}

    print(request)

    GRAPHQL_URL = os.environ['GRAPHQL_API_ENDPOINT']
    api_key_secret_name = os.environ['GRAPHQL_API_KEY']
    GRAPHQL_API_KEY= get_credentials(api_key_secret_name, aws_region)
    HEADERS={
        "Content-Type": "application/json",
        "x-api-key":GRAPHQL_API_KEY
    }

    responseJobstatus = reqs.post(
        json=request,
        url=GRAPHQL_URL,
        headers=HEADERS
    )
    logger.info('res :: {}',responseJobstatus)