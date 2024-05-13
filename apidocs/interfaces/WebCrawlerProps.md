[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawlerProps

# Interface: WebCrawlerProps

## Table of contents

### Properties

- [bucketOutputProps](WebCrawlerProps.md#bucketoutputprops)
- [enableOperationalMetric](WebCrawlerProps.md#enableoperationalmetric)
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

### enableOperationalMetric

• `Optional` `Readonly` **enableOperationalMetric**: `boolean`

Optional.CDK constructs provided collects anonymous operational
metrics to help AWS improve the quality and features of the
constructs. Data collection is subject to the AWS Privacy Policy
(https://aws.amazon.com/privacy/). To opt out of this feature,
simply disable it by setting the construct property
"enableOperationalMetric" to false for each construct used.

**`Default`**

```ts
- true
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
