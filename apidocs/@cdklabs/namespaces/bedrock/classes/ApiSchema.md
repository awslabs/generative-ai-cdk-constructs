[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ApiSchema

# Class: `abstract` ApiSchema

Represents the concept of an API Schema for a Bedrock Agent Action Group.

## Extended by

- [`InlineApiSchema`](InlineApiSchema.md)
- [`S3ApiSchema`](S3ApiSchema.md)

## Constructors

### Constructor

> `protected` **new ApiSchema**(`s3File`?, `inlineSchema`?): `ApiSchema`

Constructor accessible only to extending classes.

#### Parameters

##### s3File?

`Location`

##### inlineSchema?

`string`

#### Returns

`ApiSchema`

## Properties

### inlineSchema?

> `readonly` `optional` **inlineSchema**: `string`

***

### s3File?

> `readonly` `optional` **s3File**: `Location`

## Methods

### \_render()

> `abstract` **\_render**(): `APISchemaProperty`

**`Internal`**

Format as CFN properties

 This is an internal core function and should not be called directly.

#### Returns

`APISchemaProperty`

***

### fromInline()

> `static` **fromInline**(`schema`): [`InlineApiSchema`](InlineApiSchema.md)

Creates an API Schema from an inline string.

#### Parameters

##### schema

`string`

the JSON or YAML payload defining the OpenAPI schema for the action group

#### Returns

[`InlineApiSchema`](InlineApiSchema.md)

***

### fromLocalAsset()

> `static` **fromLocalAsset**(`path`): [`InlineApiSchema`](InlineApiSchema.md)

Creates an API Schema from a local file.

#### Parameters

##### path

`string`

the path to the local file containing the OpenAPI schema for the action group

#### Returns

[`InlineApiSchema`](InlineApiSchema.md)

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
