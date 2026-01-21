# S3 Vectors

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

| **Language**                                                                                   | **Package**                                                                                            |
| :---------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs`                                                               |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`                                                                |
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                     | `CdkLabs.GenerativeAICdkConstructs`                                                                    |
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                             | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`                      |

Amazon S3 Vectors delivers purpose-built, cost-optimized vector storage for your semantic search and AI applications. With Amazon S3 level elasticity and durability for storing vector datasets with sub-second query performance, S3 Vectors is ideal for applications that need to build and grow vector indexes. You get a dedicated set of API operations to store, access, and perform similarity queries on vector data without provisioning any infrastructure. S3 Vectors consists of several key components that work together:

- **Vector buckets** – A new bucket type that's purpose-built to store and query vectors.

- **Vector indexes** – Within a vector bucket, you can organize your vector data within vector indexes. You perform similarity queries on your vector data within vector indexes.

- **Vectors** – You store vectors in your vector index. For similarity search and AI applications, vectors are created as vector embeddings which are numerical representations that preserve semantic relationships between content (such as text, images, or audio) so similar items are positioned closer together. S3 Vectors can perform similarity searches based on semantic meaning rather than exact matching through comparing how close vectors are to each other mathematically. When adding vector data to a vector index, you can also attach metadata for future filtering queries based on a set of conditions (for example, timestamps, categories, and user preferences).

This construct library provides L2 constructs to manage S3 vectors resources.

## Table of contents

- [Vector Bucket](#vector-bucket)
- [Vector Index](#vector-index)
- [Vector Bucket Policy](#vector-bucket-policy)

## Vector bucket

Vector buckets are a type of Amazon S3 bucket designed specifically for storing and querying vector data. Vector buckets use dedicated APIs to manage vector data efficiently and reduce costs of upload, storing, and querying vector embeddings. Vector buckets provide the foundation for organizing your vector data into indexes, enabling you to perform similarity searches across large datasets while benefiting from the availability, durability, scalability, and cost-effectiveness of Amazon S3.

Vector buckets are optimized for long-term vector storage with sub-second search times. You can perform similarity queries on your vector data and optionally attach metadata to filter queries based on specific conditions such as dates, categories, or user preferences.

All data stored in vector buckets are always encrypted at rest. By default, vector buckets use SSE-S3 to encrypt vector data. You can choose to configure buckets to use server-side encryption with AWS Key Management Service (AWS KMS) keys (SSE-KMS) instead. The bucket encryption settings can't be changed after a vector bucket is created, so it's important to choose the appropriate encryption method based on your security requirements and compliance needs.

### Creating a vector bucket

Create a vector bucket with default settings:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
```

Create a vector bucket with a custom name:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket', {
  vectorBucketName: 'my-custom-bucket-name',
});
```

### Encryption

You can configure the encryption type for your vector bucket. By default, vector buckets use SSE-S3 (server-side encryption with Amazon S3 managed keys). You can choose to use SSE-KMS (server-side encryption with AWS KMS keys) for enhanced control and auditability.

#### SSE-S3 for buckets

SSE-S3 provides a simple and effective encryption solution where AWS manages all aspects of the encryption process:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket', {
  encryption: genaicdk.s3vectors.VectorBucketEncryption.S3_MANAGED,
});
```

#### SSE-KMS for buckets

SSE-KMS provides enhanced control over encryption keys and enables detailed audit logging of key usage. When you use KMS encryption, the construct automatically grants the S3 Vectors service principal (`indexing.s3vectors.amazonaws.com`) the necessary permissions to use the key for background operations.

**Using an auto-created KMS key:**

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket', {
  encryption: genaicdk.s3vectors.VectorBucketEncryption.KMS,
});
```

**Using your own KMS key:**

```ts fixture=default-bedrock
const myKmsKey = new kms.Key(this, 'MyKey', {
  description: 'KMS key for S3 Vectors bucket',
  enableKeyRotation: true,
});

const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket', {
  encryption: genaicdk.s3vectors.VectorBucketEncryption.KMS,
  encryptionKey: myKmsKey,
});
```

**Important:** When using KMS encryption with customer-managed keys, the construct automatically grants the S3 Vectors service principal (`indexing.s3vectors.amazonaws.com`) the `kms:Decrypt` permission on your KMS key. This is required for the service to maintain and optimize indexes in background operations. The key policy includes appropriate conditions to ensure the service can only access keys for resources in your account.

For more information about KMS key requirements and service principal permissions, see [Data protection and encryption in S3 Vectors](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-data-encryption.html).

### Bucket permissions

#### Resource-based policies

A bucket policy will be automatically created for the bucket upon the first call to `addToResourcePolicy()`:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const result = vectorBucket.addToResourcePolicy(
  new iam.PolicyStatement({
    actions: ['s3vectors:GetVectorBucket', 's3vectors:ListIndexes'],
    resources: [vectorBucket.vectorBucketArn],
    principals: [new iam.AccountRootPrincipal()],
  })
);
```

