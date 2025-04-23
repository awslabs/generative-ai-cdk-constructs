[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / WordFilter

# Interface: WordFilter

Interface to define a Word Filter.

## Properties

### inputAction?

> `readonly` `optional` **inputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a word is detected in the input.

***

### inputEnabled?

> `readonly` `optional` **inputEnabled**: `boolean`

Whether the word filter is enabled for input.

***

### outputAction?

> `readonly` `optional` **outputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a word is detected in the output.

***

### outputEnabled?

> `readonly` `optional` **outputEnabled**: `boolean`

Whether the word filter is enabled for output.

***

### text

> `readonly` **text**: `string`

The text to filter.
