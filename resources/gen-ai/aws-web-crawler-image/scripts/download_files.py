import os
import sys
import json
import boto3
import hashlib
import tempfile
import requests
from time import sleep
from io import TextIOWrapper
from typing import Any
from tempfile import NamedTemporaryFile
from botocore.exceptions import ClientError

OUTPUT_PATH = os.environ.get("OUTPUT_PATH")
FILE_FILE_NAME = os.environ.get("FILES_FILE_NAME")
FILES_FILE_PATH = os.environ.get("FILES_FILE_PATH")
DATA_BUCKET_NAME = os.environ.get("DATA_BUCKET_NAME")
TARGETS_TABLE_NAME = os.environ.get("TARGETS_TABLE_NAME")
TARGET_URL = os.environ.get("TARGET_URL")
JOB_ID = os.environ.get("JOB_ID")

MAX_FILE_SIZE_IN_BYTES = 100 * 1024 * 1024  # 100 MB
MAX_FILES = 500
DEFAULT_FILE_TYPES = [
    "csv",
    "doc",
    "docx",
    "odt",
    "pdf",
    "ppt",
    "pptx",
    "tsv",
    "xlsx",
    "eml",
    "md",
    "msg",
    "rst",
    "rtf",
    "txt",
    "xml",
]

dynamodb = boto3.resource("dynamodb")
s3 = boto3.client("s3")

headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
}


def main():
    print("Download files script started", flush=True)
    print(f"Files file path: {FILES_FILE_PATH}", flush=True)
    target_data = get_target_by_url(TARGET_URL)
    target_url = target_data.get("target_url")
    target_s3_key = target_data.get("target_s3_key")

    if not target_data:
        print(f'Target with url "{target_url}" not found', flush=True)
        return

    prev_changeset = get_prev_changeset(target_data)
    print(f"Previous changeset len: {len(prev_changeset)}", flush=True)
    changeset = dict({})

    if os.path.exists(FILES_FILE_PATH):
        with open(FILES_FILE_PATH, "r") as file:
            process_lines(target_data, prev_changeset, changeset, file)
    else:
        print(f"File {FILES_FILE_PATH} does not exist", flush=True)
        files_file_s3_key = f"{target_s3_key}/jobs/{JOB_ID}/{FILE_FILE_NAME}"
        with NamedTemporaryFile(dir="/tmp") as temp_file:
            try:
                s3.download_file(DATA_BUCKET_NAME, files_file_s3_key, temp_file.name)
                print(f"Data downloaded to {temp_file.name}", flush=True)

                with open(temp_file.name, "r") as file:
                    process_lines(target_data, prev_changeset, changeset, file)
            except ClientError as e:
                if e.response["Error"]["Code"] == "404":
                    print(f"The object {files_file_s3_key} does not exist", flush=True)
                else:
                    raise

    save_changeset(target_data, prev_changeset, changeset)


def get_target_by_url(target_url: str):
    table = dynamodb.Table(TARGETS_TABLE_NAME)
    try:
        response = table.get_item(Key={"target_url": target_url}, ConsistentRead=True)
        item = response.get("Item")
        if item:
            return item
        else:
            return None
    except ClientError as error:
        print(f"An error occurred: {error}", flush=True)
        return None


def get_prev_changeset(target_data: dict):
    last_finished_job_id = target_data.get("last_finished_job_id")
    target_s3_key = target_data.get("target_s3_key")

    print(f"Last finished job ID: {last_finished_job_id}", flush=True)
    if not last_finished_job_id or last_finished_job_id == JOB_ID:
        return dict({})

    last_changeset_s3_key = (
        f"{target_s3_key}/jobs/{last_finished_job_id}/files_changeset.jsonl"
    )

    with NamedTemporaryFile(dir="/tmp") as temp_file:
        try:
            s3.download_file(DATA_BUCKET_NAME, last_changeset_s3_key, temp_file.name)
            print(f"Previous changeset downloaded to {temp_file.name}", flush=True)

            prev_changeset = dict({})
            with open(temp_file.name, "r") as file:
                for line in file:
                    file_data = json.loads(line)
                    if file_data:
                        file_url = file_data.get("url")
                        prev_changeset[file_url] = file_data

            return prev_changeset
        except ClientError as e:
            if e.response["Error"]["Code"] == "404":
                print(
                    f"Previous changeset does not exist: {last_changeset_s3_key}",
                    flush=True,
                )
            else:
                raise

    return dict({})


def save_changeset(target_data: dict, prev_changeset: dict, changeset: dict):
    target_s3_key = target_data.get("target_s3_key")
    files_changeset_path = os.path.join(OUTPUT_PATH, "files_changeset.jsonl")
    files_changeset_s3_key = f"{target_s3_key}/jobs/{JOB_ID}/files_changeset.jsonl"

    for url, data in prev_changeset.items():
        prev_operation = data.get("operation", "deleted")
        if prev_operation == "deleted":
            continue

        if url not in changeset:
            changeset[url] = {**data, "operation": "deleted"}

    with open(files_changeset_path, "w") as file:
        for _, data in changeset.items():
            file.write(json.dumps(data) + "\n")

    s3.upload_file(files_changeset_path, DATA_BUCKET_NAME, files_changeset_s3_key)


