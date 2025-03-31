[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ParentActionGroupSignature

# Class: ParentActionGroupSignature

AWS Defined signatures for enabling certain capabilities in your agent.

## Constructors

### new ParentActionGroupSignature()

> **new ParentActionGroupSignature**(`value`): [`ParentActionGroupSignature`](ParentActionGroupSignature.md)

Constructor should be used as a temporary solution when a new signature is supported
but its implementation in CDK hasn't been added yet.

#### Parameters

##### value

`string`

#### Returns

[`ParentActionGroupSignature`](ParentActionGroupSignature.md)

## Properties

### value

> `readonly` **value**: `string`

***

### CODE\_INTERPRETER

> `readonly` `static` **CODE\_INTERPRETER**: [`ParentActionGroupSignature`](ParentActionGroupSignature.md)

Signature that allows your agent to generate, run, and troubleshoot code when trying to complete a task.

***

### USER\_INPUT

> `readonly` `static` **USER\_INPUT**: [`ParentActionGroupSignature`](ParentActionGroupSignature.md)

Signature that allows your agent to request the user for additional information when trying to complete a task.

## Methods

### toString()

> **toString**(): `string`

#### Returns

`string`
