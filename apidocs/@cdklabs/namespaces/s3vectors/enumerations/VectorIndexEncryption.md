[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorIndexEncryption

# Enumeration: VectorIndexEncryption

What kind of encryption to apply to this index.
By default, if you don't specify, all new vectors in Amazon S3 vector indexes
use server-side encryption with Amazon S3 managed keys (SSE-S3), specifically AES256.

## Enumeration Members

### KMS

> **KMS**: `"aws:kms"`

Encryption with a KMS key managed by the user.

***

### S3\_MANAGED

> **S3\_MANAGED**: `"AES256"`

Encryption with a master key managed by S3.
