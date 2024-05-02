[@cdklabs/generative-ai-cdk-constructs](../README.md) / amazonaurora

# Namespace: amazonaurora

## Table of contents

### Classes

- [AmazonAuroraVectorStore](../classes/amazonaurora.AmazonAuroraVectorStore.md)

### Interfaces

- [AmazonAuroraVectorStoreProps](../interfaces/amazonaurora.AmazonAuroraVectorStoreProps.md)
- [BaseAuroraVectorStoreProps](../interfaces/amazonaurora.BaseAuroraVectorStoreProps.md)
- [ExistingAmazonAuroraVectorStoreProps](../interfaces/amazonaurora.ExistingAmazonAuroraVectorStoreProps.md)

### Type Aliases

- [SupportedPostgreSQLVersions](amazonaurora.md#supportedpostgresqlversions)

### Variables

- [SupportedPostgreSQLVersions](amazonaurora.md#supportedpostgresqlversions-1)

## Type Aliases

### SupportedPostgreSQLVersions

Ƭ **SupportedPostgreSQLVersions**: typeof [`SupportedPostgreSQLVersions`](amazonaurora.md#supportedpostgresqlversions-1)[keyof typeof [`SupportedPostgreSQLVersions`](amazonaurora.md#supportedpostgresqlversions-1)]

## Variables

### SupportedPostgreSQLVersions

• `Const` **SupportedPostgreSQLVersions**: `Object`

List of supported versions of PostgreSQL for Aurora cluster.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `AURORA_POSTGRESQL_V12_16` | `AuroraPostgresEngineVersion` |
| `AURORA_POSTGRESQL_V13_12` | `AuroraPostgresEngineVersion` |
| `AURORA_POSTGRESQL_V14_9` | `AuroraPostgresEngineVersion` |
| `AURORA_POSTGRESQL_V15_4` | `AuroraPostgresEngineVersion` |
| `AURORA_POSTGRESQL_V15_5` | `AuroraPostgresEngineVersion` |
