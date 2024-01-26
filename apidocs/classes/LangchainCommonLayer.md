[@cdklabs/generative-ai-cdk-constructs](../README.md) / LangchainCommonLayer

# Class: LangchainCommonLayer

**`Summary`**

LangchainCommonLayer allows developers to instantiate a llm client adapter on bedrock, sagemaker or openai following best practise.

**`Example`**

```ts
from genai_core.adapters.registry import registry
from genai_core.clients import get_bedrock_client

adapter = registry.get_adapter(f"{provider}.{model_id}")
bedrock_client = get_bedrock_client()
```

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
| `props` | [`AdapterProps`](../interfaces/AdapterProps.md) | user provided props for the construct. |

#### Returns

[`LangchainCommonLayer`](LangchainCommonLayer.md)

**`Summary`**

This construct allows developers to instantiate a llm client adapter on bedrock, sagemaker or openai following best practise.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

## Properties

### layer

• `Readonly` **layer**: `LayerVersion`

Returns the instance of lambda.LayerVersion created by the construct

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

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
