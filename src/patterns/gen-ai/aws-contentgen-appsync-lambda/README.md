# aws-contentgen-appsync-lambda
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
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) Typescript|`@cdklabs/generative-ai-cdk-constructs`|

## Table of contents

- [Overview](#overview)
- [Initializer](#initializer)
- [Pattern Construct Props](#pattern-construct-props)
- [Pattern Properties](#pattern-properties)
- [Default properties](#default-properties)
- [Troubleshooting](#troubleshooting)
- [Architecture](#architecture)
- [Cost](#cost)
- [Security](#security)
- [Supported AWS Regions](#supported-aws-regions)
- [Quotas](#quotas)
- [Clean up](#clean-up)

## Overview

This construct implements an end-to-end workflow for generating images from text prompts using Amazon Web Services (AWS). It exposes a GraphQL API through AWS AppSync that allows clients to submit text requests. AWS Lambda functions process these requests and moderate the text using Amazon Comprehend and the generated images using Amazon Rekognition to help ensure appropriate content. For image generation, the system supports leveraging Stability AI's stable-diffusion-xl model as well as Amazon titan generator through Amazon Bedrock. This provides flexible options for high-fidelity text-to-image generation while leveraging AWS services for request processing, content moderation, and scalable deployment of generative AI models. 

The workflow is as follows:

1. A GraphQL request containing the user's text input is submitted to AWS AppSync.

2. The AppSync API forwards the request to an Amazon EventBridge event bus via an EventBridge data source resolver. This decouples the architecture and triggers AWS Lambda functions to handle the processing.

3. Lambda function first implement text moderation using Amazon Comprehend to check for inappropriate content.

4. The functions then generate an image from the text using Amazon Bedrock with the stability.stable-diffusion-xl/amazon.titan-image-generator-v1 model.

5. Next, image moderation is performed using Amazon Rekognition to further ensure appropriateness.

6. Finally, the generated image is uploaded to an Amazon S3 bucket.


This construct builds a Lambda function from a Docker image, thus you need [Docker desktop](https://www.docker.com/products/docker-desktop/) running on your machine.

Make sure the model (stability.stable-diffusion-xl/amazon.titan-image-generator-v1) is enabled in your account. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

AWS Lambda functions provisioned in this construct use [Powertools for AWS Lambda (Python)](https://github.com/aws-powertools/powertools-lambda-python) for tracing, structured logging and custom metrics creation.

Here is a minimal deployable pattern definition:

TypeScript

Create a CDK TypeScript project and then update the stack with below configuration.
```cdk init sample-app --language typescript```

``` typescript
import { Construct } from 'constructs';
import { Stack, StackxProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { SummarizationAppsyncStepfn, SummarizationAppsyncStepfnProps } from '@cdklabs/generative-ai-cdk-constructs';

// get an existing userpool 
const cognitoPoolId = 'us-east-1_XXXXX';
const userPoolLoaded = cognito.UserPool.fromUserPoolId(this, 'myuserpool', cognitoPoolId);


const imageGeneration = new emergingTech.ContentGenerationAppsyncLambda(this, 'ContentGenerationAppsyncLambda', {
      cognitoUserPool: userPoolLoaded,
      
    });
    
```
Python

Create a CDK Python project and then update the stack with below configuration.
```cdk init sample-app --language python```

``` python
from constructs import Construct
from aws_cdk import (
    Duration,
    Stack,    
    aws_cognito as cognito,
)   
import cdklabs.generative_ai_cdk_constructs as genai


class SampleAppStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        cognitoPoolId='us-east-1_XXXXX'
        userPool = cognito.UserPool.from_user_pool_id(self, 'myuserpool', cognitoPoolId)
        
        img_generated=genai.ContentGenerationAppsyncLambda(self, "ContentGenerationAppsyncLambda",
            cognito_user_pool: userPool
            )

    
```


For existing resources like Amazon VPC and Amazon S3 buckets, use props like existingVpc, existingGeneratedAssetsBucketObj.

After deploying the CDK stack, the image generation process can be invoked using GraphQL APIs. The API schema details are present here: resources/gen-ai/aws-contentgen-appsync-lambda/schema.graphql.

The code below provides an example of a subscription call and associated mutation to trigger the image generation workflow and get response notifications. The subscription call wait for the mutation request to send the notifications.

Subscription call to receive notifications:

```
subscription MySubscription {
  updateGenerateImageStatus(jobid: "") {
    filename
    image_path
    input_text
    jobid
    message
    status
  }
}
_______________________________________

Expected response:


```

Where:
- job_id: id which can be used to filter subscriptions on the client side
- status: status update of the image generation process.
- filename: name of the image generated in the S3 bucket.
- message: any error message generated during processing of the request.


Mutation call to trigger the summarization:

```

input= {'detail': {'imageInput': 
         {'jobid': '88019f5e-71cd-42ce-b24b-94bce4fce87c',
           'filename': '', 'model_config': 
           {'provider': 'Bedrock',
             'modelId': 'amazon.titan-image-generator-v1',
             'model_kwargs': 
             {'cfg_scale': 5, 'seed': 452345, 'steps': 10, 
              'style_preset': 'photographic', 
              'clip_guidance_preset': 'FAST_BLUE',
                'sampler': 'DDIM',
                'numberOfImages':1}},
                  'input_text': 'ZnJvZ3MgZGFuY2luZyBvbiBzdGFnZQo=', 
             'negative_prompts': ''}}
}

seed: 452345,
            steps: 10, 
            style_preset: "photographic", 
            clip_guidance_preset: "FAST_BLUE",
            sampler: "DDIM",
            numberOfImages:1

handler(input,None)


mutation MyMutation {
  generateImage(imageInput:
    { input_text: "frog dancing on river", 
      jobid: "23", 
      model_config: 
        {
          modelId: "amazon.titan-image-generator-v1", 
        provider: "Bedrock"
        model_kwargs:""
          }
        }) {
    jobid
    filename
    status
    image_path
    input_text
    message
  }
}
_______________________________________

Expected response: It invoke an asynchronous summarization process thus the response notification are send on subscription channel.

{
  "data": {
    "generateImage": {
      "jobid": null,
      "filename": null,
      "status": null,
      "image_path": null,
      "input_text": null,
      "message": null
    }
  }
}

```

Where:
- job_id: id which can be used to filter subscriptions on client side.
- status: this field will be used by the subscription to update the status of the image generation process.
- model_config: configure model id amazon.titan-image-generator-v1/stability.stable-diffusion-xl.
- model_kwargs: Image generation model driver for Stable Diffusion models and Amazon Titan generator on Amazon Bedrock.




## Initializer

```
new ContentGenerationAppsyncLambda(scope: Construct, id: string, props: ContentGenerationAppsyncLambdaProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props ContentGenerationAppsyncLambdaProps

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| cognitoUserPool | [cognito.IUserPool](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.IUserPool.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Cognito user pool used for authentication. |
| vpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | The construct creates a custom VPC based on vpcProps. Providing both this and existingVpc will result in an error. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC can be used to deploy the construct.|
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Security group for the Lambda function which this construct will use. If no exisiting security group is provided it will create one from the VPC.|
| existingGeneratedAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing S3 bucket to store the generated image. |
| generatedAssetsBucketProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User-provided props to override the default props for the S3 bucket. Providing both this and `existingGeneratedAssetsBucketObj` will result in an error.|
| existingBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of event bus. The image generation construct integrates AppSync with EventBridge to route the request to Step Functions.|
| eventBusProps | [events.EventBusProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventBusProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | A new custom event bus is created with provided props. Providing both ```existingBusInterface``` and ```eventBusProps``` will result in an error.|
| existingMergedApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing Merged API instance. The Merged API provides a federated schema over source API schemas.|
| observability | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enables observability on all services used. Warning: associated costs with the services used. It is a best practice to enable by default. Defaults to true.|
| enableOperationalMetric | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | CDK construct collect anonymous operational metrics to help AWS improve the quality and features of the constructs. Data collection is subject to the AWS Privacy Policy (https://aws.amazon.com/privacy/). To opt out of this feature, simply disable it by setting the construct property "enableOperationalMetric" to false for each construct used. Defaults to true.|
| stage | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Value will be appended to resources name service. |

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| eventBridgeBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | An instance of events.IEventBus created by the construct |
| mergeApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) |  Instance of appsync.CfnGraphQLApi for Merged API created by the construct |
| graphqlApi | [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.IGraphqlApi.html) | Instance of appsync.CfnGraphQLApi for summary created by the construct|
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) |Returns the instance of ec2.ISecurityGroup used by the construct |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | Returns the instance of ec2.ISecurityGroup used by the construct. |
| s3GenerateAssetsBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Instance of s3.IBucket used by the construct |


## Default properties

Out-of-the-box implementation of the construct without any override will set the following defaults:

### VPC
- Sets up VPC to deploy the contruct

### AppSync
- Sets up AWS AppSync Merged API
    - Associate the source api with Merged API using 'AUTO-MERGE'

### Amazon S3 Buckets

- Sets up S3 Bucket
    - Uses existing bucket if provided, otherwise creates new one


### Observability

By default the construct will enable logging and tracing on all services which support those features. Observability can be turned off through the pattern properties.
- AWS Lambda: AWS X-Ray, Amazon CloudWatch Logs
- AWS Step Functions: AWS X-Ray, Amazon CloudWatch Logs
- AWS AppSync GraphQL API: AWS X-Ray, Amazon CloudWatch Logs


## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | Image generation blocked. | In appropriate input prompt. Please change the prompt. | Provide a valid prompt. |
| 602 | Invalid request. | Input text is empty | Provide a valid prompt. |
| 603 | mage generation blocked | In-appropriate image generated. | Provide a valid prompt.|


## Architecture
![Architecture Diagram](architecture.png)

## Cost

When deploying this architecture, you as the customer are responsible for the costs of the AWS services utilized. Based on current pricing in the US East (N. Virginia) region, operating this infrastructure with the default configuration to handle 10,000 image generation requests per month is estimated to cost approximately $87.52 per month. This cost estimate includes usage of the various AWS services leveraged in this architecture such as AWS Lambda, AWS AppSync, Amazon Bedrock, and Amazon S3. 

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.


| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| Amazon Virtual Private Cloud |  | 0.00 |
| AWS AppSync | 10,000 requests per month (10,000 searches x 0.000004 USD)| 0.04 |
| Amazon EventBridge | 10,000 event per month  | 0.01 |
| AWS Lambda | 10,000 request per month, memory allocated with 1769 MB of memory allocated and 512 MB of ephemeral storage allocated and an average run time of 30 seconds  | 1.97|
| Amazon Simple Storage Service | 50,000 S3 request per month with 50 GB of image storage | 1.42 |
| Amazon Bedrock | Per image with resolution 512 X 512 using Titan Image Generator would cost around 10,000*0.008| 80.00 |
| Amazon CloudWatch | 15 metrics using 5 GB data ingested for logs | 7.02 |
| AWS X-Ray | 100,000 requests per month through AppSync and Lambda calls | 0.50 |
| Total Deployment cost | | 87.52 |

The resources not created by this construct (Amazon Cognito User Pool, AppSync Merged API, AWS Secrets Manager secret) do not appear in the table above. You can refer to the decicated pages to get an estimate of the cost related to those services:
- [AWS AppSync pricing (for Merged API if used)](https://aws.amazon.com/appsync/pricing/)
- [Amazon Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [AWS Secrets Manager Pricing](https://aws.amazon.com/secrets-manager/pricing/)

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

This construct requires you to provide an existing Amazon Cognito User Pool. Please refer to the official documentation on best practices to secure this service:
- [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/security.html)

Optionaly, you can provide existing resources to the constructs (marked optional in the construct pattern props). If you chose to do so, please refer to the official documentation on best practices to secure each service:
- [Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html)
- [Amazon ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/redis-security.html)
- [Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-security.html)
- [AWS AppSync](https://docs.aws.amazon.com/appsync/latest/devguide/best-practices.html)

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon Simple Storage Service buckets, Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

> **Note**
> This construct provides several configurable options for logging. Please consider security best practices when enabling or disabling logging and related features. Verbose logging, for instance, may log content of API calls. You can disable this functionality by ensuring observability flag is set to false.

## Supported AWS Regions

This solution optionally uses the Amazon Bedrock service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
>You need to explicity enable access to models before they are available for use in the Amazon Bedrock service. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

## Clean up

When deleting your stack which uses this construct, do not forget to go over the following instructions to avoid unexpected charges:
  - empty and delete the Amazon Simple Storage Bucket(s) created by this construct if you didn't provide existing ones during the construct creation
  - empty the Amazon ElastiCache cluster for Redis
  - if the observability flag is turned on, delete all the associated logs created by the different services in Amazon CloudWatch logs

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
