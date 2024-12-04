[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / SummarizationAppsyncStepfnProps

# Interface: SummarizationAppsyncStepfnProps

## Properties

### bucketInputsAssetsProps?

> `readonly` `optional` **bucketInputsAssetsProps**: `BucketProps`

Optional. User provided props to override the default props for the S3 Bucket.
Providing both this and `existingInputAssetsBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### bucketProcessedAssetsProps?

> `readonly` `optional` **bucketProcessedAssetsProps**: `BucketProps`

Optional. User provided props to override the default props for the S3 Bucket.
Providing both this and `existingProcessedAssetsBucketObj` will cause an error.

#### Default

```ts
- Default props are used
```

***

### cognitoUserPool

> `readonly` **cognitoUserPool**: `IUserPool`

Required. Cognito user pool used for authentication.

#### Default

```ts
- None
```

***

### customDocumentReaderDockerLambdaProps?

> `readonly` `optional` **customDocumentReaderDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide Embeddings custom lambda code
and settings instead of the existing

***

### customInputValidationDockerLambdaProps?

> `readonly` `optional` **customInputValidationDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide Input Validation custom lambda code
and settings instead of the existing

***

### customSummaryGeneratorDockerLambdaProps?

> `readonly` `optional` **customSummaryGeneratorDockerLambdaProps**: [`DockerLambdaCustomProps`](DockerLambdaCustomProps.md)

Optional. Allows to provide File Transformer custom lambda code
and settings instead of the existing

***

### eventBusProps?

> `readonly` `optional` **eventBusProps**: `EventBusProps`

Optional. A new custom EventBus is created with provided props.
Providing existingEventBusInterface and eventBusProps both will result in validation error.

#### Default

```ts
- None
```

***

### existingBusInterface?

> `readonly` `optional` **existingBusInterface**: `IEventBus`

Optional. Existing instance of EventBus. The summary construct integrate appsync with event bridge'
to route the request to step functions.

#### Default

```ts
- None
```

***

### existingInputAssetsBucketObj?

> `readonly` `optional` **existingInputAssetsBucketObj**: `IBucket`

Optional. Existing s3 Bucket to store the input document which needs to be summarized.
pdf is the supported input document format. If transformed (txt format) file is
available then this bucket is optional.

#### Default

```ts
- None
```

***

### existingMergedApi?

> `readonly` `optional` **existingMergedApi**: `CfnGraphQLApi`

Optional - Existing merged Appsync GraphQL api.

#### Default

```ts
- None
```

***

### existingProcessedAssetsBucketObj?

> `readonly` `optional` **existingProcessedAssetsBucketObj**: `IBucket`

Optional. This bucket stores the transformed (txt) assets for generating summary.
If None is provided then this contruct will create one.

#### Default

```ts
- None
```

***

### existingSecurityGroup?

> `readonly` `optional` **existingSecurityGroup**: `ISecurityGroup`

Optional. Security group for the lambda function which this construct will use.
If no exisiting security group is provided it will create one from the vpc.

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

### isFileTransformationRequired?

> `readonly` `optional` **isFileTransformationRequired**: `string`

Optional. The summary construct transform the input document into txt format. If the
transformation is not required then this flag can be set to false. If set to true
then a transformed asset bucket is created which transform the input document from
input asset bucket to txt format.

#### Default

```ts
- False
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

### summaryApiName?

> `readonly` `optional` **summaryApiName**: `string`

Optional. User provided Name for summary api on appsync.
A graphql api will be created by this construct with this name.

#### Default

```ts
'summaryApi'
```

***

### summaryChainType?

> `readonly` `optional` **summaryChainType**: `string`

Optional. Chain type defines how to pass the document to LLM.
there are three types of chain types.
Stuff: Simply "stuff" all your documents into a single prompt.
Map-reduce: Summarize each document on it's own in a "map" step and then "reduce" the summaries into a final summary
Refine :  This constructs a response by looping over the input documents and iteratively updating its answer

#### Default

```ts
- Stuff
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
