[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContentGenerationAppsyncLambda

# Class: ContentGenerationAppsyncLambda

**`Summary`**

The ContentGenerationAppsyncLambda class.

## Hierarchy

- `Construct`

  ↳ **`ContentGenerationAppsyncLambda`**

## Table of contents

### Constructors

- [constructor](ContentGenerationAppsyncLambda.md#constructor)

### Properties

- [generatedImageBus](ContentGenerationAppsyncLambda.md#generatedimagebus)
- [graphqlApi](ContentGenerationAppsyncLambda.md#graphqlapi)
- [node](ContentGenerationAppsyncLambda.md#node)
- [s3GenerateAssetsBucket](ContentGenerationAppsyncLambda.md#s3generateassetsbucket)
- [s3GenerateAssetsBucketInterface](ContentGenerationAppsyncLambda.md#s3generateassetsbucketinterface)
- [securityGroup](ContentGenerationAppsyncLambda.md#securitygroup)
- [vpc](ContentGenerationAppsyncLambda.md#vpc)

### Methods

- [toString](ContentGenerationAppsyncLambda.md#tostring)
- [isConstruct](ContentGenerationAppsyncLambda.md#isconstruct)

## Constructors

### constructor

• **new ContentGenerationAppsyncLambda**(`scope`, `id`, `props`): [`ContentGenerationAppsyncLambda`](ContentGenerationAppsyncLambda.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`ContentGenerationAppsyncLambdaProps`](../interfaces/ContentGenerationAppsyncLambdaProps.md) | user provided props for the construct. |

#### Returns

[`ContentGenerationAppsyncLambda`](ContentGenerationAppsyncLambda.md)

**`Summary`**

Constructs a new instance of the ContentGenerationAppsyncLambda class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

## Properties

### generatedImageBus

• `Readonly` **generatedImageBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

___

### graphqlApi

• `Readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.IGraphqlApi created by the construct

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### s3GenerateAssetsBucket

• `Optional` `Readonly` **s3GenerateAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingGeneratedAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

___

### s3GenerateAssetsBucketInterface

• `Readonly` **s3GenerateAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

___

### vpc

• `Readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

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
