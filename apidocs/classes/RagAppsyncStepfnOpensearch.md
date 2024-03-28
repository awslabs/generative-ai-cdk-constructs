[@cdklabs/generative-ai-cdk-constructs](../README.md) / RagAppsyncStepfnOpensearch

# Class: RagAppsyncStepfnOpensearch

**`Summary`**

The RagAppsyncStepfnOpensearch class.

## Hierarchy

- [`BaseClass`](BaseClass.md)

  ↳ **`RagAppsyncStepfnOpensearch`**

## Table of contents

### Constructors

- [constructor](RagAppsyncStepfnOpensearch.md#constructor)

### Properties

- [constructUsageMetric](RagAppsyncStepfnOpensearch.md#constructusagemetric)
- [embeddingsLambdaFunction](RagAppsyncStepfnOpensearch.md#embeddingslambdafunction)
- [enablexray](RagAppsyncStepfnOpensearch.md#enablexray)
- [fieldLogLevel](RagAppsyncStepfnOpensearch.md#fieldloglevel)
- [fileTransformerLambdaFunction](RagAppsyncStepfnOpensearch.md#filetransformerlambdafunction)
- [graphqlApi](RagAppsyncStepfnOpensearch.md#graphqlapi)
- [ingestionBus](RagAppsyncStepfnOpensearch.md#ingestionbus)
- [inputValidationLambdaFunction](RagAppsyncStepfnOpensearch.md#inputvalidationlambdafunction)
- [lambdaTracing](RagAppsyncStepfnOpensearch.md#lambdatracing)
- [node](RagAppsyncStepfnOpensearch.md#node)
- [retention](RagAppsyncStepfnOpensearch.md#retention)
- [s3InputAssetsBucket](RagAppsyncStepfnOpensearch.md#s3inputassetsbucket)
- [s3InputAssetsBucketInterface](RagAppsyncStepfnOpensearch.md#s3inputassetsbucketinterface)
- [s3ProcessedAssetsBucket](RagAppsyncStepfnOpensearch.md#s3processedassetsbucket)
- [s3ProcessedAssetsBucketInterface](RagAppsyncStepfnOpensearch.md#s3processedassetsbucketinterface)
- [securityGroup](RagAppsyncStepfnOpensearch.md#securitygroup)
- [stage](RagAppsyncStepfnOpensearch.md#stage)
- [stateMachine](RagAppsyncStepfnOpensearch.md#statemachine)
- [vpc](RagAppsyncStepfnOpensearch.md#vpc)
- [usageMetricMap](RagAppsyncStepfnOpensearch.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](RagAppsyncStepfnOpensearch.md#addobservabilitytoconstruct)
- [toString](RagAppsyncStepfnOpensearch.md#tostring)
- [updateConstructUsageMetricCode](RagAppsyncStepfnOpensearch.md#updateconstructusagemetriccode)
- [updateEnvSuffix](RagAppsyncStepfnOpensearch.md#updateenvsuffix)
- [isConstruct](RagAppsyncStepfnOpensearch.md#isconstruct)

## Constructors

### constructor

• **new RagAppsyncStepfnOpensearch**(`scope`, `id`, `props`): [`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a scope-unique id. |
| `props` | [`RagAppsyncStepfnOpensearchProps`](../interfaces/RagAppsyncStepfnOpensearchProps.md) | user provided props for the construct. |

#### Returns

[`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)

**`Summary`**

Constructs a new instance of the RagAppsyncStepfnOpensearch class.

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

### embeddingsLambdaFunction

• `Readonly` **embeddingsLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the embeddings job created by the construct

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

### fieldLogLevel

• **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[fieldLogLevel](BaseClass.md#fieldloglevel)

___

### fileTransformerLambdaFunction

• `Readonly` **fileTransformerLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the file transformer job created by the construct

___

### graphqlApi

• `Readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.IGraphqlApi created by the construct

___

### ingestionBus

• `Readonly` **ingestionBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

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

### retention

• **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[BaseClass](BaseClass.md).[retention](BaseClass.md#retention)

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

### s3ProcessedAssetsBucket

• `Optional` `Readonly` **s3ProcessedAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingProcessedAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

___

### s3ProcessedAssetsBucketInterface

• `Readonly` **s3ProcessedAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

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

Returns an instance of stepfn.StateMachine created by the construct

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
