[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContentGenerationAppSyncLambdaProps

# Interface: ContentGenerationAppSyncLambdaProps

The properties for the ContentGenerationAppSyncLambdaProps class.

## Properties

### cognitoUserPool

> `readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

#### Default

```ts
- None
```

***

### customDockerLambdaProps?

> `readonly` `optional` **customDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide custom lambda code
and settings instead of the existing

***

### existingBusInterface?

> `readonly` `optional` **existingBusInterface**: `IEventBus`

Optional Existing instance of an EventBridge bus. If not provided, the construct will create one.

#### Default

```ts
- None
```

***

### existingGeneratedAssetsBucketObj?

> `readonly` `optional` **existingGeneratedAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `generatedAssetsBucketProps` will cause an error.

#### Default

```ts
- None
```

***

### existingMergedApi?

> `readonly` `optional` **existingMergedApi**: `CfnGraphQLApi`

Existing merged Appsync GraphQL api.

#### Default

```ts
- None
```

***

### existingSecurityGroup?

> `readonly` `optional` **existingSecurityGroup**: `ISecurityGroup`

Optional existing security group allowing access to opensearch. Used by the lambda functions
built by this construct. If not provided, the construct will create one.

#### Default

```ts
- none
```

***

### existingVpc?

> `readonly` `optional` **existingVpc**: `IVpc`

Optional An existing VPC in which to deploy the construct. Providing both this and
vpcProps is an error.

#### Default

```ts
- none
```

***

### generatedAssetsBucketProps?

> `readonly` `optional` **generatedAssetsBucketProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingGeneratedAssetsBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### lambdaProvisionedConcurrency?

> `readonly` `optional` **lambdaProvisionedConcurrency**: `number`

Optional. Allows a user to configure
Lambda provisioned concurrency for consistent performance

***

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practive to enable by default.

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

Optional custom properties for a VPC the construct will create. This VPC will
be used by the Lambda functions the construct creates. Providing
both this and existingVpc is an error.

#### Default

```ts
- none
```
