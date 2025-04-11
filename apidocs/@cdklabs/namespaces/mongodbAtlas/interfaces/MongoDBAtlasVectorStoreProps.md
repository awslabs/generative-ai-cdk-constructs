[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [mongodbAtlas](../README.md) / MongoDBAtlasVectorStoreProps

# Interface: MongoDBAtlasVectorStoreProps

Interface for MongoDB Atlas vector store configuration

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

### endpointServiceName

> `readonly` **endpointServiceName**: `string`

The name of the endpoint service

***

### fieldMapping

> `readonly` **fieldMapping**: [`MongoDbAtlasFieldMapping`](MongoDbAtlasFieldMapping.md)

The field mapping for MongoDB Atlas

***

### vectorIndexName

> `readonly` **vectorIndexName**: `string`

The name of the vector index
