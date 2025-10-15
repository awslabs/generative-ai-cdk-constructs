[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / RegexFilter

# Interface: RegexFilter

A Regular expression (regex) filter for sensitive information.

## Properties

### action

> `readonly` **action**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a regex match is detected.

***

### description?

> `readonly` `optional` **description**: `string`

The description of the regex filter.

***

### inputAction?

> `readonly` `optional` **inputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a regex match is detected in the input.

***

### inputEnabled?

> `readonly` `optional` **inputEnabled**: `boolean`

Whether the regex filter is enabled for input.

***

### name

> `readonly` **name**: `string`

The name of the regex filter.

***

### outputAction?

> `readonly` `optional` **outputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a regex match is detected in the output.

***

### outputEnabled?

> `readonly` `optional` **outputEnabled**: `boolean`

Whether the regex filter is enabled for output.

***

### pattern

> `readonly` **pattern**: `string`

The regular expression pattern to match.
