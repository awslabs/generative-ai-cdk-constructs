[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentActionGroup

# Class: AgentActionGroup

***************************************************************************
                        DEF - Action Group Class
***************************************************************************

## Constructors

### new AgentActionGroup()

> **new AgentActionGroup**(`props`): [`AgentActionGroup`](AgentActionGroup.md)

#### Parameters

##### props

[`AgentActionGroupProps`](../interfaces/AgentActionGroupProps.md)

#### Returns

[`AgentActionGroup`](AgentActionGroup.md)

## Properties

### apiSchema?

> `readonly` `optional` **apiSchema**: [`ApiSchema`](ApiSchema.md)

The api schema for this action group (if defined).

***

### description?

> `readonly` `optional` **description**: `string`

A description of the action group.

***

### enabled

> `readonly` **enabled**: `boolean`

Whether this action group is available for the agent to invoke or not.

***

### executor?

> `readonly` `optional` **executor**: [`ActionGroupExecutor`](ActionGroupExecutor.md)

The action group executor for this action group (if defined).

***

### forceDelete?

> `readonly` `optional` **forceDelete**: `boolean`

Whether to delete the resource even if it's in use.

***

### functionSchema?

> `readonly` `optional` **functionSchema**: `FunctionSchemaProperty`

The function schema for this action group (if defined).

***

### name

> `readonly` **name**: `string`

The name of the action group.

***

### parentActionGroupSignature?

> `readonly` `optional` **parentActionGroupSignature**: [`ParentActionGroupSignature`](ParentActionGroupSignature.md)

The AWS Defined signature (if defined).

## Methods

### \_render()

> **\_render**(): `AgentActionGroupProperty`

**`Internal`**

Format as CFN properties

 This is an internal core function and should not be called directly.

#### Returns

`AgentActionGroupProperty`

***

### codeInterpreter()

> `static` **codeInterpreter**(`enabled`): [`AgentActionGroup`](AgentActionGroup.md)

Defines an action group that allows your agent to request the user for
additional information when trying to complete a task.

#### Parameters

##### enabled

`boolean`

Specifies whether the action group is available for the agent

#### Returns

[`AgentActionGroup`](AgentActionGroup.md)

***

### userInput()

> `static` **userInput**(`enabled`): [`AgentActionGroup`](AgentActionGroup.md)

Defines an action group that allows your agent to request the user for
additional information when trying to complete a task.

#### Parameters

##### enabled

`boolean`

Specifies whether the action group is available for the agent

#### Returns

[`AgentActionGroup`](AgentActionGroup.md)
