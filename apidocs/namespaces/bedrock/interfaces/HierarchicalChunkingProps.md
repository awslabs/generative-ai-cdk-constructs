[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / HierarchicalChunkingProps

# Interface: HierarchicalChunkingProps

## Properties

### maxChildTokenSize

> `readonly` **maxChildTokenSize**: `number`

Maximum number of tokens that a child chunk can contain.
Keep in mind the maximum chunk size depends on the embedding model chosen.

***

### maxParentTokenSize

> `readonly` **maxParentTokenSize**: `number`

Maximum number of tokens that a parent chunk can contain.
Keep in mind the maximum chunk size depends on the embedding model chosen.

***

### overlapTokens

> `readonly` **overlapTokens**: `number`

The overlap tokens between adjacent chunks.
