# Redis Enterprise Cloud Vector Store Construct Library
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->


| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|

This construct library provides a class that defines an existing Redis Enterprise Cloud database to be used for a vector store for a Knowledge Base.

## Table of contents
- [API](#api)
- [Redis Enterprise Cloud Vector Store](#redis-enterprise-cloud-vector-store)

## API
See the [API documentation](../../../apidocs/modules/redisenterprisecloud.md).

## Redis Enterprise Cloud Vector Store

TypeScript

```ts
import { redisenterprisecloud } from '@cdklabs/generative-ai-cdk-constructs';

new redisenterprisecloud.RedisEnterpriseVectorStore({
  endpoint: 'redis-endpoint',
  vectorIndexName: 'your-index-name',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name'
});
```

Python
```python
from cdklabs.generative_ai_cdk_constructs import (
    redisenterprisecloud
)

redisds = redisenterprisecloud.RedisEnterpriseVectorStoreProps(
            credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
            endpoint='redis-endpoint',
            vector_index_name='your-index-name',
        )

```
