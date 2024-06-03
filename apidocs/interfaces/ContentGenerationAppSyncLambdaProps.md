[@cdklabs/generative-ai-cdk-constructs](../README.md) / ContentGenerationAppSyncLambdaProps

# Interface: ContentGenerationAppSyncLambdaProps

The properties for the ContentGenerationAppSyncLambdaProps class.

## Table of contents

### Properties

- [cognitoUserPool](ContentGenerationAppSyncLambdaProps.md#cognitouserpool)
- [customDockerLambdaProps](ContentGenerationAppSyncLambdaProps.md#customdockerlambdaprops)
- [existingBusInterface](ContentGenerationAppSyncLambdaProps.md#existingbusinterface)
- [existingGeneratedAssetsBucketObj](ContentGenerationAppSyncLambdaProps.md#existinggeneratedassetsbucketobj)
- [existingMergedApi](ContentGenerationAppSyncLambdaProps.md#existingmergedapi)
- [existingSecurityGroup](ContentGenerationAppSyncLambdaProps.md#existingsecuritygroup)
- [existingVpc](ContentGenerationAppSyncLambdaProps.md#existingvpc)
- [generatedAssetsBucketProps](ContentGenerationAppSyncLambdaProps.md#generatedassetsbucketprops)
- [lambdaProvisionedConcurrency](ContentGenerationAppSyncLambdaProps.md#lambdaprovisionedconcurrency)
- [observability](ContentGenerationAppSyncLambdaProps.md#observability)
- [stage](ContentGenerationAppSyncLambdaProps.md#stage)
- [vpcProps](ContentGenerationAppSyncLambdaProps.md#vpcprops)

## Properties

### cognitoUserPool

• `Readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

**`Default`**

```ts
- None
```

___

### customDockerLambdaProps

• `Optional` `Readonly` **customDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide custom lambda code
and settings instead of the existing

___

### existingBusInterface

• `Optional` `Readonly` **existingBusInterface**: `IEventBus`

Optional Existing instance of an EventBridge bus. If not provided, the construct will create one.

**`Default`**

```ts
- None
```

___

### existingGeneratedAssetsBucketObj

• `Optional` `Readonly` **existingGeneratedAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `generatedAssetsBucketProps` will cause an error.

**`Default`**

```ts
- None
```

___

### existingMergedApi

• `Optional` `Readonly` **existingMergedApi**: `CfnGraphQLApi`

Existing merged Appsync GraphQL api.

**`Default`**

```ts
- None
```

___

### existingSecurityGroup

• `Optional` `Readonly` **existingSecurityGroup**: `ISecurityGroup`

Optional existing security group allowing access to opensearch. Used by the lambda functions
built by this construct. If not provided, the construct will create one.

**`Default`**

```ts
- none
```

___

### existingVpc

• `Optional` `Readonly` **existingVpc**: `IVpc`

Optional An existing VPC in which to deploy the construct. Providing both this and
vpcProps is an error.

**`Default`**

```ts
- none
```

___

### generatedAssetsBucketProps

• `Optional` `Readonly` **generatedAssetsBucketProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingGeneratedAssetsBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

___

### lambdaProvisionedConcurrency

• `Optional` `Readonly` **lambdaProvisionedConcurrency**: `number`

Optional. Allows a user to configure
Lambda provisioned concurrency for consistent performance

___

### observability

• `Optional` `Readonly` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practive to enable by default.

**`Default`**

```ts
- true
```

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

___

### vpcProps

• `Optional` `Readonly` **vpcProps**: `VpcProps`

Optional custom properties for a VPC the construct will create. This VPC will
be used by the Lambda functions the construct creates. Providing
both this and existingVpc is an error.

**`Default`**

```ts
- none
```
