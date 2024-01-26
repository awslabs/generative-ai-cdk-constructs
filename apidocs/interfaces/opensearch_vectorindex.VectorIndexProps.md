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

___

### indexName

• `Readonly` **indexName**: `string`

The name of the index.

___

### mappings

• `Readonly` **mappings**: [`MetadataManagementFieldProps`](opensearch_vectorindex.MetadataManagementFieldProps.md)[]

The metadata management fields.

___

### vectorDimensions

• `Readonly` **vectorDimensions**: `number`

The number of dimensions in the vector.

___

### vectorField

• `Readonly` **vectorField**: `string`

The name of the vector field.
