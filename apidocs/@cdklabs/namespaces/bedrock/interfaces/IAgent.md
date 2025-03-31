[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / IAgent

# Interface: IAgent

Represents an Agent, either created with CDK or imported.

## Extends

- `IResource`

## Properties

### agentArn

> `readonly` **agentArn**: `string`

The ARN of the agent.

#### Example

```ts
"arn:aws:bedrock:us-east-1:123456789012:agent/OKDSJOGKMO"
```

#### Attribute

***

### agentId

> `readonly` **agentId**: `string`

The ID of the Agent.

#### Example

```ts
"OKDSJOGKMO"
```

#### Attribute

***

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.
For resources that are created and managed by the CDK
(generally, those created by creating new class instances like Role, Bucket, etc.),
this is always the same as the environment of the stack they belong to;
however, for imported resources
(those obtained from static methods like fromRoleArn, fromBucketName, etc.),
that might be different than the stack they were imported into.

#### Inherited from

`IResource.env`

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

Optional KMS encryption key associated with this agent

***

### lastUpdated?

> `readonly` `optional` **lastUpdated**: `string`

When this agent was last updated.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

***

### role

> `readonly` **role**: `IRole`

The IAM role associated to the agent.

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

`IResource.stack`

## Methods

### applyRemovalPolicy()

> **applyRemovalPolicy**(`policy`): `void`

Apply the given removal policy to this resource

The Removal Policy controls what happens to this resource when it stops
being managed by CloudFormation, either because you've removed it from the
CDK application or because you've made a change that requires the resource
to be replaced.

The resource can be deleted (`RemovalPolicy.DESTROY`), or left in your AWS
account for data recovery and cleanup later (`RemovalPolicy.RETAIN`).

#### Parameters

##### policy

`RemovalPolicy`

#### Returns

`void`

#### Inherited from

`IResource.applyRemovalPolicy`
