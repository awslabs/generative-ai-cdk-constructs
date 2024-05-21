[@cdklabs/generative-ai-cdk-constructs](../README.md) / [opensearchserverless](../modules/opensearchserverless.md) / VectorCollection

# Class: VectorCollection

[opensearchserverless](../modules/opensearchserverless.md).VectorCollection

Deploys an OpenSearch Serverless Collection to be used as a vector store.

It includes all policies.

## Hierarchy

- `Construct`

  ↳ **`VectorCollection`**

## Table of contents

### Constructors

- [constructor](opensearchserverless.VectorCollection.md#constructor)

### Properties

- [aossPolicy](opensearchserverless.VectorCollection.md#aosspolicy)
- [collectionArn](opensearchserverless.VectorCollection.md#collectionarn)
- [collectionId](opensearchserverless.VectorCollection.md#collectionid)
- [collectionName](opensearchserverless.VectorCollection.md#collectionname)
- [dataAccessPolicy](opensearchserverless.VectorCollection.md#dataaccesspolicy)
- [dataAccessPolicyDocument](opensearchserverless.VectorCollection.md#dataaccesspolicydocument)
- [node](opensearchserverless.VectorCollection.md#node)
- [standbyReplicas](opensearchserverless.VectorCollection.md#standbyreplicas)

### Methods

- [grantDataAccess](opensearchserverless.VectorCollection.md#grantdataaccess)
- [toString](opensearchserverless.VectorCollection.md#tostring)
- [isConstruct](opensearchserverless.VectorCollection.md#isconstruct)

## Constructors

### constructor

• **new VectorCollection**(`scope`, `id`, `props?`): [`VectorCollection`](opensearchserverless.VectorCollection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props?` | [`VectorCollectionProps`](../interfaces/opensearchserverless.VectorCollectionProps.md) |

#### Returns

[`VectorCollection`](opensearchserverless.VectorCollection.md)

#### Overrides

Construct.constructor

## Properties

### aossPolicy

• **aossPolicy**: `ManagedPolicy`

An IAM policy that allows API access to the collection.

___

### collectionArn

• **collectionArn**: `string`

The ARN of the collection.

___

### collectionId

• **collectionId**: `string`

The ID of the collection.

___

### collectionName

• **collectionName**: `string`

The name of the collection.

___

### dataAccessPolicy

• **dataAccessPolicy**: `CfnAccessPolicy`

An OpenSearch Access Policy that allows access to the index.

___

### dataAccessPolicyDocument

• `Private` **dataAccessPolicyDocument**: `any`[] = `[]`

An OpenSearch Access Policy document that will become `dataAccessPolicy`.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### standbyReplicas

• **standbyReplicas**: [`VectorCollectionStandbyReplicas`](../enums/opensearchserverless.VectorCollectionStandbyReplicas.md)

Indicates whether to use standby replicas for the collection.

## Methods

### grantDataAccess

▸ **grantDataAccess**(`grantee`): `void`

Grants the specified role access to data in the collection.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `grantee` | `IRole` | The role to grant access to. |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

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
