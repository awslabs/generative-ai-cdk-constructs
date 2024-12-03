[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / LlamaIndexDataLoaderProps

# Interface: LlamaIndexDataLoaderProps

## Properties

### containerLoggingLevel?

> `readonly` `optional` **containerLoggingLevel**: `string`

#### Description

the container's logging level

#### Default

```ts
'WARNING'
```

***

### dockerImageAssetDirectory?

> `readonly` `optional` **dockerImageAssetDirectory**: `string`

The directory to build the Docker image

#### Description

The directory to build the Docker image.

#### Default

```ts
__dirname + '/docker'
```

***

### memoryLimitMiB?

> `readonly` `optional` **memoryLimitMiB**: `number`

The default memory

#### Description

The default memory.

#### Default

```ts
2048
```

***

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practive to enable by default.

#### Default

```ts
- true
```

***

### outputBucket?

> `readonly` `optional` **outputBucket**: `Bucket`

#### Description

the S3 output to use

#### Default

```ts
undefined
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

### vpc?

> `readonly` `optional` **vpc**: `IVpc`

#### Description

the VPC to use

#### Default

```ts
undefined
```
