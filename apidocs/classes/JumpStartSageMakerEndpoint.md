[@cdklabs/generative-ai-cdk-constructs](../README.md) / JumpStartSageMakerEndpoint

# Class: JumpStartSageMakerEndpoint

**`Summary`**

The JumpStartSageMakerEndpoint class.

## Hierarchy

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳ **`JumpStartSageMakerEndpoint`**

## Table of contents

### Constructors

- [constructor](JumpStartSageMakerEndpoint.md#constructor)

### Properties

- [acceptEula](JumpStartSageMakerEndpoint.md#accepteula)
- [cfnEndpoint](JumpStartSageMakerEndpoint.md#cfnendpoint)
- [cfnEndpointConfig](JumpStartSageMakerEndpoint.md#cfnendpointconfig)
- [cfnModel](JumpStartSageMakerEndpoint.md#cfnmodel)
- [constructTrackingCode](JumpStartSageMakerEndpoint.md#constructtrackingcode)
- [enablexray](JumpStartSageMakerEndpoint.md#enablexray)
- [endpointArn](JumpStartSageMakerEndpoint.md#endpointarn)
- [environment](JumpStartSageMakerEndpoint.md#environment)
- [fieldLogLevel](JumpStartSageMakerEndpoint.md#fieldloglevel)
- [grantPrincipal](JumpStartSageMakerEndpoint.md#grantprincipal)
- [instanceCount](JumpStartSageMakerEndpoint.md#instancecount)
- [instanceType](JumpStartSageMakerEndpoint.md#instancetype)
- [lambdaTracing](JumpStartSageMakerEndpoint.md#lambdatracing)
- [model](JumpStartSageMakerEndpoint.md#model)
- [node](JumpStartSageMakerEndpoint.md#node)
- [region](JumpStartSageMakerEndpoint.md#region)
- [retention](JumpStartSageMakerEndpoint.md#retention)
- [role](JumpStartSageMakerEndpoint.md#role)
- [spec](JumpStartSageMakerEndpoint.md#spec)
- [stage](JumpStartSageMakerEndpoint.md#stage)
- [startupHealthCheckTimeoutInSeconds](JumpStartSageMakerEndpoint.md#startuphealthchecktimeoutinseconds)

### Methods

- [addObservabilityToConstruct](JumpStartSageMakerEndpoint.md#addobservabilitytoconstruct)
- [addToRolePolicy](JumpStartSageMakerEndpoint.md#addtorolepolicy)
- [buildEnvironment](JumpStartSageMakerEndpoint.md#buildenvironment)
- [createSageMakerRole](JumpStartSageMakerEndpoint.md#createsagemakerrole)
- [getModelFromArtifact](JumpStartSageMakerEndpoint.md#getmodelfromartifact)
- [getModelFromPackage](JumpStartSageMakerEndpoint.md#getmodelfrompackage)
- [grantInvoke](JumpStartSageMakerEndpoint.md#grantinvoke)
- [toString](JumpStartSageMakerEndpoint.md#tostring)
- [updateConstructTrackingCode](JumpStartSageMakerEndpoint.md#updateconstructtrackingcode)
- [updateEnvSuffix](JumpStartSageMakerEndpoint.md#updateenvsuffix)
- [verifyInstanceType](JumpStartSageMakerEndpoint.md#verifyinstancetype)
- [isConstruct](JumpStartSageMakerEndpoint.md#isconstruct)

## Constructors

### constructor

• **new JumpStartSageMakerEndpoint**(`scope`, `id`, `props`): [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`JumpStartSageMakerEndpointProps`](../interfaces/JumpStartSageMakerEndpointProps.md) |

#### Returns

[`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Overrides

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructor](SageMakerEndpointBase.md#constructor)

## Properties

### acceptEula

• `Private` `Readonly` **acceptEula**: `boolean`

___

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

### model

• `Readonly` **model**: [`JumpStartModel`](JumpStartModel.md)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[node](SageMakerEndpointBase.md#node)

___

### region

• `Private` `Readonly` **region**: `string`

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

### spec

• `Private` `Readonly` **spec**: [`IJumpStartModelSpec`](../interfaces/IJumpStartModelSpec.md)

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

### buildEnvironment

▸ **buildEnvironment**(`instanceType`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceType` | `string` |

#### Returns

`Object`

___

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)

___

### getModelFromArtifact

▸ **getModelFromArtifact**(`scope`, `id`, `instanceType`, `instanceBaseType`, `environment`, `vpcConfig`): `CfnModel`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `instanceType` | `string` |
| `instanceBaseType` | `string` |
| `environment` | `Object` |
| `vpcConfig` | `undefined` \| `VpcConfigProperty` |

#### Returns

`CfnModel`

___

### getModelFromPackage

▸ **getModelFromPackage**(`scope`, `id`, `vpcConfig`): `CfnModel`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `vpcConfig` | `undefined` \| `VpcConfigProperty` |

#### Returns

`CfnModel`

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

### verifyInstanceType

▸ **verifyInstanceType**(): `string`

#### Returns

`string`

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
