[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / VectorKnowledgeBaseProps

# Interface: VectorKnowledgeBaseProps

Properties for a knowledge base

## Extends

- [`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`description`](CommonKnowledgeBaseProps.md#description)

***

### embeddingsModel

> `readonly` **embeddingsModel**: [`BedrockFoundationModel`](../classes/BedrockFoundationModel.md)

The embeddings model for the knowledge base

***

### existingRole?

> `readonly` `optional` **existingRole**: `IRole`

Existing IAM role with policy statements granting appropriate permissions
to invoke the specific embeddings models.
Any entity (e.g., an AWS service or application) that assumes
this role will be able to invoke or use the
specified embeddings model within the Bedrock service.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`existingRole`](CommonKnowledgeBaseProps.md#existingrole)

***

### indexName?

> `readonly` `optional` **indexName**: `string`

The name of the vector index.
If vectorStore is not of type `VectorCollection`,
do not include this property as it will throw error.

#### Default

```ts
- 'bedrock-knowledge-base-default-index'
```

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative description of the knowledge base.

A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`instruction`](CommonKnowledgeBaseProps.md#instruction)

***

### name?

> `readonly` `optional` **name**: `string`

The name of the knowledge base.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`name`](CommonKnowledgeBaseProps.md#name)

***

### supplementalDataStorageLocations?

> `readonly` `optional` **supplementalDataStorageLocations**: [`SupplementalDataStorageLocation`](../classes/SupplementalDataStorageLocation.md)[]

The supplemental data storage locations for the knowledge base

***

### vectorField?

> `readonly` `optional` **vectorField**: `string`

The name of the field in the vector index.
If vectorStore is not of type `VectorCollection`,
do not include this property as it will throw error.

#### Default

```ts
- 'bedrock-knowledge-base-default-vector'
```

***

### vectorIndex?

> `readonly` `optional` **vectorIndex**: [`VectorIndex`](../../opensearch_vectorindex/classes/VectorIndex.md)

The vector index for the OpenSearch Serverless backed knowledge base.
If vectorStore is not of type `VectorCollection`, do not include
this property as it will throw error.

#### Default

- A new vector index is created on the Vector Collection
if vector store is of `VectorCollection` type.

***

### vectorStore?

> `readonly` `optional` **vectorStore**: [`ExistingAmazonAuroraVectorStore`](../../amazonaurora/classes/ExistingAmazonAuroraVectorStore.md) \| [`AmazonAuroraVectorStore`](../../amazonaurora/classes/AmazonAuroraVectorStore.md) \| [`MongoDBAtlasVectorStore`](../../mongodbAtlas/classes/MongoDBAtlasVectorStore.md) \| [`VectorCollection`](../../opensearchserverless/classes/VectorCollection.md) \| [`OpenSearchManagedClusterVectorStore`](../../opensearchmanagedcluster/classes/OpenSearchManagedClusterVectorStore.md) \| [`PineconeVectorStore`](../../pinecone/classes/PineconeVectorStore.md) \| [`VectorIndex`](../../s3vectors/classes/VectorIndex.md)

The vector store for the knowledge base. Must be either of
type `VectorCollection`, `PineconeVectorStore`, `AmazonAuroraVectorStore`,
`MongoDBAtlasVectorStore`, `OpenSearchManagedClusterVectorStore`, or
`VectorIndex` from s3vectors (for S3 Vectors).

#### Default

```ts
- A new OpenSearch Serverless vector collection is created.
```

***

### vectorType?

> `readonly` `optional` **vectorType**: [`VectorType`](../enumerations/VectorType.md)

The vector type to store vector embeddings.

#### Default

```ts
- VectorType.FLOATING_POINT
```
