[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentProps

# Interface: AgentProps

[bedrock](../modules/bedrock.md).AgentProps

Properties for a Bedrock Agent.

## Table of contents

### Properties

- [actionGroups](bedrock.AgentProps.md#actiongroups)
- [aliasName](bedrock.AgentProps.md#aliasname)
- [description](bedrock.AgentProps.md#description)
- [enableUserInput](bedrock.AgentProps.md#enableuserinput)
- [encryptionKey](bedrock.AgentProps.md#encryptionkey)
- [foundationModel](bedrock.AgentProps.md#foundationmodel)
- [idleSessionTTL](bedrock.AgentProps.md#idlesessionttl)
- [instruction](bedrock.AgentProps.md#instruction)
- [knowledgeBases](bedrock.AgentProps.md#knowledgebases)
- [name](bedrock.AgentProps.md#name)
- [promptOverrideConfiguration](bedrock.AgentProps.md#promptoverrideconfiguration)
- [shouldPrepareAgent](bedrock.AgentProps.md#shouldprepareagent)
- [tags](bedrock.AgentProps.md#tags)

## Properties

### actionGroups

• `Optional` `Readonly` **actionGroups**: [`AgentActionGroup`](../classes/bedrock.AgentActionGroup.md)[]

AgentActionGroup to make available to the agent.

**`Default`**

```ts
- No AgentActionGroup  is used.
```

___

### aliasName

• `Optional` `Readonly` **aliasName**: `string`

Name of the alias for the agent.

**`Default`**

```ts
- No alias is created.
```

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the agent.

**`Default`**

```ts
- No description is provided.
```

___

### enableUserInput

• `Optional` `Readonly` **enableUserInput**: `boolean`

Select whether the agent can prompt additional
information from the user when it does not have
enough information to respond to an utterance

**`Default`**

```ts
- False
```

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

KMS encryption key to use for the agent.

**`Default`**

```ts
- An AWS managed key is used.
```

___

### foundationModel

• `Readonly` **foundationModel**: [`BedrockFoundationModel`](../classes/foundation_models.BedrockFoundationModel.md)

The Bedrock text foundation model for the agent to use.

___

### idleSessionTTL

• `Optional` `Readonly` **idleSessionTTL**: `Duration`

How long sessions should be kept open for the agent.

**`Default`**

```ts
- 1 hour
```

___

### instruction

• `Readonly` **instruction**: `string`

A narrative instruction to provide the agent as context.

___

### knowledgeBases

• `Optional` `Readonly` **knowledgeBases**: [`KnowledgeBase`](../classes/bedrock.KnowledgeBase.md)[]

Knowledge Bases to make available to the agent.

**`Default`**

```ts
- No knowledge base is used.
```

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the agent.

**`Default`**

```ts
- A name is automatically generated.
```

___

### promptOverrideConfiguration

• `Optional` `Readonly` **promptOverrideConfiguration**: [`PromptOverrideConfiguration`](bedrock.PromptOverrideConfiguration.md)

Overrides for the agent.

**`Default`**

```ts
- No overrides are provided.
```

___

### shouldPrepareAgent

• `Optional` `Readonly` **shouldPrepareAgent**: `boolean`

Whether to prepare the agent for use.

**`Default`**

```ts
- false
```

___

### tags

• `Optional` `Readonly` **tags**: `Record`\<`string`, `string`\>

OPTIONAL: Tag (KEY-VALUE) bedrock agent resource

**`Default`**

```ts
- false
```
