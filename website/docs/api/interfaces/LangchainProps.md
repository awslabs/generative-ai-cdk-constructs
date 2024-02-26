[@cdklabs/generative-ai-cdk-constructs](/docs/api) / LangchainProps

# Interface: LangchainProps

LangchainProps

## Hierarchy

- **`LangchainProps`**

  ↳ [`LangchainLayerProps`](LangchainLayerProps.md)

## Properties

### description

• `Optional` `Readonly` **description**: `string`

The description the this Lambda Layer.

**`Default`**

```ts
- No description.
```

**`Stability`**

stable

___

### layerVersionName

• `Optional` `Readonly` **layerVersionName**: `string`

The name of the layer.

**`Default`**

```ts
- A name will be generated.
```

**`Stability`**

stable

___

### license

• `Optional` `Readonly` **license**: `string`

The SPDX licence identifier or URL to the license file for this layer.

**`Default`**

```ts
- No license information will be recorded.
```

**`Stability`**

stable

___

### removalPolicy

• `Optional` `Readonly` **removalPolicy**: `RemovalPolicy`

Whether to retain this version of the layer when a new version is added or when the stack is deleted.

**`Default`**

```ts
RemovalPolicy.DESTROY
```

**`Stability`**

stable
