[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / ApiSchema

# Class: ApiSchema

[bedrock](/docs/api/modules/bedrock.md).ApiSchema

Bedrock Agents Action Group API Schema definition.

## Hierarchy

- **`ApiSchema`**

  ↳ [`InlineApiSchema`](bedrock.InlineApiSchema.md)

  ↳ [`S3ApiSchema`](bedrock.S3ApiSchema.md)

## Constructors

### constructor

• **new ApiSchema**(): [`ApiSchema`](bedrock.ApiSchema.md)

#### Returns

[`ApiSchema`](bedrock.ApiSchema.md)

## Methods

### bind

▸ **bind**(`scope`): [`ApiSchemaConfig`](/docs/api/interfaces/bedrock.ApiSchemaConfig.md)

Called when the action group is initialized to allow this object to bind
to the stack, add resources and have fun.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `scope` | `Construct` | The binding scope. Don't be smart about trying to down-cast or assume it's initialized. You may just use it as a construct scope. |

#### Returns

[`ApiSchemaConfig`](/docs/api/interfaces/bedrock.ApiSchemaConfig.md)

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
