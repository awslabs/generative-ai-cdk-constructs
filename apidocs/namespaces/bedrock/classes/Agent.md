[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / Agent

# Class: Agent

Deploy a Bedrock Agent.

## Extends

- `Construct`

## Constructors

### new Agent()

> **new Agent**(`scope`, `id`, `props`): [`Agent`](Agent.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: [`AgentProps`](../interfaces/AgentProps.md)

#### Returns

[`Agent`](Agent.md)

#### Overrides

`Construct.constructor`

## Properties

### agentArn

> `readonly` **agentArn**: `string`

The ARN of the agent.

***

### agentId

> `readonly` **agentId**: `string`

The unique identifier of the agent.

***

### agentInstance

> `readonly` **agentInstance**: `CfnAgent`

Instance of Agent

***

### agentversion

> `readonly` **agentversion**: `string`

The version for the agent

***

### aliasArn?

> `readonly` `optional` **aliasArn**: `string`

The ARN of the agent alias.

***

### aliasId?

> `readonly` `optional` **aliasId**: `string`

The unique identifier of the agent alias.

***

### aliasName?

> `readonly` `optional` **aliasName**: `string`

The name for the agent alias.

***

### knowledgeBases

> **knowledgeBases**: `AgentKnowledgeBaseProperty`[] = `[]`

A list of KnowledgeBases associated with the agent.

#### Default

```ts
- No knowledge base is used.
```

***

### name

> `readonly` **name**: `string`

The name of the agent.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### role

> `readonly` **role**: `Role`

The IAM role for the agent.

## Methods

### \_addAliasDependency()

> **\_addAliasDependency**(`updatedAt`): `void`

**`Internal`**

Register a dependency for aliases.

#### Parameters

• **updatedAt**: `string`

The updatedAt of the resource that will be registered as a dependency.

 This is an internal core function and should not be called directly.

#### Returns

`void`

***

### addActionGroup()

> **addActionGroup**(`actionGroup`): `void`

Add action group to the agent.

#### Parameters

• **actionGroup**: [`AgentActionGroup`](AgentActionGroup.md)

#### Returns

`void`

***

### addActionGroups()

> **addActionGroups**(`actionGroups`): `void`

Add action groups to the agent.

#### Parameters

• **actionGroups**: [`AgentActionGroup`](AgentActionGroup.md)[]

#### Returns

`void`

***

### addAlias()

> **addAlias**(`props`): [`AgentAlias`](AgentAlias.md)

Add an alias to the agent.

#### Parameters

• **props**: [`AddAgentAliasProps`](../interfaces/AddAgentAliasProps.md)

#### Returns

[`AgentAlias`](AgentAlias.md)

***

### addGuardrail()

> **addGuardrail**(`guardrail`): `void`

Add guardrail to the agent.

#### Parameters

• **guardrail**: [`Guardrail`](Guardrail.md)

#### Returns

`void`

***

### addKnowledgeBase()

> **addKnowledgeBase**(`knowledgeBase`): `void`

Add knowledge base to the agent.

#### Parameters

• **knowledgeBase**: [`KnowledgeBase`](KnowledgeBase.md)

#### Returns

`void`

***

### addKnowledgeBases()

> **addKnowledgeBases**(`knowledgeBases`): `void`

Add knowledge bases to the agent.

#### Parameters

• **knowledgeBases**: [`KnowledgeBase`](KnowledgeBase.md)[]

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

• **x**: `any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
