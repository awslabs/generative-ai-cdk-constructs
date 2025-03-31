[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / SalesforceCrawlingFilters

# Interface: SalesforceCrawlingFilters

Defines the crawling filters for Salesforce data ingestion.

## Properties

### excludePatterns?

> `readonly` `optional` **excludePatterns**: `string`[]

Regular expression patterns to exclude specific content.

***

### includePatterns?

> `readonly` `optional` **includePatterns**: `string`[]

Regular expression patterns to include specific content.

***

### objectType

> `readonly` **objectType**: [`SalesforceObjectType`](../enumerations/SalesforceObjectType.md)

The Salesforce object type to which this filter applies.
