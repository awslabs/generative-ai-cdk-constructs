#!/bin/env python3 -x -u

from base64 import b64encode
from hashlib import sha256
from json import loads
from json.decoder import JSONDecodeError
from logging import basicConfig
from logging import getLogger
from logging import StreamHandler
from logging import NOTSET
from os import getenv
from os.path import join
from signal import signal
from signal import SIGINT
from signal import SIGTERM
from sys import stdout
from time import sleep

from boto3 import client
from boto3 import resource
from botocore.exceptions import ClientError
from cachetools import cached
from cachetools import TTLCache
from jsonpickle import encode
from llama_index.core import SimpleDirectoryReader
from s3fs import S3FileSystem

MAX_SQS_VISIBILITY_TIMEOUT = 60 * 60 * 12 - 1 # Maximum SQS Visibility Timeout is <12 hours
WAIT_TIME_SECONDS = 1 # 0 - 20 seconds
basicConfig(stream=stdout, level=getenv('LOGGING_LEVEL', NOTSET))
LOGGER = getLogger()
LOGGER.addHandler(StreamHandler(stream=stdout))

S3 = client('s3')
SQS = resource('sqs')
SSM = client('ssm')

QUEUE_NAME = getenv('QUEUE_NAME')
BUCKET_NAME = getenv('BUCKET_NAME')
PREFIX = getenv('PREFIX', '')
CIRCUIT_BREAKER_SSM_PARAMETER_NAME = getenv('CIRCUIT_BREAKER_SSM_PARAMETER_NAME', '')
CIRCUIT_BREAKER_CACHE_TTL = 60
WAIT_TIME_SECONDS = 1

if QUEUE_NAME is None:
    raise AssertionError('QUEUE_NAME environment variable is not set')
else:
    print(f'DEBUG: "QUEUE_NAME" is {QUEUE_NAME}', flush=True)
if BUCKET_NAME is None:
    raise AssertionError('BUCKET_NAME environment variable is not set')
else:
    print(f'DEBUG: "BUCKET_NAME" is {BUCKET_NAME}', flush=True)

SQS_QUEUE = SQS.get_queue_by_name(
    QueueName=QUEUE_NAME,
)
print(f'DEBUG: {SQS_QUEUE.attributes}', flush=True)

class SignalHandler:
    def __init__(self, sig):
        self.received_signal = False
        signal(sig, self._signal_handler)

    def _signal_handler(self, signal, frame):
        print(f'handling signal {signal}, exiting gracefully', flush=True)
        self.received_signal = True

def save_document(documents, serialize=True) -> None:
    for document in documents:
        file_name = f"{document.metadata['file_name']}" if 'file_name' in document.metadata else '' 
        print(f'INFO(save_document): document id: {document.doc_id}', flush=True)
        print(f'DEBUG(save_document): document text: {document.text}', flush=True)
        print(f'DEBUG(save_document): document metadata: {document.metadata}', flush=True)
        print(f'DEBUG(save_document): document extra info: {document.extra_info}', flush=True)
        data = document.text.encode()
        response = S3.put_object(
                Body=data,
                Bucket=BUCKET_NAME,
                Key=join(PREFIX, file_name, f'{document.doc_id}.txt'),
                ChecksumSHA256=b64encode(sha256(data).digest()).decode(),
                ChecksumAlgorithm='SHA256',
        )
        print(response, flush=True)
        if serialize:
            frozen = encode(document)
            body = frozen.encode()
            print(f'DEBUG frozen {frozen}', flush=True)
            S3.put_object(
                Body=body,
                Bucket=BUCKET_NAME,
                Key=join(PREFIX, file_name, f'{document.doc_id}.json'),
                ChecksumSHA256=b64encode(sha256(body).digest()).decode(),
                ChecksumAlgorithm='SHA256',
            )

def load_document(filename) -> None:
    print(f'DEBUG(load_document): loading {filename}', flush=True)
    reader = SimpleDirectoryReader(
        fs=S3FileSystem(),
        input_files=[filename],
    )
    documents = reader.load_data()
    save_document(documents)

def log_message(sqs_message) -> None:
    print(f'INFO(log_message): message id: {sqs_message.message_id}', flush=True)
    print(f'DEBUG(log_message): message attributes: {sqs_message.message_attributes}', flush=True)
    print(f'DEBUG(log_message): message available subresources: {sqs_message.get_available_subresources()}', flush=True)
    print(f'DEBUG(log_message): attributes: {sqs_message.attributes}', flush=True)
    print(f'DEBUG(log_message): body: {sqs_message.body}', flush=True)
    print(f'DEBUG(log_message): md5 of body: {sqs_message.md5_of_body}', flush=True)
    print(f'DEBUG(log_message): md5 of message attributes: {sqs_message.md5_of_message_attributes}', flush=True)

