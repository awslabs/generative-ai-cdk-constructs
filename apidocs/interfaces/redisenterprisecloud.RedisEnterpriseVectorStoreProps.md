[@cdklabs/generative-ai-cdk-constructs](../README.md) / [redisenterprisecloud](../modules/redisenterprisecloud.md) / RedisEnterpriseVectorStoreProps

# Interface: RedisEnterpriseVectorStoreProps

[redisenterprisecloud](../modules/redisenterprisecloud.md).RedisEnterpriseVectorStoreProps

Properties for a RedisEnterpriseCloudVectorStore.

## Table of contents

### Properties

- [credentialsSecretArn](redisenterprisecloud.RedisEnterpriseVectorStoreProps.md#credentialssecretarn)
- [endpoint](redisenterprisecloud.RedisEnterpriseVectorStoreProps.md#endpoint)
- [vectorIndexName](redisenterprisecloud.RedisEnterpriseVectorStoreProps.md#vectorindexname)

## Properties

### credentialsSecretArn

• `Readonly` **credentialsSecretArn**: `string`

ARN of the secret defining the username, password, serverCertificate,
clientCertificate and clientPrivateKey to use when connecting to the Redis Enterprise Cloud database.
Learn more in the link below.

**`See`**

https://docs.redis.com/latest/rc/cloud-integrations/aws-marketplace/aws-bedrock/set-up-redis/

___

### endpoint

• `Readonly` **endpoint**: `string`

The endpoint URL for your Redis Enterprise Cloud database.

___

### vectorIndexName

• `Readonly` **vectorIndexName**: `string`

Vector index name of your Redis Enterprise Cloud.
