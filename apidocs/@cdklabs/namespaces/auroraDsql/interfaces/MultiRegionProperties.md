[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [auroraDsql](../README.md) / MultiRegionProperties

# Interface: MultiRegionProperties

Interface for multi-region cluster properties

## Properties

### clusters?

> `readonly` `optional` **clusters**: [`ICluster`](ICluster.md)[]

The set of peered clusters that form the multi-Region cluster configuration.

Each peered cluster represents a database instance in a different Region.

#### Default

```ts
- No peered clusters (single region cluster)
```

#### Required

- No

***

### witnessRegion

> `readonly` **witnessRegion**: `string`

The Region that serves as the witness Region for a multi-Region cluster.

The witness Region helps maintain cluster consistency and quorum.
The witness Region receives data written to any Read-Write Region
but does not have an endpoint.

#### Required

- Yes
