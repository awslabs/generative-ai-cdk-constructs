[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ContextualGroundingPolicyConfigProps

# Interface: ContextualGroundingPolicyConfigProps

## Properties

### filtersConfigType

> `readonly` **filtersConfigType**: [`ContextualGroundingFilterConfigType`](../enumerations/ContextualGroundingFilterConfigType.md)

The filter details for the guardrails contextual grounding filter. 
GROUNDING: Validate if the model responses are grounded and factually correct based on the information provided in the reference source, 
and block responses that are below the defined threshold of grounding.
RELEVANCE: Validate if the model responses are relevant to the user's query and block responses 
that are below the defined threshold of relevance.

***

### threshold

> `readonly` **threshold**: `number`

The threshold details for the guardrails contextual grounding filter.
0 blocks nothing, 0.99 blocks almost everything
