[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / CommonKnowledgeBaseProps

# Interface: CommonKnowledgeBaseProps

Common properties for creating any type of new Knowledge Base.

## Extended by

- [`VectorKnowledgeBaseProps`](VectorKnowledgeBaseProps.md)
- [`KendraKnowledgeBaseProps`](KendraKnowledgeBaseProps.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

***

### existingRole?

> `readonly` `optional` **existingRole**: `IRole`

Existing IAM role with policy statements granting appropriate permissions
to invoke the specific embeddings models.
Any entity (e.g., an AWS service or application) that assumes
this role will be able to invoke or use the
specified embeddings model within the Bedrock service.

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

***

### name?

> `readonly` `optional` **name**: `string`

The name of the knowledge base.
