[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / GuardrailProps

# Interface: GuardrailProps

[bedrock](../modules/bedrock.md).GuardrailProps

Bedrock guardrail props

## Table of contents

### Properties

- [blockedInputMessaging](bedrock.GuardrailProps.md#blockedinputmessaging)
- [blockedOutputsMessaging](bedrock.GuardrailProps.md#blockedoutputsmessaging)
- [description](bedrock.GuardrailProps.md#description)
- [filtersConfig](bedrock.GuardrailProps.md#filtersconfig)
- [kmsKeyArn](bedrock.GuardrailProps.md#kmskeyarn)
- [name](bedrock.GuardrailProps.md#name)
- [piiConfig](bedrock.GuardrailProps.md#piiconfig)
- [tags](bedrock.GuardrailProps.md#tags)

## Properties

### blockedInputMessaging

• `Readonly` **blockedInputMessaging**: `string`

The message to return when the guardrail blocks a prompt.

___

### blockedOutputsMessaging

• `Readonly` **blockedOutputsMessaging**: `string`

The message to return when the guardrail blocks a model response.

___

### description

• `Optional` `Readonly` **description**: `string`

The description of the guardrail.

___

### filtersConfig

• `Optional` `Readonly` **filtersConfig**: [`ContentPolicyConfigProps`](bedrock.ContentPolicyConfigProps.md)[]

List of content filter configs in content policy.

___

### kmsKeyArn

• `Optional` `Readonly` **kmsKeyArn**: `string`

The ARN of the AWS KMS key used to encrypt the guardrail.

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the guardrail.

___

### piiConfig

• `Optional` `Readonly` **piiConfig**: [`SensitiveInformationPolicyConfigProps`](bedrock.SensitiveInformationPolicyConfigProps.md)[]

PII fields which needs to be masked.

___

### tags

• `Optional` `Readonly` **tags**: `CfnTag`[]

Metadata that you can assign to a guardrail as key-value pairs
