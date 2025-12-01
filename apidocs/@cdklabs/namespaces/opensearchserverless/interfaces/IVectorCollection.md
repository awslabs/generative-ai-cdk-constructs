[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [opensearchserverless](../README.md) / IVectorCollection

# Interface: IVectorCollection

Interface representing a vector collection

## Extends

- `IResource`

## Properties

### aossPolicy

> `readonly` **aossPolicy**: `ManagedPolicy`

An IAM policy that allows API access to the collection.

***

### collectionArn

> `readonly` **collectionArn**: `string`

The ARN of the collection.

***

### collectionId

> `readonly` **collectionId**: `string`

The ID of the collection.

***

### collectionName

> `readonly` **collectionName**: `string`

The name of the collection.

***

### collectionType

> `readonly` **collectionType**: [`VectorCollectionType`](../enumerations/VectorCollectionType.md)

Type of collection

***

### dataAccessPolicy

> `readonly` **dataAccessPolicy**: `CfnAccessPolicy`

An OpenSearch Access Policy that allows access to the index.

***

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed in a Stack (those created by
creating new class instances like `new Role()`, `new Bucket()`, etc.), this
is always the same as the environment of the stack they belong to.

For referenced resources (those obtained from referencing methods like
`Role.fromRoleArn()`, `Bucket.fromBucketName()`, etc.), they might be
different than the stack they were imported into.

#### Inherited from

`cdk.IResource.env`

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`cdk.IResource.node`

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

`cdk.IResource.stack`

***

### standbyReplicas

> `readonly` **standbyReplicas**: [`VectorCollectionStandbyReplicas`](../enumerations/VectorCollectionStandbyReplicas.md)

Indicates whether standby replicas are enabled.

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

`cdk.IResource.applyRemovalPolicy`

***

### metric()

> **metric**(`metricName`, `props?`): `Metric`

Return the given named metric for this VectorCollection.

#### Parameters

##### metricName

`string`

The name of the metric

##### props?

`MetricOptions`

Properties for the metric

#### Returns

`Metric`

***

### metricIndexRequestCount()

> **metricIndexRequestCount**(`props?`): `Metric`

Metric for the number of index requests.

#### Parameters

##### props?

`MetricOptions`

Properties for the metric

#### Returns

`Metric`

***

### metricSearchLatency()

> **metricSearchLatency**(`props?`): `Metric`

Metric for the search latency.

#### Parameters

##### props?

`MetricOptions`

Properties for the metric

#### Returns

`Metric`

***

### metricSearchLatencyP90()

> **metricSearchLatencyP90**(`props?`): `Metric`

Metric for the 90th percentile search latency.

#### Parameters

##### props?

`MetricOptions`

Properties for the metric

#### Returns

`Metric`

***

### metricSearchRequestCount()

> **metricSearchRequestCount**(`props?`): `Metric`

Metric for the number of search requests.

#### Parameters

##### props?

`MetricOptions`

Properties for the metric

#### Returns

`Metric`
