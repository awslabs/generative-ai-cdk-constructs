[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentAlias

# Class: AgentAlias

[bedrock](../modules/bedrock.md).AgentAlias

## Hierarchy

- `Construct`

  ↳ **`AgentAlias`**

## Implements

- `ITaggableV2`

## Table of contents

### Constructors

- [constructor](bedrock.AgentAlias.md#constructor)

### Properties

- [aliasArn](bedrock.AgentAlias.md#aliasarn)
- [aliasId](bedrock.AgentAlias.md#aliasid)
- [aliasName](bedrock.AgentAlias.md#aliasname)
- [cdkTagManager](bedrock.AgentAlias.md#cdktagmanager)
- [node](bedrock.AgentAlias.md#node)

### Methods

- [toString](bedrock.AgentAlias.md#tostring)
- [isConstruct](bedrock.AgentAlias.md#isconstruct)

## Constructors

### constructor

• **new AgentAlias**(`scope`, `id`, `props`): [`AgentAlias`](bedrock.AgentAlias.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AgentAliasProps`](../interfaces/bedrock.AgentAliasProps.md) |

#### Returns

[`AgentAlias`](bedrock.AgentAlias.md)

#### Overrides

Construct.constructor

#### Defined in

[src/cdk-lib/bedrock/agent-alias.ts:64](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent-alias.ts#L64)

## Properties

### aliasArn

• `Readonly` **aliasArn**: `string`

The ARN of the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent-alias.ts:53](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent-alias.ts#L53)

___

### aliasId

• `Readonly` **aliasId**: `string`

The unique identifier of the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent-alias.ts:49](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent-alias.ts#L49)

___

### aliasName

• `Readonly` **aliasName**: `string`

The name for the agent alias.

#### Defined in

[src/cdk-lib/bedrock/agent-alias.ts:57](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent-alias.ts#L57)

___

### cdkTagManager

• `Readonly` **cdkTagManager**: `TagManager`

TagManager facilitates a common implementation of tagging for Constructs

#### Implementation of

cdk.ITaggableV2.cdkTagManager

#### Defined in

[src/cdk-lib/bedrock/agent-alias.ts:61](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/cdk-lib/bedrock/agent-alias.ts#L61)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

## Methods

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
