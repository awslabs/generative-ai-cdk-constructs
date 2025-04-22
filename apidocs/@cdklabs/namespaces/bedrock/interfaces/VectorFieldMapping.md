[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / VectorFieldMapping

# Interface: VectorFieldMapping

## Properties

### metadataField

> `readonly` **metadataField**: `string`

The name of the field in which Amazon Bedrock stores metadata about the vector store.

#### Default

```ts
"AMAZON_BEDROCK_METADATA"
```

***

### textField

> `readonly` **textField**: `string`

The name of the field in which Amazon Bedrock stores the raw text from your data.
The text is split according to the chunking strategy you choose.

#### Default

```ts
"AMAZON_BEDROCK_TEXT"
```
