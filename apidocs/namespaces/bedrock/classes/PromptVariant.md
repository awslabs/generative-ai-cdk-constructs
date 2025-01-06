[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

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

### genAiResource?

> `abstract` `optional` **genAiResource**: `PromptGenAiResourceProperty`

The template configuration.

***

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

### templateConfiguration

> `abstract` **templateConfiguration**: `PromptTemplateConfigurationProperty`

The template configuration.

***

### templateType

> `abstract` **templateType**: [`PromptTemplateType`](../enumerations/PromptTemplateType.md)

The type of prompt template.

## Methods

### agent()

> `static` **agent**(`props`): [`PromptVariant`](PromptVariant.md)

Static method to create an agent prompt template.

#### Parameters

##### props

[`AgentPromptVariantProps`](../interfaces/AgentPromptVariantProps.md)

#### Returns

[`PromptVariant`](PromptVariant.md)

***

### chat()

> `static` **chat**(`props`): [`PromptVariant`](PromptVariant.md)

Static method to create a chat template. Use this template type when
the model supports the Converse API or the AnthropicClaude Messages API.
This allows you to include a System prompt and previous User messages
and Assistant messages for context.

#### Parameters

##### props

[`ChatPromptVariantProps`](../interfaces/ChatPromptVariantProps.md)

#### Returns

[`PromptVariant`](PromptVariant.md)

***

### text()

> `static` **text**(`props`): [`PromptVariant`](PromptVariant.md)

Static method to create a text template

#### Parameters

##### props

[`TextPromptVariantProps`](../interfaces/TextPromptVariantProps.md)

#### Returns

[`PromptVariant`](PromptVariant.md)
