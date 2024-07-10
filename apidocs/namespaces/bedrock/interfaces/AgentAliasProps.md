[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentAliasProps

# Interface: AgentAliasProps

## Properties

### agentId

> `readonly` **agentId**: `string`

The unique identifier of the agent.

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
- 'latest'
```

***

### description?

> `readonly` `optional` **description**: `string`

Description for the agent alias.

***

### resourceUpdates?

> `readonly` `optional` **resourceUpdates**: `string`[]

The list of resource update timestamps to let CloudFormation determine when to update the alias.

***

### tags?

> `readonly` `optional` **tags**: `Record`\<`string`, `string`\>

OPTIONAL: Tag (KEY-VALUE) bedrock agent resource

#### Default

```ts
- false
```
