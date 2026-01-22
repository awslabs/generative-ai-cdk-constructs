# Amazon Aurora DSQL

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

| **Language**                                                                                   | **Package**                             |
| :--------------------------------------------------------------------------------------------- | --------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs` |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`  |
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generativeaicdkconstructs`|

Amazon Aurora DSQL is the fastest serverless distributed SQL database with active-active high availability to help ensure your applications are always available. It ensures all reads and writes to any Regional endpoint are strongly consistent and durable. Moreover, its serverless design makes database management effortless, offering virtually unlimited scalability and zero infrastructure management.

This construct library provides L2 constructs to manage Aurora DSQL resources.

## Table of contents

- [Aurora DSQL cluster](#opensearch-managed-cluster-vector-store)
    - [Cluster properties](#cluster-properties)
    - [Single region cluster](#single-region-cluster)
    - [Multi region cluster](#multi-region-cluster)

## Aurora DSQL Cluster

Aurora DSQL provides several configuration options to help you establish the right database infrastructure for your needs. To set up your Aurora DSQL cluster infrastructure, review the following sections.

### Cluster properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| removalPolicy | RemovalPolicy | No | This option prevents accidental cluster deletion. When set to RETAIN, you can't delete the cluster. By default, RemovalPolicy.DESTROY is applied. |
| kmsKey | IKey | No | A custom KMS key to use for encrypting data. Default: Your data is encrypted by default with a key that AWS owns and manages for you. |
| multiRegionProperties | MultiRegionProperties | No | Structure for multi-Region cluster configurations. Default: single region configuration. |
| tags | Record<string, string> | No | Tags to apply to the cluster. Default: no tags applied. |

### Single region cluster

```typescript fixture=default-bedrock
new genaicdk.auroraDsql.Cluster(this, 'TestCluster', {});
```

You can use tags on a cluster, for instance:

```typescript fixture=default-bedrock
new genaicdk.auroraDsql.Cluster(this, 'TestCluster', {
    tags: {
        Name: 'TestCluster',
    }
});
```

### Multi region cluster

Multi-Region peered clusters provide the same resilience and connectivity as single-Region clusters. But they improve availability by offering two Regional endpoints, one in each peered cluster Region. Both endpoints of a peered cluster present a single logical database. They are available for concurrent read and write operations, and provide strong data consistency. You can build applications that run in multiple Regions at the same time for performance and resilience—and know that readers always see the same data.

```typescript fixture=default-bedrock
// create a cluster in a different region
const peeredCluster1 = new genaicdk.auroraDsql.Cluster(stack1, 'TestPeeredCluster1', {});

// or load existing cluster through the fromAttributes method

new genaicdk.auroraDsql.Cluster(this, 'TestCluster', {
    multiRegionProperties: {
        witnessRegion: 'us-east-1',
        clusters: [peeredCluster1],
    },
});
```
