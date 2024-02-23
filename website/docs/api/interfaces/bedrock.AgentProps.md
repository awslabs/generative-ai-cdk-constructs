[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / AgentProps

# Interface: AgentProps

[bedrock](/docs/api/modules/bedrock.md).AgentProps

Properties for a Bedrock Agent.

## Properties

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

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

KMS encryption key to use for the agent.

**`Default`**

```ts
- An AWS managed key is used.
```

___

### foundationModel

• `Readonly` **foundationModel**: [`BedrockFoundationModel`](/docs/api/classes/bedrock.BedrockFoundationModel.md)

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

• `Optional` `Readonly` **knowledgeBases**: [`KnowledgeBase`](/docs/api/classes/bedrock.KnowledgeBase.md)[]

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
