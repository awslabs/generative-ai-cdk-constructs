[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / DataSourceType

# Enumeration: DataSourceType

Represents the types of data sources that can be associated to an Knowledge Base.

## Enumeration Members

### CONFLUENCE

> **CONFLUENCE**: `"CONFLUENCE"`

Confluence Cloud Instance data source.

***

### CUSTOM

> **CUSTOM**: `"CUSTOM"`

Custom data source.
A custom data source allows the flexibility to automatically ingest documents
into your vector database directly.

***

### REDSHIFT\_METADATA

> **REDSHIFT\_METADATA**: `"REDSHIFT_METADATA"`

Redshift Metadata data source.

***

### S3

> **S3**: `"S3"`

Amazon S3 Bucket data source.

***

### SALESFORCE

> **SALESFORCE**: `"SALESFORCE"`

Salesforce instance data source.

***

### SHAREPOINT

> **SHAREPOINT**: `"SHAREPOINT"`

Microsoft SharePoint instance data source.

***

### WEB\_CRAWLER

> **WEB\_CRAWLER**: `"WEB"`

Web Crawler data source.
Extracts content from authorized public web pages using a crawler.
