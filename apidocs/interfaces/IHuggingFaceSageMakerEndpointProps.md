[@cdklabs/generative-ai-cdk-constructs](../README.md) / IHuggingFaceSageMakerEndpointProps

# Interface: IHuggingFaceSageMakerEndpointProps

## Table of contents

### Properties

- [container](IHuggingFaceSageMakerEndpointProps.md#container)
- [endpointName](IHuggingFaceSageMakerEndpointProps.md#endpointname)
- [environment](IHuggingFaceSageMakerEndpointProps.md#environment)
- [instanceCount](IHuggingFaceSageMakerEndpointProps.md#instancecount)
- [instanceType](IHuggingFaceSageMakerEndpointProps.md#instancetype)
- [modelId](IHuggingFaceSageMakerEndpointProps.md#modelid)
- [role](IHuggingFaceSageMakerEndpointProps.md#role)
- [startupHealthCheckTimeoutInSeconds](IHuggingFaceSageMakerEndpointProps.md#startuphealthchecktimeoutinseconds)

## Properties

### container

• **container**: [`ContainerImage`](../classes/ContainerImage.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:23](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L23)

___

### endpointName

• `Optional` **endpointName**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:24](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L24)

___

### environment

• `Optional` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:28](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L28)

___

### instanceCount

• `Optional` **instanceCount**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:26](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L26)

___

### instanceType

• **instanceType**: [`SageMakerInstanceType`](../classes/SageMakerInstanceType.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:25](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L25)

___

### modelId

• **modelId**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:22](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L22)

___

### role

• `Optional` **role**: `Role`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:27](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L27)

___

### startupHealthCheckTimeoutInSeconds

• `Optional` **startupHealthCheckTimeoutInSeconds**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:29](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L29)
