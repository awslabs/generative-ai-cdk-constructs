[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / Topic

# Class: Topic

## Extends

- `Construct`

## Constructors

### new Topic()

> **new Topic**(`scope`, `id`): [`Topic`](Topic.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

#### Returns

[`Topic`](Topic.md)

#### Overrides

`Construct.constructor`

## Properties

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

## Methods

### createTopic()

> **createTopic**(`props`): `void`

#### Parameters

• **props**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### financialAdviceTopic()

> **financialAdviceTopic**(`props`?): `void`

#### Parameters

• **props?**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### inappropriateContent()

> **inappropriateContent**(`props`?): `void`

#### Parameters

• **props?**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### legalAdvice()

> **legalAdvice**(`props`?): `void`

#### Parameters

• **props?**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### medicalAdvice()

> **medicalAdvice**(`props`?): `void`

#### Parameters

• **props?**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### politicalAdviceTopic()

> **politicalAdviceTopic**(`props`?): `void`

#### Parameters

• **props?**: [`TopicProps`](../interfaces/TopicProps.md)

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### topicConfigPropertyList()

> **topicConfigPropertyList**(): `TopicConfigProperty`[]

#### Returns

`TopicConfigProperty`[]

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
