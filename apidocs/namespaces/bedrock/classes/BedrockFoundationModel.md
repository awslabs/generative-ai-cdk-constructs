[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Constructors

### new BedrockFoundationModel()

> **new BedrockFoundationModel**(`value`, `props`): [`BedrockFoundationModel`](BedrockFoundationModel.md)

#### Parameters

• **value**: `string`

• **props**: [`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

[`BedrockFoundationModel`](BedrockFoundationModel.md)

## Properties

### modelId

> `readonly` **modelId**: `string`

***

### supportsAgents

> `readonly` **supportsAgents**: `boolean`

***

### supportsKnowledgeBase

> `readonly` **supportsKnowledgeBase**: `boolean`

***

### vectorDimensions?

> `readonly` `optional` **vectorDimensions**: `number`

***

### AMAZON\_TITAN\_PREMIER\_V1\_0

> `readonly` `static` **AMAZON\_TITAN\_PREMIER\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

> `readonly` `static` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

> `readonly` `static` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_OPUS\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_OPUS\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_SONNET\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_V2

> `readonly` `static` **ANTHROPIC\_CLAUDE\_V2**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_V2\_1

> `readonly` `static` **ANTHROPIC\_CLAUDE\_V2\_1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### COHERE\_EMBED\_ENGLISH\_V3

> `readonly` `static` **COHERE\_EMBED\_ENGLISH\_V3**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### COHERE\_EMBED\_MULTILINGUAL\_V3

> `readonly` `static` **COHERE\_EMBED\_MULTILINGUAL\_V3**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### TITAN\_EMBED\_TEXT\_V1

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### TITAN\_EMBED\_TEXT\_V2\_1024

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_1024**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### TITAN\_EMBED\_TEXT\_V2\_256

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_256**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### TITAN\_EMBED\_TEXT\_V2\_512

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_512**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

## Methods

### asArn()

> **asArn**(`construct`): `string`

Returns the ARN of the foundation model in the following format:
`arn:${Partition}:bedrock:${Region}::foundation-model/${ResourceId}`

#### Parameters

• **construct**: `IConstruct`

#### Returns

`string`

***

### asIModel()

> **asIModel**(`construct`): `IModel`

#### Parameters

• **construct**: `IConstruct`

#### Returns

`IModel`

***

### toString()

> **toString**(): `string`

#### Returns

`string`
