[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [opensearchserverless](../README.md) / VectorCollectionProps

# Interface: VectorCollectionProps

## Properties

### collectionName

> `readonly` **collectionName**: `string`

The name of the collection.

***

### customAossPolicy?

> `readonly` `optional` **customAossPolicy**: `ManagedPolicy`

A user defined IAM policy that allows API access to the collection.

***

### standbyReplicas?

> `readonly` `optional` **standbyReplicas**: [`VectorCollectionStandbyReplicas`](../enumerations/VectorCollectionStandbyReplicas.md)

Indicates whether to use standby replicas for the collection.

#### Default

```ts
ENABLED
```
