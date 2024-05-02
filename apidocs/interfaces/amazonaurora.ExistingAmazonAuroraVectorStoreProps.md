[@cdklabs/generative-ai-cdk-constructs](../README.md) / [amazonaurora](../modules/amazonaurora.md) / ExistingAmazonAuroraVectorStoreProps

# Interface: ExistingAmazonAuroraVectorStoreProps

[amazonaurora](../modules/amazonaurora.md).ExistingAmazonAuroraVectorStoreProps

Properties for an existing Aurora Vector Store.
You database must have TCP/IP port that the
database will use for application connections
set up for `5432`.

## Hierarchy

- [`BaseAuroraVectorStoreProps`](amazonaurora.BaseAuroraVectorStoreProps.md)

  ↳ **`ExistingAmazonAuroraVectorStoreProps`**

## Table of contents

### Properties

- [auroraSecurityGroupId](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#aurorasecuritygroupid)
- [clusterIdentifier](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#clusteridentifier)
- [databaseName](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#databasename)
- [embeddingsModel](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#embeddingsmodel)
- [metadataField](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#metadatafield)
- [primaryKeyField](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#primarykeyfield)
- [schemaName](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#schemaname)
- [secret](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#secret)
- [tableName](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#tablename)
- [textField](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#textfield)
- [vectorField](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#vectorfield)
- [vpc](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md#vpc)

## Properties

### auroraSecurityGroupId

• `Readonly` **auroraSecurityGroupId**: `string`

The id of the security group associated with the RDS Aurora instance.
This security group allows access to the Aurora Vector Store from Lambda's
custom resource running pgVector SQL commands.

___

### clusterIdentifier

• `Readonly` **clusterIdentifier**: `string`

The unique cluster identifier of your Aurora RDS cluster.

___

### databaseName

• `Readonly` **databaseName**: `string`

The name of the database for the Aurora Vector Store.

___

### embeddingsModel

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](../classes/foundation_models.BedrockFoundationModel.md)

The embeddings model used for the Aurora Vector Store.
The vector dimensions of the model must match the dimensions
used in the KnowledgeBase construct.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[embeddingsModel](amazonaurora.BaseAuroraVectorStoreProps.md#embeddingsmodel)

___

### metadataField

• `Optional` `Readonly` **metadataField**: `string`

The field name for the metadata column in the Aurora Vector Store.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[metadataField](amazonaurora.BaseAuroraVectorStoreProps.md#metadatafield)

___

### primaryKeyField

• `Optional` `Readonly` **primaryKeyField**: `string`

The primary key field for the Aurora Vector Store table.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[primaryKeyField](amazonaurora.BaseAuroraVectorStoreProps.md#primarykeyfield)

___

### schemaName

• `Optional` `Readonly` **schemaName**: `string`

The schema name for the Aurora Vector Store.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[schemaName](amazonaurora.BaseAuroraVectorStoreProps.md#schemaname)

___

### secret

• `Readonly` **secret**: `ISecret`

The secret containing the database credentials.
The secret must contain `host`, `port`, `username`,
`password` and `dbname` values.

___

### tableName

• `Optional` `Readonly` **tableName**: `string`

The name of the table for the Aurora Vector Store.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[tableName](amazonaurora.BaseAuroraVectorStoreProps.md#tablename)

___

### textField

• `Optional` `Readonly` **textField**: `string`

The field name for the text column in the Aurora Vector Store.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[textField](amazonaurora.BaseAuroraVectorStoreProps.md#textfield)

___

### vectorField

• `Optional` `Readonly` **vectorField**: `string`

The field name for the vector column in the Aurora Vector Store.

#### Inherited from

[BaseAuroraVectorStoreProps](amazonaurora.BaseAuroraVectorStoreProps.md).[vectorField](amazonaurora.BaseAuroraVectorStoreProps.md#vectorfield)

___

### vpc

• `Readonly` **vpc**: `IVpc`

The VPC in which the existing Aurora Vector Store is located.
