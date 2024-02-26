[@cdklabs/generative-ai-cdk-constructs](/docs/api) / ContainerImage

# Class: ContainerImage

https://github.com/aws/deep-learning-containers/blob/master/available_images.md

## Hierarchy

- **`ContainerImage`**

  ↳ [`DeepLearningContainerImage`](DeepLearningContainerImage.md)

## Constructors

### constructor

• **new ContainerImage**(): [`ContainerImage`](ContainerImage.md)

#### Returns

[`ContainerImage`](ContainerImage.md)

## Methods

### bind

▸ **bind**(`scope`, `grantable`): [`ContainerImageConfig`](/docs/api/interfaces/ContainerImageConfig.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `grantable` | `IGrantable` |

#### Returns

[`ContainerImageConfig`](/docs/api/interfaces/ContainerImageConfig.md)

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
