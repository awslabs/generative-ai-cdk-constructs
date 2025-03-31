[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / ConfluenceDataSourceAuthType

# Enumeration: ConfluenceDataSourceAuthType

The different authentication types available to connect to your Confluence instance.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/confluence-data-source-connector.html#configuration-confluence-connector

## Enumeration Members

### BASIC

> **BASIC**: `"BASIC"`

Your secret authentication credentials in AWS Secrets Manager should include:
 - `username` (email of admin account)
 - `password` (API token)

***

### OAUTH2\_CLIENT\_CREDENTIALS

> **OAUTH2\_CLIENT\_CREDENTIALS**: `"OAUTH2_CLIENT_CREDENTIALS"`

Your secret authentication credentials in AWS Secrets Manager should include:
- `confluenceAppKey`
- `confluenceAppSecret`
- `confluenceAccessToken`
- `confluenceRefreshToken`
