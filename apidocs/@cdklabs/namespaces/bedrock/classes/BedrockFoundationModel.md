[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / BedrockFoundationModel

# Class: BedrockFoundationModel

Bedrock models.

If you need to use a model name that doesn't exist as a static member, you
can instantiate a `BedrockFoundationModel` object, e.g: `new BedrockFoundationModel('my-model')`.

## Implements

- [`IInvokable`](../interfaces/IInvokable.md)

## Constructors

### Constructor

> **new BedrockFoundationModel**(`value`, `props`): `BedrockFoundationModel`

#### Parameters

##### value

`string`

##### props

[`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

`BedrockFoundationModel`

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

### supportedVectorType?

> `readonly` `optional` **supportedVectorType**: [`VectorType`](../enumerations/VectorType.md)[]

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

### AI21\_JAMBA\_1\_5\_LARGE\_V1

> `readonly` `static` **AI21\_JAMBA\_1\_5\_LARGE\_V1**: `BedrockFoundationModel`

*************************************************************************
                           AI21
*************************************************************************

***

### AI21\_JAMBA\_1\_5\_MINI\_V1

> `readonly` `static` **AI21\_JAMBA\_1\_5\_MINI\_V1**: `BedrockFoundationModel`

***

### AI21\_JAMBA\_INSTRUCT\_V1

> `readonly` `static` **AI21\_JAMBA\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### AMAZON\_NOVA\_LITE\_V1

> `readonly` `static` **AMAZON\_NOVA\_LITE\_V1**: `BedrockFoundationModel`

***

### AMAZON\_NOVA\_MICRO\_V1

> `readonly` `static` **AMAZON\_NOVA\_MICRO\_V1**: `BedrockFoundationModel`

***

### AMAZON\_NOVA\_PREMIER\_V1

> `readonly` `static` **AMAZON\_NOVA\_PREMIER\_V1**: `BedrockFoundationModel`

***

### AMAZON\_NOVA\_PRO\_V1

> `readonly` `static` **AMAZON\_NOVA\_PRO\_V1**: `BedrockFoundationModel`

***

### AMAZON\_TITAN\_PREMIER\_V1\_0

> `readonly` `static` **AMAZON\_TITAN\_PREMIER\_V1\_0**: `BedrockFoundationModel`

***

### AMAZON\_TITAN\_TEXT\_EXPRESS\_V1

> `readonly` `static` **AMAZON\_TITAN\_TEXT\_EXPRESS\_V1**: `BedrockFoundationModel`

*************************************************************************
                           AMAZON
*************************************************************************

***

### ANTHROPIC\_CLAUDE\_3\_5\_HAIKU\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_HAIKU\_V1\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V1\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V2\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_5\_SONNET\_V2\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_3\_7\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_3\_7\_SONNET\_V1\_0**: `BedrockFoundationModel`

*************************************************************************
                           ANTHROPIC
*************************************************************************

***

### ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_HAIKU\_V1\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2

> `readonly` `static` **ANTHROPIC\_CLAUDE\_INSTANT\_V1\_2**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_OPUS\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_OPUS\_V1\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_SONNET\_V1\_0

> `readonly` `static` **ANTHROPIC\_CLAUDE\_SONNET\_V1\_0**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_V2

> `readonly` `static` **ANTHROPIC\_CLAUDE\_V2**: `BedrockFoundationModel`

***

### ANTHROPIC\_CLAUDE\_V2\_1

> `readonly` `static` **ANTHROPIC\_CLAUDE\_V2\_1**: `BedrockFoundationModel`

***

### COHERE\_EMBED\_ENGLISH\_V3

> `readonly` `static` **COHERE\_EMBED\_ENGLISH\_V3**: `BedrockFoundationModel`

*************************************************************************
                           COHERE
*************************************************************************

***

### COHERE\_EMBED\_MULTILINGUAL\_V3

> `readonly` `static` **COHERE\_EMBED\_MULTILINGUAL\_V3**: `BedrockFoundationModel`

***

### DEEPSEEK\_R1\_V1

> `readonly` `static` **DEEPSEEK\_R1\_V1**: `BedrockFoundationModel`

*************************************************************************
                           DEEPSEEK
*************************************************************************

***

### META\_LLAMA\_3\_1\_70B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_1\_70B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_3\_1\_8B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_1\_8B\_INSTRUCT\_V1**: `BedrockFoundationModel`

*************************************************************************
                           META
*************************************************************************

***

### META\_LLAMA\_3\_2\_11B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_11B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_3\_2\_1B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_1B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_3\_2\_3B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_2\_3B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_3\_3\_70B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_3\_3\_70B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_4\_MAVERICK\_70B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_4\_MAVERICK\_70B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### META\_LLAMA\_4\_SCOUT\_17B\_INSTRUCT\_V1

> `readonly` `static` **META\_LLAMA\_4\_SCOUT\_17B\_INSTRUCT\_V1**: `BedrockFoundationModel`

***

### MISTRAL\_7B\_INSTRUCT\_V0

> `readonly` `static` **MISTRAL\_7B\_INSTRUCT\_V0**: `BedrockFoundationModel`

*************************************************************************
                           MISTRAL AI
*************************************************************************

***

### MISTRAL\_LARGE\_2402\_V1

> `readonly` `static` **MISTRAL\_LARGE\_2402\_V1**: `BedrockFoundationModel`

***

### MISTRAL\_LARGE\_2407\_V1

> `readonly` `static` **MISTRAL\_LARGE\_2407\_V1**: `BedrockFoundationModel`

***

### MISTRAL\_MIXTRAL\_8X7B\_INSTRUCT\_V0

> `readonly` `static` **MISTRAL\_MIXTRAL\_8X7B\_INSTRUCT\_V0**: `BedrockFoundationModel`

***

### MISTRAL\_PIXTRAL\_LARGE\_2502\_V1

> `readonly` `static` **MISTRAL\_PIXTRAL\_LARGE\_2502\_V1**: `BedrockFoundationModel`

***

### MISTRAL\_SMALL\_2402\_V1

> `readonly` `static` **MISTRAL\_SMALL\_2402\_V1**: `BedrockFoundationModel`

***

### TITAN\_EMBED\_TEXT\_V1

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V1**: `BedrockFoundationModel`

***

### TITAN\_EMBED\_TEXT\_V2\_1024

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_1024**: `BedrockFoundationModel`

***

### TITAN\_EMBED\_TEXT\_V2\_256

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_256**: `BedrockFoundationModel`

***

### TITAN\_EMBED\_TEXT\_V2\_512

> `readonly` `static` **TITAN\_EMBED\_TEXT\_V2\_512**: `BedrockFoundationModel`

## Methods

### asArn()

> **asArn**(`construct`): `string`

Returns the ARN of the foundation model in the following format:
`arn:${Partition}:bedrock:${Region}::foundation-model/${ResourceId}`

#### Parameters

##### construct

`IConstruct`

#### Returns

`string`

***

### asIModel()

> **asIModel**(`construct`): `IModel`

#### Parameters

##### construct

`IConstruct`

#### Returns

`IModel`

***

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the Foundation Model in the stack region.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`grantInvoke`](../interfaces/IInvokable.md#grantinvoke)

***

### grantInvokeAllRegions()

> **grantInvokeAllRegions**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the Foundation Model in all regions.

#### Parameters

##### grantee

`IGrantable`

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

> `static` **fromCdkFoundationModel**(`modelId`, `props`): `BedrockFoundationModel`

#### Parameters

##### modelId

`FoundationModel`

##### props

[`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

`BedrockFoundationModel`

***

### fromCdkFoundationModelId()

> `static` **fromCdkFoundationModelId**(`modelId`, `props`): `BedrockFoundationModel`

#### Parameters

##### modelId

`FoundationModelIdentifier`

##### props

[`BedrockFoundationModelProps`](../interfaces/BedrockFoundationModelProps.md) = `{}`

#### Returns

`BedrockFoundationModel`
