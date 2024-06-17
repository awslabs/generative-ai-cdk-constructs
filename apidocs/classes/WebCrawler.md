[@cdklabs/generative-ai-cdk-constructs](../README.md) / WebCrawler

# Class: WebCrawler

## Hierarchy

- [`BaseClass`](BaseClass.md)

  ↳ **`WebCrawler`**

## Table of contents

### Constructors

- [constructor](WebCrawler.md#constructor)

### Properties

- [constructUsageMetric](WebCrawler.md#constructusagemetric)
- [dataBucket](WebCrawler.md#databucket)
- [enablexray](WebCrawler.md#enablexray)
- [fieldLogLevel](WebCrawler.md#fieldloglevel)
- [jobQueue](WebCrawler.md#jobqueue)
- [jobsTable](WebCrawler.md#jobstable)
- [lambdaCrawler](WebCrawler.md#lambdacrawler)
- [lambdaCrawlerApiSchemaPath](WebCrawler.md#lambdacrawlerapischemapath)
- [lambdaTracing](WebCrawler.md#lambdatracing)
- [node](WebCrawler.md#node)
- [retention](WebCrawler.md#retention)
- [snsTopic](WebCrawler.md#snstopic)
- [stage](WebCrawler.md#stage)
- [targetsTable](WebCrawler.md#targetstable)
- [vpc](WebCrawler.md#vpc)
- [webCrawlerJobDefinition](WebCrawler.md#webcrawlerjobdefinition)
- [usageMetricMap](WebCrawler.md#usagemetricmap)

### Methods

- [addObservabilityToConstruct](WebCrawler.md#addobservabilitytoconstruct)
- [toString](WebCrawler.md#tostring)
- [updateConstructUsageMetricCode](WebCrawler.md#updateconstructusagemetriccode)
- [updateEnvSuffix](WebCrawler.md#updateenvsuffix)
- [isConstruct](WebCrawler.md#isconstruct)

## Constructors

### constructor

• **new WebCrawler**(`scope`, `id`, `props`): [`WebCrawler`](WebCrawler.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`WebCrawlerProps`](../interfaces/WebCrawlerProps.md) | user provided props for the construct. |

#### Returns

[`WebCrawler`](WebCrawler.md)

**`Summary`**

Constructs a new instance of the WebCrawler class.

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

### dataBucket

• `Readonly` **dataBucket**: `IBucket`

Returns the instance of S3 bucket used by the construct

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

### jobQueue

• `Readonly` **jobQueue**: `IJobQueue`

Returns the instance of JobQueue used by the construct

___

### jobsTable

• `Readonly` **jobsTable**: `ITable`

Returns the instance of Jobs DynamoDB table

___

### lambdaCrawler

• `Readonly` **lambdaCrawler**: `undefined` \| `IFunction`

Lambda crawler

___

### lambdaCrawlerApiSchemaPath

• `Readonly` **lambdaCrawlerApiSchemaPath**: `string`

Lambda crawler API schema path

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

### snsTopic

• `Readonly` **snsTopic**: `ITopic`

Returns the instance of SNS Topic used by the construct

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

### targetsTable

• `Readonly` **targetsTable**: `ITable`

Returns the instance of Targets DynamoDB table

___

### vpc

• `Readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

___

### webCrawlerJobDefinition

• `Readonly` **webCrawlerJobDefinition**: `IJobDefinition`

Returns the instance of JobDefinition used by the construct

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
