[@cdklabs/generative-ai-cdk-constructs](/docs/api) / bedrock

# Namespace: bedrock

## Enumerations

- [ChunkingStrategy](/docs/api/enums/bedrock.ChunkingStrategy)
- [ParserMode](/docs/api/enums/bedrock.ParserMode)
- [PromptCreationMode](/docs/api/enums/bedrock.PromptCreationMode)
- [PromptState](/docs/api/enums/bedrock.PromptState)
- [PromptType](/docs/api/enums/bedrock.PromptType)

## Classes

- [Agent](/docs/api/classes/bedrock.Agent.md)
- [AgentActionGroup](/docs/api/classes/bedrock.AgentActionGroup.md)
- [AgentAlias](/docs/api/classes/bedrock.AgentAlias.md)
- [ApiSchema](/docs/api/classes/bedrock.ApiSchema.md)
- [BedrockFoundationModel](/docs/api/classes/bedrock.BedrockFoundationModel.md)
- [InlineApiSchema](/docs/api/classes/bedrock.InlineApiSchema.md)
- [KnowledgeBase](/docs/api/classes/bedrock.KnowledgeBase.md)
- [S3ApiSchema](/docs/api/classes/bedrock.S3ApiSchema.md)
- [S3DataSource](/docs/api/classes/bedrock.S3DataSource.md)

## Interfaces

- [AddAgentActionGroupProps](/docs/api/interfaces/bedrock.AddAgentActionGroupProps.md)
- [AddAgentAliasProps](/docs/api/interfaces/bedrock.AddAgentAliasProps.md)
- [AgentActionGroupProps](/docs/api/interfaces/bedrock.AgentActionGroupProps.md)
- [AgentAliasProps](/docs/api/interfaces/bedrock.AgentAliasProps.md)
- [AgentProps](/docs/api/interfaces/bedrock.AgentProps.md)
- [ApiSchemaConfig](/docs/api/interfaces/bedrock.ApiSchemaConfig.md)
- [BedrockFoundationModelProps](/docs/api/interfaces/bedrock.BedrockFoundationModelProps.md)
- [InferenceConfiguration](/docs/api/interfaces/bedrock.InferenceConfiguration.md)
- [KnowledgeBaseProps](/docs/api/interfaces/bedrock.KnowledgeBaseProps.md)
- [PromptConfiguration](/docs/api/interfaces/bedrock.PromptConfiguration.md)
- [PromptOverrideConfiguration](/docs/api/interfaces/bedrock.PromptOverrideConfiguration.md)
- [S3DataSourceProps](/docs/api/interfaces/bedrock.S3DataSourceProps.md)
- [S3Identifier](/docs/api/interfaces/bedrock.S3Identifier.md)

## Functions

### validateInferenceConfiguration

▸ **validateInferenceConfiguration**(`inferenceConfiguration`): `void`

Validate the inferenceConfiguration of a prompt override.

 This is an internal core function and should not be called directly.

#### Parameters

| Name | Type                                                                              |
| :------ |:----------------------------------------------------------------------------------|
| `inferenceConfiguration` | [`InferenceConfiguration`](docs/api/interfaces/bedrock.InferenceConfiguration.md) |

#### Returns

`void`

___

### validatePromptOverrideConfiguration

▸ **validatePromptOverrideConfiguration**(`promptOverrideConfiguration`): `void`

Validate the promptOverrideConfiguration.

 This is an internal core function and should not be called directly.

#### Parameters

| Name | Type                                                                                                        |
| :------ |:------------------------------------------------------------------------------------------------------------|
| `promptOverrideConfiguration` | `undefined` \| [`PromptOverrideConfiguration`](/docs/api/interfaces/bedrock.PromptOverrideConfiguration.md) |

#### Returns

`void`
