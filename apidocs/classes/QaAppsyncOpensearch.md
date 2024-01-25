[@cdklabs/generative-ai-cdk-constructs](../README.md) / QaAppsyncOpensearch

# Class: QaAppsyncOpensearch

**`Summary`**

The QaAppsyncOpensearch class.

## Hierarchy

- `Construct`

  ↳ **`QaAppsyncOpensearch`**

## Table of contents

### Constructors

- [constructor](QaAppsyncOpensearch.md#constructor)

### Properties

- [graphqlApi](QaAppsyncOpensearch.md#graphqlapi)
- [node](QaAppsyncOpensearch.md#node)
- [qaBus](QaAppsyncOpensearch.md#qabus)
- [s3InputAssetsBucket](QaAppsyncOpensearch.md#s3inputassetsbucket)
- [s3InputAssetsBucketInterface](QaAppsyncOpensearch.md#s3inputassetsbucketinterface)
- [securityGroup](QaAppsyncOpensearch.md#securitygroup)
- [vpc](QaAppsyncOpensearch.md#vpc)

### Methods

- [toString](QaAppsyncOpensearch.md#tostring)
- [isConstruct](QaAppsyncOpensearch.md#isconstruct)

## Constructors

### constructor

• **new QaAppsyncOpensearch**(`scope`, `id`, `props`): [`QaAppsyncOpensearch`](QaAppsyncOpensearch.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`QaAppsyncOpensearchProps`](../interfaces/QaAppsyncOpensearchProps.md) | user provided props for the construct. |

#### Returns

[`QaAppsyncOpensearch`](QaAppsyncOpensearch.md)

**`Summary`**

Constructs a new instance of the RagAppsyncStepfnOpensearch class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:180](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L180)

## Properties

### graphqlApi

• `Readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.IGraphqlApi created by the construct

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L170)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

___

### qaBus

• `Readonly` **qaBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:156](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L156)

___

### s3InputAssetsBucket

• `Optional` `Readonly` **s3InputAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:166](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L166)

___

### s3InputAssetsBucketInterface

• `Readonly` **s3InputAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:160](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L160)

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:152](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L152)

___

### vpc

• `Readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:148](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L148)

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
