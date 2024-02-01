[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / S3ApiSchema

# Class: S3ApiSchema

[bedrock](../modules/bedrock.md).S3ApiSchema

API Schema in an S3 object.

## Hierarchy

- [`ApiSchema`](bedrock.ApiSchema.md)

  ↳ **`S3ApiSchema`**

## Table of contents

### Constructors

- [constructor](bedrock.S3ApiSchema.md#constructor)

### Properties

- [bucket](bedrock.S3ApiSchema.md#bucket)
- [key](bedrock.S3ApiSchema.md#key)

### Methods

- [bind](bedrock.S3ApiSchema.md#bind)
- [fromAsset](bedrock.S3ApiSchema.md#fromasset)
- [fromBucket](bedrock.S3ApiSchema.md#frombucket)
- [fromInline](bedrock.S3ApiSchema.md#frominline)

## Constructors

### constructor

• **new S3ApiSchema**(`bucket`, `key`): [`S3ApiSchema`](bedrock.S3ApiSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `bucket` | `IBucket` |
| `key` | `string` |

#### Returns

[`S3ApiSchema`](bedrock.S3ApiSchema.md)

#### Overrides

[ApiSchema](bedrock.ApiSchema.md).[constructor](bedrock.ApiSchema.md#constructor)

## Properties

### bucket

• `Private` **bucket**: `IBucket`

___

### key

• `Private` **key**: `string`

## Methods

### bind

▸ **bind**(`_scope`): [`ApiSchemaConfig`](../interfaces/bedrock.ApiSchemaConfig.md)

Called when the action group is initialized to allow this object to bind
to the stack, add resources and have fun.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_scope` | `Construct` | The binding scope. Don't be smart about trying to down-cast or assume it's initialized. You may just use it as a construct scope. |

#### Returns

[`ApiSchemaConfig`](../interfaces/bedrock.ApiSchemaConfig.md)

#### Overrides

[ApiSchema](bedrock.ApiSchema.md).[bind](bedrock.ApiSchema.md#bind)

___

### fromAsset

▸ **fromAsset**(`path`): [`InlineApiSchema`](bedrock.InlineApiSchema.md)

Loads the API Schema from a local disk path.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `path` | `string` | Path to the Open API schema file in yaml or JSON |

#### Returns

[`InlineApiSchema`](bedrock.InlineApiSchema.md)

`InlineApiSchema` with the contents of `path`

#### Inherited from

[ApiSchema](bedrock.ApiSchema.md).[fromAsset](bedrock.ApiSchema.md#fromasset)

___

### fromBucket

▸ **fromBucket**(`bucket`, `key`): [`S3ApiSchema`](bedrock.S3ApiSchema.md)

API Schema as an S3 object.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bucket` | `IBucket` | The S3 bucket |
| `key` | `string` | The object key |

#### Returns

[`S3ApiSchema`](bedrock.S3ApiSchema.md)

`S3ApiSchema` with the S3 bucket and key.

#### Inherited from

[ApiSchema](bedrock.ApiSchema.md).[fromBucket](bedrock.ApiSchema.md#frombucket)

___

### fromInline

▸ **fromInline**(`schema`): [`InlineApiSchema`](bedrock.InlineApiSchema.md)

Inline code for API Schema

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `schema` | `string` | The actual Open API schema |

#### Returns

[`InlineApiSchema`](bedrock.InlineApiSchema.md)

`InlineApiSchema` with inline schema

#### Inherited from

[ApiSchema](bedrock.ApiSchema.md).[fromInline](bedrock.ApiSchema.md#frominline)
