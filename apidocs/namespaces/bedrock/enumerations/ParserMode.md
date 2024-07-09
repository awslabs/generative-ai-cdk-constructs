[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ParserMode

# Enumeration: ParserMode

Specifies whether to override the default parser Lambda function when
parsing the raw foundation model output in the part of the agent sequence
defined by the promptType. If you set the field as OVERRIDEN, the
overrideLambda field in the PromptOverrideConfiguration must be specified
with the ARN of a Lambda function.

## Enumeration Members

### DEFAULT

> **DEFAULT**: `"DEFAULT"`

***

### OVERRIDDEN

> **OVERRIDDEN**: `"OVERRIDDEN"`
