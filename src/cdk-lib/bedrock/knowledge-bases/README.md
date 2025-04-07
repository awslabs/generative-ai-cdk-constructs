

# Amazon Bedrock Knowledge Bases

Amazon Bedrock Knowledge Bases enable you to provide foundation models and agents with contextual information from your company's private data sources. This enhances the relevance, accuracy, and customization of their responses.

## Vector Knowledge Base

### Create a vector Knowledge Base

A vector index on a vector store is required to create a vector Knowledge Base. This construct currently supports [Amazon OpenSearch Serverless](../../opensearchserverless), [Amazon RDS Aurora PostgreSQL](../../amazonaurora/), [Pinecone](../../pinecone/) . By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control. For other resources you need to have the vector stores already created and credentials stored in AWS Secrets Manager. For Aurora, the construct provides an option to create a default `AmazonAuroraDefaultVectorStore` construct that will provision the vector store backed by Amazon Aurora for you. To learn more you can read [here](../../amazonaurora/README.md).

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

### Vector Knowledge Base Properties

| Name | Type | Required | Description |
|---|---|---|---|
| embeddingsModel | BedrockFoundationModel | Yes | The embeddings model for the knowledge base |
| name | string | No | The name of the knowledge base |
| vectorType | VectorType | No | The vector type to store vector embeddings |
| description | string | No | The description of the knowledge base |
| instruction | string | No | Instructions for agents based on the design and type of information of the Knowledge Base that will impact how Agents interact with the Knowledge Base |
| existingRole | iam.IRole | No | Existing IAM role with a policy statement granting permission to invoke the specific embeddings model |
| indexName | string | No | The name of the vector index (only applicable if vectorStore is of type VectorCollection) |
| vectorField | string | No | The name of the field in the vector index (only applicable if vectorStore is of type VectorCollection) |
| vectorStore | VectorCollection \| PineconeVectorStore \| AmazonAuroraVectorStore \| ExistingAmazonAuroraVectorStore | No | The vector store for the knowledge base |
| vectorIndex | VectorIndex | No | The vector index for the OpenSearch Serverless backed knowledge base |
| knowledgeBaseState | string | No | Specifies whether to use the knowledge base or not when sending an InvokeAgent request |
| tags | Record<string, string> | No | Tag (KEY-VALUE) bedrock agent resource |

### Examples

#### OpenSearch Serverless

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction: 'Use this knowledge base to answer questions about books. ' + 'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.fixedSize({
    maxTokens: 500,
    overlapPercentage: 20,
  }),
});
```

#### Amazon RDS Aurora PostgreSQL

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { amazonaurora, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

// Dimension of your vector embedding
embeddingsModelVectorDimension = 1024;
const auroraDb = new amazonaurora.AmazonAuroraVectorStore(stack, 'AuroraDefaultVectorStore', {
  embeddingsModelVectorDimension: embeddingsModelVectorDimension,
});

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: auroraDb,
  embeddingsModel: foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction: 'Use this knowledge base to answer questions about books. ' + 'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
});
```

## Kendra Knowledge Base

### Create a Kendra Knowledge Base

With Amazon Bedrock Knowledge Bases, you can build a knowledge base from an Amazon Kendra GenAI index to create more sophisticated and accurate Retrieval Augmented Generation (RAG)-powered digital assistants. By combining an Amazon Kendra GenAI index with Amazon Bedrock Knowledge Bases, you can:

- Reuse your indexed content across multiple Amazon Bedrock applications without rebuilding indexes or re-ingesting data.
- Leverage the advanced GenAI capabilities of Amazon Bedrock while benefiting from the high-accuracy information retrieval of Amazon Kendra.
- Customize your digital assistant's behavior using the tools of Amazon Bedrock while maintaining the semantic accuracy of an Amazon Kendra GenAI index.

### Kendra Knowledge Base properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| kendraIndex | IKendraGenAiIndex | Yes | The Kendra Index to use for the knowledge base. |
| name | string | No | The name of the knowledge base. If not provided, a name will be auto-generated. |
| description | string | No | Description of the knowledge base. |
| instruction | string | No | Instructions for the knowledge base. |
| existingRole | iam.IRole | No | An existing IAM role to use for the knowledge base. If not provided, a new role will be created. |

### Example

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock, kendra } from '@cdklabs/generative-ai-cdk-constructs';

const cmk = new kms.Key(stack, 'cmk', {});

// you can create a new index using the api below 
const index = new kendra.KendraGenAiIndex(this, 'index', {
  name: 'kendra-index-cdk',
  kmsKey: cmk,
  documentCapacityUnits: 1, // 40K documents
  queryCapacityUnits: 1,    // 0.2 QPS
});

// or import an existing one
const index = kendra.KendraGenAiIndex.fromAttrs(this, 'myindex', {
  indexId: 'myindex',
  role: myRole
});

new bedrock.KendraKnowledgeBase(this, 'kb', {
  name: 'kendra-kb-cdk',
  kendraIndex: index,
});
```

## Graph Knowledge Base

The Graph Knowledge Base is a specialized type of knowledge base that combines graph modeling with generative AI to enhance retrieval-augmented generation (RAG). It automatically identifies and leverages relationships between entities and structural elements within documents, enabling more comprehensive and contextually relevant responses from foundation models.

### Example

```ts
import * as bedrock from '@cdklabs/generative-ai-cdk-constructs';

const dataBucket = new cdk.aws_s3.Bucket(stack, "SampleBucket", {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

const embeddingModel = bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3;

const graph = new bedrock.NeptuneGraph(stack, "NeptuneGraph", {
  vectorSearchDimension: embeddingModel.vectorDimensions!,
  // Graph customization goes here
});

const notebook = graph.createNotebook();

const kb = new GraphKnowledgeBase(stack, "GraphKnowledgeBase", {
  embeddingModel,
  graph,
});

kb.addS3DataSource({
  bucket: dataBucket,
  // Context enrichment configuration for GraphRAG
  // - This is the default and only valid combination of model and method
  // - Future versions may support additional models and enrichment methods
  // contextEnrichment: ContextEnrichment.foundationModel({
  //   enrichmentModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
  // }),
});

new cdk.CfnOutput(stack, "GraphExplorerUrl", {
  value: notebook.graphExplorerEndpoint,
});
``` 