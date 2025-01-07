[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptRouter

# Class: PromptRouter

Represents an Amazon Bedrock abstraction on which you can
run the `Invoke` API. This can be a Foundational Model,
a Custom Model, or an Inference Profile.

## Implements

- [`IInvokable`](../interfaces/IInvokable.md)
- [`IPromptRouter`](../interfaces/IPromptRouter.md)

## Constructors

### new PromptRouter()

> **new PromptRouter**(`props`, `region`): [`PromptRouter`](PromptRouter.md)

#### Parameters

##### props

[`PromptRouterProps`](../interfaces/PromptRouterProps.md)

##### region

`string`

#### Returns

[`PromptRouter`](PromptRouter.md)

## Properties

### invokableArn

> `readonly` **invokableArn**: `string`

The ARN of the Bedrock invokable abstraction.

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`invokableArn`](../interfaces/IInvokable.md#invokablearn)

***

### promptRouterArn

> `readonly` **promptRouterArn**: `string`

The ARN of the prompt router.

#### Implementation of

[`IPromptRouter`](../interfaces/IPromptRouter.md).[`promptRouterArn`](../interfaces/IPromptRouter.md#promptrouterarn)

***

### promptRouterId

> `readonly` **promptRouterId**: `string`

The Id of the prompt router.

#### Implementation of

[`IPromptRouter`](../interfaces/IPromptRouter.md).[`promptRouterId`](../interfaces/IPromptRouter.md#promptrouterid)

***

### routingEndpoints

> `readonly` **routingEndpoints**: [`IInvokable`](../interfaces/IInvokable.md)[]

The foundation models / profiles this router will route to.

#### Implementation of

[`IPromptRouter`](../interfaces/IPromptRouter.md).[`routingEndpoints`](../interfaces/IPromptRouter.md#routingendpoints)

## Methods

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Gives the appropriate policies to invoke and use the invokable abstraction.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Implementation of

[`IInvokable`](../interfaces/IInvokable.md).[`grantInvoke`](../interfaces/IInvokable.md#grantinvoke)

***

### fromDefaultId()

> `static` **fromDefaultId**(`defaultRouter`, `region`): [`PromptRouter`](PromptRouter.md)

#### Parameters

##### defaultRouter

[`DefaultPromptRouterIdentifier`](DefaultPromptRouterIdentifier.md)

##### region

`string`

#### Returns

[`PromptRouter`](PromptRouter.md)
