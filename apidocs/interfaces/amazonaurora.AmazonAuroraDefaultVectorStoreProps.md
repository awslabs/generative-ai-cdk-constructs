[@cdklabs/generative-ai-cdk-constructs](../README.md) / [amazonaurora](../modules/amazonaurora.md) / AmazonAuroraDefaultVectorStoreProps

# Interface: AmazonAuroraDefaultVectorStoreProps

[amazonaurora](../modules/amazonaurora.md).AmazonAuroraDefaultVectorStoreProps

## Table of contents

### Properties

- [embeddingsModelVectorDimension](amazonaurora.AmazonAuroraDefaultVectorStoreProps.md#embeddingsmodelvectordimension)

## Properties

### embeddingsModelVectorDimension

• `Readonly` **embeddingsModelVectorDimension**: `number`

The embeddings model vector dimension for the knowledge base.
Must be identical as in the KnowledgeBase construct.
This is due to the factor that the embeddings models
have different vector dimensions and this construct
needs to know the vector dimensions to create the vector
index of appropriate dimensions in the Aurora database.
