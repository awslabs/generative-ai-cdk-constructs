# aws-qa-appsync-opensearch
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

- [aws-qa-appsync-opensearch](#aws-qa-appsync-opensearch)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
  - [Initializer](#initializer)
  - [Pattern Construct Props](#pattern-construct-props)
  - [Pattern Properties](#pattern-properties)
  - [Default properties](#default-properties)
    - [Authentication](#authentication)
    - [Networking](#networking)
    - [Amazon S3 Bucket](#amazon-s3-bucket)
    - [Observability](#observability)
  - [Troubleshooting](#troubleshooting)
  - [Architecture](#architecture)
  - [Cost](#cost)
  - [Security](#security)
  - [Supported AWS Regions](#supported-aws-regions)
  - [Quotas](#quotas)
  - [Clean up](#clean-up)

## Overview

This construct provides a question answering workflow (RAG + long context window) using Amazon Bedrock and a provisioned Amazon OpenSearch cluster.

- If a document is provided as an input to the AppSync query, the AWS Lambda function will first verify the length of the document. If the document size is above the max number of tokens for the selected model, the Lambda will query the knowledge base (similarity search) and filter by document name. This assumes that the chunks of texts stored in the knowledge base have the document name as metadata. Otherwise, the content of the document is provided to the LLM as part of the context.
- If no document is provided as input, the Lambda will perform a similarity search against the entire knowledge base.

The construct uses Amazon Bedrock as the large language model provider. amazon.titan-embed-text-v1 is used as the embeddings model to query the knowledge base (provisioned Amazon OpenSearch cluster), and anthropic.claude-v2 for question answering. Make sure both models are enabled in your account. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

The input document must be stored in the input Amazon Simple Storage Service bucket in text format (.txt). Another construct is available to ingest and process files to text format and store them in a knowledge base: [aws-rag-appsync-stepfn-opensearch](../aws-rag-appsync-stepfn-opensearch/README.md).

This construct builds a Lambda function from a Docker image, thus you need to have [Docker desktop](https://www.docker.com/products/docker-desktop/) running on your machine.

Here is a minimal deployable pattern definition:

Typescript

``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps } from 'aws-cdk-lib';
import * as os from 'aws-cdk-lib/aws-opensearchservice';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { QaAppsyncOpensearch, QaAppsyncOpensearchProps } from '@cdklabs/generative-ai-cdk-constructs';

// get an existing OpenSearch provisioned cluster
const osDomain = os.Domain.fromDomainAttributes(this, 'osdomain', {
    domainArn: 'arn:aws:es:us-east-1:XXXXXX',
    domainEndpoint: 'https://XXXXX.us-east-1.es.amazonaws.com'
});

// get an existing userpool 
const cognitoPoolId = 'us-east-1_XXXXX';
const userPoolLoaded = cognito.UserPool.fromUserPoolId(this, 'myuserpool', cognitoPoolId);

const rag_source = new QaAppsyncOpensearch(
      this,
      'QaAppsyncOpensearch',
      {
        existingOpensearchDomain: osDomain,
        openSearchIndexName: 'demoindex',
        cognitoUserPool: userPoolLoaded
      }
    )
```

After deploying the CDK stack, the QA process can be invoked using GraphQL APIs. The API Schema details are present here: resources/gen-ai/aws-qa-appsync-opensearch/schema.graphql.

The code below provides an example of a mutation call and associated subscription to trigger a question and get response notifications. The subscription call will wait for mutation requests to send the notifications.

Subscription call to get notifications about the question answering process:

```
subscription MySubscription {
  updateQAJobStatus(jobid: "123") {
    sources
    question
    answer
    jobstatus
  }
}
____________________________________________________________________
Expected response:

{
  "data": {
    "updateQAJobStatus": {
      "sources": [
        ""
      ],
      "question": "<base 64 encoded question>",
      "answer": "<base 64 encoded answer>",
      "jobstatus": "Succeed"
    }
  }
}
```

Where:

- jobid: id which can be used to filter subscriptions on client side
- answer: response to the question from the large language model as a base64 encoded string
- sources: sources from the knowledge base used as context to answer the question
- jobstatus: status update of the question answering process for the file specified

Mutation call to trigger the question:

```
mutation MyMutation {
  postQuestion(jobid: "123", jobstatus: "", max_docs: 10, question: "d2hhdCBpcyB0aGlzIGRvY3VtZW50IGFib3V0ID8=", streaming:true, verbose: true, filename: "document.txt") {
    answer
    jobid
    jobstatus
    max_docs
    question
    verbose
    streaming
  }
}
____________________________________________________________________
Expected response:

{
  "data": {
    "postQuestion": {
      "answer": null,
      "jobid": null,
      "jobstatus": null,
      "max_docs": null,
      "question": null,
      "verbose": null,
      "streaming": null
    }
  }
}
```

Where:

- jobid: id which can be used to filter subscriptions on client side
- jobstatus: this field will be used by the subscription to update the status of the question answering process for the file specified
- max_docs: maximum number of documents (chunks) retrieved from the knowledge base if the Retrieveal Augmented Generation (RAG) approach is used
- question: question to ask as a base64 encoded string
- verbose: boolean indicating if the [Langchain chain call verbosity](https://python.langchain.com/docs/guides/debugging#chain-verbosetrue) should be enabled or not
- streaming: boolean indicating if the streaming capability of Bedrock is used. If set to true, tokens will be send back to the subscriber as they are generated. If set to false, the entire response will be sent back to the subscriber once generated.
- filename: optional. Name of the file stored in the input S3 bucket, in txt format.

## Initializer

```
new QaAppsyncOpensearch(scope: Construct, id: string, props: QaAppsyncOpensearchProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props QaAppsyncOpensearchProps

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| existingOpenSearchDomain | [opensearchservice.IDomain](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_opensearchservice.IDomain.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Existing domain for the OpenSearch Service. |
| openSearchIndexName | string | ![Required](https://img.shields.io/badge/required-ff0000) | Index name for the Amazon OpenSearch Service. If doesn't exist, the pattern will create the index in the cluster. |
| cognitoUserPool | [cognito.IUserPool](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cognito.IUserPool.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Cognito user pool used for authentication. |
| openSearchSecret | [secret.ISecret](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_secretsmanager.ISecret.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Optional. Secret containing credentials to authenticate to the existing Amazon OpenSearch domain if fine grain control access is configured. If not provided, the Lambda function will use [AWS Signature Version 4](https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_aws-signing.html). |
| vpcProps | [ec2.VpcProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Custom properties for a VPC the construct will create. This VPC will be used by the Lambda functions the construct creates. Providing both this and existingVpc will result in an error.. |
| existingVpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | An existing VPC to deploy the construct. Providing both this and vpcProps will result in an error.. |
| existingSecurityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing security group allowing access to OpenSearch. Used by the Lambda functions built by this construct. If not provided, the construct will create one. |
| existingBusInterface | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of an Amazon EventBridge bus. If not provided, the construct will create one. |
| existingInputAssetsBucketObj | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will result in an error. |
| bucketInputsAssetsProps | [s3.BucketProps](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | User provided props to override the default props for the S3 Bucket. Providing both this and `existingInputAssetsBucketObj` will cause an error. |
| stage | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Value will be appended to resources name Service. |
| existingMergedApi | [appsync.CfnGraphQLApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.CfnGraphQLApi.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing Merged API instance. The Merged API provides a federated schema over source API schemas.|
| observability | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Enables observability on all services used. Warning: associated cost with the services used. Best practice to enable by default. Defaults to true.|
| enableOperationalMetric | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | CDK construct collects anonymous operational metrics to help AWS improve the quality and features of the constructs. Data collection is subject to the AWS Privacy Policy (<https://aws.amazon.com/privacy/>). To opt out of this feature, simply disable it by setting the construct property "enableOperationalMetric" to false for each construct used. Defaults to true.|
| lambdaProvisionedConcurrency | number | ![Optional](https://img.shields.io/badge/optional-4169E1) | Allows a user to configure Lambda provisioned concurrency for consistent performance|

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| vpc | [ec2.IVpc](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html) | The VPC used by the construct (whether created by the construct or provided by the client) |
| securityGroup | [ec2.ISecurityGroup](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.ISecurityGroup.html) | The security group used by the construct (whether created by the construct or provided by the client) |
| qaBus | [events.IEventBus](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html) | The event bus used by the construct (whether created by the construct or provided by the client) |
| s3InputAssetsBucketInterface | [s3.IBucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html) | Returns an instance of s3.IBucket created by the construct |
| s3InputAssetsBucket | [s3.Bucket](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html) | Returns an instance of s3.Bucket created by the construct. IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props, this property will be undefined |
| graphqlApi| [appsync.IGraphqlApi](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_appsync.GraphqlApi.html) | Returns an instance of appsync.IGraphqlApi created by the construct |

## Default properties

Out-of-the-box implementation of the construct without any override will set the following defaults:

### Authentication

- Primary authentication method for the AppSync GraphQL API is Amazon Cognito User Pool.
- Secondary authentication method for the AppSync GraphQL API is IAM role.

### Networking

- Set up a VPC
  - Uses existing VPC if provided, otherwise creates a new one
- Set up a security group used by the AWS Lambda functions
  - Uses existing security group, otherwise creates a new one

### Amazon S3 Bucket

- Uses existing S3 bucket if provided, otherwise creates a new one

### Observability

By default the construct will enable logging and tracing on all services which support those features. Observability can be turned off by setting the pattern property ```observability``` to false.

- AWS Lambda: AWS X-Ray, Amazon CloudWatch Logs
- AWS AppSync GraphQL API: AWS X-Ray, Amazon CloudWatch Logs

## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| | Failed to load information about the requested file | This error happens when the Lambda function was not able to load metadata about the file provided as input parameter | Ensure the file is present in the input bucket |
| | Working on the question | The Lambda function started the question processing | Not an error, informational only |
| | Exception during prediction | An issue happened during the prediction process (call to the large language model via Amazon Bedrock) | Verify the Lambda CloudWatch Logs to get access to the related error. One common issue is throttling. |
| | Done | The process ended successfully | Not an error, informational only |
| | Failed to load document content | This error happens when the Lambda function was not able to load the content of the file provided as input parameter | Ensure the file is present in the input bucket | Ensure the file is present in the input bucket |
| | Failed to load the LLM | Internal error related to loading the large language model client | Check the Lambda error logs to get a detailed description of the issue |

## Architecture

![Architecture Diagram](architecture.png)

## Cost

You are responsible for the cost of the AWS services used while running this construct. As of this revision, the cost for running this construct with the default settings in the US East (N. Virginia) Region is approximately $58.60 per month.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.

| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| Amazon Virtual Private Cloud |  | 0.00 |
| AWS AppSync | 15 requests per hour to trigger questions + (15 x 4 calls to notify clients through subscriptions) = 54,000 requests per month | 0.22 |
| Amazon EventBridge | 15 requests per hour = 10800 custom events per month | 0.01 |
| AWS Lambda | 15 q/a requests per hour through 1 Lambda function with 7076 MB of memory allocated and 512 MB of ephemeral storage allocated and an average run time of 30 seconds = 10800 requests per month | 30.65 |
| Amazon Simple Storage Service | 15 transformed files to text format added every hour with an average size of 1 MB = 21.6 GB per month in S3 Standard Storage | 0.50 |
| Amazon Bedrock | Prompt template is 1,500 characters (~400 tokens), OpenSearch returns 200 tokens per excerpt and only uses top 5 documents (~1000 tokens), User inputs average 1 sentence long (~20 tokens), LLM outputs average 8 sentences (~160 tokens). Using those assumptions: Input Tokens = promptTemplate + context + query -> Input tokens = 1,900 and Output tokens = 160. Using Anthropic Claude V2 for question answering and Amazon Titan for embeddings, with 360 (15x24h) transactions a day, daily cost is 2K tokens/1000 *$0.01102 + 1K tokens/1000 * $0.03268 = $0.05472* 360 = 19.70 | 19.70 |
| Amazon CloudWatch | 15 metrics using 5 GB data ingested for logs | 7.02 |
| AWS X-Ray | 100,000 requests per month through AppSync and Lambda calls | 0.50 |
| Total monthly cost | | 58.60 |

The resources not created by this construct (Amazon Cognito User Pool, Amazon OpenSearch provisioned cluster, AppSync Merged API, AWS Secrets Manager secret) do not appear in the table above. You can refer to the decicated pages to get an estimate of the cost related to those services:

- [Amazon OpenSearch Service Pricing](https://aws.amazon.com/opensearch-service/pricing/)
- [AWS AppSync pricing (for Merged API if used)](https://aws.amazon.com/appsync/pricing/)
- [Amazon Cognito Pricing](https://aws.amazon.com/cognito/pricing/)
- [AWS Secrets Manager Pricing](https://aws.amazon.com/secrets-manager/pricing/)

> **Note**
>You can share the Amazon OpenSearch provisioned cluster between use cases, but this can drive up the number of queries per index and additional charges will apply.

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

This construct requires you to provide an existing Amazon Cognito User Pool and a provisioned Amazon OpenSearch cluster. Please refer to the official documentation on best practices to secure those services:

- [Amazon Cognito](https://docs.aws.amazon.com/cognito/latest/developerguide/security.html)
- [Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/security.html)

Optionnaly, you can provide existing resources to the constructs (marked optional in the construct pattern props). If you chose to do so, please refer to the official documentation on best practices to secure each service:

- [Amazon Simple Storage Service](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html)
- [Amazon VPC](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-best-practices.html)
- [Amazon EventBridge](https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-security.html)
- [AWS AppSync](https://docs.aws.amazon.com/appsync/latest/devguide/best-practices.html)

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon Simple Storage Service bucket, Amazon OpenSearch cluster, Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

> **Note**
> This construct requires you to provide documents in the input assets bucket. You should validate each file in the bucket before using this construct. See [here](https://cheatsheetseries.owasp.org/cheatsheets/File_Upload_Cheat_Sheet.html) for file input validation best practices.
> Ensure you only ingest the appropriate documents into your knowledge base. Any results returned by the knowledge base is eligible for inclusion into the prompt; and therefore, being sent to the LLM. If using a third-party LLM, ensure you audit the documents contained within your knowledge base.
> This construct provides several configurable options for logging. Please consider security best practices when enabling or disabling logging and related features. Verbose logging, for instance, may log content of API calls. You can disable this functionality by ensuring observability flag is set to false.

## Supported AWS Regions

This solution optionally uses the Amazon Bedrock and Amazon OpenSearch Service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
>You need to explicity enable access to models before they are available for use in Amazon Bedrock. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

## Clean up

When deleting your stack which uses this construct, do not forget to go over the following instructions to avoid unexpected charges:

- empty and delete the Amazon Simple Storage Bucket created by this construct if you didn't provide an existing one during the construct creation
- if the observability flag is turned on, delete all the associated logs created by the different services in Amazon CloudWatch logs

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
