[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / Agent

# Class: Agent

[bedrock](../modules/bedrock.md).Agent

Deploy a Bedrock Agent.

## Hierarchy

- `Construct`

  ↳ **`Agent`**

## Implements

- `ITaggableV2`

## Table of contents

### Constructors

- [constructor](bedrock.Agent.md#constructor)

### Properties

- [agentArn](bedrock.Agent.md#agentarn)
- [agentId](bedrock.Agent.md#agentid)
- [aliasArn](bedrock.Agent.md#aliasarn)
- [aliasId](bedrock.Agent.md#aliasid)
- [aliasName](bedrock.Agent.md#aliasname)
- [cdkTagManager](bedrock.Agent.md#cdktagmanager)
- [name](bedrock.Agent.md#name)
- [node](bedrock.Agent.md#node)
- [role](bedrock.Agent.md#role)

### Methods

- [addAlias](bedrock.Agent.md#addalias)
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

#### Defined in

[src/cdk-lib/bedrock/agent.ts:295](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L295)

## Properties

### agentArn

• `Readonly` **agentArn**: `string`

The ARN of the agent.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:276](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L276)

___

### agentId

• `Readonly` **agentId**: `string`

The unique identifier of the agent.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:272](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L272)

___

### aliasArn

• `Optional` `Readonly` **aliasArn**: `string`

The ARN of the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:284](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L284)

___

### aliasId

• `Optional` `Readonly` **aliasId**: `string`

The unique identifier of the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:280](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L280)

___

### aliasName

• `Optional` `Readonly` **aliasName**: `string`

The name for the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:288](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L288)

___

### cdkTagManager

• `Readonly` **cdkTagManager**: `TagManager`

TagManager facilitates a common implementation of tagging for Constructs

#### Implementation of

cdk.ITaggableV2.cdkTagManager

#### Defined in

[src/cdk-lib/bedrock/agent.ts:292](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L292)

___

### name

• `Readonly` **name**: `string`

The name of the agent.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:264](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L264)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

___

### role

• `Readonly` **role**: `Role`

The IAM role for the agent.

#### Defined in

[src/cdk-lib/bedrock/agent.ts:268](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L268)

## Methods

### addAlias

▸ **addAlias**(`props`): [`AgentAlias`](bedrock.AgentAlias.md)

Add an alias to the agent.

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`AgentAliasProps`](../interfaces/bedrock.AgentAliasProps.md) |

#### Returns

[`AgentAlias`](bedrock.AgentAlias.md)

#### Defined in

[src/cdk-lib/bedrock/agent.ts:515](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent.ts#L515)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

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

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
