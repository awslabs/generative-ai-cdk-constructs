[@cdklabs/generative-ai-cdk-constructs](../README.md) / HuggingFaceSageMakerEndpoint

# Class: HuggingFaceSageMakerEndpoint

**`Summary`**

The HuggingFaceSageMakerEndpoint class.

## Hierarchy

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳ **`HuggingFaceSageMakerEndpoint`**

## Implements

- `IGrantable`

## Table of contents

### Constructors

- [constructor](HuggingFaceSageMakerEndpoint.md#constructor)

### Properties

- [cfnEndpoint](HuggingFaceSageMakerEndpoint.md#cfnendpoint)
- [cfnEndpointConfig](HuggingFaceSageMakerEndpoint.md#cfnendpointconfig)
- [cfnModel](HuggingFaceSageMakerEndpoint.md#cfnmodel)
- [constructUsageMetric](HuggingFaceSageMakerEndpoint.md#constructusagemetric)
- [enablexray](HuggingFaceSageMakerEndpoint.md#enablexray)
- [endpointArn](HuggingFaceSageMakerEndpoint.md#endpointarn)
- [environment](HuggingFaceSageMakerEndpoint.md#environment)
- [fieldLogLevel](HuggingFaceSageMakerEndpoint.md#fieldloglevel)
- [grantPrincipal](HuggingFaceSageMakerEndpoint.md#grantprincipal)
- [instanceCount](HuggingFaceSageMakerEndpoint.md#instancecount)
- [instanceType](HuggingFaceSageMakerEndpoint.md#instancetype)
- [lambdaTracing](HuggingFaceSageMakerEndpoint.md#lambdatracing)
- [modelId](HuggingFaceSageMakerEndpoint.md#modelid)
- [node](HuggingFaceSageMakerEndpoint.md#node)
- [retention](HuggingFaceSageMakerEndpoint.md#retention)
- [role](HuggingFaceSageMakerEndpoint.md#role)
- [stage](HuggingFaceSageMakerEndpoint.md#stage)
- [startupHealthCheckTimeoutInSeconds](HuggingFaceSageMakerEndpoint.md#startuphealthchecktimeoutinseconds)
- [usageMetricMap](HuggingFaceSageMakerEndpoint.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](HuggingFaceSageMakerEndpoint.md#addobservabilitytoconstruct)
- [addToRolePolicy](HuggingFaceSageMakerEndpoint.md#addtorolepolicy)
- [createSageMakerRole](HuggingFaceSageMakerEndpoint.md#createsagemakerrole)
- [grantInvoke](HuggingFaceSageMakerEndpoint.md#grantinvoke)
- [toString](HuggingFaceSageMakerEndpoint.md#tostring)
- [updateConstructUsageMetricCode](HuggingFaceSageMakerEndpoint.md#updateconstructusagemetriccode)
- [updateEnvSuffix](HuggingFaceSageMakerEndpoint.md#updateenvsuffix)
- [isConstruct](HuggingFaceSageMakerEndpoint.md#isconstruct)

## Constructors

### constructor

• **new HuggingFaceSageMakerEndpoint**(`scope`, `id`, `props`): [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`HuggingFaceSageMakerEndpointProps`](../interfaces/HuggingFaceSageMakerEndpointProps.md) |

#### Returns

[`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

#### Overrides

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructor](SageMakerEndpointBase.md#constructor)

## Properties

### cfnEndpoint

• `Readonly` **cfnEndpoint**: `CfnEndpoint`

___

### cfnEndpointConfig

• `Readonly` **cfnEndpointConfig**: `CfnEndpointConfig`

___

### cfnModel

• `Readonly` **cfnModel**: `CfnModel`

___

### constructUsageMetric

• `Readonly` **constructUsageMetric**: ``"uksb-1tupboc45"``

construct usage metric , added in template description

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructUsageMetric](SageMakerEndpointBase.md#constructusagemetric)

___

### enablexray

• **enablexray**: `boolean` = `true`

enable disable xray tracing

**`Default`**

```ts
- True
```

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[enablexray](SageMakerEndpointBase.md#enablexray)

___

### endpointArn

• `Readonly` **endpointArn**: `string`

___

### environment

• `Private` `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

___

### fieldLogLevel

• **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[fieldLogLevel](SageMakerEndpointBase.md#fieldloglevel)

___

### grantPrincipal

• `Readonly` **grantPrincipal**: `IPrincipal`

#### Implementation of

iam.IGrantable.grantPrincipal

___

### instanceCount

• `Readonly` **instanceCount**: `number`

___

### instanceType

• `Readonly` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

___

### lambdaTracing

• **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

**`Default`**

```ts
- Active
```

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[lambdaTracing](SageMakerEndpointBase.md#lambdatracing)

___

### modelId

• `Readonly` **modelId**: `string`

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[node](SageMakerEndpointBase.md#node)

___

### retention

• **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[retention](SageMakerEndpointBase.md#retention)

___

### role

• `Readonly` **role**: `Role`

___

### stage

• **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[stage](SageMakerEndpointBase.md#stage)

___

### startupHealthCheckTimeoutInSeconds

• `Private` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

___

### usageMetricMap

▪ `Static` `Protected` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[usageMetricMap](SageMakerEndpointBase.md#usagemetricmap)

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

[SageMakerEndpointBase](SageMakerEndpointBase.md).[addObservabilityToConstruct](SageMakerEndpointBase.md#addobservabilitytoconstruct)

___

### addToRolePolicy

▸ **addToRolePolicy**(`statement`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

___

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)

___

### grantInvoke

▸ **grantInvoke**(`grantee`): `Grant`

#### Parameters

| Name | Type |
| :------ | :------ |
| `grantee` | `IGrantable` |

#### Returns

`Grant`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[toString](SageMakerEndpointBase.md#tostring)

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

[SageMakerEndpointBase](SageMakerEndpointBase.md).[updateConstructUsageMetricCode](SageMakerEndpointBase.md#updateconstructusagemetriccode)

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

[SageMakerEndpointBase](SageMakerEndpointBase.md).[updateEnvSuffix](SageMakerEndpointBase.md#updateenvsuffix)

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

[SageMakerEndpointBase](SageMakerEndpointBase.md).[isConstruct](SageMakerEndpointBase.md#isconstruct)
