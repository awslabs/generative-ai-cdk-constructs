[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CommonPromptVariantProps

# Interface: CommonPromptVariantProps

## Extended by

- [`TextPromptVariantProps`](TextPromptVariantProps.md)
- [`ChatPromptVariantProps`](ChatPromptVariantProps.md)
- [`AgentPromptVariantProps`](AgentPromptVariantProps.md)

## Properties

### model

> `readonly` **model**: [`IInvokable`](IInvokable.md)

The model which is used to run the prompt. The model could be a foundation
model, a custom model, or a provisioned model.

***

### promptVariables?

> `readonly` `optional` **promptVariables**: `string`[]

The variables in the prompt template that can be filled in at runtime.

***

### variantName

> `readonly` **variantName**: `string`

The name of the prompt variant.
