[@cdklabs/generative-ai-cdk-constructs](../README.md) / QaAppsyncOpensearchProps

# Interface: QaAppsyncOpensearchProps

The properties for the QaAppsyncOpensearchProps class.

## Table of contents

### Properties

- [bucketInputsAssetsProps](QaAppsyncOpensearchProps.md#bucketinputsassetsprops)
- [cognitoUserPool](QaAppsyncOpensearchProps.md#cognitouserpool)
- [enableOperationalMetric](QaAppsyncOpensearchProps.md#enableoperationalmetric)
- [existingBusInterface](QaAppsyncOpensearchProps.md#existingbusinterface)
- [existingInputAssetsBucketObj](QaAppsyncOpensearchProps.md#existinginputassetsbucketobj)
- [existingMergedApi](QaAppsyncOpensearchProps.md#existingmergedapi)
- [existingOpensearchDomain](QaAppsyncOpensearchProps.md#existingopensearchdomain)
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

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:76](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L76)

___

### cognitoUserPool

• `Readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:107](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L107)

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

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:132](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L132)

___

### existingBusInterface

• `Optional` `Readonly` **existingBusInterface**: `IEventBus`

Optional Existing instance of an EventBridge bus. If not provided, the construct will create one.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:63](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L63)

___

### existingInputAssetsBucketObj

• `Optional` `Readonly` **existingInputAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:69](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L69)

___

### existingMergedApi

• `Optional` `Readonly` **existingMergedApi**: `CfnGraphQLApi`

Existing merged Appsync GraphQL api.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:101](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L101)

___

### existingOpensearchDomain

• `Readonly` **existingOpensearchDomain**: `IDomain`

Existing Amazon OpenSearch Service domain.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:82](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L82)

___

### existingSecurityGroup

• `Optional` `Readonly` **existingSecurityGroup**: `ISecurityGroup`

Optional existing security group allowing access to opensearch. Used by the lambda functions
built by this construct. If not provided, the construct will create one.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:57](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L57)

___

### existingVpc

• `Optional` `Readonly` **existingVpc**: `IVpc`

Optional An existing VPC in which to deploy the construct. Providing both this and
vpcProps is an error.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:50](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L50)

___

### lambdaProvisionedConcurrency

• `Optional` `Readonly` **lambdaProvisionedConcurrency**: `number`

Optional. Allows a user to configure
Lambda provisioned concurrency for consistent performance

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:138](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L138)

___

### observability

• `Optional` `Readonly` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practive to enable by default.

**`Default`**

```ts
- true
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:120](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L120)

___

### openSearchIndexName

• `Readonly` **openSearchIndexName**: `string`

Data Index name for the OpenSearch Service.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:88](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L88)

___

### openSearchSecret

• `Optional` `Readonly` **openSearchSecret**: `ISecret`

Optional. SecretsManager secret to authenticate against the OpenSearch Service domain if
domain is configured with Username/Password.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:95](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L95)

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:113](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L113)

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

#### Defined in

[src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-qa-appsync-opensearch/index.ts#L43)
