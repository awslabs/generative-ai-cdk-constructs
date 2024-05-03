[@cdklabs/generative-ai-cdk-constructs](../README.md) / CrawlerWebSite

# Interface: CrawlerWebSite

## Table of contents

### Properties

- [downloadFiles](CrawlerWebSite.md#downloadfiles)
- [fileTypes](CrawlerWebSite.md#filetypes)
- [ignoreRobotsTxt](CrawlerWebSite.md#ignorerobotstxt)
- [maxFiles](CrawlerWebSite.md#maxfiles)
- [maxRequests](CrawlerWebSite.md#maxrequests)
- [scheduleEveryNDays](CrawlerWebSite.md#scheduleeveryndays)
- [url](CrawlerWebSite.md#url)

## Properties

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

File types to be downloaded.

**`Default`**

```ts
- all file types
```

___

### ignoreRobotsTxt

• `Optional` `Readonly` **ignoreRobotsTxt**: `boolean`

Ignore robots.txt file.

**`Default`**

```ts
- false
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

Maximum number of requests to be made.

**`Default`**

```ts
- crawler limit
```

___

### scheduleEveryNDays

• `Optional` `Readonly` **scheduleEveryNDays**: `number`

Schedule the crawler to run every N days.

**`Default`**

```ts
- not scheduled
```

___

### url

• `Readonly` **url**: `string`

Web site URL to be crawled.
