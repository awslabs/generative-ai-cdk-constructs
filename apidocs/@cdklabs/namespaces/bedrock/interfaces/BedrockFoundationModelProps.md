[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / BedrockFoundationModelProps

# Interface: BedrockFoundationModelProps

## Properties

### legacy?

> `readonly` `optional` **legacy**: `boolean`

https://docs.aws.amazon.com/bedrock/latest/userguide/model-lifecycle.html
A version is marked Legacy when there is a more recent version which provides superior performance. Amazon Bedrock sets an EOL date for Legacy versions.

#### Default

```ts
- false
```

***

### optimizedForAgents?

> `readonly` `optional` **optimizedForAgents**: `boolean`

Currently, some of the offered models are optimized with prompts/parsers fine-tuned for integrating with the agents architecture.

#### Default

```ts
- false
```

***

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
