[**@cdklabs/generative-ai-cdk-constructs**](../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / RagAppsyncStepfnOpensearchProps

# Interface: RagAppsyncStepfnOpensearchProps

The properties for the RagAppsyncStepfnOpensearchProps class.

## Properties

### bucketInputsAssetsProps?

> `readonly` `optional` **bucketInputsAssetsProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingInputAssetsBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### bucketProcessedAssetsProps?

> `readonly` `optional` **bucketProcessedAssetsProps**: `BucketProps`

Optional user provided props to override the default props for the S3 Bucket.
Providing both this and `existingProcessedAssetsBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### cognitoUserPool

> `readonly` **cognitoUserPool**: `IUserPool`

Cognito user pool used for authentication.

#### Default

```ts
- None
```

***

### customEmbeddingsDockerLambdaProps?

> `readonly` `optional` **customEmbeddingsDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide Embeddings custom lambda code
and settings instead of the existing

***

### customFileTransformerDockerLambdaProps?

> `readonly` `optional` **customFileTransformerDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide File Transformer custom lambda code
and settings instead of the existing

***

### customInputValidationDockerLambdaProps?

> `readonly` `optional` **customInputValidationDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide Input Validation custom lambda code
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

### existingInputAssetsBucketObj?

> `readonly` `optional` **existingInputAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error.

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

### existingOpensearchDomain?

> `readonly` `optional` **existingOpensearchDomain**: `IDomain`

Optional existing Amazon OpenSearch Service domain.

#### Default

```ts
- None
```

***

### existingOpensearchServerlessCollection?

> `readonly` `optional` **existingOpensearchServerlessCollection**: `CfnCollection`

Optional existing Amazon Amazon OpenSearch Serverless collection.

#### Default

```ts
- None
```

***

### existingProcessedAssetsBucketObj?

> `readonly` `optional` **existingProcessedAssetsBucketObj**: `IBucket`

Existing instance of S3 Bucket object, providing both this and `bucketProcessedAssetsProps` will cause an error.

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

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

#### Default

```ts
- true
```

***

### openSearchIndexName

> `readonly` **openSearchIndexName**: `string`

Index name for the OpenSearch Service.

#### Default

```ts
- None
```

***

### openSearchSecret?

> `readonly` `optional` **openSearchSecret**: `ISecret`

Optional. SecretsManager secret to authenticate against the OpenSearch Service domain if
domain is configured with Username/Password.

#### Default

```ts
- None
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
