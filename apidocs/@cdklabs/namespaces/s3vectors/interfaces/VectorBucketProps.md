[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorBucketProps

# Interface: VectorBucketProps

Properties for creating a Aurora DSQL cluster resource

## Properties

### autoDeleteObjects?

> `readonly` `optional` **autoDeleteObjects**: `boolean`

Whether all objects should be automatically deleted when the bucket is
removed from the stack or when the stack is deleted.

Requires the `removalPolicy` to be set to `RemovalPolicy.DESTROY`.

Setting `autoDeleteObjects` to true on a bucket will add `s3:PutBucketPolicy` to the
bucket policy. This is because during bucket deletion, the custom resource provider
needs to update the bucket policy by adding a deny policy for `s3:PutObject` to
prevent race conditions with external bucket writers.

#### Default

```ts
false
```

***

### encryption?

> `readonly` `optional` **encryption**: [`VectorBucketEncryption`](../enumerations/VectorBucketEncryption.md)

The kind of server-side encryption to apply to this bucket.

If you choose KMS, you can specify a KMS key via `encryptionKey`. If
encryption key is not specified, a key will automatically be created.

#### Default

- `KMS` if `encryptionKey` is specified, or `S3_MANAGED` otherwise.

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

External KMS key to use for bucket encryption.

The `encryption` property must be either not specified or set to `KMS`.
An error will be emitted if `encryption` is set to `S3_MANAGED`.

#### Default

- If `encryption` is set to `KMS` and this property is undefined,
a new KMS key will be created and associated with this bucket.

***

### removalPolicy?

> `readonly` `optional` **removalPolicy**: `RemovalPolicy`

Policy to apply when the bucket is removed from this stack.

#### Default

```ts
- - The bucket will be orphaned.
```

***

### vectorBucketName?

> `readonly` `optional` **vectorBucketName**: `string`

Physical name of this bucket.

#### Default

```ts
- Assigned by CloudFormation (recommended).
```
