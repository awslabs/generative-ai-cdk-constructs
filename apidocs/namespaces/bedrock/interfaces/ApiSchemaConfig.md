[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / ApiSchemaConfig

# Interface: ApiSchemaConfig

Result of binding `ApiSchema` into an `ActionGroup`.

## Properties

### payload?

> `readonly` `optional` **payload**: `string`

The JSON or YAML-formatted payload defining the OpenAPI schema for the action group.
(mutually exclusive with `s3`)

***

### s3?

> `readonly` `optional` **s3**: [`S3Identifier`](S3Identifier.md)

Contains details about the S3 object containing the OpenAPI schema for the action group.
(mutually exclusive with `payload`)
