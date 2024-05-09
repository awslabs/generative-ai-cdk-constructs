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

## Overview

The WebCrawler construct provided here simplifies website crawling. It can crawl websites and RSS feeds on a schedule and store changeset data on S3.

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
          crawlIntervalHours: 1,
          maxRequests: 250,
        },
        {
          url: 'https://aws.amazon.com/about-aws/whats-new/recent/feed',
          targetType: CrawlerTargetType.RSS_FEED,
          crawlIntervalHours: 1,
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
                    'crawl_interval_hours': 1,
                    'max_requests': 250,
                },
                {
                    'url': 'https://aws.amazon.com/about-aws/whats-new/recent/feed',
                    'target_type': CrawlerTargetType.RSS_FEED,
                    'crawl_interval_hours': 1,
                }
            ]
        )
```

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