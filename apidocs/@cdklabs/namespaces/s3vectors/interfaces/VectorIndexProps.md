[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorIndexProps

# Interface: VectorIndexProps

Properties for creating a VectorIndex resource

## Properties

### dataType?

> `readonly` `optional` **dataType**: [`FLOAT_32`](../enumerations/VectorIndexDataType.md#float_32)

The data type of the vectors to be inserted into the vector index

#### Default

```ts
- FLOAT_32
```

***

### dimension

> `readonly` **dimension**: `number`

A dimension is the number of values in a vector. A larger dimension needs more storage.

All vectors added to the index must have exactly this number of values.
Must be an integer between 1 and 4096.

***

### distanceMetric?

> `readonly` `optional` **distanceMetric**: [`VectorIndexDistanceMetric`](../enumerations/VectorIndexDistanceMetric.md)

The distance metric to be used for similarity search

#### Default

```ts
- COSINE
```

***

### encryption?

> `readonly` `optional` **encryption**: [`VectorIndexEncryption`](../enumerations/VectorIndexEncryption.md)

The kind of server-side encryption to apply to this index.

If you choose KMS, you can specify a KMS key via `encryptionKey`. If
encryption key is not specified, a key will automatically be created.

#### Default

- `KMS` if `encryptionKey` is specified, or `S3_MANAGED` otherwise.

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

External KMS key to use for index encryption.

The `encryption` property must be either not specified or set to `KMS`.
An error will be emitted if `encryption` is set to `S3_MANAGED`.

#### Default

- If `encryption` is set to `KMS` and this property is undefined,
a new KMS key will be created and associated with this index.

***

### nonFilterableMetadataKeys?

> `readonly` `optional` **nonFilterableMetadataKeys**: `string`[]

Non-filterable metadata keys allow you to enrich vectors with additional context during storage and retrieval.
Unlike default metadata keys, these keys can't be used as query filters.
Non-filterable metadata keys can be retrieved but can't be searched, queried, or filtered.
You can access non-filterable metadata keys of your vectors after finding the vectors.

#### Default

```ts
- All metadata attached to vectors is filterable and can be used as filters in a similarity query
```

***

### vectorBucket

> `readonly` **vectorBucket**: [`IVectorBucket`](IVectorBucket.md)

The vector bucket to use for the vector index

***

### vectorIndexName?

> `readonly` `optional` **vectorIndexName**: `string`

The name of the vector index

#### Default

```ts
- Assigned by CloudFormation (recommended).
```
