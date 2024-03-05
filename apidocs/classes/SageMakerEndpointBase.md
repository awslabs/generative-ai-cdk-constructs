[@cdklabs/generative-ai-cdk-constructs](../README.md) / SageMakerEndpointBase

# Class: SageMakerEndpointBase

## Hierarchy

- [`BaseClass`](BaseClass.md)

  ↳ **`SageMakerEndpointBase`**

  ↳↳ [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

  ↳↳ [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

  ↳↳ [`CustomSageMakerEndpoint`](CustomSageMakerEndpoint.md)

## Table of contents

### Constructors

- [constructor](SageMakerEndpointBase.md#constructor)

### Properties

- [constructUsageMetric](SageMakerEndpointBase.md#constructusagemetric)
- [enablexray](SageMakerEndpointBase.md#enablexray)
- [fieldLogLevel](SageMakerEndpointBase.md#fieldloglevel)
- [lambdaTracing](SageMakerEndpointBase.md#lambdatracing)
- [node](SageMakerEndpointBase.md#node)
- [retention](SageMakerEndpointBase.md#retention)
- [stage](SageMakerEndpointBase.md#stage)
- [usageMetricMap](SageMakerEndpointBase.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](SageMakerEndpointBase.md#addobservabilitytoconstruct)
- [createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)
- [toString](SageMakerEndpointBase.md#tostring)
- [updateConstructUsageMetricCode](SageMakerEndpointBase.md#updateconstructusagemetriccode)
- [updateEnvSuffix](SageMakerEndpointBase.md#updateenvsuffix)
- [isConstruct](SageMakerEndpointBase.md#isconstruct)

## Constructors

### constructor

• **new SageMakerEndpointBase**(`scope`, `id`): [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Returns

[`SageMakerEndpointBase`](SageMakerEndpointBase.md)

#### Inherited from

[BaseClass](BaseClass.md).[constructor](BaseClass.md#constructor)

## Properties

### constructUsageMetric

• `Readonly` **constructUsageMetric**: ``"uksb-1tupboc45"``

construct usage metric , added in template description

#### Inherited from

[BaseClass](BaseClass.md).[constructUsageMetric](BaseClass.md#constructusagemetric)

___

### enablexray

• **enablexray**: `boolean` = `true`

enable disable xray tracing

**`Default`**

```ts
- True
```

#### Inherited from

[BaseClass](BaseClass.md).[enablexray](BaseClass.md#enablexray)

___

### fieldLogLevel

• **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[fieldLogLevel](BaseClass.md#fieldloglevel)

___

### lambdaTracing

• **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

**`Default`**

```ts
- Active
```

#### Inherited from

[BaseClass](BaseClass.md).[lambdaTracing](BaseClass.md#lambdatracing)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[BaseClass](BaseClass.md).[node](BaseClass.md#node)

___

### retention

• **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[retention](BaseClass.md#retention)

___

### stage

• **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Inherited from

[BaseClass](BaseClass.md).[stage](BaseClass.md#stage)

___

### usageMetricMap

▪ `Static` `Protected` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[BaseClass](BaseClass.md).[usageMetricMap](BaseClass.md#usagemetricmap)

## Methods

### addObservabilityToConstruct

▸ **addObservabilityToConstruct**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[addObservabilityToConstruct](BaseClass.md#addobservabilitytoconstruct)

___

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[BaseClass](BaseClass.md).[toString](BaseClass.md#tostring)

___

### updateConstructUsageMetricCode

▸ **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |
| `scope` | `Construct` |
| `lambdaFunctions` | `DockerImageFunction`[] |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[updateConstructUsageMetricCode](BaseClass.md#updateconstructusagemetriccode)

___

### updateEnvSuffix

▸ **updateEnvSuffix**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[updateEnvSuffix](BaseClass.md#updateenvsuffix)

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

[BaseClass](BaseClass.md).[isConstruct](BaseClass.md#isconstruct)
