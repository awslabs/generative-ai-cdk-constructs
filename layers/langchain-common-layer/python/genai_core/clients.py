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
import boto3
import os
import openai
from botocore.config import Config

def get_openai_client():
    api_key = os.environ['OPEN_API_KEY']
    if not api_key:
        return None

    openai.api_key = api_key

    return openai


def get_sagemaker_client():
    config = Config(retries={"max_attempts": 15, "mode": "adaptive"})

    client = boto3.client("sagemaker-runtime", config=config)

    return client
