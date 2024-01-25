[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentAliasProps

# Interface: AgentAliasProps

[bedrock](../modules/bedrock.md).AgentAliasProps

## Table of contents

### Properties

- [agentId](bedrock.AgentAliasProps.md#agentid)
- [agentVersion](bedrock.AgentAliasProps.md#agentversion)
- [aliasName](bedrock.AgentAliasProps.md#aliasname)
- [changeIds](bedrock.AgentAliasProps.md#changeids)

## Properties

### agentId

• `Readonly` **agentId**: `string`

The unique identifier of the agent.

___

### agentVersion

• `Optional` `Readonly` **agentVersion**: `string`

The version of the agent to associate with the agent alias.

**`Default`**

```ts
- Creates a new version of the agent.
```

___

### aliasName

• `Optional` `Readonly` **aliasName**: `string`

The name for the agent alias.

**`Default`**

```ts
- 'latest'
```

___

### changeIds

• `Optional` `Readonly` **changeIds**: `string`[]

The list of change ids to let CloudFormation determine when to update the alias.
A changeId is a hash of the properties of an agent, an agent/knowledge base association, or an action group.
