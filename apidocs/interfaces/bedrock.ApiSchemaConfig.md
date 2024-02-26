[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / ApiSchemaConfig

# Interface: ApiSchemaConfig

[bedrock](../modules/bedrock.md).ApiSchemaConfig

Result of binding `ApiSchema` into an `ActionGroup`.

## Table of contents

### Properties

- [payload](bedrock.ApiSchemaConfig.md#payload)
- [s3](bedrock.ApiSchemaConfig.md#s3)

## Properties

### payload

• `Optional` `Readonly` **payload**: `string`

The JSON or YAML-formatted payload defining the OpenAPI schema for the action group.
(mutually exclusive with `s3`)

___

### s3

• `Optional` `Readonly` **s3**: [`S3Identifier`](bedrock.S3Identifier.md)

Contains details about the S3 object containing the OpenAPI schema for the action group.
(mutually exclusive with `payload`)