def process_message(sqs_message) -> None:
    print(f'INFO(process_message): message id: {sqs_message.message_id}', flush=True)
    json_message = loads(sqs_message.body)
    if 'Type' in json_message and json_message['Type'] == 'Notification':
        if 'Message' in json_message and json_message['Message'] != '' and 'Subject' in json_message and json_message['Subject'] == 'Amazon S3 Notification':
            message_content = loads(json_message['Message'])
            if 'Records' in message_content:
                for record in message_content['Records']:
                    if 'eventName' in record and record['eventName'].startswith('ObjectCreated') and 's3' in record and 'object' in record['s3'] and 'key' in record['s3']['object'] and 'bucket' in record['s3'] and 'name' in record['s3']['bucket']:
                        print(f'INFO(process_message): s3 object key: {record["s3"]["object"]["key"]} in {record["s3"]["bucket"]["name"]}', flush=True)
                        load_document(join(record['s3']['bucket']['name'], record['s3']['object']['key']))
                    else:
                        print(f'WARNING(process_message): skipped: {record}', flush=True)
            else:
                print(f'WARNING(process_message): missing records: {message_content}', flush=True)
        else:
            print(f'WARNING(process_message): unknown message: {json_message}', flush=True)
    else:
        print(f'WARNING(process_message): unknown message type: {json_message}', flush=True)

# The circuit breaker doesn't kill the process it only skips checking the queue...
@cached(cache=TTLCache(maxsize=1, ttl=CIRCUIT_BREAKER_CACHE_TTL))
def check_circuit_breaker() -> bool:
    tripped = False
    if CIRCUIT_BREAKER_SSM_PARAMETER_NAME != '':
        try:
            response_get_parameter = SSM.get_parameter(
                Name=CIRCUIT_BREAKER_SSM_PARAMETER_NAME,
            )
            circuit_breaker = response_get_parameter['Parameter']['Value']
            print(f'Circuit breaker="{circuit_breaker}" for SSM parameter "{CIRCUIT_BREAKER_SSM_PARAMETER_NAME}" to process the SQS queue named "{QUEUE_NAME}"', flush=True)
            if response_get_parameter['Parameter']['Value'] == 'True':
                tripped = True
        except ClientError as exc:
            if exc.response['Error']['Code'] == 'ParameterNotFound':
                pass
            else:
                raise exc
    return tripped

def main():
    print('starting...', flush=True)
    print(f'A circuit breaker SSM parameter "{CIRCUIT_BREAKER_SSM_PARAMETER_NAME}" is being checked TTL of {CIRCUIT_BREAKER_CACHE_TTL} seconds, create it to skip long polling the SQS Queue "{QUEUE_NAME}"')
    sigterm_handler = SignalHandler(SIGTERM)
    sigint_handler = SignalHandler(SIGINT)
    looper = 0
    # On command line, <CONTROL> + C and ECS sends SIGTERM
    # https://aws.amazon.com/blogs/containers/graceful-shutdowns-with-ecs/
    while not sigterm_handler.received_signal and not sigint_handler.received_signal:
        # Only check for a circuit breaker every certain number of loops
        if looper > 10:
            looper = 0
        else: 
            looper += 1
        if check_circuit_breaker():
            print('💥' * looper, flush=True)
            sleep(WAIT_TIME_SECONDS)
        else:
            print('🏃' * looper, flush=True)
            messages = SQS_QUEUE.receive_messages(
                MaxNumberOfMessages=10, # 1-10 messages
                WaitTimeSeconds=WAIT_TIME_SECONDS, # 0-20 seconds
                AttributeNames=['All'],
                MessageAttributeNames=['All'],
            )
            # Print out the messages - in case some are not processed...
            for message in messages: log_message(message)
            for message in messages:
                print(f'INFO(main): message id: {message.message_id}', flush=True)
                try:
                    # message.change_visibility(
                    #     VisibilityTimeout=MAX_SQS_VISIBILITY_TIMEOUT,
                    # )
                    process_message(message)
                    message.delete()
                except Exception as e:
                    ## Set back to the SQS Queue's default visibility timeout upon an exception
                    # message.change_visibility(
                    #     VisibilityTimeout=int(SQS_QUEUE.attributes['VisibilityTimeout']),
                    # )
                    print(f'exception while processing message: {repr(e)}', flush=True)
                    continue
    print('...ending', flush=True)

if __name__ == '__main__':
    main()
else:
    print(f'{__name__} is not accounted for', flush=True)