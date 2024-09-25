[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / DataDeletionPolicy

# Enumeration: DataDeletionPolicy

Specifies the policy for handling data when a data source resource is deleted.
This policy affects the vector embeddings created from the data source.

## Enumeration Members

### DELETE

> **DELETE**: `"DELETE"`

Deletes all vector embeddings derived from the data source upon deletion
of a data source resource.

***

### RETAIN

> **RETAIN**: `"RETAIN"`

Retains all vector embeddings derived from the data source even after
deletion of a data source resource.
