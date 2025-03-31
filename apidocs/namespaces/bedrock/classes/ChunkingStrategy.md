[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ChunkingStrategy

# Class: `abstract` ChunkingStrategy

## Properties

### configuration

> `abstract` **configuration**: `ChunkingConfigurationProperty`

The CloudFormation property representation of this configuration

***

### DEFAULT

> `readonly` `static` **DEFAULT**: [`ChunkingStrategy`](ChunkingStrategy.md)

Fixed Sized Chunking with the default chunk size of 300 tokens and 20% overlap.

***

### FIXED\_SIZE

> `readonly` `static` **FIXED\_SIZE**: [`ChunkingStrategy`](ChunkingStrategy.md)

Fixed Sized Chunking with the default chunk size of 300 tokens and 20% overlap.
You can adjust these values based on your specific requirements using the
`ChunkingStrategy.fixedSize(params)` method.

***

### HIERARCHICAL\_COHERE

> `readonly` `static` **HIERARCHICAL\_COHERE**: [`ChunkingStrategy`](ChunkingStrategy.md)

Hierarchical Chunking with the default for Cohere Models.
- Overlap tokens: 30
- Max parent token size: 500
- Max child token size: 100

***

### HIERARCHICAL\_TITAN

> `readonly` `static` **HIERARCHICAL\_TITAN**: [`ChunkingStrategy`](ChunkingStrategy.md)

Hierarchical Chunking with the default for Titan Models.
- Overlap tokens: 60
- Max parent token size: 1500
- Max child token size: 300

***

### NONE

> `readonly` `static` **NONE**: [`ChunkingStrategy`](ChunkingStrategy.md)

Amazon Bedrock treats each file as one chunk. Suitable for documents that
are already pre-processed or text split.

***

### SEMANTIC

> `readonly` `static` **SEMANTIC**: [`ChunkingStrategy`](ChunkingStrategy.md)

Semantic Chunking with the default of bufferSize: 0,
breakpointPercentileThreshold: 95, and maxTokens: 300.
You can adjust these values based on your specific requirements using the
`ChunkingStrategy.semantic(params)` method.

## Methods

### fixedSize()

> `static` **fixedSize**(`props`): [`ChunkingStrategy`](ChunkingStrategy.md)

Method for customizing a fixed sized chunking strategy.

#### Parameters

##### props

`FixedSizeChunkingConfigurationProperty`

#### Returns

[`ChunkingStrategy`](ChunkingStrategy.md)

***

### hierarchical()

> `static` **hierarchical**(`props`): [`ChunkingStrategy`](ChunkingStrategy.md)

Method for customizing a hierarchical chunking strategy.
For custom chunking, the maximum token chunk size depends on the model.
- Amazon Titan Text Embeddings: 8192
- Cohere Embed models: 512

#### Parameters

##### props

[`HierarchicalChunkingProps`](../interfaces/HierarchicalChunkingProps.md)

#### Returns

[`ChunkingStrategy`](ChunkingStrategy.md)

***

### semantic()

> `static` **semantic**(`props`): [`ChunkingStrategy`](ChunkingStrategy.md)

Method for customizing a semantic chunking strategy.
For custom chunking, the maximum token chunk size depends on the model.
- Amazon Titan Text Embeddings: 8192
- Cohere Embed models: 512

#### Parameters

##### props

`SemanticChunkingConfigurationProperty`

#### Returns

[`ChunkingStrategy`](ChunkingStrategy.md)
