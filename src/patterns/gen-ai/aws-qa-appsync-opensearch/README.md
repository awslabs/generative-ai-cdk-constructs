# aws-qa-appsync-opensearch
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

This construct provides a question answering workflow (RAG + long context window) using Amazon Bedrock and a provisioned Amazon OpenSearch cluster. 
- If a document is provided as an input to the Appsync query, the AWS Lambda function will first verify the length of the document. If the document size is above the max number of tokens for the selected model, the Lambda will query the knowledge base (similarity search) and filter by document name. This assumes that the chunks of texts stored in the knowledge base have the document name as metadata. Otherwise, the content of the document is provided to the LLM as part of the context.
- If no document is provided as input, the Lambda will perform a similarity search against the entire knowledge base.

This construct builds a Lambda function from a Docker image, thus you need to have [Docker desktop](https://www.docker.com/products/docker-desktop/) running on your machine.

Here is a minimal deployable pattern definition:

Typescript
``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import { QaAppsyncOpensearch, QaAppsyncOpensearchProps } from '@aws-samples/aws-emerging-tech-constructs';

new QaAppsyncOpensearch(this, 'new-construct', constructProps);
```

## Initializer

```
new QaAppsyncOpensearch(scope: Construct, id: string, props: RagApiGatewayOpensearchProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props RagApiGatewayOpensearchProps

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| existingOpenSearchDomain | [aws_opensearchservice.IDomain](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_opensearchservice.IDomain.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Existing domain for the OpenSearch Service. |
| openSearchSecret | [aws_secrets_manager.ISecret](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Secret containing credentials to authenticate to the existing opensearch domain. |
| openSearchIndexName | string | ![Required](https://img.shields.io/badge/required-ff0000) | Domain endpoint for the OpenSearch Service. |
| cognitoUserPool | [cognito.IUserPool](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.IUserPool.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Cognito user pool used for authentication. |
| vpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Custom properties for a VPC the construct will create. This VPC will be used by the Lambda functions the construct creates. Providing both this and existingVpc is an error. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC in which to deploy the construct. Providing both this and vpcProps is an error. |
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing security group allowing access to opensearch. Used by the lambda functions built by this construct. If not provided, the construct will create one. |
| existingqaBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of an EventBridge bus. If not provided, the construct will create one. |
| existingInputAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error. |
| bucketInputsAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket. Providing both this and `existingInputAssetsBucketObj` will cause an error. |
| stage | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Value will be appended to resources name Service. |
| existingMergedApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing merged api instance. The merge API provode a federated schema over source API schemas.|

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | The VPC used by the construct (whether created by the construct or providedb by the client) |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | The VPC used by the construct (whether created by the construct or providedb by the client) |
| qaBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | The Event bus used by the construct (whether created by the construct or providedb by the client) |
| s3InputAssetsBucketInterface | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | Returns an instance of s3.IBucket created by the construct |
| s3InputAssetsBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Returns an instance of s3.Bucket created by the construct. IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props, this property will be undefined |
| graphqlApi| [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.GraphqlApi.html) | Returns an instance of appsync.IGraphqlApi created by the construct | 

## Default properties

Out of the box implementation of the Construct without any override will set the following defaults:

### AppSync

### Amazon S3 Bucket

- Uses existing bucket if provided, otherwise creates a new one



## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | <>message | This error happens when <> | Provide a valid value for the <> |

## Architecture
![Architecture Diagram](architecture.png)

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.