[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / JumpStartSageMakerEndpoint

# Class: JumpStartSageMakerEndpoint

The JumpStartSageMakerEndpoint class.

## Extends

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

## Constructors

### new JumpStartSageMakerEndpoint()

> **new JumpStartSageMakerEndpoint**(`scope`, `id`, `props`): [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`JumpStartSageMakerEndpointProps`](../interfaces/JumpStartSageMakerEndpointProps.md)

#### Returns

[`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Overrides

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`constructor`](SageMakerEndpointBase.md#constructors)

## Properties

### cfnEndpoint

> `readonly` **cfnEndpoint**: `CfnEndpoint`

***

### cfnEndpointConfig

> `readonly` **cfnEndpointConfig**: `CfnEndpointConfig`

***

### cfnModel

> `readonly` **cfnModel**: `CfnModel`

***

### constructUsageMetric

> `readonly` **constructUsageMetric**: `"uksb-1tupboc45"` = `'uksb-1tupboc45'`

construct usage metric , added in template description

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`constructUsageMetric`](SageMakerEndpointBase.md#constructusagemetric)

***

### enablexray

> **enablexray**: `boolean` = `true`

enable disable xray tracing

#### Default

```ts
- True
```

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`enablexray`](SageMakerEndpointBase.md#enablexray)

***

### endpointArn

> `readonly` **endpointArn**: `string`

***

### fieldLogLevel

> **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`fieldLogLevel`](SageMakerEndpointBase.md#fieldloglevel)

***

### grantPrincipal

> `readonly` **grantPrincipal**: `IPrincipal`

***

### instanceCount

> `readonly` **instanceCount**: `number`

***

### instanceType?

> `readonly` `optional` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

***

### lambdaTracing

> **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

#### Default

```ts
- Active
```

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`lambdaTracing`](SageMakerEndpointBase.md#lambdatracing)

***

### model

> `readonly` **model**: [`JumpStartModel`](JumpStartModel.md)

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`node`](SageMakerEndpointBase.md#node)

***

### retention

> **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`retention`](SageMakerEndpointBase.md#retention)

***

### role

> `readonly` **role**: `Role`

***

### stage

> **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`stage`](SageMakerEndpointBase.md#stage)

***

### usageMetricMap

> `protected` `static` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`usageMetricMap`](SageMakerEndpointBase.md#usagemetricmap)

## Methods

### addObservabilityToConstruct()

> `protected` **addObservabilityToConstruct**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`addObservabilityToConstruct`](SageMakerEndpointBase.md#addobservabilitytoconstruct)

***

### addToRolePolicy()

> **addToRolePolicy**(`statement`): `void`

#### Parameters

##### statement

`PolicyStatement`

#### Returns

`void`

***

### createSageMakerRole()

> `protected` **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`createSageMakerRole`](SageMakerEndpointBase.md#createsagemakerrole)

***

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`toString`](SageMakerEndpointBase.md#tostring)

***

### updateConstructUsageMetricCode()

> `protected` **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

##### scope

`Construct`

##### lambdaFunctions

`DockerImageFunction`[]

#### Returns

`void`

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`updateConstructUsageMetricCode`](SageMakerEndpointBase.md#updateconstructusagemetriccode)

***

### updateEnvSuffix()

> `protected` **updateEnvSuffix**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`updateEnvSuffix`](SageMakerEndpointBase.md#updateenvsuffix)

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

[`SageMakerEndpointBase`](SageMakerEndpointBase.md).[`isConstruct`](SageMakerEndpointBase.md#isconstruct)
