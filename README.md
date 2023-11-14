# Amazon Generative AI CDK Constructs

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

## Table of contents

- [Introduction](#introduction)
- [CDK Versions](#cdk-versions)
- [Contributing](#contributing)
- [Adding new constructs](#design-guidelines-and-development-guide)
- [Catalog](#catalog)
- [Sample Use Cases](#sample-use-cases)
- [Operational Metrics Collection](#operational-metrics-collection)
- [Roadmap](#roadmap)
- [Legal Disclaimer](#legal-disclaimer)

# Introduction

The AWS Generative AI Constructs library is an open-source extension of the [AWS Cloud Development Kit (AWS CDK)](https://docs.aws.amazon.com/cdk/v2/guide/home.html) that provides multi-service, well-architected patterns for quickly defining solutions in code to create predictable and repeatable infrastructure, called [constructs](https://docs.aws.amazon.com/cdk/v2/guide/constructs.html). The goal of AWS Generative AI Constructs is to accelerate the experience for developers to build solutions of any size using pattern-based definitions for their architecture, around Generative AI.

The patterns defined in AWS Generative AI Constructs are high level, multi-service abstractions of AWS CDK constructs that have default configurations based on well-architected best practices. The library is organized into logical modules using object-oriented techniques to create each architectural pattern model.

# CDK Versions

AWS Generative AI Constructs and the AWS CDK are independent teams and have different release schedules. Each release of AWS Generative AI Constructs is built against a specific version of the AWS CDK. The [CHANGELOG.md](./CHANGELOG.md) file lists the CDK version associated with each AWS Generative AI Constructs release. For instance, AWS Generative AI Constructs v0.0.0 was built against AWS CDK v2.96.2. This means that to use AWS Generative AI Constructs v0.0.0, your application must include AWS CDK v2.96.2 or later. You can continue to use the latest AWS CDK versions and upgrade the your AWS Generative AI Constructs version when new releases become available.

# Contributing

Contributions of all kinds are welcome! Check out our [contributor guide](./CONTRIBUTING.md)

# Design guidelines and Development guide

If you want to add a new construct to the library, check out our [design guidelines](./DESIGN_GUIDELINES.md), then follow the [development guide](./DEVELOPER_GUIDE.md)

# Catalog

The following constructs are available in the library:

| **Construct**| Generative AI Area |Description| AWS Services used |
|:-------------|:-------------|:-------------|:-------------|
| [Data ingestion pipeline](./src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/) | Generative AI | Ingestion pipeline providing a RAG (Retrieval Augmented Generation) source for storing documents in a knowledge base. | Amazon OpenSearch, AWS Step Functions, Amazon Bedrock, AWS AppSync, AWS Lambda | 
| [Question answering](./src/patterns/gen-ai/aws-qa-appsync-opensearch/) | Generative AI | Question answering against a Large Language Model (Anthropic Claude V2) using a RAG (Retrieval Augmented Generation) source and/or long context window. | Amazon OpenSearch, AWS Lambda, Amazon Bedrock, AWS AppSync | 
| [Summarization](./src/patterns/gen-ai/aws-summarization-appsync-stepfn/) | Generative AI | Document summarization using a Large Language Model (Anthropic Claude V2). | AWS Lambda, Amazon Bedrock, AWS AppSync and Amazon Elasticache for Redis.  |
| [Lambda layer](./src/patterns/gen-ai/aws-langchain-common-layer/) | Generative AI | Python lambda layer providing dependencies and utilities to develop Generative AI applications on AWS. | AWS Lambda, Amazon Bedrock, Amazon SageMaker | 
| [SageMaker model deployment](./src/patterns/gen-ai/aws-model-deployment-sagemaker/) | Generative AI | Deploy a Large Language model from Amazon Jumpstart or Hugging Face to an Amazon SageMaker endpoint. | Amazon SageMaker | 

# Sample Use Cases

This library includes a collection of functional use case implementations to demonstrate the usage of AWS Generative AI Constructs architectural patterns. These can be used in the same way as architectural patterns, and can be conceptualized as an additional "higher-level" abstraction of those patterns. Those patterns (constructs) are composed together into [stacks](https://docs.aws.amazon.com/cdk/latest/guide/stacks.html), forming a "CDK app".

The following use cases are provided as functional examples:

Coming soon

# Operational Metrics Collection

CDK constructs provided collects anonymous operational metrics to help AWS improve the quality and features of the constructs. Data collection is subject to the AWS Privacy Policy (https://aws.amazon.com/privacy/). To opt out of this feature, simply disable it by setting the construct property "enableOperationalMetric" to false for each construct used. Defaults to true.

# Roadmap

Roadmap is available through the [GitHub Project](https://github.com/orgs/awslabs/projects/136)

# Legal Disclaimer

You are responsible for testing, securing, and optimizing the CDK constructs and other content, provided in this library, based on your specific quality control practices and standards. You are also responsible for making sure your use of the CDK constructs and other content, provided in this library, complies with all applicable laws, regulations, and any relevant terms. AWS makes no warranties or representations regarding the CDK constructs contained within this library, and assumes no liability for your use of the CDK constructs. 

By using the content contained within this library, you acknowledge and agree to the terms in this Legal Disclaimer.  


***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.