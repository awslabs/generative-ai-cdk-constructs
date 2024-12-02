# aws-bedrock-cw-dashboard

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

## Table of contents

- [aws-bedrock-cw-dashboard](#aws-bedrock-cw-dashboard)
  - [Table of contents](#table-of-contents)
  - [Credits](#credits)
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

## Credits

Thanks to @jimini55, @scoropeza, @PaulVincent707, @Ishanrpatel, @lowelljehu and @rddefauw for the initial version of this construct.

## Overview

This construct provides an Amazon CloudWatch dashboard to monitor metrics on Amazon Bedrock models usage. The specific list of metrics created by this construct is available [here](#default-properties).

These metrics can be used for a variety of use cases including:

- Comparing latency between different models using the InvocationLatency metric with ModelId dimension
- Measuring token count (input & output) to assist in purchasing provisioned throughput by analyzing the InputTokenCount and OutputTokenCount
- Detecting and alerting on throttling with an CloudWatch Alarm with the InvocationThrottles metric

For a specific model, if input/output tokens cost is specified, a widget with on-demand input and total tokens cost will be added. Please refer to the [Amazon Bedrock Pricing page](https://aws.amazon.com/bedrock/pricing/) for details about pricing.

> **Note:** Native runtime metrics for Amazon Bedrock don't support dimensions beyond model ID. If a single account is hosting multiple workloads in the same region, the Bedrock metrics would be aggregated across all workloads.

Here is a minimal deployable pattern definition:

TypeScript

```typescript
import { Construct } from 'constructs';
import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { BedrockCwDashboard } from '@cdklabs/generative-ai-cdk-constructs';

const bddashboard = new BedrockCwDashboard(this, 'BedrockDashboardConstruct');

// provides monitoring for a specific model
bddashboard.addModelMonitoring('claude3haiku', 'anthropic.claude-3-haiku-20240307-v1:0');

// provides monitoring for a specific model with on-demand pricing calculation
// pricing details are available here: https://aws.amazon.com/bedrock/pricing/
bddashboard.addModelMonitoring('claude3haiku', 'anthropic.claude-3-haiku-20240307-v1:0', {
    inputTokenPrice: 0.00025,
    outputTokenPrice: 0.00125
});

// provides monitoring of all models
bddashboard.addAllModelsMonitoring();
```

Optionally, you can also use the [Bedrock models](../../../cdk-lib/bedrock/models.ts) to access the modelId:

```typescript

import { bedrock, BedrockCwDashboard } from '@cdklabs/generative-ai-cdk-constructs';

...

// provides monitoring for a specific model
bddashboard.addModelMonitoring(
    'claude3haiku', 
    bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0.modelId
);

...

```

Python

```python
from constructs import Construct
from cdklabs.generative_ai_cdk_constructs import BedrockCwDashboard

bddashboard = BedrockCwDashboard(self, 'BedrockDashboardConstruct')

# provides monitoring for a specific model
bddashboard.add_model_monitoring(
    model_name: 'claude3haiku',
    model_id: 'anthropic.claude-3-haiku-20240307-v1:0'
)

# provides monitoring for a specific model with on-demand pricing calculation
# pricing details are available here: https://aws.amazon.com/bedrock/pricing/
bddashboard.add_model_monitoring(
    model_name: 'claude3haiku',
    model_id: 'anthropic.claude-3-haiku-20240307-v1:0',
    input_token_price: 0.00025,
    output_token_price: 0.00125
)

# provides monitoring of all models
bddashboard.add_all_models_monitoring()
```

## Initializer

```
new BedrockCwDashboard(scope: Construct, id: string, props: BedrockCwDashboardProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props BedrockCwDashboardProps

## Pattern Construct Props


| **Name**                               | **Type**                                                                                                                                               | **Required**                                              | **Description**                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| existingDashboard               | [aws_cloudwatch.Dashboard](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Dashboard.html)                                | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing dashboard to be used by the construct. **Mutually exclusive** with ```dashboardName``` - only one should be specified.                                                                                                                                                                                                                                                           |
| dashboardName | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | A name for the dashboard which will be created. If not provided, the construct will create a new dashboard named 'BedrockMetricsDashboard'. **Mutually exclusive** with ```existingDashboard``` - only one should be specified.                                                                                                                                                                                                                                                            |

## Pattern Properties


| **Name**                     | **Type**                                                                                                                  | **Description**                                                                                                                                                                |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dashboard                          | [aws_cloudwatch.Dashboard](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Dashboard.html)                                     | The CloudWatch Dashboard used by the construct (whether created by the construct or provided by the client)                                                                                     |

## Methods

### addModelMonitoring()

Provide runtime metrics for a specific model id in Bedrock. If input/output tokens cost is specified, a widget with on-demand input and total tokens cost will be added.

@param {string} modelName - Model name as it will appear in the dashboard row widget.

@param {string} modelId - Bedrock model id as defined in https://docs.aws.amazon.com/bedrock/latest/userguide/model-ids.html

@param {ModelMonitoringProps} props - user provided props for the monitoring.

### addAllModelsMonitoring()

Add a new row to the dashboard providing runtime metrics across all model ids in Bedrock. 

@param {ModelMonitoringProps} props - user provided props for the monitoring.

## Default properties

Out-of-the-box implementation of the construct without any override will set the following defaults:

### Dashboard

- Dashboard name is ```BedrockMetricsDashboard```
- CfnOutput containing the created CloudWatch dashboard URL

### addModelMonitoring

- Period (the period over which the specified statistic is applied) is set to one hour
- The following metrics are displayed for the model specified:
    - InputTokenCount
    - OutputTokenCount
    - OutputImageCount
    - InvocationLatency (min, max, average)
    - Invocations (sample count)
    - InvocationClientErrors
    - InvocationServerErrors
    - InvocationThrottles
    - LegacyModelInvocations
If pricing is specified, a new widget will be added with the following metrics:
    - Input Token Cost
    - Output Token Cost
    - Total Token Cost

More details for each one of the metrics can be found in the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html#runtime-cloudwatch-metrics)

### addAllModelsMonitoring

- Period (the period over which the specified statistic is applied) is set to one hour
- The following metrics are displayed for all models:
    - InputTokenCount
    - OutputTokenCount
    - InvocationLatency (min, max, average)
    - Invocations (sample count)
    - InvocationClientErrors
    - InvocationServerErrors
    - InvocationThrottles
    - LegacyModelInvocations

More details for each one of the metrics can be found in the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/monitoring.html#runtime-cloudwatch-metrics)

## Cost

You are responsible for the cost of the AWS services used while running this construct.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution:

- [Amazon CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)
- [Amazon Bedrock pricing](https://aws.amazon.com/bedrock/pricing/)

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

Optionnaly, you can provide existing resources to the constructs (marked optional in the construct pattern props). If you chose to do so, please refer to the official documentation on best practices to secure each service:

- [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/security.html)

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

## Supported AWS Regions

This solution depends uses the Amazon Bedrock and Amazon CloudWatch services, which are not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
> You need to explicity enable access to models before they are available for use in Amazon Bedrock. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

---

&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
