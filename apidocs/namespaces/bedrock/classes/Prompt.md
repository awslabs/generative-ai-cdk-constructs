[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / Prompt

# Class: Prompt

Prompts are a specific set of inputs that guide FMs on Amazon Bedrock to
generate an appropriate response or output for a given task or instruction.
You can optimize the prompt for specific use cases and models.

## Resource

AWS::Bedrock::Prompt

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management.html

## Extends

- `Construct`

## Implements

- [`IPrompt`](../interfaces/IPrompt.md)

## Constructors

### new Prompt()

> **new Prompt**(`scope`, `id`, `props`): [`Prompt`](Prompt.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`PromptProps`](../interfaces/PromptProps.md)

#### Returns

[`Prompt`](Prompt.md)

#### Overrides

`Construct.constructor`

## Properties

### \_hash

> `protected` `readonly` **\_hash**: `string`

**`Internal`**

The computed hash of the prompt properties.

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key that the prompt is encrypted with.

#### Implementation of

[`IPrompt`](../interfaces/IPrompt.md).[`kmsKey`](../interfaces/IPrompt.md#kmskey)

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### promptArn

> `readonly` **promptArn**: `string`

The ARN of the prompt.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345"
```

#### Implementation of

[`IPrompt`](../interfaces/IPrompt.md).[`promptArn`](../interfaces/IPrompt.md#promptarn)

***

### promptId

> `readonly` **promptId**: `string`

The ID of the prompt.

#### Example

```ts
"PROMPT12345"
```

#### Implementation of

[`IPrompt`](../interfaces/IPrompt.md).[`promptId`](../interfaces/IPrompt.md#promptid)

***

### promptName

> `readonly` **promptName**: `string`

The name of the prompt.

***

### promptVersion

> **promptVersion**: `string`

The version of the prompt.

#### Implementation of

[`IPrompt`](../interfaces/IPrompt.md).[`promptVersion`](../interfaces/IPrompt.md#promptversion)

***

### variants

> `readonly` **variants**: [`PromptVariant`](PromptVariant.md)[]

The variants of the prompt.

## Methods

### addVariant()

> **addVariant**(`variant`): `void`

Adds a prompt variant.

#### Parameters

##### variant

[`PromptVariant`](PromptVariant.md)

#### Returns

`void`

***

### createVersion()

> **createVersion**(`description`?): `string`

Creates a prompt version, a static snapshot of your prompt that can be
deployed to production.

#### Parameters

##### description?

`string`

#### Returns

`string`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### fromPromptAttributes()

> `static` **fromPromptAttributes**(`scope`, `id`, `attrs`): [`IPrompt`](../interfaces/IPrompt.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### attrs

[`PromptAttributes`](../interfaces/PromptAttributes.md)

#### Returns

[`IPrompt`](../interfaces/IPrompt.md)

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
