[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [opensearchserverless](../README.md) / VectorCollection

# Class: VectorCollection

Deploys an OpenSearch Serverless Collection to be used as a vector store.

It includes all policies.

## Extends

- `Construct`

## Constructors

### new VectorCollection()

> **new VectorCollection**(`scope`, `id`, `props`?): [`VectorCollection`](VectorCollection.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props?

[`VectorCollectionProps`](../interfaces/VectorCollectionProps.md)

#### Returns

[`VectorCollection`](VectorCollection.md)

#### Overrides

`Construct.constructor`

## Properties

### aossPolicy

> **aossPolicy**: `ManagedPolicy`

An IAM policy that allows API access to the collection.

***

### collectionArn

> **collectionArn**: `string`

The ARN of the collection.

***

### collectionId

> **collectionId**: `string`

The ID of the collection.

***

### collectionName

> **collectionName**: `string`

The name of the collection.

***

### dataAccessPolicy

> **dataAccessPolicy**: `CfnAccessPolicy`

An OpenSearch Access Policy that allows access to the index.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### standbyReplicas

> **standbyReplicas**: [`VectorCollectionStandbyReplicas`](../enumerations/VectorCollectionStandbyReplicas.md)

Indicates whether to use standby replicas for the collection.

## Methods

### grantDataAccess()

> **grantDataAccess**(`grantee`): `void`

Grants the specified role access to data in the collection.

#### Parameters

##### grantee

`IRole`

The role to grant access to.

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
