[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [amazonaurora](../README.md) / BaseAuroraVectorStoreProps

# Interface: BaseAuroraVectorStoreProps

Base properties for an Aurora Vector Store.

## Extended by

- [`AmazonAuroraVectorStoreProps`](AmazonAuroraVectorStoreProps.md)
- [`ExistingAmazonAuroraVectorStoreProps`](ExistingAmazonAuroraVectorStoreProps.md)

## Properties

### embeddingsModelVectorDimension

> `readonly` **embeddingsModelVectorDimension**: `number`

The embeddings model dimension used for the Aurora Vector Store.
The vector dimensions of the model must match the dimensions
used in the KnowledgeBase construct.

***

### metadataField?

> `readonly` `optional` **metadataField**: `string`

The field name for the metadata column in the Aurora Vector Store.

***

### primaryKeyField?

> `readonly` `optional` **primaryKeyField**: `string`

The primary key field for the Aurora Vector Store table.

***

### schemaName?

> `readonly` `optional` **schemaName**: `string`

The schema name for the Aurora Vector Store.

***

### tableName?

> `readonly` `optional` **tableName**: `string`

The name of the table for the Aurora Vector Store.

***

### textField?

> `readonly` `optional` **textField**: `string`

The field name for the text column in the Aurora Vector Store.

***

### vectorField?

> `readonly` `optional` **vectorField**: `string`

The field name for the vector column in the Aurora Vector Store.