The bucket policy can be directly accessed after creation to add statements or adjust the removal policy:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
vectorBucket.policy?.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);
```

#### Grant methods

Most of the time, you won't have to manipulate the bucket policy directly. Instead, buckets have "grant" methods that give prepackaged sets of permissions to other resources.

**Grant read permissions:**

```ts fixture=default-bedrock
declare const myLambda: lambda.Function;

const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
// Grant read access to all indexes
vectorBucket.grantRead(myLambda);

// Grant read access to specific indexes
vectorBucket.grantRead(myLambda, ['index-1', 'index-2']);
```

**Grant write permissions:**

```ts fixture=default-bedrock
declare const myLambda: lambda.Function;
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');

// Grant write access to all indexes
vectorBucket.grantWrite(myLambda);

// Grant write access to specific indexes
vectorBucket.grantWrite(myLambda, ['index-1', 'index-2']);
```

**Grant delete permissions:**

```ts fixture=default-bedrock
declare const myLambda: lambda.Function;
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');

// Grant delete access to all indexes
vectorBucket.grantDelete(myLambda);

// Grant delete access to specific indexes
vectorBucket.grantDelete(myLambda, ['index-1', 'index-2']);
```

When using KMS encryption, the grant methods automatically include the necessary KMS permissions (`kms:Decrypt` and `kms:DescribeKey`) for the granted principal.

### Bucket deletion

When a bucket is removed from a stack (or the stack is deleted), the S3 vector bucket will be removed according to its removal policy (which by default will simply orphan the bucket and leave it in your AWS account). If the removal policy is set to `RemovalPolicy.DESTROY`, the bucket will be deleted as long as it does not contain any indexes.

To override this and force all indexes to get deleted during bucket deletion, enable the `autoDeleteObjects` option:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket', {
  autoDeleteObjects: true,
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});
```

**Note:** The `autoDeleteObjects` feature uses a custom resource to delete all indexes in the bucket before the bucket is deleted. This ensures that the bucket can be successfully removed even if it contains indexes.

### Importing existing vector buckets

To import an existing vector bucket into your CDK application, use one of the static factory methods:

**Import by ARN:**

```ts fixture=default-bedrock
const importedBucket = genaicdk.s3vectors.VectorBucket.fromVectorBucketArn(
  this,
  'ImportedBucket',
  'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket-name'
);
```

**Import by name:**

```ts fixture=default-bedrock
const importedBucket = genaicdk.s3vectors.VectorBucket.fromVectorBucketName(
  this,
  'ImportedBucket',
  'my-bucket-name'
);
```

**Import with attributes:**

```ts fixture=default-bedrock
const importedBucket = genaicdk.s3vectors.VectorBucket.fromVectorBucketAttributes(
  this,
  'ImportedBucket',
  {
    vectorBucketArn: 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket-name',
    creationTime: '2024-01-01T00:00:00Z',
  }
);
```

### Sharing buckets between stacks

To use a bucket in a different stack in the same CDK application, pass the object to the other stack:

```ts fixture=default-bedrock
// In Stack A
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');

// In Stack B
declare const stackB: cdk.Stack;
declare const SomeOtherConstruct: any;
// Pass the bucket reference
new SomeOtherConstruct(stackB, 'OtherConstruct', {
  bucket: vectorBucket,
});
```

## Vector index

Vector indexes are resources within vector buckets that store and organize vector data for efficient similarity search operations. When you create a vector index, you specify the distance metric (Cosine or Euclidean), the number of dimensions that a vector should have, and optionally a list of metadata fields that you want to exclude from filtering during similarity queries.

For more information about vector index limits per bucket, vector limits per index, and dimension limits per vector, see [Limitations and restrictions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-limitations.html).

### Creating a vector index

Create a vector index with minimal required properties:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128, // Required: number of dimensions (1-4096)
});
```

### Dimension

Dimension is a numeric value between 1 and 4096 that determines how many numbers will be in each vector that's generated by your vector embedding model. Embedding models are specialized machine learning (ML) models that convert data (such as text or images) into numerical vectors. Embedding models typically produce outputs between 500-2000 dimensions, with each dimension being a floating-point number.

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 1024, // All vectors in this index must have exactly 1024 dimensions
});
```

