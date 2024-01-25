[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainLayerProps

# Interface: LangchainLayerProps

The properties for the LangchainLayerProps class.

## Table of contents

### Properties

- [architecture](LangchainLayerProps.md#architecture)
- [autoUpgrade](LangchainLayerProps.md#autoupgrade)
- [runtime](LangchainLayerProps.md#runtime)

## Properties

### architecture

• `Readonly` **architecture**: `Architecture`

Required. Lambda function architecture compatible with this Layer.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:33](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L33)

___

### autoUpgrade

• `Optional` `Readonly` **autoUpgrade**: `boolean`

Optional: Add '--upgrade' to pip install requirements.txt
In case of a LangchainCommonLayer, this parameter is not used.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:40](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L40)

___

### runtime

• `Readonly` **runtime**: `Runtime`

Required. Lambda function runtime compatible with this Layer.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:27](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L27)
