[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / RegexFilter

# Interface: RegexFilter

A Regular expression (regex) filter for sensitive information.

## Example

```ts
const regexFilter: RegexFilter = {
  name: "my-custom-filter",
  action: SensitiveInfoGuardrailAction.BLOCK,
  pattern: "\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b",
};
```

## Properties

### action

> `readonly` **action**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a regex match is detected.

***

### description?

> `readonly` `optional` **description**: `string`

The description of the regex filter.

***

### name

> `readonly` **name**: `string`

The name of the regex filter.

***

### pattern

> `readonly` **pattern**: `string`

The regular expression pattern to match.
