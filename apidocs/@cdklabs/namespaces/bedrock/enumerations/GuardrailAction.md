[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / GuardrailAction

# Enumeration: GuardrailAction

Guardrail action when a sensitive entity is detected.

## Enumeration Members

### ANONYMIZE

> **ANONYMIZE**: `"ANONYMIZE"`

If sensitive information is detected in the model response, the guardrail masks
it with an identifier, the sensitive information is masked and replaced with
identifier tags (for example: [NAME-1], [NAME-2], [EMAIL-1], etc.).

***

### BLOCK

> **BLOCK**: `"BLOCK"`

If sensitive information is detected in the prompt or response, the guardrail
blocks all the content and returns a message that you configure.

***

### NONE

> **NONE**: `"NONE"`

Do not take any action.
