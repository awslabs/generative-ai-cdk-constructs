import os
import sys
import json
import boto3
import trafilatura
import trafilatura.filters
from io import TextIOWrapper
from tempfile import NamedTemporaryFile
from botocore.exceptions import ClientError

OUTPUT_PATH = os.environ.get("OUTPUT_PATH")
DATA_BUCKET_NAME = os.environ.get("DATA_BUCKET_NAME")
SITES_TABLE_NAME = os.environ.get("SITES_TABLE_NAME")
JOBS_TABLE_NAME = os.environ.get("JOBS_TABLE_NAME")
PAGES_FILE_NAME = os.environ.get("PAGES_FILE_NAME")
PAGES_FILE_PATH = os.environ.get("PAGES_FILE_PATH")
SITE_ID = os.environ.get("SITE_ID")
JOB_ID = os.environ.get("JOB_ID")

dynamodb = boto3.resource("dynamodb")
s3 = boto3.client("s3")


def main():
    print("HTML parsing script started", flush=True)
    site_data = get_site_by_id(SITE_ID)

    if not site_data:
        print(f"Site with ID {SITE_ID} not found", flush=True)
        return

    prev_changeset = get_prev_changeset(site_data)
    print(f"Previous changeset len: {len(prev_changeset)}", flush=True)
    pages_changeset_path = os.path.join(OUTPUT_PATH, "pages_changeset.jsonl")
    pages_changeset_s3_key = f"{SITE_ID}/jobs/{JOB_ID}/pages_changeset.jsonl"

    if os.path.exists(PAGES_FILE_PATH):
        with open(PAGES_FILE_PATH, "r") as file:
            process_lines(prev_changeset, pages_changeset_path, file)
    else:
        print(f"File {PAGES_FILE_PATH} does not exist", flush=True)
        files_file_key = f"{SITE_ID}/jobs/{JOB_ID}/{PAGES_FILE_NAME}"
        with NamedTemporaryFile(dir="/tmp") as temp_file:
            try:
                s3.download_file(DATA_BUCKET_NAME, files_file_key, temp_file.name)
                print(f"Data downloaded to {temp_file.name}", flush=True)

                with open(temp_file.name, "r") as file:
                    process_lines(prev_changeset, pages_changeset_path, file)
            except ClientError as e:
                if e.response["Error"]["Code"] == "404":
                    print(f"Does not exist: {files_file_key}", flush=True)
                else:
                    raise

    s3.upload_file(pages_changeset_path, DATA_BUCKET_NAME, pages_changeset_s3_key)


def get_site_by_id(site_id: str):
    table = dynamodb.Table(SITES_TABLE_NAME)
    try:
        response = table.get_item(Key={"site_id": site_id}, ConsistentRead=True)
        item = response.get("Item")
        if item:
            return item
        else:
            return None
    except ClientError as error:
        print(f"An error occurred: {error}", flush=True)
        return None


def get_prev_changeset(site_data: dict):
    last_finished_job_id = site_data.get("last_finished_job_id")
    print(f"Last finished job ID: {last_finished_job_id}", flush=True)

    if not last_finished_job_id or last_finished_job_id == JOB_ID:
        return dict({})

    last_changeset_s3_key = (
        f"{SITE_ID}/jobs/{last_finished_job_id}/pages_changeset.jsonl"
    )

    with NamedTemporaryFile(dir="/tmp") as temp_file:
        try:
            s3.download_file(DATA_BUCKET_NAME, last_changeset_s3_key, temp_file.name)
            print(f"Previous changeset downloaded to {temp_file.name}", flush=True)

            prev_changeset = dict({})
            with open(temp_file.name, "r") as file:
                for line in file:
                    page_data = json.loads(line)
                    if page_data:
                        url = page_data.get("url")
                        prev_changeset[url] = {
                            "fingerprint": page_data.get("fingerprint"),
                            "operation": page_data.get("operation"),
                        }

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


def process_lines(prev_changeset: dict, pages_changeset_path: str, file: TextIOWrapper):
    urls = set({})
    with open(pages_changeset_path, "w") as changeset_file:
        for idx, line in enumerate(file):
            if idx % 100 == 0:
                print(f"Parsed {idx} pages", flush=True)

            page_data = json.loads(line)
            content = page_data.get("content")

            try:
                page_url = page_data.get("url")
                prev_data = prev_changeset.get(page_url)
                extracted_data = trafilatura.extract(
                    content, output_format="json", favor_precision=True
                )
                extracted_data = json.loads(extracted_data)
                extracted_content = extracted_data.get("raw_text")
                content_fingerprint = extracted_data.get("fingerprint")
                page_data["fingerprint"] = content_fingerprint
                page_data["content"] = extracted_content

                operation = "not_changed"
                if not prev_data:
                    operation = "created"
                elif prev_data.get("fingerprint") != content_fingerprint:
                    operation = "updated"

                page_data["operation"] = operation
                urls.add(page_url)

                changeset_file.write(json.dumps(page_data) + "\n")
            except Exception as e:
                print(f"Error processing page: {e}", flush=True)
                continue

        for url, data in prev_changeset.items():
            prev_operation = data.get("operation", "deleted")
            if prev_operation == "deleted":
                continue

            if url not in urls:
                deleted_page_data = {"url": url, "operation": "deleted"}
                changeset_file.write(json.dumps(deleted_page_data) + "\n")

    print(f"Parsed {idx} pages. Done.", flush=True)


if __name__ == "__main__":
    sys.exit(main())
