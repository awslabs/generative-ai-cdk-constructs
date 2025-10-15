# aws-aoss-cw-dashboard

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

- [aws-aoss-cw-dashboard](#aws-aoss-cw-dashboard)
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

Thanks to @rddefauw for the initial version of this construct.

## Overview

This construct provides an Amazon CloudWatch dashboard to monitor metrics on Amazon OpenSearch Serverless usage. The specific list of metrics created by this construct is available [here](#default-properties). More information about the metrics displayed can be found [here](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/monitoring-cloudwatch.html).

Here is a minimal deployable pattern definition:

TypeScript

```typescript fixture=default-aoss-dashboard
const bddashboard = new genaicdk.AossCwDashboard(this, 'AossDashboardConstruct', {});

// provides monitoring for a specific collection
bddashboard.addCollectionMonitoringbyAttributes(
        "mycollection",
        "mycollectionid",
        {},
    );

```

## Initializer

```
new AossCwDashboard(scope: Construct, id: string, props: AossCwDashboardProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props AossCwDashboardProps

## Pattern Construct Props


| **Name**                               | **Type**                                                                                                                                               | **Required**                                              | **Description**                                                                                                                                                                                                                                                                                                                                                                                               |
| :--------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| existingDashboard               | [aws_cloudwatch.Dashboard](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Dashboard.html)                                | ![Optional](https://img.shields.io/badge/optional-4169E1) | Existing dashboard to be used by the construct. **Mutually exclusive** with ```dashboardName``` - only one should be specified.                                                                                                                                                                                                                                                           |
| dashboardName | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | A name for the dashboard which will be created. If not provided, the construct will create a new dashboard named 'AossMetricsDashboard'. **Mutually exclusive** with ```existingDashboard``` - only one should be specified.                                                                                                                                                                                                                                                            |

## Pattern Properties


| **Name**                     | **Type**                                                                                                                  | **Description**                                                                                                                                                                |
| :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dashboard                          | [aws_cloudwatch.Dashboard](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Dashboard.html)                                     | The CloudWatch Dashboard used by the construct (whether created by the construct or provided by the client)                                                                                     |

## Methods

### addCollectionMonitoringbyAttributes()

Provide metrics for a specific Amazon OpenSearch Serverless collection

@param {string} collectionName - Name of the aoss collection to monitor.

@param {string} collectionId - Id of the aoss collection to monitor.

@param {CollectionMonitoringProps} props - user provided props for monitoring.

### addCollectionMonitoringByCollection()

Provide metrics for a specific Amazon OpenSearch Serverless collection

@param {string} collection - CfnCollection to monitor.

@param {CollectionMonitoringProps} props - user provided props for monitoring.

### addIndexMonitoringByAtributes()

Add a new row to the dashboard providing metrics for a specific Amazon OpenSearch Serverless index

@param {string} collectionName - Name of the aoss collection to monitor.

@param {string} collectionId - Id of the aoss collection to monitor.

@param {string} IndexName - Name of the aoss index to monitor.

@param {string} IndexId - Id of the aoss index to monitor.

@param {IndexMonitoringProps} props - user provided props for monitoring.

## Default properties

Out-of-the-box implementation of the construct without any override will set the following defaults:

### Dashboard

- Dashboard name is ```AossMetricsDashboard```

### addCollectionMonitoringbyAttributes, addCollectionMonitoringByCollection

- Period (the period over which the specified statistic is applied) is set to one hour
- ClientId
- The following metrics are displayed for the model specified:
    - OpenSearch response codes
    - Search Request Latency
    - SearchRequestErrors
    - Ingestion Request Successes
    - Ingestion Request Rate
    - Ingestion Request Latency
    - Ingestion Request Errors

### addAllModelsMonitoring

- Period (the period over which the specified statistic is applied) is set to one hour
- ClientId
- The following metrics are displayed for all models:
    - Deleted documents
    - Searchable documents
    - S3 storage consumption
    - Document ingestion rate

## Cost

You are responsible for the cost of the AWS services used while running this construct.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution:

- [Amazon CloudWatch pricing](https://aws.amazon.com/cloudwatch/pricing/)

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

Optionnaly, you can provide existing resources to the constructs (marked optional in the construct pattern props). If you chose to do so, please refer to the official documentation on best practices to secure each service:

- [Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/security.html)

If you grant access to a user to your account where this construct is deployed, this user may access information stored by the construct (Amazon CloudWatch logs). To help secure your AWS resources, please follow the best practices for [AWS Identity and Access Management (IAM)](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

## Supported AWS Regions

This solution depends uses the Amazon OpenSearch Serverless and Amazon CloudWatch services, which are not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

---

&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
