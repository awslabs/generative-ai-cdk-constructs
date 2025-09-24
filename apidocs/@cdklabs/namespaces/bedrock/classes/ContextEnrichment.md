[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ContextEnrichment

# Abstract Class: ContextEnrichment

Abstract class representing a context enrichment strategy.
The enrichment stategy used to provide additional context.
For example, Neptune GraphRAG uses Amazon Bedrock foundation
models to perform chunk entity extraction.

## Constructors

### Constructor

> **new ContextEnrichment**(): `ContextEnrichment`

#### Returns

`ContextEnrichment`

## Properties

### configuration

> `abstract` **configuration**: `ContextEnrichmentConfigurationProperty`

The CloudFormation property representation of this configuration

## Methods

### generatePolicyStatements()

> `abstract` **generatePolicyStatements**(): `PolicyStatement`[]

#### Returns

`PolicyStatement`[]

***

### foundationModel()

> `static` **foundationModel**(`props`): `ContextEnrichment`

Creates a Foundation Model-based enrichment strategy used to provide additional context
to the RAG application.

#### Parameters

##### props

[`FoundationModelContextEnrichmentProps`](../interfaces/FoundationModelContextEnrichmentProps.md)

#### Returns

`ContextEnrichment`
