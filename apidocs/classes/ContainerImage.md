[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContainerImage

# Class: `abstract` ContainerImage

https://github.com/aws/deep-learning-containers/blob/master/available_images.md

## Extended by

- [`DeepLearningContainerImage`](DeepLearningContainerImage.md)

## Constructors

### new ContainerImage()

> **new ContainerImage**(): [`ContainerImage`](ContainerImage.md)

#### Returns

[`ContainerImage`](ContainerImage.md)

## Methods

### bind()

> `abstract` **bind**(`scope`, `grantable`): [`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

#### Parameters

• **scope**: `Construct`

• **grantable**: `IGrantable`

#### Returns

[`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

***

### fromAsset()

> `static` **fromAsset**(`directory`, `options`): [`ContainerImage`](ContainerImage.md)

#### Parameters

• **directory**: `string`

• **options**: `DockerImageAssetOptions` = `{}`

#### Returns

[`ContainerImage`](ContainerImage.md)

***

### fromEcrRepository()

> `static` **fromEcrRepository**(`repository`, `tag`): [`ContainerImage`](ContainerImage.md)

#### Parameters

• **repository**: `IRepository`

• **tag**: `string` = `'latest'`

#### Returns

[`ContainerImage`](ContainerImage.md)
