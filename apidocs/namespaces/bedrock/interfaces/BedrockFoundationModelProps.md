[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / BedrockFoundationModelProps

# Interface: BedrockFoundationModelProps

## Properties

### supportedVectorType?

> `readonly` `optional` **supportedVectorType**: [`VectorType`](../enumerations/VectorType.md)[]

Embeddings models have different supported vector types

***

### supportsAgents?

> `readonly` `optional` **supportsAgents**: `boolean`

Bedrock Agents can use this model.

#### Default

```ts
- false
```

***

### supportsCrossRegion?

> `readonly` `optional` **supportsCrossRegion**: `boolean`

Can be used with a Cross-Region Inference Profile

#### Default

```ts
- false
```

***

### supportsKnowledgeBase?

> `readonly` `optional` **supportsKnowledgeBase**: `boolean`

Bedrock Knowledge Base can use this model.

#### Default

```ts
- false
```

***

### vectorDimensions?

> `readonly` `optional` **vectorDimensions**: `number`

Embedding models have different vector dimensions.
Only applicable for embedding models.
