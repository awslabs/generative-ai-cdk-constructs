[@cdklabs/generative-ai-cdk-constructs](../README.md) / bedrock

# Namespace: bedrock

## Table of contents

### Enumerations

- [ChunkingStrategy](../enums/bedrock.ChunkingStrategy.md)
- [ParserMode](../enums/bedrock.ParserMode.md)
- [PromptCreationMode](../enums/bedrock.PromptCreationMode.md)
- [PromptState](../enums/bedrock.PromptState.md)
- [PromptType](../enums/bedrock.PromptType.md)

### Classes

- [Agent](../classes/bedrock.Agent.md)
- [AgentAlias](../classes/bedrock.AgentAlias.md)
- [BedrockFoundationModel](../classes/bedrock.BedrockFoundationModel.md)
- [KnowledgeBase](../classes/bedrock.KnowledgeBase.md)
- [S3DataSource](../classes/bedrock.S3DataSource.md)

### Interfaces

- [AgentAliasProps](../interfaces/bedrock.AgentAliasProps.md)
- [AgentProps](../interfaces/bedrock.AgentProps.md)
- [BedrockFoundationModelProps](../interfaces/bedrock.BedrockFoundationModelProps.md)
- [InferenceConfiguration](../interfaces/bedrock.InferenceConfiguration.md)
- [KnowledgeBaseProps](../interfaces/bedrock.KnowledgeBaseProps.md)
- [PromptConfiguration](../interfaces/bedrock.PromptConfiguration.md)
- [PromptOverrideConfiguration](../interfaces/bedrock.PromptOverrideConfiguration.md)
- [S3DataSourceProps](../interfaces/bedrock.S3DataSourceProps.md)

### Functions

- [validateInferenceConfiguration](bedrock.md#validateinferenceconfiguration)
- [validatePromptOverrideConfiguration](bedrock.md#validatepromptoverrideconfiguration)

## Functions

### validateInferenceConfiguration

▸ **validateInferenceConfiguration**(`inferenceConfiguration`): `void`

Validate the inferenceConfiguration of a prompt override.

 This is an internal core function and should not be called directly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `inferenceConfiguration` | [`InferenceConfiguration`](../interfaces/bedrock.InferenceConfiguration.md) |

#### Returns

`void`

#### Defined in

[src/cdk-lib/bedrock/agent.ts:541](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L541)

___

### validatePromptOverrideConfiguration

▸ **validatePromptOverrideConfiguration**(`promptOverrideConfiguration`): `void`

Validate the promptOverrideConfiguration.

 This is an internal core function and should not be called directly.

#### Parameters

| Name | Type |
| :------ | :------ |
| `promptOverrideConfiguration` | `undefined` \| [`PromptOverrideConfiguration`](../interfaces/bedrock.PromptOverrideConfiguration.md) |

#### Returns

`void`

#### Defined in

[src/cdk-lib/bedrock/agent.ts:576](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L576)
