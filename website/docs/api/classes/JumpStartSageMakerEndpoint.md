[@cdklabs/generative-ai-cdk-constructs](/docs/api) / JumpStartSageMakerEndpoint

# Class: JumpStartSageMakerEndpoint

**`Summary`**

The JumpStartSageMakerEndpoint class.

## Hierarchy

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳ **`JumpStartSageMakerEndpoint`**

## Constructors

### constructor

• **new JumpStartSageMakerEndpoint**(`scope`, `id`, `props`): [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

#### Parameters

| Name | Type                                                                                         |
| :------ |:---------------------------------------------------------------------------------------------|
| `scope` | `Construct`                                                                                  |
| `id` | `string`                                                                                     |
| `props` | [`JumpStartSageMakerEndpointProps`](/docs/api/interfaces/JumpStartSageMakerEndpointProps.md) |

#### Returns

[`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

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

### endpointArn

• `Readonly` **endpointArn**: `string`

___

### environment

• `Private` `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

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

### role

• `Readonly` **role**: `Role`

___

### spec

• `Private` `Readonly` **spec**: [`IJumpStartModelSpec`](/docs/api/interfaces/IJumpStartModelSpec.md)

___

### startupHealthCheckTimeoutInSeconds

• `Private` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

## Methods

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
