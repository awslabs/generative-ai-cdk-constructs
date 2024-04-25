[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

[bedrock](../modules/bedrock.md).BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Table of contents

### Constructors

- [constructor](bedrock.BedrockFoundationModel.md#constructor)

### Properties

- [modelId](bedrock.BedrockFoundationModel.md#modelid)
- [supportsAgents](bedrock.BedrockFoundationModel.md#supportsagents)
- [supportsKnowledgeBase](bedrock.BedrockFoundationModel.md#supportsknowledgebase)
- [vectorDimensions](bedrock.BedrockFoundationModel.md#vectordimensions)
- [AMAZON\_TITAN\_TEXT\_EXPRESS\_V1](bedrock.BedrockFoundationModel.md#amazon_titan_text_express_v1)
- [ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0](bedrock.BedrockFoundationModel.md#anthropic_claude_haiku_v1_0)
- [ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2](bedrock.BedrockFoundationModel.md#anthropic_claude_instant_v1_2)
- [ANTHROPIC\_CLAUDE\_SONNET\_V1\_0](bedrock.BedrockFoundationModel.md#anthropic_claude_sonnet_v1_0)
- [ANTHROPIC\_CLAUDE\_V2](bedrock.BedrockFoundationModel.md#anthropic_claude_v2)
- [ANTHROPIC\_CLAUDE\_V2\_1](bedrock.BedrockFoundationModel.md#anthropic_claude_v2_1)
- [COHERE\_EMBED\_ENGLISH\_V3](bedrock.BedrockFoundationModel.md#cohere_embed_english_v3)
- [COHERE\_EMBED\_MULTILINGUAL\_V3](bedrock.BedrockFoundationModel.md#cohere_embed_multilingual_v3)
- [TITAN\_EMBED\_TEXT\_V1](bedrock.BedrockFoundationModel.md#titan_embed_text_v1)

### Methods

- [asArn](bedrock.BedrockFoundationModel.md#asarn)
- [toString](bedrock.BedrockFoundationModel.md#tostring)

## Constructors

### constructor

• **new BedrockFoundationModel**(`value`, `props?`): [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `string` |
| `props` | [`BedrockFoundationModelProps`](../interfaces/bedrock.BedrockFoundationModelProps.md) |

#### Returns

[`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

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

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

▪ `Static` `Readonly` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_SONNET\_V1\_0

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_SONNET\_V1\_0**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_V2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_V2\_1

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2\_1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### COHERE\_EMBED\_ENGLISH\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_ENGLISH\_V3**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### COHERE\_EMBED\_MULTILINGUAL\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_MULTILINGUAL\_V3**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### TITAN\_EMBED\_TEXT\_V1

▪ `Static` `Readonly` **TITAN\_EMBED\_TEXT\_V1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

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
