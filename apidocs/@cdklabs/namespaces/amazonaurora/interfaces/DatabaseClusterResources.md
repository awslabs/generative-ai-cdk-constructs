[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [amazonaurora](../README.md) / DatabaseClusterResources

# Interface: DatabaseClusterResources

Interface representing the resources required for a database cluster.

## Properties

### auroraCluster?

> `readonly` `optional` **auroraCluster**: `DatabaseCluster`

The Amazon Aurora RDS cluster.

***

### auroraSecurityGroup

> `readonly` **auroraSecurityGroup**: `ISecurityGroup`

The security group associated with the Aurora cluster.

***

### clusterIdentifier

> `readonly` **clusterIdentifier**: `string`

The unique cluster identifier of the Aurora RDS cluster.

***

### resourceArn

> `readonly` **resourceArn**: `string`

The ARN of your existing Amazon Aurora DB cluster.

***

### secret

> `readonly` **secret**: `ISecret`

The secret containing the database credentials.
The secret must contain `username` and `password` values.

***

### vpc

> `readonly` **vpc**: `IVpc`

The VPC in which the database cluster is located.
