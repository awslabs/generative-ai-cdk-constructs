[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [auroraDsql](../README.md) / ClusterCustomProps

# Interface: ClusterCustomProps

Properties for creating a Aurora DSQL cluster resource

## Properties

### deletionProtectionEnabled?

> `readonly` `optional` **deletionProtectionEnabled**: `boolean`

Whether to enable deletion protection for the cluster.

#### Default

```ts
false
```

#### Required

- No

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

KMS key to use for the cluster.

#### Default

```ts
- A new KMS key is created.
```

#### Required

- No

***

### multiRegionProperties?

> `readonly` `optional` **multiRegionProperties**: [`MultiRegionProperties`](MultiRegionProperties.md)

Defines the structure for multi-Region cluster configurations, containing the witness Region and peered cluster settings.
If not provided, the cluster will be created in the same region as the stack (single region cluster).

#### Default

```ts
- No multi-Region cluster configurations.
```

#### Required

- No

***

### tags?

> `readonly` `optional` **tags**: `Record`\<`string`, `string`\>

Tags to apply to the cluster.

#### Default

```ts
- No tags.
```

#### Required

- No
