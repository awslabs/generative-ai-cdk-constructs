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
- [AgentActionGroup](../classes/bedrock.AgentActionGroup.md)
- [AgentAlias](../classes/bedrock.AgentAlias.md)
- [ApiSchema](../classes/bedrock.ApiSchema.md)
- [BedrockFoundationModel](../classes/bedrock.BedrockFoundationModel.md)
- [InlineApiSchema](../classes/bedrock.InlineApiSchema.md)
- [KnowledgeBase](../classes/bedrock.KnowledgeBase.md)
- [S3ApiSchema](../classes/bedrock.S3ApiSchema.md)
- [S3DataSource](../classes/bedrock.S3DataSource.md)

### Interfaces

- [AddAgentActionGroupProps](../interfaces/bedrock.AddAgentActionGroupProps.md)
- [AddAgentAliasProps](../interfaces/bedrock.AddAgentAliasProps.md)
- [AgentActionGroupProps](../interfaces/bedrock.AgentActionGroupProps.md)
- [AgentAliasProps](../interfaces/bedrock.AgentAliasProps.md)
- [AgentProps](../interfaces/bedrock.AgentProps.md)
- [ApiSchemaConfig](../interfaces/bedrock.ApiSchemaConfig.md)
- [BedrockFoundationModelProps](../interfaces/bedrock.BedrockFoundationModelProps.md)
- [InferenceConfiguration](../interfaces/bedrock.InferenceConfiguration.md)
- [KnowledgeBaseProps](../interfaces/bedrock.KnowledgeBaseProps.md)
- [PromptConfiguration](../interfaces/bedrock.PromptConfiguration.md)
- [PromptOverrideConfiguration](../interfaces/bedrock.PromptOverrideConfiguration.md)
- [S3DataSourceProps](../interfaces/bedrock.S3DataSourceProps.md)
- [S3Identifier](../interfaces/bedrock.S3Identifier.md)

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
