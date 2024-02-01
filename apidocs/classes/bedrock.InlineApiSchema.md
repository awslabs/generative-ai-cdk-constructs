[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / InlineApiSchema

# Class: InlineApiSchema

[bedrock](../modules/bedrock.md).InlineApiSchema

API Schema from a string value.

## Hierarchy

- [`ApiSchema`](bedrock.ApiSchema.md)

  ↳ **`InlineApiSchema`**

## Table of contents

### Constructors

- [constructor](bedrock.InlineApiSchema.md#constructor)

### Properties

- [schema](bedrock.InlineApiSchema.md#schema)

### Methods

- [bind](bedrock.InlineApiSchema.md#bind)
- [fromAsset](bedrock.InlineApiSchema.md#fromasset)
- [fromBucket](bedrock.InlineApiSchema.md#frombucket)
- [fromInline](bedrock.InlineApiSchema.md#frominline)

## Constructors

### constructor

• **new InlineApiSchema**(`schema`): [`InlineApiSchema`](bedrock.InlineApiSchema.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `schema` | `string` |

#### Returns

[`InlineApiSchema`](bedrock.InlineApiSchema.md)

#### Overrides

[ApiSchema](bedrock.ApiSchema.md).[constructor](bedrock.ApiSchema.md#constructor)

## Properties

### schema

• `Private` **schema**: `string`

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
