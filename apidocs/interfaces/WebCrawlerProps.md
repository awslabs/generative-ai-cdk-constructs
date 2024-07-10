[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawlerProps

# Interface: WebCrawlerProps

## Properties

### bucketOutputProps?

> `readonly` `optional` **bucketOutputProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingOutputBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### enableLambdaCrawler?

> `readonly` `optional` **enableLambdaCrawler**: `boolean`

Deploy Lambda crawler.

#### Default

```ts
- false
```

***

### existingOutputBucketObj?

> `readonly` `optional` **existingOutputBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketOutputProps` will cause an error.

#### Default

```ts
- None
```

***

### existingVpc?

> `readonly` `optional` **existingVpc**: `IVpc`

Optional An existing VPC in which to deploy the construct. Providing both this and
vpcProps is an error.

#### Default

```ts
- none
```

***

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

#### Default

```ts
- true
```

***

### stage?

> `readonly` `optional` **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```

***

### targets?

> `readonly` `optional` **targets**: [`CrawlerTarget`](CrawlerTarget.md)[]

Targets to be crawled.

#### Default

```ts
- none
```

***

### vpcProps?

> `readonly` `optional` **vpcProps**: `VpcProps`

Optional custom properties for a VPC the construct will create. This VPC will
be used by the compute resources the construct creates. Providing
both this and existingVpc is an error.

#### Default

```ts
- none
```
