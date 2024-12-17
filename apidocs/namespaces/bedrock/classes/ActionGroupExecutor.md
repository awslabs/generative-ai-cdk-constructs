[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ActionGroupExecutor

# Class: ActionGroupExecutor

Defines how fulfillment of the action group is handled after the necessary
information has been elicited from the user.
Valid executors are:
- Lambda function
- Return Control

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/action-handle.html

## Properties

### customControl?

> `readonly` `optional` **customControl**: `string`

***

### lambdaFunction?

> `readonly` `optional` **lambdaFunction**: `IFunction`

***

### RETURN\_CONTROL

> `readonly` `static` **RETURN\_CONTROL**: [`ActionGroupExecutor`](ActionGroupExecutor.md)

Returns the action group invocation results directly in the InvokeAgent response.
The information and parameters can be sent to your own systems to yield results.

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/agents-returncontrol.html

## Methods

### \_render()

> **\_render**(): `ActionGroupExecutorProperty`

**`Internal`**

Format as CFN properties

 This is an internal core function and should not be called directly.

#### Returns

`ActionGroupExecutorProperty`

***

### fromlambdaFunction()

> `static` **fromlambdaFunction**(`lambdaFunction`): [`ActionGroupExecutor`](ActionGroupExecutor.md)

Defines an action group with a Lambda function containing the business logic.

#### Parameters

##### lambdaFunction

`IFunction`

Lambda function to be called by the action group.

#### Returns

[`ActionGroupExecutor`](ActionGroupExecutor.md)

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/agents-lambda.html
