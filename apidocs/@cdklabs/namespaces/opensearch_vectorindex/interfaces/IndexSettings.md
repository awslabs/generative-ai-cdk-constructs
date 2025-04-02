[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearch\_vectorindex](../README.md) / IndexSettings

# Interface: IndexSettings

Index settings for the OpenSearch Serverless index.

## Properties

### knn?

> `readonly` `optional` **knn**: `boolean`

Enable or disable k-nearest neighbor search capability.

***

### knnAlgoParamEfSearch?

> `readonly` `optional` **knnAlgoParamEfSearch**: `number`

The size of the dynamic list for the nearest neighbors.

***

### refreshInterval?

> `readonly` `optional` **refreshInterval**: `Duration`

How often to perform a refresh operation. For example, 1s or 5s.
