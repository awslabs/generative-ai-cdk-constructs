[@cdklabs/generative-ai-cdk-constructs](../README.md) / bedrock

# Namespace: bedrock

## Table of contents

### Enumerations

- [CanadaSpecific](../enums/bedrock.CanadaSpecific.md)
- [ChunkingStrategy](../enums/bedrock.ChunkingStrategy.md)
- [FiltersConfigStrength](../enums/bedrock.FiltersConfigStrength.md)
- [FiltersConfigType](../enums/bedrock.FiltersConfigType.md)
- [Finance](../enums/bedrock.Finance.md)
- [General](../enums/bedrock.General.md)
- [InformationTechnology](../enums/bedrock.InformationTechnology.md)
- [ParserMode](../enums/bedrock.ParserMode.md)
- [PiiEntitiesConfigAction](../enums/bedrock.PiiEntitiesConfigAction.md)
- [PromptCreationMode](../enums/bedrock.PromptCreationMode.md)
- [PromptState](../enums/bedrock.PromptState.md)
- [PromptType](../enums/bedrock.PromptType.md)
- [UKSpecific](../enums/bedrock.UKSpecific.md)
- [USASpecific](../enums/bedrock.USASpecific.md)

### Classes

- [Agent](../classes/bedrock.Agent.md)
- [AgentActionGroup](../classes/bedrock.AgentActionGroup.md)
- [AgentAlias](../classes/bedrock.AgentAlias.md)
- [ApiSchema](../classes/bedrock.ApiSchema.md)
- [BedrockFoundationModel](../classes/bedrock.BedrockFoundationModel.md)
- [ContentPolicyConfig](../classes/bedrock.ContentPolicyConfig.md)
- [Guardrail](../classes/bedrock.Guardrail.md)
- [GuardrailVersion](../classes/bedrock.GuardrailVersion.md)
- [InlineApiSchema](../classes/bedrock.InlineApiSchema.md)
- [KnowledgeBase](../classes/bedrock.KnowledgeBase.md)
- [S3ApiSchema](../classes/bedrock.S3ApiSchema.md)
- [S3DataSource](../classes/bedrock.S3DataSource.md)
- [SensitiveInformationPolicyConfig](../classes/bedrock.SensitiveInformationPolicyConfig.md)
- [Topic](../classes/bedrock.Topic.md)

### Interfaces

- [ActionGroupExecutor](../interfaces/bedrock.ActionGroupExecutor.md)
- [AddAgentAliasProps](../interfaces/bedrock.AddAgentAliasProps.md)
- [AgentActionGroupProps](../interfaces/bedrock.AgentActionGroupProps.md)
- [AgentAliasProps](../interfaces/bedrock.AgentAliasProps.md)
- [AgentProps](../interfaces/bedrock.AgentProps.md)
- [ApiSchemaConfig](../interfaces/bedrock.ApiSchemaConfig.md)
- [BedrockFoundationModelProps](../interfaces/bedrock.BedrockFoundationModelProps.md)
- [ContentPolicyConfigProps](../interfaces/bedrock.ContentPolicyConfigProps.md)
- [GuardrailProps](../interfaces/bedrock.GuardrailProps.md)
- [InferenceConfiguration](../interfaces/bedrock.InferenceConfiguration.md)
- [KnowledgeBaseProps](../interfaces/bedrock.KnowledgeBaseProps.md)
- [PromptConfiguration](../interfaces/bedrock.PromptConfiguration.md)
- [PromptOverrideConfiguration](../interfaces/bedrock.PromptOverrideConfiguration.md)
- [S3DataSourceProps](../interfaces/bedrock.S3DataSourceProps.md)
- [S3Identifier](../interfaces/bedrock.S3Identifier.md)
- [SensitiveInformationPolicyConfigProps](../interfaces/bedrock.SensitiveInformationPolicyConfigProps.md)
- [TopicProps](../interfaces/bedrock.TopicProps.md)

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
