[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / CustomSageMakerEndpointProps

# Interface: CustomSageMakerEndpointProps

## Properties

### container

> `readonly` **container**: [`ContainerImage`](../classes/ContainerImage.md)

***

### endpointName

> `readonly` **endpointName**: `string`

***

### environment?

> `readonly` `optional` **environment**: `object`

#### Index Signature

 \[`key`: `string`\]: `string`

***

### instanceCount?

> `readonly` `optional` **instanceCount**: `number`

***

### instanceType

> `readonly` **instanceType**: [`SageMakerInstanceType`](../classes/SageMakerInstanceType.md)

***

### modelDataDownloadTimeoutInSeconds?

> `readonly` `optional` **modelDataDownloadTimeoutInSeconds**: `number`

***

### modelDataUrl

> `readonly` **modelDataUrl**: `string`

***

### modelId

> `readonly` **modelId**: `string`

***

### role?

> `readonly` `optional` **role**: `Role`

***

### startupHealthCheckTimeoutInSeconds?

> `readonly` `optional` **startupHealthCheckTimeoutInSeconds**: `number`

***

### volumeSizeInGb?

> `readonly` `optional` **volumeSizeInGb**: `number`

***

### vpcConfig?

> `readonly` `optional` **vpcConfig**: `VpcConfigProperty`
