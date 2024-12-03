[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptProps

# Interface: PromptProps

***************************************************************************
                       PROPS FOR NEW CONSTRUCT
***************************************************************************

## Properties

### defaultVariant?

> `readonly` `optional` **defaultVariant**: [`PromptVariant`](../classes/PromptVariant.md)

The Prompt Variant that will be used by default.

#### Default

```ts
- No default variant provided.
```

***

### description?

> `readonly` `optional` **description**: `string`

A description of what the prompt does.

#### Default

```ts
- No description provided.
```

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key that the prompt is encrypted with.

#### Default

```ts
- AWS owned and managed key.
```

***

### promptName

> `readonly` **promptName**: `string`

The name of the prompt.

***

### variants?

> `readonly` `optional` **variants**: [`PromptVariant`](../classes/PromptVariant.md)[]

The variants of your prompt. Variants can use different messages, models,
or configurations so that you can compare their outputs to decide the best
variant for your use case. Maximum of 3 variants.
