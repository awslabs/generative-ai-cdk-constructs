[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / ActionGroupExecutor

# Interface: ActionGroupExecutor

[bedrock](../modules/bedrock.md).ActionGroupExecutor

## Table of contents

### Properties

- [customControl](bedrock.ActionGroupExecutor.md#customcontrol)
- [lambda](bedrock.ActionGroupExecutor.md#lambda)

## Properties

### customControl

• `Optional` `Readonly` **customControl**: `string`

To return the action group invocation results directly in the InvokeAgent response, specify RETURN_CONTROL .

___

### lambda

• `Optional` `Readonly` **lambda**: `IFunction`

The Lambda function containing the business logic that is carried out upon invoking the action.
