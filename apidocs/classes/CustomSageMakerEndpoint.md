[@cdklabs/generative-ai-cdk-constructs](../README.md) / CustomSageMakerEndpoint

# Class: CustomSageMakerEndpoint

## Hierarchy

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳ **`CustomSageMakerEndpoint`**

## Implements

- `IGrantable`

## Table of contents

### Constructors

- [constructor](CustomSageMakerEndpoint.md#constructor)

### Properties

- [cfnEndpoint](CustomSageMakerEndpoint.md#cfnendpoint)
- [cfnEndpointConfig](CustomSageMakerEndpoint.md#cfnendpointconfig)
- [cfnModel](CustomSageMakerEndpoint.md#cfnmodel)
- [constructTrackingCode](CustomSageMakerEndpoint.md#constructtrackingcode)
- [enablexray](CustomSageMakerEndpoint.md#enablexray)
- [endpointArn](CustomSageMakerEndpoint.md#endpointarn)
- [environment](CustomSageMakerEndpoint.md#environment)
- [fieldLogLevel](CustomSageMakerEndpoint.md#fieldloglevel)
- [grantPrincipal](CustomSageMakerEndpoint.md#grantprincipal)
- [instanceCount](CustomSageMakerEndpoint.md#instancecount)
- [instanceType](CustomSageMakerEndpoint.md#instancetype)
- [lambdaTracing](CustomSageMakerEndpoint.md#lambdatracing)
- [modelDataDownloadTimeoutInSeconds](CustomSageMakerEndpoint.md#modeldatadownloadtimeoutinseconds)
- [modelDataUrl](CustomSageMakerEndpoint.md#modeldataurl)
- [modelId](CustomSageMakerEndpoint.md#modelid)
- [node](CustomSageMakerEndpoint.md#node)
- [retention](CustomSageMakerEndpoint.md#retention)
- [role](CustomSageMakerEndpoint.md#role)
- [stage](CustomSageMakerEndpoint.md#stage)
- [startupHealthCheckTimeoutInSeconds](CustomSageMakerEndpoint.md#startuphealthchecktimeoutinseconds)

### Methods

- [addObservabilityToConstruct](CustomSageMakerEndpoint.md#addobservabilitytoconstruct)
- [addToRolePolicy](CustomSageMakerEndpoint.md#addtorolepolicy)
- [createSageMakerRole](CustomSageMakerEndpoint.md#createsagemakerrole)
- [grantInvoke](CustomSageMakerEndpoint.md#grantinvoke)
- [toString](CustomSageMakerEndpoint.md#tostring)
- [updateConstructTrackingCode](CustomSageMakerEndpoint.md#updateconstructtrackingcode)
- [updateEnvSuffix](CustomSageMakerEndpoint.md#updateenvsuffix)
- [isConstruct](CustomSageMakerEndpoint.md#isconstruct)

## Constructors

### constructor

• **new CustomSageMakerEndpoint**(`scope`, `id`, `props`): [`CustomSageMakerEndpoint`](CustomSageMakerEndpoint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`CustomSageMakerEndpointProps`](../interfaces/CustomSageMakerEndpointProps.md) |

#### Returns

[`CustomSageMakerEndpoint`](CustomSageMakerEndpoint.md)

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

### constructTrackingCode

• `Readonly` **constructTrackingCode**: ``"uksb-1tupboc45"``

construct tracking code, added in template description

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructTrackingCode](SageMakerEndpointBase.md#constructtrackingcode)

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

• `Optional` `Readonly` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

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

### modelDataDownloadTimeoutInSeconds

• `Readonly` **modelDataDownloadTimeoutInSeconds**: `number`

___

### modelDataUrl

• `Readonly` **modelDataUrl**: `string`

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

### updateConstructTrackingCode

▸ **updateConstructTrackingCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |
| `scope` | `Construct` |
| `lambdaFunctions` | `DockerImageFunction`[] |

#### Returns

`void`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[updateConstructTrackingCode](SageMakerEndpointBase.md#updateconstructtrackingcode)

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
