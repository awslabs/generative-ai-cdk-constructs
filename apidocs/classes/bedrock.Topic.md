[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / Topic

# Class: Topic

[bedrock](../modules/bedrock.md).Topic

## Hierarchy

- `Construct`

  ↳ **`Topic`**

## Table of contents

### Constructors

- [constructor](bedrock.Topic.md#constructor)

### Properties

- [node](bedrock.Topic.md#node)
- [topicConfigList](bedrock.Topic.md#topicconfiglist)

### Methods

- [createFinancialAdviceTopic](bedrock.Topic.md#createfinancialadvicetopic)
- [createPoliticalAdviceTopic](bedrock.Topic.md#createpoliticaladvicetopic)
- [createTopic](bedrock.Topic.md#createtopic)
- [toString](bedrock.Topic.md#tostring)
- [topicConfigPropertyList](bedrock.Topic.md#topicconfigpropertylist)
- [isConstruct](bedrock.Topic.md#isconstruct)

## Constructors

### constructor

• **new Topic**(`scope`, `id`): [`Topic`](bedrock.Topic.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |

#### Returns

[`Topic`](bedrock.Topic.md)

#### Overrides

Construct.constructor

## Properties

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### topicConfigList

• `Private` `Readonly` **topicConfigList**: `TopicConfigProperty`[]

## Methods

### createFinancialAdviceTopic

▸ **createFinancialAdviceTopic**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | [`TopicProps`](../interfaces/bedrock.TopicProps.md) |

#### Returns

`void`

___

### createPoliticalAdviceTopic

▸ **createPoliticalAdviceTopic**(`props?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props?` | [`TopicProps`](../interfaces/bedrock.TopicProps.md) |

#### Returns

`void`

___

### createTopic

▸ **createTopic**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`TopicProps`](../interfaces/bedrock.TopicProps.md) |

#### Returns

`void`

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

___

### topicConfigPropertyList

▸ **topicConfigPropertyList**(): `TopicConfigProperty`[]

#### Returns

`TopicConfigProperty`[]

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
