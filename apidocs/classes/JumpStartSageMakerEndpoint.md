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

- [cfnEndpoint](JumpStartSageMakerEndpoint.md#cfnendpoint)
- [cfnEndpointConfig](JumpStartSageMakerEndpoint.md#cfnendpointconfig)
- [cfnModel](JumpStartSageMakerEndpoint.md#cfnmodel)
- [endpointArn](JumpStartSageMakerEndpoint.md#endpointarn)
- [environment](JumpStartSageMakerEndpoint.md#environment)
- [grantPrincipal](JumpStartSageMakerEndpoint.md#grantprincipal)
- [instanceCount](JumpStartSageMakerEndpoint.md#instancecount)
- [instanceType](JumpStartSageMakerEndpoint.md#instancetype)
- [model](JumpStartSageMakerEndpoint.md#model)
- [node](JumpStartSageMakerEndpoint.md#node)
- [region](JumpStartSageMakerEndpoint.md#region)
- [role](JumpStartSageMakerEndpoint.md#role)
- [spec](JumpStartSageMakerEndpoint.md#spec)
- [startupHealthCheckTimeoutInSeconds](JumpStartSageMakerEndpoint.md#startuphealthchecktimeoutinseconds)

### Methods

- [addToRolePolicy](JumpStartSageMakerEndpoint.md#addtorolepolicy)
- [buildEnvironment](JumpStartSageMakerEndpoint.md#buildenvironment)
- [createSageMakerRole](JumpStartSageMakerEndpoint.md#createsagemakerrole)
- [getModelFromArtifact](JumpStartSageMakerEndpoint.md#getmodelfromartifact)
- [getModelFromPackage](JumpStartSageMakerEndpoint.md#getmodelfrompackage)
- [grantInvoke](JumpStartSageMakerEndpoint.md#grantinvoke)
- [toString](JumpStartSageMakerEndpoint.md#tostring)
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
| `props` | [`IJumpStartSageMakerEndpointProps`](../interfaces/IJumpStartSageMakerEndpointProps.md) |

#### Returns

[`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Overrides

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructor](SageMakerEndpointBase.md#constructor)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:52](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L52)

## Properties

### cfnEndpoint

• `Readonly` **cfnEndpoint**: `CfnEndpoint`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:39](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L39)

___

### cfnEndpointConfig

• `Readonly` **cfnEndpointConfig**: `CfnEndpointConfig`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:40](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L40)

___

### cfnModel

• `Readonly` **cfnModel**: `CfnModel`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:38](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L38)

___

### endpointArn

• `Readonly` **endpointArn**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:37](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L37)

___

### environment

• `Private` `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:50](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L50)

___

### grantPrincipal

• `Readonly` **grantPrincipal**: `IPrincipal`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:36](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L36)

___

### instanceCount

• `Readonly` **instanceCount**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:44](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L44)

___

### instanceType

• `Optional` `Readonly` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L43)

___

### model

• `Readonly` **model**: [`JumpStartModel`](JumpStartModel.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:42](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L42)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[node](SageMakerEndpointBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

___

### region

• `Private` `Readonly` **region**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:47](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L47)

___

### role

• `Readonly` **role**: `Role`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:45](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L45)

___

### spec

• `Private` `Readonly` **spec**: [`IJumpStartModelSpec`](../interfaces/IJumpStartModelSpec.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:48](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L48)

___

### startupHealthCheckTimeoutInSeconds

• `Private` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:49](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L49)

## Methods

### addToRolePolicy

▸ **addToRolePolicy**(`statement`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `statement` | `PolicyStatement` |

#### Returns

`void`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:115](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L115)

___

### buildEnvironment

▸ **buildEnvironment**(`instanceType`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `instanceType` | `string` |

#### Returns

`Object`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:149](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L149)

___

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts:17](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts#L17)

___

### getModelFromArtifact

▸ **getModelFromArtifact**(`scope`, `id`, `instanceType`, `instanceBaseType`, `environment`): `CfnModel`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `instanceType` | `string` |
| `instanceBaseType` | `string` |
| `environment` | `Object` |

#### Returns

`CfnModel`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:163](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L163)

___

### getModelFromPackage

▸ **getModelFromPackage**(`scope`, `id`): `CfnModel`

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Returns

`CfnModel`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:231](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L231)

___

### grantInvoke

▸ **grantInvoke**(`grantee`): `Grant`

#### Parameters

| Name | Type |
| :------ | :------ |
| `grantee` | `IGrantable` |

#### Returns

`Grant`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:123](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L123)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[toString](SageMakerEndpointBase.md#tostring)

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

___

### verifyInstanceType

▸ **verifyInstanceType**(): `string`

#### Returns

`string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts:131](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-model-deployment-sagemaker/jumpstart-sagemaker-endpoint.ts#L131)

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

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
