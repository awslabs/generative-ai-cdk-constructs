[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / IGuardrail

# Interface: IGuardrail

Represents a Guardrail, either created with CDK or imported.

## Extends

- `IResource`

## Properties

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.
For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

#### Inherited from

`IResource.env`

***

### guardrailArn

> `readonly` **guardrailArn**: `string`

The ARN of the guardrail.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:guardrail/yympzo398ipq"
```

#### Attribute

***

### guardrailId

> `readonly` **guardrailId**: `string`

The ID of the guardrail.

#### Example

```ts
"yympzo398ipq"
```

#### Attribute

***

### guardrailVersion

> **guardrailVersion**: `string`

The version of the guardrail. If no explicit version is created,
this will default to "DRAFT"

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

Optional KMS encryption key associated with this guardrail

***

### lastUpdated?

> `readonly` `optional` **lastUpdated**: `string`

When this guardrail was last updated.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

`IResource.stack`

## Methods

### applyRemovalPolicy()

> **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

#### Parameters

##### policy

`RemovalPolicy`

#### Returns

`void`

#### Inherited from

`IResource.applyRemovalPolicy`

***

### grant()

> **grant**(`grantee`, ...`actions`): `Grant`

Grant the given principal identity permissions to perform actions on this guardrail.

#### Parameters

##### grantee

`IGrantable`

##### actions

...`string`[]

#### Returns

`Grant`

***

### grantApply()

> **grantApply**(`grantee`): `Grant`

Grant the given identity permissions to apply the guardrail.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### metric()

> **metric**(`metricName`, `props`?): `Metric`

Return the given named metric for this guardrail.

#### Parameters

##### metricName

`string`

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocationClientErrors()

> **metricInvocationClientErrors**(`props`?): `Metric`

Return the invocation client errors metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocationLatency()

> **metricInvocationLatency**(`props`?): `Metric`

Return the invocation latency metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocations()

> **metricInvocations**(`props`?): `Metric`

Return the invocations metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocationServerErrors()

> **metricInvocationServerErrors**(`props`?): `Metric`

Return the invocation server errors metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocationsIntervened()

> **metricInvocationsIntervened**(`props`?): `Metric`

Return the invocations intervened metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricInvocationThrottles()

> **metricInvocationThrottles**(`props`?): `Metric`

Return the invocation throttles metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricTextUnitCount()

> **metricTextUnitCount**(`props`?): `Metric`

Return the text unit count metric for this guardrail.

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`
