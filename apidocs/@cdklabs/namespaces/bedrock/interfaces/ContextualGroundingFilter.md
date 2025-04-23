[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ContextualGroundingFilter

# Interface: ContextualGroundingFilter

Interface to define a Contextual Grounding Filter.

## Properties

### action?

> `readonly` `optional` **action**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when contextual grounding is detected.

***

### enabled?

> `readonly` `optional` **enabled**: `boolean`

Whether the contextual grounding filter is enabled.

***

### threshold

> `readonly` **threshold**: `number`

The threshold for the contextual grounding filter.
- `0` (blocks nothing)
- `0.99` (blocks almost everything)

***

### type

> `readonly` **type**: [`ContextualGroundingFilterType`](../enumerations/ContextualGroundingFilterType.md)

The type of contextual grounding filter.
