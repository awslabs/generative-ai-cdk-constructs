[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Implements

- [`IInvokable`](../interfaces/IInvokable.md)

## Constructors

### new BedrockFoundationModel()

> **new BedrockFoundationModel**(`value`, `props`): [`BedrockFoundationModel`](BedrockFoundationModel.md)

#### Parameters

• **value**: `string`

• **props**: [`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

[`BedrockFoundationModel`](BedrockFoundationModel.md)

## Properties

### invokableArn

> `readonly` **invokableArn**: `string`

The ARN of the Bedrock invokable abstraction.

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`invokableArn`](../interfaces/IInvokable.md#invokablearn)

***

### modelArn

> `readonly` **modelArn**: `string`

***

### modelId

> `readonly` **modelId**: `string`

*************************************************************************
                           Constructor
*************************************************************************

***

### supportsAgents

> `readonly` **supportsAgents**: `boolean`

***

### supportsCrossRegion

> `readonly` **supportsCrossRegion**: `boolean`

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

*************************************************************************
                           AMAZON
*************************************************************************

***

### ANTHROPIC\_CLAUDE\_3\_5\_HAIKU\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_HAIKU\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V2\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V2\_0**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

*************************************************************************
                           ANTHROPIC
*************************************************************************

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

*************************************************************************
                           COHERE
*************************************************************************

***

### COHERE\_EMBED\_MULTILINGUAL\_V3

> `readonly` `static` **COHERE\_EMBED\_MULTILINGUAL\_V3**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### META\_LLAMA\_3\_2\_11B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_11B\_INSTRUCT\_V1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

*************************************************************************
                           META
*************************************************************************

***

### META\_LLAMA\_3\_2\_1B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_1B\_INSTRUCT\_V1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### META\_LLAMA\_3\_2\_3B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_3B\_INSTRUCT\_V1**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

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

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the Foundation Model in the stack region.

#### Parameters

• **grantee**: `IGrantable`

#### Returns

`Grant`

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`grantInvoke`](../interfaces/IInvokable.md#grantinvoke)

***

### grantInvokeAllRegions()

> **grantInvokeAllRegions**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the Foundation Model in all regions.

#### Parameters

• **grantee**: `IGrantable`

#### Returns

`Grant`

***

### toString()

> **toString**(): `string`

Returns a string representation of an object.

#### Returns

`string`

***

### fromCdkFoundationModel()

> `static` **fromCdkFoundationModel**(`modelId`, `props`): [`BedrockFoundationModel`](BedrockFoundationModel.md)

#### Parameters

• **modelId**: `FoundationModel`

• **props**: [`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

[`BedrockFoundationModel`](BedrockFoundationModel.md)

***

### fromCdkFoundationModelId()

> `static` **fromCdkFoundationModelId**(`modelId`, `props`): [`BedrockFoundationModel`](BedrockFoundationModel.md)

#### Parameters

• **modelId**: `FoundationModelIdentifier`

• **props**: [`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

[`BedrockFoundationModel`](BedrockFoundationModel.md)
