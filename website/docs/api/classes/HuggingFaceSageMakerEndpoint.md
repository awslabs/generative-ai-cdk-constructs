[@cdklabs/generative-ai-cdk-constructs](/docs/api) / HuggingFaceSageMakerEndpoint

# Class: HuggingFaceSageMakerEndpoint

**`Summary`**

The HuggingFaceSageMakerEndpoint class.

## Hierarchy

- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

  ↳ **`HuggingFaceSageMakerEndpoint`**

## Implements

- `IGrantable`

## Constructors

### constructor

• **new HuggingFaceSageMakerEndpoint**(`scope`, `id`, `props`): [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

#### Parameters

| Name | Type                                                                                             |
| :------ |:-------------------------------------------------------------------------------------------------|
| `scope` | `Construct`                                                                                      |
| `id` | `string`                                                                                         |
| `props` | [`HuggingFaceSageMakerEndpointProps`](/docs/api/interfaces/HuggingFaceSageMakerEndpointProps.md) |

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

#### Implementation of

iam.IGrantable.grantPrincipal

___

### instanceCount

• `Readonly` **instanceCount**: `number`

___

### instanceType

• `Readonly` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

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

### role

• `Readonly` **role**: `Role`

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
