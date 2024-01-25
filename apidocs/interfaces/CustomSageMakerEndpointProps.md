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

___

### endpointName

• `Readonly` **endpointName**: `string`

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

### modelDataDownloadTimeoutInSeconds

• `Optional` `Readonly` **modelDataDownloadTimeoutInSeconds**: `number`

___

### modelDataUrl

• `Readonly` **modelDataUrl**: `string`

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

### volumeSizeInGb

• `Optional` `Readonly` **volumeSizeInGb**: `number`
