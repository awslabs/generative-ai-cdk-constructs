[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainLayerProps

# Interface: LangchainLayerProps

The properties for the LangchainLayerProps class.

## Hierarchy

- [`LangchainProps`](LangchainProps.md)

  ↳ **`LangchainLayerProps`**

## Table of contents

### Properties

- [additionalPackages](LangchainLayerProps.md#additionalpackages)
- [architecture](LangchainLayerProps.md#architecture)
- [autoUpgrade](LangchainLayerProps.md#autoupgrade)
- [description](LangchainLayerProps.md#description)
- [layerVersionName](LangchainLayerProps.md#layerversionname)
- [license](LangchainLayerProps.md#license)
- [local](LangchainLayerProps.md#local)
- [removalPolicy](LangchainLayerProps.md#removalpolicy)
- [runtime](LangchainLayerProps.md#runtime)

## Properties

### additionalPackages

• `Optional` `Readonly` **additionalPackages**: `string`[]

A prop allowing additional python pip libraries to be installed with this langchain layer

**`Default`**

```ts
- none
```

___

### architecture

• `Readonly` **architecture**: `Architecture`

Required. Lambda function architecture compatible with this Layer.

___

### autoUpgrade

• `Optional` `Readonly` **autoUpgrade**: `boolean`

Optional: Add '--upgrade' to pip install requirements.txt
In case of a LangchainCommonLayer, this parameter is not used.

**`Default`**

```ts
- false
```

___

### description

• `Optional` `Readonly` **description**: `string`

The description the this Lambda Layer.

**`Default`**

```ts
- No description.
```

**`Stability`**

stable

#### Inherited from

[LangchainProps](LangchainProps.md).[description](LangchainProps.md#description)

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

#### Inherited from

[LangchainProps](LangchainProps.md).[layerVersionName](LangchainProps.md#layerversionname)

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

#### Inherited from

[LangchainProps](LangchainProps.md).[license](LangchainProps.md#license)

___

### local

• `Optional` `Readonly` **local**: ``"python"`` \| ``"python3"``

Optional: Local compute will be used when installing requirements.txt.
By default, a docker container will be spun up to install requirements. To override this behavior, use the python alias string of `python` or `python3`
The string value will be the python alias used to install requirements.

**`Default`**

```ts
- none
```

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

#### Inherited from

[LangchainProps](LangchainProps.md).[removalPolicy](LangchainProps.md#removalpolicy)

___

### runtime

• `Readonly` **runtime**: `Runtime`

Required. Lambda function runtime compatible with this Layer.
