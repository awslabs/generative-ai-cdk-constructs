[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / S3DataSourceProps

# Interface: S3DataSourceProps

Properties for an S3 Data Source.

## Properties

### bucket

> `readonly` **bucket**: `IBucket`

The bucket that contains the data source.

***

### chunkingStrategy?

> `readonly` `optional` **chunkingStrategy**: [`ChunkingStrategy`](../enumerations/ChunkingStrategy.md)

The chunking strategy to use.

#### Default

```ts
ChunkingStrategy.DEFAULT
```

***

### dataSourceName

> `readonly` **dataSourceName**: `string`

The name of the data source.

***

### inclusionPrefixes?

> `readonly` `optional` **inclusionPrefixes**: `string`[]

The prefixes of the objects in the bucket that should be included in the data source.

#### Default

```ts
- All objects in the bucket.
```

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
Amazon Bedrock encrypts your data with a key that AWS owns and manages
```

***

### knowledgeBase

> `readonly` **knowledgeBase**: [`KnowledgeBase`](../classes/KnowledgeBase.md)

The knowledge base that this data source belongs to.

***

### maxTokens?

> `readonly` `optional` **maxTokens**: `number`

The maximum number of tokens to use in a chunk.

#### Default

```ts
300
```

***

### overlapPercentage?

> `readonly` `optional` **overlapPercentage**: `number`

The percentage of overlap to use in a chunk.

#### Default

```ts
20
```
