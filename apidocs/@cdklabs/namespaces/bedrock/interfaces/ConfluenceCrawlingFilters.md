[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ConfluenceCrawlingFilters

# Interface: ConfluenceCrawlingFilters

Defines filters for crawling Confluence content.
These filters allow you to include or exclude specific content based on object types and patterns.

- For Spaces: Use the unique space key
- For Pages: Use the main page title
- For Blogs: Use the main blog title
- For Comments: Use "Re: Page/Blog Title"
- For Attachments: Use the filename with extension

## Remarks

- You can specify inclusion and exclusion patterns using regular expressions.
- If both inclusion and exclusion patterns match a document, the exclusion takes precedence.

## Properties

### excludePatterns?

> `readonly` `optional` **excludePatterns**: `string`[]

Regular expression patterns to exclude content.
Content matching these patterns will not be crawled, even if it matches an include pattern.

***

### includePatterns?

> `readonly` `optional` **includePatterns**: `string`[]

Regular expression patterns to include content.
If specified, only content matching these patterns will be crawled.

***

### objectType

> `readonly` **objectType**: [`ConfluenceObjectType`](../enumerations/ConfluenceObjectType.md)

The type of Confluence object to apply the filters to.
