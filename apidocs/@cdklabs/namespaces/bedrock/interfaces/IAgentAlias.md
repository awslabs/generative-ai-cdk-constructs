[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / IAgentAlias

# Interface: IAgentAlias

Represents an Agent Alias, either created with CDK or imported.

## Extends

- `IResource`

## Properties

### agent

> `readonly` **agent**: [`IAgent`](IAgent.md)

The underlying agent for this alias.

***

### aliasArn

> `readonly` **aliasArn**: `string`

The ARN of the agent alias.

#### Example

```ts
`arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN`
```

***

### aliasId

> `readonly` **aliasId**: `string`

The unique identifier of the agent alias.

#### Example

```ts
`TCLCITFZTN`
```

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

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

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

***

### grant()

> **grant**(`grantee`, ...`actions`): `Grant`

Grant the given principal identity permissions to perform actions on this agent alias.

#### Parameters

##### grantee

`IGrantable`

##### actions

...`string`[]

#### Returns

`Grant`

***

### grantGet()

> **grantGet**(`grantee`): `Grant`

Grant the given identity permissions to get the agent alias.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### grantInvoke()

> **grantInvoke**(`grantee`): `Grant`

Grant the given identity permissions to invoke the agent alias.

#### Parameters

##### grantee

`IGrantable`

#### Returns

`Grant`

***

### onCloudTrailEvent()

> **onCloudTrailEvent**(`id`, `options`?): `Rule`

Define an EventBridge rule that triggers when something happens to this agent alias

Requires that there exists at least one CloudTrail Trail in your account
that captures the event. This method will not create the Trail.

#### Parameters

##### id

`string`

The id of the rule

##### options?

`OnEventOptions`

Options for adding the rule

#### Returns

`Rule`
