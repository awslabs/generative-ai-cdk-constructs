[@cdklabs/generative-ai-cdk-constructs](../README.md) / [opensearchserverless](../modules/opensearchserverless.md) / VectorCollectionProps

# Interface: VectorCollectionProps

[opensearchserverless](../modules/opensearchserverless.md).VectorCollectionProps

## Table of contents

### Properties

- [collectionName](opensearchserverless.VectorCollectionProps.md#collectionname)
- [standbyReplicas](opensearchserverless.VectorCollectionProps.md#standbyreplicas)

## Properties

### collectionName

• `Readonly` **collectionName**: `string`

The name of the collection.

___

### standbyReplicas

• `Optional` `Readonly` **standbyReplicas**: [`VectorCollectionStandbyReplicas`](../enums/opensearchserverless.VectorCollectionStandbyReplicas.md)

Indicates whether to use standby replicas for the collection.

**`Default`**

```ts
ENABLED
```
