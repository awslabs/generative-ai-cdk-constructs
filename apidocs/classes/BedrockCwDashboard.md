[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BedrockCwDashboard

# Class: BedrockCwDashboard

The BedrockCwDashboard class.

## Extends

- `Construct`

## Constructors

### new BedrockCwDashboard()

> **new BedrockCwDashboard**(`scope`, `id`, `props`): [`BedrockCwDashboard`](BedrockCwDashboard.md)

Constructs a new instance of the BedrockCwDashboard class.

#### Parameters

• **scope**: `Construct`

represents the scope for all the resources.

• **id**: `string`

this is a a scope-unique id.

• **props**: [`BedrockCwDashboardProps`](../interfaces/BedrockCwDashboardProps.md) = `{}`

user provided props for the construct.

#### Returns

[`BedrockCwDashboard`](BedrockCwDashboard.md)

#### Since

0.0.0

#### Overrides

`Construct.constructor`

## Properties

### dashboard

> `readonly` **dashboard**: `Dashboard`

Returns the instance of CloudWatch dashboard used by the construct

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

## Methods

### addAllModelsMonitoring()

> **addAllModelsMonitoring**(`props`): `void`

#### Parameters

• **props**: [`ModelMonitoringProps`](../interfaces/ModelMonitoringProps.md) = `{}`

#### Returns

`void`

***

### addModelMonitoring()

> **addModelMonitoring**(`modelName`, `modelId`, `props`): `void`

#### Parameters

• **modelName**: `string`

• **modelId**: `string`

• **props**: [`ModelMonitoringProps`](../interfaces/ModelMonitoringProps.md) = `{}`

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
