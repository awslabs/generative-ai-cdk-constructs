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
import time
import boto3
from boto3.dynamodb.conditions import Key
from datetime import datetime, timedelta

batch_client = boto3.client("batch")

JOB_QUEUE_ARN = os.environ["JOB_QUEUE_ARN"]
JOB_DEFINITION_ARN = os.environ["JOB_DEFINITION_ARN"]
TARGETS_TABLE_NAME = os.environ["TARGETS_TABLE_NAME"]
JOBS_TABLE_NAME = os.environ["JOBS_TABLE_NAME"]

dynamodb = boto3.resource("dynamodb")
targets_table = dynamodb.Table(TARGETS_TABLE_NAME)
jobs_table = dynamodb.Table(JOBS_TABLE_NAME)


def handler(event, context) -> dict:
    print(event)

    targets = get_targets()
    print(f"Found: {len(targets)} targets")

    for target in targets:
        target_url = target["target_url"]
        last_finished_job_id = target.get("last_finished_job_id")
        crawl_interval_hours = target.get("crawl_interval_hours")
        print(target)

        if not crawl_interval_hours:
            print(f"No crawl_interval_hours for {target_url}")
            continue

        unfinished_jobs = get_unfinished_jobs_for_target(target_url)
        if len(unfinished_jobs) > 0:
            print(f"Unfinished jobs for {target_url}", unfinished_jobs)
            continue
        else:
            print(f"No unfinished jobs for {target_url} found")

        if not last_finished_job_id:
            print(f"No last finished job for {target_url}")
            run_job(target_url)
            continue

        last_finished_job = get_last_finished_job(target_url, last_finished_job_id)
        if not last_finished_job:
            print(f"No last finished job for {target_url}")
            run_job(target_url)
            continue

        last_interval_start_timestamp = int(
            round(
                datetime.timestamp(
                    datetime.now() - timedelta(hours=int(crawl_interval_hours))
                )
                * 1000
            )
        )

        print(f"Last interval start timestamp: {last_interval_start_timestamp}")
        last_finished_job_updated_at = int(last_finished_job["updated_at"])
        if last_finished_job_updated_at <= last_interval_start_timestamp:
            print(f"Time to run a job for {target_url}")
            run_job(target_url)
        else:
            print(f"Skipping job for {target_url}")
            continue

    return {"ok": True}


def get_targets():
    targets = []

    response = targets_table.scan(
        ConsistentRead=True,
    )
    targets.extend(response["Items"])

    while "LastEvaluatedKey" in response:
        response = targets_table.scan(
            ExclusiveStartKey=response["LastEvaluatedKey"],
            ConsistentRead=True,
        )
        targets.extend(response["Items"])

    return targets


def get_unfinished_jobs_for_target(target_url):
    response = jobs_table.query(
        KeyConditionExpression=Key("target_url").eq(target_url),
        ScanIndexForward=False,
        ConsistentRead=True,
        Limit=10,
    )

    jobs = response["Items"]
    print(f"Jobs for {target_url}", jobs)

    # Check if any job is not "finished" or "failed" and updated_at is newer than 24 hours
    twenty_four_hours_ago = int(
        round(datetime.timestamp(datetime.now() - timedelta(days=1) * 1000))
    )

    unfinished_jobs = [
        job
        for job in jobs
        if job["status"] not in ["finished", "failed"]
        and int(job["updated_at"]) >= twenty_four_hours_ago
    ]

    return unfinished_jobs


def get_last_finished_job(target_url, last_finished_job_id):
    response = jobs_table.query(
        KeyConditionExpression=Key("target_url").eq(target_url)
        & Key("job_id").eq(last_finished_job_id),
        ConsistentRead=True,
    )

    items = response["Items"]
    if not items:
        return None

    return items[0]


def run_job(target_url):
    timestamp = int(round(time.time()))

    response = batch_client.submit_job(
        jobName=f"webcrawler-scheduler-{timestamp}",
        jobQueue=JOB_QUEUE_ARN,
        jobDefinition=JOB_DEFINITION_ARN,
        containerOverrides={
            "environment": [
                {"name": "TARGET_URL", "value": target_url},
            ],
        },
    )

    print(response)

    return response
