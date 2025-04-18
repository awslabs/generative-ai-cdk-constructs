[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / GraphKnowledgeBase

# Class: GraphKnowledgeBase

Creates a new Amazon Bedrock Knowledge Base using a Neptune Analytics vector store, this is also known as GraphRAG.

GraphRAG is a capability that combines graph modeling with generative AI to enhance retrieval-augmented generation (RAG).
It automatically identifies and leverages relationships between entities and structural elements within documents,
enabling more comprehensive and contextually relevant responses from foundation models.

Key benefits:
- More relevant responses by leveraging relationships between entities and structural elements across documents
- Enhanced search capabilities that connect content through multiple logical steps
- Better cross-document reasoning for more precise and contextually accurate answers
- Reduced hallucinations through improved information connectivity

Limitations:
- AWS PrivateLink VPC endpoint connectivity is not supported
- Graph build configuration options are not customizable
- Autoscaling is not supported for Neptune Analytics graphs
- Only supports Amazon S3 as data source
- Uses Claude 3 Haiku model for automatic graph building with contextual enrichment
- Each data source limited to 1000 files (can be increased to max 10000 files)

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html

## Extends

- [`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md)

## Constructors

### Constructor

> **new GraphKnowledgeBase**(`scope`, `id`, `props`): `GraphKnowledgeBase`

#### Parameters

##### scope

`Construct`

##### id

`string`

##### props

[`GraphKnowledgeBaseProps`](../interfaces/GraphKnowledgeBaseProps.md)

#### Returns

`GraphKnowledgeBase`

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`constructor`](GraphKnowledgeBaseBase.md#constructor)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`description`](GraphKnowledgeBaseBase.md#description)

***

### embeddingModel

> `readonly` **embeddingModel**: [`BedrockFoundationModel`](BedrockFoundationModel.md)

The embeddings model for the knowledge base.

***

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.
For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`env`](GraphKnowledgeBaseBase.md#env)

***

### fieldMapping

> `readonly` **fieldMapping**: [`VectorFieldMapping`](../interfaces/VectorFieldMapping.md)

The vector field mapping configuration.

***

### graph

> `readonly` **graph**: [`INeptuneGraph`](../../neptune/interfaces/INeptuneGraph.md)

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`graph`](GraphKnowledgeBaseBase.md#graph)

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative instruction of the knowledge base.
A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`instruction`](GraphKnowledgeBaseBase.md#instruction)

***

### knowledgeBaseArn

> `readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB12345678"
```

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`knowledgeBaseArn`](GraphKnowledgeBaseBase.md#knowledgebasearn)

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

#### Example

```ts
"KB12345678"
```

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`knowledgeBaseId`](GraphKnowledgeBaseBase.md#knowledgebaseid)

***

### name

> `readonly` **name**: `string`

The name of the knowledge base.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`node`](GraphKnowledgeBaseBase.md#node)

***

### notebook?

> `readonly` `optional` **notebook**: [`NeptuneGraphNotebook`](../../neptune/classes/NeptuneGraphNotebook.md)

***

### physicalName

> `protected` `readonly` **physicalName**: `string`

Returns a string-encoded token that resolves to the physical name that
should be passed to the CloudFormation resource.

This value will resolve to one of the following:
- a concrete value (e.g. `"my-awesome-bucket"`)
- `undefined`, when a name should be generated by CloudFormation
- a concrete name generated automatically during synthesis, in
  cross-environment scenarios.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`physicalName`](GraphKnowledgeBaseBase.md#physicalname)

***

### role

> `readonly` **role**: `IRole`

The role associated with the knowledge base.

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`role`](GraphKnowledgeBaseBase.md#role)

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`stack`](GraphKnowledgeBaseBase.md#stack)

***

### type

> `readonly` **type**: [`KnowledgeBaseType`](../enumerations/KnowledgeBaseType.md) = `KnowledgeBaseType.VECTOR`

The type of knowledge base.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`type`](GraphKnowledgeBaseBase.md#type)

***

### vectorStoreType

> `readonly` **vectorStoreType**: [`NEPTUNE_ANALYTICS`](../enumerations/VectorStoreType.md#neptune_analytics) = `VectorStoreType.NEPTUNE_ANALYTICS`

The storage type for the Vector Embeddings.

#### Overrides

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`vectorStoreType`](GraphKnowledgeBaseBase.md#vectorstoretype)

## Methods

### \_enableCrossEnvironment()

> **\_enableCrossEnvironment**(): `void`

**`Internal`**

Called when this resource is referenced across environments
(account/region) to order to request that a physical name will be generated
for this resource during synthesis, so the resource can be referenced
through its absolute name/arn.

#### Returns

`void`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`_enableCrossEnvironment`](GraphKnowledgeBaseBase.md#_enablecrossenvironment)

***

### addConfluenceDataSource()

> **addConfluenceDataSource**(`props`): [`ConfluenceDataSource`](ConfluenceDataSource.md)

Add a Confluence data source to the knowledge base.

#### Parameters

##### props

[`ConfluenceDataSourceAssociationProps`](../interfaces/ConfluenceDataSourceAssociationProps.md)

#### Returns

[`ConfluenceDataSource`](ConfluenceDataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addConfluenceDataSource`](GraphKnowledgeBaseBase.md#addconfluencedatasource)

***

### addCustomDataSource()

> **addCustomDataSource**(`props`): [`CustomDataSource`](CustomDataSource.md)

Add a Custom data source to the knowledge base.

#### Parameters

##### props

[`CustomDataSourceAssociationProps`](../interfaces/CustomDataSourceAssociationProps.md)

#### Returns

[`CustomDataSource`](CustomDataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addCustomDataSource`](GraphKnowledgeBaseBase.md#addcustomdatasource)

***

### addS3DataSource()

> **addS3DataSource**(`props`): [`S3DataSource`](S3DataSource.md)

Adds an S3 data source to the knowledge base.

#### Parameters

##### props

[`S3DataSourceAssociationProps`](../interfaces/S3DataSourceAssociationProps.md)

#### Returns

[`S3DataSource`](S3DataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addS3DataSource`](GraphKnowledgeBaseBase.md#adds3datasource)

***

### addSalesforceDataSource()

> **addSalesforceDataSource**(`props`): [`SalesforceDataSource`](SalesforceDataSource.md)

Add a Salesforce data source to the knowledge base.

#### Parameters

##### props

[`SalesforceDataSourceAssociationProps`](../interfaces/SalesforceDataSourceAssociationProps.md)

#### Returns

[`SalesforceDataSource`](SalesforceDataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addSalesforceDataSource`](GraphKnowledgeBaseBase.md#addsalesforcedatasource)

***

### addSharePointDataSource()

> **addSharePointDataSource**(`props`): [`SharePointDataSource`](SharePointDataSource.md)

Add a SharePoint data source to the knowledge base.

#### Parameters

##### props

[`SharePointDataSourceAssociationProps`](../interfaces/SharePointDataSourceAssociationProps.md)

#### Returns

[`SharePointDataSource`](SharePointDataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addSharePointDataSource`](GraphKnowledgeBaseBase.md#addsharepointdatasource)

***

### addWebCrawlerDataSource()

> **addWebCrawlerDataSource**(`props`): [`WebCrawlerDataSource`](WebCrawlerDataSource.md)

Add a web crawler data source to the knowledge base.

#### Parameters

##### props

[`WebCrawlerDataSourceAssociationProps`](../interfaces/WebCrawlerDataSourceAssociationProps.md)

#### Returns

[`WebCrawlerDataSource`](WebCrawlerDataSource.md)

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`addWebCrawlerDataSource`](GraphKnowledgeBaseBase.md#addwebcrawlerdatasource)

***

### applyRemovalPolicy()

> **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

#### Parameters

##### policy

`RemovalPolicy`

#### Returns

`void`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`applyRemovalPolicy`](GraphKnowledgeBaseBase.md#applyremovalpolicy)

***

### generatePhysicalName()

> `protected` **generatePhysicalName**(): `string`

#### Returns

`string`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`generatePhysicalName`](GraphKnowledgeBaseBase.md#generatephysicalname)

***

### getResourceArnAttribute()

> `protected` **getResourceArnAttribute**(`arnAttr`, `arnComponents`): `string`

Returns an environment-sensitive token that should be used for the
resource's "ARN" attribute (e.g. `bucket.bucketArn`).

Normally, this token will resolve to `arnAttr`, but if the resource is
referenced across environments, `arnComponents` will be used to synthesize
a concrete ARN with the resource's physical name. Make sure to reference
`this.physicalName` in `arnComponents`.

#### Parameters

##### arnAttr

`string`

The CFN attribute which resolves to the ARN of the resource.
Commonly it will be called "Arn" (e.g. `resource.attrArn`), but sometimes
it's the CFN resource's `ref`.

##### arnComponents

`ArnComponents`

The format of the ARN of this resource. You must
reference `this.physicalName` somewhere within the ARN in order for
cross-environment references to work.

#### Returns

`string`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`getResourceArnAttribute`](GraphKnowledgeBaseBase.md#getresourcearnattribute)

***

### getResourceNameAttribute()

> `protected` **getResourceNameAttribute**(`nameAttr`): `string`

Returns an environment-sensitive token that should be used for the
resource's "name" attribute (e.g. `bucket.bucketName`).

Normally, this token will resolve to `nameAttr`, but if the resource is
referenced across environments, it will be resolved to `this.physicalName`,
which will be a concrete name.

#### Parameters

##### nameAttr

`string`

The CFN attribute which resolves to the resource's name.
Commonly this is the resource's `ref`.

#### Returns

`string`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`getResourceNameAttribute`](GraphKnowledgeBaseBase.md#getresourcenameattribute)

***

### grant()

> **grant**(`grantee`, ...`actions`): `Grant`

Grant the given principal identity permissions to perform actions on this knowledge base.

#### Parameters

##### grantee

`IGrantable`

##### actions

...`string`[]

#### Returns

`Grant`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`grant`](GraphKnowledgeBaseBase.md#grant)

***

### grantQuery()

> **grantQuery**(`grantee`): `Grant`

Grant the given identity permissions to query the knowledge base.
This contains:
- Retrieve
- RetrieveAndGenerate

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`grantQuery`](GraphKnowledgeBaseBase.md#grantquery)

***

### grantRetrieve()

> **grantRetrieve**(`grantee`): `Grant`

Grant the given identity permissions to retrieve content from the knowledge base.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`grantRetrieve`](GraphKnowledgeBaseBase.md#grantretrieve)

***

### grantRetrieveAndGenerate()

> **grantRetrieveAndGenerate**(`grantee`): `Grant`

Grant the given identity permissions to retrieve content from the knowledge base.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`grantRetrieveAndGenerate`](GraphKnowledgeBaseBase.md#grantretrieveandgenerate)

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`toString`](GraphKnowledgeBaseBase.md#tostring)

***

### fromKnowledgeBaseAttributes()

> `static` **fromKnowledgeBaseAttributes**(`scope`, `id`, `attrs`): [`IGraphKnowledgeBase`](../interfaces/IGraphKnowledgeBase.md)

#### Parameters

##### scope

`Construct`

##### id

`string`

##### attrs

[`GraphKnowledgeBaseAttributes`](../interfaces/GraphKnowledgeBaseAttributes.md)

#### Returns

[`IGraphKnowledgeBase`](../interfaces/IGraphKnowledgeBase.md)

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

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

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`isConstruct`](GraphKnowledgeBaseBase.md#isconstruct)

***

### isOwnedResource()

> `static` **isOwnedResource**(`construct`): `boolean`

Returns true if the construct was created by CDK, and false otherwise

#### Parameters

##### construct

`IConstruct`

#### Returns

`boolean`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`isOwnedResource`](GraphKnowledgeBaseBase.md#isownedresource)

***

### isResource()

> `static` **isResource**(`construct`): `construct is Resource`

Check whether the given construct is a Resource

#### Parameters

##### construct

`IConstruct`

#### Returns

`construct is Resource`

#### Inherited from

[`GraphKnowledgeBaseBase`](GraphKnowledgeBaseBase.md).[`isResource`](GraphKnowledgeBaseBase.md#isresource)
