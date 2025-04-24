[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / GraphKnowledgeBaseProps

# Interface: GraphKnowledgeBaseProps

Properties for creating a Kendra Index Knowledge Base.

## Extends

- [`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`description`](CommonKnowledgeBaseProps.md#description)

***

### embeddingModel

> `readonly` **embeddingModel**: [`BedrockFoundationModel`](../classes/BedrockFoundationModel.md)

The embeddings model for the knowledge base.

***

### existingRole?

> `readonly` `optional` **existingRole**: `IRole`

Existing IAM role with policy statements granting appropriate permissions
to invoke the specific embeddings models.
Any entity (e.g., an AWS service or application) that assumes
this role will be able to invoke or use the
specified embeddings model within the Bedrock service.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`existingRole`](CommonKnowledgeBaseProps.md#existingrole)

***

### fieldMapping?

> `readonly` `optional` **fieldMapping**: [`VectorFieldMapping`](VectorFieldMapping.md)

The vector field mapping configuration.

#### Default

```ts
- { metadataField: "AMAZON_BEDROCK_METADATA", textField: "AMAZON_BEDROCK_TEXT" }
```

***

### graph?

> `readonly` `optional` **graph**: [`INeptuneGraph`](../../neptune/interfaces/INeptuneGraph.md)

The Neptune Analytics vector store

#### Default

```ts
- A new Neptune Analytics vector store is created
```

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative description of the knowledge base.

A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`instruction`](CommonKnowledgeBaseProps.md#instruction)

***

### name?

> `readonly` `optional` **name**: `string`

The name of the knowledge base.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`name`](CommonKnowledgeBaseProps.md#name)
