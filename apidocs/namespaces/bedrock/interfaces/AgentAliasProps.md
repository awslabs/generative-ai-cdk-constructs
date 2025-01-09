[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentAliasProps

# Interface: AgentAliasProps

Properties for creating a CDK-Managed Agent Alias.

## Properties

### agent

> `readonly` **agent**: [`IAgent`](IAgent.md)

The agent associated to this alias.

***

### agentVersion?

> `readonly` `optional` **agentVersion**: `string`

The version of the agent to associate with the agent alias.

#### Default

```ts
- Creates a new version of the agent.
```

***

### aliasName?

> `readonly` `optional` **aliasName**: `string`

The name for the agent alias.

#### Default

```ts
- "latest"
```

***

### description?

> `readonly` `optional` **description**: `string`

Description for the agent alias.
