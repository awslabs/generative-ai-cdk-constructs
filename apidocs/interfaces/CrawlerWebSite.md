[@cdklabs/generative-ai-cdk-constructs](../README.md) / CrawlerWebSite

# Interface: CrawlerWebSite

## Table of contents

### Properties

- [downloadFiles](CrawlerWebSite.md#downloadfiles)
- [fileTypes](CrawlerWebSite.md#filetypes)
- [ignoreRobotsTxt](CrawlerWebSite.md#ignorerobotstxt)
- [maxFiles](CrawlerWebSite.md#maxfiles)
- [maxRequests](CrawlerWebSite.md#maxrequests)
- [url](CrawlerWebSite.md#url)

## Properties

### downloadFiles

• `Optional` `Readonly` **downloadFiles**: `number`

Download files from the web site.

**`Default`**

```ts
- false
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

### url

• `Readonly` **url**: `string`

Web site URL to be crawled.
