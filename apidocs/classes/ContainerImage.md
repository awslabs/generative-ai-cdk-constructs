[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContainerImage

# Class: ContainerImage

https://github.com/aws/deep-learning-containers/blob/master/available_images.md

## Hierarchy

- **`ContainerImage`**

  ↳ [`DeepLearningContainerImage`](DeepLearningContainerImage.md)

## Table of contents

### Constructors

- [constructor](ContainerImage.md#constructor)

### Methods

- [bind](ContainerImage.md#bind)
- [fromAsset](ContainerImage.md#fromasset)
- [fromEcrRepository](ContainerImage.md#fromecrrepository)

## Constructors

### constructor

• **new ContainerImage**(): [`ContainerImage`](ContainerImage.md)

#### Returns

[`ContainerImage`](ContainerImage.md)

## Methods

### bind

▸ **bind**(`scope`, `grantable`): [`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `grantable` | `IGrantable` |

#### Returns

[`ContainerImageConfig`](../interfaces/ContainerImageConfig.md)

___

### fromAsset

▸ **fromAsset**(`directory`, `options?`): [`ContainerImage`](ContainerImage.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `directory` | `string` |
| `options` | `DockerImageAssetOptions` |

#### Returns

[`ContainerImage`](ContainerImage.md)

___

### fromEcrRepository

▸ **fromEcrRepository**(`repository`, `tag?`): [`ContainerImage`](ContainerImage.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `repository` | `IRepository` | `undefined` |
| `tag` | `string` | `'latest'` |

#### Returns

[`ContainerImage`](ContainerImage.md)
