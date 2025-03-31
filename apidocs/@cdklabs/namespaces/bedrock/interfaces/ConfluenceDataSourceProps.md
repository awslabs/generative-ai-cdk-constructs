[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ConfluenceDataSourceProps

# Interface: ConfluenceDataSourceProps

Interface to create a new standalone data source object.

## Extends

- [`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md)

## Properties

### authSecret

> `readonly` **authSecret**: `ISecret`

The AWS Secrets Manager secret that stores your authentication credentials
for your Confluence instance URL. Secret must start with "AmazonBedrock-".

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`authSecret`](ConfluenceDataSourceAssociationProps.md#authsecret)

***

### authType?

> `readonly` `optional` **authType**: [`ConfluenceDataSourceAuthType`](../enumerations/ConfluenceDataSourceAuthType.md)

The supported authentication method to connect to the data source.

#### Default

```ts
ConfluenceDataSourceAuthType.OAUTH2_CLIENT_CREDENTIALS
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`authType`](ConfluenceDataSourceAssociationProps.md#authtype)

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

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`chunkingStrategy`](ConfluenceDataSourceAssociationProps.md#chunkingstrategy)

***

### confluenceUrl

> `readonly` **confluenceUrl**: `string`

The Confluence host URL or instance URL.

#### Example

```ts
https://example.atlassian.net
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`confluenceUrl`](ConfluenceDataSourceAssociationProps.md#confluenceurl)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`customTransformation`](ConfluenceDataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`dataDeletionPolicy`](ConfluenceDataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`dataSourceName`](ConfluenceDataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`description`](ConfluenceDataSourceAssociationProps.md#description)

***

### filters?

> `readonly` `optional` **filters**: [`ConfluenceCrawlingFilters`](ConfluenceCrawlingFilters.md)[]

The filters (regular expression patterns) for the crawling.
If there's a conflict, the exclude pattern takes precedence.

#### Default

```ts
None - all your content is crawled.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`filters`](ConfluenceDataSourceAssociationProps.md#filters)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`kmsKey`](ConfluenceDataSourceAssociationProps.md#kmskey)

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

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md).[`parsingStrategy`](ConfluenceDataSourceAssociationProps.md#parsingstrategy)
