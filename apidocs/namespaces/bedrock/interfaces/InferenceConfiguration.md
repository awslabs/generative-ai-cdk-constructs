[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / InferenceConfiguration

# Interface: InferenceConfiguration

LLM inference configuration

## Properties

### maximumLength

> `readonly` **maximumLength**: `number`

The maximum number of tokens to generate in the response.

Integer

min 0
max 4096

***

### stopSequences

> `readonly` **stopSequences**: `string`[]

A list of stop sequences. A stop sequence is a sequence of characters that
causes the model to stop generating the response.

length 0-4

***

### temperature

> `readonly` **temperature**: `number`

The likelihood of the model selecting higher-probability options while
generating a response. A lower value makes the model more likely to choose
higher-probability options, while a higher value makes the model more
likely to choose lower-probability options.

#### Remarks

Floating point minimum zero `0` and maximum `1`

***

### topK

> `readonly` **topK**: `number`

While generating a response, the model determines the probability of the
following token at each point of generation. The value that you set for
topK is the number of most-likely candidates from which the model chooses
the next token in the sequence. For example, if you set topK to 50, the
model selects the next token from among the top 50 most likely choices.

Integer

min 0
max 500

***

### topP

> `readonly` **topP**: `number`

While generating a response, the model determines the probability of the
following token at each point of generation. The value that you set for
Top P determines the number of most-likely candidates from which the model
chooses the next token in the sequence. For example, if you set topP to
80, the model only selects the next token from the top 80% of the
probability distribution of next tokens.

Floating point

min 0
max 1
