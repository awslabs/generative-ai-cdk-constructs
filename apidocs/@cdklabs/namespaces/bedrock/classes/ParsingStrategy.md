[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ParsingStrategy

# Class: `abstract` ParsingStrategy

Represents an advanced parsing strategy configuration for Knowledge Base ingestion.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/kb-chunking-parsing.html#kb-advanced-parsing

## Constructors

### Constructor

> **new ParsingStrategy**(): `ParsingStrategy`

#### Returns

`ParsingStrategy`

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

### bedrockDataAutomation()

> `static` **bedrockDataAutomation**(): `ParsingStrategy`

Creates a Bedrock Data Automation-based parsing strategy for processing multimodal data.
It leverages generative AI to automate the transformation of multi-modal data into structured formats.
If the parsing fails, the Amazon Bedrock default parser is used instead.

#### Returns

`ParsingStrategy`

***

### foundationModel()

> `static` **foundationModel**(`props`): `ParsingStrategy`

Creates a Foundation Model-based parsing strategy for extracting non-textual information
from documents such as tables and charts.
- Additional costs apply when using advanced parsing due to foundation model usage.
- There are limits on file types (PDF) and total data that can be parsed using advanced parsing.

#### Parameters

##### props

[`FoundationModelParsingStrategyProps`](../interfaces/FoundationModelParsingStrategyProps.md)

#### Returns

`ParsingStrategy`

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-ds.html#kb-ds-supported-doc-formats-limits
