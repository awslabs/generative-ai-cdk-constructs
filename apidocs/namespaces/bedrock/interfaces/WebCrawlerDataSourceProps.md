[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / WebCrawlerDataSourceProps

# Interface: WebCrawlerDataSourceProps

Interface to create a new standalone data source object.

## Extends

- [`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md)

## Properties

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

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`chunkingStrategy`](WebCrawlerDataSourceAssociationProps.md#chunkingstrategy)

***

### crawlingRate?

> `readonly` `optional` **crawlingRate**: `number`

The max rate at which pages are crawled, up to 300 per minute per host.
Higher values will decrease sync time but increase the load on the host.

#### Default

```ts
300
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`crawlingRate`](WebCrawlerDataSourceAssociationProps.md#crawlingrate)

***

### crawlingScope?

> `readonly` `optional` **crawlingScope**: [`CrawlingScope`](../enumerations/CrawlingScope.md)

The scope of the crawling.

#### Default

```ts
- CrawlingScope.DEFAULT
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`crawlingScope`](WebCrawlerDataSourceAssociationProps.md#crawlingscope)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`customTransformation`](WebCrawlerDataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`dataDeletionPolicy`](WebCrawlerDataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`dataSourceName`](WebCrawlerDataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`description`](WebCrawlerDataSourceAssociationProps.md#description)

***

### filters?

> `readonly` `optional` **filters**: [`CrawlingFilters`](CrawlingFilters.md)

The filters (regular expression patterns) for the crawling.
If there's a conflict, the exclude pattern takes precedence.

#### Default

```ts
None
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`filters`](WebCrawlerDataSourceAssociationProps.md#filters)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`kmsKey`](WebCrawlerDataSourceAssociationProps.md#kmskey)

***

### knowledgeBase

> `readonly` **knowledgeBase**: [`KnowledgeBase`](../classes/KnowledgeBase.md)

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

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`parsingStrategy`](WebCrawlerDataSourceAssociationProps.md#parsingstrategy)

***

### sourceUrls

> `readonly` **sourceUrls**: `string`[]

The source urls in the format `https://www.sitename.com`.
Maximum of 100 URLs.

#### Inherited from

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md).[`sourceUrls`](WebCrawlerDataSourceAssociationProps.md#sourceurls)
