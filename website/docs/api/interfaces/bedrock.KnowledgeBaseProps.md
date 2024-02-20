[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / KnowledgeBaseProps

# Interface: KnowledgeBaseProps

[bedrock](/docs/api/modules/bedrock.md).KnowledgeBaseProps

Properties for a knowledge base

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

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](/docs/api/classes/bedrock.BedrockFoundationModel.md)

The embeddings model for the knowledge base

___

### indexName

• `Optional` `Readonly` **indexName**: `string`

The name of the vector index.

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

### vectorField

• `Optional` `Readonly` **vectorField**: `string`

The name of the field in the vector index.

**`Default`**

```ts
- 'bedrock-knowledge-base-default-vector'
```

___

### vectorIndex

• `Optional` `Readonly` **vectorIndex**: [`VectorIndex`](/docs/api/classes/opensearch_vectorindex.VectorIndex.md)

The vector index for the knowledge base.

**`Default`**

```ts
- A new vector index is created on the Vector Collection
```

___

### vectorStore

• `Optional` `Readonly` **vectorStore**: [`VectorCollection`](/docs/api/classes/opensearchserverless.VectorCollection.md)

The vector store for the knowledge base.

**`Default`**

```ts
- A new OpenSearch Serverless vector collection is created.
```
