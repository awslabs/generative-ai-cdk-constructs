[@cdklabs/generative-ai-cdk-constructs](../README.md) / [bedrock](../modules/bedrock.md) / KnowledgeBase

# Class: KnowledgeBase

[bedrock](../modules/bedrock.md).KnowledgeBase

Deploys a Bedrock Knowledge Base and configures a backend by OpenSearch Serverless,
Pinecone, Redis Enterprise Cloud or Amazon Aurora PostgreSQL.

## Hierarchy

- `Construct`

  ↳ **`KnowledgeBase`**

## Table of contents

### Constructors

- [constructor](bedrock.KnowledgeBase.md#constructor)

### Properties

- [description](bedrock.KnowledgeBase.md#description)
- [instruction](bedrock.KnowledgeBase.md#instruction)
- [knowledgeBase](bedrock.KnowledgeBase.md#knowledgebase)
- [knowledgeBaseArn](bedrock.KnowledgeBase.md#knowledgebasearn)
- [knowledgeBaseId](bedrock.KnowledgeBase.md#knowledgebaseid)
- [knowledgeBaseState](bedrock.KnowledgeBase.md#knowledgebasestate)
- [name](bedrock.KnowledgeBase.md#name)
- [node](bedrock.KnowledgeBase.md#node)
- [role](bedrock.KnowledgeBase.md#role)
- [vectorIndex](bedrock.KnowledgeBase.md#vectorindex)
- [vectorStore](bedrock.KnowledgeBase.md#vectorstore)
- [vectorStoreType](bedrock.KnowledgeBase.md#vectorstoretype)

### Methods

- [associateToAgent](bedrock.KnowledgeBase.md#associatetoagent)
- [handleAmazonAuroraDefaultVectorStore](bedrock.KnowledgeBase.md#handleamazonauroradefaultvectorstore)
- [handleAmazonAuroraVectorStore](bedrock.KnowledgeBase.md#handleamazonauroravectorstore)
- [handleOpenSearchCollection](bedrock.KnowledgeBase.md#handleopensearchcollection)
- [handleOpenSearchDefaultVectorCollection](bedrock.KnowledgeBase.md#handleopensearchdefaultvectorcollection)
- [handlePineconeVectorStore](bedrock.KnowledgeBase.md#handlepineconevectorstore)
- [toString](bedrock.KnowledgeBase.md#tostring)
- [isConstruct](bedrock.KnowledgeBase.md#isconstruct)

## Constructors

### constructor

• **new KnowledgeBase**(`scope`, `id`, `props`): [`KnowledgeBase`](bedrock.KnowledgeBase.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `scope` | `Construct` |
| `id` | `string` |
| `props` | [`KnowledgeBaseProps`](../interfaces/bedrock.KnowledgeBaseProps.md) |

#### Returns

[`KnowledgeBase`](bedrock.KnowledgeBase.md)

#### Overrides

Construct.constructor

## Properties

### description

• `Readonly` **description**: `string`

The description knowledge base.

___

### instruction

• `Optional` `Readonly` **instruction**: `string`

A narrative instruction of the knowledge base.

___

### knowledgeBase

• `Readonly` **knowledgeBase**: `CfnKnowledgeBase`

Instance of knowledge base.

___

### knowledgeBaseArn

• `Readonly` **knowledgeBaseArn**: `string`

The ARN of the knowledge base.

___

### knowledgeBaseId

• `Readonly` **knowledgeBaseId**: `string`

The ID of the knowledge base.

___

### knowledgeBaseState

• `Readonly` **knowledgeBaseState**: `string`

Specifies whether to use the knowledge base or not when sending an InvokeAgent request.

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

• `Readonly` **vectorStore**: [`AmazonAuroraDefaultVectorStore`](amazonaurora.AmazonAuroraDefaultVectorStore.md) \| [`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md) \| [`VectorCollection`](opensearchserverless.VectorCollection.md) \| [`PineconeVectorStore`](pinecone.PineconeVectorStore.md)

The vector store for the knowledge base.

___

### vectorStoreType

• `Private` **vectorStoreType**: `VectorStoreType`

The type of the knowledge base.

## Methods

### associateToAgent

▸ **associateToAgent**(`agent`): `void`

Associate knowledge base with an agent

#### Parameters

| Name | Type |
| :------ | :------ |
| `agent` | [`Agent`](bedrock.Agent.md) |

#### Returns

`void`

___

### handleAmazonAuroraDefaultVectorStore

▸ **handleAmazonAuroraDefaultVectorStore**(`props`): `Object`

Handle AmazonAuroraDefaultVectorStore type of VectorStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`KnowledgeBaseProps`](../interfaces/bedrock.KnowledgeBaseProps.md) | The properties of the KnowledgeBase. |

#### Returns

`Object`

The instance of AmazonAuroraDefaultVectorStore, VectorStoreType.
 This is an internal core function and should not be called directly.

| Name | Type |
| :------ | :------ |
| `vectorStore` | [`AmazonAuroraDefaultVectorStore`](amazonaurora.AmazonAuroraDefaultVectorStore.md) |
| `vectorStoreType` | `VectorStoreType` |

___

### handleAmazonAuroraVectorStore

▸ **handleAmazonAuroraVectorStore**(`props`): `Object`

Handle AmazonAuroraVectorStore type of VectorStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`KnowledgeBaseProps`](../interfaces/bedrock.KnowledgeBaseProps.md) | The properties of the KnowledgeBase. |

#### Returns

`Object`

The instance of AmazonAuroraVectorStore, VectorStoreType.
 This is an internal core function and should not be called directly.

| Name | Type |
| :------ | :------ |
| `vectorStore` | [`AmazonAuroraVectorStore`](amazonaurora.AmazonAuroraVectorStore.md) |
| `vectorStoreType` | `VectorStoreType` |

___

### handleOpenSearchCollection

▸ **handleOpenSearchCollection**(`props`): `Object`

Handle VectorCollection type of VectorStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`KnowledgeBaseProps`](../interfaces/bedrock.KnowledgeBaseProps.md) | The properties of the KnowledgeBase. |

#### Returns

`Object`

The instance of VectorCollection, VectorStoreType.
 This is an internal core function and should not be called directly.

| Name | Type |
| :------ | :------ |
| `vectorStore` | [`VectorCollection`](opensearchserverless.VectorCollection.md) |
| `vectorStoreType` | `VectorStoreType` |

___

### handleOpenSearchDefaultVectorCollection

▸ **handleOpenSearchDefaultVectorCollection**(): `Object`

Handle the default VectorStore type.

#### Returns

`Object`

The instance of VectorCollection, VectorStoreType.
 This is an internal core function and should not be called directly.

| Name | Type |
| :------ | :------ |
| `vectorStore` | [`VectorCollection`](opensearchserverless.VectorCollection.md) |
| `vectorStoreType` | `VectorStoreType` |

___

### handlePineconeVectorStore

▸ **handlePineconeVectorStore**(`props`): `Object`

Handle PineconeVectorStore type of VectorStore.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `props` | [`KnowledgeBaseProps`](../interfaces/bedrock.KnowledgeBaseProps.md) | The properties of the KnowledgeBase. |

#### Returns

`Object`

The instance of PineconeVectorStore, VectorStoreType.
 This is an internal core function and should not be called directly.

| Name | Type |
| :------ | :------ |
| `vectorStore` | [`PineconeVectorStore`](pinecone.PineconeVectorStore.md) |
| `vectorStoreType` | `VectorStoreType` |

___

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
