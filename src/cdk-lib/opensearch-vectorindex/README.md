# Amazon OpenSearch Vector Index Construct Library

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

| **Language**                                                                                   | **Package**                             |
| :--------------------------------------------------------------------------------------------- | --------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs` |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`  |
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

This construct library provides a resource that creates a vector index on an Amazon OpenSearch Domain. It currently only supports Amazon OpenSearch Serverless.

## Table of contents

- [API](#api)
- [Vector Index](#vector-index)
- [Default values](#default-values)

## API

See the [API documentation](../../../apidocs/namespaces/opensearch_vectorindex/README.md).

## Vector Index

The `VectorIndex` resource connects to OpenSearch and creates an index suitable for use with Amazon Bedrock Knowledge Bases.

TypeScript

```ts
import {
  opensearchserverless,
  opensearch_vectorindex,
} from '@cdklabs/generative-ai-cdk-constructs';

const vectorStore = new opensearchserverless.VectorCollection(
  this,
  'VectorCollection'
);

new opensearch_vectorindex.VectorIndex(this, 'VectorIndex', {
  collection: vectorStore,
  indexName: 'bedrock-knowledge-base-default-index',
  vectorField: 'bedrock-knowledge-base-default-vector',
  vectorDimensions: 1536,
  precision: 'float',
  distanceType: 'l2',
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
  analyzer: {
    characterFilters: [opensearchserverless.CharacterFilterType.ICU_NORMALIZER],
    tokenizer: opensearchserverless.TokenizerType.KUROMOJI_TOKENIZER,
    tokenFilters: [
      opensearchserverless.TokenFilterType.KUROMOJI_BASEFORM,
      opensearchserverless.TokenFilterType.JA_STOP,
    ],
  },
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
    index_name='bedrock-knowledge-base-default-index',
    vector_field='bedrock-knowledge-base-default-vector',
    precision='float',
    distance_type='l2',
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
    analyzer=opensearchserverless.AnalyzerProps(
        character_filters=[opensearchserverless.CharacterFilterType.ICU_NORMALIZER],
        tokenizer=opensearchserverless.TokenizerType.KUROMOJI_TOKENIZER,
        token_filters=[
            opensearchserverless.TokenFilterType.KUROMOJI_BASEFORM,
            opensearchserverless.TokenFilterType.JA_STOP,
        ],
    )
)
```

## Default values

Behind the scenes, the custom resource creates a k-NN vector in the OpenSearch index, allowing to perform different kinds of k-NN search. The knn_vector field is highly configurable and can serve many different k-NN workloads. It is created as follows:

Python

```py
"properties": {
            vector_field: {
                "type": "knn_vector",
                "dimension": dimensions,
                "data_type": precision,
                "method": {
                    "engine": "faiss",
                    "space_type": distance_type,
                    "name": "hnsw",
                    "parameters": {},
                },
            },
            "id": {
                "type": "text",
                "fields": {"keyword": {"type": "keyword", "ignore_above": 256}},
            },
        },
```

Users can currently configure the ```vector_field```, ```dimension```, ```data_type```, and ```distance_type``` fields through the construct interface.

For details on the different settings, you can refer to the [Knn plugin documentation](https://opensearch.org/docs/latest/search-plugins/knn/knn-index/).