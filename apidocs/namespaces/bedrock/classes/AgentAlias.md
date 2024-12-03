[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentAlias

# Class: AgentAlias

Interface for both Imported and CDK-created Agent Aliases.

## Extends

- `Construct`

## Implements

- [`IAgentAlias`](../interfaces/IAgentAlias.md)

## Constructors

### new AgentAlias()

> **new AgentAlias**(`scope`, `id`, `props`): [`AgentAlias`](AgentAlias.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`AgentAliasProps`](../interfaces/AgentAliasProps.md)

#### Returns

[`AgentAlias`](AgentAlias.md)

#### Overrides

`Construct.constructor`

## Properties

### agentId

> `readonly` **agentId**: `string`

The unique identifier of the agent.

#### Implementation of

[`IAgentAlias`](../interfaces/IAgentAlias.md).[`agentId`](../interfaces/IAgentAlias.md#agentid)

***

### aliasArn

> `readonly` **aliasArn**: `string`

The ARN of the agent alias.

#### Example

```ts
`arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN`
```

#### Implementation of

[`IAgentAlias`](../interfaces/IAgentAlias.md).[`aliasArn`](../interfaces/IAgentAlias.md#aliasarn)

***

### aliasId

> `readonly` **aliasId**: `string`

The unique identifier of the agent alias.

#### Example

```ts
`TCLCITFZTN`
```

#### Implementation of

[`IAgentAlias`](../interfaces/IAgentAlias.md).[`aliasId`](../interfaces/IAgentAlias.md#aliasid)

***

### aliasName

> `readonly` **aliasName**: `string`

The name for the agent alias.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

## Methods

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### fromAliasArn()

> `static` **fromAliasArn**(`scope`, `id`, `aliasArn`): [`IAgentAlias`](../interfaces/IAgentAlias.md)

Brings an Agent Alias from an existing one created outside of CDK.

#### Parameters

##### scope

`Construct`

##### id

`string`

##### aliasArn

`string`

#### Returns

[`IAgentAlias`](../interfaces/IAgentAlias.md)

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

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
