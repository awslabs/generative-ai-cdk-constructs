# aws-rag-appsync-stepfn-opensearch
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
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) Typescript|`@aws-samples/@emerging_tech_cdk_constructs`|

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

This CDK construct creates a pipeline for RAG (Retrieval augmented generation) source. It ingests documents and then converts them into text formats. This output can be used for scenarios with long context windows. This means that your system can now consider and analyze a significant amount of surrounding information when processing and understanding text. This is especially valuable in tasks like language understanding and document summarization.

Files in PDF format are uploaded to an input Amazon Simple Storage Service (S3) bucket. Authorized clients (Amazon Cognito user pool) will trigger an AWS AppSync mutation to start the ingestion process, and can use subscriptions to get notifications on the ingestion status. The mutation call will trigger an AWS Step Function with three different steps:
- Input validation: an AWS Lambda function will verify the input formats of the files requested for ingestion. If the files are in a format which is not supported by the pipeline, an error message will be returned.
- Transformation: the input files are processed in parallel using a [Map](https://docs.aws.amazon.com/step-functions/latest/dg/amazon-states-language-map-state.html) state through an AWS Lambda. The function uses the [Langchain](https://www.langchain.com/) client to get the content of each file and store in the output bucket the file in text format. This is useful for workflows which want to use a long context window approach and send the entire file as context to a Large Language Model. If the file name already exists in the output bucket, the input file will not be processed.
- Embeddings step: Files processed and stored in the output S3 bucket are consumed by an AWS Lambda function. Chunks from documents are created as well as text embeddings using Amazon Bedrock (model: amazon.titan-embed-text-v1). Those information are then stored in a knowledge base (OpenSearch provisioned cluster). Make sure the model (amazon.titan-embed-text-v1) is enabled in your account. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

Documents stored in the knowledge base contain the following metadata:
- Timestamp: when the embeddings was created (current time in seconds since the Epoch)
- Embeddings model used: amazon.titan-embed-text-v1 

If you have multiple workflows using GraphQL endpoints and want to use a single endpoint, you can use an [AppSync Merged API](https://docs.aws.amazon.com/appsync/latest/devguide/merged-api.html). This construct can take as a parameter an existing AppSync Merged API. In case one is provided to the construct, the mutation call and subsription updates will be targeted at the Merged API.

This construct will require an existing Amazon OpenSearch provisioned cluster with fine grain access control enabled. You can follow the steps in the official [AWS Developer Guide](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/createupdatedomains.html) to create and manage your OpenSearch domain.

AWS Lambda functions provisioned in this construct use [Powertools for AWS Lambda (Python)](https://github.com/aws-powertools/powertools-lambda-python) for tracing, structured logging and custom metrics creation. The table below provides the metrics created and the name of the service (logging key customers can use to search log operations) which can be access from Amazon Cloudwatch Logs.

| **AWS Lambda**     | **Service**        | **Custom Metrics** |
|:-------------|:----------------|-----------------|
| input_validation |INGESTION_INPUT_VALIDATION | SupportedFile (number of requests which provide a supported file format), UnsupportedFile (number of requests which provide an unsupported file format) |
| s3_file_transformer | INGESTION_FILE_TRANSFORMER | N/A |
| embeddings_job | INGESTION_EMBEDDING_JOB | N/A |

Here is a minimal deployable pattern definition:

Typescript
``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as os from 'aws-cdk-lib/aws-opensearchservice';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { RagApiGatewayOpensearch, RagApiGatewayOpensearchProps } from '@aws-samples/aws-emerging-tech-constructs';

// get an existing OpenSearch provisioned cluster
const osDomain = os.Domain.fromDomainAttributes(this, 'osdomain', {
    domainArn: 'arn:aws:es:us-east-1:XXXXXX',
    domainEndpoint: 'https://XXXXX.us-east-1.es.amazonaws.com'
});

// get an existing userpool 
const cognitoPoolId = 'us-east-1_XXXXX';
const userPoolLoaded = cognito.UserPool.fromUserPoolId(this, 'myuserpool', cognitoPoolId);

const rag_source = new emergingTech.RagAppsyncStepfnOpensearch(
      this,
      'RagAppsyncStepfnOpensearch',
      {
        existingOpensearchDomain: osDomain,
        openSearchIndexName: 'demoindex',
        cognitoUserPool: userPoolLoaded
      }
    )
```

The code below provides an example of a mutation call and associated subscription to trigger a pipeline call and get status notifications:

Mutation call to trigger the ingestion process:

```
mutation MyMutation {
  ingestDocuments(ingestioninput: {files: [{status: "", name: "a.pdf"}, {status: "", name: "b.pdf"}], ingestionjobid: "123"}) {
    ingestionjobid
  }
}

```
Where:
- files.status: this field will be used by the subscription to update the status of the ingestion for the file specified
- files.name: name of the file stored in the input S3 bucket
- ingestionjobid: id which can be used to filter subscriptions on client side

Subscription call to get notifications about the ingestion process:

```
subscription MySubscription {
  updateIngestionJobStatus(ingestionjobid: "123") {
    files {
      name
      status
    }
  }
}
```
Where:
- ingestionjobid: id which can be used to filter subscriptions on client side
The subscription will display the status and name for each file 
- files.status: status update of the ingestion for the file specified
- files.name: name of the file stored in the input S3 bucket

## Initializer

```
new RagApiGatewayOpensearch(scope: Construct, id: string, props: RagApiGatewayOpensearchProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props [RagApiGatewayOpensearchProps](../aws-rag-appsync-stepfn-opensearch/index.ts)

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| existingOpenSearchDomain | [aws_opensearchservice.IDomain](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_opensearchservice.IDomain.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Existing domain for the Amazon OpenSearch Service. |
| openSearchIndexName | string | ![Required](https://img.shields.io/badge/required-ff0000) | Domain endpoint for the Amazon OpenSearch Service. |
| cognitoUserPool | [cognito.IUserPool](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.IUserPool.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Cognito user pool used for authentication. |
| openSearchSecret | [aws_secrets_manager.ISecret](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Optional. Secret containing credentials to authenticate to the existing Amazon OpenSearch domain if fine grain control access if configured. If not provided, the Lambda function will use [AWS Signature Version 4](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html). |
| vpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Custom properties for a VPC the construct will create. This VPC will be used by the Lambda functions the construct creates. Providing both this and existingVpc is an error. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC in which to deploy the construct. Providing both this and vpcProps is an error. |
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing security group allowing access to Amazon OpenSearch domain. Used by the lambda functions built by this construct. If not provided, the construct will create one. |
| existingIngestionBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of an Amazon EventBridge bus. If not provided, the construct will create one. |
| existingInputAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error. |
| bucketInputsAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket. Providing both this and `existingInputAssetsBucketObj` will cause an error. |
| existingProcessedAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of S3 Bucket object, providing both this and `bucketProcessedAssetsProps` will cause an error. |
| bucketProcessedAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket. Providing both this and `existingProcessedAssetsBucketObj` will cause an error. |
| stage | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Value will be appended to resources name Service. |
| existingMergedApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing merged api instance. The merge API provides a federated schema over source API schemas.|
| observability | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enables observability on all services used. Warning: associated cost with the services used. Best practice to enable by default. Defaults to true.|

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | The VPC used by the construct (whether created by the construct or providedb by the client) |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | The VPC used by the construct (whether created by the construct or providedb by the client) |
| ingestionBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | The VPC used by the construct (whether created by the construct or providedb by the client) |
| s3InputAssetsBucketInterface | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | Returns an instance of s3.IBucket created by the construct |
| s3InputAssetsBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Returns an instance of s3.Bucket created by the construct. IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props, this property will be undefined |
| s3ProcessedAssetsBucketInterface | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | Returns an instance of s3.IBucket created by the construct |
| s3ProcessedAssetsBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Returns an instance of s3.IBucket created by the construct. IMPORTANT: If existingProcessedAssetsBucketObj was provided in Pattern Construct Props, this property will be undefined |
| graphqlApi| [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.GraphqlApi.html) | Returns an instance of appsync.IGraphqlApi created by the construct |
| stateMachine| [StateMachine](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions.StateMachine.html) | Returns an instance of appsync.IGraphqlApi created by the construct | 

## Default properties

Out of the box implementation of the Construct without any override will set the following defaults:

### Authentication

- Primary authentication method for the AppSync GraphQL API is Amazon Cognito User Pool.
- Secondary authentication method for the AppSync graphQL API is IAM role.

### Networking

- Set up a VPC
    - Uses existing VPC if provided, otherwise creates a new one
- Set up a Security Group used by the AWS Lambda functions
    - Uses existing Security Group, otherwise creates a new one


### Amazon S3 Buckets

- Sets up two Amazon S3 Buckets
    - Uses existing buckets if provided, otherwise creates new ones


### Observability

By default the construct will enable logging and tracing on all services which support those features. Observability can be turned off by setting the pattern property ```observability``` to false. 
- AWS Lambda: AWS X-Ray, Amazon Cloudwatch Logs
- AWS Step Function: AWS X-Ray, Amazon Cloudwatch Logs
- AWS AppSync GraphQL api: AWS X-Ray, Amazon Cloudwatch Logs

## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | <>message | This error happens when <> | Provide a valid value for the <> |

## Architecture
![Architecture Diagram](architecture.png)

## Cost

You are responsible for the cost of the AWS services used while running this construct. As of this revision, the cost for running this construct with the default settings in the US East (N. Virginia) Region is approximately $X per month.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.


| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| AWS Step Functions | |  |
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

The resources not created by this construct (Amazon Cognito User Pool, Amazon OpenSearch provisioned cluster, AppSync Merged API, AWS Secrets Manager secret) do not appear in the table above. You can refer to the decicated pages to get an estimate of the cost related to those services:
- [Amazon OpenSearch Service Pricing](https://aws.amazon.com/opensearch-service/pricing/)
- [AWS AppSync pricing (for Merged API if used)](https://aws.amazon.com/appsync/pricing/)
- [Amazon Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [AWS Secrets Manager Pricing](https://aws.amazon.com/secrets-manager/pricing/)

> **Note**
>You can share the Amazon OpenSearch provisioned cluster between use cases, but this can drive up the number of queries per index and additional charge will apply.

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

## Supported AWS Regions

This solution optionally uses the Amazon Bedrock and Amazon OpenSearch service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
>You need to explicity enable access to models before they are available for use in the Amazon Bedrock service. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.