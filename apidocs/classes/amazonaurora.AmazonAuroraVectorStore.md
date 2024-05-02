[@cdklabs/generative-ai-cdk-constructs](../README.md) / [amazonaurora](../modules/amazonaurora.md) / AmazonAuroraVectorStore

# Class: AmazonAuroraVectorStore

[amazonaurora](../modules/amazonaurora.md).AmazonAuroraVectorStore

Creates AmazonAuroraVectorStore.

It includes creation of a VPC with 3 subnets (public,
private with NAT Gateway, private without NAT Gateway),
with the Amazon Aurora Serverless V2 Cluster.
The cluster has 1 writer/reader of PostgreSQL version 15.5
instance (min capacity 0.5, max capacity 4). Lambda custom
resource executes required pgvector and Amazon Bedrock Knowledge
Base SQL queries against Aurora cluster
during deployment. The secret containing databases credentials is
being deployed and securely stored in AWS Secrets Manager.
You must specify the same embeddings model that you used in
KnowledgeBase construct.

**`See`**

https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html)

## Hierarchy

- `Construct`

  ↳ **`AmazonAuroraVectorStore`**

## Table of contents

### Constructors

- [constructor](amazonaurora.AmazonAuroraVectorStore.md#constructor)

### Properties

- [auroraPgCRPolicy](amazonaurora.AmazonAuroraVectorStore.md#aurorapgcrpolicy)
- [credentialsSecretArn](amazonaurora.AmazonAuroraVectorStore.md#credentialssecretarn)
- [databaseName](amazonaurora.AmazonAuroraVectorStore.md#databasename)
- [embeddingsModel](amazonaurora.AmazonAuroraVectorStore.md#embeddingsmodel)
- [metadataField](amazonaurora.AmazonAuroraVectorStore.md#metadatafield)
- [node](amazonaurora.AmazonAuroraVectorStore.md#node)
- [primaryKeyField](amazonaurora.AmazonAuroraVectorStore.md#primarykeyfield)
- [resourceArn](amazonaurora.AmazonAuroraVectorStore.md#resourcearn)
- [schemaName](amazonaurora.AmazonAuroraVectorStore.md#schemaname)
- [tableName](amazonaurora.AmazonAuroraVectorStore.md#tablename)
- [textField](amazonaurora.AmazonAuroraVectorStore.md#textfield)
- [vectorField](amazonaurora.AmazonAuroraVectorStore.md#vectorfield)

### Methods

- [createDatabaseCluster](amazonaurora.AmazonAuroraVectorStore.md#createdatabasecluster)
- [getAuroraPgCRPolicy](amazonaurora.AmazonAuroraVectorStore.md#getaurorapgcrpolicy)
- [toString](amazonaurora.AmazonAuroraVectorStore.md#tostring)
- [fromExistingAuroraVectorStore](amazonaurora.AmazonAuroraVectorStore.md#fromexistingauroravectorstore)
- [isConstruct](amazonaurora.AmazonAuroraVectorStore.md#isconstruct)

## Constructors

### constructor

• **new AmazonAuroraVectorStore**(`scope`, `id`, `props`, `fromExisting?`): [`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `scope` | `Construct` | `undefined` |
| `id` | `string` | `undefined` |
| `props` | [`AmazonAuroraVectorStoreProps`](../interfaces/amazonaurora.AmazonAuroraVectorStoreProps.md) | `undefined` |
| `fromExisting` | `boolean` | `false` |

#### Returns

[`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md)

#### Overrides

Construct.constructor

## Properties

### auroraPgCRPolicy

• `Private` `Readonly` **auroraPgCRPolicy**: `ManagedPolicy`

An IAM policy that allows Data API access to Aurora.

___

### credentialsSecretArn

• `Readonly` **credentialsSecretArn**: `string`

The Secret ARN of your Amazon Aurora DB cluster.

___

### databaseName

• `Readonly` **databaseName**: `string`

The name of your Database.

___

### embeddingsModel

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](foundation_models.BedrockFoundationModel.md)

Model used for embeddings.

___

### metadataField

• `Readonly` **metadataField**: `string`

The name of the field that stores the metadata in your Amazon Aurora DB cluster.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### primaryKeyField

• `Readonly` **primaryKeyField**: `string`

Primary key of your Amazon Aurora DB cluster.

___

### resourceArn

• `Readonly` **resourceArn**: `string`

The ARN of your Amazon Aurora DB cluster.

___

### schemaName

• `Readonly` **schemaName**: `string`

The name of the schema in your Amazon Aurora DB cluster.

___

### tableName

• `Readonly` **tableName**: `string`

The Table Name of your Amazon Aurora DB cluster.

___

### textField

• `Readonly` **textField**: `string`

The name of the field that stores the text data in your Amazon Aurora DB cluster.

___

### vectorField

• `Readonly` **vectorField**: `string`

The name of the field that stores the vector data in your Amazon Aurora DB cluster.

## Methods

### createDatabaseCluster

▸ **createDatabaseCluster**(`postgreSQLVersion`): `DatabaseClusterResources`

Creates an Amazon Aurora Serverless V2 cluster.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `postgreSQLVersion` | `AuroraPostgresEngineVersion` | The version of PostgreSQL to use for the Aurora Vector Store. |

#### Returns

`DatabaseClusterResources`

An object containing the resources required for the database cluster.

___

### getAuroraPgCRPolicy

▸ **getAuroraPgCRPolicy**(`clusterIdentifier`): `ManagedPolicy`

Creates an IAM policy that allows custom resource Lambda to access Aurora.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `clusterIdentifier` | `string` | The unique cluster identifier of the Aurora RDS cluster. |

#### Returns

`ManagedPolicy`

An IAM policy that allows custom resource Lambda to access Aurora.

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

___

### fromExistingAuroraVectorStore

▸ **fromExistingAuroraVectorStore**(`scope`, `id`, `props`): [`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md)

Creates an instance of AmazonAuroraVectorStore using existing Aurora Vector Store properties.
You need to provide your existing Aurora Vector Store properties
such as `databaseName`, `clusterIdentifier`, `vpc` where database is deployed,
`secret` containing username and password for authentication to database,
and `auroraSecurityGroupId` with the value of a security group id that was
used for the database.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The scope in which to define the construct. |
| `id` | `string` | The ID of the construct. |
| `props` | [`ExistingAmazonAuroraVectorStoreProps`](../interfaces/amazonaurora.ExistingAmazonAuroraVectorStoreProps.md) | The properties of the existing Aurora Vector Store. |

#### Returns

[`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md)

An instance of AmazonAuroraVectorStore.

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
