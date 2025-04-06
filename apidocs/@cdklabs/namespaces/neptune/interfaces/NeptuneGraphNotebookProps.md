[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [neptune](../README.md) / NeptuneGraphNotebookProps

# Interface: NeptuneGraphNotebookProps

Properties for creating a new Neptune Graph Notebook

## Properties

### graph

> `readonly` **graph**: [`INeptuneGraph`](INeptuneGraph.md)

The Neptune Analytics Graph this notebook will be connected to

***

### instanceType?

> `readonly` `optional` **instanceType**: `InstanceType`

The instance type of the notebook instance

#### Default

```ts
"ec2.InstanceType.of(ec2.InstanceClass.T3, ec2.InstanceSize.MEDIUM)"
```

***

### volumeSize?

> `readonly` `optional` **volumeSize**: `Size`

The size of the EBS volume

#### Default

```ts
- 5 GiB
```
