[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / IInferenceProfile

# Interface: IInferenceProfile

Represents a ApplicationInferenceProfile, either created with CDK or imported.

## Properties

### inferenceProfileArn

> `readonly` **inferenceProfileArn**: `string`

The ARN of the application inference profile.

***

### inferenceProfileId

> `readonly` **inferenceProfileId**: `string`

The unique identifier of the inference profile.

***

### type

> `readonly` **type**: [`InferenceProfileType`](../enumerations/InferenceProfileType.md)

The type of inference profile.

## Methods

### grantProfileUsage()

> **grantProfileUsage**(`grantee`): `Grant`

Grants appropriate permissions to use the inference profile.

#### Parameters

• **grantee**: `IGrantable`

#### Returns

`Grant`
