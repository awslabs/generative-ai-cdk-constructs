[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainCommonDepsLayer

# Class: LangchainCommonDepsLayer

**`Summary`**

The LangchainCommonDepsLayer class.

## Hierarchy

- `Construct`

  ↳ **`LangchainCommonDepsLayer`**

## Table of contents

### Constructors

- [constructor](LangchainCommonDepsLayer.md#constructor)

### Properties

- [layer](LangchainCommonDepsLayer.md#layer)
- [node](LangchainCommonDepsLayer.md#node)

### Methods

- [toString](LangchainCommonDepsLayer.md#tostring)
- [isConstruct](LangchainCommonDepsLayer.md#isconstruct)

## Constructors

### constructor

• **new LangchainCommonDepsLayer**(`scope`, `id`, `props`): [`LangchainCommonDepsLayer`](LangchainCommonDepsLayer.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`LangchainLayerProps`](../interfaces/LangchainLayerProps.md) | user provided props for the construct. |

#### Returns

[`LangchainCommonDepsLayer`](LangchainCommonDepsLayer.md)

**`Summary`**

Constructs a new instance of the LangchainCommonDepsLayer class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:60](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L60)

## Properties

### layer

• `Readonly` **layer**: `LayerVersion`

Returns the instance of lambda.LayerVersion created by the construct

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:50](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L50)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

## Methods

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
