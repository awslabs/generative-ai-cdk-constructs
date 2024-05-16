[@cdklabs/generative-ai-cdk-constructs](../README.md) / [foundation\_models](../modules/foundation_models.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

[foundation\_models](../modules/foundation_models.md).BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Table of contents

### Constructors

- [constructor](foundation_models.BedrockFoundationModel.md#constructor)

### Properties

- [modelId](foundation_models.BedrockFoundationModel.md#modelid)
- [supportsAgents](foundation_models.BedrockFoundationModel.md#supportsagents)
- [supportsKnowledgeBase](foundation_models.BedrockFoundationModel.md#supportsknowledgebase)
- [vectorDimensions](foundation_models.BedrockFoundationModel.md#vectordimensions)
- [AMAZON\_TITAN\_PREMIER\_V1\_0](foundation_models.BedrockFoundationModel.md#amazon_titan_premier_v1_0)
- [AMAZON\_TITAN\_TEXT\_EXPRESS\_V1](foundation_models.BedrockFoundationModel.md#amazon_titan_text_express_v1)
- [ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0](foundation_models.BedrockFoundationModel.md#anthropic_claude_haiku_v1_0)
- [ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2](foundation_models.BedrockFoundationModel.md#anthropic_claude_instant_v1_2)
- [ANTHROPIC\_CLAUDE\_SONNET\_V1\_0](foundation_models.BedrockFoundationModel.md#anthropic_claude_sonnet_v1_0)
- [ANTHROPIC\_CLAUDE\_V2](foundation_models.BedrockFoundationModel.md#anthropic_claude_v2)
- [ANTHROPIC\_CLAUDE\_V2\_1](foundation_models.BedrockFoundationModel.md#anthropic_claude_v2_1)
- [COHERE\_EMBED\_ENGLISH\_V3](foundation_models.BedrockFoundationModel.md#cohere_embed_english_v3)
- [COHERE\_EMBED\_MULTILINGUAL\_V3](foundation_models.BedrockFoundationModel.md#cohere_embed_multilingual_v3)
- [META\_LLAMA\_70B\_INSTRUCT](foundation_models.BedrockFoundationModel.md#meta_llama_70b_instruct)
- [MISTRAL\_AI\_LARGE](foundation_models.BedrockFoundationModel.md#mistral_ai_large)
- [STABILITY\_AI\_STABLE\_DIFFUSION\_XL\_V1](foundation_models.BedrockFoundationModel.md#stability_ai_stable_diffusion_xl_v1)
- [TITAN\_EMBED\_TEXT\_V1](foundation_models.BedrockFoundationModel.md#titan_embed_text_v1)

### Methods

- [asArn](foundation_models.BedrockFoundationModel.md#asarn)
- [toString](foundation_models.BedrockFoundationModel.md#tostring)

## Constructors

### constructor

• **new BedrockFoundationModel**(`value`, `props?`): [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `props` | [`BedrockFoundationModelProps`](../interfaces/foundation_models.BedrockFoundationModelProps.md) |

#### Returns

[`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

## Properties

### modelId

• `Readonly` **modelId**: `string`

___

### supportsAgents

• `Readonly` **supportsAgents**: `boolean`

___

### supportsKnowledgeBase

• `Readonly` **supportsKnowledgeBase**: `boolean`

___

### vectorDimensions

• `Optional` `Readonly` **vectorDimensions**: `number`

___

### AMAZON\_TITAN\_PREMIER\_V1\_0

▪ `Static` `Readonly` **AMAZON\_TITAN\_PREMIER\_V1\_0**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

▪ `Static` `Readonly` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_SONNET\_V1\_0

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_SONNET\_V1\_0**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_V2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_V2\_1

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2\_1**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### COHERE\_EMBED\_ENGLISH\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_ENGLISH\_V3**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### COHERE\_EMBED\_MULTILINGUAL\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_MULTILINGUAL\_V3**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### META\_LLAMA\_70B\_INSTRUCT

▪ `Static` `Readonly` **META\_LLAMA\_70B\_INSTRUCT**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### MISTRAL\_AI\_LARGE

▪ `Static` `Readonly` **MISTRAL\_AI\_LARGE**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### STABILITY\_AI\_STABLE\_DIFFUSION\_XL\_V1

▪ `Static` `Readonly` **STABILITY\_AI\_STABLE\_DIFFUSION\_XL\_V1**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

___

### TITAN\_EMBED\_TEXT\_V1

▪ `Static` `Readonly` **TITAN\_EMBED\_TEXT\_V1**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

## Methods

### asArn

▸ **asArn**(`construct`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

`string`

___

### toString

▸ **toString**(): `string`

#### Returns

`string`
