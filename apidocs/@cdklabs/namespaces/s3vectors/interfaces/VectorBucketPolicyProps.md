[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorBucketPolicyProps

# Interface: VectorBucketPolicyProps

## Properties

### bucket

> `readonly` **bucket**: [`IVectorBucket`](IVectorBucket.md)

The S3 vector bucket that the policy applies to.

***

### document?

> `readonly` `optional` **document**: `PolicyDocument`

Policy document to apply to the bucket.

#### Default

```ts
- A new empty PolicyDocument will be created.
```

***

### removalPolicy?

> `readonly` `optional` **removalPolicy**: `RemovalPolicy`

Policy to apply when the policy is removed from this stack.

#### Default

```ts
- RemovalPolicy.DESTROY.
```
