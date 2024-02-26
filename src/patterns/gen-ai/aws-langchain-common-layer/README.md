# aws-langchain-common-layer
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

## Table of contents

- [Credits](#credits)
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

## Credits

This construct is a modified version of the following construct: https://github.com/aws-samples/aws-genai-llm-chatbot/tree/main/lib/model-interfaces/langchain 

Thanks to the original authors: 
- [Bigad Soleiman](https://www.linkedin.com/in/bigadsoleiman/)
- [Sergey Pugachev](https://www.linkedin.com/in/spugachev/)

## Overview

This construct provides two AWS Lambda layers:
- one dependency layer which contains needed python pip packages to build generative AI applications based on the [LangChain](https://python.langchain.com/docs/get_started/introduction) client. The list of libraries installed and their version is available [here](../../../../layers/langchain-common-deps/requirements.txt)
- one Python code layer which contains helper functions to accelerate development of generative AI applications on AWS based on the [LangChain](https://python.langchain.com/docs/get_started/introduction) client.

This construct has a dependency on [Powertools for AWS Lambda (Python)](https://github.com/aws-powertools/powertools-lambda-python).

Here is a minimal deployable pattern definition:

TypeScript
``` typescript
import { Construct } from 'constructs';
import { Stack, StackProps, Aws } from 'aws-cdk-lib';
import { LangchainCommonDepsLayer, LangchainCommonLayer } from '@cdklabs/generative-ai-cdk-constructs';

const lambdaArchitecture = lambda.Architecture.ARM_64;
const lambdaRuntime = lambda.Runtime.PYTHON_3_10;

// This is one way of getting a lambda powertools layer
const powerToolsArn =
        lambdaArchitecture === lambda.Architecture.X86_64
          ? `arn:${Aws.PARTITION}:lambda:${Aws.REGION}:017000801446:layer:AWSLambdaPowertoolsPythonV2:42`
          : `arn:${Aws.PARTITION}:lambda:${Aws.REGION}:017000801446:layer:AWSLambdaPowertoolsPythonV2-Arm64:42`;

const lambdaDepsLayer = new LangchainCommonDepsLayer(this, 'lambdagenaidepslayer', {
        runtime: lambdaRuntime,
        architecture: lambdaArchitecture,
        autoUpgrade: true
      });

const lambdaCommonLayer = new LangchainCommonLayer(this, 'lambdagenaicommonlayer', {
    compatibleRuntimes: [lambdaRuntime],
    compatibleArchitectures: [lambdaArchitecture],
});

//Then pass the layers above to your lambda function constructor
```

Python
``` python
from constructs import Construct
from aws_cdk import Aws, aws_lambda as lambda_
from cdklabs.generative_ai_cdk_constructs import (
    LangchainCommonDepsLayer,
    LangchainCommonLayer,
)

lambda_architecture = lambda_.Architecture.ARM_64
lambda_runtime = lambda_.Runtime.PYTHON_3_10

# This is one way of getting a lambda powertools layer
powertools_arn = (
    f'arn:aws:lambda:{Aws.REGION}:017000801446:'
    'layer:AWSLambdaPowertoolsPythonV2-Arm64:42'
)

if lambda_architecture == lambda_.Architecture.X86_64:
    powertools_arn = (
        f'arn:aws:lambda:{Aws.REGION}:017000801446:'
        'layer:AWSLambdaPowertoolsPythonV2:42'
    )

lambda_deps_layer = LangchainCommonDepsLayer(
    self,
    'lambdagenaidepslayer',
    runtime=lambda_runtime,
    architecture=lambda_architecture,
    auto_upgrade=True,
)

lambda_common_layer = LangchainCommonLayer(
    self,
    'lambdagenaicommonlayer',
    compatible_runtimes=[lambda_runtime],
    compatible_architectures=[lambda_architecture],
)

# Then pass the layers above to your lambda function constructor
```

Here is an example of a Lambda handler which uses the layers above:

```
import json
import boto3
import uuid
from genai_core.adapters.registry import registry

sequence_number = 0

def on_llm_new_token(
    connection_id, user_id, session_id, self, token, run_id, *args, **kwargs
):
    global sequence_number
    sequence_number += 1
    run_id = str(run_id)
    
    print(token)

def handler(event, context):
    print(event)
    connection_id = event["connection_id"]
    provider = event["provider"]
    model_id = event["model_id"]
    session_id=event["session_id"]
    user_id=event["user_id"]
    prompt = event["text"]

    model_kwargs=json.loads(event["model_kwargs"])
    adapter_args=json.loads(event["adapter_args"])
    
    if not session_id:
        session_id = str(uuid.uuid4())

    if not user_id:
        user_id = str(uuid.uuid4())
    
    adapter = registry.get_adapter(f"{provider}.{model_id}")
    
    adapter.on_llm_new_token = lambda *args, **kwargs: on_llm_new_token(
        connection_id, user_id, session_id, *args, **kwargs
    )

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

An example of an event:
```
event = {
  "connection_id": "234",
  "provider": "bedrock",
  "model_id": "anthropic.claude-v2:1",
  "session_id": "123",
  "user_id": "873",
  "text": "What is your name ?",
  "model_kwargs": "{\"streaming\":true}",
  "adapter_args": "{}"
}
```

Where:
- connection_id: a unique connection id
- provider: LLM provider (currently supported: bedrock, sagemaker, openai)
- model_id: model identified as specified by the model provider
- session_id: session identified, used if chat history is enabled
- user_id: identified for a specific user
- text: user question
- model_kwargs: dictionary containing model arguments (temperature, ...). Please refer to the model documentation for a complete list of arguments available.
- adapter_kwargs: used to control the configuration of the adapter (enable chat history, RAG,...). Currently, values for this parameter are not used.

## Initializer

```
new LangchainCommonDepsLayer(scope: Construct, id: string, props: LangchainLayerProps)
```

#### Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props [LangchainLayerProps](https://github.com/awslabs/generative-ai-cdk-constructs/blob/main/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L23)

#### Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| runtime | [lambda.Runtime](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Runtime.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function runtime compatible with this layer. |
| architecture | [lambda.Architecture](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Architecture.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function architecture compatible with this layer. |
| autoUpgrade | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Add '--upgrade' to pip install requirements.txt. In case of a LangchainCommonLayer, this parameter is not used. |
| additionalPackages | string[] | ![Optional](https://img.shields.io/badge/optional-4169E1) | A prop allowing additional python pip libraries to be installed with this langchain layer. |
| description | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Default: Dependencies to build gen ai applications with the langchain client |
| layerVersionName | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | The name of the layer |
| license | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | The SPDX licence identifier or URL to the license file for this layer |
| removalPolicy | [RemovalPolicy](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.RemovalPolicy.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Whether to retain this version of the layer when a new version is added or when the stack is deleted. Default: DESTROY |

```
new LangchainCommonLayer(scope: Construct, id: string, props: LangchainLayerProps)
```

Parameters

- scope [Construct](https://docs.aws.amazon.com/cdk/api/v2/docs/constructs.Construct.html)
- id string
- props [AdapterProps](https://github.com/awslabs/generative-ai-cdk-constructs/blob/main/src/AdapterProps.ts)

#### Pattern Construct Props

| **Name**     | **Type**        | **Required** |**Description** |
|:-------------|:----------------|-----------------|-----------------|
| compatibleRuntimes | [lambda.Runtime[]](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Runtime.html) | ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function runtime compatible with this layer. |
| compatibleArchitectures | [lambda.Architecture[]](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Architecture.html)| ![Required](https://img.shields.io/badge/required-ff0000) | Lambda function architecture compatible with this layer. |
| autoUpgrade | boolean | ![Optional](https://img.shields.io/badge/optional-4169E1) | Add '--upgrade' to pip install requirements.txt. In case of a LangchainCommonLayer, this parameter is not used. |
| description | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | Default: Dependencies to build gen ai applications with the langchain client |
| layerVersionName | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | The name of the layer |
| license | string | ![Optional](https://img.shields.io/badge/optional-4169E1) | The SPDX licence identifier or URL to the license file for this layer |
| removalPolicy | [RemovalPolicy](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.RemovalPolicy.html) | ![Optional](https://img.shields.io/badge/optional-4169E1) | Whether to retain this version of the layer when a new version is added or when the stack is deleted. Default: DESTROY |
| local | "python" or "python3" | ![Optional](https://img.shields.io/badge/optional-4169E1) | Local compute will be used when installing requirements.txt when set. By default, a docker container will be spun up to install requirements. |

## Pattern Properties

| **Name**     | **Type**        | **Description** |
|:-------------|:----------------|-----------------|
| layer | [lambda.LayerVersion](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.LayerVersion.html) | The instance of lambda.LayerVersion created by the construct |

## Default properties

Out-of-the-box implementation of the construct without any override will not set any default values. Depending on the features enabled, user will need to provide environmental variable values to the AWS Lambda function used by the LangchainCommonLayer.

## Python utility layer (LangchainCommonLayer)

This utility layer provides helper functions to accelerate the development of generative AI applications on AWS. 

| **Provider** | **Prediction (waiting)** | **Streaming** |
|:-------------|:----------------|-----------------|
| OpenAI | ✅ | ✅  |
| Amazon SageMaker | ✅ | ❌ |
| Amazon Bedrock | ✅ | ✅  |

### Registry

The model registry is a catalog, statically initialized, providing the list of supported models by the library. 

Available models in the registry:

| **Provider** | **Model** |
|:-------------|:----------------|
| OpenAI | All |
| Amazon SageMaker | FalconLite, Llama2 |
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
| 601 | <llm_name> Exception during prediction | An exception happened while the LangChain client was running a prediction with the selected LLM | Verify logs to get the proper error message from the LangChain client |

## Architecture
![Architecture Diagram](architecture.png)

## Cost

You are responsible for the cost of the AWS services used while running this construct. As of this revision, the cost for running this construct with the default settings in the US East (N. Virginia) Region is approximately $0.25 per month.

We recommend creating a budget through [AWS Cost Explorer](http://aws.amazon.com/aws-cost-management/aws-cost-explorer/) to help manage costs. Prices are subject to change. For full details, refer to the pricing webpage for each AWS service used in this solution.

The following table provides a sample cost breakdown for deploying this solution with the default parameters in the **US East (N. Virginia)** Region for **one month**.


| **AWS Service**     | **Dimensions**        | **Cost [USD]** |
|:-------------|:----------------|-----------------|
| AWS Lambda | 1 Lambda function with 128 MB memory and 512 MB ephemeral storage with an average duration of 10 seconds | 0.00 |
| Amazon Bedrock | An application developer makes the following API calls to Amazon Bedrock: A request to Anthropic’s Claude V2.1 model to summarize an input of 11K tokens of input text to an output of 4K tokens. Total cost incurred is = 11K tokens/1000 * $0.01102 + 4K tokens/1000 * $0.03268 = $0.25 | 0.25 |
| Total monthly cost | | 0.25 |

> **Note**
> The costs of API calls to third-party LLM providers are not included in these estimates. See the pricing guide of your LLM provider.

## Security

When you build systems on AWS infrastructure, security responsibilities are shared between you and AWS. This [shared responsibility](http://aws.amazon.com/compliance/shared-responsibility-model/) model reduces your operational burden because AWS operates, manages, and controls the components including the host operating system, virtualization layer, and physical security of the facilities in which the services operate. For more information about AWS security, visit [AWS Cloud Security](http://aws.amazon.com/security/).

This construct requires you to provide an existing AWS Lambda function. Please refer to the official documentation on best practices to secure this service:
- [AWS Lambda](https://docs.aws.amazon.com/lambda/latest/dg/lambda-security.html)

If choosing to interface with a third-party LLM provider (outside of Amazon Bedrock), customers must evaluate the security considerations of data leaving their AWS account. The customer is required to provide a valid API key at the time of deployment.

The primary piece of data sent to the third-party LLM provider is the prompt to perform inference on. Depending on the use case, the prompt can contain the user’s input, previous interactions (for example, chat history), and document excerpts sourced from the configured knowledge base (for example, Amazon OpenSearch search result).

AWS CloudTrail provides a number of security features to consider as you develop and implement your own security policies. Please follow the related best practices through the [official documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/best-practices-security.html).

> **Warning**
> This construct allows you to interact with models from third party providers. Your use of the third-party generative AI (GAI) models is governed by the terms provided to you by the third-party GAI model providers when you acquired your license to use them (for example, their terms of service, license agreement, acceptable use policy, and privacy policy).
>
>You are responsible for ensuring that your use of the third-party GAI models comply with the terms governing them, and any laws, rules, regulations, policies, or standards that apply to you.
>
>You are also responsible for making your own independent assessment of the third-party GAI models that you use, including their outputs and how third-party GAI model providers use any data that might be transmitted to them based on your deployment configuration. AWS does not make any representations, warranties, or guarantees regarding the third-party GAI models, which are “Third-Party Content” under your agreement with AWS. This construct is offered to you as “AWS Content” under your agreement with AWS.

## Supported AWS Regions

This solution optionally uses the Amazon Bedrock and Amazon OpenSearch service, which is not currently available in all AWS Regions. You must launch this construct in an AWS Region where these services are available. For the most current availability of AWS services by Region, see the [AWS Regional Services List](https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/).

> **Note**
>You need to explicity enable access to models before they are available for use in the Amazon Bedrock service. Please follow the [Amazon Bedrock User Guide](https://docs.aws.amazon.com/bedrock/latest/userguide/model-access.html) for steps related to enabling model access.

## Quotas

Service quotas, also referred to as limits, are the maximum number of service resources or operations for your AWS account.

Make sure you have sufficient quota for each of the services implemented in this solution. For more information, refer to [AWS service quotas](https://docs.aws.amazon.com/general/latest/gr/aws_service_limits.html).

To view the service quotas for all AWS services in the documentation without switching pages, view the information in the [Service endpoints and quotas](https://docs.aws.amazon.com/general/latest/gr/aws-general.pdf#aws-service-information) page in the PDF instead.

## Clean up

When deleting your stack which uses this construct, do not forget to go over the following instructions to avoid unexpected charges:
  - delete the lambda layers uploaded to the account

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
