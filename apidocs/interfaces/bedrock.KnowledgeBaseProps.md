[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / KnowledgeBaseProps

# Interface: KnowledgeBaseProps

[bedrock](../modules/bedrock.md).KnowledgeBaseProps

Properties for a knowledge base

## Table of contents

### Properties

- [description](bedrock.KnowledgeBaseProps.md#description)
- [embeddingsModel](bedrock.KnowledgeBaseProps.md#embeddingsmodel)
- [indexName](bedrock.KnowledgeBaseProps.md#indexname)
- [instruction](bedrock.KnowledgeBaseProps.md#instruction)
- [knowledgeBaseState](bedrock.KnowledgeBaseProps.md#knowledgebasestate)
- [tags](bedrock.KnowledgeBaseProps.md#tags)
- [vectorField](bedrock.KnowledgeBaseProps.md#vectorfield)
- [vectorIndex](bedrock.KnowledgeBaseProps.md#vectorindex)
- [vectorStore](bedrock.KnowledgeBaseProps.md#vectorstore)

## Properties

### description

• `Optional` `Readonly` **description**: `string`

The description of the knowledge base.

**`Default`**

```ts
- No description provided.
```

___

### embeddingsModel

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](../classes/foundation_models.BedrockFoundationModel.md)

The embeddings model for the knowledge base

___

### indexName

• `Optional` `Readonly` **indexName**: `string`

The name of the vector index.
If vectorStore is not of type `VectorCollection`,
do not include this property as it will throw error.

**`Default`**

```ts
- 'bedrock-knowledge-base-default-index'
```

___

### instruction

• `Optional` `Readonly` **instruction**: `string`

A narrative description of the knowledge base.

A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

**`Default`**

```ts
- No description provided.
```

___

### knowledgeBaseState

• `Optional` `Readonly` **knowledgeBaseState**: `string`

Specifies whether to use the knowledge base or not when sending an InvokeAgent request.

___

### tags

• `Optional` `Readonly` **tags**: `Record`\<`string`, `string`\>

OPTIONAL: Tag (KEY-VALUE) bedrock agent resource

**`Default`**

```ts
- false
```

___

### vectorField

• `Optional` `Readonly` **vectorField**: `string`

The name of the field in the vector index.
If vectorStore is not of type `VectorCollection`,
do not include this property as it will throw error.

**`Default`**

```ts
- 'bedrock-knowledge-base-default-vector'
```

___

### vectorIndex

• `Optional` `Readonly` **vectorIndex**: [`VectorIndex`](../classes/opensearch_vectorindex.VectorIndex.md)

The vector index for the OpenSearch Serverless backed knowledge base.
If vectorStore is not of type `VectorCollection`, do not include
this property as it will throw error.

**`Default`**

- A new vector index is created on the Vector Collection
if vector store is of `VectorCollection` type.

___

### vectorStore

• `Optional` `Readonly` **vectorStore**: [`AmazonAuroraVectorStore`](../classes/amazonaurora.AmazonAuroraVectorStore.md) \| [`VectorCollection`](../classes/opensearchserverless.VectorCollection.md) \| [`PineconeVectorStore`](../classes/pinecone.PineconeVectorStore.md)

The vector store for the knowledge base. Must be either of
type `VectorCollection`, `RedisEnterpriseVectorStore`,
`PineconeVectorStore` or `AmazonAuroraVectorStore`.

**`Default`**

```ts
- A new OpenSearch Serverless vector collection is created.
```
