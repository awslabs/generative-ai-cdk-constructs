[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptVersion

# Class: PromptVersion

Creates a version of the prompt.

Use this to create a static snapshot of your prompt that can be deployed
to production. Versions allow you to easily switch between different
configurations for your prompt and update your application with the most
appropriate version for your use-case.

## Resource

AWS::Bedrock::PromptVersion

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-management-deploy.html

## Extends

- `Construct`

## Constructors

### new PromptVersion()

> **new PromptVersion**(`scope`, `id`, `props`): [`PromptVersion`](PromptVersion.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`PromptVersionProps`](../interfaces/PromptVersionProps.md)

#### Returns

[`PromptVersion`](PromptVersion.md)

#### Overrides

`Construct.constructor`

## Properties

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### prompt

> `readonly` **prompt**: [`Prompt`](Prompt.md)

The prompt used by this version.

***

### version

> `readonly` **version**: `string`

The version of the prompt that was created.

***

### versionArn

> `readonly` **versionArn**: `string`

The Amazon Resource Name (ARN) of the prompt version.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345:1"
```

## Methods

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

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
