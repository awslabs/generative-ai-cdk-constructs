[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContentGenerationAppSyncLambda

# Class: ContentGenerationAppSyncLambda

**`Summary`**

The ContentGenerationAppSyncLambda class.

## Hierarchy

- [`BaseClass`](BaseClass.md)

  ↳ **`ContentGenerationAppSyncLambda`**

## Table of contents

### Constructors

- [constructor](ContentGenerationAppSyncLambda.md#constructor)

### Properties

- [cgLambdaFunction](ContentGenerationAppSyncLambda.md#cglambdafunction)
- [constructUsageMetric](ContentGenerationAppSyncLambda.md#constructusagemetric)
- [enablexray](ContentGenerationAppSyncLambda.md#enablexray)
- [fieldLogLevel](ContentGenerationAppSyncLambda.md#fieldloglevel)
- [generatedImageBus](ContentGenerationAppSyncLambda.md#generatedimagebus)
- [graphqlApi](ContentGenerationAppSyncLambda.md#graphqlapi)
- [lambdaTracing](ContentGenerationAppSyncLambda.md#lambdatracing)
- [node](ContentGenerationAppSyncLambda.md#node)
- [retention](ContentGenerationAppSyncLambda.md#retention)
- [s3GenerateAssetsBucket](ContentGenerationAppSyncLambda.md#s3generateassetsbucket)
- [s3GenerateAssetsBucketInterface](ContentGenerationAppSyncLambda.md#s3generateassetsbucketinterface)
- [securityGroup](ContentGenerationAppSyncLambda.md#securitygroup)
- [stage](ContentGenerationAppSyncLambda.md#stage)
- [vpc](ContentGenerationAppSyncLambda.md#vpc)
- [usageMetricMap](ContentGenerationAppSyncLambda.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](ContentGenerationAppSyncLambda.md#addobservabilitytoconstruct)
- [toString](ContentGenerationAppSyncLambda.md#tostring)
- [updateConstructUsageMetricCode](ContentGenerationAppSyncLambda.md#updateconstructusagemetriccode)
- [updateEnvSuffix](ContentGenerationAppSyncLambda.md#updateenvsuffix)
- [isConstruct](ContentGenerationAppSyncLambda.md#isconstruct)

## Constructors

### constructor

• **new ContentGenerationAppSyncLambda**(`scope`, `id`, `props`): [`ContentGenerationAppSyncLambda`](ContentGenerationAppSyncLambda.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`ContentGenerationAppSyncLambdaProps`](../interfaces/ContentGenerationAppSyncLambdaProps.md) | user provided props for the construct. |

#### Returns

[`ContentGenerationAppSyncLambda`](ContentGenerationAppSyncLambda.md)

**`Summary`**

Constructs a new instance of the ContentGenerationAppSyncLambda class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

[BaseClass](BaseClass.md).[constructor](BaseClass.md#constructor)

## Properties

### cgLambdaFunction

• `Readonly` **cgLambdaFunction**: `DockerImageFunction`

Returns an instance of appsync.IGraphqlApi created by the construct

___

### constructUsageMetric

• `Readonly` **constructUsageMetric**: ``"uksb-1tupboc45"``

construct usage metric , added in template description

#### Inherited from

[BaseClass](BaseClass.md).[constructUsageMetric](BaseClass.md#constructusagemetric)

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

### generatedImageBus

• `Readonly` **generatedImageBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

___

### graphqlApi

• `Readonly` **graphqlApi**: `GraphqlApi`

Returns an instance of appsync.IGraphqlApi created by the construct

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
