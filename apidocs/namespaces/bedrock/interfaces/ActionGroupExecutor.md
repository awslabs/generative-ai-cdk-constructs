[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ActionGroupExecutor

# Interface: ActionGroupExecutor

## Properties

### customControl?

> `readonly` `optional` **customControl**: `string`

To return the action group invocation results directly in the InvokeAgent response, specify RETURN_CONTROL .

***

### lambda?

> `readonly` `optional` **lambda**: `IFunction`

The Lambda function containing the business logic that is carried out upon invoking the action.
