[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / PromptConfiguration

# Interface: PromptConfiguration

[bedrock](../modules/bedrock.md).PromptConfiguration

Contains configurations to override a prompt template in one part of an agent sequence.

## Table of contents

### Properties

- [basePromptTemplate](bedrock.PromptConfiguration.md#baseprompttemplate)
- [inferenceConfiguration](bedrock.PromptConfiguration.md#inferenceconfiguration)
- [parserMode](bedrock.PromptConfiguration.md#parsermode)
- [promptCreationMode](bedrock.PromptConfiguration.md#promptcreationmode)
- [promptState](bedrock.PromptConfiguration.md#promptstate)
- [promptType](bedrock.PromptConfiguration.md#prompttype)

## Properties

### basePromptTemplate

• `Readonly` **basePromptTemplate**: `string`

Defines the prompt template with which to replace the default prompt template.

**`Length`**

0-100000

#### Defined in

[src/cdk-lib/bedrock/agent.ts:155](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L155)

___

### inferenceConfiguration

• `Readonly` **inferenceConfiguration**: [`InferenceConfiguration`](bedrock.InferenceConfiguration.md)

Contains inference parameters to use when the agent invokes a foundation
model in the part of the agent sequence defined by the promptType.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:149](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L149)

___

### parserMode

• `Optional` `Readonly` **parserMode**: [`ParserMode`](../enums/bedrock.ParserMode.md)

Specifies whether to override the default parser Lambda function when
parsing the raw foundation model output in the part of the agent sequence
defined by the promptType. If you set the field as OVERRIDEN, the
overrideLambda field in the PromptOverrideConfiguration must be specified
with the ARN of a Lambda function.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:163](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L163)

___

### promptCreationMode

• `Readonly` **promptCreationMode**: [`PromptCreationMode`](../enums/bedrock.PromptCreationMode.md)

Specifies whether to override the default prompt template for this
promptType. Set this value to OVERRIDDEN to use the prompt that you
provide in the basePromptTemplate. If you leave it as DEFAULT, the agent
uses a default prompt template.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L170)

___

### promptState

• `Readonly` **promptState**: [`PromptState`](../enums/bedrock.PromptState.md)

Specifies whether to allow the agent to carry out the step specified in
the promptType. If you set this value to DISABLED, the agent skips that
step. The default state for each promptType is as follows.

    PRE_PROCESSING – ENABLED
    ORCHESTRATION – ENABLED
    KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
    POST_PROCESSING – DISABLED

#### Defined in

[src/cdk-lib/bedrock/agent.ts:181](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L181)

___

### promptType

• `Readonly` **promptType**: [`PromptType`](../enums/bedrock.PromptType.md)

The step in the agent sequence that this prompt configuration applies to.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:144](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/agent.ts#L144)
