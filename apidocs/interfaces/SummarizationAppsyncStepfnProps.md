[@cdklabs/generative-ai-cdk-constructs](../README.md) / SummarizationAppsyncStepfnProps

# Interface: SummarizationAppsyncStepfnProps

## Table of contents

### Properties

- [bucketInputsAssetsProps](SummarizationAppsyncStepfnProps.md#bucketinputsassetsprops)
- [bucketProcessedAssetsProps](SummarizationAppsyncStepfnProps.md#bucketprocessedassetsprops)
- [cfnCacheClusterProps](SummarizationAppsyncStepfnProps.md#cfncacheclusterprops)
- [cognitoUserPool](SummarizationAppsyncStepfnProps.md#cognitouserpool)
- [enableOperationalMetric](SummarizationAppsyncStepfnProps.md#enableoperationalmetric)
- [eventBusProps](SummarizationAppsyncStepfnProps.md#eventbusprops)
- [existingBusInterface](SummarizationAppsyncStepfnProps.md#existingbusinterface)
- [existingInputAssetsBucketObj](SummarizationAppsyncStepfnProps.md#existinginputassetsbucketobj)
- [existingMergedApi](SummarizationAppsyncStepfnProps.md#existingmergedapi)
- [existingProcessedAssetsBucketObj](SummarizationAppsyncStepfnProps.md#existingprocessedassetsbucketobj)
- [existingRedisCulster](SummarizationAppsyncStepfnProps.md#existingredisculster)
- [existingSecurityGroup](SummarizationAppsyncStepfnProps.md#existingsecuritygroup)
- [existingVpc](SummarizationAppsyncStepfnProps.md#existingvpc)
- [isFileTransformationRequired](SummarizationAppsyncStepfnProps.md#isfiletransformationrequired)
- [observability](SummarizationAppsyncStepfnProps.md#observability)
- [stage](SummarizationAppsyncStepfnProps.md#stage)
- [summaryApiName](SummarizationAppsyncStepfnProps.md#summaryapiname)
- [summaryChainType](SummarizationAppsyncStepfnProps.md#summarychaintype)
- [vpcProps](SummarizationAppsyncStepfnProps.md#vpcprops)

## Properties

### bucketInputsAssetsProps

• `Optional` `Readonly` **bucketInputsAssetsProps**: `BucketProps`

Optional. User provided props to override the default props for the S3 Bucket.
Providing both this and `existingInputAssetsBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:98](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L98)

___

### bucketProcessedAssetsProps

• `Optional` `Readonly` **bucketProcessedAssetsProps**: `BucketProps`

Optional. User provided props to override the default props for the S3 Bucket.
Providing both this and `existingProcessedAssetsBucketObj` will cause an error.

**`Default`**

```ts
- Default props are used
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:124](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L124)

___

### cfnCacheClusterProps

• `Optional` `Readonly` **cfnCacheClusterProps**: `CfnCacheClusterProps`

Optional. Custom cfnCacheClusterProps for Redis.
Providing existingRedisCulster and cfnCacheClusterProps together will result in error.

**`Default`**

```ts
cacheNodeType -  'cache.r6g.xlarge'
```

**`Default`**

```ts
numCacheNodes- 1
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:68](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L68)

___

### cognitoUserPool

• `Readonly` **cognitoUserPool**: `IUserPool`

Required. Cognito user pool used for authentication.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:82](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L82)

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

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:182](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L182)

___

### eventBusProps

• `Optional` `Readonly` **eventBusProps**: `EventBusProps`

Optional. A new custom EventBus is created with provided props.
Providing existingEventBusInterface and eventBusProps both will result in validation error.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:140](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L140)

___

### existingBusInterface

• `Optional` `Readonly` **existingBusInterface**: `IEventBus`

Optional. Existing instance of EventBus. The summary construct integrate appsync with event bridge'
to route the request to step functions.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:132](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L132)

___

### existingInputAssetsBucketObj

• `Optional` `Readonly` **existingInputAssetsBucketObj**: `IBucket`

Optional. Existing s3 Bucket to store the input document which needs to be summarized.
pdf is the supported input document format. If transformed (txt format) file is
available then this bucket is optional.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:90](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L90)

___

### existingMergedApi

• `Optional` `Readonly` **existingMergedApi**: `CfnGraphQLApi`

Optional - Existing merged Appsync GraphQL api.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:147](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L147)

___

### existingProcessedAssetsBucketObj

• `Optional` `Readonly` **existingProcessedAssetsBucketObj**: `IBucket`

Optional. This bucket stores the transformed (txt) assets for generating summary.
If None is provided then this contruct will create one.

**`Default`**

```ts
- None
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:115](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L115)

___

### existingRedisCulster

• `Optional` `Readonly` **existingRedisCulster**: `CfnCacheCluster`

Optional. Existing Redis cluster to cache the generated summary
for subsequent request of same document.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:59](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L59)

___

### existingSecurityGroup

• `Optional` `Readonly` **existingSecurityGroup**: `ISecurityGroup`

Optional. Security group for the lambda function which this construct will use.
If no exisiting security group is provided it will create one from the vpc.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:75](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L75)

___

### existingVpc

• `Optional` `Readonly` **existingVpc**: `IVpc`

Optional. An existing VPC can be used to deploy the construct.
Providing both this and vpcProps is an error.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:51](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L51)

___

### isFileTransformationRequired

• `Optional` `Readonly` **isFileTransformationRequired**: `string`

Optional. The summary construct transform the input document into txt format. If the
transformation is not required then this flag can be set to false. If set to true
then a transformed asset bucket is created which transform the input document from
input asset bucket to txt format.

**`Default`**

```ts
- False
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:108](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L108)

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

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:161](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L161)

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:189](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L189)

___

### summaryApiName

• `Optional` `Readonly` **summaryApiName**: `string`

Optional. User provided Name for summary api on appsync.
A graphql api will be created by this construct with this name.

**`Default`**

```ts
'summaryApi'
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:154](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L154)

___

### summaryChainType

• `Optional` `Readonly` **summaryChainType**: `string`

Optional. Chain type defines how to pass the document to LLM.
there are three types of chain types.
Stuff: Simply "stuff" all your documents into a single prompt.
Map-reduce: Summarize each document on it's own in a "map" step and then "reduce" the summaries into a final summary
Refine :  This constructs a response by looping over the input documents and iteratively updating its answer

**`Default`**

```ts
- Stuff
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L170)

___

### vpcProps

• `Optional` `Readonly` **vpcProps**: `VpcProps`

Optional. The construct creates a custom VPC based on vpcProps.
Providing both this and existingVpc is an error.

**`Default`**

```ts
- none
```

#### Defined in

[src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts:43](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/9d5b641/src/patterns/gen-ai/aws-summarization-appsync-stepfn/index.ts#L43)
