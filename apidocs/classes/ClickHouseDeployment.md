[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / ClickHouseDeployment

# Class: ClickHouseDeployment

Construct to deploy ClickHouse OLAP DBMS on ECS Fargate

This is a basic pattern aimed at experimentation, not scaled production usage: Multi-instance
scale out and password rotation are not yet enabled.

For more information on best practices, see: https://clickhouse.com/docs/install

## Extends

- `Construct`

## Constructors

### Constructor

> **new ClickHouseDeployment**(`scope`, `id`, `props`): `ClickHouseDeployment`

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`IClickHouseDeploymentProps`](../interfaces/IClickHouseDeploymentProps.md)

#### Returns

`ClickHouseDeployment`

#### Overrides

`Construct.constructor`

## Properties

### clientSecurityGroup

> `readonly` **clientSecurityGroup**: `SecurityGroup`

***

### fargateService

> `readonly` **fargateService**: `FargateService`

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### nodeSecurityGroup

> `readonly` **nodeSecurityGroup**: `SecurityGroup`

***

### secret

> `readonly` **secret**: `Secret`

## Accessors

### migrationUrl

#### Get Signature

> **get** **migrationUrl**(): `string`

##### Returns

`string`

***

### url

#### Get Signature

> **get** **url**(): `string`

##### Returns

`string`

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
