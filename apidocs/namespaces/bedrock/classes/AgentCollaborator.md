[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentCollaborator

# Class: AgentCollaborator

***************************************************************************
                        DEF - Agent Collaborator Class
***************************************************************************

## Constructors

### new AgentCollaborator()

> **new AgentCollaborator**(`props`): [`AgentCollaborator`](AgentCollaborator.md)

#### Parameters

##### props

[`AgentCollaboratorProps`](../interfaces/AgentCollaboratorProps.md)

#### Returns

[`AgentCollaborator`](AgentCollaborator.md)

## Properties

### agentDescriptor

> `readonly` **agentDescriptor**: [`AgentDescriptor`](../interfaces/AgentDescriptor.md)

***

### collaborationInstruction

> `readonly` **collaborationInstruction**: `string`

Instructions on how this agent should collaborate with the main agent.

***

### collaboratorName

> `readonly` **collaboratorName**: `string`

A friendly name for the collaborator.

***

### relayConversationHistory?

> `readonly` `optional` **relayConversationHistory**: [`RelayConversationHistoryType`](../enumerations/RelayConversationHistoryType.md)

Whether to relay conversation history to this collaborator.

#### Default

```ts
- undefined (uses service default)
```

## Methods

### \_render()

> **\_render**(): `AgentCollaboratorProperty`

**`Internal`**

Format as CFN properties

 This is an internal core function and should not be called directly.

#### Returns

`AgentCollaboratorProperty`

***

### grant()

> **grant**(`grantee`): `Grant`

Grants the specified principal permissions to get the agent alias and invoke the agent
from this collaborator.

#### Parameters

##### grantee

`IGrantable`

The principal to grant permissions to

#### Returns

`Grant`

The Grant object
