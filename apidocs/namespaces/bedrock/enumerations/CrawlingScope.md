[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / CrawlingScope

# Enumeration: CrawlingScope

The scope of the crawling.

## Enumeration Members

### DEFAULT

> **DEFAULT**: `"DEFAULT"`

Limit crawling to web pages that belong to the same host and with the
same initial URL path.

***

### HOST\_ONLY

> **HOST\_ONLY**: `"HOST_ONLY"`

Crawls only web pages that belong to the same host or primary domain.

***

### SUBDOMAINS

> **SUBDOMAINS**: `"SUBDOMAINS"`

Includes subdomains in addition to the host or primary domain, i.e.
web pages that contain "aws.amazon.com" can also include
sub domain "docs.aws.amazon.com"
