[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / ILangfuseDeploymentProps

# Interface: ILangfuseDeploymentProps

## Properties

### cacheNodeType?

> `optional` **cacheNodeType**: `string`

The compute and memory capacity of the nodes for Langfuse's (Redis/Valkey) cache

#### See

 - http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-elasticache-replicationgroup.html#cfn-elasticache-replicationgroup-cachenodetype
 - https://langfuse.com/self-hosting/infrastructure/cache

#### Default

```ts
"cache.t3.small"
```

***

### clickHouseCpu?

> `optional` **clickHouseCpu**: `number`

CPU allocation for the ECS Fargate container running Langfuse's (ClickHouse) OLAP RDBMS

(1024 = 1 full vCPU)

#### See

 - https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size
 - https://langfuse.com/self-hosting/infrastructure/clickhouse

#### Default

```ts
1024
```

***

### clickHouseMemoryMiB?

> `optional` **clickHouseMemoryMiB**: `number`

Memory allocation for the ECS Fargate container running Langfuse's (ClickHouse) OLAP RDBMS

#### See

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
8192
```

***

### dbNodeType?

> `optional` **dbNodeType**: `InstanceType`

RDS instance type for Langfuse's OLTP (Postgres) database

#### See

 - https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_rds.DatabaseInstance.html
 - https://langfuse.com/self-hosting/infrastructure/postgres

#### Default

```ts
"r6g.large"
```

***

### privateDnsNamespaceName?

> `optional` **privateDnsNamespaceName**: `string`

Name to use for the private DNS namespace created for service discovery

This namespace is used for different ECS-deployed services in the solution to contact each
other: For example Langfuse web & worker services calling to ClickHouse.

#### Default

```ts
"langfuse.local"
```

***

### tags?

> `optional` **tags**: `Tag`[]

Tags to apply across created resources

***

### vpc

> **vpc**: `IVpc`

AWS VPC in which to deploy

Note that while this solution deploys Langfuse's components within your VPC, it does not
*fully* isolate all components' communication to only private subnets: For example, AWS
services (such as ECR container pulls, Secrets Manager secret fetches) are generally invoked
via their public endpoints, not service VPC endpoints.

***

### webServiceCpu?

> `optional` **webServiceCpu**: `number`

CPU allocation for the ECS Fargate container running the Langfuse web service

(1024 = 1 full vCPU)

#### See

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
2048
```

***

### webServiceMemoryMiB?

> `optional` **webServiceMemoryMiB**: `number`

Memory allocation for the ECS Fargate container running the Langfuse web service

#### See

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
4096
```

***

### workerCpu?

> `optional` **workerCpu**: `number`

CPU allocation for the ECS Fargate container running the Langfuse async worker service

(1024 = 1 full vCPU)

#### See

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
2048
```

***

### workerMemoryMiB?

> `optional` **workerMemoryMiB**: `number`

Memory allocation for the ECS Fargate container running the Langfuse async worker service

#### See

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
4096
```
