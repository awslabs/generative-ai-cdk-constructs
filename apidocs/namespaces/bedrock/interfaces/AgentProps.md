[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentProps

# Interface: AgentProps

Properties for a Bedrock Agent.

## Properties

### actionGroups?

> `readonly` `optional` **actionGroups**: [`AgentActionGroup`](../classes/AgentActionGroup.md)[]

AgentActionGroup to make available to the agent.

#### Default

```ts
- No AgentActionGroup  is used.
```

***

### aliasName?

> `readonly` `optional` **aliasName**: `string`

Name of the alias for the agent.

#### Default

```ts
- No alias is created.
```

***

### description?

> `readonly` `optional` **description**: `string`

A description of the agent.

#### Default

```ts
- No description is provided.
```

***

### enableUserInput?

> `readonly` `optional` **enableUserInput**: `boolean`

Select whether the agent can prompt additional
information from the user when it does not have
enough information to respond to an utterance

#### Default

```ts
- False
```

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

KMS encryption key to use for the agent.

#### Default

```ts
- An AWS managed key is used.
```

***

### existingRole?

> `readonly` `optional` **existingRole**: `Role`

The existing IAM Role for the agent with a trust policy that
allows the Bedrock service to assume the role.

***

### guardrailConfiguration?

> `readonly` `optional` **guardrailConfiguration**: [`GuardrailConfiguration`](GuardrailConfiguration.md)

Guardrail configuration

Warning: If you provide a guardrail configuration through the constructor,
you will need to provide the correct permissions for your agent to access
the guardrails. If you want the permissions to be configured on your behalf,
use the addGuardrail method.

#### Default

```ts
- No guardrails associated to the agent.
```

***

### idleSessionTTL?

> `readonly` `optional` **idleSessionTTL**: `Duration`

How long sessions should be kept open for the agent.

#### Default

```ts
- 1 hour
```

***

### instruction

> `readonly` **instruction**: `string`

A narrative instruction to provide the agent as context.

***

### knowledgeBases?

> `readonly` `optional` **knowledgeBases**: [`KnowledgeBase`](../classes/KnowledgeBase.md)[]

Knowledge Bases to make available to the agent.

#### Default

```ts
- No knowledge base is used.
```

***

### model

> `readonly` **model**: [`IInvokable`](IInvokable.md)

The Bedrock text foundation model for the agent to use.

***

### name?

> `readonly` `optional` **name**: `string`

The name of the agent.

#### Default

```ts
- A name is automatically generated.
```

***

### promptOverrideConfiguration?

> `readonly` `optional` **promptOverrideConfiguration**: [`PromptOverrideConfiguration`](PromptOverrideConfiguration.md)

Overrides for the agent.

#### Default

```ts
- No overrides are provided.
```

***

### shouldPrepareAgent?

> `readonly` `optional` **shouldPrepareAgent**: `boolean`

Whether to prepare the agent for use.

#### Default

```ts
- false
```

***

### tags?

> `readonly` `optional` **tags**: `Record`\<`string`, `string`\>

OPTIONAL: Tag (KEY-VALUE) bedrock agent resource

#### Default

```ts
- false
```
