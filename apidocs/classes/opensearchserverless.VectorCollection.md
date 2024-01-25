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

### Methods

- [grantDataAccess](opensearchserverless.VectorCollection.md#grantdataaccess)
- [toString](opensearchserverless.VectorCollection.md#tostring)
- [isConstruct](opensearchserverless.VectorCollection.md#isconstruct)

## Constructors

### constructor

• **new VectorCollection**(`scope`, `id`): [`VectorCollection`](opensearchserverless.VectorCollection.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Returns

[`VectorCollection`](opensearchserverless.VectorCollection.md)

#### Overrides

Construct.constructor

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:55](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L55)

## Properties

### aossPolicy

• **aossPolicy**: `ManagedPolicy`

An IAM policy that allows API access to the collection.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:42](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L42)

___

### collectionArn

• **collectionArn**: `string`

The ARN of the collection.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:37](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L37)

___

### collectionId

• **collectionId**: `string`

The ID of the collection.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:33](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L33)

___

### collectionName

• **collectionName**: `string`

The name of the collection.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:28](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L28)

___

### dataAccessPolicy

• **dataAccessPolicy**: `CfnAccessPolicy`

An OpenSearch Access Policy that allows access to the index.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:47](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L47)

___

### dataAccessPolicyDocument

• `Private` **dataAccessPolicyDocument**: `any`[] = `[]`

An OpenSearch Access Policy document that will become `dataAccessPolicy`.

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:53](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L53)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

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

#### Defined in

[src/cdk-lib/opensearchserverless/vector-collection.ts:153](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/opensearchserverless/vector-collection.ts#L153)

___

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
