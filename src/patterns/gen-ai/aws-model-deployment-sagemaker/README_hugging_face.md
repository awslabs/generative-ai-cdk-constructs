# aws-model-deployment-sagemaker (HuggingFaceSageMakerEndpoint)

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

This construct is provided here to simplify the deployment of foundation models on Amazon SageMaker from Models supported by [Hugging Face LLM Inference Container for Amazon SageMaker](https://huggingface.co/blog/sagemaker-huggingface-llm)

This construct only work when region of the stack is specified explicitly:
```
env: {
    region: 'eu-west-1',
},
```

Here is a minimal deployable pattern definition:

```typescript

import { Construct } from 'constructs';
import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { SageMakerInstanceType, HuggingFaceSageMakerEndpoint, DeepLearningContainerImage } from '@cdklabs/generative-ai-cdk-constructs';

// Deploy a model supported by HuggingFace LLM Inference Container
new HuggingFaceSageMakerEndpoint(this, 'Mistral', {
  modelId: 'mistralai/Mistral-7B-Instruct-v0.1',
  instanceType: SageMakerInstanceType.ML_G5_2XLARGE,
  container:
    DeepLearningContainerImage.HUGGINGFACE_PYTORCH_TGI_INFERENCE_2_0_1_TGI1_1_0_GPU_PY39_CU118_UBUNTU20_04,
  environment: {
    SM_NUM_GPUS: '1',
    MAX_INPUT_LENGTH: '2048',
    MAX_TOTAL_TOKENS: '4096',
  },
});
```

## Initializer

```
new HuggingFaceSageMakerEndpoint(scope: Construct, id: string, props: HuggingFaceSageMakerEndpointProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props HuggingFaceSageMakerEndpointProps

## Pattern Construct Props

### HuggingFaceSageMakerEndpoint

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| model | string | ![Required](https://img.shields.io/badge/required-ff0000) | The model to deploy. Must match a model id on HuggingFace |
| container | ContainerImage | ![Required](https://img.shields.io/badge/required-ff0000) | A Deep Learning Container Image. Available list of containers is available through the [official documentation](https://github.com/aws/deep-learning-containers/blob/master/available_images.md) |
| instanceType | SageMakerInstanceType | ![Required](https://img.shields.io/badge/required-ff0000) | The ML compute instance type |
| endpointName | string| ![Optional](https://img.shields.io/badge/optional-4169E1) | Name of the SageMaker endpoint created by the construct |
| instanceCount | Integer | ![Optional](https://img.shields.io/badge/optional-4169E1) | Number of instances to launch initially |
| role | [iam.Role](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Role.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | The IAM role that SageMaker can assume to access model artifacts and docker image for deployment on ML compute instances or for batch transform jobs. If not provided, this construct will create a new role with Full access to SageMaker. |
| environment | [key: string]: string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Custom environment map that the inference code uses when the model is deployed for predictions |
| vpcConfig | [VpcConfigProperty](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sagemaker.CfnModel.VpcConfigProperty.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | A VpcConfig object that specifies the VPC that you want your model to connect to. Control access to and from your model container by configuring the VPC. |
| startupHealthCheckTimeoutInSeconds | Integer | ![Optional](https://img.shields.io/badge/optional-4169E1) | The timeout value, in seconds, for your inference container to pass health check by SageMaker Hosting |

## Pattern Properties

### HuggingFaceSageMakerEndpoint

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
|grantPrincipal| [iam.IPrincipal](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.IPrincipal.html) | Authenticated AWS entity representing a user, service, or application that can call AWS APIs |
|endpointArn| string | ARN of the provisioned SageMaker endpoint |
|cfnModel| [sagemaker.CfnModel](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sagemaker.CfnModel.html) | cfnModel created by the construct |
|cfnEndpoint| [sagemaker.CfnEndpoint](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sagemaker.CfnEndpoint.html) |cfnEndpoint created by the construct |
|cfnEndpointConfig| [sagemaker.CfnEndpointConfig](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sagemaker.CfnEndpointConfig.html) | cfnEndpointConfig created by the construct |
|modelId| string | The model id (matching a HuggingFace model) |
|instanceType| SageMakerInstanceType | The ML compute instance type |
|instanceCount| number | Number of instances to launch initially|
|role| [iam.Role](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Role.html) |The IAM role that SageMaker can assume to access model artifacts and docker image for deployment on ML compute instances or for batch transform jobs |

## Default properties

- iam.Role: if not provided, an iam.Role will be created by the construct with a managed policy providing AmazonSageMakerFullAccess permissions.
- startupHealthCheckTimeoutInSeconds: 600 if not provided
- instanceCount: 1 if not provided

## Troubleshooting



## Architecture
![Architecture Diagram](architecture_HuggingFaceSageMakerEndpoint.png)

## Cost

You are responsible for the cost of the AWS services used while running this construct. As of this revision, the cost for running this construct with the default settings in the US East (N. Virginia) Region is approximately $344.16 per month.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution. The [official documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/inference-cost-optimization.html) provides best practices for inference cost optimization.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.


| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| Amazon SageMaker endpoint | 1 model deployed to 1 endpoint on 1 instance, running 24 hours per day for 30 days, on an ml.c4.2xlarge  | 344.16 |
| Total monthly cost | | 344.16 |

> Warning 
> Cost Management with self hosted models: Be mindful of the costs associated with AWS resources, especially with SageMaker models which are billed by the hour. Leaving serverful resources running for extended periods or deploying numerous LLMs can quickly lead to increased costs.

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

You can visit the [official documentation](https://docs.aws.amazon.com/sagemaker/latest/dg/best-practice-endpoint-security.html) for security best practices related to Amazon SageMaker endpoints.

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

> **Warning**
> This construct allows you to interact with models from third party providers. Your use of the third-party generative AI (GAI) models is governed by the terms provided to you by the third-party GAI model providers when you acquired your license to use them (for example, their terms of service, license agreement, acceptable use policy, and privacy policy).
>
>You are responsible for ensuring that your use of the third-party GAI models comply with the terms governing them, and any laws, rules, regulations, policies, or standards that apply to you.
>
>You are also responsible for making your own independent assessment of the third-party GAI models that you use, including their outputs and how third-party GAI model providers use any data that might be transmitted to them based on your deployment configuration. AWS does not make any representations, warranties, or guarantees regarding the third-party GAI models, which are “Third-Party Content” under your agreement with AWS. This construct is offered to you as “AWS Content” under your agreement with AWS.

## Supported AWS Regions

This solution optionally uses the Amazon SageMaker service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> Note
> If you are looking to deploy models from SageMaker foundation models, you need to request preview access from the AWS console. Futhermore, make sure which regions are currently supported for SageMaker foundation models.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution and the associated instance types. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

## Clean up

When deleting your stack which uses this construct, do not forget to go over the following instructions to avoid unexpected charges:
  - delete the logs uploaded to the account

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
