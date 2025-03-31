[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ContextualGroundingFilterType

# Enumeration: ContextualGroundingFilterType

The type of contextual grounding filter.

## Enumeration Members

### GROUNDING

> **GROUNDING**: `"GROUNDING"`

Grounding score represents the confidence that the model response is factually
correct and grounded in the source. If the model response has a lower score than
the defined threshold, the response will be blocked and the configured blocked
message will be returned to the user. A higher threshold level blocks more responses.

***

### RELEVANCE

> **RELEVANCE**: `"RELEVANCE"`

Relevance score represents the confidence that the model response is relevant
to the user's query. If the model response has a lower score than the defined
threshold, the response will be blocked and the configured blocked message will
be returned to the user. A higher threshold level blocks more responses.
