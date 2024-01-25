[@cdklabs/generative-ai-cdk-constructs](../README.md) / CustomSageMakerEndpointProps

# Interface: CustomSageMakerEndpointProps

## Table of contents

### Properties

- [container](CustomSageMakerEndpointProps.md#container)
- [endpointName](CustomSageMakerEndpointProps.md#endpointname)
- [environment](CustomSageMakerEndpointProps.md#environment)
- [instanceCount](CustomSageMakerEndpointProps.md#instancecount)
- [instanceType](CustomSageMakerEndpointProps.md#instancetype)
- [modelDataDownloadTimeoutInSeconds](CustomSageMakerEndpointProps.md#modeldatadownloadtimeoutinseconds)
- [modelDataUrl](CustomSageMakerEndpointProps.md#modeldataurl)
- [modelId](CustomSageMakerEndpointProps.md#modelid)
- [role](CustomSageMakerEndpointProps.md#role)
- [startupHealthCheckTimeoutInSeconds](CustomSageMakerEndpointProps.md#startuphealthchecktimeoutinseconds)
- [volumeSizeInGb](CustomSageMakerEndpointProps.md#volumesizeingb)

## Properties

### container

• `Readonly` **container**: [`ContainerImage`](../classes/ContainerImage.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:25](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L25)

___

### endpointName

• `Readonly` **endpointName**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:23](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L23)

___

### environment

• `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:28](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L28)

___

### instanceCount

• `Optional` `Readonly` **instanceCount**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:26](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L26)

___

### instanceType

• `Readonly` **instanceType**: [`SageMakerInstanceType`](../classes/SageMakerInstanceType.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:24](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L24)

___

### modelDataDownloadTimeoutInSeconds

• `Optional` `Readonly` **modelDataDownloadTimeoutInSeconds**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:30](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L30)

___

### modelDataUrl

• `Readonly` **modelDataUrl**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:32](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L32)

___

### modelId

• `Readonly` **modelId**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:22](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L22)

___

### role

• `Optional` `Readonly` **role**: `Role`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:27](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L27)

___

### startupHealthCheckTimeoutInSeconds

• `Optional` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:29](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L29)

___

### volumeSizeInGb

• `Optional` `Readonly` **volumeSizeInGb**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts:31](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/custom-sagemaker-endpoint.ts#L31)
