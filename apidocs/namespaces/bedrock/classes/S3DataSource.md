[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / S3DataSource

# Class: S3DataSource

Sets up a data source to be added to a knowledge base.

## Extends

- `Construct`

## Constructors

### new S3DataSource()

> **new S3DataSource**(`scope`, `id`, `props`): [`S3DataSource`](S3DataSource.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: [`S3DataSourceProps`](../interfaces/S3DataSourceProps.md)

#### Returns

[`S3DataSource`](S3DataSource.md)

#### Overrides

`Construct.constructor`

## Properties

### dataSource

> `readonly` **dataSource**: `CfnDataSource`

The Data Source cfn resource.

***

### dataSourceId

> `readonly` **dataSourceId**: `string`

The unique identifier of the data source.

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
