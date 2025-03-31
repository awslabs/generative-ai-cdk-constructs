[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ParsingStategyType

# Enumeration: ParsingStategyType

Enum representing the types of parsing strategies available for Amazon Bedrock Knowledge Bases.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/kb-advanced-parsing.html

## Enumeration Members

### DATA\_AUTOMATION

> **DATA\_AUTOMATION**: `"BEDROCK_DATA_AUTOMATION"`

Processes multimodal data using Bedrock Data Automation (BDA). It leverages
generative AI to automate the transformation of multi-modal data into structured formats.
If you choose a foundation model or Amazon Bedrock Data Automation for parsing and it fails
to parse a file, the Amazon Bedrock default parser is used instead.

***

### FOUNDATION\_MODEL

> **FOUNDATION\_MODEL**: `"BEDROCK_FOUNDATION_MODEL"`

Uses a Bedrock Foundation Model for advanced parsing of non-textual information from documents.
