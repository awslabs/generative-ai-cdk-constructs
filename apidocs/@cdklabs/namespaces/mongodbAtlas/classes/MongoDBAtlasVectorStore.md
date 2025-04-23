[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [mongodbAtlas](../README.md) / MongoDBAtlasVectorStore

# Class: MongoDBAtlasVectorStore

Construct for MongoDB Atlas vector store

## Constructors

### Constructor

> **new MongoDBAtlasVectorStore**(`props`): `MongoDBAtlasVectorStore`

Creates a new instance of the MongoDBAtlas class

#### Parameters

##### props

[`MongoDBAtlasVectorStoreProps`](../interfaces/MongoDBAtlasVectorStoreProps.md)

The properties for the MongoDB Atlas vector store

#### Returns

`MongoDBAtlasVectorStore`

## Properties

### collectionName

> `readonly` **collectionName**: `string`

The name of the collection

***

### credentialsSecretArn

> `readonly` **credentialsSecretArn**: `string`

The ARN of the secret containing MongoDB Atlas credentials

***

### databaseName

> `readonly` **databaseName**: `string`

The name of the database

***

### endpoint

> `readonly` **endpoint**: `string`

The endpoint URL for MongoDB Atlas

***

### endpointServiceName?

> `readonly` `optional` **endpointServiceName**: `string`

The name of the endpoint service

***

### fieldMapping

> `readonly` **fieldMapping**: [`MongoDbAtlasFieldMapping`](../interfaces/MongoDbAtlasFieldMapping.md)

The field mapping for MongoDB Atlas

***

### textIndexName?

> `readonly` `optional` **textIndexName**: `string`

The name of the text index

***

### vectorIndexName

> `readonly` **vectorIndexName**: `string`

The name of the vector index
