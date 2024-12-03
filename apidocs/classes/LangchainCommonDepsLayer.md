[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainCommonDepsLayer

# Class: LangchainCommonDepsLayer

The LangchainCommonDepsLayer class.

## Extends

- `Construct`

## Constructors

### new LangchainCommonDepsLayer()

> **new LangchainCommonDepsLayer**(`scope`, `id`, `props`): [`LangchainCommonDepsLayer`](LangchainCommonDepsLayer.md)

This construct creates a lambda layer loaded with relevant libraries to run genai applications. Libraries include boto3, botocore, requests, requests-aws4auth, langchain, opensearch-py and openai.

#### Parameters

##### scope

`Construct`

represents the scope for all the resources.

##### id

`string`

this is a a scope-unique id.

##### props

[`LangchainLayerProps`](../interfaces/LangchainLayerProps.md)

user provided props for the construct.

#### Returns

[`LangchainCommonDepsLayer`](LangchainCommonDepsLayer.md)

#### Since

0.0.0

#### Overrides

`Construct.constructor`

## Properties

### layer

> `readonly` **layer**: `LayerVersion`

Returns the instance of lambda.LayerVersion created by the construct

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

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
