[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / KnowledgeBaseAttributes

# Interface: KnowledgeBaseAttributes

Properties for importing a knowledge base outside of this stack

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

***

### executionRoleArn

> `readonly` **executionRoleArn**: `string`

The Service Execution Role associated with the knowledge base.

#### Example

```ts
"arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBaseawscdkbdgeBaseKB12345678"
```

***

### instruction?

> `readonly` `optional` **instruction**: `string`

Instructions for agents based on the design and type of information of the
Knowledge Base. This will impact how Agents interact with the Knowledge Base.

#### Default

```ts
- No description provided.
```

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

#### Example

```ts
"KB12345678"
```
