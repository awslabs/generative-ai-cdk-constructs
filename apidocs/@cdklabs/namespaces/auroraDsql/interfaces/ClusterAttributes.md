[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [auroraDsql](../README.md) / ClusterAttributes

# Interface: ClusterAttributes

Attributes for specifying an imported Aurora DSQL cluster.

## Properties

### clusterArn

> `readonly` **clusterArn**: `string`

The ARN of the cluster

#### Attribute

***

### creationTime?

> `readonly` `optional` **creationTime**: `string`

The timestamp when the cluster was created, in ISO 8601 format.

#### Default

```ts
undefined - No creation time is provided
```

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

KMS encryption key associated with this cluster.

#### Default

```ts
- no encryption key
```

***

### status?

> `readonly` `optional` **status**: `string`

The status of the cluster.

#### Default

```ts
undefined - No status is provided
```

***

### vpcEndpointServiceName

> `readonly` **vpcEndpointServiceName**: `string`

VpcEndpointServiceName of the cluster.

#### Attribute
