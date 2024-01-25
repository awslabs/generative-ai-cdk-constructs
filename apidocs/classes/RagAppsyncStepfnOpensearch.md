[@cdklabs/generative-ai-cdk-constructs](../README.md) / RagAppsyncStepfnOpensearch

# Class: RagAppsyncStepfnOpensearch

**`Summary`**

The RagAppsyncStepfnOpensearch class.

## Hierarchy

- `Construct`

  ↳ **`RagAppsyncStepfnOpensearch`**

## Table of contents

### Constructors

- [constructor](RagAppsyncStepfnOpensearch.md#constructor)

### Properties

- [graphqlApi](RagAppsyncStepfnOpensearch.md#graphqlapi)
- [ingestionBus](RagAppsyncStepfnOpensearch.md#ingestionbus)
- [node](RagAppsyncStepfnOpensearch.md#node)
- [s3InputAssetsBucket](RagAppsyncStepfnOpensearch.md#s3inputassetsbucket)
- [s3InputAssetsBucketInterface](RagAppsyncStepfnOpensearch.md#s3inputassetsbucketinterface)
- [s3ProcessedAssetsBucket](RagAppsyncStepfnOpensearch.md#s3processedassetsbucket)
- [s3ProcessedAssetsBucketInterface](RagAppsyncStepfnOpensearch.md#s3processedassetsbucketinterface)
- [securityGroup](RagAppsyncStepfnOpensearch.md#securitygroup)
- [stateMachine](RagAppsyncStepfnOpensearch.md#statemachine)
- [vpc](RagAppsyncStepfnOpensearch.md#vpc)

### Methods

- [toString](RagAppsyncStepfnOpensearch.md#tostring)
- [isConstruct](RagAppsyncStepfnOpensearch.md#isconstruct)

## Constructors

### constructor

• **new RagAppsyncStepfnOpensearch**(`scope`, `id`, `props`): [`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | represents the scope for all the resources. |
| `id` | `string` | this is a a scope-unique id. |
| `props` | [`RagAppsyncStepfnOpensearchProps`](../interfaces/RagAppsyncStepfnOpensearchProps.md) | user provided props for the construct. |

#### Returns

[`RagAppsyncStepfnOpensearch`](RagAppsyncStepfnOpensearch.md)

**`Summary`**

Constructs a new instance of the RagAppsyncStepfnOpensearch class.

**`Since`**

0.0.0

**`Access`**

public

#### Overrides

Construct.constructor

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:204](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L204)

## Properties

### graphqlApi

• `Readonly` **graphqlApi**: `IGraphqlApi`

Returns an instance of appsync.IGraphqlApi created by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:190](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L190)

___

### ingestionBus

• `Readonly` **ingestionBus**: `IEventBus`

Returns the instance of events.IEventBus used by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:166](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L166)

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

#### Defined in

node_modules/constructs/lib/construct.d.ts:265

___

### s3InputAssetsBucket

• `Optional` `Readonly` **s3InputAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:176](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L176)

___

### s3InputAssetsBucketInterface

• `Readonly` **s3InputAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:170](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L170)

___

### s3ProcessedAssetsBucket

• `Optional` `Readonly` **s3ProcessedAssetsBucket**: `Bucket`

Returns an instance of s3.Bucket created by the construct.
IMPORTANT: If existingProcessedAssetsBucketObj was provided in Pattern Construct Props,
this property will be undefined

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:186](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L186)

___

### s3ProcessedAssetsBucketInterface

• `Readonly` **s3ProcessedAssetsBucketInterface**: `IBucket`

Returns an instance of s3.IBucket created by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:180](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L180)

___

### securityGroup

• `Readonly` **securityGroup**: `ISecurityGroup`

Returns the instance of ec2.ISecurityGroup used by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:162](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L162)

___

### stateMachine

• `Readonly` **stateMachine**: `StateMachine`

Returns an instance of stepfn.StateMachine created by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:194](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L194)

___

### vpc

• `Readonly` **vpc**: `IVpc`

Returns the instance of ec2.IVpc used by the construct

#### Defined in

[src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts:158](https://github.com/jstrunk/generative-ai-cdk-constructs/blob/29ef990/src/patterns/gen-ai/aws-rag-appsync-stepfn-opensearch/index.ts#L158)

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

#### Defined in

node_modules/constructs/lib/construct.d.ts:278

___

### isConstruct

▸ **isConstruct**(`x`): x is Construct

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct

#### Defined in

node_modules/constructs/lib/construct.d.ts:261
