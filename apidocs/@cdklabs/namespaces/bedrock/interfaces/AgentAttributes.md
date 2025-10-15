[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / AgentAttributes

# Interface: AgentAttributes

Attributes for specifying an imported Bedrock Agent.

## Properties

### agentArn

> `readonly` **agentArn**: `string`

The ARN of the agent.

#### Attribute

***

### agentVersion?

> `readonly` `optional` **agentVersion**: `string`

The agent version. If no explicit versions have been created,
leave this  empty to use the DRAFT version. Otherwise, use the
version number (e.g. 1).

***

### kmsKeyArn?

> `readonly` `optional` **kmsKeyArn**: `string`

Optional KMS encryption key associated with this agent

***

### lastUpdated?

> `readonly` `optional` **lastUpdated**: `string`

When this agent was last updated.

***

### roleArn

> `readonly` **roleArn**: `string`

The ARN of the IAM role associated to the agent.

#### Attribute
