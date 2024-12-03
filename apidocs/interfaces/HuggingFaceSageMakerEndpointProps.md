[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / HuggingFaceSageMakerEndpointProps

# Interface: HuggingFaceSageMakerEndpointProps

## Properties

### container

> `readonly` **container**: [`ContainerImage`](../classes/ContainerImage.md)

***

### endpointName?

> `readonly` `optional` **endpointName**: `string`

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

### modelId

> `readonly` **modelId**: `string`

***

### role?

> `readonly` `optional` **role**: `Role`

***

### startupHealthCheckTimeoutInSeconds?

> `readonly` `optional` **startupHealthCheckTimeoutInSeconds**: `number`

***

### vpcConfig?

> `readonly` `optional` **vpcConfig**: `VpcConfigProperty`
