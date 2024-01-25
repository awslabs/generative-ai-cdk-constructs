[@cdklabs/generative-ai-cdk-constructs](../README.md) / RagAppsyncStepfnOpensearchProps

# Interface: RagAppsyncStepfnOpensearchProps

The properties for the RagAppsyncStepfnOpensearchProps class.

## Table of contents

### Properties

- [bucketInputsAssetsProps](RagAppsyncStepfnOpensearchProps.md#bucketinputsassetsprops)
- [bucketProcessedAssetsProps](RagAppsyncStepfnOpensearchProps.md#bucketprocessedassetsprops)
- [cognitoUserPool](RagAppsyncStepfnOpensearchProps.md#cognitouserpool)
- [enableOperationalMetric](RagAppsyncStepfnOpensearchProps.md#enableoperationalmetric)
- [existingBusInterface](RagAppsyncStepfnOpensearchProps.md#existingbusinterface)
- [existingInputAssetsBucketObj](RagAppsyncStepfnOpensearchProps.md#existinginputassetsbucketobj)
- [existingMergedApi](RagAppsyncStepfnOpensearchProps.md#existingmergedapi)
- [existingOpensearchDomain](RagAppsyncStepfnOpensearchProps.md#existingopensearchdomain)
- [existingProcessedAssetsBucketObj](RagAppsyncStepfnOpensearchProps.md#existingprocessedassetsbucketobj)
- [existingSecurityGroup](RagAppsyncStepfnOpensearchProps.md#existingsecuritygroup)
- [existingVpc](RagAppsyncStepfnOpensearchProps.md#existingvpc)
- [observability](RagAppsyncStepfnOpensearchProps.md#observability)
- [openSearchIndexName](RagAppsyncStepfnOpensearchProps.md#opensearchindexname)
- [openSearchSecret](RagAppsyncStepfnOpensearchProps.md#opensearchsecret)
- [stage](RagAppsyncStepfnOpensearchProps.md#stage)
- [vpcProps](RagAppsyncStepfnOpensearchProps.md#vpcprops)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:78](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L78)

___

### bucketProcessedAssetsProps

• `Optional` `Readonly` **bucketProcessedAssetsProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingProcessedAssetsBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:91](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L91)

___

### cognitoUserPool

• `Readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:122](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L122)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:140](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L140)

___

### existingBusInterface

• `Optional` `Readonly` **existingBusInterface**: `IEventBus`

Optional Existing instance of an EventBridge bus. If not provided, the construct will create one.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:65](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L65)

___

### existingInputAssetsBucketObj

• `Optional` `Readonly` **existingInputAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:71](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L71)

___

### existingMergedApi

• `Optional` `Readonly` **existingMergedApi**: `CfnGraphQLApi`

Existing merged Appsync GraphQL api.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:116](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L116)

___

### existingOpensearchDomain

• `Readonly` **existingOpensearchDomain**: `IDomain`

Existing Amazon OpenSearch Service domain.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:97](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L97)

___

### existingProcessedAssetsBucketObj

• `Optional` `Readonly` **existingProcessedAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketProcessedAssetsProps` will cause an error.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:84](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L84)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:59](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L59)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:52](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L52)

___

### observability

• `Optional` `Readonly` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

**`Default`**

```ts
- true
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:148](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L148)

___

### openSearchIndexName

• `Readonly` **openSearchIndexName**: `string`

Index name for the OpenSearch Service.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:103](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L103)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:110](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L110)

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:128](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L128)

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

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:45](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L45)
