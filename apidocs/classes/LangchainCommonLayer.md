[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainCommonLayer

# Class: LangchainCommonLayer

**`Summary`**

The LangchainCommonLayer class.

## Hierarchy

- `Construct`

  ↳ **`LangchainCommonLayer`**

## Table of contents

### Constructors

- [constructor](LangchainCommonLayer.md#constructor)

### Properties

- [layer](LangchainCommonLayer.md#layer)
- [node](LangchainCommonLayer.md#node)

### Methods

- [toString](LangchainCommonLayer.md#tostring)
- [isConstruct](LangchainCommonLayer.md#isconstruct)

## Constructors

### constructor

• **new LangchainCommonLayer**(`scope`, `id`, `props`): [`LangchainCommonLayer`](LangchainCommonLayer.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`LangchainLayerProps`](../interfaces/LangchainLayerProps.md) | user provided props for the construct. |

#### Returns

[`LangchainCommonLayer`](LangchainCommonLayer.md)

**`Summary`**

Constructs a new instance of the LangchainCommonLayer class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:92](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L92)

## Properties

### layer

• `Readonly` **layer**: `LayerVersion`

Returns the instance of lambda.LayerVersion created by the construct

#### Defined in

[src/patterns/gen-ai/aws-langchain-common-layer/index.ts:82](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-langchain-common-layer/index.ts#L82)

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
