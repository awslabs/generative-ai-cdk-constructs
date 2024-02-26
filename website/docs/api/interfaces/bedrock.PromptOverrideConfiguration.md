[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / PromptOverrideConfiguration

# Interface: PromptOverrideConfiguration

[bedrock](/docs/api/modules/bedrock.md).PromptOverrideConfiguration

Contains configurations to override prompts in different parts of an agent sequence.

## Properties

### overrideLambda

• `Optional` `Readonly` **overrideLambda**: `string`

The ARN of the Lambda function to use when parsing the raw foundation
model output in parts of the agent sequence. If you specify this field,
at least one of the promptConfigurations must contain a parserMode value
that is set to OVERRIDDEN.

___

### promptConfigurations

• `Readonly` **promptConfigurations**: [`PromptConfiguration`](bedrock.PromptConfiguration.md)[]

Contains configurations to override a prompt template in one part of an agent sequence.
