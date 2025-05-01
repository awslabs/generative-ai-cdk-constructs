[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [amazonaurora](../README.md) / ExistingAmazonAuroraVectorStoreProps

# Interface: ExistingAmazonAuroraVectorStoreProps

Properties for an existing Aurora Vector Store.
You database must have TCP/IP port that the
database will use for application connections
set up for `5432`.

## Extends

- [`BaseAuroraVectorStoreProps`](BaseAuroraVectorStoreProps.md)

## Properties

### auroraSecurityGroup

> `readonly` **auroraSecurityGroup**: `ISecurityGroup`

The Security group associated with the RDS Aurora instance.
This security group allows access to the Aurora Vector Store from Lambda's
custom resource running pgVector SQL commands.

***

### clusterIdentifier

> `readonly` **clusterIdentifier**: `string`

The unique cluster identifier of your Aurora RDS cluster.

***

### databaseName

> `readonly` **databaseName**: `string`

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

### secret

> `readonly` **secret**: `ISecret`

The secret containing the database credentials.
The secret must contain `host`, `port`, `username`,
`password` and `dbname` values.

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

### vpc

> `readonly` **vpc**: `IVpc`

The VPC in which the existing Aurora Vector Store is located.