def process_lines(
    target_data: dict, prev_changeset: dict, changeset: dict, file: TextIOWrapper
):
    max_files = target_data.get("max_files", MAX_FILES)
    if max_files <= 0:
        max_files = MAX_FILES

    file_types = target_data.get("file_types", DEFAULT_FILE_TYPES)
    if not file_types:
        file_types = DEFAULT_FILE_TYPES

    idx = 0
    urls_set = set()
    for line in file:
        file_data = json.loads(line)
        file_type = file_data.get("file_type")

        if file_type not in file_types:
            continue

        if idx >= max_files:
            print(f"Max files limit reached: {max_files}", flush=True)
            break
        idx += 1

        file_url = file_data.get("url")
        if not file_url:
            continue
        file_url = file_url.strip()

        lowercase_file_url = file_url.lower()
        if not lowercase_file_url.startswith(
            "https://"
        ) and not lowercase_file_url.startswith("http://"):
            print(f"Invalid URL: {file_url}", flush=True)
            continue

        if file_url in urls_set:
            continue

        urls_set.add(file_url)

        try:
            item = process_file(target_data, prev_changeset, file_url, file_type)
            if item:
                changeset[file_url] = item
        except Exception as e:
            print(f"Error: {e}", flush=True)


def process_file(
    target_data: dict, prev_changeset: dict, file_url: str, file_type: str
):
    target_s3_key = target_data.get("target_s3_key")
    response = requests.head(file_url, headers=headers, timeout=60)
    if response.status_code not in [200, 301, 302]:
        print(f"Status code is {response.status_code}: {file_url}", flush=True)
        return None

    headers_data = {
        "content_length": int(response.headers.get("Content-Length", -1)),
        "last_modified": response.headers.get("Last-Modified"),
        "content_type": response.headers.get("Content-Type"),
    }

    if headers_data["content_type"] == "text/html":
        print(f'Content type is "text/html": {file_url}', flush=True)
        return None

    file_size = headers_data["content_length"]
    last_modified = headers_data["last_modified"]

    prev_data = prev_changeset.get(file_url)
    if prev_data:
        prev_file_size = prev_data.get("file_size", 0)
        prev_last_modified = prev_data.get("last_modified")

        if prev_file_size == file_size and prev_last_modified == last_modified:
            print(f"Exists: {file_url}", flush=True)
            sleep(0.25)
            return {**prev_data, "operation": "not_changed"}

    file_data = {
        "url": file_url,
        "file_type": file_type,
        "file_size": file_size,
        "last_modified": last_modified,
        "checksum": None,
        "s3_key": None,
        "operation": "not_changed",
    }

    if file_size > 0:
        file_size_mb = file_size / (1024 * 1024)
        if file_size >= MAX_FILE_SIZE_IN_BYTES:
            print(f"Too large: {file_size_mb:.2f} MB: {file_url}", flush=True)
            return file_data

    with tempfile.NamedTemporaryFile(delete=True) as temp_file:
        file_size = download_file(file_url, temp_file)
        checksum = get_checksum(temp_file)
        file_s3_key = f"{target_s3_key}/files/{checksum}.{file_type}"
        file_data["checksum"] = checksum
        file_data["file_size"] = file_size
        file_data["s3_key"] = file_s3_key

        if upload_file_to_s3(temp_file.name, file_s3_key):
            file_data["operation"] = "updated" if prev_data else "created"

    return file_data


def download_file(file_url: str, file: Any):
    response = requests.get(file_url, headers=headers, timeout=60, stream=True)

    file_size = 0
    for chunk in response.iter_content(chunk_size=8192):
        file_size += len(chunk)
        if file_size > MAX_FILE_SIZE_IN_BYTES:
            raise Exception(f"Too large: {file_url}")

        file.write(chunk)

    file.flush()
    file.seek(0)

    return file_size


def get_checksum(file: NamedTemporaryFile):
    # Calculate the SHA256 checksum of the file
    sha256_hash = hashlib.sha384()

    for chunk in iter(lambda: file.read(4096), b""):
        sha256_hash.update(chunk)
    checksum = sha256_hash.hexdigest()

    return checksum


def upload_file_to_s3(file_path: str, s3_file_key: str):
    try:
        s3.head_object(Bucket=DATA_BUCKET_NAME, Key=s3_file_key)
        print(f"Exists: {s3_file_key}", flush=True)
    except ClientError as e:
        # If a ClientError is thrown, then check if it was a 404 error.
        # If it was a 404 error, then the object does not exist.
        if e.response["Error"]["Code"] == "404":
            # File does not exist, upload it
            s3.upload_file(file_path, DATA_BUCKET_NAME, s3_file_key)
            print(f"Uploaded: {s3_file_key}", flush=True)

            return True
        else:
            print(f"Error checking file {s3_file_key}: {e}", flush=True)

    return False


if __name__ == "__main__":
    sys.exit(main())
