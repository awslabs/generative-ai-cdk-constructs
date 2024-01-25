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
- [AMAZON\_TITAN\_TEXT\_EXPRESS\_V1](bedrock.BedrockFoundationModel.md#amazon_titan_text_express_v1)
- [ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2](bedrock.BedrockFoundationModel.md#anthropic_claude_instant_v1_2)
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

#### Defined in

[src/cdk-lib/bedrock/models.ts:72](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L72)

## Properties

### modelId

• `Readonly` **modelId**: `string`

#### Defined in

[src/cdk-lib/bedrock/models.ts:69](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L69)

___

### supportsAgents

• `Readonly` **supportsAgents**: `boolean`

#### Defined in

[src/cdk-lib/bedrock/models.ts:70](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L70)

___

### supportsKnowledgeBase

• `Readonly` **supportsKnowledgeBase**: `boolean`

#### Defined in

[src/cdk-lib/bedrock/models.ts:71](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L71)

___

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

▪ `Static` `Readonly` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:51](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L51)

___

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:47](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L47)

___

### ANTHROPIC\_CLAUDE\_V2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:39](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L39)

___

### ANTHROPIC\_CLAUDE\_V2\_1

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_V2\_1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L43)

___

### COHERE\_EMBED\_ENGLISH\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_ENGLISH\_V3**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:60](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L60)

___

### COHERE\_EMBED\_MULTILINGUAL\_V3

▪ `Static` `Readonly` **COHERE\_EMBED\_MULTILINGUAL\_V3**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:64](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L64)

___

### TITAN\_EMBED\_TEXT\_V1

▪ `Static` `Readonly` **TITAN\_EMBED\_TEXT\_V1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Defined in

[src/cdk-lib/bedrock/models.ts:56](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L56)

## Methods

### asArn

▸ **asArn**(`construct`): `string`

#### Parameters

| Name | Type |
| :------ | :------ |
| `construct` | `IConstruct` |

#### Returns

`string`

#### Defined in

[src/cdk-lib/bedrock/models.ts:82](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L82)

___

### toString

▸ **toString**(): `string`

#### Returns

`string`

#### Defined in

[src/cdk-lib/bedrock/models.ts:78](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/models.ts#L78)
