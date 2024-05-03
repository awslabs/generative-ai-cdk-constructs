[@cdklabs/generative-ai-cdk-constructs](../README.md) / BaseClass

# Class: BaseClass

## Hierarchy

- `Construct`

  ↳ **`BaseClass`**

  ↳↳ [`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)

  ↳↳ [`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)

  ↳↳ [`QaAppsyncOpensearch`](QaAppsyncOpensearch.md)

  ↳↳ [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳↳ [`ContentGenerationAppSyncLambda`](ContentGenerationAppSyncLambda.md)

  ↳↳ [`WebCrawler`](WebCrawler.md)

## Table of contents

### Constructors

- [constructor](BaseClass.md#constructor)

### Properties

- [constructUsageMetric](BaseClass.md#constructusagemetric)
- [enablexray](BaseClass.md#enablexray)
- [fieldLogLevel](BaseClass.md#fieldloglevel)
- [lambdaTracing](BaseClass.md#lambdatracing)
- [node](BaseClass.md#node)
- [retention](BaseClass.md#retention)
- [stage](BaseClass.md#stage)
- [usageMetricMap](BaseClass.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](BaseClass.md#addobservabilitytoconstruct)
- [toString](BaseClass.md#tostring)
- [updateConstructUsageMetricCode](BaseClass.md#updateconstructusagemetriccode)
- [updateEnvSuffix](BaseClass.md#updateenvsuffix)
- [isConstruct](BaseClass.md#isconstruct)

## Constructors

### constructor

• **new BaseClass**(`scope`, `id`): [`BaseClass`](BaseClass.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Returns

[`BaseClass`](BaseClass.md)

#### Overrides

Construct.constructor

## Properties

### constructUsageMetric

• `Readonly` **constructUsageMetric**: ``"uksb-1tupboc45"``

construct usage metric , added in template description

___

### enablexray

• **enablexray**: `boolean` = `true`

enable disable xray tracing

**`Default`**

```ts
- True
```

___

### fieldLogLevel

• **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

___

### lambdaTracing

• **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

**`Default`**

```ts
- Active
```

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### retention

• **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

___

### stage

• **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

___

### usageMetricMap

▪ `Static` `Protected` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

## Methods

### addObservabilityToConstruct

▸ **addObservabilityToConstruct**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

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

___

### updateEnvSuffix

▸ **updateEnvSuffix**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

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
