[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainLayerProps

# Interface: LangchainLayerProps

The properties for the LangchainLayerProps class.

## Extends

- [`LangchainProps`](LangchainProps.md)

## Properties

### additionalPackages?

> `readonly` `optional` **additionalPackages**: `string`[]

A prop allowing additional python pip libraries to be installed with this langchain layer

#### Default

```ts
- none
```

***

### architecture

> `readonly` **architecture**: `Architecture`

Required. Lambda function architecture compatible with this Layer.

***

### autoUpgrade?

> `readonly` `optional` **autoUpgrade**: `boolean`

Optional: Add '--upgrade' to pip install requirements.txt
In case of a LangchainCommonLayer, this parameter is not used.

#### Default

```ts
- false
```

***

### description?

> `readonly` `optional` **description**: `string`

The description the this Lambda Layer.

#### Default

```ts
- No description.
```

#### Inherited from

[`LangchainProps`](LangchainProps.md).[`description`](LangchainProps.md#description)

***

### layerVersionName?

> `readonly` `optional` **layerVersionName**: `string`

The name of the layer.

#### Default

```ts
- A name will be generated.
```

#### Inherited from

[`LangchainProps`](LangchainProps.md).[`layerVersionName`](LangchainProps.md#layerversionname)

***

### license?

> `readonly` `optional` **license**: `string`

The SPDX licence identifier or URL to the license file for this layer.

#### Default

```ts
- No license information will be recorded.
```

#### Inherited from

[`LangchainProps`](LangchainProps.md).[`license`](LangchainProps.md#license)

***

### local?

> `readonly` `optional` **local**: `"python"` \| `"python3"`

Optional: Local compute will be used when installing requirements.txt.
By default, a docker container will be spun up to install requirements. To override this behavior, use the python alias string of `python` or `python3`
The string value will be the python alias used to install requirements.

#### Default

```ts
- none
```

***

### removalPolicy?

> `readonly` `optional` **removalPolicy**: `RemovalPolicy`

Whether to retain this version of the layer when a new version is added or when the stack is deleted.

#### Default

```ts
RemovalPolicy.DESTROY
```

#### Inherited from

[`LangchainProps`](LangchainProps.md).[`removalPolicy`](LangchainProps.md#removalpolicy)

***

### runtime

> `readonly` **runtime**: `Runtime`

Required. Lambda function runtime compatible with this Layer.
