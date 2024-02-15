[@cdklabs/generative-ai-cdk-constructs](../README.md) / ImageGenerationAppsyncLambdaProps

# Interface: ImageGenerationAppsyncLambdaProps

The properties for the ImageGenerationAppsyncLambdaProps class.

## Table of contents

### Properties

- [cognitoUserPool](ImageGenerationAppsyncLambdaProps.md#cognitouserpool)
- [enableOperationalMetric](ImageGenerationAppsyncLambdaProps.md#enableoperationalmetric)
- [existingBusInterface](ImageGenerationAppsyncLambdaProps.md#existingbusinterface)
- [existingGeneratedAssetsBucketObj](ImageGenerationAppsyncLambdaProps.md#existinggeneratedassetsbucketobj)
- [existingMergedApi](ImageGenerationAppsyncLambdaProps.md#existingmergedapi)
- [existingSecurityGroup](ImageGenerationAppsyncLambdaProps.md#existingsecuritygroup)
- [existingVpc](ImageGenerationAppsyncLambdaProps.md#existingvpc)
- [generatedAssetsBucketProps](ImageGenerationAppsyncLambdaProps.md#generatedassetsbucketprops)
- [lambdaProvisionedConcurrency](ImageGenerationAppsyncLambdaProps.md#lambdaprovisionedconcurrency)
- [observability](ImageGenerationAppsyncLambdaProps.md#observability)
- [stage](ImageGenerationAppsyncLambdaProps.md#stage)
- [vpcProps](ImageGenerationAppsyncLambdaProps.md#vpcprops)

## Properties

### cognitoUserPool

• `Readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

**`Default`**

```ts
- None
```

___

### enableOperationalMetric

• `Optional` `Readonly` **enableOperationalMetric**: `boolean`

Optional.CDK constructs provided collects anonymous operational
metrics to help AWS improve the quality and features of the
constructs. Data collection is subject to the AWS Privacy Policy
(https://aws.amazon.com/privacy/). To opt out of this feature,
simply disable it by setting the construct property
"enableOperationalMetric" to false for each construct used.

**`Default`**

```ts
- true
```

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
