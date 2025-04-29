[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ManagedWordFilter

# Interface: ManagedWordFilter

## Properties

### inputAction?

> `readonly` `optional` **inputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a managed word is detected in the input.

***

### inputEnabled?

> `readonly` `optional` **inputEnabled**: `boolean`

Whether the managed word filter is enabled for input.

***

### outputAction?

> `readonly` `optional` **outputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a managed word is detected in the output.

***

### outputEnabled?

> `readonly` `optional` **outputEnabled**: `boolean`

Whether the managed word filter is enabled for output.

***

### type

> `readonly` **type**: [`PROFANITY`](../enumerations/ManagedWordFilterType.md#profanity)

The type of managed word filter.
