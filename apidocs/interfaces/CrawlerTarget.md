[@cdklabs/generative-ai-cdk-constructs](../README.md) / CrawlerTarget

# Interface: CrawlerTarget

## Table of contents

### Properties

- [crawlIntervalHours](CrawlerTarget.md#crawlintervalhours)
- [downloadFiles](CrawlerTarget.md#downloadfiles)
- [fileTypes](CrawlerTarget.md#filetypes)
- [maxFiles](CrawlerTarget.md#maxfiles)
- [maxRequests](CrawlerTarget.md#maxrequests)
- [targetType](CrawlerTarget.md#targettype)
- [url](CrawlerTarget.md#url)

## Properties

### crawlIntervalHours

• `Optional` `Readonly` **crawlIntervalHours**: `number`

Schedule the crawler to run every N hours following the completion of the previous job.

**`Default`**

```ts
- not scheduled
```

___

### downloadFiles

• `Optional` `Readonly` **downloadFiles**: `boolean`

Download files from the web site.

**`Default`**

```ts
- true
```

___

### fileTypes

• `Optional` `Readonly` **fileTypes**: `string`[]

File types (extensions) to be downloaded.

**`Default`**

```ts
- all file types
```

___

### maxFiles

• `Optional` `Readonly` **maxFiles**: `number`

Maximum number of files to be downloaded.

**`Default`**

```ts
- crawler limit
```

___

### maxRequests

• `Optional` `Readonly` **maxRequests**: `number`

Maximum number of requests to be made by crawler.

**`Default`**

```ts
- crawler limit
```

___

### targetType

• `Readonly` **targetType**: [`CrawlerTargetType`](../enums/CrawlerTargetType.md)

Type of URL to be crawled.

___

### url

• `Readonly` **url**: `string`

Target URL to be crawled.
