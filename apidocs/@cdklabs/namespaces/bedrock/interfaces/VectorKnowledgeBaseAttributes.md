[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / VectorKnowledgeBaseAttributes

# Interface: VectorKnowledgeBaseAttributes

Properties for importing a knowledge base outside of this stack

## Extends

- [`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md).[`description`](CommonKnowledgeBaseAttributes.md#description)

***

### executionRoleArn

> `readonly` **executionRoleArn**: `string`

The Service Execution Role associated with the knowledge base.

#### Example

```ts
"arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseKB12345678"
```

#### Inherited from

[`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md).[`executionRoleArn`](CommonKnowledgeBaseAttributes.md#executionrolearn)

***

### instruction?

> `readonly` `optional` **instruction**: `string`

Instructions for agents based on the design and type of information of the
Knowledge Base. This will impact how Agents interact with the Knowledge Base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md).[`instruction`](CommonKnowledgeBaseAttributes.md#instruction)

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

#### Example

```ts
"KB12345678"
```

#### Inherited from

[`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md).[`knowledgeBaseId`](CommonKnowledgeBaseAttributes.md#knowledgebaseid)

***

### knowledgeBaseState?

> `readonly` `optional` **knowledgeBaseState**: `string`

Specifies whether to use the knowledge base or not when sending an InvokeAgent request.

#### Default

```ts
- ENABLED
```

#### Inherited from

[`CommonKnowledgeBaseAttributes`](CommonKnowledgeBaseAttributes.md).[`knowledgeBaseState`](CommonKnowledgeBaseAttributes.md#knowledgebasestate)

***

### vectorStoreType

> `readonly` **vectorStoreType**: [`VectorStoreType`](../enumerations/VectorStoreType.md)

The vector store type for the knowledge base.