### Distance metric

You can configure the distance metric to define how similarity between vectors is calculated during queries:

- **Cosine**: Measures the cosine of the angle between two vectors. This is the default.
- **Euclidean**: Measures the straight-line distance between two points in multi-dimensional space. Lower values indicate greater similarity.

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');

// Using cosine similarity (default)
const cosineIndex = new genaicdk.s3vectors.VectorIndex(this, 'CosineIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  distanceMetric: genaicdk.s3vectors.VectorIndexDistanceMetric.COSINE,
});

// Using euclidean distance
const euclideanIndex = new genaicdk.s3vectors.VectorIndex(this, 'EuclideanIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  distanceMetric: genaicdk.s3vectors.VectorIndexDistanceMetric.EUCLIDEAN,
});
```

### Data type

Currently, S3 Vectors supports 32-bit floating-point numbers (`float32`) for vector data:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  dataType: genaicdk.s3vectors.VectorIndexDataType.FLOAT_32, // This is the default and only option
});
```

### Non-filterable metadata keys

Metadata keys allow you to attach additional information to your vectors as key-value pairs during storage and retrieval. By default, all metadata is filterable, so you can use it to filter query results. However, you can designate specific metadata keys as non-filterable when you want to store information with vectors without using it for filtering.

Unlike default metadata keys, these keys can't be used as query filters. Non-filterable metadata keys can be retrieved but can't be searched, queried, or filtered. You can only access them after finding the vectors.

Non-filterable metadata keys allow you to enrich vectors with additional context that you want to retrieve with search results but don't need for filtering. A common example of a non-filterable metadata key is when you embed text into vectors and want to include the original text itself as non-filterable metadata. This allows you to return the source text alongside vector search results without increasing your filterable metadata size limits.

**Specify non-filterable metadata keys:**

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  nonFilterableMetadataKeys: ['originalText', 'sourceUrl', 'timestamp'],
});
```

**Requirements:**

- You can specify 1 to 10 non-filterable metadata keys per index
- Each key must be 1 to 63 characters long
- Keys must follow the same naming rules as index names (lowercase letters, numbers, dots, and hyphens)

### Index encryption

You can configure the encryption type for your vector index. By default, if you don't specify encryption, the index will use SSE-S3 (server-side encryption with Amazon S3 managed keys). You can optionally override the bucket-level encryption settings and provide a dedicated encryption configuration at the index level.

**Important:** Encryption settings for a vector index can't be changed after the index is created.

#### SSE-S3 for indexes

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  encryption: genaicdk.s3vectors.VectorIndexEncryption.S3_MANAGED,
});
```

#### SSE-KMS for indexes

When you use KMS encryption at the index level, the construct automatically grants the S3 Vectors service principal (`indexing.s3vectors.amazonaws.com`) the necessary permissions to use the key for background operations.

**Using an auto-created KMS key:**

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  encryption: genaicdk.s3vectors.VectorIndexEncryption.KMS,
});
```

**Using your own KMS key:**

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const myKmsKey = new kms.Key(this, 'MyIndexKey', {
  description: 'KMS key for S3 Vectors index',
  enableKeyRotation: true,
});

const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
  encryption: genaicdk.s3vectors.VectorIndexEncryption.KMS,
  encryptionKey: myKmsKey,
});
```

**Important:** When using KMS encryption with customer-managed keys, the construct automatically grants the S3 Vectors service principal (`indexing.s3vectors.amazonaws.com`) the `kms:Decrypt` permission on your KMS key. This is required for the service to maintain and optimize indexes in background operations. The key policy includes appropriate conditions to ensure the service can only access keys for resources in your account.

### Index permissions

#### Granting permissions to indexes

Vector indexes provide a `grant()` method to grant IAM permissions to principals:

```ts fixture=default-bedrock
declare const myLambda: lambda.Function;

const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const vectorIndex = new genaicdk.s3vectors.VectorIndex(this, 'MyVectorIndex', {
  vectorBucket: vectorBucket,
  dimension: 128,
});

// Grant specific actions
vectorIndex.grant(myLambda, 's3vectors:GetIndex', 's3vectors:QueryVectors', 's3vectors:PutVectors');
```

When using KMS encryption, the grant method automatically includes the necessary KMS permissions for the granted principal.

### Importing existing vector indexes

To import an existing vector index into your CDK application, use one of the static factory methods:

**Import by ARN:**

