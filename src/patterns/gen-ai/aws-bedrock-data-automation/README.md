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
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

## Table of contents

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


## Overview

## Overview

The AWS Bedrock Data Automation construct simplifies the process of extracting insights from unstructured multimodal content (documents, images, video, and audio) using Amazon Bedrock Data Automation. It provides a complete infrastructure setup with Lambda functions for managing the entire workflow - from creating custom blueprints and projects to handling data processing automation and monitoring task status. The construct automates the deployment of necessary AWS resources and configures the required IAM permissions, making it easier for developers to build and manage intelligent document processing, media analysis, and other multimodal data-centric automation solutions.


## Initializer

TypeScript:
```typescript
import { BedrockDataAutomation } from 'generative-ai-cdk-constructs';

const bdaConstruct = new BedrockDataAutomation(this, 'MyBDAConstruct', {
  inputBucketName: 'XXXXXXXXXXXXXXX',
  outputBucketName: 'XXXXXXXXXXXXXXXX',
  isCustomBDABlueprintRequired: true,
  isBDAProjectRequired: true,
  isBDAInvocationRequired: true,
  isStatusRequired: true
});
```

```python
from generative_ai_cdk_constructs import BedrockDataAutomation

bda_construct = BedrockDataAutomation(self, "MyBDAConstruct",
    input_bucket_name="XXXXXXXXXXXXXXX",
    output_bucket_name="XXXXXXXXXXXXXXXX",
    is_custom_bda_blueprint_required=True,
    is_bda_project_required=True,
    is_bda_invocation_required=True,
    is_status_required=True
)

```


## props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| inputBucketName | string | No | Name of the S3 bucket for uploading blueprint schema file. If not provided, a new bucket will be created. |
| isCustomBDABlueprintRequired | boolean | No | Flag to indicate if custom Bedrock Data Automation blueprint creation is required. |
| isBDAProjectRequired | boolean | No | Flag to indicate if Bedrock Data Automation project creation is required. |
| isBDAInvocationRequired | boolean | No | Flag to indicate if Bedrock Data Automation invocation functionality is required. |
| isStatusRequired | boolean | No | Flag to indicate if status checking functionality is required. |
| outputBucketName | string | No | Name of the S3 bucket for storing output files. If not provided, a new bucket will be created when isBDAInvocationRequired is true. |
| outputFilename | string | No | Name of the output file for processed data. |
