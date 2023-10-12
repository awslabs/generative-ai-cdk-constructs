# aws-langchain-common-layer
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->

| **Reference Documentation**:| <span style="font-weight: normal">TODO</span>|
|:-------------|:-------------|
<div style="height:8px"></div>

| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) Typescript|`@aws-samples/@emerging_tech_cdk_constructs`|

## Credits

This construct is a modified version of the following construct: https://github.com/aws-samples/aws-genai-llm-chatbot/tree/main/lib/model-interfaces/langchain 

Thanks to the original authors: 
- [Bigad Soleiman](https://www.linkedin.com/in/bigadsoleiman/)
- [Sergey Pugachev](https://www.linkedin.com/in/spugachev/)

## Precautions

- Cost Management with self-hosted models on SageMaker: Be mindful of the costs associated with AWS resources, especially with SageMaker models billed by the hour.

- Licensing obligations: If you choose to use any datasets or models alongside the provided samples, ensure you check the LLM code and comply with all licensing obligations attached to them.

## Overview

This construct provides two AWS Lambda layers:
- one dependency layer which contains needed python pip packages to build Generative AI applications based on the [Langchain](https://python.langchain.com/docs/get_started/introduction) client. The list of libraries installed and their version is available [here](../../../../layers/langchain-common-deps/requirements.txt)
- one Python code layer which contains helper functions to accelerate development of Generative AI applications on AWS based on the [Langchain](https://python.langchain.com/docs/get_started/introduction) client.

This construct has a dependency on [Lambda Power Tools](https://github.com/aws-powertools/powertools-lambda-python).

Here is a minimal deployable pattern definition:

Typescript
``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { LangchainCommonDepsLayer, LangchainCommonLayer } from '@aws-samples/aws-emerging-tech-constructs';

const lambdaArchitecture = lambda.Architecture.ARM_64;
const lambdaRuntime = lambda.Runtime.PYTHON_3_10;

// This is one way of getting a lambda powertools layer
const powerToolsArn =
        lambdaArchitecture === lambda.Architecture.X86_64
          ? `arn:aws:lambda:${cdk.Aws.REGION}:017000801446:layer:AWSLambdaPowertoolsPythonV2:42`
          : `arn:aws:lambda:${cdk.Aws.REGION}:017000801446:layer:AWSLambdaPowertoolsPythonV2-Arm64:42`;

const lambdaDepsLayer = new emergingTech.LangchainCommonDepsLayer(this, 'lambdagenaidepslayer', {
        runtime: lambdaRuntime,
        architecture: lambdaArchitecture,
        autoUpgrade: true
      });

const lambdaCommonLayer = new emergingTech.LangchainCommonLayer(this, 'lambdagenaicommonlayer', {
runtime: lambdaRuntime,
architecture: lambdaArchitecture,
});

//Then pass the layers above to your lambda function constructor
```

## Initializer

```
new LangchainCommonDepsLayer(scope: Construct, id: string, props: LangchainLayerProps)
```

```
new LangchainCommonLayer(scope: Construct, id: string, props: LangchainLayerProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props LangchainLayerProps

## Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| runtime | [lambda.Runtime](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Runtime.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function runtime compatible with this Layer. |
| architecture | [lambda.Architecture](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Architecture.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function architecture compatible with this Layer. |
| autoUpgrade | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Add '--upgrade' to pip install requirements.txt. In case of a LangchainCommonLayer, this parameter is not used. |

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| layer | [lambda.LayerVersion](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.LayerVersion.html) | The instance of lambda.LayerVersion created by the construct |

## Default properties

Out of the box implementation of the Construct without any override will not set any default values. Depending on the features enabled, user will need to provide environmental variable values to the AWS Lambda function used by the LangchainCommonLayer. For the available 

## Python utility layer (LangchainCommonLayer)

This utility layer provides helper functions to accelerate the development of Generative AI applications on AWS. 

| **Provider** | **Prediction (waiting)** | **Streaming** |
|:-------------|:----------------|-----------------|
| OpenAI | ✅ | ✅  |
| Sagemaker | ✅ | ❌ |
| Amazon Bedrock | ✅ | ✅  |

### Registry

The model registry is a catalog, statically initialized, providing the list of supported models by the library. 

Available models in the registry:

| **Provider** | **Model** |
|:-------------|:----------------|
| OpenAI | All |
| Sagemaker | FalconLite, Llama2 |
| Amazon Bedrock | All |

### Adapters

Adapters provide a generic interface to call models from different providers using the same input/output format. Adapters will correctly configure the client (boto3, openai,...) and provide the glue code to correctly serialize/deserialize requests (input/output consistency). 

```
from genai_core.adapters.registry import registry

adapter = registry.get_adapter(f"{provider}.{model_id}")

model = adapter(
        model_id=model_id,
        session_id=session_id,
        user_id=user_id,
        model_kwargs=model_kwargs,
        adapter_kwargs=adapter_args
    )

response = model.run(
        prompt=prompt,
        tools=[],
    )
```


## Troubleshooting

| **Error Code**     | **Message**        | **Description** |**Fix** |
|:-------------|:----------------|-----------------|-----------------|
| 601 | <llm_name> Exception during prediction | An exception happened while the Langchain client was running a prediction with the selected LLM | Verify logs to get the proper error message from the Langchain client |

## Architecture
![Architecture Diagram](architecture.png)

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.