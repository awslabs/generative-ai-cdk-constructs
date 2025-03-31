[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / IInvokable

# Interface: IInvokable

Represents an Amazon Bedrock abstraction on which you can
run the `Invoke` API. This can be a Foundational Model,
a Custom Model, or an Inference Profile.

## Properties

### invokableArn

> `readonly` **invokableArn**: `string`

The ARN of the Bedrock invokable abstraction.

## Methods

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the invokable abstraction.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`
