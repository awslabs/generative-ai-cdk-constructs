[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ToolChoice

# Class: ToolChoice

## Constructors

### Constructor

> **new ToolChoice**(`any`, `auto`, `tool?`): `ToolChoice`

#### Parameters

##### any

`any`

##### auto

`any`

##### tool?

`string`

#### Returns

`ToolChoice`

## Properties

### any?

> `readonly` `optional` **any**: `any`

***

### auto?

> `readonly` `optional` **auto**: `any`

***

### tool?

> `readonly` `optional` **tool**: `string`

***

### ANY

> `readonly` `static` **ANY**: `ToolChoice`

The model must request at least one tool (no text is generated)

***

### AUTO

> `readonly` `static` **AUTO**: `ToolChoice`

(Default). The Model automatically decides if a tool should be called or whether to generate text instead.

## Methods

### \_\_render()

> **\_\_render**(): `ToolChoiceProperty`

**`Internal`**

#### Returns

`ToolChoiceProperty`

***

### specificTool()

> `static` **specificTool**(`toolName`): `ToolChoice`

The Model must request the specified tool. Only supported by some models like Anthropic Claude 3 models.

#### Parameters

##### toolName

`string`

#### Returns

`ToolChoice`
