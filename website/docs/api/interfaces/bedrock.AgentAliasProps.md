[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / AgentAliasProps

# Interface: AgentAliasProps

[bedrock](/docs/api/modules/bedrock.md).AgentAliasProps

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
