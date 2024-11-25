[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [opensearchserverless](../README.md) / VectorCollectionProps

# Interface: VectorCollectionProps

Properties for configuring the vector collection.

## Properties

### collectionName?

> `readonly` `optional` **collectionName**: `string`

The name of the collection. Must be between 3-32 characters long and contain only
lowercase letters, numbers, and hyphens.

#### Default

```ts
- A CDK generated name will be used
```

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
VectorCollectionStandbyReplicas.ENABLED
```
