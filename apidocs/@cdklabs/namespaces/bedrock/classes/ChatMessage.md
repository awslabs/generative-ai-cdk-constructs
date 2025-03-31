[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ChatMessage

# Class: ChatMessage

## Constructors

### Constructor

> **new ChatMessage**(`role`, `text`): `ChatMessage`

#### Parameters

##### role

[`ChatMessageRole`](../enumerations/ChatMessageRole.md)

##### text

`string`

#### Returns

`ChatMessage`

## Properties

### role

> `readonly` **role**: [`ChatMessageRole`](../enumerations/ChatMessageRole.md)

***

### text

> `readonly` **text**: `string`

## Methods

### \_\_render()

> **\_\_render**(): `MessageProperty`

**`Internal`**

Renders as Cfn Property
 This is an internal core function and should not be called directly.

#### Returns

`MessageProperty`

***

### assistant()

> `static` **assistant**(`text`): `ChatMessage`

#### Parameters

##### text

`string`

#### Returns

`ChatMessage`

***

### user()

> `static` **user**(`text`): `ChatMessage`

#### Parameters

##### text

`string`

#### Returns

`ChatMessage`
