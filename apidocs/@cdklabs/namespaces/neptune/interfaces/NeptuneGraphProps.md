[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [neptune](../README.md) / NeptuneGraphProps

# Interface: NeptuneGraphProps

Properties for creating a new Neptune Graph database

## Properties

### deletionProtection?

> `readonly` `optional` **deletionProtection**: `boolean`

Indicates whether the Graph should have deletion protection enabled.

#### Default

```ts
false
```

***

### graphName?

> `readonly` `optional` **graphName**: `string`

The graph name. The name must contain from 1 to 63 letters, numbers, or hyphens, and its first character must be a letter.
It cannot end with a hyphen or contain two consecutive hyphens.

#### Default

- A unique graph name is generated for you using the prefix `graph-for-${StackName}-${UUID}`.

***

### provisionedMemoryNCUs?

> `readonly` `optional` **provisionedMemoryNCUs**: `number`

The amount of memory (in Neptune Capacity Units m-NCUs) to use for the graph.

#### Default

```ts
16
```

***

### publicConnectivity?

> `readonly` `optional` **publicConnectivity**: `boolean`

Specifies whether or not the graph can be reachable over the internet. All access to graphs is IAM authenticated.
When the graph is publicly available, its domain name system (DNS) endpoint resolves to the public IP address from the internet.
When the graph isn't publicly available, you need to create a PrivateGraphEndpoint in a given VPC to ensure the DNS name
resolves to a private IP address that is reachable from the VPC.

#### Default

```ts
true
```

***

### replicaCount?

> `readonly` `optional` **replicaCount**: `number`

The number of replicas in other AZs.
Replicas are typically only needed for production critical workloads with strict availability requirements.
**Note: Each replica incurs additional cost as it maintains a full copy of the graph data.**

#### Default

```ts
0
```

***

### vectorSearchDimension?

> `readonly` `optional` **vectorSearchDimension**: `number`

The Dimension used to save vectors.
