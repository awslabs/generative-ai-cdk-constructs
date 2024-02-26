[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [opensearch\_vectorindex](/docs/api/modules/opensearch_vectorindex.md) / VectorIndexProps

# Interface: VectorIndexProps

[opensearch\_vectorindex](/docs/api/modules/opensearch_vectorindex.md).VectorIndexProps

Properties for the VectorIndex.

## Properties

### collection

• `Readonly` **collection**: [`VectorCollection`](/docs/api/classes/opensearchserverless.VectorCollection.md)

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
