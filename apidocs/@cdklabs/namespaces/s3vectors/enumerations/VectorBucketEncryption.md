[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / VectorBucketEncryption

# Enumeration: VectorBucketEncryption

What kind of server-side encryption to apply to this bucket

## Enumeration Members

### KMS

> **KMS**: `"aws:kms"`

Server-side encryption with a KMS key managed by the user.
If `encryptionKey` is specified, this key will be used, otherwise, one will be defined.

***

### S3\_MANAGED

> **S3\_MANAGED**: `"AES256"`

Server-side encryption with a master key managed by S3.
