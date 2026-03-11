[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [sagemaker\_deployment](../README.md) / ContainerImage

# Abstract Class: ContainerImage

https://github.com/aws/deep-learning-containers/blob/master/available_images.md

## Extended by

- [`DeepLearningContainerImage`](DeepLearningContainerImage.md)

## Constructors

### Constructor

> **new ContainerImage**(): `ContainerImage`

#### Returns

`ContainerImage`

## Methods

### bind()

> `abstract` **bind**(`scope`, `grantable`): [`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

#### Parameters

##### scope

`Construct`

##### grantable

`IGrantable`

#### Returns

[`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

***

### fromAsset()

> `static` **fromAsset**(`directory`, `options?`): `ContainerImage`

#### Parameters

##### directory

`string`

##### options?

`DockerImageAssetOptions` = `{}`

#### Returns

`ContainerImage`

***

### fromEcrRepository()

> `static` **fromEcrRepository**(`repository`, `tag?`): `ContainerImage`

#### Parameters

##### repository

`IRepository`

##### tag?

`string` = `'latest'`

#### Returns

`ContainerImage`
