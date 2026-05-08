[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [kendra](../README.md) / IKendraGenAiIndex

# Interface: IKendraGenAiIndex

Represents a Kendra Index, either created with CDK or imported.

## Extends

- `IResource`

## Properties

### env

> `readonly` **env**: `ResourceEnvironment`

The environment this resource belongs to.

For resources that are created and managed in a Stack (those created by
creating new class instances like `new Role()`, `new Bucket()`, etc.), this
is always the same as the environment of the stack they belong to.

For referenced resources (those obtained from referencing methods like
`Role.fromRoleArn()`, `Bucket.fromBucketName()`, etc.), they might be
different than the stack they were imported into.

#### Inherited from

`IResource.env`

***

### indexArn

> `readonly` **indexArn**: `string`

The Amazon Resource Name (ARN) of the index.

***

### indexId

> `readonly` **indexId**: `string`

The identifier of the index.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

***

### role

> `readonly` **role**: `IRole`

An IAM role that gives Amazon Kendra permissions to access
your Amazon CloudWatch logs and metrics. This is also the
role used when you use the BatchPutDocument operation to index
documents from an Amazon S3 bucket.

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

### with()

> **with**(...`mixins`): `IConstruct`

Applies one or more mixins to this construct.

Mixins are applied in order. The list of constructs is captured at the
start of the call, so constructs added by a mixin will not be visited.

#### Parameters

##### mixins

...`IMixin`[]

The mixins to apply

#### Returns

`IConstruct`

This construct for chaining

#### Inherited from

`IResource.with`
