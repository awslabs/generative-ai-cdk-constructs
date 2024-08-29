[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / TextPromptVariantProps

# Interface: TextPromptVariantProps

## Extends

- [`CommonPromptVariantProps`](CommonPromptVariantProps.md)

## Properties

### inferenceConfiguration?

> `readonly` `optional` **inferenceConfiguration**: `PromptModelInferenceConfigurationProperty`

Inference configuration for the Text Prompt

***

### model

> `readonly` **model**: `IModel`

The model which is used to run the prompt. The model could be a foundation
model, a custom model, or a provisioned model.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`model`](CommonPromptVariantProps.md#model)

***

### templateConfiguration?

> `readonly` `optional` **templateConfiguration**: `TextPromptTemplateConfigurationProperty`

Template Configuration for the text prompt

***

### variantName

> `readonly` **variantName**: `string`

The name of the prompt variant.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`variantName`](CommonPromptVariantProps.md#variantname)
