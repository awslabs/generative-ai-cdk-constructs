[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / FoundationModelParsingStategyProps

# Interface: FoundationModelParsingStategyProps

Properties for configuring a Foundation Model parsing strategy.

## Properties

### parsingModality?

> `readonly` `optional` **parsingModality**: [`MULTIMODAL`](../enumerations/ParsingModality.md#multimodal)

Specifies whether to enable parsing of multimodal data, including both text and/or images.

#### Default

```ts
undefined - Text only
```

***

### parsingModel

> `readonly` **parsingModel**: [`IInvokable`](IInvokable.md)

The Foundation Model to use for parsing non-textual information.
Currently supported models are Claude 3 Sonnet and Claude 3 Haiku.

***

### parsingPrompt?

> `readonly` `optional` **parsingPrompt**: `string`

Custom prompt to instruct the parser on how to interpret the document.

#### Default

```ts
- Uses the default instruction prompt as provided in the AWS Console.
```
