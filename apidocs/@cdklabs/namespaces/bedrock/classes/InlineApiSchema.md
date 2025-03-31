[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / InlineApiSchema

# Class: InlineApiSchema

Represents the concept of an API Schema for a Bedrock Agent Action Group.

## Extends

- [`ApiSchema`](ApiSchema.md)

## Constructors

### Constructor

> **new InlineApiSchema**(`schema`): `InlineApiSchema`

#### Parameters

##### schema

`string`

#### Returns

`InlineApiSchema`

#### Overrides

[`ApiSchema`](ApiSchema.md).[`constructor`](ApiSchema.md#constructor)

## Properties

### inlineSchema?

> `readonly` `optional` **inlineSchema**: `string`

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`inlineSchema`](ApiSchema.md#inlineschema)

***

### s3File?

> `readonly` `optional` **s3File**: `Location`

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`s3File`](ApiSchema.md#s3file)

## Methods

### \_render()

> **\_render**(): `APISchemaProperty`

**`Internal`**

This is an internal core function and should not be called directly.

#### Returns

`APISchemaProperty`

#### Overrides

[`ApiSchema`](ApiSchema.md).[`_render`](ApiSchema.md#_render)

***

### fromInline()

> `static` **fromInline**(`schema`): `InlineApiSchema`

Creates an API Schema from an inline string.

#### Parameters

##### schema

`string`

the JSON or YAML payload defining the OpenAPI schema for the action group

#### Returns

`InlineApiSchema`

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromInline`](ApiSchema.md#frominline)

***

### fromLocalAsset()

> `static` **fromLocalAsset**(`path`): `InlineApiSchema`

Creates an API Schema from a local file.

#### Parameters

##### path

`string`

the path to the local file containing the OpenAPI schema for the action group

#### Returns

`InlineApiSchema`

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromLocalAsset`](ApiSchema.md#fromlocalasset)

***

### fromS3File()

> `static` **fromS3File**(`bucket`, `objectKey`): [`S3ApiSchema`](S3ApiSchema.md)

Creates an API Schema from an S3 File

#### Parameters

##### bucket

`IBucket`

the bucket containing the local file containing the OpenAPI schema for the action group

##### objectKey

`string`

object key in the bucket

#### Returns

[`S3ApiSchema`](S3ApiSchema.md)

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromS3File`](ApiSchema.md#froms3file)
