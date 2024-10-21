[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / GuardrailAttributes

# Interface: GuardrailAttributes

***************************************************************************
                     ATTRS FOR IMPORTED CONSTRUCT
***************************************************************************

## Properties

### guardrailArn

> `readonly` **guardrailArn**: `string`

The ARN of the guardrail. At least one of guardrailArn or guardrailId must be
defined in order to initialize a guardrail ref.

***

### guardrailVersion?

> `readonly` `optional` **guardrailVersion**: `string`

The version of the guardrail.

#### Default

```ts
"DRAFT"
```

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key of the guardrail if custom encryption is configured.

#### Default

```ts
undefined - Means data is encrypted by default with a AWS-managed key
```
