[@cdklabs/generative-ai-cdk-constructs](../README.md) / QaAppsyncOpensearchProps

# Interface: QaAppsyncOpensearchProps

The properties for the QaAppsyncOpensearchProps class.

## Table of contents

### Properties

- [bucketInputsAssetsProps](QaAppsyncOpensearchProps.md#bucketinputsassetsprops)
- [cognitoUserPool](QaAppsyncOpensearchProps.md#cognitouserpool)
- [customDockerLambdaProps](QaAppsyncOpensearchProps.md#customdockerlambdaprops)
- [existingBusInterface](QaAppsyncOpensearchProps.md#existingbusinterface)
- [existingInputAssetsBucketObj](QaAppsyncOpensearchProps.md#existinginputassetsbucketobj)
- [existingMergedApi](QaAppsyncOpensearchProps.md#existingmergedapi)
- [existingOpensearchDomain](QaAppsyncOpensearchProps.md#existingopensearchdomain)
- [existingOpensearchServerlessCollection](QaAppsyncOpensearchProps.md#existingopensearchserverlesscollection)
- [existingSecurityGroup](QaAppsyncOpensearchProps.md#existingsecuritygroup)
- [existingVpc](QaAppsyncOpensearchProps.md#existingvpc)
- [lambdaProvisionedConcurrency](QaAppsyncOpensearchProps.md#lambdaprovisionedconcurrency)
- [observability](QaAppsyncOpensearchProps.md#observability)
- [openSearchIndexName](QaAppsyncOpensearchProps.md#opensearchindexname)
- [openSearchSecret](QaAppsyncOpensearchProps.md#opensearchsecret)
- [stage](QaAppsyncOpensearchProps.md#stage)
- [vpcProps](QaAppsyncOpensearchProps.md#vpcprops)

## Properties

### bucketInputsAssetsProps

• `Optional` `Readonly` **bucketInputsAssetsProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingInputAssetsBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

___

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

### existingInputAssetsBucketObj

• `Optional` `Readonly` **existingInputAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error.

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

### existingOpensearchDomain

• `Optional` `Readonly` **existingOpensearchDomain**: `IDomain`

Existing Amazon OpenSearch Service domain.

**`Default`**

```ts
- None
```

___

### existingOpensearchServerlessCollection

• `Optional` `Readonly` **existingOpensearchServerlessCollection**: `CfnCollection`

Existing Amazon OpenSearch Serverless collection.

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

### openSearchIndexName

• `Readonly` **openSearchIndexName**: `string`

Data Index name for the OpenSearch Service.

**`Default`**

```ts
- None
```

___

### openSearchSecret

• `Optional` `Readonly` **openSearchSecret**: `ISecret`

Optional. SecretsManager secret to authenticate against the OpenSearch Service domain if
domain is configured with Username/Password.

**`Default`**

```ts
- None
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
