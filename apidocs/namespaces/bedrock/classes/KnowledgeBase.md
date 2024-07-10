[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / KnowledgeBase

# Class: KnowledgeBase

Deploys a Bedrock Knowledge Base and configures a backend by OpenSearch Serverless,
Pinecone, Redis Enterprise Cloud or Amazon Aurora PostgreSQL.

## Extends

- `Construct`

## Constructors

### new KnowledgeBase()

> **new KnowledgeBase**(`scope`, `id`, `props`): [`KnowledgeBase`](KnowledgeBase.md)

#### Parameters

• **scope**: `Construct`

• **id**: `string`

• **props**: [`KnowledgeBaseProps`](../interfaces/KnowledgeBaseProps.md)

#### Returns

[`KnowledgeBase`](KnowledgeBase.md)

#### Overrides

`Construct.constructor`

## Properties

### description

> `readonly` **description**: `string`

The description knowledge base.

***

### instruction?

> `readonly` `optional` **instruction**: `string`

A narrative instruction of the knowledge base.

***

### knowledgeBaseArn

> `readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

***

### knowledgeBaseId

> `readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

***

### knowledgeBaseInstance

> `readonly` **knowledgeBaseInstance**: `CfnKnowledgeBase`

Instance of knowledge base.

***

### knowledgeBaseState

> `readonly` **knowledgeBaseState**: `string`

Specifies whether to use the knowledge base or not when sending an InvokeAgent request.

***

### name

> `readonly` **name**: `string`

The name of the knowledge base.

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`Construct.node`

***

### role

> `readonly` **role**: `Role`

The role the Knowledge Base uses to access the vector store and data source.

***

### vectorStore

> `readonly` **vectorStore**: [`AmazonAuroraDefaultVectorStore`](../../amazonaurora/classes/AmazonAuroraDefaultVectorStore.md) \| [`AmazonAuroraVectorStore`](../../amazonaurora/classes/AmazonAuroraVectorStore.md) \| [`VectorCollection`](../../opensearchserverless/classes/VectorCollection.md) \| [`PineconeVectorStore`](../../pinecone/classes/PineconeVectorStore.md)

The vector store for the knowledge base.

## Methods

### associateToAgent()

> **associateToAgent**(`agent`): `void`

Associate knowledge base with an agent

#### Parameters

• **agent**: [`Agent`](Agent.md)

#### Returns

`void`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`Construct.toString`

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

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

• **x**: `any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`Construct.isConstruct`
