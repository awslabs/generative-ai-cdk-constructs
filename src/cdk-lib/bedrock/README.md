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

> [!WARNING]
> Important: Amazon Bedrock L2 constructs are transitioning to the AWS CDK core repository. You can now find these constructs at: https://github.com/aws/aws-cdk/tree/main/packages/%40aws-cdk/aws-bedrock-alpha.
> Please migrate to the alpha package, as Bedrock L2 constructs in this repository are now deprecated and will no longer receive updates.

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies and Amazon through a single API, along with a broad set of capabilities you need to build generative AI applications with security, privacy, and responsible AI.

This construct library facilitates the deployment of Amazon Bedrock resources through a higher level, L2 set of constructs. It leverages underlying CloudFormation L1 resources to provision these Bedrock features.

## Table of contents

- [API](../../../apidocs/@cdklabs/namespaces/bedrock/README.md)
- [Models](./models_readme.md)
- [Knowledge Bases](./knowledge-bases/README.md)
- [Agents](./agents/README.md)
- [Guardrails](./guardrails/README.md)
- [Prompt Management](./prompts/README.md)
- [Inference Profiles](./inference-profiles/README.md)
- [Data Sources](./data-sources/README.md)
