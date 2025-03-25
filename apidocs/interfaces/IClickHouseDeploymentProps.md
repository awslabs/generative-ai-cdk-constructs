[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / IClickHouseDeploymentProps

# Interface: IClickHouseDeploymentProps

## Properties

### cloudMapService?

> `optional` **cloudMapService**: `IService`

Cloud Map service to provide private DNS visibility between components

If this is not set, you won't be able to access URL properties of the construct.

#### Default

```ts
None
```

***

### cluster

> **cluster**: `ICluster`

ECS Cluster within which to deploy

***

### cpu?

> `optional` **cpu**: `number`

ECS Fargate CPU allocation for the ClickHouse container.

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
1024
```

***

### memoryLimitMiB?

> `optional` **memoryLimitMiB**: `number`

ECS Fargate CPU allocation for the ClickHouse container.

https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-tasks-services.html#fargate-tasks-size

#### Default

```ts
8192
```

***

### serviceName?

> `optional` **serviceName**: `string`

Name of the ECS FargateService to create

#### Default

```ts
"clickhouse"
```

***

### tags?

> `optional` **tags**: `Tag`[]

AWS Tags to apply to created resources (ECS tasks, ECR images, Secrets, etc)

***

### version?

> `optional` **version**: `string`

Released version of ClickHouse to deploy

#### Default

```ts
"25.1"
```

***

### vpc

> **vpc**: `IVpc`

AWS VPC in which to deploy ClickHouse
