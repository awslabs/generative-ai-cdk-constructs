# aws-web-crawler
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->

| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|

## Table of contents
- [Overview](#overview)
- [Pattern Construct Props](#pattern-construct-props)
- [Target Properties](#target-properties)
- [Crawler Output](#crawler-output)
- [Architecture](#architecture)
- [Cost](#cost)
- [Security](#security)
- [Quotas](#quotas)
- [Clean up](#clean-up)

## Overview

The WebCrawler construct provided here simplifies website crawling. It can crawl websites and RSS feeds on a schedule and store changeset data on S3. WebCrawler construct used [Crawlee](https://crawlee.dev/) library to crawl websites. 

Crawling will begin shortly after the stack deployment. Please allow up to **15 minutes** for it to start the first time. 

All job status changes are notified via the SNS Topic available through the `snsTopic` property.

Here is a minimal deployable pattern definition:

TypeScript
```typescript
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CrawlerTargetType, WebCrawler } from '@cdklabs/generative-ai-cdk-constructs';

export class SampleStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new WebCrawler(this, 'WebCrawler', {
      targets: [
        {
          url: 'https://cloudprice.net/aws/ec2',
          targetType: CrawlerTargetType.WEBSITE,
          crawlIntervalHours: 24,
          maxRequests: 15000,
        },
        {
          url: 'https://aws.amazon.com/about-aws/whats-new/recent/feed',
          targetType: CrawlerTargetType.RSS_FEED,
          crawlIntervalHours: 24,
        },
      ],
    });
  }
}

```

Python
```python
from aws_cdk import Stack
from constructs import Construct
from cdklabs.generative_ai_cdk_constructs import WebCrawler, CrawlerTargetType

class SampleStack(Stack):
    def __init__(self, scope: Construct, id: str, **kwargs):
        super().__init__(scope, id, **kwargs)

        WebCrawler(self, 'WebCrawler',
            targets=[
                {
                    'url': 'https://cloudprice.net/aws/ec2',
                    'target_type': CrawlerTargetType.WEBSITE,
                    'crawl_interval_hours': 24,
                    'max_requests': 15000,
                },
                {
                    'url': 'https://aws.amazon.com/about-aws/whats-new/recent/feed',
                    'target_type': CrawlerTargetType.RSS_FEED,
                    'crawl_interval_hours': 24,
                }
            ]
        )
```

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC can be used to deploy the construct.|
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Security group for the Lambda function which this construct will use. If no exisiting security group is provided it will create one from the VPC.|
| observability | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enables observability on all services used. Warning: associated costs with the services used. It is a best practice to enable by default. Defaults to true.|
| enableOperationalMetric | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | CDK construct collect anonymous operational metrics to help AWS improve the quality and features of the constructs. Data collection is subject to the AWS Privacy Policy (https://aws.amazon.com/privacy/). To opt out of this feature, simply disable it by setting the construct property "enableOperationalMetric" to false for each construct used. Defaults to true.|
| stage | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Value will be appended to resources name service. |
| targets | CrawlerTarget[] | ![Optional](https://img.shields.io/badge/optional-4169E1) | Target websited and RSS feeds to be crawled |


## Target Properties

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| url | string | ![Required](https://img.shields.io/badge/required-ff0000) | Target URL to be crawled. |
| targetType | CrawlerTargetType | ![Required](https://img.shields.io/badge/required-ff0000) | Is it a website of RSS feed |
| maxRequests | number | ![Optional](https://img.shields.io/badge/optional-4169E1) |  Maximum number of requests to be made by crawler. |
| downloadFiles | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) |  Download files from the web site. |
| maxFiles | number | ![Optional](https://img.shields.io/badge/optional-4169E1) | Maximum number of files to be downloaded. |
| fileTypes | string[] | ![Optional](https://img.shields.io/badge/optional-4169E1) | File types (extensions) to be downloaded like "pdf". If no file types specified comman file types will be downloaded. |
| ignoreRobotsTxt | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Index pages that are disallowed by the robots.txt policy. |
| crawlIntervalHours | number | ![Optional](https://img.shields.io/badge/optional-4169E1) | Schedule the crawler to run every N hours following the completion of the previous job.  |

## Crawler Output

S3 output bucket names is available via `dataBucket` property. Data is stored on S3 in the following format:
- /{target_key}/files/{file_name}
- /{target_key}/jobs/{job_id}/{data_file}

| File Name | Description |
| -------- | ------- |
| crawl_data.jsonl | Raw HTML crawler output |
| crawl_files.jsonl| Links to files found on crawled pages |
| crawl_errors.jsonl| Crawler errors |
| crawl_sitemaps.jsonl| Links found in sitemaps |
| pages_changeset.jsonl| Cleaned data in text format from the pages, including information on whether the page was created, updated, deleted or not changed after a previous crawl. |
| files_changeset.jsonl| All downloaded files data including S3 key and information on whether the file was added, changed, or deleted after a previous crawl |

All files are stored in jsonl format (JSON Lines) and can be processed line by line. Here is a Python snippet.

```python
import json

with open(FILE_NAME, 'r') as file:
    for line in file:
        try:
            json_data = json.loads(line)
            # TODO: Process the JSON data
        except json.JSONDecodeError as e:
            print(f"Error decoding JSON: {e}")
```

Page records have the following format

```ts
{
  content_type: string;
  url: string;
  base_url?: string;
  file_type?: string;
  canonical?: string;
  meta?: {
    title?: string;
    description?: string;
    keywords?: string;
    author?: string;
  }
  content?: string;
  fingerprint?: string;
  operation?: string;
}
```

File records have the following format

```ts
{
  url: string;
  file_type: string;
  file_size: number;
  last_modified: string,
  checksum?: string,
  s3_key?: string
  operation?: string;
}
```

Operations:
- not_changed
- created
- updated
- deleted

## Architecture
![Architecture Diagram](architecture.png)

## Cost

When deploying this architecture, you as the customer are responsible for the costs of the AWS services utilized. Based on current pricing in the US East (N. Virginia) region, operating this infrastructure with the default configuration to crawle websites every day for 4 hours is estimated to cost approximately $52.75 per month. This cost estimate includes usage of the various AWS services leveraged in this architecture such as AWS Lambda, AWS Batch, AWS Fargate, and Amazon S3. 

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.

| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| Amazon Virtual Private Cloud |  | 37.35 |
| Amazon Simple Storage Service (S3) | 100 GB / month | 2.30 |
| AWS Fargate | 4 hours per day  | 13.10 |


## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

You can visit the [official documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/best-practice-endpoint-security.html) for security best practices related to Amazon SageMaker endpoints.

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution and the associated instance types. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

## Clean up

When deleting your stack which uses this construct, do not forget to go over the following instructions to avoid unexpected charges:
  - delete the logs uploaded to the account

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.