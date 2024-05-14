[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / AgentActionGroup

# Class: AgentActionGroup

[bedrock](../modules/bedrock.md).AgentActionGroup

## Hierarchy

- `Construct`

  ↳ **`AgentActionGroup`**

## Table of contents

### Constructors

- [constructor](bedrock.AgentActionGroup.md#constructor)

### Properties

- [actionGroupExecutor](bedrock.AgentActionGroup.md#actiongroupexecutor)
- [actionGroupName](bedrock.AgentActionGroup.md#actiongroupname)
- [actionGroupProperty](bedrock.AgentActionGroup.md#actiongroupproperty)
- [actionGroupState](bedrock.AgentActionGroup.md#actiongroupstate)
- [apiSchema](bedrock.AgentActionGroup.md#apischema)
- [description](bedrock.AgentActionGroup.md#description)
- [node](bedrock.AgentActionGroup.md#node)
- [parentActionGroupSignature](bedrock.AgentActionGroup.md#parentactiongroupsignature)
- [skipResourceInUseCheckOnDelete](bedrock.AgentActionGroup.md#skipresourceinusecheckondelete)

### Methods

- [toString](bedrock.AgentActionGroup.md#tostring)
- [isConstruct](bedrock.AgentActionGroup.md#isconstruct)

## Constructors

### constructor

• **new AgentActionGroup**(`scope`, `id`, `props`): [`AgentActionGroup`](bedrock.AgentActionGroup.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`AgentActionGroupProps`](../interfaces/bedrock.AgentActionGroupProps.md) |

#### Returns

[`AgentActionGroup`](bedrock.AgentActionGroup.md)

#### Overrides

Construct.constructor

## Properties

### actionGroupExecutor

• `Readonly` **actionGroupExecutor**: `undefined` \| `IFunction`

The Lambda function containing the business logic that is carried out upon invoking the action.

___

### actionGroupName

• `Readonly` **actionGroupName**: `string`

The unique identifier of the action group.

___

### actionGroupProperty

• `Readonly` **actionGroupProperty**: `AgentActionGroupProperty`

The action group.

___

### actionGroupState

• `Readonly` **actionGroupState**: `undefined` \| `string`

The action group state.

___

### apiSchema

• `Readonly` **apiSchema**: `undefined` \| [`ApiSchemaConfig`](../interfaces/bedrock.ApiSchemaConfig.md)

The API schema.

___

### description

• `Readonly` **description**: `undefined` \| `string`

The description.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### parentActionGroupSignature

• `Readonly` **parentActionGroupSignature**: `undefined` \| `string`

The parent action group signature.

___

### skipResourceInUseCheckOnDelete

• `Readonly` **skipResourceInUseCheckOnDelete**: `undefined` \| `boolean`

The skip resource in use check on delete.

**`Default`**

```ts
- false
```

## Methods

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
