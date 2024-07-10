[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / InlineApiSchema

# Class: InlineApiSchema

API Schema from a string value.

## Extends

- [`ApiSchema`](ApiSchema.md)

## Constructors

### new InlineApiSchema()

> **new InlineApiSchema**(`schema`): [`InlineApiSchema`](InlineApiSchema.md)

#### Parameters

• **schema**: `string`

#### Returns

[`InlineApiSchema`](InlineApiSchema.md)

#### Overrides

[`ApiSchema`](ApiSchema.md).[`constructor`](ApiSchema.md#constructors)

## Methods

### bind()

> **bind**(`_scope`): [`ApiSchemaConfig`](../interfaces/ApiSchemaConfig.md)

Called when the action group is initialized to allow this object to bind
to the stack, add resources and have fun.

#### Parameters

• **\_scope**: `Construct`

#### Returns

[`ApiSchemaConfig`](../interfaces/ApiSchemaConfig.md)

#### Overrides

[`ApiSchema`](ApiSchema.md).[`bind`](ApiSchema.md#bind)

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

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromAsset`](ApiSchema.md#fromasset)

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

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromBucket`](ApiSchema.md#frombucket)

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

#### Inherited from

[`ApiSchema`](ApiSchema.md).[`fromInline`](ApiSchema.md#frominline)
