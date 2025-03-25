[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangfuseVpcInfra

# Class: LangfuseVpcInfra

Example construct to deploy shared networking infrastructure for the Langfuse sample

You don't need to use this construct if you'd prefer to deploy in your own existing VPC, but can
use it as a guide for building a compatible network.

Note: VPC Flow Logging is not a hard requirement for the Langfuse solution, but is enabled as a
security best-practice for cdk-nag: https://github.com/cdklabs/cdk-nag

## Extends

- `Construct`

## Constructors

### new LangfuseVpcInfra()

> **new LangfuseVpcInfra**(`scope`, `id`, `props`): [`LangfuseVpcInfra`](LangfuseVpcInfra.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`ILangfuseVpcInfraProps`](../interfaces/ILangfuseVpcInfraProps.md) = `{}`

#### Returns

[`LangfuseVpcInfra`](LangfuseVpcInfra.md)

#### Overrides

`Construct.constructor`

## Properties

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### vpc

> **vpc**: `IVpc`

***

### vpcFlowLog

> **vpcFlowLog**: `FlowLog`

***

### vpcFlowLogGroup

> **vpcFlowLogGroup**: `ILogGroup`

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
