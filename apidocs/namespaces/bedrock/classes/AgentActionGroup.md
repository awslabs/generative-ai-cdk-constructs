[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentActionGroup

# Class: AgentActionGroup

## Extends

- `Construct`

## Constructors

### new AgentActionGroup()

> **new AgentActionGroup**(`scope`, `id`, `props`): [`AgentActionGroup`](AgentActionGroup.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`AgentActionGroupProps`](../interfaces/AgentActionGroupProps.md)

#### Returns

[`AgentActionGroup`](AgentActionGroup.md)

#### Overrides

`Construct.constructor`

## Properties

### actionGroupExecutor

> `readonly` **actionGroupExecutor**: `undefined` \| [`ActionGroupExecutor`](../interfaces/ActionGroupExecutor.md)

The Lambda function containing the business logic that is carried out upon invoking the action.

***

### actionGroupName

> `readonly` **actionGroupName**: `string`

The unique identifier of the action group.

***

### actionGroupProperty

> `readonly` **actionGroupProperty**: `AgentActionGroupProperty`

The action group.

***

### actionGroupState

> `readonly` **actionGroupState**: `undefined` \| `string`

The action group state.

***

### apiSchema

> `readonly` **apiSchema**: `undefined` \| [`ApiSchemaConfig`](../interfaces/ApiSchemaConfig.md)

The API schema.

***

### description

> `readonly` **description**: `undefined` \| `string`

The description.

***

### functionSchema

> `readonly` **functionSchema**: `undefined` \| `FunctionSchemaProperty`

A list of action groups associated with the agent

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### parentActionGroupSignature

> `readonly` **parentActionGroupSignature**: `undefined` \| `string`

The parent action group signature.

***

### skipResourceInUseCheckOnDelete

> `readonly` **skipResourceInUseCheckOnDelete**: `undefined` \| `boolean`

The skip resource in use check on delete.

#### Default

```ts
- false
```

## Methods

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

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
