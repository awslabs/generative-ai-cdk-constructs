[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentCollaboratorProps

# Interface: AgentCollaboratorProps

***************************************************************************
                   PROPS - Agent Collaborator Class
***************************************************************************

## Properties

### agentAlias

> `readonly` **agentAlias**: [`IAgentAlias`](IAgentAlias.md)

Descriptor for the collaborating agent.
This cannot be the TSTALIASID (`agent.testAlias`).

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

> `readonly` `optional` **relayConversationHistory**: `boolean`

Whether to relay conversation history to this collaborator.

#### Default

```ts
- undefined (uses service default)
```
