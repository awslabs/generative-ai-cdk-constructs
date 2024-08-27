[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / GuardrailProps

# Interface: GuardrailProps

Bedrock guardrail props

## Properties

### blockedInputMessaging?

> `readonly` `optional` **blockedInputMessaging**: `string`

The message to return when the guardrail blocks a prompt.

***

### blockedOutputsMessaging?

> `readonly` `optional` **blockedOutputsMessaging**: `string`

The message to return when the guardrail blocks a model response.

***

### contextualGroundingfiltersConfig?

> `readonly` `optional` **contextualGroundingfiltersConfig**: [`ContextualGroundingPolicyConfigProps`](ContextualGroundingPolicyConfigProps.md)[]

Contextual grounding policy config for a guardrail.

***

### description?

> `readonly` `optional` **description**: `string`

The description of the guardrail.

***

### filtersConfig?

> `readonly` `optional` **filtersConfig**: [`ContentPolicyConfigProps`](ContentPolicyConfigProps.md)[]

List of content filter configs in content policy.

***

### kmsKeyArn?

> `readonly` `optional` **kmsKeyArn**: `string`

The ARN of the AWS KMS key used to encrypt the guardrail.

***

### name?

> `readonly` `optional` **name**: `string`

The name of the guardrail.

***

### piiConfig?

> `readonly` `optional` **piiConfig**: [`SensitiveInformationPolicyConfigProps`](SensitiveInformationPolicyConfigProps.md)[]

PII fields which needs to be masked.

***

### tags?

> `readonly` `optional` **tags**: `CfnTag`[]

Metadata that you can assign to a guardrail as key-value pairs
