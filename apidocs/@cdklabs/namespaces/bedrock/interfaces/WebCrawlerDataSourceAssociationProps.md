[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / WebCrawlerDataSourceAssociationProps

# Interface: WebCrawlerDataSourceAssociationProps

Interface to add a new data source to an existing KB.

## Extends

- [`DataSourceAssociationProps`](DataSourceAssociationProps.md)

## Extended by

- [`WebCrawlerDataSourceProps`](WebCrawlerDataSourceProps.md)

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

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`chunkingStrategy`](DataSourceAssociationProps.md#chunkingstrategy)

***

### contextEnrichment?

> `readonly` `optional` **contextEnrichment**: [`ContextEnrichment`](../classes/ContextEnrichment.md)

The context enrichment configuration to use.

#### Default

```ts
- No context enrichment is used.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`contextEnrichment`](DataSourceAssociationProps.md#contextenrichment)

***

### crawlingRate?

> `readonly` `optional` **crawlingRate**: `number`

The max rate at which pages are crawled, up to 300 per minute per host.
Higher values will decrease sync time but increase the load on the host.

#### Default

```ts
300
```

***

### crawlingScope?

> `readonly` `optional` **crawlingScope**: [`CrawlingScope`](../enumerations/CrawlingScope.md)

The scope of the crawling.

#### Default

```ts
- CrawlingScope.DEFAULT
```

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`customTransformation`](DataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`dataDeletionPolicy`](DataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`dataSourceName`](DataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`description`](DataSourceAssociationProps.md#description)

***

### filters?

> `readonly` `optional` **filters**: [`CrawlingFilters`](CrawlingFilters.md)

The filters (regular expression patterns) for the crawling.
If there's a conflict, the exclude pattern takes precedence.

#### Default

```ts
None
```

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`kmsKey`](DataSourceAssociationProps.md#kmskey)

***

### maxPages?

> `readonly` `optional` **maxPages**: `number`

The maximum number of pages to crawl. The max number of web pages crawled from your source URLs,
up to 25,000 pages. If the web pages exceed this limit, the data source sync will fail and
no web pages will be ingested.

#### Default

```ts
- No limit
```

***

### parsingStrategy?

> `readonly` `optional` **parsingStrategy**: [`ParsingStategy`](../classes/ParsingStategy.md)

The parsing strategy to use.

#### Default

```ts
- No Parsing Stategy is used.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`parsingStrategy`](DataSourceAssociationProps.md#parsingstrategy)

***

### sourceUrls

> `readonly` **sourceUrls**: `string`[]

The source urls in the format `https://www.sitename.com`.
Maximum of 100 URLs.

***

### userAgent?

> `readonly` `optional` **userAgent**: `string`

The user agent string to use when crawling.

#### Default

```ts
- Default user agent string
```

***

### userAgentHeader?

> `readonly` `optional` **userAgentHeader**: `string`

The user agent header to use when crawling. A string used for identifying 
the crawler or bot when it accesses a web server. The user agent header value 
consists of the bedrockbot, UUID, and a user agent suffix for your crawler (if one is provided). 
By default, it is set to bedrockbot_UUID. You can optionally append a custom suffix to bedrockbot_UUID 
to allowlist a specific user agent permitted to access your source URLs.

#### Default

```ts
- Default user agent header (bedrockbot_UUID)
```
