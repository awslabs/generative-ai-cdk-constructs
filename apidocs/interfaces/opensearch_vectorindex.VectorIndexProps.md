[@cdklabs/generative-ai-cdk-constructs](../README.md) / [opensearch\_vectorindex](../modules/opensearch_vectorindex.md) / VectorIndexProps

# Interface: VectorIndexProps

[opensearch\_vectorindex](../modules/opensearch_vectorindex.md).VectorIndexProps

Properties for the VectorIndex.

## Table of contents

### Properties

- [collection](opensearch_vectorindex.VectorIndexProps.md#collection)
- [indexName](opensearch_vectorindex.VectorIndexProps.md#indexname)
- [mappings](opensearch_vectorindex.VectorIndexProps.md#mappings)
- [vectorDimensions](opensearch_vectorindex.VectorIndexProps.md#vectordimensions)
- [vectorField](opensearch_vectorindex.VectorIndexProps.md#vectorfield)

## Properties

### collection

• `Readonly` **collection**: [`VectorCollection`](../classes/opensearchserverless.VectorCollection.md)

The OpenSearch Vector Collection.

#### Defined in

[src/cdk-lib/opensearch-vectorindex/vector-index.ts:96](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/opensearch-vectorindex/vector-index.ts#L96)

___

### indexName

• `Readonly` **indexName**: `string`

The name of the index.

#### Defined in

[src/cdk-lib/opensearch-vectorindex/vector-index.ts:100](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/opensearch-vectorindex/vector-index.ts#L100)

___

### mappings

• `Readonly` **mappings**: [`MetadataManagementFieldProps`](opensearch_vectorindex.MetadataManagementFieldProps.md)[]

The metadata management fields.

#### Defined in

[src/cdk-lib/opensearch-vectorindex/vector-index.ts:112](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/opensearch-vectorindex/vector-index.ts#L112)

___

### vectorDimensions

• `Readonly` **vectorDimensions**: `number`

The number of dimensions in the vector.

#### Defined in

[src/cdk-lib/opensearch-vectorindex/vector-index.ts:108](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/opensearch-vectorindex/vector-index.ts#L108)

___

### vectorField

• `Readonly` **vectorField**: `string`

The name of the vector field.

#### Defined in

[src/cdk-lib/opensearch-vectorindex/vector-index.ts:104](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/cdk-lib/opensearch-vectorindex/vector-index.ts#L104)
