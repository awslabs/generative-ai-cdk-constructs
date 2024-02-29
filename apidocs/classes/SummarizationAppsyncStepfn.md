[@cdklabs/generative-ai-cdk-constructs](../README.md) / SummarizationAppsyncStepfn

# Class: SummarizationAppsyncStepfn

## Hierarchy

- `Construct`

  ↳ **`SummarizationAppsyncStepfn`**

## Table of contents

### Constructors

- [constructor](SummarizationAppsyncStepfn.md#constructor)

### Properties

- [documentReaderLambdaFunction](SummarizationAppsyncStepfn.md#documentreaderlambdafunction)
- [eventBridgeBus](SummarizationAppsyncStepfn.md#eventbridgebus)
- [graphqlApi](SummarizationAppsyncStepfn.md#graphqlapi)
- [inputAssetBucket](SummarizationAppsyncStepfn.md#inputassetbucket)
- [inputValidationLambdaFunction](SummarizationAppsyncStepfn.md#inputvalidationlambdafunction)
- [node](SummarizationAppsyncStepfn.md#node)
- [processedAssetBucket](SummarizationAppsyncStepfn.md#processedassetbucket)
- [redisCluster](SummarizationAppsyncStepfn.md#rediscluster)
- [securityGroup](SummarizationAppsyncStepfn.md#securitygroup)
- [stateMachine](SummarizationAppsyncStepfn.md#statemachine)
- [summaryGeneratorLambdaFunction](SummarizationAppsyncStepfn.md#summarygeneratorlambdafunction)
- [vpc](SummarizationAppsyncStepfn.md#vpc)

### Methods

- [toString](SummarizationAppsyncStepfn.md#tostring)
- [isConstruct](SummarizationAppsyncStepfn.md#isconstruct)

## Constructors

### constructor

• **new SummarizationAppsyncStepfn**(`scope`, `id`, `props`): [`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`SummarizationAppsyncStepfnProps`](../interfaces/SummarizationAppsyncStepfnProps.md) | user provided props for the construct. |

#### Returns

[`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)

**`Summary`**

Constructs a new instance of the SummarizationAppsyncStepfn class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

## Properties

### documentReaderLambdaFunction

• `Readonly` **documentReaderLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the document reading job created by the construct

___

### eventBridgeBus

• `Readonly` **eventBridgeBus**: `IEventBus`

Returns an instance of events.IEventBus created by the construct

___

### graphqlApi

• `Readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.CfnGraphQLApi for summary created by the construct

___

### inputAssetBucket

• `Readonly` **inputAssetBucket**: `IBucket`

Returns the instance of s3.IBucket used by the construct

___

### inputValidationLambdaFunction

• `Readonly` **inputValidationLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the input validation job created by the construct

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### processedAssetBucket

• `Readonly` **processedAssetBucket**: `IBucket`

Returns the instance of s3.IBucket used by the construct

___

### redisCluster

• `Readonly` **redisCluster**: `CfnCacheCluster`

Returns an instance of redis cluster created by the construct

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

___

### stateMachine

• `Readonly` **stateMachine**: `StateMachine`

Step function

**`Default`**

```ts
- fieldLogLevel - None
```

___

### summaryGeneratorLambdaFunction

• `Readonly` **summaryGeneratorLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the summary generation job created by the construct

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
