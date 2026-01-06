[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [s3vectors](../README.md) / IVectorBucket

# Interface: IVectorBucket

Interface for S3 vector bucket resources

## Extends

- `IResource`

## Properties

### creationTime?

> `readonly` `optional` **creationTime**: `string`

The timestamp when the vector bucket was created, in ISO 8601 format.

#### Attribute

***

### encryptionKey?

> `readonly` `optional` **encryptionKey**: `IKey`

Optional KMS encryption key associated with this vector bucket.

***

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

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`IResource.node`

***

### policy?

> `optional` **policy**: [`VectorBucketPolicy`](../classes/VectorBucketPolicy.md)

The resource policy associated with this bucket.

If `autoCreatePolicy` is true, a `BucketPolicy` will be created upon the
first call to addToResourcePolicy(s).

***

### stack

> `readonly` **stack**: `Stack`

The stack in which this resource is defined.

#### Inherited from

`IResource.stack`

***

### vectorBucketArn

> `readonly` **vectorBucketArn**: `string`

The ARN of the vector bucket

#### Attribute

***

### vectorBucketName

> `readonly` **vectorBucketName**: `string`

The name of the vector bucket

#### Attribute

## Methods

### addToResourcePolicy()

> **addToResourcePolicy**(`permission`): `AddToResourcePolicyResult`

Adds a statement to the resource policy for a principal (i.e.
account/role/service) to perform actions on this bucket and/or its
contents. Use `bucketArn` to obtain ARNs for
this bucket.

Note that the policy statement may or may not be added to the policy.
For example, when an `IBucket` is created from an existing bucket,
it's not possible to tell whether the bucket already has a policy
attached, let alone to re-use that policy to add more statements to it.
So it's safest to do nothing in these cases.

#### Parameters

##### permission

`PolicyStatement`

the policy statement to be added to the bucket's
policy.

#### Returns

`AddToResourcePolicyResult`

metadata about the execution of this method. If the policy
was not added, the value of `statementAdded` will be `false`. You
should always check this value to make sure that the operation was
actually carried out. Otherwise, synthesis and deploy will terminate
silently, which may be confusing.

***

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

### grantDelete()

> **grantDelete**(`grantee`, `indexIds?`): `Grant`

Grants IAM actions to the IAM Principal to delete the vector bucket and indexes

#### Parameters

##### grantee

`IGrantable`

The IAM principal to grant permissions to

##### indexIds?

`any`

Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.

#### Returns

`Grant`

An IAM Grant object representing the granted permissions

***

### grantRead()

> **grantRead**(`grantee`, `indexIds?`): `Grant`

Grants IAM actions to the IAM Principal

#### Parameters

##### grantee

`IGrantable`

The IAM principal to grant permissions to

##### indexIds?

`any`

Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.

#### Returns

`Grant`

An IAM Grant object representing the granted permissions

***

### grantWrite()

> **grantWrite**(`grantee`, `indexIds?`): `Grant`

Grants IAM actions to the IAM Principal

#### Parameters

##### grantee

`IGrantable`

The IAM principal to grant permissions to

##### indexIds?

`any`

Restrict the permission to a certain set of indexes (default '*'). Parameter type is `any` but `string[]` should be passed in.

#### Returns

`Grant`

An IAM Grant object representing the granted permissions
