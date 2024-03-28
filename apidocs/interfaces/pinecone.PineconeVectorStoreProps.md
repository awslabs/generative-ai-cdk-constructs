[@cdklabs/generative-ai-cdk-constructs](../README.md) / [pinecone](../modules/pinecone.md) / PineconeVectorStoreProps

# Interface: PineconeVectorStoreProps

[pinecone](../modules/pinecone.md).PineconeVectorStoreProps

Properties for a PineconeVectorStore

## Table of contents

### Properties

- [connectionString](pinecone.PineconeVectorStoreProps.md#connectionstring)
- [credentialsSecretArn](pinecone.PineconeVectorStoreProps.md#credentialssecretarn)
- [kmsKey](pinecone.PineconeVectorStoreProps.md#kmskey)
- [namespace](pinecone.PineconeVectorStoreProps.md#namespace)

## Properties

### connectionString

• `Readonly` **connectionString**: `string`

Connection string for your Pinecone index management page.

___

### credentialsSecretArn

• `Readonly` **credentialsSecretArn**: `string`

ARN of the secret containing the API Key to use
when connecting to the Pinecone database.
Learn more in the link below.

**`See`**

https://www.pinecone.io/blog/amazon-bedrock-integration/

___

### kmsKey

• `Optional` `Readonly` **kmsKey**: `string`

If you encrypted your secret, provide the KMS key here so that Bedrock
can decrypt it.

___

### namespace

• `Optional` `Readonly` **namespace**: `string`

Name space that will be used for writing new data to your Pinecone database.
