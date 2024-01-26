[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / ParserMode

# Enumeration: ParserMode

[bedrock](../modules/bedrock.md).ParserMode

Specifies whether to override the default parser Lambda function when
parsing the raw foundation model output in the part of the agent sequence
defined by the promptType. If you set the field as OVERRIDEN, the
overrideLambda field in the PromptOverrideConfiguration must be specified
with the ARN of a Lambda function.

## Table of contents

### Enumeration Members

- [DEFAULT](bedrock.ParserMode.md#default)
- [OVERRIDDEN](bedrock.ParserMode.md#overridden)

## Enumeration Members

### DEFAULT

• **DEFAULT** = ``"DEFAULT"``

___

### OVERRIDDEN

• **OVERRIDDEN** = ``"OVERRIDDEN"``
