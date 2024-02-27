[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / ChunkingStrategy

# Enumeration: ChunkingStrategy

[bedrock](/docs/api/modules/bedrock.md).ChunkingStrategy

Knowledge base can split your source data into chunks. A chunk refers to an
excerpt from a data source that is returned when the knowledge base that it
belongs to is queried. You have the following options for chunking your
data. If you opt for NONE, then you may want to pre-process your files by
splitting them up such that each file corresponds to a chunk.

## Enumeration Members

### DEFAULT

• **DEFAULT** = ``"DEFAULT"``

`FIXED_SIZE` with the default chunk size of 300 tokens and 20% overlap.

___

### FIXED\_SIZE

• **FIXED\_SIZE** = ``"FIXED_SIZE"``

Amazon Bedrock splits your source data into chunks of the approximate size
that you set in the `fixedSizeChunkingConfiguration`.

___

### NONE

• **NONE** = ``"NONE"``

Amazon Bedrock treats each file as one chunk. If you choose this option,
you may want to pre-process your documents by splitting them into separate
files.
