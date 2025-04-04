[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ChatPromptVariantProps

# Interface: ChatPromptVariantProps

## Extends

- [`CommonPromptVariantProps`](CommonPromptVariantProps.md)

## Properties

### inferenceConfiguration?

> `readonly` `optional` **inferenceConfiguration**: `PromptModelInferenceConfigurationProperty`

Inference configuration for the Text Prompt

***

### messages

> `readonly` **messages**: [`ChatMessage`](../classes/ChatMessage.md)[]

Inference configuration for the Chat Prompt.
Must include at least one User Message.
The messages should alternate between User and Assistant.

***

### model

> `readonly` **model**: [`IInvokable`](IInvokable.md)

The model which is used to run the prompt. The model could be a foundation
model, a custom model, or a provisioned model.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`model`](CommonPromptVariantProps.md#model)

***

### promptVariables?

> `readonly` `optional` **promptVariables**: `string`[]

The variables in the prompt template that can be filled in at runtime.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`promptVariables`](CommonPromptVariantProps.md#promptvariables)

***

### system?

> `readonly` `optional` **system**: `string`

Context or instructions for the model to consider before generating a response.

***

### toolConfiguration?

> `readonly` `optional` **toolConfiguration**: [`ToolConfiguration`](ToolConfiguration.md)

The configuration with available tools to the model and how it must use them.

***

### variantName

> `readonly` **variantName**: `string`

The name of the prompt variant.

#### Inherited from

[`CommonPromptVariantProps`](CommonPromptVariantProps.md).[`variantName`](CommonPromptVariantProps.md#variantname)
