# Amazon Bedrock Knowledge Bases

Amazon Bedrock Knowledge Bases enable you to provide foundation models and agents with contextual information from your company's private data sources. This enhances the relevance, accuracy, and customization of their responses.

## Table of contents

- [Vector Knowledge Base](#vector-knowledge-base)
  - [Create a vector Knowledge Base](#create-a-vector-knowledge-base)
  - [Vector Knowledge Base Properties](#vector-knowledge-base-properties)
  - [Vector Knowledge Base - Vector Type](#vector-knowledge-base---vector-type)
  - [Vector Knowledge Base - Data Sources](#vector-knowledge-base---data-sources)
  - [Vector Knowledge Base - Chunking Strategies](#vector-knowledge-base---chunking-strategies)
  - [Vector Knowledge Base - Parsing Strategy](#vector-knowledge-base---parsing-strategy)
- [Kendra Knowledge Base](#kendra-knowledge-base)
  - [Create a Kendra Knowledge Base](#create-a-kendra-knowledge-base)
  - [Kendra Knowledge Base properties](#kendra-knowledge-base-properties)
- [Graph Knowledge Base](#graph-knowledge-base)
  - [Graph Knowledge Base Properties](#graph-knowledge-base-properties)
  - [Data Sources](#data-sources)
- [Knowledge Base - Custom Transformation](#knowledge-base---custom-transformation)
- [Knowledge Base - Context Enrichment](#knowledge-base---context-enrichment)
- [Knowledge Base Permissions](#knowledge-base-permissions)
- [Permissions and Methods](#permissions-and-methods)
- [Importing Existing Knowledge Bases](#importing-existing-knowledge-bases)

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

##### TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
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

#### Amazon RDS Aurora PostgreSQL Example

##### TypeScript

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
  embeddingsModel: foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
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

### Vector Knowledge Base - Vector Type

The data type for the vectors when using a model to convert text into vector embeddings. Embeddings type may impact the availability of some embeddings models and vector stores. The following vector types are available:

- **Floating point**: More precise vector representation of the text, but more costly in storage.
- **Binary**: Not as precise vector representation of the text, but not as costly in storage as a standard floating-point (float32). Not all embedding models and vector stores support binary embeddings.

See [Supported embeddings models](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html) for information on the available models and their vector data types.

#### Vector Type Configuration

##### TypeScript

```ts
const kb = new bedrock.VectorKnowledgeBase(this, 'MyKnowledgeBase', {
  name: 'MyKnowledgeBase',
  vectorType: bedrock.VectorType.BINARY,
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});
```

### Vector Knowledge Base - Data Sources

Data sources are the various repositories or systems from which information is extracted and ingested into the knowledge base. These sources provide the raw content that will be processed, indexed, and made available for querying within the knowledge base system. Data sources can include various types of systems such as document management systems, databases, file storage systems, and content management platforms. Supported Data Sources include Amazon S3 buckets, Web Crawlers, SharePoint sites, Salesforce instances, and Confluence spaces.

- **Amazon S3**: You can either create a new data source using the `bedrock.S3DataSource(..)` class, or using the `kb.addS3DataSource(..)`.
- **Web Crawler**: You can either create a new data source using the `bedrock.WebCrawlerDataSource(..)` class, or using the `kb.addWebCrawlerDataSource(..)`.
- **Confluence**: You can either create a new data source using the `bedrock.ConfluenceDataSource(..)` class, or using the `kb.addConfluenceDataSource(..)`.
- **SharePoint**: You can either create a new data source using the `bedrock.SharePointDataSource(..)` class, or using the `kb.addSharePointDataSource(..)`.
- **Salesforce**: You can either create a new data source using the `bedrock.SalesforceDataSource(..)` class, or using the `kb.addSalesforceDataSource(..)`.
- **Custom**: You can either create a new data source using the `bedrock.CustomDataSource(..)` class, or using the `kb.addCustomDataSource(..)`. This allows you to add your own custom data source to the knowledge base.

More details about the different data sources can be found in the dedicated [Readme](../data-sources/README.md).

### Vector Knowledge Base - Chunking Strategies

- **Default Chunking**: Applies Fixed Chunking with the default chunk size of 300 tokens and 20% overlap.

  #### Default Chunking Configuration

  ##### TypeScript

  ```ts
  ChunkingStrategy.DEFAULT;
  ```

- **Fixed Size Chunking**: This method divides the data into fixed-size chunks, with each chunk containing a predetermined number of tokens. This strategy is useful when the data is uniform in size and structure.

  #### Fixed Size Chunking Configuration

  ##### TypeScript

  ```ts
  // Fixed Size Chunking with sane defaults.
  ChunkingStrategy.FIXED_SIZE;

  // Fixed Size Chunking with custom values.
  ChunkingStrategy.fixedSize({ maxTokens: 200, overlapPercentage: 25 });
  ```

- **Hierarchical Chunking**: This strategy organizes data into layers of chunks, with the first layer containing large chunks and the second layer containing smaller chunks derived from the first. It is ideal for data with inherent hierarchies or nested structures.

  #### Hierarchical Chunking Configuration

  ##### TypeScript

  ```ts
  // Hierarchical Chunking with the default for Cohere Models.
  ChunkingStrategy.HIERARCHICAL_COHERE;

  // Hierarchical Chunking with the default for Titan Models.
  ChunkingStrategy.HIERARCHICAL_TITAN;

  // Hierarchical Chunking with custom values. The maximum chunk size depends on the model.
  // Amazon Titan Text Embeddings: 8192. Cohere Embed models: 512
  ChunkingStrategy.hierarchical({
    overlapTokens: 60,
    maxParentTokenSize: 1500,
    maxChildTokenSize: 300,
  });
  ```

- **Semantic Chunking**: This method splits data into smaller documents based on groups of similar content derived from the text using natural language processing. It helps preserve contextual relationships and ensures accurate and contextually appropriate results.

  #### Semantic Chunking Configuration

  ##### TypeScript

  ```ts
  // Semantic Chunking with sane defaults.
  ChunkingStrategy.SEMANTIC;

  // Semantic Chunking with custom values.
  ChunkingStrategy.semantic({ bufferSize: 0, breakpointPercentileThreshold: 95, maxTokens: 300 });
  ```

- **No Chunking**: This strategy treats each file as one chunk. If you choose this option, you may want to pre-process your documents by splitting them into separate files.

  #### No Chunking Configuration

  ##### TypeScript

  ```ts
  ChunkingStrategy.NONE;
  ```

### Vector Knowledge Base - Parsing Strategy

A parsing strategy in Amazon Bedrock is a configuration that determines how the service processes and interprets the contents of a document. It involves converting the document's contents into text and splitting it into smaller chunks for analysis. Amazon Bedrock offers two parsing strategies:

- **Default Parsing Strategy**: This strategy converts the document's contents into text and splits it into chunks using a predefined approach. It is suitable for most use cases but may not be optimal for specific document types or requirements.

- **Foundation Model Parsing Strategy**: This strategy uses a foundation model to describe the contents of the document. It is particularly useful for improved processing of PDF files with tables and images. To use this strategy, set the `parsingStrategy` in a data source as below.

  #### Foundation Model Parsing Configuration

  ##### TypeScript

  ```ts
  bedrock.ParsingStategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  });
  ```

### Knowledge Base - Custom Transformation

Custom Transformation in Amazon Bedrock is a feature that allows you to create and apply custom processing steps to documents moving through a data source ingestion pipeline.

Custom Transformation uses AWS Lambda functions to process documents, enabling you to perform custom operations such as data extraction, normalization, or enrichment. To create a custom transformation, set the `customTransformation` in a data source as below.

#### Custom Transformation Configuration

##### TypeScript

```ts
CustomTransformation.lambda({
  lambdaFunction: lambdaFunction,
  s3BucketUri: `s3://${bucket.bucketName}/chunk-processor/`,
});
```

### Knowledge Base - Context Enrichment

Context Enrichment in Amazon Bedrock is a feature that allows you to enhance the context of your documents during the ingestion process. This is particularly useful for applications like Neptune GraphRAG, where you need to extract entities from chunks to build a knowledge graph.

Currently, context enrichment is only supported when using Neptune Analytics as a storage configuration.

The enrichment process uses Amazon Bedrock foundation models to perform operations like chunk entity extraction. To configure context enrichment, set the `contextEnrichment` in a data source as below.

#### Context Enrichment Configuration

##### TypeScript

```ts
bedrock.ContextEnrichment.foundationModel({
  enrichmentModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
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

#### Kendra Knowledge Base Creation

##### TypeScript

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

### Graph Knowledge Base Properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| embeddingModel | BedrockFoundationModel | Yes | The embeddings model for the knowledge base |
| graph | INeptuneGraph | No | The Neptune Analytics vector store. If not provided, a new one will be created |
| fieldMapping | VectorFieldMapping | No | The vector field mapping configuration |
| name | string | No | The name of the knowledge base |
| description | string | No | The description of the knowledge base |
| instruction | string | No | Instructions for agents based on the design and type of information of the Knowledge Base |
| existingRole | iam.IRole | No | Existing IAM role with a policy statement granting permission to invoke the specific embeddings model |

### Example

#### TypeScript

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

### Data Sources

The Graph Knowledge Base currently supports the following data sources:

- Amazon S3 (with context enrichment for graph building)

For more information about GraphRAG capabilities, see the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html).

## Knowledge Base Permissions

Knowledge Bases provide methods to grant permissions to other resources:

- `grant(grantee, ...actions)`: Grants the given principal identity permissions to perform actions on this knowledge base.
- `grantQuery(grantee)`: Grants the given identity permissions to query the knowledge base.
- `grantRetrieve(grantee)`: Grants the given identity permissions to retrieve content from the knowledge base.
- `grantRetrieveAndGenerate(grantee)`: Grants the given identity permissions to retrieve content from the knowledge base and generate responses.

## Permissions and Methods

Knowledge Bases provide several methods to grant permissions and perform operations:

### Grant Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `grant(grantee, ...actions)` | Grants the given principal identity permissions to perform actions on this knowledge base | `grantee`: The principal to grant permissions to<br>`actions`: The actions to grant (e.g., `bedrock:GetKnowledgeBase`, `bedrock:ListKnowledgeBases`) |
| `grantQuery(grantee)` | Grants the given identity permissions to query the knowledge base | `grantee`: The principal to grant permissions to |
| `grantRetrieve(grantee)` | Grants the given identity permissions to retrieve content from the knowledge base | `grantee`: The principal to grant permissions to |
| `grantRetrieveAndGenerate(grantee)` | Grants the given identity permissions to retrieve content from the knowledge base and generate responses | `grantee`: The principal to grant permissions to |
| `grantCreateDataSource(grantee)` | Grants the given identity permissions to create data sources for this knowledge base | `grantee`: The principal to grant permissions to |
| `grantDeleteDataSource(grantee)` | Grants the given identity permissions to delete data sources from this knowledge base | `grantee`: The principal to grant permissions to |
| `grantUpdateDataSource(grantee)` | Grants the given identity permissions to update data sources in this knowledge base | `grantee`: The principal to grant permissions to |
| `grantGetDataSource(grantee)` | Grants the given identity permissions to get data source information | `grantee`: The principal to grant permissions to |
| `grantListDataSources(grantee)` | Grants the given identity permissions to list data sources | `grantee`: The principal to grant permissions to |

### Knowledge Base Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `addDataSource(dataSource)` | Adds a data source to the knowledge base | `dataSource`: The data source to add |
| `fromKnowledgeBaseAttributes(scope, id, attrs)` | Imports an existing knowledge base | `scope`: The CDK scope<br>`id`: The CDK ID<br>`attrs`: The knowledge base attributes |
| `fromKnowledgeBaseId(scope, id, knowledgeBaseId)` | Imports an existing knowledge base by ID | `scope`: The CDK scope<br>`id`: The CDK ID<br>`knowledgeBaseId`: The knowledge base ID |

### Data Source Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `S3DataSource` | Creates an S3 data source | `bucket`: The S3 bucket<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source<br>`chunkingStrategy`: The chunking strategy<br>`parsingStrategy`: The parsing strategy |
| `WebCrawlerDataSource` | Creates a web crawler data source | `urls`: The URLs to crawl<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source<br>`crawlDepth`: The crawl depth<br>`crawlSchedule`: The crawl schedule |
| `ConfluenceDataSource` | Creates a Confluence data source | `siteUrl`: The Confluence site URL<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source<br>`spaceKeys`: The space keys to index |
| `SharePointDataSource` | Creates a SharePoint data source | `siteUrl`: The SharePoint site URL<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source<br>`documentLibraryNames`: The document library names to index |
| `SalesforceDataSource` | Creates a Salesforce data source | `instanceUrl`: The Salesforce instance URL<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source<br>`objectNames`: The object names to index |
| `CustomDataSource` | Creates a custom data source | `dataSourceConfiguration`: The data source configuration<br>`knowledgeBase`: The knowledge base<br>`dataSourceName`: The name of the data source |

## Importing Existing Knowledge Bases

You can import existing knowledge bases using the `fromKnowledgeBaseAttributes` or `fromKnowledgeBaseId` methods. This allows you to reference existing knowledge bases in your CDK application without creating new ones.

### Import Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `fromKnowledgeBaseAttributes(scope, id, attrs)` | Imports an existing knowledge base using its attributes | `scope`: The CDK scope<br>`id`: The CDK ID<br>`attrs`: The knowledge base attributes | `IKnowledgeBase` |
| `fromKnowledgeBaseId(scope, id, knowledgeBaseId)` | Imports an existing knowledge base using its ID | `scope`: The CDK scope<br>`id`: The CDK ID<br>`knowledgeBaseId`: The knowledge base ID | `IKnowledgeBase` |

### Import Examples

#### Import a Vector Knowledge Base

##### TypeScript

```ts
// Import a Vector Knowledge Base
const importedKb = bedrock.VectorKnowledgeBase.fromKnowledgeBaseAttributes(this, 'ImportedKb', {
  knowledgeBaseId: 'kb-12345678',
  executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
  vectorStoreType: bedrock.VectorStoreType.OPENSEARCH_SERVERLESS,
});
```

#### Import a Kendra Knowledge Base

##### TypeScript

```ts
// Import a Kendra Knowledge Base
const importedKendraKb = bedrock.KendraKnowledgeBase.fromKnowledgeBaseAttributes(this, 'ImportedKendraKb', {
  knowledgeBaseId: 'kb-12345678',
  executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
  kendraIndex: existingKendraIndex,
});
```

#### Import a Graph Knowledge Base

##### TypeScript

```ts
// Import a Graph Knowledge Base
const importedGraphKb = bedrock.GraphKnowledgeBase.fromKnowledgeBaseAttributes(this, 'ImportedGraphKb', {
  knowledgeBaseId: 'kb-12345678',
  executionRoleArn: 'arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
  graphId: 'graph-12345678',
  fieldMapping: {
    metadataField: 'AMAZON_BEDROCK_METADATA',
    textField: 'AMAZON_BEDROCK_TEXT',
  },
});
```

#### Import by ID

```ts
// Import a Knowledge Base by ID
const importedKb = bedrock.KnowledgeBase.fromKnowledgeBaseId(this, 'ImportedKb', 'kb-12345678');
```

### Using Imported Knowledge Bases

Once imported, you can use the knowledge base in your CDK application just like any other knowledge base:

#### TypeScript

```ts
// Grant permissions to a Lambda function to query the knowledge base
importedKb.grantQuery(lambdaFunction);

// Grant permissions to a Lambda function to retrieve content from the knowledge base
importedKb.grantRetrieve(lambdaFunction);

// Add a data source to the imported knowledge base
importedKb.addS3DataSource({
  bucket: docBucket,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.fixedSize({
    maxTokens: 500,
    overlapPercentage: 20,
  }),
});
```
