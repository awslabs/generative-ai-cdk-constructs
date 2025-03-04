[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentCollaborator

# Interface: AgentCollaborator

Settings for agent collaboration with other agents.

## Properties

### agentDescriptor

> `readonly` **agentDescriptor**: [`AgentDescriptor`](AgentDescriptor.md)

Descriptor for the collaborating agent.

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
