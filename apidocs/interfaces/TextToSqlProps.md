[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / TextToSqlProps

# Interface: TextToSqlProps

## Properties

### configAssetsBucketProps?

> `readonly` `optional` **configAssetsBucketProps**: `BucketProps`

Optional. User provided props to override the default props for the S3 Bucket.

#### Default

```ts
- Default props are used
```

***

### customQueryConfigurerLambdaProps?

> `readonly` `optional` **customQueryConfigurerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide custom lambda code for all pre steps required before generating the query.
If not provided, default code will be used.

***

### customQueryExecutorLambdaProps?

> `readonly` `optional` **customQueryExecutorLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide custom lambda code for executing the query.
If not provided, default code will be used.

***

### customQueryGeneratorLambdaProps?

> `readonly` `optional` **customQueryGeneratorLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide custom lambda code for generating the query.
If not provided, default code will be used.

***

### databaseSecretARN

> `readonly` **databaseSecretARN**: `string`

Database secret. DB credentials to connect to Database.

***

### dbName

> `readonly` **dbName**: [`DbName`](../enumerations/DbName.md)

Database name. This is the target database against which the query will be generated.

***

### dbPort?

> `readonly` `optional` **dbPort**: `number`

Optional. db port number.

#### Default

```ts
-3306
```

***

### eventBusProps?

> `readonly` `optional` **eventBusProps**: `EventBusProps`

Optional user provided event bus props

#### Default

```ts
- Default props are used.
```

***

### existingDBSecurityGroup?

> `readonly` `optional` **existingDBSecurityGroup**: `SecurityGroup`

Optional. Security group for the db instance which this construct will use.
If no exisiting security group is provided it will create one from the vpc.

#### Default

```ts
- none
```

***

### existingEventBusInterface?

> `readonly` `optional` **existingEventBusInterface**: `IEventBus`

Optional. Existing instance of event bus, providing both this and `eventBusProps` will cause an error.

#### Default

```ts
- None.
```

***

### existingLambdaSecurityGroup?

> `readonly` `optional` **existingLambdaSecurityGroup**: `SecurityGroup`

Optional. Security group for the lambda function which this construct will use.
If no exisiting security group is provided it will create one from the vpc.

#### Default

```ts
- none
```

***

### existingSubnetGroup?

> `readonly` `optional` **existingSubnetGroup**: `SubnetGroup`

Optional. An existing subnet group can be used to deploy the construct.

#### Default

```ts
- none
```

***

### existingVpc?

> `readonly` `optional` **existingVpc**: `IVpc`

Optional. An existing VPC can be used to deploy the construct.
Providing both this and vpcProps is an error.

#### Default

```ts
- none
```

***

### existingconfigAssetsBucketObj?

> `readonly` `optional` **existingconfigAssetsBucketObj**: `IBucket`

Optional. Existing s3 Bucket to store the config files.

#### Default

```ts
- None
```

***

### metadataSource

> `readonly` **metadataSource**: `string`

The source of metatdata. This metadata is required to reduce the natual language ambiguity
in order to generate the correct sql query. A knowledge layer is used to map the natural language
to the database schema.
Two metatdata source are supported:
1: config_file - A local json file containing the knowledge layer key value pair.
2: Knowledge base - Semantic search is used to fetch the knowledge layer from AWS knowledge base

#### Default

```ts
- config_file
```

***

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

#### Default

```ts
- true
```

***

### stage?

> `readonly` `optional` **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```

***

### vpcProps?

> `readonly` `optional` **vpcProps**: `VpcProps`

Optional. The construct creates a custom VPC based on vpcProps.
Providing both this and existingVpc is an error.

#### Default

```ts
- none
```
