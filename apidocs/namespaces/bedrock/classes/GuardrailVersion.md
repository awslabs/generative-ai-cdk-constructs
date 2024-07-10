[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / GuardrailVersion

# Class: GuardrailVersion

Creates a version of the guardrail.

Use this API to create a snapshot of the guardrail when you are satisfied with
a configuration, or to compare the configuration with another version.

## Extends

- `Construct`

## Constructors

### new GuardrailVersion()

> **new GuardrailVersion**(`scope`, `id`, `props`): [`GuardrailVersion`](GuardrailVersion.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: `CfnGuardrailVersionProps`

#### Returns

[`GuardrailVersion`](GuardrailVersion.md)

#### Overrides

`Construct.constructor`

## Properties

### guardrailVersionInstance

> `readonly` **guardrailVersionInstance**: `CfnGuardrailVersion`

Instance of guardrail version

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

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

• **x**: `any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
