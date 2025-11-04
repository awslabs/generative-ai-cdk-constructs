[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [sagemaker\_deployment](../README.md) / SageMakerEndpointBase

# Abstract Class: SageMakerEndpointBase

## Extends

- [`BaseClass`](../../../../classes/BaseClass.md)

## Extended by

- [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)
- [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)
- [`CustomSageMakerEndpoint`](CustomSageMakerEndpoint.md)

## Constructors

### Constructor

> **new SageMakerEndpointBase**(`scope`, `id`): `SageMakerEndpointBase`

#### Parameters

##### scope

`Construct`

##### id

`string`

#### Returns

`SageMakerEndpointBase`

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`constructor`](../../../../classes/BaseClass.md#constructor)

## Properties

### constructUsageMetric

> `readonly` **constructUsageMetric**: `"uksb-1tupboc45"` = `'uksb-1tupboc45'`

construct usage metric , added in template description

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`constructUsageMetric`](../../../../classes/BaseClass.md#constructusagemetric)

***

### enablexray

> **enablexray**: `boolean` = `true`

enable disable xray tracing

#### Default

```ts
true
```

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`enablexray`](../../../../classes/BaseClass.md#enablexray)

***

### fieldLogLevel

> **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`fieldLogLevel`](../../../../classes/BaseClass.md#fieldloglevel)

***

### lambdaTracing

> **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

#### Default

```ts
Active
```

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`lambdaTracing`](../../../../classes/BaseClass.md#lambdatracing)

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`node`](../../../../classes/BaseClass.md#node)

***

### retention

> **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`retention`](../../../../classes/BaseClass.md#retention)

***

### stage

> **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
_dev
```

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`stage`](../../../../classes/BaseClass.md#stage)

***

### usageMetricMap

> `protected` `static` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`usageMetricMap`](../../../../classes/BaseClass.md#usagemetricmap)

## Methods

### addObservabilityToConstruct()

> `protected` **addObservabilityToConstruct**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../../../../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`addObservabilityToConstruct`](../../../../classes/BaseClass.md#addobservabilitytoconstruct)

***

### createSageMakerRole()

> `protected` **createSageMakerRole**(): `Role`

#### Returns

`Role`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`toString`](../../../../classes/BaseClass.md#tostring)

***

### updateConstructUsageMetricCode()

> `protected` **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

update template description with construct usage metric and
add AWS_SDK_UA_APP_ID to user agent on aws sdk.

#### Parameters

##### props

[`BaseClassProps`](../../../../interfaces/BaseClassProps.md)

##### scope

`Construct`

##### lambdaFunctions

`DockerImageFunction`[]

#### Returns

`void`

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`updateConstructUsageMetricCode`](../../../../classes/BaseClass.md#updateconstructusagemetriccode)

***

### updateEnvSuffix()

> `protected` **updateEnvSuffix**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../../../../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`BaseClass`](../../../../classes/BaseClass.md).[`updateEnvSuffix`](../../../../classes/BaseClass.md#updateenvsuffix)

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

[`BaseClass`](../../../../classes/BaseClass.md).[`isConstruct`](../../../../classes/BaseClass.md#isconstruct)
