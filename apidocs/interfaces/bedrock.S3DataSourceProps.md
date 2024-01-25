[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / S3DataSourceProps

# Interface: S3DataSourceProps

[bedrock](../modules/bedrock.md).S3DataSourceProps

Properties for an S3 Data Source.

## Table of contents

### Properties

- [bucket](bedrock.S3DataSourceProps.md#bucket)
- [chunkingStrategy](bedrock.S3DataSourceProps.md#chunkingstrategy)
- [dataSourceName](bedrock.S3DataSourceProps.md#datasourcename)
- [inclusionPrefixes](bedrock.S3DataSourceProps.md#inclusionprefixes)
- [kmsKey](bedrock.S3DataSourceProps.md#kmskey)
- [knowledgeBase](bedrock.S3DataSourceProps.md#knowledgebase)
- [maxTokens](bedrock.S3DataSourceProps.md#maxtokens)
- [overlapPercentage](bedrock.S3DataSourceProps.md#overlappercentage)

## Properties

### bucket

• `Readonly` **bucket**: `IBucket`

The bucket that contains the data source.

___

### chunkingStrategy

• `Optional` `Readonly` **chunkingStrategy**: [`ChunkingStrategy`](../enums/bedrock.ChunkingStrategy.md)

The chunking strategy to use.

**`Default`**

```ts
ChunkingStrategy.DEFAULT
```

___

### dataSourceName

• `Readonly` **dataSourceName**: `string`

The name of the data source.

___

### inclusionPrefixes

• `Optional` `Readonly` **inclusionPrefixes**: `string`[]

The prefixes of the objects in the bucket that should be included in the data source.

**`Default`**

```ts
- All objects in the bucket.
```

___

### kmsKey

• `Optional` `Readonly` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

**`Default`**

```ts
Amazon Bedrock encrypts your data with a key that AWS owns and manages
```

___

### knowledgeBase

• `Readonly` **knowledgeBase**: [`KnowledgeBase`](../classes/bedrock.KnowledgeBase.md)

The knowledge base that this data source belongs to.

___

### maxTokens

• `Optional` `Readonly` **maxTokens**: `number`

The maximum number of tokens to use in a chunk.

**`Default`**

```ts
300
```

___

### overlapPercentage

• `Optional` `Readonly` **overlapPercentage**: `number`

The percentage of overlap to use in a chunk.

**`Default`**

```ts
20
```
