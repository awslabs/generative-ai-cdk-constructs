# Amazon Bedrock Construct Library

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

| **Language**                                                                                   | **Package**                             |
| :--------------------------------------------------------------------------------------------- | --------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs` |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`  |
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies and Amazon through a single API, along with a broad set of capabilities you need to build generative AI applications with security, privacy, and responsible AI.

This construct library facilitates the deployment of Knowledge Bases, Bedrock Agents, Guardrails, Prompt Management, and Inference Pipelines. It leverages underlying CloudFormation L1 resources to provision these Bedrock features.

## Table of contents

- [API](#api)
- [Knowledge Bases](./knowledge-bases/README.md)
  - [Vector Knowledge Base](./knowledge-bases/README.md#vector-knowledge-base)
  - [Kendra Knowledge Base](./knowledge-bases/README.md#kendra-knowledge-base)
  - [Graph Knowledge Base](./knowledge-bases/README.md#graph-knowledge-base)
- [Agents](./agents/README.md)
  - [Create an Agent](./agents/README.md#create-an-agent)
  - [Action groups](./agents/README.md#action-groups)
  - [Memory Configuration](./agents/README.md#memory-configuration)
  - [Agent Collaboration](./agents/README.md#agent-collaboration)
  - [Custom Orchestration](./agents/README.md#custom-orchestration)
  - [Agent Alias](./agents/README.md#agent-alias)
- [Guardrails](./guardrails/README.md)
- [Prompt Management](./prompts/README.md)
- [Inference Profiles](./inference-profiles/README.md)
- [Data Sources](./data-sources/README.md)

## API

See the [API documentation](../../../apidocs/@cdklabs/namespaces/bedrock/README.md).
