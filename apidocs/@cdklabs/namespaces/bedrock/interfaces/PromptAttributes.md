[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / PromptAttributes

# Interface: PromptAttributes

***************************************************************************
                     ATTRS FOR IMPORTED CONSTRUCT
***************************************************************************

## Properties

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

Optional KMS encryption key associated with this prompt.

***

### promptArn

> `readonly` **promptArn**: `string`

The ARN of the prompt.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345"
```

***

### promptVersion?

> `readonly` `optional` **promptVersion**: `string`

The version of the prompt.

#### Default

```ts
- "DRAFT"
```