```ts fixture=default-bedrock
const importedIndex = genaicdk.s3vectors.VectorIndex.fromVectorIndexArn(
  this,
  'ImportedIndex',
  'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket/index/my-index'
);
```

**Import by name:**

```ts fixture=default-bedrock
const importedIndex = genaicdk.s3vectors.VectorIndex.fromVectorIndexName(
  this,
  'ImportedIndex',
  'my-bucket-name',
  'my-index-name'
);
```

**Import with attributes:**

```ts fixture=default-bedrock
const importedIndex = genaicdk.s3vectors.VectorIndex.fromVectorIndexAttributes(
  this,
  'ImportedIndex',
  {
    vectorIndexArn: 'arn:aws:s3vectors:us-east-1:123456789012:bucket/my-bucket/index/my-index',
    creationTime: '2024-01-01T00:00:00Z',
  }
);
```

### Index name validation

Vector index names must follow specific rules:

- Must be 3 to 63 characters long
- Can only contain lowercase letters, numbers, dots (.), and hyphens (-)
- Must begin and end with a letter or number

If you don't specify a name, CloudFormation will automatically generate one for you.

## Vector bucket policy

Vector bucket policies are resource-based policies that you attach directly to vector buckets to control access to the bucket and its contents. Bucket policies for vector buckets can grant permissions to principals from other AWS accounts, making them useful for cross-account access scenarios.

### Basic usage

Create a vector bucket policy:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const policy = new genaicdk.s3vectors.VectorBucketPolicy(this, 'MyBucketPolicy', {
  bucket: vectorBucket,
});

// Add statements to the policy
policy.document.addStatements(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['s3vectors:GetVectorBucket', 's3vectors:ListIndexes'],
    resources: [vectorBucket.vectorBucketArn],
    principals: [new iam.AccountRootPrincipal()],
  })
);
```

### Providing a policy document

You can provide a complete policy document when creating the policy:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const policyDoc = new iam.PolicyDocument({
  statements: [
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3vectors:GetVectorBucket'],
      resources: [vectorBucket.vectorBucketArn],
      principals: [new iam.AnyPrincipal()],
    }),
  ],
});

const policy = new genaicdk.s3vectors.VectorBucketPolicy(this, 'MyBucketPolicy', {
  bucket: vectorBucket,
  document: policyDoc,
});
```

### Removal policy

You can specify a removal policy for the bucket policy:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const policyDoc = new iam.PolicyDocument({
  statements: [
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3vectors:GetVectorBucket'],
      resources: [vectorBucket.vectorBucketArn],
      principals: [new iam.AnyPrincipal()],
    }),
  ],
});

const policy = new genaicdk.s3vectors.VectorBucketPolicy(this, 'MyBucketPolicy', {
  bucket: vectorBucket,
  document: policyDoc,
  removalPolicy: cdk.RemovalPolicy.RETAIN,
});
```

Or apply it after creation:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const policyDoc = new iam.PolicyDocument({
  statements: [
    new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['s3vectors:GetVectorBucket'],
      resources: [vectorBucket.vectorBucketArn],
      principals: [new iam.AnyPrincipal()],
    }),
  ],
});

const policy = new genaicdk.s3vectors.VectorBucketPolicy(this, 'MyBucketPolicy', {
  bucket: vectorBucket,
  document: policyDoc,
});
policy.applyRemovalPolicy(cdk.RemovalPolicy.RETAIN);
```

### Policy resources

Vector bucket policies can reference both bucket and index resources:

```ts fixture=default-bedrock
const vectorBucket = new genaicdk.s3vectors.VectorBucket(this, 'MyVectorBucket');
const policy = new genaicdk.s3vectors.VectorBucketPolicy(this, 'MyBucketPolicy', {
  bucket: vectorBucket,
});

// Grant access to the bucket
policy.document.addStatements(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['s3vectors:GetVectorBucket'],
    resources: [vectorBucket.vectorBucketArn],
    principals: [new iam.AccountRootPrincipal()],
  })
);

// Grant access to all indexes in the bucket
policy.document.addStatements(
  new iam.PolicyStatement({
    effect: iam.Effect.ALLOW,
    actions: ['s3vectors:GetIndex', 's3vectors:QueryVectors'],
    resources: [`${vectorBucket.vectorBucketArn}/index/*`],
    principals: [new iam.AccountRootPrincipal()],
  })
);
```

## Additional resources

- [Amazon S3 Vectors User Guide](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors.html)
- [Data protection and encryption in S3 Vectors](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-data-encryption.html)
- [S3 Vectors access management](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-access-management.html)
- [S3 Vectors limitations and restrictions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/s3-vectors-limitations.html)
