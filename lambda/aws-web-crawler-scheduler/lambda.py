import os
import time
import boto3
import logging
from boto3.dynamodb.conditions import Key
from datetime import datetime, timedelta

logger = logging.getLogger()
batch_client = boto3.client("batch")

JOB_QUEUE_ARN = os.environ["JOB_QUEUE_ARN"]
JOB_DEFINITION_ARN = os.environ["JOB_DEFINITION_ARN"]
SITES_TABLE_NAME = os.environ["SITES_TABLE_NAME"]
JOBS_TABLE_NAME = os.environ["JOBS_TABLE_NAME"]

dynamodb = boto3.resource("dynamodb")
sites_table = dynamodb.Table(SITES_TABLE_NAME)
jobs_table = dynamodb.Table(JOBS_TABLE_NAME)


def handler(event, context) -> dict:
    logger.info("Event", event)

    sites = get_sites()
    logger.info(f"Found: {len(sites)} sites")

    for site in sites:
        site_url = site["site_url"]
        last_finished_job_id = site.get("last_finished_job_id")
        crawl_interval_days = site.get("crawl_interval_days")
        logger.info(f"Site: {site_url}, last_finished_job_id: {last_finished_job_id}")

        if not crawl_interval_days:
            logger.info(f"No crawl_interval_days for {site_url}")
            continue

        unfinished_jobs = get_unfinished_jobs_for_site(site_url)
        if len(unfinished_jobs) > 0:
            logger.info(f"Unfinished jobs for {site_url}", unfinished_jobs)
            continue
        else:
            logger.info(f"No unfinished jobs for {site_url} found")

        if not last_finished_job_id:
            logger.info(f"No last finished job for {site_url}")
            run_job(site_url)
            continue

        last_finished_job = get_last_finished_job(site_url, last_finished_job_id)
        if not last_finished_job:
            logger.info(f"No last finished job for {site_url}")
            run_job(site_url)
            continue

        last_interval_start_timestamp = int(
            round(
                datetime.timestamp(datetime.now() - timedelta(days=crawl_interval_days))
            )
        )

        if last_finished_job["updated_at"] <= last_interval_start_timestamp:
            logger.info(f"Time to run a job for {site_url}")
            run_job(site_url)
        else:
            logger.info(f"Skipping job for {site_url}")
            continue

    return {"ok": True}


def get_sites():
    sites = []

    response = sites_table.scan()
    sites.extend(response["Items"])

    while "LastEvaluatedKey" in response:
        response = sites_table.scan(ExclusiveStartKey=response["LastEvaluatedKey"])
        sites.extend(response["Items"])

    return sites


def get_unfinished_jobs_for_site(site_url):
    response = jobs_table.query(
        KeyConditionExpression=Key("site_url").eq(site_url),
        ScanIndexForward=False,
        ConsistentRead=True,
        Limit=10,
    )

    jobs = response["Items"]
    logger.info(f"Jobs for {site_url}", jobs)

    # Check if any job is not "finished" or "failed" and updated_at is newer than 24 hours
    twenty_four_hours_ago = int(
        round(datetime.timestamp(datetime.now() - timedelta(days=1)))
    )

    unfinished_jobs = [
        job
        for job in jobs
        if job["status"] not in ["finished", "failed"]
        and job["updated_at"] >= twenty_four_hours_ago
    ]

    return unfinished_jobs


def get_last_finished_job(site_url, last_finished_job_id):
    response = jobs_table.query(
        KeyConditionExpression=Key("site_url").eq(site_url)
        & Key("job_id").eq(last_finished_job_id),
        ConsistentRead=True,
    )

    items = response["Items"]
    if not items:
        return None

    return items[0]


def run_job(site_url):
    timestamp = int(round(time.time()))

    response = batch_client.submit_job(
        jobName=f"webcrawler-scheduler-{timestamp}",
        jobQueue=JOB_QUEUE_ARN,
        jobDefinition=JOB_DEFINITION_ARN,
        containerOverrides={
            "environment": [
                {"name": "SITE_URL", "value": site_url},
            ],
        },
    )

    logger.info(response)

    return response
