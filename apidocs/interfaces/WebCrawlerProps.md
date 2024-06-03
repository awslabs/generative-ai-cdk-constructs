[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawlerProps

# Interface: WebCrawlerProps

## Table of contents

### Properties

- [bucketOutputProps](WebCrawlerProps.md#bucketoutputprops)
- [enableLambdaCrawler](WebCrawlerProps.md#enablelambdacrawler)
- [existingOutputBucketObj](WebCrawlerProps.md#existingoutputbucketobj)
- [existingVpc](WebCrawlerProps.md#existingvpc)
- [observability](WebCrawlerProps.md#observability)
- [stage](WebCrawlerProps.md#stage)
- [targets](WebCrawlerProps.md#targets)
- [vpcProps](WebCrawlerProps.md#vpcprops)

## Properties

### bucketOutputProps

• `Optional` `Readonly` **bucketOutputProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingOutputBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

___

### enableLambdaCrawler

• `Optional` `Readonly` **enableLambdaCrawler**: `boolean`

Deploy Lambda crawler.

**`Default`**

```ts
- false
```

___

### existingOutputBucketObj

• `Optional` `Readonly` **existingOutputBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketOutputProps` will cause an error.

**`Default`**

```ts
- None
```

___

### existingVpc

• `Optional` `Readonly` **existingVpc**: `IVpc`

Optional An existing VPC in which to deploy the construct. Providing both this and
vpcProps is an error.

**`Default`**

```ts
- none
```

___

### observability

• `Optional` `Readonly` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

**`Default`**

```ts
- true
```

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

___

### targets

• `Optional` `Readonly` **targets**: [`CrawlerTarget`](CrawlerTarget.md)[]

Targets to be crawled.

**`Default`**

```ts
- none
```

___

### vpcProps

• `Optional` `Readonly` **vpcProps**: `VpcProps`

Optional custom properties for a VPC the construct will create. This VPC will
be used by the compute resources the construct creates. Providing
both this and existingVpc is an error.

**`Default`**

```ts
- none
```
