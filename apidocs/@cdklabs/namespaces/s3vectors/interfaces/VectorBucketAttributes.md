[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorBucketAttributes

# Interface: VectorBucketAttributes

Attributes for specifying an imported S3 vector bucket.

## Properties

### account?

> `readonly` `optional` **account**: `string`

The account this existing bucket belongs to.

#### Default

```ts
- it's assumed the bucket belongs to the same account as the scope it's being imported into
```

***

### creationTime?

> `readonly` `optional` **creationTime**: `string`

The timestamp when the cluster was created, in ISO 8601 format.

#### Default

```ts
undefined - No creation time is provided
```

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

The encryption key associated with this bucket

#### Default

```ts
- No encryption key
```

***

### region?

> `readonly` `optional` **region**: `string`

The region this existing bucket is in.
Features that require the region (e.g. `bucketWebsiteUrl`) won't fully work
if the region cannot be correctly inferred.

#### Default

```ts
- it's assumed the bucket is in the same region as the scope it's being imported into
```

***

### vectorBucketArn

> `readonly` **vectorBucketArn**: `string`

The ARN of the vector bucket
