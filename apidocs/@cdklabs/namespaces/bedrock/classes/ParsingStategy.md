[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ParsingStategy

# Class: `abstract` ParsingStategy

Represents an advanced parsing strategy configuration for Knowledge Base ingestion.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html#kb-advanced-parsing

## Constructors

### Constructor

> **new ParsingStategy**(): `ParsingStategy`

#### Returns

`ParsingStategy`

## Properties

### configuration

> `abstract` **configuration**: `ParsingConfigurationProperty`

The CloudFormation property representation of this configuration

## Methods

### generatePolicyStatements()

> `abstract` **generatePolicyStatements**(): `PolicyStatement`[]

#### Returns

`PolicyStatement`[]

***

### foundationModel()

> `static` **foundationModel**(`props`): `ParsingStategy`

Creates a Foundation Model-based parsing strategy for extracting non-textual information
from documents such as tables and charts.
- Additional costs apply when using advanced parsing due to foundation model usage.
- There are limits on file types (PDF) and total data that can be parsed using advanced parsing.

#### Parameters

##### props

[`FoundationModelParsingStategyProps`](../interfaces/FoundationModelParsingStategyProps.md)

#### Returns

`ParsingStategy`

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html#kb-ds-supported-doc-formats-limits
