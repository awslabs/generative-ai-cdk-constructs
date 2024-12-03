[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainProps

# Interface: LangchainProps

LangchainProps

## Extended by

- [`LangchainLayerProps`](LangchainLayerProps.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description the this Lambda Layer.

#### Default

```ts
- No description.
```

#### Stability

stable

***

### layerVersionName?

> `readonly` `optional` **layerVersionName**: `string`

The name of the layer.

#### Default

```ts
- A name will be generated.
```

#### Stability

stable

***

### license?

> `readonly` `optional` **license**: `string`

The SPDX licence identifier or URL to the license file for this layer.

#### Default

```ts
- No license information will be recorded.
```

#### Stability

stable

***

### removalPolicy?

> `readonly` `optional` **removalPolicy**: `RemovalPolicy`

Whether to retain this version of the layer when a new version is added or when the stack is deleted.

#### Default

```ts
RemovalPolicy.DESTROY
```

#### Stability

stable
