# MongoDB Atlas Vector Store Construct Library
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->


| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

## MongoDBAtlasVectorStore

The `MongoDBAtlasVectorStore` construct allows you to define a MongoDB Atlas instance as a vector store for your Amazon Bedrock Knowledge Base.

### Usage

#### TypeScript

```typescript
import * as cdk from 'aws-cdk-lib';
import { MongoDBAtlasVectorStore } from '@cdklabs/generative-ai-cdk-constructs';

const vectorStore = new MongoDBAtlasVectorStore(stack, 'MyVectorStore', {
  collectionName: 'embeddings',
  credentialsSecretArn: 'arn:aws:secretsmanager:region:account:secret:secret-name',
  databaseName: 'vectordb',
  endpoint: 'https://your-mongodb-atlas-endpoint.mongodb.net',
  endpointServiceName: 'mongodb-atlas',
  fieldMapping: {
    vectorField: 'embedding',
    textField: 'text',
    metadataField: 'metadata'
  },
  vectorIndexName: 'vector_index'
});
```

#### Python

```python
from cdklabs.generative_ai_cdk_constructs import MongoDBAtlasVectorStore

vector_store = MongoDBAtlasVectorStore(self, 'MyVectorStore', 
  collection_name='embeddings',
  credentials_secret_arn='arn:aws:secretsmanager:region:account:secret:secret-name',
  database_name='vectordb',
  endpoint='https://your-mongodb-atlas-endpoint.mongodb.net',
  endpoint_service_name='mongodb-atlas',
  field_mapping=mongodb_atlas.MongoDbAtlasFieldMapping(
        vector_field='embedding',
        text_field='text',
        metadata_field='metadata'
    ),
  vector_index_name='vector_index'
)
```

### Properties

The `MongoDBAtlasVectorStore` construct accepts the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `collectionName` | string | The name of the collection in MongoDB Atlas |
| `credentialsSecretArn` | string | The ARN of the AWS Secrets Manager secret containing MongoDB Atlas credentials |
| `databaseName` | string | The name of the database in MongoDB Atlas |
| `endpoint` | string | The endpoint URL for MongoDB Atlas |
| `endpointServiceName` | string | The name of the endpoint service |
| `fieldMapping` | MongoDbAtlasFieldMapping | The mapping of fields in the MongoDB collection |
| `vectorIndexName` | string | The name of the vector index in MongoDB Atlas |

### Field Mapping

The `fieldMapping` property defines how fields in your MongoDB collection map to vector store concepts:

| Property | Type | Description |
|----------|------|-------------|
| `vectorField` | string | The field name for storing vector embeddings |
| `textField` | string | The field name for storing the original text |
| `metadataField` | string | The field name for storing additional metadata |