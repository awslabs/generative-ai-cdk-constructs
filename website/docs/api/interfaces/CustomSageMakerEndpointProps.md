[@cdklabs/generative-ai-cdk-constructs](/docs/api) / CustomSageMakerEndpointProps

# Interface: CustomSageMakerEndpointProps

## Properties

### container

• `Readonly` **container**: [`ContainerImage`](/docs/api/classes/ContainerImage.md)

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

• `Readonly` **instanceType**: [`SageMakerInstanceType`](/docs/api/classes/SageMakerInstanceType.md)

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

___

### vpcConfig

• `Optional` `Readonly` **vpcConfig**: `VpcConfigProperty`
