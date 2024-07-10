[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / Guardrail

# Class: Guardrail

Deploy bedrock guardrail .

## Extends

- `Construct`

## Constructors

### new Guardrail()

> **new Guardrail**(`scope`, `id`, `props`): [`Guardrail`](Guardrail.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: [`GuardrailProps`](../interfaces/GuardrailProps.md)

#### Returns

[`Guardrail`](Guardrail.md)

#### Overrides

`Construct.constructor`

## Properties

### guardrailId

> `readonly` **guardrailId**: `string`

guardrail Id

#### Default

```ts

```

***

### guardrailInstance

> `readonly` **guardrailInstance**: `CfnGuardrail`

Instance of guardrail

***

### guardrailVersion

> `readonly` **guardrailVersion**: `string`

guardrail version

#### Default

```ts

```

***

### kmsKeyArn

> `readonly` **kmsKeyArn**: `string`

The ARN of the AWS KMS key used to encrypt the guardrail.

#### Default

```ts

```

***

### name

> `readonly` **name**: `string`

The name of the guardrail.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

## Methods

### addSensitiveInformationPolicyConfig()

> **addSensitiveInformationPolicyConfig**(`props`, `guardrailRegexesConfig`): `void`

#### Parameters

• **props**: [`SensitiveInformationPolicyConfigProps`](../interfaces/SensitiveInformationPolicyConfigProps.md)[]

• **guardrailRegexesConfig**: `RegexConfigProperty`

#### Returns

`void`

***

### addTags()

> **addTags**(`props`): `void`

#### Parameters

• **props**: [`GuardrailProps`](../interfaces/GuardrailProps.md)

#### Returns

`void`

***

### addTopicPolicyConfig()

> **addTopicPolicyConfig**(`topic`): `void`

#### Parameters

• **topic**: [`Topic`](Topic.md)

#### Returns

`void`

***

### addVersion()

> **addVersion**(`id`, `description`?): [`GuardrailVersion`](GuardrailVersion.md)

Creates a version of the guardrail.

#### Parameters

• **id**: `string`

• **description?**: `string`

#### Returns

[`GuardrailVersion`](GuardrailVersion.md)

***

### addWordPolicyConfig()

> **addWordPolicyConfig**(`wordsFilter`?): `void`

#### Parameters

• **wordsFilter?**: `WordConfigProperty`[]

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### uploadWordPolicyFromFile()

> **uploadWordPolicyFromFile**(`filePath`): `Promise`\<`void`\>

#### Parameters

• **filePath**: `string`

#### Returns

`Promise`\<`void`\>

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

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

• **x**: `any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
