[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / S3DataSource

# Class: S3DataSource

[bedrock](../modules/bedrock.md).S3DataSource

Sets up a data source to be added to a knowledge base.

## Hierarchy

- `Construct`

  ↳ **`S3DataSource`**

## Table of contents

### Constructors

- [constructor](bedrock.S3DataSource.md#constructor)

### Properties

- [dataSource](bedrock.S3DataSource.md#datasource)
- [dataSourceId](bedrock.S3DataSource.md#datasourceid)
- [node](bedrock.S3DataSource.md#node)

### Methods

- [toString](bedrock.S3DataSource.md#tostring)
- [isConstruct](bedrock.S3DataSource.md#isconstruct)

## Constructors

### constructor

• **new S3DataSource**(`scope`, `id`, `props`): [`S3DataSource`](bedrock.S3DataSource.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`S3DataSourceProps`](../interfaces/bedrock.S3DataSourceProps.md) |

#### Returns

[`S3DataSource`](bedrock.S3DataSource.md)

#### Overrides

Construct.constructor

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:113](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/s3-data-source.ts#L113)

## Properties

### dataSource

• `Readonly` **dataSource**: `CustomResource`

The Data Source cfn resource.

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:107](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/s3-data-source.ts#L107)

___

### dataSourceId

• `Readonly` **dataSourceId**: `string`

The unique identifier of the data source.

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:111](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/s3-data-source.ts#L111)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

___

### isConstruct

▸ **isConstruct**(`x`): x is Construct

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
