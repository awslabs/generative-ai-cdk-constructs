[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentProps

# Interface: AgentProps

[bedrock](../modules/bedrock.md).AgentProps

Properties for a Bedrock Agent.

## Table of contents

### Properties

- [aliasName](bedrock.AgentProps.md#aliasname)
- [description](bedrock.AgentProps.md#description)
- [encryptionKey](bedrock.AgentProps.md#encryptionkey)
- [foundationModel](bedrock.AgentProps.md#foundationmodel)
- [idleSessionTTL](bedrock.AgentProps.md#idlesessionttl)
- [instruction](bedrock.AgentProps.md#instruction)
- [knowledgeBases](bedrock.AgentProps.md#knowledgebases)
- [name](bedrock.AgentProps.md#name)
- [promptOverrideConfiguration](bedrock.AgentProps.md#promptoverrideconfiguration)

## Properties

### aliasName

• `Optional` `Readonly` **aliasName**: `string`

Name of the alias for the agent.

**`Default`**

```ts
- No alias is created.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:254](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L254)

___

### description

• `Optional` `Readonly` **description**: `string`

A description of the agent.

**`Default`**

```ts
- No description is provided.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:224](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L224)

___

### encryptionKey

• `Optional` `Readonly` **encryptionKey**: `IKey`

KMS encryption key to use for the agent.

**`Default`**

```ts
- An AWS managed key is used.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:242](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L242)

___

### foundationModel

• `Readonly` **foundationModel**: [`BedrockFoundationModel`](../classes/bedrock.BedrockFoundationModel.md)

The Bedrock text foundation model for the agent to use.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:208](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L208)

___

### idleSessionTTL

• `Optional` `Readonly` **idleSessionTTL**: `Duration`

How long sessions should be kept open for the agent.

**`Default`**

```ts
- 1 hour
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:236](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L236)

___

### instruction

• `Readonly` **instruction**: `string`

A narrative instruction to provide the agent as context.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:218](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L218)

___

### knowledgeBases

• `Optional` `Readonly` **knowledgeBases**: [`KnowledgeBase`](../classes/bedrock.KnowledgeBase.md)[]

Knowledge Bases to make available to the agent.

**`Default`**

```ts
- No knowledge base is used.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:230](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L230)

___

### name

• `Optional` `Readonly` **name**: `string`

The name of the agent.

**`Default`**

```ts
- A name is automatically generated.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:214](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L214)

___

### promptOverrideConfiguration

• `Optional` `Readonly` **promptOverrideConfiguration**: [`PromptOverrideConfiguration`](bedrock.PromptOverrideConfiguration.md)

Overrides for the agent.

**`Default`**

```ts
- No overrides are provided.
```

#### Defined in

[src/cdk-lib/bedrock/agent.ts:248](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L248)
