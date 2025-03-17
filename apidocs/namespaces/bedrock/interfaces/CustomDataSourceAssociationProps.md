[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CustomDataSourceAssociationProps

# Interface: CustomDataSourceAssociationProps

Interface to add a new CustomDataSource to an existing KB

## Extends

- [`DataSourceAssociationProps`](DataSourceAssociationProps.md)

## Extended by

- [`CustomDataSourceProps`](CustomDataSourceProps.md)

## Properties

### chunkingStrategy?

> `readonly` `optional` **chunkingStrategy**: [`ChunkingStrategy`](../classes/ChunkingStrategy.md)

The chunking stategy to use for splitting your documents or content.
The chunks are then converted to embeddings and written to the vector
index allowing for similarity search and retrieval of the content.

#### Default

```ts
ChunkingStrategy.DEFAULT
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`chunkingStrategy`](DataSourceAssociationProps.md#chunkingstrategy)

***

### customTransformation?

> `readonly` `optional` **customTransformation**: [`CustomTransformation`](../classes/CustomTransformation.md)

The custom transformation strategy to use.

#### Default

```ts
- No custom transformation is used.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`customTransformation`](DataSourceAssociationProps.md#customtransformation)

***

### dataDeletionPolicy?

> `readonly` `optional` **dataDeletionPolicy**: [`DataDeletionPolicy`](../enumerations/DataDeletionPolicy.md)

The data deletion policy to apply to the data source.

#### Default

```ts
- Sets the data deletion policy to the default of the data source type.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`dataDeletionPolicy`](DataSourceAssociationProps.md#datadeletionpolicy)

***

### dataSourceName?

> `readonly` `optional` **dataSourceName**: `string`

The name of the data source.

#### Default

```ts
- A new name will be generated.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`dataSourceName`](DataSourceAssociationProps.md#datasourcename)

***

### description?

> `readonly` `optional` **description**: `string`

A description of the data source.

#### Default

```ts
- No description is provided.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`description`](DataSourceAssociationProps.md#description)

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

The KMS key to use to encrypt the data source.

#### Default

```ts
- Service owned and managed key.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`kmsKey`](DataSourceAssociationProps.md#kmskey)

***

### parsingStrategy?

> `readonly` `optional` **parsingStrategy**: [`ParsingStategy`](../classes/ParsingStategy.md)

The parsing strategy to use.

#### Default

```ts
- No Parsing Stategy is used.
```

#### Inherited from

[`DataSourceAssociationProps`](DataSourceAssociationProps.md).[`parsingStrategy`](DataSourceAssociationProps.md#parsingstrategy)
