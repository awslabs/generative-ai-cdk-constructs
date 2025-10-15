# Amazon Aurora Vector Store Construct Library
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

This construct library provides a class that defines a `AmazonAuroraVectorStore` construct for an Amazon Aurora to be used for a vector store for a Knowledge Base. Additionally, you can utilize `fromExistingAuroraVectorStore()` method to use your existing Aurora database as a vector DB. `AmazonAuroraVectorStore` is an L3 resource that creates a VPC with 3 subnets (public, private with NAT Gateway, private without NAT Gateway) and Amazon Aurora Serverless V2 Cluster. The cluster has 1 writer/reader instance with latest supported PostgreSQL version (currently it is 15.5) and having the following cofiguration: min capacity 0.5, max capacity 4. Lambda custom resource executes required pgvector and Amazon Bedrock Knowledge Base SQL queries (see more [here](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraPostgreSQL.VectorDB.html)) against Aurora cluster during deployment. The secret containing databases credentials is being deployed and securely stored in AWS Secrets Manager. You must specify the same embeddings model that you are going to use in KnowledgeBase construct. Due to the nature of provisioning RDS cluster it takes a long time (over 20-25 minutes) to both deploying and destroying construct so please take this in consideration.

## Table of contents
- [API](#api)
- [Amazon Aurora Vector Store](#amazon-aurora-vector-store)
- [fromExistingAuroraVectorStore()](#fromExistingAuroraVectorStore())

## API
See the [API documentation](../../../apidocs/namespaces/amazonaurora/README.md).

## Amazon Aurora Vector Store

TypeScript

```ts fixture=default-bedrock
new genaicdk.amazonaurora.AmazonAuroraVectorStore(this, 'AuroraVectorStore', {
  embeddingsModelVectorDimension: genaicdk.bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3.vectorDimensions!,
});
```

## fromExistingAuroraVectorStore()

You can import your existing Aurora DB to be used as a vector DB for a knowledge base. **Note** - you need to provide `clusterIdentifier`, `databaseName`, `vpc`, `secret` and `auroraSecurityGroupName` used in deployment of your existing RDS Amazon Aurora DB, as well as `embeddingsModel` that you want to be used by a Knowledge Base for chunking. Additionally, your stack's **env** needs to contain `region` and `account` variables.

TypeScript

```ts fixture=default-bedrock
const auroraDb = genaicdk.amazonaurora.AmazonAuroraVectorStore.fromExistingAuroraVectorStore(this, 'ExistingAuroraVectorStore', {
  clusterIdentifier: 'aurora-serverless-vector-cluster',
  databaseName: 'bedrock_vector_db',
  schemaName: 'bedrock_integration',
  tableName: 'bedrock_kb',
  vectorField: 'embedding',
  textField: 'chunks',
  metadataField: 'metadata',
  primaryKeyField: 'id',
  embeddingsModelVectorDimension: genaicdk.bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3.vectorDimensions!,
  vpc: cdk.aws_ec2.Vpc.fromLookup(this, 'VPC', {
    vpcId: 'vpc-0c1a234567ee8bc90',
  }),
  auroraSecurityGroup: cdk.aws_ec2.SecurityGroup.fromSecurityGroupId(
    this,
    'AuroraSecurityGroup',
    'sg-012456789'
  ),
  secret: cdk.aws_rds.DatabaseSecret.fromSecretCompleteArn(
    this,
    'Secret',
    cdk.Stack.of(this).formatArn({
      service: 'secretsmanager',
      resource: 'secret',
      resourceName: 'rds-db-credentials/cluster-1234567890',
      region: cdk.Stack.of(this).region,
      account: cdk.Stack.of(this).account,
      arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
    }),
  ),
});

const kb = new genaicdk.bedrock.VectorKnowledgeBase(this, "KnowledgeBase", {
  embeddingsModel: genaicdk.bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
  vectorStore: auroraDb,
  instruction:
    "Use this knowledge base to answer questions about books. " +
    "It contains the full text of novels.",
});

const docBucket = new cdk.aws_s3.Bucket(this, "DocBucket");

new genaicdk.bedrock.S3DataSource(this, "DataSource", {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: "books",
  chunkingStrategy: genaicdk.bedrock.ChunkingStrategy.fixedSize({
    maxTokens: 500,
    overlapPercentage: 20,
  }),
});
```
