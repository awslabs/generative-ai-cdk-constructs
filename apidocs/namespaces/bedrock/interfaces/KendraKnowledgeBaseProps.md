[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / KendraKnowledgeBaseProps

# Interface: KendraKnowledgeBaseProps

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

### kendraIndex

> `readonly` **kendraIndex**: [`IKendraGenAiIndex`](../../kendra/interfaces/IKendraGenAiIndex.md)

The Kendra Index to use for the knowledge base.

***

### name?

> `readonly` `optional` **name**: `string`

The name of the knowledge base.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`name`](CommonKnowledgeBaseProps.md#name)
