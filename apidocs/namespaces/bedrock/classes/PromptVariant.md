[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptVariant

# Class: `abstract` PromptVariant

Variants are specific sets of inputs that guide FMs on Amazon Bedrock to
generate an appropriate response or output for a given task or instruction.
You can optimize the prompt for specific use cases and models.

## Constructors

### new PromptVariant()

> `protected` **new PromptVariant**(): [`PromptVariant`](PromptVariant.md)

#### Returns

[`PromptVariant`](PromptVariant.md)

## Properties

### inferenceConfiguration?

> `abstract` `optional` **inferenceConfiguration**: `PromptInferenceConfigurationProperty`

The inference configuration.

***

### modelId?

> `abstract` `optional` **modelId**: `string`

The unique identifier of the model with which to run inference on the prompt.

***

### name

> `abstract` **name**: `string`

The name of the prompt variant.

***

### templateConfiguration?

> `abstract` `optional` **templateConfiguration**: `PromptTemplateConfigurationProperty`

The template configuration.

***

### templateType

> `abstract` **templateType**: [`TEXT`](../enumerations/PromptTemplateType.md#text)

The type of prompt template.

## Methods

### text()

> `static` **text**(`props`): [`PromptVariant`](PromptVariant.md)

Static method to create a text template

#### Parameters

• **props**: [`TextPromptVariantProps`](../interfaces/TextPromptVariantProps.md)

#### Returns

[`PromptVariant`](PromptVariant.md)
