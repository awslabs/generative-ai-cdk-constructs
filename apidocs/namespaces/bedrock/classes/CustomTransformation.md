[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CustomTransformation

# Class: `abstract` CustomTransformation

Represents a custom transformation configuration for a data source ingestion.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html#kb-custom-transformation

## Constructors

### new CustomTransformation()

> **new CustomTransformation**(): [`CustomTransformation`](CustomTransformation.md)

#### Returns

[`CustomTransformation`](CustomTransformation.md)

## Properties

### configuration

> `abstract` **configuration**: `CustomTransformationConfigurationProperty`

The CloudFormation property representation of this custom transformation configuration.

## Methods

### generatePolicyStatements()

> `abstract` **generatePolicyStatements**(`scope`): `PolicyStatement`[]

#### Parameters

##### scope

`Construct`

#### Returns

`PolicyStatement`[]

***

### lambda()

> `static` **lambda**(`props`): [`CustomTransformation`](CustomTransformation.md)

This feature allows you to use a Lambda function to inject your own logic
into the knowledge base ingestion process.

#### Parameters

##### props

[`LambdaCustomTransformationProps`](../interfaces/LambdaCustomTransformationProps.md)

#### Returns

[`CustomTransformation`](CustomTransformation.md)

#### See

https://github.com/aws-samples/amazon-bedrock-samples/blob/main/knowledge-bases/features-examples/02-optimizing-accuracy-retrieved-results/advanced_chunking_options.ipynb
