[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / SharePointDataSourceAuthType

# Enumeration: SharePointDataSourceAuthType

Represents the authentication types available for connecting to a SharePoint data source.

## Enumeration Members

### OAUTH2\_CLIENT\_CREDENTIALS

> **OAUTH2\_CLIENT\_CREDENTIALS**: `"OAUTH2_CLIENT_CREDENTIALS"`

OAuth 2.0 Client Credentials flow for authentication with SharePoint.
Your secret authentication credentials in AWS Secrets Manager should include:
- `username`: The admin username for SharePoint authentication
- `password`: The admin password associated with the username
- `clientId`: The client ID (also known as application ID)
- `clientSecret`: The client secret
