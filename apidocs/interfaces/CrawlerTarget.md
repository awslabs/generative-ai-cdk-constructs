[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / CrawlerTarget

# Interface: CrawlerTarget

## Properties

### crawlIntervalHours?

> `readonly` `optional` **crawlIntervalHours**: `number`

Schedule the crawler to run every N hours following the completion of the previous job.

#### Default

```ts
- not scheduled
```

***

### downloadFiles?

> `readonly` `optional` **downloadFiles**: `boolean`

Download files from the web site.

#### Default

```ts
- true
```

***

### fileTypes?

> `readonly` `optional` **fileTypes**: `string`[]

File types (extensions) to be downloaded.

#### Default

```ts
- all file types
```

***

### maxFiles?

> `readonly` `optional` **maxFiles**: `number`

Maximum number of files to be downloaded.

#### Default

```ts
- crawler limit
```

***

### maxRequests?

> `readonly` `optional` **maxRequests**: `number`

Maximum number of requests to be made by crawler.

#### Default

```ts
- crawler limit
```

***

### targetType

> `readonly` **targetType**: [`CrawlerTargetType`](../enumerations/CrawlerTargetType.md)

Type of URL to be crawled.

***

### url

> `readonly` **url**: `string`

Target URL to be crawled.
