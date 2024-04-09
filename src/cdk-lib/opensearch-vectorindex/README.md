# Amazon OpenSearch Vector Index Construct Library
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

This construct library provides a resource that creates a vector index on an Amazon OpenSearch Domain. It currently only supports Amazon OpenSearch Serverless.

## Table of contents
- [API](#api)
- [Vector Index](#vector-index)


## API
See the [API documentation](../../../apidocs/modules/opensearchserverless.md).

## Vector Index
The `VectorIndex` resource connects to OpenSearch and creates an index suitable for use with Amazon Bedrock Knowledge Bases.

TypeScript

```ts
import { opensearchserverless, opensearch_vectorindex } from '@cdklabs/generative-ai-cdk-constructs';

const vectorStore = new opensearchserverless.VectorCollection(this, 'VectorCollection');

new opensearch_vectorindex.VectorIndex(this, 'VectorIndex', {
collection: vectorStore,
indexName,
vectorField,
vectorDimensions: 1536,
mappings: [
  {
    mappingField: 'AMAZON_BEDROCK_TEXT_CHUNK',
    dataType: 'text',
    filterable: true,
  },
  {
    mappingField: 'AMAZON_BEDROCK_METADATA',
    dataType: 'text',
    filterable: false,
  },
],
});
```

Python
```python
from cdklabs.generative_ai_cdk_constructs import (
    opensearchserverless,
    opensearch_vectorindex,
)

vectorCollection = opensearchserverless.VectorCollection(self, "VectorCollection")

vectorIndex = opensearch_vectorindex.VectorIndex(self, "VectorIndex",
    vector_dimensions= 1536,
    collection=vectorCollection,
    index_name='myindex',
    vector_field='vectorfieldname',
    mappings= [
        opensearch_vectorindex.MetadataManagementFieldProps(
            mapping_field='AMAZON_BEDROCK_TEXT_CHUNK',
            data_type='text',
            filterable=True
        ),
        opensearch_vectorindex.MetadataManagementFieldProps(
            mapping_field='AMAZON_BEDROCK_METADATA',
            data_type='text',
            filterable=False
        )
    ],
)
```