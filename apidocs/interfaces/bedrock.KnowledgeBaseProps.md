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

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:38](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L38)

___

### embeddingsModel

• `Readonly` **embeddingsModel**: [`BedrockFoundationModel`](../classes/bedrock.BedrockFoundationModel.md)

The embeddings model for the knowledge base

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:31](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L31)

___

### indexName

• `Optional` `Readonly` **indexName**: `string`

The name of the vector index.

**`Default`**

```ts
- 'bedrock-knowledge-base-default-index'
```

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:55](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L55)

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

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:48](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L48)

___

### vectorField

• `Optional` `Readonly` **vectorField**: `string`

The name of the field in the vector index.

**`Default`**

```ts
- 'bedrock-knowledge-base-default-vector'
```

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:62](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L62)

___

### vectorIndex

• `Optional` `Readonly` **vectorIndex**: [`VectorIndex`](../classes/opensearch_vectorindex.VectorIndex.md)

The vector index for the knowledge base.

**`Default`**

```ts
- A new vector index is created on the Vector Collection
```

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:76](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L76)

___

### vectorStore

• `Optional` `Readonly` **vectorStore**: [`VectorCollection`](../classes/opensearchserverless.VectorCollection.md)

The vector store for the knowledge base.

**`Default`**

```ts
- A new OpenSearch Serverless vector collection is created.
```

#### Defined in

[src/cdk-lib/bedrock/knowledge-base.ts:69](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/bedrock/knowledge-base.ts#L69)
