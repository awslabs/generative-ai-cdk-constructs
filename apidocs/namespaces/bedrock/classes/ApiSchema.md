[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ApiSchema

# Class: `abstract` ApiSchema

Bedrock Agents Action Group API Schema definition.

## Extended by

- [`InlineApiSchema`](InlineApiSchema.md)
- [`S3ApiSchema`](S3ApiSchema.md)

## Constructors

### new ApiSchema()

> **new ApiSchema**(): [`ApiSchema`](ApiSchema.md)

#### Returns

[`ApiSchema`](ApiSchema.md)

## Methods

### bind()

> `abstract` **bind**(`scope`): [`ApiSchemaConfig`](../interfaces/ApiSchemaConfig.md)

Called when the action group is initialized to allow this object to bind
to the stack, add resources and have fun.

#### Parameters

• **scope**: `Construct`

The binding scope. Don't be smart about trying to down-cast or
assume it's initialized. You may just use it as a construct scope.

#### Returns

[`ApiSchemaConfig`](../interfaces/ApiSchemaConfig.md)

***

### fromAsset()

> `static` **fromAsset**(`path`): [`InlineApiSchema`](InlineApiSchema.md)

Loads the API Schema from a local disk path.

#### Parameters

• **path**: `string`

Path to the Open API schema file in yaml or JSON

#### Returns

[`InlineApiSchema`](InlineApiSchema.md)

`InlineApiSchema` with the contents of `path`

***

### fromBucket()

> `static` **fromBucket**(`bucket`, `key`): [`S3ApiSchema`](S3ApiSchema.md)

API Schema as an S3 object.

#### Parameters

• **bucket**: `IBucket`

The S3 bucket

• **key**: `string`

The object key

#### Returns

[`S3ApiSchema`](S3ApiSchema.md)

`S3ApiSchema` with the S3 bucket and key.

***

### fromInline()

> `static` **fromInline**(`schema`): [`InlineApiSchema`](InlineApiSchema.md)

Inline code for API Schema

#### Parameters

• **schema**: `string`

The actual Open API schema

#### Returns

[`InlineApiSchema`](InlineApiSchema.md)

`InlineApiSchema` with inline schema
