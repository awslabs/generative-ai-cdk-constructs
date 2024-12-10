[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / IKnowledgeBase

# Interface: IKnowledgeBase

Represents a Knowledge Base, either created with CDK or imported.

## Extends

- `IResource`

## Properties

### description?

> `readonly` `optional` **description**: `string`

A description of the knowledge base.

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

`IResource.env`

***

### instruction?

> `readonly` `optional` **instruction**: `string`

Instructions for agents based on the design and type of information of the
Knowledge Base. This will impact how Agents interact with the Knowledge Base.

***

### knowledgeBaseArn

> `readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:knowledge-base/KB12345678"
```

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

#### Example

```ts
"KB12345678"
```

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

***

### role

> `readonly` **role**: `IRole`

The role associated with the knowledge base.

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

`IResource.stack`

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

`IResource.applyRemovalPolicy`

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

The principal to grant permissions to

#### Returns

`Grant`

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
