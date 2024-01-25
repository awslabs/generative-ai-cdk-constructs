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

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:67](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L67)

___

### chunkingStrategy

• `Optional` `Readonly` **chunkingStrategy**: [`ChunkingStrategy`](../enums/bedrock.ChunkingStrategy.md)

The chunking strategy to use.

**`Default`**

```ts
ChunkingStrategy.DEFAULT
```

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:79](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L79)

___

### dataSourceName

• `Readonly` **dataSourceName**: `string`

The name of the data source.

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:63](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L63)

___

### inclusionPrefixes

• `Optional` `Readonly` **inclusionPrefixes**: `string`[]

The prefixes of the objects in the bucket that should be included in the data source.

**`Default`**

```ts
- All objects in the bucket.
```

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:73](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L73)

___

### kmsKey

• `Optional` `Readonly` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

**`Default`**

```ts
Amazon Bedrock encrypts your data with a key that AWS owns and manages
```

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:97](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L97)

___

### knowledgeBase

• `Readonly` **knowledgeBase**: [`KnowledgeBase`](../classes/bedrock.KnowledgeBase.md)

The knowledge base that this data source belongs to.

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:59](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L59)

___

### maxTokens

• `Optional` `Readonly` **maxTokens**: `number`

The maximum number of tokens to use in a chunk.

**`Default`**

```ts
300
```

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:85](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L85)

___

### overlapPercentage

• `Optional` `Readonly` **overlapPercentage**: `number`

The percentage of overlap to use in a chunk.

**`Default`**

```ts
20
```

#### Defined in

[src/cdk-lib/bedrock/s3-data-source.ts:91](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/s3-data-source.ts#L91)
