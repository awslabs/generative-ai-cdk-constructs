[@cdklabs/generative-ai-cdk-constructs](../README.md) / [foundation\_models](../modules/foundation_models.md) / BedrockFoundationModelProps

# Interface: BedrockFoundationModelProps

[foundation\_models](../modules/foundation_models.md).BedrockFoundationModelProps

## Table of contents

### Properties

- [supportsAgents](foundation_models.BedrockFoundationModelProps.md#supportsagents)
- [supportsKnowledgeBase](foundation_models.BedrockFoundationModelProps.md#supportsknowledgebase)
- [vectorDimensions](foundation_models.BedrockFoundationModelProps.md#vectordimensions)

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
