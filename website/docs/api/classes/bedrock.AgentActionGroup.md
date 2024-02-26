[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / AgentActionGroup

# Class: AgentActionGroup

[bedrock](/docs/api/modules/bedrock.md).AgentActionGroup

## Hierarchy

- `Construct`

  ↳ **`AgentActionGroup`**

## Constructors

### constructor

• **new AgentActionGroup**(`scope`, `id`, `props`): [`AgentActionGroup`](bedrock.AgentActionGroup.md)

#### Parameters

| Name | Type                                                                             |
| :------ |:---------------------------------------------------------------------------------|
| `scope` | `Construct`                                                                      |
| `id` | `string`                                                                         |
| `props` | [`AgentActionGroupProps`](/docs/api/interfaces/bedrock.AgentActionGroupProps.md) |

#### Returns

[`AgentActionGroup`](bedrock.AgentActionGroup.md)

#### Overrides

Construct.constructor

## Properties

### actionGroupId

• `Readonly` **actionGroupId**: `string`

The unique identifier of the action group.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

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
