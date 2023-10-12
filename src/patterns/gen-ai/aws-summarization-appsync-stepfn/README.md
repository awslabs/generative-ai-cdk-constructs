# aws-summarization-appsync-stepfn
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->

| **Reference Documentation**:| <span style="font-weight: normal">TODO</span>|
|:-------------|:-------------|
<div style="height:8px"></div>

| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) Typescript|`@aws-samples/@emerging_tech_cdk_constructs`|

## Overview

This construct provides a gen-ai summarization implementation using AWS Appsync ,Amazon EventBridge, AWS Step function and AWS Lambda.

Here is a minimal deployable pattern definition:

Typescript
``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { SummarizationAppsyncStepfn, SummarizationAppsyncStepfnProps } from '@aws-samples/aws-emerging-tech-constructs';

new SummarizationAppsyncStepfn(this, 'new-construct', constructProps);
```

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
| userPoolId | string | ![Required](https://img.shields.io/badge/required-ff0000) | Amazon Cognito user pool id for AWS Appsync authentication and authorization. |
| userVpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | The construct creates a custom VPC based on userVpcProps. Providing both this and existingVpc is an error. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC can be used to deploy the construct.|
| existingRedisCulster | [elasticache.CfnCacheCluster](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing Redis cluster to cache the generated summary for subsequent request of same document. |
| cfnCacheClusterProps | [elasticache.CfnCacheClusterProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Properties defining cfnCacheClusterProps. If there is no existing redis cluster cfnCacheClusterProps can be used to create a new cluster|
| existingSecurityGroup | [ec2.SecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.SecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Security group for the lambda function which this construct will use. If no exisiting security group is provided it will create one from the vpc.|
| existingInputAssetsBucket | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing s3 Bucket to store the input document which needs to be summarized. pdf is the supported input document format. If transformed (txt format) file is available then this bucket is optional. |
| bucketInputsAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket.Providing both this and `existingInputAssetsBucketObj` will cause an error.|
| isFileTransformationRequired | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | The summary construct transform the input document into txt format. If the transformation is not required then this flag can be set to false. If set to true then a transformed asset bucket is created which transform the input document from input asset bucket to txt format.|
| existingTransformedAssetsBucket | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | This bucket stores the transformed (txt) assets for generating summary.If None is provided then this contruct will create one.|
| bucketTransformedAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket.Providing both this and `existingTransformedAssetsBucket` will cause an error.|
| existingEventBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of EventBus. The summary construct integrate appsync with event bridge' to route the request to step functions.|
| eventBusProps | [events.EventBusProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventBusProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | A new custom EventBus is created with provided props. Providing existingEventBusInterface and eventBusProps both will result in validation error.|
| existingMergeApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Existing merge api instance. This  construct create a merge API to support multiple modalities with different source APIs. The merge API provode a fedeareted schema over source API schemas.|
| summaryApiName | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided Name for summary api on appsync.A graphql api will be created by this construct with this name.|
| logConfig | [appsync.LogConfig](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.LogConfig.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Logging configuration for AppSync. |
| xrayEnabled | [boolean] | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enable AWS Xray for appsync |
| summaryChainType | [string] | ![Optional](https://img.shields.io/badge/optional-4169E1) | Chain type defines how to pass the document to LLM. there are three types of chain types. Stuff: Simply "stuff" all your documents into a single prompt. Map-reduce: Summarize each document on it's own in a "map" step and then "reduce" the summaries into a final summary Refine :  This constructs a response by looping over the input documents and iteratively updating its answer. |

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| eventBridgeBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | An instance of events.IEventBus created by the construct |
| mergeApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) |  Instance of appsync.CfnGraphQLApi for merge api created by the construct |
| summaryGraphqlApi | [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.IGraphqlApi.html) | Instance of appsync.CfnGraphQLApi for summary created by the construct|
| redisCluster | [elasticache.CfnCacheCluster](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticache.CfnCacheClusterProps.html) | Instance of redis cluster created by the construct |
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) |Returns the instance of ec2.ISecurityGroup used by the construct |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | Returns the instance of ec2.ISecurityGroup used by the construct. |
| inputAssetBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Instance of s3.IBucket used by the construct |
| processedAssetBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) |Instance of s3.IBucket used by the construct|
| logConfig | [appsync.LogConfig](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.LogConfig.html)|Instance of s3.IBucket used by the construct|

## Default properties

Out of the box implementation of the Construct without any override will set the following defaults:

### VPC
- Sets up vpc to deploy the contruct

### Amazon ElastiCache for Redis
- Sets up amazon elastic cache for redis cluster.

### Appsync
- Sets up AWS Appsync merge api
    - Associate the source api with merge api using 'AUTO-MERGE'

### Amazon S3 Buckets

- Sets up two Amazon S3 Buckets
    - Uses existing buckets if provided, otherwise creates new ones
- If isFileTransformationRequired is set to False then 
only one bucket is created for inout assets.



## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | <>message | This error happens when <> | Provide a valid value for the <> |

## Architecture
![Architecture Diagram](architecture.png)

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.