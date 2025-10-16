# OpenSearch Managed Cluster Vector Store Construct Library
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->

| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

This construct library provides a class that defines an existing OpenSearch managed cluster to be used as a vector store for a Knowledge Base.

## Table of contents

- [API](#api)
- [OpenSearch Managed Cluster Vector Store](#opensearch-managed-cluster-vector-store)

## API

See the [API documentation](../../../apidocs/namespaces/opensearchmanagedcluster/README.md).

## OpenSearch Managed Cluster Vector Store

TypeScript

```ts fixture=default-bedrock
new genaicdk.opensearchmanagedcluster.OpenSearchManagedClusterVectorStore({
  domainArn: 'arn:aws:es:region:account:domain/your-domain',
  domainEndpoint: 'https://your-domain.region.es.amazonaws.com',
  vectorIndexName: 'your-vector-index',
  fieldMapping: {
    metadataField: 'metadata',
    textField: 'text',
    vectorField: 'vector'
  }
});
```
