[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorIndexAttributes

# Interface: VectorIndexAttributes

Attributes for specifying an imported S3 vector bucket.

## Properties

### creationTime?

> `readonly` `optional` **creationTime**: `string`

The timestamp when the vector index was created, in ISO 8601 format.

#### Default

```ts
undefined - No creation time is provided
```

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

Optional KMS encryption key associated with this vector index.

***

### vectorIndexArn

> `readonly` **vectorIndexArn**: `string`

The ARN of the vector index
