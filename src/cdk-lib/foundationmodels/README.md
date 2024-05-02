# Amazon Bedrock Foundation Models Construct Library
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
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|

This construct library provides a resource that creates a class representing foundation models available in Amazon Bedrock.

## Table of contents
- [API](#api)
- [BedrockFoundationModel](#models)


## API
See the [API documentation](../../../apidocs/modules/opensearchserverless.md).

## BedrockFoundationModel
The `BedrockFoundationModel` resource creates an instance of a Foundation Model that is used by Amazon Bedrock Agents and Knowledge Bases.

TypeScript

```ts
import { foundation_models } from '@cdklabs/generative-ai-cdk-constructs';

const claudeV3SonnetModel = foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V3_SONNET;
```

Python
```python
from cdklabs.generative_ai_cdk_constructs import (
    foundation_models,
)

claudeV3SonnetModel = foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V3_SONNET
```