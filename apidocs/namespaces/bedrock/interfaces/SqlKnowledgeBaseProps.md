[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / SqlKnowledgeBaseProps

# Interface: SqlKnowledgeBaseProps

Properties for a Sql knowledge base.

## Extends

- [`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md)

## Properties

### description?

> `readonly` `optional` **description**: `string`

The description of the knowledge base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`description`](CommonKnowledgeBaseProps.md#description)

***

### existingRole?

> `readonly` `optional` **existingRole**: `IRole`

Existing IAM role with policy statements granting appropriate permissions
to invoke the specific embeddings models.
Any entity (e.g., an AWS service or application) that assumes
this role will be able to invoke or use the
specified embeddings model within the Bedrock service.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`existingRole`](CommonKnowledgeBaseProps.md#existingrole)

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative description of the knowledge base.

A Bedrock Agent can use this instruction to determine if it should
query this Knowledge Base.

#### Default

```ts
- No description provided.
```

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`instruction`](CommonKnowledgeBaseProps.md#instruction)

***

### name?

> `readonly` `optional` **name**: `string`

The name of the knowledge base.

#### Inherited from

[`CommonKnowledgeBaseProps`](CommonKnowledgeBaseProps.md).[`name`](CommonKnowledgeBaseProps.md#name)

***

### queryGenerationConfiguration?

> `readonly` `optional` **queryGenerationConfiguration**: `QueryGenerationConfigurationProperty`

The query generation configuration.

***

### redshiftProvisionedConfiguration?

> `readonly` `optional` **redshiftProvisionedConfiguration**: `RedshiftProvisionedConfigurationProperty`

The Amazon Redshift provisioned configuration.
If redshiftQueryEngineType is not of type `PROVISIONED`,
do not include this property as it will throw error.

***

### redshiftQueryEngineAwsDataCatalogStorageConfiguration?

> `readonly` `optional` **redshiftQueryEngineAwsDataCatalogStorageConfiguration**: `RedshiftQueryEngineAwsDataCatalogStorageConfigurationProperty`

The storage configuration for AWS Glue Data Catalog.
If redshiftQueryEngineStorageType is not of type `AWS_DATA_CATALOG`,
do not include this property as it will throw error.

***

### redshiftQueryEngineRedshiftStorageConfiguration?

> `readonly` `optional` **redshiftQueryEngineRedshiftStorageConfiguration**: `RedshiftQueryEngineRedshiftStorageConfigurationProperty`

The storage configuration for Amazon Redshift.
If redshiftQueryEngineStorageType is no of type `REDSHIFT`,
do not include this property as it will throw error.

***

### redshiftQueryEngineStorageType

> `readonly` **redshiftQueryEngineStorageType**: [`RedshiftQueryEngineStorageType`](../enumerations/RedshiftQueryEngineStorageType.md)

The type of data storage service, which can be of `REDSHIFT`, `AWS_DATA_CATALOG` types.

***

### redshiftQueryEngineType

> `readonly` **redshiftQueryEngineType**: [`RedshiftQueryEngineType`](../enumerations/RedshiftQueryEngineType.md)

The type of query engine, which can be of `SERVERLESS` or `PROVISIONED` types.

***

### redshiftServerlessConfiguration?

> `readonly` `optional` **redshiftServerlessConfiguration**: `RedshiftServerlessConfigurationProperty`

The Amazon Redshift serverless configuration.
If redshiftQueryEngineType is not of type `SERVERLESS`,
do not include this property as it will throw error.

***

### sqlDatabaseType?

> `readonly` `optional` **sqlDatabaseType**: [`REDSHIFT`](../enumerations/SqlDatabaseType.md#redshift)

#### Default

```ts
- Amazon Redshift is the only and default query engine for Sql KB for now.
```
