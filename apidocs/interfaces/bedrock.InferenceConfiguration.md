[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / InferenceConfiguration

# Interface: InferenceConfiguration

[bedrock](../modules/bedrock.md).InferenceConfiguration

LLM inference configuration

## Table of contents

### Properties

- [maximumLength](bedrock.InferenceConfiguration.md#maximumlength)
- [stopSequences](bedrock.InferenceConfiguration.md#stopsequences)
- [temperature](bedrock.InferenceConfiguration.md#temperature)
- [topK](bedrock.InferenceConfiguration.md#topk)
- [topP](bedrock.InferenceConfiguration.md#topp)

## Properties

### maximumLength

• `Readonly` **maximumLength**: `number`

The maximum number of tokens to generate in the response.

Integer

**`Min`**

0

**`Max`**

4096

#### Defined in

[src/cdk-lib/bedrock/agent.ts:134](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L134)

___

### stopSequences

• `Readonly` **stopSequences**: `string`[]

A list of stop sequences. A stop sequence is a sequence of characters that
causes the model to stop generating the response.

**`Length`**

0-4

#### Defined in

[src/cdk-lib/bedrock/agent.ts:125](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L125)

___

### temperature

• `Readonly` **temperature**: `number`

The likelihood of the model selecting higher-probability options while
generating a response. A lower value makes the model more likely to choose
higher-probability options, while a higher value makes the model more
likely to choose lower-probability options.

Floating point

**`Min`**

0

**`Max`**

1

#### Defined in

[src/cdk-lib/bedrock/agent.ts:91](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L91)

___

### topK

• `Readonly` **topK**: `number`

While generating a response, the model determines the probability of the
following token at each point of generation. The value that you set for
topK is the number of most-likely candidates from which the model chooses
the next token in the sequence. For example, if you set topK to 50, the
model selects the next token from among the top 50 most likely choices.

Integer

**`Min`**

0

**`Max`**

500

#### Defined in

[src/cdk-lib/bedrock/agent.ts:118](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L118)

___

### topP

• `Readonly` **topP**: `number`

While generating a response, the model determines the probability of the
following token at each point of generation. The value that you set for
Top P determines the number of most-likely candidates from which the model
chooses the next token in the sequence. For example, if you set topP to
80, the model only selects the next token from the top 80% of the
probability distribution of next tokens.

Floating point

**`Min`**

0

**`Max`**

1

#### Defined in

[src/cdk-lib/bedrock/agent.ts:105](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L105)
