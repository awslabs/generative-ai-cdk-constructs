[@cdklabs/generative-ai-cdk-constructs](../README.md) / [amazonaurora](../modules/amazonaurora.md) / BaseAuroraVectorStoreProps

# Interface: BaseAuroraVectorStoreProps

[amazonaurora](../modules/amazonaurora.md).BaseAuroraVectorStoreProps

Base properties for an Aurora Vector Store.

## Hierarchy

- **`BaseAuroraVectorStoreProps`**

  ↳ [`AmazonAuroraVectorStoreProps`](amazonaurora.AmazonAuroraVectorStoreProps.md)

  ↳ [`ExistingAmazonAuroraVectorStoreProps`](amazonaurora.ExistingAmazonAuroraVectorStoreProps.md)

## Table of contents

### Properties

- [embeddingsModel](amazonaurora.BaseAuroraVectorStoreProps.md#embeddingsmodel)
- [metadataField](amazonaurora.BaseAuroraVectorStoreProps.md#metadatafield)
- [primaryKeyField](amazonaurora.BaseAuroraVectorStoreProps.md#primarykeyfield)
- [schemaName](amazonaurora.BaseAuroraVectorStoreProps.md#schemaname)
- [tableName](amazonaurora.BaseAuroraVectorStoreProps.md#tablename)
- [textField](amazonaurora.BaseAuroraVectorStoreProps.md#textfield)
- [vectorField](amazonaurora.BaseAuroraVectorStoreProps.md#vectorfield)

## Properties

### embeddingsModel

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](../classes/foundation_models.BedrockFoundationModel.md)

The embeddings model used for the Aurora Vector Store.
The vector dimensions of the model must match the dimensions
used in the KnowledgeBase construct.

___

### metadataField

• `Optional` `Readonly` **metadataField**: `string`

The field name for the metadata column in the Aurora Vector Store.

___

### primaryKeyField

• `Optional` `Readonly` **primaryKeyField**: `string`

The primary key field for the Aurora Vector Store table.

___

### schemaName

• `Optional` `Readonly` **schemaName**: `string`

The schema name for the Aurora Vector Store.

___

### tableName

• `Optional` `Readonly` **tableName**: `string`

The name of the table for the Aurora Vector Store.

___

### textField

• `Optional` `Readonly` **textField**: `string`

The field name for the text column in the Aurora Vector Store.

___

### vectorField

• `Optional` `Readonly` **vectorField**: `string`

The field name for the vector column in the Aurora Vector Store.
