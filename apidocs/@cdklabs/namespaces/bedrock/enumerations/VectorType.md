[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / VectorType

# Enumeration: VectorType

The data type for the vectors when using a model to convert text into vector embeddings.
The model must support the specified data type for vector embeddings. Floating-point (float32)
is the default data type, and is supported by most models for vector embeddings. See Supported
embeddings models for information on the available models and their vector data types.

## Enumeration Members

### BINARY

> **BINARY**: `"BINARY"`

`BINARY` convert the data to binary vector embeddings (less precise, but less costly).

***

### FLOATING\_POINT

> **FLOATING\_POINT**: `"FLOAT32"`

`FLOATING_POINT` convert the data to floating-point (float32) vector embeddings (more precise, but more costly).
