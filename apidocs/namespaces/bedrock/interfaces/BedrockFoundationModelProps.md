[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / BedrockFoundationModelProps

# Interface: BedrockFoundationModelProps

## Properties

### supportsAgents?

> `readonly` `optional` **supportsAgents**: `boolean`

Bedrock Agents can use this model.

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

### supportsMemory?

> `readonly` `optional` **supportsMemory**: `boolean`

Whether Memory for Agents feature is supported for this model.

#### Default

```ts
- false
```

***

### vectorDimensions?

> `readonly` `optional` **vectorDimensions**: `number`

Embedding models have different vector dimensions.
Only applicable for embedding models.
