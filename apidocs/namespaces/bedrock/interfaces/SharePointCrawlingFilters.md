[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / SharePointCrawlingFilters

# Interface: SharePointCrawlingFilters

Defines the crawling filters for SharePoint data ingestion. These filters allow
you to specify which content should be included or excluded during the crawling process.
If you specify an inclusion and exclusion filter and both match a document,
the exclusion filter takes precedence and the document isn’t crawled.

## Properties

### excludePatterns?

> `readonly` `optional` **excludePatterns**: `string`[]

Optional array of regular expression patterns to exclude specific content.
Content matching these patterns will be skipped during crawling.

#### Example

```ts
['.*private.*', '.*confidential.*']
```

***

### includePatterns?

> `readonly` `optional` **includePatterns**: `string`[]

Optional array of regular expression patterns to include specific content.
Only content matching these patterns will be crawled.

#### Example

```ts
['.*public.*', '.*shared.*']
```

***

### objectType

> `readonly` **objectType**: [`SharePointObjectType`](../enumerations/SharePointObjectType.md)

The SharePoint object type this filter applies to.
