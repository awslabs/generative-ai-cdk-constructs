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
- [vpcConfig](IHuggingFaceSageMakerEndpointProps.md#vpcconfig)

## Properties

### container

• **container**: [`ContainerImage`](../classes/ContainerImage.md)

___

### endpointName

• `Optional` **endpointName**: `string`

___

### environment

• `Optional` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

___

### instanceCount

• `Optional` **instanceCount**: `number`

___

### instanceType

• **instanceType**: [`SageMakerInstanceType`](../classes/SageMakerInstanceType.md)

___

### modelId

• **modelId**: `string`

___

### role

• `Optional` **role**: `Role`

___

### startupHealthCheckTimeoutInSeconds

• `Optional` **startupHealthCheckTimeoutInSeconds**: `number`

___

### vpcConfig

• `Optional` **vpcConfig**: `VpcConfigProperty`
