# aws-summarization-appsync-stepfn
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
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) Typescript|`@awslabs/generative-ai-cdk-constructs`|

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

## Overview

This construct provides a workflow to summarize multiple pdf documents with Amazon Bedrock using Anthropic Claude V2 as foundation model, AWS AppSync for Graphql apis, AWS Step Functions and AWS Lambda functions.

A Graphql request is submitted with the list of files which needs to be summarized by the construct.

AWS AppSync forward the request to an Amazon EventBridge through an event bridge data source resolver. Amazon EventBridge decouple the whole architecture and it forwards the request to AWS Step Function for further processing.

AWS Step Function implements a workflow to validate the input request, then process and transform the files in parallel and finally generate the summary of each file. For user specific configuration please refer to the Pattern construct Props.

The status of each file is sent back to the client through an AppSync subscription.

This construct builds a Lambda function from a Docker image, thus you need to have [Docker desktop](https://www.docker.com/products/docker-desktop/) running on your machine.

The input document(s) must be stored in the input Amazon Simple Storage Service bucket in text format (.txt). Another construct is available to ingest and process files to text format: [aws-rag-appsync-stepfn-opensearch](../aws-rag-appsync-stepfn-opensearch/README.md).

Make sure the model (anthropic.claude-v2) is enabled in your account. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

AWS Lambda functions provisioned in this construct use [Powertools for AWS Lambda (Python)](https://github.com/aws-powertools/powertools-lambda-python) for tracing, structured logging and custom metrics creation.

Here is a minimal deployable pattern definition:

Create a CDK typescript project and then update the stack with below configuration.

``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { SummarizationAppsyncStepfn, SummarizationAppsyncStepfnProps } from '@awslabs/generative-ai-cdk-constructs';

// get an existing userpool 
const cognitoPoolId = 'us-east-1_XXXXX';
const userPoolLoaded = cognito.UserPool.fromUserPoolId(this, 'myuserpool', cognitoPoolId);

summarizationTestConstruct = new SummarizationAppsyncStepfn(
    this, 
    'SummarizationAppsyncStepfn', 
    {
        cognitoUserPool: userPoolLoaded
    });
    
```

For optional props like redis cluster set cfnCacheClusterProps.

```
const cfnCacheClusterProps: elasticache.CfnCacheClusterProps = {
      cacheNodeType: 'cache.r6g.xlarge',
      engine: 'redis',
      numCacheNodes: 1,
    };
```
If file transformation is required set isFileTransformationRequired to 'True'

 ```
 isFileTransformationRequired: 'True'
 ```

For existing resource like Amazon VPC , Amazon S3 buckets use props like existingVpc, existingInputAssetsBucketObj and existingProcessedAssetsBucketObj.

The code below provides an example of a mutation call and associated subscription to trigger the summarization workflow and get response notifications:

Mutation call to trigger the question:

```
mutation MyMutation {
  generateSummary(summaryInput:{files:[{name: "document1.txt", status: ""}], summary_job_id:"81"}) {
    name
    status
    summary
    summary_job_id
  }
}
```

Where:
- summary_job_id: id which can be used to filter subscriptions on client side
- status: this field will be used by the subscription to update the status of the summarization process for the file(s) specified
- name: Two formats are supported for files to be summarized. If the file is in text format, it needs to be stored in the trasformed S3 bucket, no file transformation is required. 
If pdf format is selected, the file needs to be in the input S3 bucket and the construct prop ```isFileTransformationRequired``` needs to be set to true. The file will be transformed to text format.

Subscription call to get notifications about the summarization process:
```
subscription MySubscription {
  updateSummaryJobStatus(name: "document1.txt", summary_job_id: "81") {
    name
    status
    summary
    summary_job_id
  }
}
```

Where:
- summary_job_id: id which can be used to filter subscriptions on client side
- status: status update of the summarization process for the file(s) specified
- name: name of the file stored in the input S3 bucket, same name + extension as passed to the previous mutation call.
- summary: summary returned by the Large Language Model for the document specified, as a base64 encoded string

```If multiple files are requested for summarization , then the client should filter response based on summary_job_id and name for each file. ```

## Initializer

```
new SummarizationAppsyncStepfn(scope: Construct, id: string, props: SummarizationAppsyncStepfnProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props SummarizationAppsyncStepfnProps

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| cognitoUserPool | [cognito.IUserPool](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.IUserPool.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Cognito user pool used for authentication. |
| vpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | The construct creates a custom VPC based on vpcProps. Providing both this and existingVpc is an error. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC can be used to deploy the construct.|
| existingRedisCulster | [elasticache.CfnCacheCluster](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing Redis cluster to cache the generated summary for subsequent request of same document. |
| cfnCacheClusterProps | [elasticache.CfnCacheClusterProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Properties defining cfnCacheClusterProps. If there is no existing redis cluster cfnCacheClusterProps can be used to create a new cluster|
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Security group for the lambda function which this construct will use. If no exisiting security group is provided it will create one from the vpc.|
| existingInputAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing s3 Bucket to store the input document which needs to be summarized. pdf is the supported input document format. If transformed (txt format) file is available then this bucket is optional. |
| bucketInputsAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket.Providing both this and `existingInputAssetsBucketObj` will cause an error.|
| isFileTransformationRequired | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | The summary construct transform the input document into txt format. If the transformation is not required then this flag can be set to false. If set to true then a transformed asset bucket is created which transform the input document from input asset bucket to txt format.|
| existingProcessedAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | This bucket stores the transformed (txt) assets for generating summary.If None is provided then this contruct will create one.|
| bucketProcessedAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket.Providing both this and `existingProcessedAssetsBucket` will cause an error.|
| existingBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of EventBus. The summary construct integrate appsync with event bridge' to route the request to step functions.|
| eventBusProps | [events.EventBusProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventBusProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | A new custom EventBus is created with provided props. Providing ```existingBusInterface``` and ```eventBusProps``` both will result in validation error.|
| existingMergedApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing merged api instance. The merge API provides a federated schema over source API schemas.|
| summaryApiName | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided Name for summary api on appsync.A graphql api will be created by this construct with this name.|
| observability | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enables observability on all services used. Warning: associated cost with the services used. Best practice to enable by default. Defaults to true.|
| summaryChainType | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | Chain type defines how to pass the document to LLM. there are three types of chain types. Stuff: Simply "stuff" all your documents into a single prompt. Map-reduce: Summarize each document on it's own in a "map" step and then "reduce" the summaries into a final summary Refine :  This constructs a response by looping over the input documents and iteratively updating its answer. |

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| eventBridgeBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | An instance of events.IEventBus created by the construct |
| mergeApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) |  Instance of appsync.CfnGraphQLApi for merge api created by the construct |
| graphqlApi | [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.IGraphqlApi.html) | Instance of appsync.CfnGraphQLApi for summary created by the construct|
| redisCluster | [elasticache.CfnCacheCluster](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | Instance of redis cluster created by the construct |
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) |Returns the instance of ec2.ISecurityGroup used by the construct |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | Returns the instance of ec2.ISecurityGroup used by the construct. |
| inputAssetBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Instance of s3.IBucket used by the construct |
| processedAssetBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) |Instance of s3.IBucket used by the construct|

## Default properties

Out of the box implementation of the Construct without any override will set the following defaults:

### VPC
- Sets up vpc to deploy the contruct

### Amazon ElastiCache for Redis
- Sets up amazon elastic cache for redis cluster.

### AppSync
- Sets up AWS AppSync merge api
    - Associate the source api with merge api using 'AUTO-MERGE'

### Amazon S3 Buckets

- Sets up two Amazon S3 Buckets
    - Uses existing buckets if provided, otherwise creates new ones
- If isFileTransformationRequired is set to False then 
only one bucket is created for input assets.

### Observability

By default the construct will enable logging and tracing on all services which support those features. Observability can be turned off through the pattern properties.
- AWS Lambda: AWS X-Ray, Amazon Cloudwatch Logs
- AWS Step Function: AWS X-Ray, Amazon Cloudwatch Logs
- AWS AppSync GraphQL api: AWS X-Ray, Amazon Cloudwatch Logs


## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | Invalid file format. | Only .txt and .pdf file format are supported | Provide a valid file with .pdf or .txt extension |
| 602 | Not able to transform the file. | File transformation from .pdf to .txt failed| Check if valid file exist in input bucket |
| 603 | No file available to read. | Couldn't read file from input bucket| Check if valid file exist in input bucket |
| 604 | Something went wrong while generating summary! | LLM threw an exception| Check if your account has access to Amazon Bedrock |


## Architecture
![Architecture Diagram](architecture.png)

## Cost

You are responsible for the cost of the AWS services used while running this construct. As of this revision, the cost for running this construct with the default settings in the US East (N. Virginia) Region is approximately $X per month.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.


| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| Amazon Virtual Private Cloud |  |  |
| AWS AppSync |  |  |
| Amazon EventBridge |  |  |
| AWS Lambda |  |  |
| Amazon Simple Storage Service |  |  |
| Amazon Bedrock |  |  |
| Amazon Cloudwatch | | |
| AWS X-Ray | | |
| AWS X-Ray | | |
| Total Deployment cost | | |

The resources not created by this construct (Amazon Cognito User Pool, AppSync Merged API, AWS Secrets Manager secret) do not appear in the table above. You can refer to the decicated pages to get an estimate of the cost related to those services:
- [AWS AppSync pricing (for Merged API if used)](https://aws.amazon.com/appsync/pricing/)
- [Amazon Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [AWS Secrets Manager Pricing](https://aws.amazon.com/secrets-manager/pricing/)

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

## Supported AWS Regions

This solution optionally uses the Amazon Bedrock service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
>You need to explicity enable access to models before they are available for use in the Amazon Bedrock service. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.


***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.