[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / OrchestrationExecutor

# Class: OrchestrationExecutor

Contains details about the Lambda function containing the orchestration logic carried 
out upon invoking the custom orchestration.

## Properties

### lambdaFunction

> `readonly` **lambdaFunction**: `IFunction`

## Methods

### \_render()

> **\_render**(): `OrchestrationExecutorProperty`

**`Internal`**

Format as CFN properties

 This is an internal core function and should not be called directly.

#### Returns

`OrchestrationExecutorProperty`

***

### fromlambdaFunction()

> `static` **fromlambdaFunction**(`lambdaFunction`): [`OrchestrationExecutor`](OrchestrationExecutor.md)

Defines an orchestration executor with a Lambda function containing the business logic.

#### Parameters

##### lambdaFunction

`IFunction`

Lambda function to be called by the orchestration.

#### Returns

[`OrchestrationExecutor`](OrchestrationExecutor.md)
