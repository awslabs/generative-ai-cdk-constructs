[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ToolChoice

# Class: ToolChoice

## Constructors

### new ToolChoice()

> **new ToolChoice**(`any`, `auto`, `tool`?): [`ToolChoice`](ToolChoice.md)

#### Parameters

##### any

`any`

##### auto

`any`

##### tool?

`string`

#### Returns

[`ToolChoice`](ToolChoice.md)

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

> `readonly` `static` **ANY**: [`ToolChoice`](ToolChoice.md)

The model must request at least one tool (no text is generated)

***

### AUTO

> `readonly` `static` **AUTO**: [`ToolChoice`](ToolChoice.md)

(Default). The Model automatically decides if a tool should be called or whether to generate text instead.

## Methods

### \_\_render()

> **\_\_render**(): `ToolChoiceProperty`

**`Internal`**

#### Returns

`ToolChoiceProperty`

***

### specificTool()

> `static` **specificTool**(`toolName`): [`ToolChoice`](ToolChoice.md)

The Model must request the specified tool. Only supported by some models like Anthropic Claude 3 models.

#### Parameters

##### toolName

`string`

#### Returns

[`ToolChoice`](ToolChoice.md)
