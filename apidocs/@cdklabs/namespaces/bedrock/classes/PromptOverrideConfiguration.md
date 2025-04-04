[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / PromptOverrideConfiguration

# Class: PromptOverrideConfiguration

## Properties

### parser?

> `readonly` `optional` **parser**: `IFunction`

The custom Lambda parser function to use.
The Lambda parser processes and interprets the raw foundation model output.
It receives an input event with:
- messageVersion: Version of message format (1.0)
- agent: Info about the agent (name, id, alias, version)
- invokeModelRawResponse: Raw model output to parse
- promptType: Type of prompt being parsed
- overrideType: Type of override (OUTPUT_PARSER)

The Lambda must return a response that the agent uses for next actions.

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/lambda-parser.html

***

### steps?

> `readonly` `optional` **steps**: [`PromptStepConfigurationCustomParser`](../interfaces/PromptStepConfigurationCustomParser.md)[]

The prompt configurations to override the prompt templates in the agent sequence.

#### Default

```ts
- No prompt configuration will be overridden.
```

## Methods

### \_render()

> **\_render**(): `PromptOverrideConfigurationProperty`

**`Internal`**

Format as CfnAgent.PromptOverrideConfigurationProperty

 This is an internal core function and should not be called directly.

#### Returns

`PromptOverrideConfigurationProperty`

***

### fromSteps()

> `static` **fromSteps**(`steps`?): `PromptOverrideConfiguration`

#### Parameters

##### steps?

[`PromptStepConfiguration`](../interfaces/PromptStepConfiguration.md)[]

#### Returns

`PromptOverrideConfiguration`

***

### withCustomParser()

> `static` **withCustomParser**(`props`): `PromptOverrideConfiguration`

Creates a PromptOverrideConfiguration with a custom Lambda parser function.

#### Parameters

##### props

[`CustomParserProps`](../interfaces/CustomParserProps.md)

Configuration including:
  - `parser`: Lambda function to use as custom parser
  - `steps`: prompt step configurations. At least one of the steps must make use of the custom parser.

#### Returns

`PromptOverrideConfiguration`
