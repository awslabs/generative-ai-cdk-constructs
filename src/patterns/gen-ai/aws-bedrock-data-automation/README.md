# aws-bedrock-data-automation

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->


| **Language**                                                                                   | **Package**                             |
| :----------------------------------------------------------------------------------------------- | ----------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs` |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`  |
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

## Table of contents

  - [Overview](#overview)
  - [Initializer](#initializer)
  - [Pattern Construct Props](#pattern-construct-props)
  - [Pattern Properties](#pattern-properties)
  - [Methods](#methods)
  - [Default properties](#default-properties)
  - [Cost](#cost)
  - [Security](#security)
  - [Supported AWS Regions](#supported-aws-regions)
  - [Quotas](#quotas)



## Overview

The AWS Bedrock Data Automation construct simplifies the process of extracting insights from unstructured multimodal content (documents, images, video, and audio) using Amazon Bedrock Data Automation. It provides a complete infrastructure setup with Lambda functions for managing the entire workflow - from creating custom blueprints and projects to handling data processing automation and monitoring task status. The construct automates the deployment of necessary AWS resources and configures the required IAM permissions, making it easier for developers to build and manage intelligent document processing, media analysis, and other multimodal data-centric automation solutions.


## Pattern Construct Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| inputBucketName | string | No | Name of the S3 bucket for uploading blueprint schema file. If not provided, a new bucket will be created. |
| isCustomBDABlueprintRequired | boolean | No | Flag to indicate if custom Bedrock Data Automation blueprint creation is required. |
| isBDAProjectRequired | boolean | No | Flag to indicate if Bedrock Data Automation project creation is required. |
| isBDAInvocationRequired | boolean | No | Flag to indicate if Bedrock Data Automation invocation functionality is required. |
| isStatusRequired | boolean | No | Flag to indicate if status checking functionality is required. |
| outputBucketName | string | No | Name of the S3 bucket for storing output files. If not provided, a new bucket will be created when isBDAInvocationRequired is true. |
| outputFilename | string | No | Name of the output file for processed data. |


## Initializer

TypeScript:
```typescript
import { BedrockDataAutomation } from 'generative-ai-cdk-constructs';
import { EventbridgeToLambda } from '@aws-solutions-constructs/aws-eventbridge-lambda';


const bdaConstruct = new BedrockDataAutomation(this, 'MyBDAConstruct', {
  inputBucketName: 'XXXXXXXXXXXXXXX',
  outputBucketName: 'XXXXXXXXXXXXXXXX',
  isCustomBDABlueprintRequired: true,
  isBDAProjectRequired: true,
  isBDAInvocationRequired: true,
  isStatusRequired: true
});

// Frontend the construct with an eventbridge 
    const bluePrintFunction = bdaConstruct.blueprintLambdaFunction
    const blueprintEventbridge = new EventbridgeToLambda(this, 'CreateBlueprintEventRule', {
      existingLambdaObj: bluePrintFunction,
      eventRuleProps: {
        eventPattern: {
          source: ['custom.bedrock.blueprint'],
          detailType: ['Bedrock Blueprint Request'],
        }
      },
    });

```

```python
from generative_ai_cdk_constructs import BedrockDataAutomation

bda_construct = BedrockDataAutomation(self, "MyBDAConstruct",
    input_bucket_name="XXXXXXXXXXXXXXX",
    output_bucket_name="XXXXXXXXXXXXXXXX",
    is_custom_bda_blueprint_required=True,
    is_bda_project_required=True,
    is_bda_invocation_required=True,
    is_status_required=True
)

# Frontend the construct with an eventbridge 
EventbridgeToLambda(self, 'create_blueprint-lambda',
                    existing_lambda_obj=bda_construct
                    event_rule_props= {
                    event_pattern= {
                    source= ['custom.bedrock.blueprint'],
                    detail_type= ['Bedrock Blueprint Request'],
                    }
                    }
                    )
```

## Creating Custom Blueprints

The construct supports creation of custom blueprints for data processing automation through an EventBridge-triggered Lambda function. To enable this functionality, set `isCustomBDABlueprintRequired = true` in the construct props.

### Blueprint Creation Event Format

To create a new blueprint, send an event to EventBridge with the following structure:

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                "blueprint_name": "noa_bp",
                "blueprint_type": "DOCUMENT",
                "blueprint_stage": "LIVE",
                "operation": "CREATE",
                "schema_fields": [ // This is a sample schema, replace this with your expected blueprint schema.
                    {
                        "name": "Total income",
                        "description": "Please analyze the following Notice of assesment report and extract information about Total income.",
                        "alias": "Total income"
                    },
                    {
                        "name": "Taxable Income", 
                        "description": "Please analyze the following Notice of assesment report and extract information about Taxable income.",
                        "alias": "Taxable Income"
                    },
                    {
                        "name": "Tax payable",
                        "description": "Please analyze the following Notice of assesment report and extract information about Tax payable.",
                        "alias": "Tax payable"
                    }
                ]
            }
                    }
    ]
}
```
## Delete blueprint
```json

{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                "blueprint_arn": "XXXXXXXXX",
                "operation": "DELETE",
                
            }
                    }
    ]
}

```

## Creating Data Automation Projects

The construct enables creation and management of Bedrock Data Automation projects through an EventBridge-triggered Lambda function. To enable this functionality, set `isBDAProjectRequired = true` in the construct props.

### Project Creation Event Format

To create a new data automation project, send an event to EventBridge with the following structure:

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.project",
            "DetailType": "Bedrock Project Request",
            "Detail": {
                "project_name": "sample_proj",
                "project_description": "Sample Project",
                "project_stage": "LIVE",
                "operation": "CREATE"
            }
        }
    ]
}
```

## Delete project
```json

{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                "project_arn": "XXXXXXXXX",
                "operation": "DELETE",
                
            }
                    }
    ]
}

```

## Data Processing Invocations

The construct enables automated data processing through Bedrock Data Automation invocations. To enable this functionality, set `isBDAInvocationRequired = true` in the construct props.

### Invocation Event Format

To trigger data processing, send an event to EventBridge with the following structure:

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.invocation",
            "DetailType": "Bedrock Invoke Request",
            "Detail": {
                "input_filename": "sample_input.pdf",
                "output_filename": "sample_output.json",
                "blueprints": [{
                    "blueprint_arn":"XXXXXXX",
                    "stage":"LIVE"
                }],
            }
        }
    ]
}
```

## Processing Status Monitoring

The construct provides automated status monitoring for Bedrock Data Automation processing jobs. To enable this functionality, set `isStatusRequired = true` in the construct props.

### Status Check Event Format

To check the status of a processing job, send an event to EventBridge with the following structure:

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.status",
            "DetailType": "Bedrock Status Request",
            "Detail": {
                "invocation_arn": "XXXXXXXXX"
            }
        }
    ]
}

```

## Cost

You are responsible for the cost of the AWS services used while running this construct.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution:

- [AWS Lambda pricing](https://aws.amazon.com/lambda/pricing/)
- [Amazon CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)
- [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)

## Supported AWS Regions

Amazon Bedrock Data Automation is currently available only in US West (Oregon) Region - `us-west-2`. When deploying this construct, ensure your AWS CDK application is configured to deploy in the US West (Oregon) Region. If you attempt to deploy this construct in any other region, it will fail as the underlying Amazon Bedrock Data Automation service is not available. This regional limitation applies to all components of the construct, including blueprint creation, project management, data processing invocations, and status monitoring functionalities. We recommend monitoring the AWS Regional Services List for updates on regional availability expansions.

Note: While the construct must be deployed in US West (Oregon), you can still process data stored in S3 buckets from other regions, though this may incur additional cross-region data transfer costs.


## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

Optionnaly, you can provide existing resources to the constructs (marked optional in the construct pattern props). If you chose to do so, please refer to the official documentation on best practices to secure each service:

- [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/security.html)

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).


## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

---

&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
