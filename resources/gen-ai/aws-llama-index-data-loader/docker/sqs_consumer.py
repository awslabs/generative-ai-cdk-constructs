#!/bin/env python3 -x -u
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
from sys import argv
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
    LOGGER.debug(f'"QUEUE_NAME" is {QUEUE_NAME}')
if BUCKET_NAME is None:
    raise AssertionError('BUCKET_NAME environment variable is not set')
else:
    LOGGER.debug(f'"BUCKET_NAME" is {BUCKET_NAME}')

SQS_QUEUE = SQS.get_queue_by_name(
    QueueName=QUEUE_NAME,
)
LOGGER.debug(f'Queue attributes {SQS_QUEUE.attributes}')

class SignalHandler:
    def __init__(self, sig):
        self.received_signal = False
        signal(sig, self._signal_handler)

    def _signal_handler(self, signal, frame):
        LOGGER.warning(f'handling signal {signal}, exiting gracefully')
        self.received_signal = True

def save_document(documents, serialize=True) -> None:
    save_result = False
    for document in documents:
        file_name = f"{document.metadata['file_name']}" if 'file_name' in document.metadata else '' 
        LOGGER.info(f'document id: {document.doc_id}')
        LOGGER.debug(f'document text: {document.text}')
        LOGGER.debug(f'document metadata: {document.metadata}')
        LOGGER.debug(f'document extra info: {document.extra_info}')
        data = document.text.encode()
        response = S3.put_object(
                Body=data,
                Bucket=BUCKET_NAME,
                Key=join(PREFIX, file_name, f'{document.doc_id}.txt'),
                ChecksumSHA256=b64encode(sha256(data).digest()).decode(),
                ChecksumAlgorithm='SHA256',
        )
        LOGGER.debug(f'put_object {response}')
        save_result = True
        if serialize:
            frozen = encode(document)
            body = frozen.encode()
            LOGGER.debug(f'frozen {frozen}')
            frozen_response = S3.put_object(
                Body=body,
                Bucket=BUCKET_NAME,
                Key=join(PREFIX, file_name, f'{document.doc_id}.json'),
                ChecksumSHA256=b64encode(sha256(body).digest()).decode(),
                ChecksumAlgorithm='SHA256',
            )
            LOGGER.debug(f'frozen put_object {frozen_response}')
    return save_result

def load_document(filename) -> bool:
    load_result = False
    LOGGER.debug(f'loading filename {filename}')
    reader = SimpleDirectoryReader(
        fs=S3FileSystem(),
        input_files=[filename],
        raise_on_error=True,
    )
    LOGGER.debug(f'readed filename {filename}')
    documents = reader.load_data()
    if len(documents):
        LOGGER.debug(f'There are {len(documents)} documents')
    else:
        LOGGER.warning(f'TODO: There are no documents')
        raise AssertionError('No documents found')
    LOGGER.debug(f'loaded filename {filename}')
    load_result = save_document(documents)
    LOGGER.debug(f'saved filename {filename}')
    return load_result

def log_message(sqs_message) -> None:
    LOGGER.info(f'log message id: {sqs_message.message_id}')
    LOGGER.debug(f'message attributes: {sqs_message.message_attributes}')
    LOGGER.debug(f'message available subresources: {sqs_message.get_available_subresources()}')
    LOGGER.debug(f'attributes: {sqs_message.attributes}')
    LOGGER.debug(f'body: {sqs_message.body}')
    LOGGER.debug(f'md5 of body: {sqs_message.md5_of_body}')
    LOGGER.debug(f'md5 of message attributes: {sqs_message.md5_of_message_attributes}')

def process_message(sqs_message) -> bool:
    process_result = False
    LOGGER.info(f'process message id: {sqs_message.message_id}')
    json_message = loads(sqs_message.body)
    if 'Type' in json_message and json_message['Type'] == 'Notification':
        if 'Message' in json_message and json_message['Message'] != '' and 'Subject' in json_message and json_message['Subject'] == 'Amazon S3 Notification':
            message_content = loads(json_message['Message'])
            if 'Records' in message_content:
                for record in message_content['Records']:
                    if 'eventName' in record and record['eventName'].startswith('ObjectCreated') and 's3' in record and 'object' in record['s3'] and 'key' in record['s3']['object'] and 'bucket' in record['s3'] and 'name' in record['s3']['bucket']:
                        LOGGER.info(f's3 object key: {record["s3"]["object"]["key"]} in {record["s3"]["bucket"]["name"]}')
                        process_result = load_document(join(record['s3']['bucket']['name'], record['s3']['object']['key']))
                    else:
                        LOGGER.warning(f'skipped: {record}')
            else:
                LOGGER.warning(f'missing records: {message_content}')
        else:
            LOGGER.warning(f'unknown message: {json_message}')
    else:
        LOGGER.warning(f'unknown message type: {json_message}')
    return process_result

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
            LOGGER.info(f'Circuit breaker="{circuit_breaker}" for SSM parameter "{CIRCUIT_BREAKER_SSM_PARAMETER_NAME}" to process the SQS queue named "{QUEUE_NAME}"')
            if response_get_parameter['Parameter']['Value'] == 'True':
                tripped = True
        except ClientError as exc:
            if exc.response['Error']['Code'] == 'ParameterNotFound':
                pass
            else:
                raise exc
    return tripped

def main():
    LOGGER.critical('starting...')
    LOGGER.warning(f'A circuit breaker SSM parameter "{CIRCUIT_BREAKER_SSM_PARAMETER_NAME}" is being checked TTL of {CIRCUIT_BREAKER_CACHE_TTL} seconds, create it to skip long polling the SQS Queue "{QUEUE_NAME}"')
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
            LOGGER.info('💥' * looper)
            sleep(WAIT_TIME_SECONDS)
        else:
            LOGGER.info('🏃' * looper)
            messages = SQS_QUEUE.receive_messages(
                MaxNumberOfMessages=10, # 1-10 messages
                WaitTimeSeconds=WAIT_TIME_SECONDS, # 0-20 seconds
                AttributeNames=['All'],
                MessageAttributeNames=['All'],
            )
            # Print out the messages - in case some are not processed...
            for message in messages: log_message(message)
            for message in messages:
                LOGGER.info(f'main message id: {message.message_id}')
                try:
                    ## Consider setting the visibility high to avoid running multiple times.
                    # message.change_visibility(
                    #     VisibilityTimeout=MAX_SQS_VISIBILITY_TIMEOUT,
                    # )
                    if process_message(message):
                        message.delete()
                except Exception as e:
                    ## Set back to the SQS Queue's default visibility timeout upon an exception
                    # message.change_visibility(
                    #     VisibilityTimeout=int(SQS_QUEUE.attributes['VisibilityTimeout']),
                    # )
                    LOGGER.error(f'exception while processing message: {repr(e)}')
                    continue
    LOGGER.critical('...ending')

if __name__ == '__main__':
    main()
else:
    LOGGER.warning(f'{__name__} is not accounted for')
