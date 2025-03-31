[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / S3DataSourceProps

# Interface: S3DataSourceProps

Interface to create a new S3 Data Source object.

## Extends

- [`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md)

## Properties

### bucket

> `readonly` **bucket**: `IBucket`

The bucket that contains the data source.

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`bucket`](S3DataSourceAssociationProps.md#bucket)

***

### chunkingStrategy?

> `readonly` `optional` **chunkingStrategy**: [`ChunkingStrategy`](../classes/ChunkingStrategy.md)

The chunking stategy to use for splitting your documents or content.
The chunks are then converted to embeddings and written to the vector
index allowing for similarity search and retrieval of the content.

#### Default

```ts
ChunkingStrategy.DEFAULT
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`chunkingStrategy`](S3DataSourceAssociationProps.md#chunkingstrategy)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`customTransformation`](S3DataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`dataDeletionPolicy`](S3DataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`dataSourceName`](S3DataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`description`](S3DataSourceAssociationProps.md#description)

***

### inclusionPrefixes?

> `readonly` `optional` **inclusionPrefixes**: `string`[]

The prefixes of the objects in the bucket that should be included in the data source.

#### Default

```ts
- All objects in the bucket.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`inclusionPrefixes`](S3DataSourceAssociationProps.md#inclusionprefixes)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`kmsKey`](S3DataSourceAssociationProps.md#kmskey)

***

### knowledgeBase

> `readonly` **knowledgeBase**: [`IKnowledgeBase`](IKnowledgeBase.md)

The knowledge base to associate with the data source.

***

### parsingStrategy?

> `readonly` `optional` **parsingStrategy**: [`ParsingStategy`](../classes/ParsingStategy.md)

The parsing strategy to use.

#### Default

```ts
- No Parsing Stategy is used.
```

#### Inherited from

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md).[`parsingStrategy`](S3DataSourceAssociationProps.md#parsingstrategy)
