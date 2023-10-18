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
import os
import nltk
import boto3

from aws_lambda_powertools import Logger, Tracer

logger = Logger(service="SUMMARY_GENERATION")
tracer = Tracer(service="SUMMARY_GENERATION")

def set_nltk_data():
    root = os.path.dirname(os.path.abspath(__file__))
    download_dir = os.path.join(root, "nltk_data")
    nltk.data.path.append(download_dir)


def set_transformer_cache_dir(pathdir):
    os.environ["TRANSFORMERS_CACHE"] = pathdir


# read text file √from s3 bucket
def read_file_from_s3(bucket, key):
    try:
        s3 = boto3.resource("s3")
        obj = s3.Object(bucket, key)
        return obj.get()["Body"].read().decode("utf-8")
    except Exception as e:
        logger.exception(
            f"An error occured while attempting to read {key} from {bucket}.\n"
            f"Reason: {e}"
        )
        return None
