[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / LambdaCustomTransformationProps

# Interface: LambdaCustomTransformationProps

Properties for configuring a Lambda-based custom transformation.

## Properties

### lambdaFunction

> `readonly` **lambdaFunction**: `IFunction`

The Lambda function to use for custom document processing.

***

### s3BucketUri

> `readonly` **s3BucketUri**: `string`

An S3 bucket URL/path to store input documents for Lambda processing
and to store the output of the processed documents.

#### Example

```ts
"s3://my-bucket/chunk-processor/"
```
