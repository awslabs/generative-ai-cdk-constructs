[@cdklabs/generative-ai-cdk-constructs](/docs/api) / HuggingFaceSageMakerEndpointProps

# Interface: HuggingFaceSageMakerEndpointProps

## Properties

### container

• `Readonly` **container**: [`ContainerImage`](/docs/api/classes/ContainerImage.md)

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

• `Readonly` **instanceType**: [`SageMakerInstanceType`](/docs/api/classes/SageMakerInstanceType.md)

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
