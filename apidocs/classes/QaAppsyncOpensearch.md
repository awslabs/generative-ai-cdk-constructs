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
- [qaLambdaFunction](QaAppsyncOpensearch.md#qalambdafunction)
- [s3InputAssetsBucket](QaAppsyncOpensearch.md#s3inputassetsbucket)
- [s3InputAssetsBucketInterface](QaAppsyncOpensearch.md#s3inputassetsbucketinterface)
- [securityGroup](QaAppsyncOpensearch.md#securitygroup)
- [vpc](QaAppsyncOpensearch.md#vpc)
- [CONSTRUCT\_SCHEMA\_UPDATE\_WARNING](QaAppsyncOpensearch.md#construct_schema_update_warning)

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

## Properties

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

### qaBus

• `Readonly` **qaBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

___

### qaLambdaFunction

• `Readonly` **qaLambdaFunction**: `DockerImageFunction`

Returns an instance of appsync.IGraphqlApi created by the construct

___

### s3InputAssetsBucket

• `Optional` `Readonly` **s3InputAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

___

### s3InputAssetsBucketInterface

• `Readonly` **s3InputAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

___

### vpc

• `Readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

___

### CONSTRUCT\_SCHEMA\_UPDATE\_WARNING

▪ `Static` `Readonly` **CONSTRUCT\_SCHEMA\_UPDATE\_WARNING**: ``"\n  Attention QaAppsyncOpensearch users, an update has been made to \n  the GraphQL schema.To ensure continued functionality, please review \n  and update your GraphQL mutations and subscriptions to align with \n  the new schema.This schema update enables enhanced capabilities \n  and optimizations,so adopting the changes is recommended. \n  Please refer to the construct documentation for details \n  on the schema changes and examples of updated GraphQL statements.\n  Reach out to the support team if you need assistance \n  updating your integration codebase.  \n  "``

Construct warning

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
