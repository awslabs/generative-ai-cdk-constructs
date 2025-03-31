[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [kendra](../README.md) / IKendraGenAiIndex

# Interface: IKendraGenAiIndex

Represents a Kendra Index, either created with CDK or imported.

## Extends

- `IResource`

## Properties

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

### indexArn

> `readonly` **indexArn**: `string`

The Amazon Resource Name (ARN) of the index.

#### Example

```ts
'arn:aws:kendra:us-east-1:123456789012:index/af04c7ea-22bc-46b7-a65e-6c21e604fc11'
```

***

### indexId

> `readonly` **indexId**: `string`

The identifier of the index.

#### Example

```ts
'af04c7ea-22bc-46b7-a65e-6c21e604fc11'.
```

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
