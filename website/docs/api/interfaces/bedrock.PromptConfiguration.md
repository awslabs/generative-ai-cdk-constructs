[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / PromptConfiguration

# Interface: PromptConfiguration

[bedrock](/docs/api/modules/bedrock.md).PromptConfiguration

Contains configurations to override a prompt template in one part of an agent sequence.

## Properties

### basePromptTemplate

• `Readonly` **basePromptTemplate**: `string`

Defines the prompt template with which to replace the default prompt template.

**`Length`**

0-100000

___

### inferenceConfiguration

• `Readonly` **inferenceConfiguration**: [`InferenceConfiguration`](bedrock.InferenceConfiguration.md)

Contains inference parameters to use when the agent invokes a foundation
model in the part of the agent sequence defined by the promptType.

___

### parserMode

• `Optional` `Readonly` **parserMode**: [`ParserMode`](/docs/api/enums/bedrock.ParserMode.md)

Specifies whether to override the default parser Lambda function when
parsing the raw foundation model output in the part of the agent sequence
defined by the promptType. If you set the field as OVERRIDEN, the
overrideLambda field in the PromptOverrideConfiguration must be specified
with the ARN of a Lambda function.

___

### promptCreationMode

• `Readonly` **promptCreationMode**: [`PromptCreationMode`](/docs/api/enums/bedrock.PromptCreationMode.md)

Specifies whether to override the default prompt template for this
promptType. Set this value to OVERRIDDEN to use the prompt that you
provide in the basePromptTemplate. If you leave it as DEFAULT, the agent
uses a default prompt template.

___

### promptState

• `Readonly` **promptState**: [`PromptState`](/docs/api/enums/bedrock.PromptState.md)

Specifies whether to allow the agent to carry out the step specified in
the promptType. If you set this value to DISABLED, the agent skips that
step. The default state for each promptType is as follows.

    PRE_PROCESSING – ENABLED
    ORCHESTRATION – ENABLED
    KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
    POST_PROCESSING – DISABLED

___

### promptType

• `Readonly` **promptType**: [`PromptType`](/docs/api/enums/bedrock.PromptType.md)

The step in the agent sequence that this prompt configuration applies to.
