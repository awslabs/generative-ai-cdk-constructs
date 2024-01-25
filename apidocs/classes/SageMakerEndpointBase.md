[@cdklabs/generative-ai-cdk-constructs](../README.md) / SageMakerEndpointBase

# Class: SageMakerEndpointBase

## Hierarchy

- `Construct`

  ↳ **`SageMakerEndpointBase`**

  ↳↳ [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

  ↳↳ [`JumpStartSageMakerEndpoint`](JumpStartSageMakerEndpoint.md)

  ↳↳ [`CustomSageMakerEndpoint`](CustomSageMakerEndpoint.md)

## Table of contents

### Constructors

- [constructor](SageMakerEndpointBase.md#constructor)

### Properties

- [node](SageMakerEndpointBase.md#node)

### Methods

- [createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)
- [toString](SageMakerEndpointBase.md#tostring)
- [isConstruct](SageMakerEndpointBase.md#isconstruct)

## Constructors

### constructor

• **new SageMakerEndpointBase**(`scope`, `id`): [`SageMakerEndpointBase`](SageMakerEndpointBase.md)

Creates a new construct node.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The scope in which to define this construct |
| `id` | `string` | The scoped construct ID. Must be unique amongst siblings. If the ID includes a path separator (`/`), then it will be replaced by double dash `--`. |

#### Returns

[`SageMakerEndpointBase`](SageMakerEndpointBase.md)

#### Inherited from

Construct.constructor

#### Defined in

node_modules/constructs/lib/construct.d.ts:274

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

## Methods

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts:17](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts#L17)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

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

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
