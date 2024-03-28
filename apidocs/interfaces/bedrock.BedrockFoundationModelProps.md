[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / BedrockFoundationModelProps

# Interface: BedrockFoundationModelProps

[bedrock](../modules/bedrock.md).BedrockFoundationModelProps

## Table of contents

### Properties

- [supportsAgents](bedrock.BedrockFoundationModelProps.md#supportsagents)
- [supportsKnowledgeBase](bedrock.BedrockFoundationModelProps.md#supportsknowledgebase)
- [vectorDimensions](bedrock.BedrockFoundationModelProps.md#vectordimensions)

## Properties

### supportsAgents

• `Optional` `Readonly` **supportsAgents**: `boolean`

Bedrock Agents can use this model.

**`Default`**

```ts
- false
```

___

### supportsKnowledgeBase

• `Optional` `Readonly` **supportsKnowledgeBase**: `boolean`

Bedrock Knowledge Base can use this model.

**`Default`**

```ts
- false
```

___

### vectorDimensions

• `Optional` `Readonly` **vectorDimensions**: `number`

Embedding models have different vector dimensions.
Only applicable for embedding models.
