[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / SummarizationAppsyncStepfn

# Class: SummarizationAppsyncStepfn

## Extends

- [`BaseClass`](BaseClass.md)

## Constructors

### new SummarizationAppsyncStepfn()

> **new SummarizationAppsyncStepfn**(`scope`, `id`, `props`): [`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)

Constructs a new instance of the SummarizationAppsyncStepfn class.

#### Parameters

• **scope**: `Construct`

represents the scope for all the resources.

• **id**: `string`

this is a a scope-unique id.

• **props**: [`SummarizationAppsyncStepfnProps`](../interfaces/SummarizationAppsyncStepfnProps.md)

user provided props for the construct.

#### Returns

[`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)

#### Since

0.0.0

#### Overrides

[`BaseClass`](BaseClass.md).[`constructor`](BaseClass.md#constructors)

## Properties

### constructUsageMetric

> `readonly` **constructUsageMetric**: `"uksb-1tupboc45"` = `'uksb-1tupboc45'`

construct usage metric , added in template description

#### Inherited from

[`BaseClass`](BaseClass.md).[`constructUsageMetric`](BaseClass.md#constructusagemetric)

***

### documentReaderLambdaFunction

> `readonly` **documentReaderLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the document reading job created by the construct

***

### enablexray

> **enablexray**: `boolean` = `true`

enable disable xray tracing

#### Default

```ts
- True
```

#### Inherited from

[`BaseClass`](BaseClass.md).[`enablexray`](BaseClass.md#enablexray)

***

### eventBridgeBus

> `readonly` **eventBridgeBus**: `IEventBus`

Returns an instance of events.IEventBus created by the construct

***

### fieldLogLevel

> **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[`BaseClass`](BaseClass.md).[`fieldLogLevel`](BaseClass.md#fieldloglevel)

***

### graphqlApi

> `readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.CfnGraphQLApi for summary created by the construct

***

### graphqlApiId

> `readonly` **graphqlApiId**: `string`

Graphql Api Id value

***

### graphqlUrl

> `readonly` **graphqlUrl**: `string`

Graphql Url value

***

### inputAssetBucket

> `readonly` **inputAssetBucket**: `IBucket`

Returns the instance of s3.IBucket used by the construct

***

### inputValidationLambdaFunction

> `readonly` **inputValidationLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the input validation job created by the construct

***

### lambdaTracing

> **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

#### Default

```ts
- Active
```

#### Inherited from

[`BaseClass`](BaseClass.md).[`lambdaTracing`](BaseClass.md#lambdatracing)

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

[`BaseClass`](BaseClass.md).[`node`](BaseClass.md#node)

***

### processedAssetBucket

> `readonly` **processedAssetBucket**: `IBucket`

Returns the instance of s3.IBucket used by the construct

***

### retention

> **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[`BaseClass`](BaseClass.md).[`retention`](BaseClass.md#retention)

***

### securityGroup

> `readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

***

### stage

> **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```

#### Inherited from

[`BaseClass`](BaseClass.md).[`stage`](BaseClass.md#stage)

***

### stateMachine

> `readonly` **stateMachine**: `StateMachine`

Step function

#### Default

```ts
- fieldLogLevel - None
```

***

### summaryGeneratorLambdaFunction

> `readonly` **summaryGeneratorLambdaFunction**: `DockerImageFunction`

Returns an instance of lambda.DockerImageFunction used for the summary generation job created by the construct

***

### vpc

> `readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

***

### usageMetricMap

> `protected` `static` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

#### Inherited from

[`BaseClass`](BaseClass.md).[`usageMetricMap`](BaseClass.md#usagemetricmap)

## Methods

### addObservabilityToConstruct()

> `protected` **addObservabilityToConstruct**(`props`): `void`

#### Parameters

• **props**: [`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`BaseClass`](BaseClass.md).[`addObservabilityToConstruct`](BaseClass.md#addobservabilitytoconstruct)

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[`BaseClass`](BaseClass.md).[`toString`](BaseClass.md#tostring)

***

### updateConstructUsageMetricCode()

> `protected` **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

• **props**: [`BaseClassProps`](../interfaces/BaseClassProps.md)

• **scope**: `Construct`

• **lambdaFunctions**: `DockerImageFunction`[]

#### Returns

`void`

#### Inherited from

[`BaseClass`](BaseClass.md).[`updateConstructUsageMetricCode`](BaseClass.md#updateconstructusagemetriccode)

***

### updateEnvSuffix()

> `protected` **updateEnvSuffix**(`props`): `void`

#### Parameters

• **props**: [`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

#### Inherited from

[`BaseClass`](BaseClass.md).[`updateEnvSuffix`](BaseClass.md#updateenvsuffix)

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

[`BaseClass`](BaseClass.md).[`isConstruct`](BaseClass.md#isconstruct)
