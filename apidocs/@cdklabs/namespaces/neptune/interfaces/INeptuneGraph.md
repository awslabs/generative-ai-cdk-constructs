[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [neptune](../README.md) / INeptuneGraph

# Interface: INeptuneGraph

Interface representing a Neptune Graph database.

## Extends

- `IResource`

## Properties

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

`IResource.env`

***

### graphArn

> `readonly` **graphArn**: `string`

The Neptune Graph ARN.

#### Example

```ts
'arn:aws:neptune-graph:us-east-1:111122223333:graph/g-12a3bcdef4'
```

***

### graphEndpoint

> `readonly` **graphEndpoint**: `string`

The Neptune Graph endpoint.

#### Example

```ts
'g-12a3bcdef4.us-east-1.neptune-graph.amazonaws.com'
```

***

### graphId

> `readonly` **graphId**: `string`

The Neptune Graph Identifier.

#### Example

```ts
'g-12a3bcdef4'
```

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

### createNotebook()

> **createNotebook**(`params?`): [`NeptuneGraphNotebook`](../classes/NeptuneGraphNotebook.md)

Creates a Neptune Graph Notebook for the graph. Defaults to a ml.t3.medium instance type.
**Note: Creating a notebook will incur additional AWS costs for the notebook instance.**

#### Parameters

##### params?

[`NeptuneGraphNotebookProps`](NeptuneGraphNotebookProps.md)

#### Returns

[`NeptuneGraphNotebook`](../classes/NeptuneGraphNotebook.md)

***

### grant()

> **grant**(`grantee`, `actions`): `Grant`

Grant the given principal identity permissions to perform actions on this agent alias.

#### Parameters

##### grantee

`IGrantable`

##### actions

`string`[]

#### Returns

`Grant`

***

### grantExportTask()

> **grantExportTask**(`grantee`): `Grant`

Grant the given identity the permissions to export the graph into columnar structured .csv and .parquet files.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### grantFullAccess()

> **grantFullAccess**(`grantee`): `Grant`

Grant the given identity full access to the Graph.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### grantQuery()

> **grantQuery**(`grantee`): `Grant`

Grant the given identity the permissions to query the Graph.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### grantReadOnly()

> **grantReadOnly**(`grantee`): `Grant`

Grant the given identity the permissions to read the Graph.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### metric()

> **metric**(`metricName`, `props?`): `Metric`

Return the given named metric for this guardrail.

#### Parameters

##### metricName

`string`

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricCPUUtilization()

> **metricCPUUtilization**(`props?`): `Metric`

Returns metric for CPU utilization

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricGraphSizeBytes()

> **metricGraphSizeBytes**(`props?`): `Metric`

Returns metric for graph size in bytes

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricGraphStorageUsagePercent()

> **metricGraphStorageUsagePercent**(`props?`): `Metric`

Returns metric for graph storage usage percentage

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumEdgeProperties()

> **metricNumEdgeProperties**(`props?`): `Metric`

Returns metric for number of edge properties

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumEdges()

> **metricNumEdges**(`props?`): `Metric`

Returns metric for number of edges

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumOpenCypherClientErrorsPerSec()

> **metricNumOpenCypherClientErrorsPerSec**(`props?`): `Metric`

Returns metric for number of OpenCypher client errors per second

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumOpenCypherRequestsPerSec()

> **metricNumOpenCypherRequestsPerSec**(`props?`): `Metric`

Returns metric for number of OpenCypher requests per second

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumOpenCypherServerErrorsPerSec()

> **metricNumOpenCypherServerErrorsPerSec**(`props?`): `Metric`

Returns metric for number of OpenCypher server errors per second

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumQueuedRequestsPerSec()

> **metricNumQueuedRequestsPerSec**(`props?`): `Metric`

Returns metric for number of queued requests per second

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumVectors()

> **metricNumVectors**(`props?`): `Metric`

Returns metric for number of vectors

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`

***

### metricNumVertexProperties()

> **metricNumVertexProperties**(`props?`): `Metric`

Returns metric for number of vertex properties

#### Parameters

##### props?

`MetricOptions`

#### Returns

`Metric`
