[@cdklabs/generative-ai-cdk-constructs](../README.md) / SummarizationAppsyncStepfn

# Class: SummarizationAppsyncStepfn

## Hierarchy

- [`BaseClass`](BaseClass.md)

  ↳ **`SummarizationAppsyncStepfn`**

## Table of contents

### Constructors

- [constructor](SummarizationAppsyncStepfn.md#constructor)

### Properties

- [constructUsageMetric](SummarizationAppsyncStepfn.md#constructusagemetric)
- [documentReaderLambdaFunction](SummarizationAppsyncStepfn.md#documentreaderlambdafunction)
- [enablexray](SummarizationAppsyncStepfn.md#enablexray)
- [eventBridgeBus](SummarizationAppsyncStepfn.md#eventbridgebus)
- [fieldLogLevel](SummarizationAppsyncStepfn.md#fieldloglevel)
- [graphqlApi](SummarizationAppsyncStepfn.md#graphqlapi)
- [inputAssetBucket](SummarizationAppsyncStepfn.md#inputassetbucket)
- [inputValidationLambdaFunction](SummarizationAppsyncStepfn.md#inputvalidationlambdafunction)
- [lambdaTracing](SummarizationAppsyncStepfn.md#lambdatracing)
- [node](SummarizationAppsyncStepfn.md#node)
- [processedAssetBucket](SummarizationAppsyncStepfn.md#processedassetbucket)
- [redisCluster](SummarizationAppsyncStepfn.md#rediscluster)
- [retention](SummarizationAppsyncStepfn.md#retention)
- [securityGroup](SummarizationAppsyncStepfn.md#securitygroup)
- [stage](SummarizationAppsyncStepfn.md#stage)
- [stateMachine](SummarizationAppsyncStepfn.md#statemachine)
- [summaryGeneratorLambdaFunction](SummarizationAppsyncStepfn.md#summarygeneratorlambdafunction)
- [vpc](SummarizationAppsyncStepfn.md#vpc)
- [usageMetricMap](SummarizationAppsyncStepfn.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](SummarizationAppsyncStepfn.md#addobservabilitytoconstruct)
- [toString](SummarizationAppsyncStepfn.md#tostring)
- [updateConstructUsageMetricCode](SummarizationAppsyncStepfn.md#updateconstructusagemetriccode)
- [updateEnvSuffix](SummarizationAppsyncStepfn.md#updateenvsuffix)
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

[BaseClass](BaseClass.md).[constructor](BaseClass.md#constructor)

## Properties

### constructUsageMetric

• `Readonly` **constructUsageMetric**: ``"uksb-1tupboc45"``

construct usage metric , added in template description

#### Inherited from

[BaseClass](BaseClass.md).[constructUsageMetric](BaseClass.md#constructusagemetric)

___

### documentReaderLambdaFunction

• `Readonly` **documentReaderLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the document reading job created by the construct

___

### enablexray

• **enablexray**: `boolean` = `true`

enable disable xray tracing

**`Default`**

```ts
- True
```

#### Inherited from

[BaseClass](BaseClass.md).[enablexray](BaseClass.md#enablexray)

___

### eventBridgeBus

• `Readonly` **eventBridgeBus**: `IEventBus`

Returns an instance of events.IEventBus created by the construct

___

### fieldLogLevel

• **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[fieldLogLevel](BaseClass.md#fieldloglevel)

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

### lambdaTracing

• **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

**`Default`**

```ts
- Active
```

#### Inherited from

[BaseClass](BaseClass.md).[lambdaTracing](BaseClass.md#lambdatracing)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

[BaseClass](BaseClass.md).[node](BaseClass.md#node)

___

### processedAssetBucket

• `Readonly` **processedAssetBucket**: `IBucket`

Returns the instance of s3.IBucket used by the construct

___

### redisCluster

• `Readonly` **redisCluster**: `CfnCacheCluster`

Returns an instance of redis cluster created by the construct

___

### retention

• **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[retention](BaseClass.md#retention)

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

___

### stage

• **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Inherited from

[BaseClass](BaseClass.md).[stage](BaseClass.md#stage)

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

___

### usageMetricMap

▪ `Static` `Protected` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[BaseClass](BaseClass.md).[usageMetricMap](BaseClass.md#usagemetricmap)

## Methods

### addObservabilityToConstruct

▸ **addObservabilityToConstruct**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[addObservabilityToConstruct](BaseClass.md#addobservabilitytoconstruct)

___

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[BaseClass](BaseClass.md).[toString](BaseClass.md#tostring)

___

### updateConstructUsageMetricCode

▸ **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |
| `scope` | `Construct` |
| `lambdaFunctions` | `DockerImageFunction`[] |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[updateConstructUsageMetricCode](BaseClass.md#updateconstructusagemetriccode)

___

### updateEnvSuffix

▸ **updateEnvSuffix**(`props`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `props` | [`BaseClassProps`](../interfaces/BaseClassProps.md) |

#### Returns

`void`

#### Inherited from

[BaseClass](BaseClass.md).[updateEnvSuffix](BaseClass.md#updateenvsuffix)

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

[BaseClass](BaseClass.md).[isConstruct](BaseClass.md#isconstruct)
