[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / SupplementalDataStorageLocation

# Class: SupplementalDataStorageLocation

Represents a supplemental data storage location for images extracted from multimodal documents in your data source.

## Constructors

### Constructor

> **new SupplementalDataStorageLocation**(`type`, `locationConfig`): `SupplementalDataStorageLocation`

Creates a new SupplementalDataStorageLocation

#### Parameters

##### type

[`S3`](../enumerations/SupplementalDataStorageLocationType.md#s3)

The type of the storage location

##### locationConfig

[`SupplementalDataStorageS3Config`](../interfaces/SupplementalDataStorageS3Config.md)

The configuration for the storage location

#### Returns

`SupplementalDataStorageLocation`

## Properties

### locationConfig

> `readonly` **locationConfig**: [`SupplementalDataStorageS3Config`](../interfaces/SupplementalDataStorageS3Config.md)

The configuration for the storage location

***

### type

> `readonly` **type**: [`S3`](../enumerations/SupplementalDataStorageLocationType.md#s3)

The type of the storage location

## Methods

### \_\_render()

> **\_\_render**(): `SupplementalDataStorageLocationProperty`

**`Internal`**

Renders as Cfn Property
 This is an internal core function and should not be called directly.

#### Returns

`SupplementalDataStorageLocationProperty`

***

### grantAccess()

> **grantAccess**(`grantee`): `Grant` \| `undefined`

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant` \| `undefined`

***

### s3()

> `static` **s3**(`config`): `SupplementalDataStorageLocation`

Creates a new S3 supplemental data storage location

#### Parameters

##### config

[`SupplementalDataStorageS3Config`](../interfaces/SupplementalDataStorageS3Config.md)

The configuration for the storage location

#### Returns

`SupplementalDataStorageLocation`

A new SupplementalDataStorageLocation instance
