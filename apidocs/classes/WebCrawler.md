[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawler

# Class: WebCrawler

## Extends

- [`BaseClass`](BaseClass.md)

## Constructors

### new WebCrawler()

> **new WebCrawler**(`scope`, `id`, `props`): [`WebCrawler`](WebCrawler.md)

Constructs a new instance of the WebCrawler class.

#### Parameters

• **scope**: `Construct`

represents the scope for all the resources.

• **id**: `string`

this is a a scope-unique id.

• **props**: [`WebCrawlerProps`](../interfaces/WebCrawlerProps.md)

user provided props for the construct.

#### Returns

[`WebCrawler`](WebCrawler.md)

#### Since

0.0.0

#### Deprecated

This construct is deprecated and will be removed in a future major version.
It will not receive security updates.

#### Overrides

[`BaseClass`](BaseClass.md).[`constructor`](BaseClass.md#constructors)

## Properties

### constructUsageMetric

> `readonly` **constructUsageMetric**: `"uksb-1tupboc45"` = `'uksb-1tupboc45'`

construct usage metric , added in template description

#### Inherited from

[`BaseClass`](BaseClass.md).[`constructUsageMetric`](BaseClass.md#constructusagemetric)

***

### dataBucket

> `readonly` **dataBucket**: `IBucket`

Returns the instance of S3 bucket used by the construct

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

### fieldLogLevel

> **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

#### Inherited from

[`BaseClass`](BaseClass.md).[`fieldLogLevel`](BaseClass.md#fieldloglevel)

***

### jobQueue

> `readonly` **jobQueue**: `IJobQueue`

Returns the instance of JobQueue used by the construct

***

### jobsTable

> `readonly` **jobsTable**: `ITable`

Returns the instance of Jobs DynamoDB table

***

### lambdaCrawler

> `readonly` **lambdaCrawler**: `undefined` \| `IFunction`

Lambda crawler

***

### lambdaCrawlerApiSchemaPath

> `readonly` **lambdaCrawlerApiSchemaPath**: `string`

Lambda crawler API schema path

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

### retention

> **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

#### Inherited from

[`BaseClass`](BaseClass.md).[`retention`](BaseClass.md#retention)

***

### snsTopic

> `readonly` **snsTopic**: `ITopic`

Returns the instance of SNS Topic used by the construct

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

### targetsTable

> `readonly` **targetsTable**: `ITable`

Returns the instance of Targets DynamoDB table

***

### vpc

> `readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

***

### webCrawlerJobDefinition

> `readonly` **webCrawlerJobDefinition**: `IJobDefinition`

Returns the instance of JobDefinition used by the construct

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
