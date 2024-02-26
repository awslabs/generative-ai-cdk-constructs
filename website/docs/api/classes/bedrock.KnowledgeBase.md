[@cdklabs/generative-ai-cdk-constructs](/docs/api) / [bedrock](/docs/api/modules/bedrock.md) / KnowledgeBase

# Class: KnowledgeBase

[bedrock](/docs/api/modules/bedrock.md).KnowledgeBase

Deploys a Bedrock Knowledge Base and configures a backend vector store.

At the moment, only OpenSearch Serverless is supported as a vector store.
This construct creates the collection and index.

## Hierarchy

- `Construct`

  ↳ **`KnowledgeBase`**

## Implements

- `ITaggableV2`

## Constructors

### constructor

• **new KnowledgeBase**(`scope`, `id`, `props`): [`KnowledgeBase`](bedrock.KnowledgeBase.md)

#### Parameters

| Name | Type                                                                       |
| :------ |:---------------------------------------------------------------------------|
| `scope` | `Construct`                                                                |
| `id` | `string`                                                                   |
| `props` | [`KnowledgeBaseProps`](/docs/api/interfaces/bedrock.KnowledgeBaseProps.md) |

#### Returns

[`KnowledgeBase`](bedrock.KnowledgeBase.md)

#### Overrides

Construct.constructor

## Properties

### cdkTagManager

• `Readonly` **cdkTagManager**: `TagManager`

TagManager facilitates a common implementation of tagging for Constructs

#### Implementation of

cdk.ITaggableV2.cdkTagManager

___

### instruction

• `Optional` `Readonly` **instruction**: `string`

A narrative instruction of the knowledge base.

___

### knowledgeBaseArn

• `Readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

___

### knowledgeBaseId

• `Readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

___

### name

• `Readonly` **name**: `string`

The name of the knowledge base.

___

### node

• `Readonly` **node**: `Node`

The tree node.

#### Inherited from

Construct.node

___

### role

• `Readonly` **role**: `Role`

The role the Knowledge Base uses to access the vector store and data source.

___

### vectorIndex

• `Private` `Optional` **vectorIndex**: [`VectorIndex`](opensearch_vectorindex.VectorIndex.md)

The OpenSearch vector index for the knowledge base.

___

### vectorStore

• `Readonly` **vectorStore**: [`VectorCollection`](opensearchserverless.VectorCollection.md)

The vector store for the knowledge base.

## Methods

### toString

▸ **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

Construct.toString

___

### isConstruct

▸ **isConstruct**(`x`): x is Construct

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `x` | `any` | Any object |

#### Returns

x is Construct

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

Construct.isConstruct
