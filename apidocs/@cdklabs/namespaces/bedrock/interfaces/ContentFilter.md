[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ContentFilter

# Interface: ContentFilter

Interface to declare a content filter.

## Properties

### inputModalities?

> `readonly` `optional` **inputModalities**: [`ModalityType`](../enumerations/ModalityType.md)[]

The input modalities to apply the content filter to.

#### Default

```ts
undefined - Applies to all input modalities
```

***

### inputStrength

> `readonly` **inputStrength**: [`ContentFilterStrength`](../enumerations/ContentFilterStrength.md)

The strength of the content filter to apply to prompts / user input.

***

### outputModalities?

> `readonly` `optional` **outputModalities**: [`ModalityType`](../enumerations/ModalityType.md)[]

The output modalities to apply the content filter to.

#### Default

```ts
undefined - Applies to all output modalities
```

***

### outputStrength

> `readonly` **outputStrength**: [`ContentFilterStrength`](../enumerations/ContentFilterStrength.md)

The strength of the content filter to apply to model responses.

***

### type

> `readonly` **type**: [`ContentFilterType`](../enumerations/ContentFilterType.md)

The type of harmful category that the content filter is applied to
