[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentAliasProps

# Interface: AgentAliasProps

[bedrock](../modules/bedrock.md).AgentAliasProps

## Table of contents

### Properties

- [agentId](bedrock.AgentAliasProps.md#agentid)
- [agentVersion](bedrock.AgentAliasProps.md#agentversion)
- [aliasName](bedrock.AgentAliasProps.md#aliasname)
- [resourceUpdates](bedrock.AgentAliasProps.md#resourceupdates)
- [tags](bedrock.AgentAliasProps.md#tags)

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

### resourceUpdates

• `Optional` `Readonly` **resourceUpdates**: `string`[]

The list of resource update timestamps to let CloudFormation determine when to update the alias.

___

### tags

• `Optional` `Readonly` **tags**: `Record`\<`string`, `string`\>

OPTIONAL: Tag (KEY-VALUE) bedrock agent resource

**`Default`**

```ts
- false
```
