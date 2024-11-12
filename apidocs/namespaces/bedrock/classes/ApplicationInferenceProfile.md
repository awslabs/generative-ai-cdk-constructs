[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ApplicationInferenceProfile

# Class: ApplicationInferenceProfile

Creates an application inference profile.

These are inference profiles created by users (user defined). 
This helps to track costs and model usage.

## Resource

AWS::Bedrock::ApplicationInferenceProfile

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/inference-profiles-create.html

## Extends

- `Construct`

## Constructors

### new ApplicationInferenceProfile()

> **new ApplicationInferenceProfile**(`scope`, `id`, `props`): [`ApplicationInferenceProfile`](ApplicationInferenceProfile.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: [`ApplicationInferenceProfileProps`](../interfaces/ApplicationInferenceProfileProps.md)

#### Returns

[`ApplicationInferenceProfile`](ApplicationInferenceProfile.md)

#### Overrides

`Construct.constructor`

## Properties

### inferenceProfileArn

> `readonly` **inferenceProfileArn**: `string`

The ARN of the application inference profile.

***

### inferenceProfileId

> `readonly` **inferenceProfileId**: `string`

The ARN of the application inference profile.

***

### inferenceProfileIdentifier

> `readonly` **inferenceProfileIdentifier**: `string`

The unique identifier of the inference profile.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### status

> `readonly` **status**: `string`

The status of the inference profile. ACTIVE means that the inference profile is ready to be used.

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
