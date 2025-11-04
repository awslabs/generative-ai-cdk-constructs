[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [kendra](../README.md) / KendraUserContextPolicy

# Enumeration: KendraUserContextPolicy

The different policies available to filter search results based on user context.

## Enumeration Members

### ATTRIBUTE\_FILTER

> **ATTRIBUTE\_FILTER**: `"ATTRIBUTE_FILTER"`

All indexed content is searchable and displayable for all users.
If you want to filter search results on user context, you can use
the attribute filters of _user_id and _group_ids or you can provide
user and group information in UserContext .

***

### USER\_TOKEN

> **USER\_TOKEN**: `"USER_TOKEN"`

Enables token-based user access control to filter search results on
user context. All documents with no access control and all documents
accessible to the user will be searchable and displayable.
