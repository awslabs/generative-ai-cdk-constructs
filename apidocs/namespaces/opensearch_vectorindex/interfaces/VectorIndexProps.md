[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [opensearch\_vectorindex](../README.md) / VectorIndexProps

# Interface: VectorIndexProps

Properties for the VectorIndex.

## Properties

### analyzer?

> `readonly` `optional` **analyzer**: [`Analyzer`](Analyzer.md)

The analyzer to use.

#### Default

```ts
- No analyzer.
```

***

### collection

> `readonly` **collection**: [`VectorCollection`](../../opensearchserverless/classes/VectorCollection.md)

The OpenSearch Vector Collection.

***

### indexName

> `readonly` **indexName**: `string`

The name of the index.

***

### mappings

> `readonly` **mappings**: [`MetadataManagementFieldProps`](MetadataManagementFieldProps.md)[]

The metadata management fields.

***

### vectorDimensions

> `readonly` **vectorDimensions**: `number`

The number of dimensions in the vector.

***

### vectorField

> `readonly` **vectorField**: `string`

The name of the vector field.
