[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / Agent

# Class: Agent

[bedrock](../modules/bedrock.md).Agent

Deploy a Bedrock Agent.

## Hierarchy

- `Construct`

  ↳ **`Agent`**

## Table of contents

### Constructors

- [constructor](bedrock.Agent.md#constructor)

### Properties

- [actionGroups](bedrock.Agent.md#actiongroups)
- [agentArn](bedrock.Agent.md#agentarn)
- [agentId](bedrock.Agent.md#agentid)
- [agentInstance](bedrock.Agent.md#agentinstance)
- [aliasArn](bedrock.Agent.md#aliasarn)
- [aliasId](bedrock.Agent.md#aliasid)
- [aliasName](bedrock.Agent.md#aliasname)
- [knowledgeBases](bedrock.Agent.md#knowledgebases)
- [name](bedrock.Agent.md#name)
- [node](bedrock.Agent.md#node)
- [resourceUpdates](bedrock.Agent.md#resourceupdates)
- [role](bedrock.Agent.md#role)

### Methods

- [\_addAliasDependency](bedrock.Agent.md#_addaliasdependency)
- [addActionGroups](bedrock.Agent.md#addactiongroups)
- [addAlias](bedrock.Agent.md#addalias)
- [addKnowledgeBase](bedrock.Agent.md#addknowledgebase)
- [toString](bedrock.Agent.md#tostring)
- [isConstruct](bedrock.Agent.md#isconstruct)

## Constructors

### constructor

• **new Agent**(`scope`, `id`, `props`): [`Agent`](bedrock.Agent.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AgentProps`](../interfaces/bedrock.AgentProps.md) |

#### Returns

[`Agent`](bedrock.Agent.md)

#### Overrides

Construct.constructor

## Properties

### actionGroups

• `Private` **actionGroups**: `AgentActionGroupProperty`[] = `[]`

A list of action groups associated with the agent

___

### agentArn

• `Readonly` **agentArn**: `string`

The ARN of the agent.

___

### agentId

• `Readonly` **agentId**: `string`

The unique identifier of the agent.

___

### agentInstance

• `Readonly` **agentInstance**: `CfnAgent`

Instance of Agent

___

### aliasArn

• `Optional` `Readonly` **aliasArn**: `string`

The ARN of the agent alias.

___

### aliasId

• `Optional` `Readonly` **aliasId**: `string`

The unique identifier of the agent alias.

___

### aliasName

• `Optional` `Readonly` **aliasName**: `string`

The name for the agent alias.

___

### knowledgeBases

• **knowledgeBases**: `AgentKnowledgeBaseProperty`[] = `[]`

A list of KnowledgeBases associated with the agent.

**`Default`**

```ts
- No knowledge base is used.
```

___

### name

• `Readonly` **name**: `string`

The name of the agent.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### resourceUpdates

• `Private` **resourceUpdates**: `string`[] = `[]`

A list of values to indicate if PrepareAgent or an Alias needs to be updated.

___

### role

• `Readonly` **role**: `Role`

The IAM role for the agent.

## Methods

### \_addAliasDependency

▸ **_addAliasDependency**(`updatedAt`): `void`

Register a dependency for aliases.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `updatedAt` | `string` | The updatedAt of the resource that will be registered as a dependency. This is an internal core function and should not be called directly. |

#### Returns

`void`

___

### addActionGroups

▸ **addActionGroups**(`props`): `void`

Add action group  to the agent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AgentActionGroup`](bedrock.AgentActionGroup.md) |

#### Returns

`void`

___

### addAlias

▸ **addAlias**(`props`): [`AgentAlias`](bedrock.AgentAlias.md)

Add an alias to the agent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AddAgentAliasProps`](../interfaces/bedrock.AddAgentAliasProps.md) |

#### Returns

[`AgentAlias`](bedrock.AgentAlias.md)

___

### addKnowledgeBase

▸ **addKnowledgeBase**(`kb`): `void`

Add knowledge base to the agent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `kb` | [`KnowledgeBase`](bedrock.KnowledgeBase.md) |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

___

### isConstruct

▸ **isConstruct**(`x`): x is Construct

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

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct
