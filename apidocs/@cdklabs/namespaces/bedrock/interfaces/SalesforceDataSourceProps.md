[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / SalesforceDataSourceProps

# Interface: SalesforceDataSourceProps

Interface to create a new standalone data source object.

## Extends

- [`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md)

## Properties

### authSecret

> `readonly` **authSecret**: `ISecret`

The AWS Secrets Manager secret that stores your authentication credentials
for your Salesforce instance URL. Secret must start with "AmazonBedrock-".

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`authSecret`](SalesforceDataSourceAssociationProps.md#authsecret)

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

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`chunkingStrategy`](SalesforceDataSourceAssociationProps.md#chunkingstrategy)

***

### contextEnrichment?

> `readonly` `optional` **contextEnrichment**: [`ContextEnrichment`](../classes/ContextEnrichment.md)

The context enrichment configuration to use.

#### Default

```ts
- No context enrichment is used.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`contextEnrichment`](SalesforceDataSourceAssociationProps.md#contextenrichment)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`customTransformation`](SalesforceDataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`dataDeletionPolicy`](SalesforceDataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`dataSourceName`](SalesforceDataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`description`](SalesforceDataSourceAssociationProps.md#description)

***

### endpoint

> `readonly` **endpoint**: `string`

The Salesforce host URL or instance URL.

#### Example

```ts
"https://company.salesforce.com/"
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`endpoint`](SalesforceDataSourceAssociationProps.md#endpoint)

***

### filters?

> `readonly` `optional` **filters**: [`SalesforceCrawlingFilters`](SalesforceCrawlingFilters.md)[]

The filters (regular expression patterns) for the crawling.
If there's a conflict, the exclude pattern takes precedence.

#### Default

```ts
None - all your content is crawled.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`filters`](SalesforceDataSourceAssociationProps.md#filters)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`kmsKey`](SalesforceDataSourceAssociationProps.md#kmskey)

***

### knowledgeBase

> `readonly` **knowledgeBase**: [`IKnowledgeBase`](IKnowledgeBase.md)

The knowledge base to associate with the data source.

***

### parsingStrategy?

> `readonly` `optional` **parsingStrategy**: [`ParsingStrategy`](../classes/ParsingStrategy.md)

The parsing strategy to use.

#### Default

```ts
- No Parsing Stategy is used.
```

#### Inherited from

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md).[`parsingStrategy`](SalesforceDataSourceAssociationProps.md#parsingstrategy)
