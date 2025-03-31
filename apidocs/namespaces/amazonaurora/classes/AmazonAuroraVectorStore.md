[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [amazonaurora](../README.md) / AmazonAuroraVectorStore

# Class: AmazonAuroraVectorStore

## Extends

- `BaseAmazonAuroraVectorStore`

## Constructors

### new AmazonAuroraVectorStore()

> **new AmazonAuroraVectorStore**(`scope`, `id`, `props`): [`AmazonAuroraVectorStore`](AmazonAuroraVectorStore.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`AmazonAuroraVectorStoreProps`](../interfaces/AmazonAuroraVectorStoreProps.md)

#### Returns

[`AmazonAuroraVectorStore`](AmazonAuroraVectorStore.md)

#### Overrides

`BaseAmazonAuroraVectorStore.constructor`

## Properties

### credentialsSecretArn

> `readonly` **credentialsSecretArn**: `string`

The Secret ARN of your Amazon Aurora DB cluster.

***

### databaseName

> `readonly` **databaseName**: `string`

The name of the database for the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.databaseName`

***

### embeddingsModelVectorDimension

> `readonly` **embeddingsModelVectorDimension**: `number`

The embeddings model dimension used for the Aurora Vector Store.
The vector dimensions of the model must match the dimensions
used in the KnowledgeBase construct.

#### Inherited from

`BaseAmazonAuroraVectorStore.embeddingsModelVectorDimension`

***

### metadataField

> `readonly` **metadataField**: `string`

The field name for the metadata column in the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.metadataField`

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`BaseAmazonAuroraVectorStore.node`

***

### primaryKeyField

> `readonly` **primaryKeyField**: `string`

The primary key field for the Aurora Vector Store table.

#### Inherited from

`BaseAmazonAuroraVectorStore.primaryKeyField`

***

### resourceArn

> `readonly` **resourceArn**: `string`

The ARN of your Amazon Aurora DB cluster.

***

### schemaName

> `readonly` **schemaName**: `string`

The schema name for the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.schemaName`

***

### tableName

> `readonly` **tableName**: `string`

The name of the table for the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.tableName`

***

### textField

> `readonly` **textField**: `string`

The field name for the text column in the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.textField`

***

### vectorField

> `readonly` **vectorField**: `string`

The field name for the vector column in the Aurora Vector Store.

#### Inherited from

`BaseAmazonAuroraVectorStore.vectorField`

***

### vpc

> `readonly` **vpc**: `IVpc`

The VPC of your Amazon Aurora DB cluster.

## Methods

### addIngressRuleToAuroraSecurityGroup()

> `protected` **addIngressRuleToAuroraSecurityGroup**(`lambdaSecurityGroup`, `auroraSecurityGroup`): `void`

#### Parameters

##### lambdaSecurityGroup

`SecurityGroup`

##### auroraSecurityGroup

`SecurityGroup`

#### Returns

`void`

#### Inherited from

`BaseAmazonAuroraVectorStore.addIngressRuleToAuroraSecurityGroup`

***

### createAuroraPgCRPolicy()

> `protected` **createAuroraPgCRPolicy**(`clusterIdentifier`): `ManagedPolicy`

#### Parameters

##### clusterIdentifier

`string`

#### Returns

`ManagedPolicy`

#### Inherited from

`BaseAmazonAuroraVectorStore.createAuroraPgCRPolicy`

***

### createLambdaSecurityGroup()

> `protected` **createLambdaSecurityGroup**(`vpc`): `SecurityGroup`

#### Parameters

##### vpc

`IVpc`

#### Returns

`SecurityGroup`

#### Inherited from

`BaseAmazonAuroraVectorStore.createLambdaSecurityGroup`

***

### generateResourceArn()

> `protected` **generateResourceArn**(`clusterIdentifier`): `string`

#### Parameters

##### clusterIdentifier

`string`

#### Returns

`string`

#### Inherited from

`BaseAmazonAuroraVectorStore.generateResourceArn`

***

### setupCustomResource()

> `protected` **setupCustomResource**(`databaseClusterResources`, `lambdaSecurityGroup`, `auroraPgCRPolicy`): `CustomResource`

#### Parameters

##### databaseClusterResources

[`DatabaseClusterResources`](../interfaces/DatabaseClusterResources.md)

##### lambdaSecurityGroup

`SecurityGroup`

##### auroraPgCRPolicy

`ManagedPolicy`

#### Returns

`CustomResource`

#### Inherited from

`BaseAmazonAuroraVectorStore.setupCustomResource`

***

### setupDatabaseClusterResources()

> `protected` **setupDatabaseClusterResources**(`vpc`, `secret`, `clusterIdentifier`, `auroraSecurityGroupId`): [`DatabaseClusterResources`](../interfaces/DatabaseClusterResources.md)

#### Parameters

##### vpc

`IVpc`

##### secret

`ISecret`

##### clusterIdentifier

`string`

##### auroraSecurityGroupId

`string`

#### Returns

[`DatabaseClusterResources`](../interfaces/DatabaseClusterResources.md)

#### Inherited from

`BaseAmazonAuroraVectorStore.setupDatabaseClusterResources`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`BaseAmazonAuroraVectorStore.toString`

***

### fromExistingAuroraVectorStore()

> `static` **fromExistingAuroraVectorStore**(`scope`, `id`, `props`): [`ExistingAmazonAuroraVectorStore`](ExistingAmazonAuroraVectorStore.md)

Creates an instance of AmazonAuroraVectorStore using existing Aurora Vector Store properties.
You need to provide your existing Aurora Vector Store properties
such as `databaseName`, `clusterIdentifier`, `vpc` where database is deployed,
`secret` containing username and password for authentication to database,
and `auroraSecurityGroupId` with the value of a security group id that was
used for the database.

#### Parameters

##### scope

`Construct`

The scope in which to define the construct.

##### id

`string`

The ID of the construct.

##### props

[`ExistingAmazonAuroraVectorStoreProps`](../interfaces/ExistingAmazonAuroraVectorStoreProps.md)

The properties of the existing Aurora Vector Store.

#### Returns

[`ExistingAmazonAuroraVectorStore`](ExistingAmazonAuroraVectorStore.md)

An instance of AmazonAuroraVectorStore.

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

`BaseAmazonAuroraVectorStore.isConstruct`
