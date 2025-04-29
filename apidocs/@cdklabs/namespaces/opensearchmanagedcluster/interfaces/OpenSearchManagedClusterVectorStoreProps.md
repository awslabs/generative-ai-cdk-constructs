[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearchmanagedcluster](../README.md) / OpenSearchManagedClusterVectorStoreProps

# Interface: OpenSearchManagedClusterVectorStoreProps

Properties for an OpenSearchManagedClusterVectorStore

## Properties

### domainArn

> `readonly` **domainArn**: `string`

The ARN of your OpenSearch Customer Managed Domain.

***

### domainEndpoint

> `readonly` **domainEndpoint**: `string`

The url of your OpenSearch Managed cluster domain.

***

### fieldMapping

> `readonly` **fieldMapping**: [`OpenSearchFieldMapping`](OpenSearchFieldMapping.md)

Configuration for field mappings in the vector store. Bedrock uses these fields to store your data.
If you haven't configured these fields in your vector database, your Knowledge Base
will fail to be created.

***

### vectorIndexName

> `readonly` **vectorIndexName**: `string`

The vector index name of your OpenSearch Customer Managed Domain.
