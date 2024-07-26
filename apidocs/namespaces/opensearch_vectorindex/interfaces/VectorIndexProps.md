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

### customSettings?

> `readonly` `optional` **customSettings**: `Record`\<`string`, `any`\>

Custom settings for the index.

#### Default

```ts
{}
```

***

### efSearch?

> `readonly` `optional` **efSearch**: `number`

The ef_search parameter for vector search.

#### Default

```ts
512
```

***

### engine?

> `readonly` `optional` **engine**: `string`

The engine to use for vector search.

#### Default

```ts
'faiss'
```

***

### indexName

> `readonly` **indexName**: `string`

The name of the index.

***

### mappings

> `readonly` **mappings**: [`MetadataManagementFieldProps`](MetadataManagementFieldProps.md)[]

The metadata management fields.

***

### methodName?

> `readonly` `optional` **methodName**: `string`

The method name for vector search.

#### Default

```ts
'hnsw'
```

***

### numberOfShards?

> `readonly` `optional` **numberOfShards**: `number`

The number of shards for the index.

#### Default

```ts
2
```

***

### parameters?

> `readonly` `optional` **parameters**: `Record`\<`string`, `any`\>

Additional parameters for vector search.

#### Default

```ts
{}
```

***

### spaceType?

> `readonly` `optional` **spaceType**: `string`

The space type for vector search.

#### Default

```ts
'l2'
```

***

### vectorDimensions

> `readonly` **vectorDimensions**: `number`

The number of dimensions in the vector.

***

### vectorField

> `readonly` **vectorField**: `string`

The name of the vector field.
