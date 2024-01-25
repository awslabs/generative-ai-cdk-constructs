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
- [endpointArn](HuggingFaceSageMakerEndpoint.md#endpointarn)
- [environment](HuggingFaceSageMakerEndpoint.md#environment)
- [grantPrincipal](HuggingFaceSageMakerEndpoint.md#grantprincipal)
- [instanceCount](HuggingFaceSageMakerEndpoint.md#instancecount)
- [instanceType](HuggingFaceSageMakerEndpoint.md#instancetype)
- [modelId](HuggingFaceSageMakerEndpoint.md#modelid)
- [node](HuggingFaceSageMakerEndpoint.md#node)
- [role](HuggingFaceSageMakerEndpoint.md#role)
- [startupHealthCheckTimeoutInSeconds](HuggingFaceSageMakerEndpoint.md#startuphealthchecktimeoutinseconds)

### Methods

- [addToRolePolicy](HuggingFaceSageMakerEndpoint.md#addtorolepolicy)
- [createSageMakerRole](HuggingFaceSageMakerEndpoint.md#createsagemakerrole)
- [grantInvoke](HuggingFaceSageMakerEndpoint.md#grantinvoke)
- [toString](HuggingFaceSageMakerEndpoint.md#tostring)
- [isConstruct](HuggingFaceSageMakerEndpoint.md#isconstruct)

## Constructors

### constructor

• **new HuggingFaceSageMakerEndpoint**(`scope`, `id`, `props`): [`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`IHuggingFaceSageMakerEndpointProps`](../interfaces/IHuggingFaceSageMakerEndpointProps.md) |

#### Returns

[`HuggingFaceSageMakerEndpoint`](HuggingFaceSageMakerEndpoint.md)

#### Overrides

[SageMakerEndpointBase](SageMakerEndpointBase.md).[constructor](SageMakerEndpointBase.md#constructor)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:50](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L50)

## Properties

### cfnEndpoint

• `Readonly` **cfnEndpoint**: `CfnEndpoint`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:39](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L39)

___

### cfnEndpointConfig

• `Readonly` **cfnEndpointConfig**: `CfnEndpointConfig`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:40](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L40)

___

### cfnModel

• `Readonly` **cfnModel**: `CfnModel`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:38](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L38)

___

### endpointArn

• `Readonly` **endpointArn**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:37](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L37)

___

### environment

• `Private` `Optional` `Readonly` **environment**: `Object`

#### Index signature

▪ [key: `string`]: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:48](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L48)

___

### grantPrincipal

• `Readonly` **grantPrincipal**: `IPrincipal`

#### Implementation of

iam.IGrantable.grantPrincipal

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:36](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L36)

___

### instanceCount

• `Readonly` **instanceCount**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:44](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L44)

___

### instanceType

• `Readonly` **instanceType**: [`SageMakerInstanceType`](SageMakerInstanceType.md)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L43)

___

### modelId

• `Readonly` **modelId**: `string`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:42](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L42)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[node](SageMakerEndpointBase.md#node)

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

___

### role

• `Readonly` **role**: `Role`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:45](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L45)

___

### startupHealthCheckTimeoutInSeconds

• `Private` `Readonly` **startupHealthCheckTimeoutInSeconds**: `number`

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:47](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L47)

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

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:119](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L119)

___

### createSageMakerRole

▸ **createSageMakerRole**(): `Role`

#### Returns

`Role`

#### Inherited from

[SageMakerEndpointBase](SageMakerEndpointBase.md).[createSageMakerRole](SageMakerEndpointBase.md#createsagemakerrole)

#### Defined in

[src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts:17](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/sagemaker-endpoint-base.ts#L17)

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

[src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts:127](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-model-deployment-sagemaker/huggingface-sagemaker-endpoint.ts#L127)

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
