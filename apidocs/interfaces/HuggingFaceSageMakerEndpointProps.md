[@cdklabs/generative-ai-cdk-constructs](../README.md) / HuggingFaceSageMakerEndpointProps

# Interface: HuggingFaceSageMakerEndpointProps

## Table of contents

### Properties

- [container](HuggingFaceSageMakerEndpointProps.md#container)
- [enableOperationalMetric](HuggingFaceSageMakerEndpointProps.md#enableoperationalmetric)
- [endpointName](HuggingFaceSageMakerEndpointProps.md#endpointname)
- [environment](HuggingFaceSageMakerEndpointProps.md#environment)
- [instanceCount](HuggingFaceSageMakerEndpointProps.md#instancecount)
- [instanceType](HuggingFaceSageMakerEndpointProps.md#instancetype)
- [modelId](HuggingFaceSageMakerEndpointProps.md#modelid)
- [role](HuggingFaceSageMakerEndpointProps.md#role)
- [startupHealthCheckTimeoutInSeconds](HuggingFaceSageMakerEndpointProps.md#startuphealthchecktimeoutinseconds)
- [vpcConfig](HuggingFaceSageMakerEndpointProps.md#vpcconfig)

## Properties

### container

• `Readonly` **container**: [`ContainerImage`](../classes/ContainerImage.md)

___

### enableOperationalMetric

• `Optional` `Readonly` **enableOperationalMetric**: `boolean`

___

### endpointName

• `Optional` `Readonly` **endpointName**: `string`

___

### environment

• `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

___

### instanceCount

• `Optional` `Readonly` **instanceCount**: `number`

___

### instanceType

• `Readonly` **instanceType**: [`SageMakerInstanceType`](../classes/SageMakerInstanceType.md)

___

### modelId

• `Readonly` **modelId**: `string`

___

### role

• `Optional` `Readonly` **role**: `Role`

___

### startupHealthCheckTimeoutInSeconds

• `Optional` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

___

### vpcConfig

• `Optional` `Readonly` **vpcConfig**: `VpcConfigProperty`
