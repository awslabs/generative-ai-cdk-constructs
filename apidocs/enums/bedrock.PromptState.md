[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / PromptState

# Enumeration: PromptState

[bedrock](../modules/bedrock.md).PromptState

Specifies whether to allow the agent to carry out the step specified in the
promptType. If you set this value to DISABLED, the agent skips that step.
The default state for each promptType is as follows.

    PRE_PROCESSING – ENABLED
    ORCHESTRATION – ENABLED
    KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
    POST_PROCESSING – DISABLED

## Table of contents

### Enumeration Members

- [DISABLED](bedrock.PromptState.md#disabled)
- [ENABLED](bedrock.PromptState.md#enabled)

## Enumeration Members

### DISABLED

• **DISABLED** = ``"DISABLED"``

___

### ENABLED

• **ENABLED** = ``"ENABLED"``
