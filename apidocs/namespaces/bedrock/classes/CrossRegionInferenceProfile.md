[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CrossRegionInferenceProfile

# Class: CrossRegionInferenceProfile

Cross-region inference enables you to seamlessly manage unplanned traffic
bursts by utilizing compute across different AWS Regions. With cross-region
inference, you can distribute traffic across multiple AWS Regions, enabling
higher throughput and enhanced resilience during periods of peak demands.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/cross-region-inference.html

## Implements

- [`IInvokable`](../interfaces/IInvokable.md)
- [`IInferenceProfile`](../interfaces/IInferenceProfile.md)

## Properties

### inferenceProfileArn

> `readonly` **inferenceProfileArn**: `string`

#### Example

```ts
'arn:aws:bedrock:us-east-1:123456789012:inference-profile/us.anthropic.claude-3-5-sonnet-20240620-v1:0'
```

#### Implementation of

[`IInferenceProfile`](../interfaces/IInferenceProfile.md).[`inferenceProfileArn`](../interfaces/IInferenceProfile.md#inferenceprofilearn)

***

### inferenceProfileId

> `readonly` **inferenceProfileId**: `string`

#### Example

```ts
'us.anthropic.claude-3-5-sonnet-20240620-v1:0'
```

#### Implementation of

[`IInferenceProfile`](../interfaces/IInferenceProfile.md).[`inferenceProfileId`](../interfaces/IInferenceProfile.md#inferenceprofileid)

***

### inferenceProfileModel

> `readonly` **inferenceProfileModel**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

The underlying model supporting cross-region inference.

***

### invokableArn

> `readonly` **invokableArn**: `string`

This equals to the inferenceProfileArn property, useful just to implement IInvokable interface

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`invokableArn`](../interfaces/IInvokable.md#invokablearn)

***

### type

> `readonly` **type**: [`InferenceProfileType`](../enumerations/InferenceProfileType.md)

#### Example

```ts
InferenceProfileType.SYSTEM_DEFINED
```

#### Implementation of

[`IInferenceProfile`](../interfaces/IInferenceProfile.md).[`type`](../interfaces/IInferenceProfile.md#type)

## Methods

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the Foundation Model.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`grantInvoke`](../interfaces/IInvokable.md#grantinvoke)

***

### grantProfileUsage()

> **grantProfileUsage**(`grantee`): `Grant`

Grants appropriate permissions to use the cross-region inference profile.
Does not grant permissions to use the model in the profile.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Implementation of

[`IInferenceProfile`](../interfaces/IInferenceProfile.md).[`grantProfileUsage`](../interfaces/IInferenceProfile.md#grantprofileusage)

***

### fromConfig()

> `static` **fromConfig**(`config`): [`CrossRegionInferenceProfile`](CrossRegionInferenceProfile.md)

#### Parameters

##### config

[`CrossRegionInferenceProfileProps`](../interfaces/CrossRegionInferenceProfileProps.md)

#### Returns

[`CrossRegionInferenceProfile`](CrossRegionInferenceProfile.md)
