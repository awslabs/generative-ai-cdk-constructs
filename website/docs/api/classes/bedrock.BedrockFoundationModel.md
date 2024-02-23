[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

[bedrock](/docs/api/modules/bedrock.md).BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Constructors

### constructor

• **new BedrockFoundationModel**(`value`, `props?`): [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

#### Parameters

| Name | Type                                                                                         |
| :------ |:---------------------------------------------------------------------------------------------|
| `value` | `string`                                                                                     |
| `props` | [`BedrockFoundationModelProps`](/docs/api/interfaces/bedrock.BedrockFoundationModelProps.md) |

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

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

▪ `Static` `Readonly` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

___

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

▪ `Static` `Readonly` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: [`BedrockFoundationModel`](bedrock.BedrockFoundationModel.md)

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
