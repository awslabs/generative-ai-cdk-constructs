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
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

## Table of contents

  - [Overview](#overview)
  - [Architecture](#architecture)
  - [Key Features](#key-features)
  - [Pattern Construct Props](#pattern-construct-props)
  - [Initializer](#initializer)
  - [Pattern Properties](#pattern-properties)
  - [Methods](#methods)
  - [Default properties](#default-properties)
  - [Cost](#cost)
  - [Security](#security)
  - [Supported AWS Regions](#supported-aws-regions)
  - [Quotas](#quotas)



## Overview

The Amazon Bedrock Data Automation construct simplifies the process of extracting insights from unstructured multimodal content (documents, images, video, and audio) using [Amazon Bedrock Data Automation](https://aws.amazon.com/bedrock/bda/). It provides a complete infrastructure setup with Lambda functions for managing the entire workflow - from creating custom blueprints and projects to handling data processing automation and monitoring task status. The construct automates the deployment of necessary AWS resources and configures the required IAM permissions, making it easier for developers to build and manage intelligent document processing, media analysis, and other multimodal data-centric automation solutions.

## Architecture

The AWS Bedrock Data Automation Construct implements a serverless solution that enables automated data processing using Amazon Bedrock. The construct deploys AWS Lambda functions that serve as data automation clients, capable of interacting with Amazon Simple Storage Service (Amazon S3) for input and output operations, and invoking the Amazon Bedrock Data Processing API.

This construct can be integrated with Amazon API Gateway for synchronous REST API operations or Amazon EventBridge for event-driven processing. The Lambda functions are configured to handle incoming requests from both services, allowing flexibility in implementation patterns. The solution supports both API-based and event-driven architectures, enabling you to process data through Amazon Bedrock based on HTTP requests or scheduled/triggered events. 

![Architecture Diagram](architecture.png)


## Pattern Construct Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| inputBucket | s3.IBucket | No | S3 bucket for uploading blueprint schema file. If not provided, a new bucket will be created. |
| outputBucket | s3.IBucket | No | S3 bucket for storing output files. If not provided, a new bucket will be created when isBDAInvocationRequired is true. |
| isCustomBDABlueprintRequired | boolean | No | Flag to indicate if custom Bedrock Data Automation blueprint creation is required. Default is false. |
| isBDAProjectRequired | boolean | No | Flag to indicate if Bedrock Data Automation project creation is required. Default is false. |
| isBDAInvocationRequired | boolean | No | Flag to indicate if Bedrock Data Automation invocation functionality is required. Default is false. |
| isStatusRequired | boolean | No | Flag to indicate if status checking functionality is required. Default is false. |

## Initializer

TypeScript:

```typescript
import { BedrockDataAutomation } from '@cdklabs/generative-ai-cdk-constructs';

const bdaConstruct = new BedrockDataAutomation(this, 'MyBDAConstruct', {
  isCustomBDABlueprintRequired: true,
  isBDAProjectRequired: true,
  isBDAInvocationRequired: true,
  isStatusRequired: true
});
```

Python:

```python
from cdklabs.generative_ai_cdk_constructs import BedrockDataAutomation

bda_construct = BedrockDataAutomation(self, "MyBDAConstruct",
    is_custom_bda_blueprint_required=True,
    is_bda_project_required=True,
    is_bda_invocation_required=True,
    is_status_required=True
)
```

## Pattern Properties

The BedrockDataAutomation construct exposes the following properties:

| Property | Type | Description |
|----------|------|-------------|
| bdaInputBucket | s3.IBucket | The S3 bucket for input data. Only available when isCustomBDABlueprintRequired or isBDAInvocationRequired is true. |
| bdaOutputBucket | s3.IBucket | The S3 bucket for output data. Only available when isBDAInvocationRequired is true. |
| bdaBlueprintLambdaFunction | lambda.Function | The Lambda function for managing Bedrock Data Automation blueprints. Only available when isCustomBDABlueprintRequired is true. |
| bdaProjectFunction | lambda.Function | The Lambda function for managing Bedrock Data Automation projects. Only available when isBDAProjectRequired is true. |
| bdaInvocationFunction | lambda.Function | The Lambda function for invoking Bedrock Data Automation processing. Only available when isBDAInvocationRequired is true. |
| bdaResultStatusFunction | lambda.Function | The Lambda function for checking Bedrock Data Automation processing status. Only available when isStatusRequired is true. |
| powertoolsLayer | lambda.ILayerVersion | The AWS Lambda Powertools layer used in the Lambda functions. |
| boto3Layer | lambda.LayerVersion | The Boto3 layer used in the Lambda functions for AWS SDK interactions. |

## Key Features

This construct provides granular control over Amazon Bedrock Data Automation capabilities through configurable feature flags. You can selectively enable specific features based on your workload requirements.

### Lambda Functions

The construct deploys up to four Lambda functions based on your configuration:

1. **Blueprint Lambda Function** (`bdaBlueprintLambdaFunction`): Manages the creation and management of custom Bedrock Data Automation blueprints. This function supports creating, updating, deleting, listing, and retrieving blueprint details.

2. **Project Lambda Function** (`bdaProjectFunction`): Handles the creation and management of Bedrock Data Automation projects. This function supports creating, updating, deleting, listing, and retrieving project details.

3. **Invocation Lambda Function** (`bdaInvocationFunction`): Manages the invocation of Bedrock Data Automation processing jobs. This function handles the configuration and execution of data processing tasks.

4. **Result Status Lambda Function** (`bdaResultStatusFunction`): Monitors the status of Bedrock Data Automation processing jobs and retrieves results when processing is complete.

Each Lambda function can be triggered via Amazon EventBridge events or Amazon API Gateway REST API calls, providing flexibility in how you integrate with the construct.

### Creating Custom Blueprints

The construct enables creation of custom blueprints by setting the `isCustomBDABlueprintRequired` property to true in the construct configuration. You can integrate this construct with either Amazon EventBridge for event-driven workflows or Amazon API Gateway for REST API operations.

To create a new blueprint, either send an event to EventBridge or an API Gateway with following options:

## Option1: Add Amazon EventBridge as a front-end interface to the construct

Typescript

```typescript
import { EventbridgeToLambda } from '@aws-solutions-constructs/aws-eventbridge-lambda';
import { BedrockDataAutomation } from '@cdklabs/generative-ai-cdk-constructs';

const bdaConstruct = new BedrockDataAutomation(this, 'MyBDAConstruct', {
    isCustomBDABlueprintRequired: true,
    isBDAProjectRequired: false,
    isBDAInvocationRequired: false,
    isStatusRequired: false
});

const bluePrintFunction = bdaConstruct.bdaBlueprintLambdaFunction

const blueprintEventbridge = new EventbridgeToLambda(this, 'CreateBlueprintEventRule', {
    existingLambdaObj: bluePrintFunction,
    eventRuleProps: {
    eventPattern: {
        source: ['custom.bedrock.blueprint'],
        detailType: ['Bedrock Blueprint Request'],
    }
    },
});

// print input bucket
new cdk.CfnOutput(this, 'inputbucketname', { value: bdaConstruct.bdaInputBucket!.bucketName });
new cdk.CfnOutput(this, 'outputbucketname', { value: bdaConstruct.bdaOutputBucket!.bucketName });
```

Python

```python
from cdklabs.generative_ai_cdk_constructs import BedrockDataAutomation
from aws_solutions_constructs.aws_eventbridge_lambda import EventbridgeToLambda 
import aws_cdk.aws_events as events

bda_construct = BedrockDataAutomation(self, "MyBDAConstruct",
    is_custom_bda_blueprint_required=True,
    is_bda_project_required=False,
    is_bda_invocation_required=False,
    is_status_required=False
)

blueprint_lambda_function = bda_construct.bda_blueprint_lambda_function

EventbridgeToLambda(self, 'create_blueprint-lambda',
    existing_lambda_obj=blueprint_lambda_function,
    event_rule_props=events.RuleProps(
        event_pattern=events.EventPattern(
            source=['custom.bedrock.blueprint'],
            detail_type=['Bedrock Blueprint Request']
        )
    )
)
```

upload the sample file to s3

```
aws s3 cp ./{sample_file.pdf} s3://{input-bucket-name}/
```

Create a bp_event.json file with following event in your project directory.


```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                        "blueprint_name": "custom_blueprint", 
                        "blueprint_type": "DOCUMENT", 
                        "blueprint_stage": "LIVE", 
                        "operation": "CREATE", 
                        "document_class": "Notice of Assessment", // sample file and fields, replace it with your file
                        "document_description": "A document issued by tax authorities that summarizes tax assessment details",
                        "schema_fields": [
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

OR you can also upload your schema json file and create following event

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                    "blueprint_name": "custom_bp", 
                    "blueprint_type": "DOCUMENT", 
                    "blueprint_stage": "LIVE", 
                    "operation": "CREATE", 
                    "schema_file_name": "claims_form.json" // upload this schema file to input s3 bucket
                      }
                    }
    ]
}
```


send event bridge event using below command

```
aws events put-events --cli-input-json file://bp_event.json
```

## Invoke Construct with S3 event notifications

Note: To automatically trigger the blueprint Lambda function upon file upload to Amazon S3:

- Enable Amazon EventBridge notifications on the input S3 bucket in your stack.

```python
        bda_input_bucket = bda_construct.bda_input_bucket
        bda_input_bucket.enable_event_bridge_notification()
```

- Configure Amazon S3 Event Notifications to send events to Amazon EventBridge.

```python
create_blueprint_event = EventbridgeToLambda(self, 'invokeBda',
    existing_lambda_obj=bda_construct.bda_blueprint_lambda_function,
    event_rule_props=events.RuleProps(
        event_pattern=events.EventPattern(
            source=["aws.s3"],
            detail_type=["Object Created"],
            detail={
                "bucket": {
                    "name": [bda_construct.bda_input_bucket.bucket_name]
                },
                "object": {
                    "key": [{
                        "suffix": ".pdf"
                    }]
                }
            }
        )
    )
)

rule = create_blueprint_event.events_rule
```

- Use Amazon EventBridge input transformer to convert S3 events into the blueprint Lambda function format

```python
rule.add_target(targets.LambdaFunction(
            bedrock_data_automation.bda_blueprint_lambda_function,
            event=events.RuleTargetInput.from_object({
                "source": "custom.bedrock.blueprint",
                "detail_type": "Bedrock Create Request",
                "detail": json.dumps({
                "blueprint_name": "XXXX",
                "blueprint_type": "DOCUMENT",
                "blueprint_stage": "LIVE",
                "operation": "CREATE",
                "schema_fields": [
                    {
                        "name": "XXXXX",
                        "description": "XXXXXX.",
                        "alias": "XXXXX"
                    },
                    {
                        "name": "XXXXX",
                        "description": "XXXXXX.",
                        "alias": "XXXXX"
                    },
                    {
                        "name": "XXXXX",
                        "description": "XXXXXX.",
                        "alias": "XXXXX"
                    }
                ]
            })
            })
        ))
```

## Option2:  Add API Gateway as a front-end interface to the construct

```typescript
import { ApiGatewayToLambda } from '@aws-solutions-constructs/aws-apigateway-lambda';

import { BedrockDataAutomation } from '@cdklabs/generative-ai-cdk-constructs';

    const bdaConstruct = new BedrockDataAutomation(this, 'MyBDAConstruct', {
      isCustomBDABlueprintRequired: true,
      isBDAProjectRequired: false,
      isBDAInvocationRequired: false,
      isStatusRequired: false
    });

new ApiGatewayToLambda(this, 'ApiGatewayToLambdaPattern', {
    existingLambdaObj: bdaConstruct.bdaBlueprintLambdaFunction,
    apiGatewayProps:{
        restApiName: 'createCustomBlueprint',
    }
});
```

```python
from cdklabs.generative_ai_cdk_constructs import BedrockDataAutomation
from aws_solutions_constructs.aws_apigateway_lambda import ApiGatewayToLambda 

bda_construct = BedrockDataAutomation(self, "MyBDAConstruct",
    is_custom_bda_blueprint_required=True,
    is_bda_project_required=False,
    is_bda_invocation_required=False,
    is_status_required=False
)

blueprint_lambda_function = bda_construct.bda_blueprint_lambda_function

blueprint_api = ApiGatewayToLambda(self, 'CreateBlueprintApi',
            existing_lambda_obj=bda_construct.bda_blueprint_lambda_function,
            api_gateway_props=apigw.RestApiProps(
                rest_api_name='createBluePrintPython'
            )    
        )
```

Publish a POST request with parameters in the body. For the detailed list of parameters to pass, please refer to the [documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-data-automation.html).

### CRUD operation on blueprint

You can perform additional operations like list, get, update and delete  on your Amazon Bedrock blueprints using the same stack.

To execute these operations, invoke the Lambda function with the appropriate event payload. Each operation requires specific event parameters as detailed in the following sections.

Note: The operation type is determined by the event structure passed to the Lambda function through either Amazon API Gateway or Amazon EventBridge

## Eventbridge event format

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Blueprint Request",
            "Detail": {
                "blueprint_arn": "XXXXXXXXX",
                "operation": "DELETE/GET/UPDATE",// Use appropriate operation    
            }
        }
    ]
}
```

## APIGateway request body
 
```json
{
    "operation":"GET/UPDATE/DELETE",
    "blueprintArn":"XXXXXXXX",
}
```

## Creating Data Automation Projects

The construct enables creation and management of Bedrock Data Automation projects by setting the `isBDAProjectRequired` property to true in the construct configuration. You can integrate this construct with either Amazon EventBridge for event-driven workflows or Amazon API Gateway for REST API operations.

### Project Creation Event Format

To create a new bedrock data automation project, either send an event to EventBridge or an API Gateway with following options:

## Option1: Add Amazon EventBridge as a front-end interface to the construct

Please use the same [stack](#creating-custom-blueprints): Option1 and replace the `existingLambdaObj` with `bdaConstruct.bdaProjectFunction`.

Create a bda_event.json file using below event.

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

Publish the event using below command. The full list of parameters you can pass to the event is available in the [documentation](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock-data-automation/client/create_data_automation_project.html).

```
aws events put-events --cli-input-json file://bda_event.json
```

## Option2: Add API Gateway as a front-end interface to the construct

Please use the same [stack](#creating-custom-blueprints), Option2 and replace the `existingLambdaObj` with `bdaConstruct.bdaProjectFunction`.

Publish a POST request with following body

```json 

{
    "operation":"create",
    "projectName":"bp_project_1",
    "projectStage":"LIVE",
    "projectDescription":"sample","customOutputConfiguration": {
        "blueprints":[
            {
                "blueprintArn":"XXXXXXXX","blueprintStage":"LIVE"
            }
        ]
    }
}
```

### CRUD operation on project

You can perform additional operations like list, get, update and delete  on your Amazon Bedrock projects using the same stack.

To execute these operations, invoke the Lambda function with the appropriate event payload. Each operation requires specific event parameters as detailed in the following sections.

Note: The operation type is determined by the event structure passed to the Lambda function through either Amazon API Gateway or Amazon.

## EventBridge

```json
{
    "operation":"delete/update/list","projectArn":"XXXXXXXX",
}
```

## Data Processing Invocations

The construct enables automated data processing through Bedrock Data Automation invocations by setting the `isBDAInvocationRequired` property to true in the construct configuration. You can integrate this construct with either Amazon EventBridge for event-driven workflows or Amazon API Gateway for REST API operations.

## Option1: Add Amazon EventBridge as a front-end interface to the construct

Please use the same [stack](#creating-custom-blueprints): Option1 and replace the `existingLambdaObj` with `bdaConstruct.bdaInvocationFunction`.

Create a bda_event.json file using below event and then use following cli command to push the event.

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
                "dataAutomationProfileArn":"BDA-CRIS profile",
                "dataAutomationProfileArn":"arn:aws:bedrock:{region_name}:{account_id}:data-automation-profile/us.data-automation-v1"
            }
        }
    ]
}
```

```
aws events put-events --cli-input-json file://bda_event.json
```

blueprint_arn is fetched from create blueprint response.

## Invoke Construct with S3 event notifications

Note: To automatically trigger the blueprint Lambda function upon file upload to Amazon S3:

- Enable Amazon EventBridge notifications on the input S3 bucket in your stack.
 
 ```python
        bda_input_bucket = bda_construct.bda_input_bucket
        bda_input_bucket.enable_event_bridge_notification()
```

- Configure Amazon S3 Event Notifications to send events to Amazon EventBridge.

```python
invoke_bda_event = EventbridgeToLambda(self, 'invokeBda',
    existing_lambda_obj=bedrock_data_automation.bda_invocation_function,
    event_rule_props=events.RuleProps(
        event_pattern=events.EventPattern(
            source=["aws.s3"],
            detail_type=["Object Created"],
            detail={
                "bucket": {
                    "name": [bedrock_data_automation.bda_input_bucket.bucket_name]
                },
                "object": {
                    "key": [{
                        "suffix": ".pdf"
                    }]
                }
            }
        )
    )
)

rule = create_blueprint_event.events_rule
```

- Use Amazon EventBridge input transformer to convert S3 events into the blueprint Lambda function format

```python
 rule.add_target(targets.LambdaFunction(
            bedrock_data_automation.bda_invocation_function,
            event=events.RuleTargetInput.from_object({
                "source": "custom.bedrock.blueprint",
                "detail_type": "Bedrock Invoke Request",
                "detail": json.dumps({
                    "input_filename": events.EventField.from_path('$.detail.object.key'),
                    "output_filename": events.EventField.from_path('$.detail.object.key').replace('.pdf', '_2.csv'),
                    "blueprints": [{
                        "blueprint_arn": blueprint_arn,
                        "stage": "LIVE"
                    }]
                })
            })
        ))
```

## Option2: Add API Gateway as a front-end interface to the construct

Please use the same [stack](#creating-custom-blueprints): Option2 and replace the `existingLambdaObj` with `bdaConstruct.bdaInvocationFunction`.

## Processing Status Monitoring

The construct provides automated status monitoring for Bedrock Data Automation processing jobs. To enable this functionality, set `isStatusRequired = true` in the construct props.

### Status Check Event Format

To check the status of a processing job,either send an event to EventBridge or an API Gateway with following options:

## Option1: Add Amazon EventBridge as a front-end interface to the construct

Typescript

```typescript
import { EventbridgeToLambda } from '@aws-solutions-constructs/aws-eventbridge-lambda';

    const dataResultStatusFunction = bdaConstruct.bdaResultStatusFunction
    
    new EventbridgeToLambda(this, 'bdaResult', {
      existingLambdaObj: dataResultStatusFunction,
      eventRuleProps: {
        eventPattern: {
          source: ['custom.bedrock.blueprint'],
          detailType: ['Bedrock Result Status'],
        }
      },
    });

```
Python 

```python
EventbridgeToLambda(self, 'data_result_lambda',
    existing_lambda_obj=bda_construct.bda_result_status_function,
    event_rule_props=events.RuleProps(
        event_pattern=events.EventPattern(
            source=['custom.bedrock.blueprint'],
            detail_type=['Bedrock Result Status']
        )
    )
)
```
Create a bda_result_event.json file using above event and then use following cli command to push the event.
```
aws events put-events --cli-input-json file://bda_result_event.json
```
invocation_arn is fetched from data processing started job.

```json
{
    "Entries": [
        {
            "Source": "custom.bedrock.blueprint",
            "DetailType": "Bedrock Result Status",
            "Detail": {"invocation_arn":"XXXXXX"}
        }
    ]
}

```
## Option2:  Add API Gateway as a front-end interface to the construct

```typescript
import { ApiGatewayToLambda } from '@aws-solutions-constructs/aws-apigateway-lambda';

new ApiGatewayToLambda(this, 'ApiGatewayToLambdaPattern', {
      existingLambdaObj: dataResultStatusFunction,
      apiGatewayProps:{
        restApiName: 'dataResultStatus',
      }
    });
```

Publish a POST request with following body.
invocation_arn is fetched from data processing API response
```json 

     {"invocation_arn":"XXXXXX"}
```

## Default properties

### Lambda functions

- **Memory Size**: 1024 MB
- **Timeout**: 15 minutes
- **Architecture**: x86_64

### S3 buckets

if not provided, the construct will handle the creation of the S3 buckets and associated server access log buckets :

- **Input Bucket**: 
  - **Name**: `${hash}-input-bucket` (where `hash` is a unique identifier based on the construct ID, AWS account, and region)
  - **Encryption**: S3 Managed
  - **Versioned**: true
  - **Block Public Access**: Block all public access
  - **Removal Policy**: Destroy
  - **Auto Delete Objects**: true

- **Output Bucket**: 
  - **Name**: `${hash}-output-bucket` (where `hash` is a unique identifier based on the construct ID, AWS account, and region)
  - **Encryption**: S3 Managed
  - **Versioned**: true
  - **Block Public Access**: Block all public access
  - **Removal Policy**: Destroy
  - **Auto Delete Objects**: true

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
