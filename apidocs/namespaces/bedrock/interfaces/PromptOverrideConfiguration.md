[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptOverrideConfiguration

# Interface: PromptOverrideConfiguration

Contains configurations to override prompts in different parts of an agent sequence.

## Properties

### overrideLambda?

> `readonly` `optional` **overrideLambda**: `string`

The ARN of the Lambda function to use when parsing the raw foundation
model output in parts of the agent sequence. If you specify this field,
at least one of the promptConfigurations must contain a parserMode value
that is set to OVERRIDDEN.

***

### promptConfigurations

> `readonly` **promptConfigurations**: [`PromptConfiguration`](PromptConfiguration.md)[]

Contains configurations to override a prompt template in one part of an agent sequence.
