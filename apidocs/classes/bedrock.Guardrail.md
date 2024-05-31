[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / Guardrail

# Class: Guardrail

[bedrock](../modules/bedrock.md).Guardrail

Deploy bedrock guardrail .

## Hierarchy

- `Construct`

  ↳ **`Guardrail`**

## Table of contents

### Constructors

- [constructor](bedrock.Guardrail.md#constructor)

### Properties

- [guardrailId](bedrock.Guardrail.md#guardrailid)
- [guardrailInstance](bedrock.Guardrail.md#guardrailinstance)
- [guardrailVersion](bedrock.Guardrail.md#guardrailversion)
- [kmsKeyArn](bedrock.Guardrail.md#kmskeyarn)
- [name](bedrock.Guardrail.md#name)
- [node](bedrock.Guardrail.md#node)

### Methods

- [addSensitiveInformationPolicyConfig](bedrock.Guardrail.md#addsensitiveinformationpolicyconfig)
- [addTags](bedrock.Guardrail.md#addtags)
- [addTopicPolicyConfig](bedrock.Guardrail.md#addtopicpolicyconfig)
- [addVersion](bedrock.Guardrail.md#addversion)
- [addWordPolicyConfig](bedrock.Guardrail.md#addwordpolicyconfig)
- [toString](bedrock.Guardrail.md#tostring)
- [uploadWordPolicyFromFile](bedrock.Guardrail.md#uploadwordpolicyfromfile)
- [isConstruct](bedrock.Guardrail.md#isconstruct)

## Constructors

### constructor

• **new Guardrail**(`scope`, `id`, `props`): [`Guardrail`](bedrock.Guardrail.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`GuardrailProps`](../interfaces/bedrock.GuardrailProps.md) |

#### Returns

[`Guardrail`](bedrock.Guardrail.md)

#### Overrides

Construct.constructor

## Properties

### guardrailId

• `Readonly` **guardrailId**: `string`

guardrail Id

**`Default`**

```ts

```

___

### guardrailInstance

• `Readonly` **guardrailInstance**: `CfnGuardrail`

Instance of guardrail

___

### guardrailVersion

• `Readonly` **guardrailVersion**: `string`

guardrail version

**`Default`**

```ts

```

___

### kmsKeyArn

• `Readonly` **kmsKeyArn**: `string`

The ARN of the AWS KMS key used to encrypt the guardrail.

**`Default`**

```ts

```

___

### name

• `Readonly` **name**: `string`

The name of the guardrail.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

## Methods

### addSensitiveInformationPolicyConfig

▸ **addSensitiveInformationPolicyConfig**(`props`, `guardrailRegexesConfig`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`SensitiveInformationPolicyConfigProps`](../interfaces/bedrock.SensitiveInformationPolicyConfigProps.md)[] |
| `guardrailRegexesConfig` | `RegexConfigProperty` |

#### Returns

`void`

___

### addTags

▸ **addTags**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`GuardrailProps`](../interfaces/bedrock.GuardrailProps.md) |

#### Returns

`void`

___

### addTopicPolicyConfig

▸ **addTopicPolicyConfig**(`topic`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `topic` | [`Topic`](bedrock.Topic.md) |

#### Returns

`void`

___

### addVersion

▸ **addVersion**(`id`, `description?`): [`GuardrailVersion`](bedrock.GuardrailVersion.md)

Creates a version of the guardrail.

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `description?` | `string` |

#### Returns

[`GuardrailVersion`](bedrock.GuardrailVersion.md)

___

### addWordPolicyConfig

▸ **addWordPolicyConfig**(`wordsFilter?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `wordsFilter?` | `WordConfigProperty`[] |

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

### uploadWordPolicyFromFile

▸ **uploadWordPolicyFromFile**(`filePath`): `Promise`\<`void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `filePath` | `string` |

#### Returns

`Promise`\<`void`\>

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
