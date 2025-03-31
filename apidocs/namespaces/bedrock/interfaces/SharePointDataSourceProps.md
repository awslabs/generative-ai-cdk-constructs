[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / SharePointDataSourceProps

# Interface: SharePointDataSourceProps

Interface to create a new standalone data source object

## Extends

- [`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md)

## Properties

### authSecret

> `readonly` **authSecret**: `ISecret`

The AWS Secrets Manager secret that stores your authentication credentials
for your Sharepoint instance URL. Secret must start with "AmazonBedrock-".

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`authSecret`](SharePointDataSourceAssociationProps.md#authsecret)

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

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`chunkingStrategy`](SharePointDataSourceAssociationProps.md#chunkingstrategy)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`customTransformation`](SharePointDataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`dataDeletionPolicy`](SharePointDataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`dataSourceName`](SharePointDataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`description`](SharePointDataSourceAssociationProps.md#description)

***

### domain

> `readonly` **domain**: `string`

The domain of your SharePoint instance or site URL/URLs.

#### Example

```ts
"yourdomain"
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`domain`](SharePointDataSourceAssociationProps.md#domain)

***

### filters?

> `readonly` `optional` **filters**: [`SharePointCrawlingFilters`](SharePointCrawlingFilters.md)[]

The filters (regular expression patterns) for the crawling.
If there's a conflict, the exclude pattern takes precedence.

#### Default

```ts
None - all your content is crawled.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`filters`](SharePointDataSourceAssociationProps.md#filters)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`kmsKey`](SharePointDataSourceAssociationProps.md#kmskey)

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

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`parsingStrategy`](SharePointDataSourceAssociationProps.md#parsingstrategy)

***

### siteUrls

> `readonly` **siteUrls**: `string`[]

The SharePoint site URL/URLs.
Must start with “https”. All URLs must start with same protocol.

#### Example

```ts
["https://yourdomain.sharepoint.com/sites/mysite"]
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`siteUrls`](SharePointDataSourceAssociationProps.md#siteurls)

***

### tenantId

> `readonly` **tenantId**: `string`

The identifier of your Microsoft 365 tenant.

#### Example

```ts
"d1c035a6-1dcf-457d-97e3"
```

#### Inherited from

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md).[`tenantId`](SharePointDataSourceAssociationProps.md#tenantid)
