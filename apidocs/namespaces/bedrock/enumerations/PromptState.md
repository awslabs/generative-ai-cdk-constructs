[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptState

# Enumeration: PromptState

Specifies whether to allow the agent to carry out the step specified in the
promptType. If you set this value to DISABLED, the agent skips that step.
The default state for each promptType is as follows.

    PRE_PROCESSING – ENABLED
    ORCHESTRATION – ENABLED
    KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
    POST_PROCESSING – DISABLED

## Enumeration Members

### DISABLED

> **DISABLED**: `"DISABLED"`

***

### ENABLED

> **ENABLED**: `"ENABLED"`
