[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BaseClass

# Class: BaseClass

## Extends

- `Construct`

## Extended by

- [`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)
- [`SummarizationAppsyncStepfn`](SummarizationAppsyncStepfn.md)
- [`QaAppsyncOpensearch`](QaAppsyncOpensearch.md)
- [`SageMakerEndpointBase`](SageMakerEndpointBase.md)
- [`ContentGenerationAppSyncLambda`](ContentGenerationAppSyncLambda.md)
- [`TextToSql`](TextToSql.md)
- [`LlamaIndexDataLoader`](LlamaIndexDataLoader.md)

## Constructors

### new BaseClass()

> **new BaseClass**(`scope`, `id`): [`BaseClass`](BaseClass.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

#### Returns

[`BaseClass`](BaseClass.md)

#### Overrides

`Construct.constructor`

## Properties

### constructUsageMetric

> `readonly` **constructUsageMetric**: `"uksb-1tupboc45"` = `'uksb-1tupboc45'`

construct usage metric , added in template description

***

### enablexray

> **enablexray**: `boolean` = `true`

enable disable xray tracing

#### Default

```ts
- True
```

***

### fieldLogLevel

> **fieldLogLevel**: `FieldLogLevel` = `appsync.FieldLogLevel.ALL`

Default  log config for all constructs

***

### lambdaTracing

> **lambdaTracing**: `Tracing` = `lambda.Tracing.ACTIVE`

enable disable lambda tracing

#### Default

```ts
- Active
```

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### retention

> **retention**: `RetentionDays` = `logs.RetentionDays.TEN_YEARS`

Default  log retention config for all constructs

***

### stage

> **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```

***

### usageMetricMap

> `protected` `static` **usageMetricMap**: `Record`\<`string`, `number`\>

Record<string, number> , maps construct name with number of deployments

## Methods

### addObservabilityToConstruct()

> `protected` **addObservabilityToConstruct**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### updateConstructUsageMetricCode()

> `protected` **updateConstructUsageMetricCode**(`props`, `scope`, `lambdaFunctions`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

##### scope

`Construct`

##### lambdaFunctions

`DockerImageFunction`[]

#### Returns

`void`

***

### updateEnvSuffix()

> `protected` **updateEnvSuffix**(`props`): `void`

#### Parameters

##### props

[`BaseClassProps`](../interfaces/BaseClassProps.md)

#### Returns

`void`

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

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
