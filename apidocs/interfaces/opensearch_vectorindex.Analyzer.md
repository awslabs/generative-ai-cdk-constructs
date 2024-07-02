[@cdklabs/generative-ai-cdk-constructs](../README.md) / [opensearch\_vectorindex](../modules/opensearch_vectorindex.md) / Analyzer

# Interface: Analyzer

[opensearch\_vectorindex](../modules/opensearch_vectorindex.md).Analyzer

Properties for the Analyzer.

## Table of contents

### Properties

- [characterFilters](opensearch_vectorindex.Analyzer.md#characterfilters)
- [tokenFilters](opensearch_vectorindex.Analyzer.md#tokenfilters)
- [tokenizer](opensearch_vectorindex.Analyzer.md#tokenizer)

## Properties

### characterFilters

• `Readonly` **characterFilters**: [`ICU_NORMALIZER`](../enums/opensearchserverless.CharacterFilterType.md#icu_normalizer)[]

The analyzers to use.

___

### tokenFilters

• `Readonly` **tokenFilters**: [`TokenFilterType`](../enums/opensearchserverless.TokenFilterType.md)[]

The token filters to use.

___

### tokenizer

• `Readonly` **tokenizer**: [`TokenizerType`](../enums/opensearchserverless.TokenizerType.md)

The tokenizer to use.
