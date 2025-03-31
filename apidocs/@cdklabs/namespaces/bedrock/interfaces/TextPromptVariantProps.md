[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / TextPromptVariantProps

# Interface: TextPromptVariantProps

## Extends

- [`CommonPromptVariantProps`](CommonPromptVariantProps.md)

## Properties

### inferenceConfiguration?

> `readonly` `optional` **inferenceConfiguration**: `PromptModelInferenceConfigurationProperty`

Inference configuration for the Text Prompt

***

### model

> `readonly` **model**: [`IInvokable`](IInvokable.md)

The model which is used to run the prompt. The model could be a foundation
model, a custom model, or a provisioned model.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`model`](CommonPromptVariantProps.md#model)

***

### promptText

> `readonly` **promptText**: `string`

The text prompt. Variables are used by enclosing its name with double curly braces
as in `{{variable_name}}`.

***

### promptVariables?

> `readonly` `optional` **promptVariables**: `string`[]

The variables in the prompt template that can be filled in at runtime.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`promptVariables`](CommonPromptVariantProps.md#promptvariables)

***

### variantName

> `readonly` **variantName**: `string`

The name of the prompt variant.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`variantName`](CommonPromptVariantProps.md#variantname)
