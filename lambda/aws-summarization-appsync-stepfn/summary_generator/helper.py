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
