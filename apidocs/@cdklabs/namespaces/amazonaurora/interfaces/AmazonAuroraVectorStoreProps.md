[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [amazonaurora](../README.md) / AmazonAuroraVectorStoreProps

# Interface: AmazonAuroraVectorStoreProps

Properties for configuring an Amazon Aurora Vector Store.

## Extends

- [`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md)

## Properties

### clusterId?

> `readonly` `optional` **clusterId**: `string`

Cluster identifier.

***

### databaseName?

> `readonly` `optional` **databaseName**: `string`

The name of the database for the Aurora Vector Store.

***

### embeddingsModelVectorDimension

> `readonly` **embeddingsModelVectorDimension**: `number`

The embeddings model dimension used for the Aurora Vector Store.
The vector dimensions of the model must match the dimensions
used in the KnowledgeBase construct.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`embeddingsModelVectorDimension`](BaseAuroraVectorStoreProps.md#embeddingsmodelvectordimension)

***

### metadataField?

> `readonly` `optional` **metadataField**: `string`

The field name for the metadata column in the Aurora Vector Store.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`metadataField`](BaseAuroraVectorStoreProps.md#metadatafield)

***

### postgreSQLVersion?

> `readonly` `optional` **postgreSQLVersion**: `AuroraPostgresEngineVersion`

The version of PostgreSQL to use for the Aurora Vector Store.
By default, the latest supported version will be used.

***

### primaryKeyField?

> `readonly` `optional` **primaryKeyField**: `string`

The primary key field for the Aurora Vector Store table.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`primaryKeyField`](BaseAuroraVectorStoreProps.md#primarykeyfield)

***

### schemaName?

> `readonly` `optional` **schemaName**: `string`

The schema name for the Aurora Vector Store.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`schemaName`](BaseAuroraVectorStoreProps.md#schemaname)

***

### tableName?

> `readonly` `optional` **tableName**: `string`

The name of the table for the Aurora Vector Store.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`tableName`](BaseAuroraVectorStoreProps.md#tablename)

***

### textField?

> `readonly` `optional` **textField**: `string`

The field name for the text column in the Aurora Vector Store.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`textField`](BaseAuroraVectorStoreProps.md#textfield)

***

### vectorField?

> `readonly` `optional` **vectorField**: `string`

The field name for the vector column in the Aurora Vector Store.

#### Inherited from

[`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md).[`vectorField`](BaseAuroraVectorStoreProps.md#vectorfield)

***

### vpc?

> `readonly` `optional` **vpc**: `IVpc`

User's VPC in which they want to deploy Aurora Database.
