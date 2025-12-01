[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / IVectorKnowledgeBase

# Interface: IVectorKnowledgeBase

Represents a Knowledge Base, either created with CDK or imported.

## Extends

- [`IKnowledgeBase`](IKnowledgeBase.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`description`](IKnowledgeBase.md#description)

***

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed in a Stack (those created by
creating new class instances like `new Role()`, `new Bucket()`, etc.), this
is always the same as the environment of the stack they belong to.

For referenced resources (those obtained from referencing methods like
`Role.fromRoleArn()`, `Bucket.fromBucketName()`, etc.), they might be
different than the stack they were imported into.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`env`](IKnowledgeBase.md#env)

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative instruction of the knowledge base.
A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`instruction`](IKnowledgeBase.md#instruction)

***

### knowledgeBaseArn

> `readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB12345678"
```

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`knowledgeBaseArn`](IKnowledgeBase.md#knowledgebasearn)

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

#### Example

```ts
"KB12345678"
```

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`knowledgeBaseId`](IKnowledgeBase.md#knowledgebaseid)

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`node`](IKnowledgeBase.md#node)

***

### role

> `readonly` **role**: `IRole`

The role associated with the knowledge base.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`role`](IKnowledgeBase.md#role)

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`stack`](IKnowledgeBase.md#stack)

***

### type

> `readonly` **type**: [`KnowledgeBaseType`](../enumerations/KnowledgeBaseType.md)

The type of knowledge base.

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`type`](IKnowledgeBase.md#type)

***

### vectorStoreType

> `readonly` **vectorStoreType**: [`VectorStoreType`](../enumerations/VectorStoreType.md)

The storage type for the Vector Embeddings.

## Methods

### addConfluenceDataSource()

> **addConfluenceDataSource**(`props`): [`ConfluenceDataSource`](../classes/ConfluenceDataSource.md)

Add a Confluence data source to the knowledge base.

#### Parameters

##### props

[`ConfluenceDataSourceAssociationProps`](ConfluenceDataSourceAssociationProps.md)

#### Returns

[`ConfluenceDataSource`](../classes/ConfluenceDataSource.md)

***

### addCustomDataSource()

> **addCustomDataSource**(`props`): [`CustomDataSource`](../classes/CustomDataSource.md)

Add a Custom data source to the knowledge base.

#### Parameters

##### props

[`CustomDataSourceAssociationProps`](CustomDataSourceAssociationProps.md)

#### Returns

[`CustomDataSource`](../classes/CustomDataSource.md)

***

### addS3DataSource()

> **addS3DataSource**(`props`): [`S3DataSource`](../classes/S3DataSource.md)

Add an S3 data source to the knowledge base.

#### Parameters

##### props

[`S3DataSourceAssociationProps`](S3DataSourceAssociationProps.md)

#### Returns

[`S3DataSource`](../classes/S3DataSource.md)

***

### addSalesforceDataSource()

> **addSalesforceDataSource**(`props`): [`SalesforceDataSource`](../classes/SalesforceDataSource.md)

Add a Salesforce data source to the knowledge base.

#### Parameters

##### props

[`SalesforceDataSourceAssociationProps`](SalesforceDataSourceAssociationProps.md)

#### Returns

[`SalesforceDataSource`](../classes/SalesforceDataSource.md)

***

### addSharePointDataSource()

> **addSharePointDataSource**(`props`): [`SharePointDataSource`](../classes/SharePointDataSource.md)

Add a SharePoint data source to the knowledge base.

#### Parameters

##### props

[`SharePointDataSourceAssociationProps`](SharePointDataSourceAssociationProps.md)

#### Returns

[`SharePointDataSource`](../classes/SharePointDataSource.md)

***

### addWebCrawlerDataSource()

> **addWebCrawlerDataSource**(`props`): [`WebCrawlerDataSource`](../classes/WebCrawlerDataSource.md)

Add a web crawler data source to the knowledge base.

#### Parameters

##### props

[`WebCrawlerDataSourceAssociationProps`](WebCrawlerDataSourceAssociationProps.md)

#### Returns

[`WebCrawlerDataSource`](../classes/WebCrawlerDataSource.md)

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

[`IKnowledgeBase`](IKnowledgeBase.md).[`applyRemovalPolicy`](IKnowledgeBase.md#applyremovalpolicy)

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

[`IKnowledgeBase`](IKnowledgeBase.md).[`grant`](IKnowledgeBase.md#grant)

***

### grantQuery()

> **grantQuery**(`grantee`): `Grant`

Grant the given identity permissions to query the knowledge base.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

#### Inherited from

[`IKnowledgeBase`](IKnowledgeBase.md).[`grantQuery`](IKnowledgeBase.md#grantquery)

***

### grantRetrieve()

> **grantRetrieve**(`grantee`): `Grant`

Grant the given identity permissions to retrieve content from the knowledge base.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### grantRetrieveAndGenerate()

> **grantRetrieveAndGenerate**(`grantee`): `Grant`

Grant the given identity permissions to retrieve content from the knowledge base.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`
