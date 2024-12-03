[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [pinecone](../README.md) / PineconeVectorStoreProps

# Interface: PineconeVectorStoreProps

Properties for a PineconeVectorStore

## Properties

### connectionString

> `readonly` **connectionString**: `string`

Connection string for your Pinecone index management page.

***

### credentialsSecretArn

> `readonly` **credentialsSecretArn**: `string`

ARN of the secret containing the API Key to use
when connecting to the Pinecone database.
Learn more in the link below.

#### See

https://www.pinecone.io/blog/amazon-bedrock-integration/

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `string`

If you encrypted your secret, provide the KMS key here so that Bedrock
can decrypt it.

***

### metadataField

> `readonly` **metadataField**: `string`

The name of the field in which Amazon Bedrock stores metadata about the vector store.

***

### namespace?

> `readonly` `optional` **namespace**: `string`

Name space that will be used for writing new data to your Pinecone database.

***

### textField

> `readonly` **textField**: `string`

The name of the field in which Amazon Bedrock stores the raw text from your data.
