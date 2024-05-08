[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawlerProps

# Interface: WebCrawlerProps

## Table of contents

### Properties

- [enableOperationalMetric](WebCrawlerProps.md#enableoperationalmetric)
- [existingVpc](WebCrawlerProps.md#existingvpc)
- [observability](WebCrawlerProps.md#observability)
- [stage](WebCrawlerProps.md#stage)
- [targets](WebCrawlerProps.md#targets)

## Properties

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

### existingVpc

• `Optional` `Readonly` **existingVpc**: `IVpc`

An existing VPC can be used to deploy the construct.

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
