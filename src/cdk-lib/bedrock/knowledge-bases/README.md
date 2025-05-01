# Amazon Bedrock Knowledge Bases

Amazon Bedrock Knowledge Bases enable you to provide foundation models and agents with contextual information from your company's private data sources. This enhances the relevance, accuracy, and customization of their responses.

## Table of contents

- [Vector Knowledge Base](#vector-knowledge-base)
  - [Create a vector Knowledge Base](#create-a-vector-knowledge-base)
  - [Vector Knowledge Base Properties](#vector-knowledge-base-properties)
  - [Vector Type](#vector-type)
  - [Data Sources](#data-sources)
  - [Chunking Strategies](#chunking-strategies)
  - [Parsing Strategy](#parsing-strategy)
- [Kendra Knowledge Base](#kendra-knowledge-base)
  - [Create a Kendra Knowledge Base](#create-a-kendra-knowledge-base)
  - [Kendra Knowledge Base properties](#kendra-knowledge-base-properties)
- [Graph Knowledge Base](#graph-knowledge-base)
  - [Graph Knowledge Base Properties](#graph-knowledge-base-properties)
  - [Data Sources](#data-sources)
- [Custom Transformation](#custom-transformation)
- [Context Enrichment](#context-enrichment)
- [Permissions and Methods](#permissions-and-methods)
- [Importing Existing Knowledge Bases](#importing-existing-knowledge-bases)
- [Supplemental Data Storage](#supplemental-data-storage)

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
| supplementalDataStorageLocations | SupplementalDataStorageLocation[] | No | Storage locations for supplemental data, such as images extracted from multimodal documents |

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

##### Python

```python

from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
            embeddings_model= bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
            instruction=  'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.'
        )

docBucket = s3.Bucket(self, 'DockBucket')

bedrock.S3DataSource(self, 'DataSource',
    bucket= docBucket,
    knowledge_base=kb,
    data_source_name='books',
    chunking_strategy= bedrock.ChunkingStrategy.FIXED_SIZE,
)

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

##### Python

```python

from aws_cdk import (
    aws_s3 as s3,
    aws_rds as rds,
    aws_ec2 as ec2,
    Stack,
    ArnFormat
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    amazonaurora,
)

# Dimension of your vector embedding
embeddings_model_vector_dimension = 1024
aurora_db = amazonaurora.AmazonAuroraVectorStore(self, 'AuroraDefaultVectorStore',
  embeddings_model_vector_dimension=embeddings_model_vector_dimension
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
  vector_store= aurora_db,
  embeddings_model= foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
  instruction=  'Use this knowledge base to answer questions about books. ' +
'It contains the full text of novels.'
)

docBucket = s3.Bucket(self, 'DockBucket')

bedrock.S3DataSource(self, 'DataSource',
  bucket= docBucket,
  knowledge_base=kb,
  data_source_name='books',
  chunking_strategy= bedrock.ChunkingStrategy.FIXED_SIZE,
)
```

#### Pinecone
    
manual, you must have Pinecone vector store created:

##### TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { pinecone, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const pineconeds = new pinecone.PineconeVectorStore({
  connectionString: 'https://your-index-1234567.svc.gcp-starter.pinecone.io',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
  textField: 'question',
  metadataField: 'metadata',
});

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: pineconeds,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
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

##### Python

```python

from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    pinecone,
)

pineconevs = pinecone.PineconeVectorStore(
            connection_string='https://your-index-1234567.svc.gcp-starter.pinecone.io',
            credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
            text_field='question',
            metadata_field='metadata'
        )

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
            vector_store= pineconevs,
            embeddings_model= bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
            instruction=  'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.'
        )

docBucket = s3.Bucket(self, 'DockBucket')

bedrock.S3DataSource(self, 'DataSource',
    bucket= docBucket,
    knowledge_base=kb,
    data_source_name='books',
    chunking_strategy= bedrock.ChunkingStrategy.FIXED_SIZE,
)
```

#### OpenSearch Managed Cluster

Manual, you must have an OpenSearch managed cluster created. Please refer to the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-osm-permissions-prereq.html) for the prerequisites and permissions required for using OpenSearch Managed Clusters with Amazon Bedrock Knowledge Bases.

```
Ensure that your domain's access policy grants the permissions to perform the required OpenSearch API actions by the roles in your account. If your domain has a restrictive access policy, you can either:
- Create your knowledge base using an existing IAM role that the domain can grant access to for performing the necessary operations.
- Update your access policy to grant the minimum required access to perform the necessary API operations.
See [Sample IAM policy and validations](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-osm-permissions-prereq.html#kb-osm-permissions-iam) for more details.

If your domain has fine-grained access control enabled:
- Create an OpenSearch role  within the OpenSearch dashboard.
- Update the role's back-end mapping to the Knowledge Base service role
```

##### TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { opensearchmanagedcluster, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const opensearchVectorStore = new opensearchmanagedcluster.OpenSearchManagedClusterVectorStore({
  domainArn: 'arn:aws:es:region:account:domain/your-domain',
  domainEndpoint: 'https://your-domain.region.es.amazonaws.com',
  vectorIndexName: 'your-vector-index',
  fieldMapping: {
    metadataField: 'metadata',
    textField: 'text',
    vectorField: 'vector'
  }
});

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: opensearchVectorStore,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
  instruction: 'Use this knowledge base to answer questions about product documentation. ' + 
    'It contains technical specifications and user guides.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'product-docs',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
});
```

##### Python

```python
from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    opensearchmanagedcluster,
)

opensearch_vector_store = opensearchmanagedcluster.OpenSearchManagedClusterVectorStore(
    domain_arn='arn:aws:es:region:account:domain/your-domain',
    domain_endpoint='https://your-domain.region.es.amazonaws.com',
    vector_index_name='your-vector-index',
    field_mapping={
        'metadataField': 'metadata',
        'textField': 'text',
        'vectorField': 'vector'
    }
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
    vector_store=opensearch_vector_store,
    embeddings_model=bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
    instruction='Use this knowledge base to answer questions about product documentation. ' +
        'It contains technical specifications and user guides.'
)

doc_bucket = s3.Bucket(self, 'DocBucket')

bedrock.S3DataSource(self, 'DataSource',
    bucket=doc_bucket,
    knowledge_base=kb,
    data_source_name='product-docs',
    chunking_strategy=bedrock.ChunkingStrategy.FIXED_SIZE
)
```

#### MongoDB Atlas

manual, you must have MongoDB Atlas vector store created:

##### TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { mongodbAtlas, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const mongoDbVectorStore = new mongodbAtlas.MongoDBAtlasVectorStore({
  collectionName: 'embeddings',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:mongodb-atlas-credentials',
  databaseName: 'vectordb',
  endpoint: 'https://your-mongodb-atlas-endpoint.mongodb.net',
  endpointServiceName: 'mongodb-atlas',
  fieldMapping: {
    vectorField: 'embedding',
    textField: 'text',
    metadataField: 'metadata'
  },
  vectorIndexName: 'vector_index'
});

const kb = new bedrock.VectorKnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: mongoDbVectorStore,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
  instruction: 'Use this knowledge base to answer questions about product documentation. ' + 
    'It contains technical specifications and user guides.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'product-docs',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
});
```

##### Python

```python
from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    mongodb_atlas,
)

mongo_db_vector_store = mongodb_atlas.MongoDBAtlasVectorStore(
    collection_name='embeddings',
    credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:mongodb-atlas-credentials',
    database_name='vectordb',
    endpoint='https://your-mongodb-atlas-endpoint.mongodb.net',
    endpoint_service_name='mongodb-atlas',
    field_mapping=mongodb_atlas.MongoDbAtlasFieldMapping(
        vector_field='embedding',
        text_field='text',
        metadata_field='metadata'
    ),
    vector_index_name='vector_index'
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
    vector_store=mongo_db_vector_store,
    embeddings_model=bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
    instruction='Use this knowledge base to answer questions about product documentation. ' +
        'It contains technical specifications and user guides.'
)

doc_bucket = s3.Bucket(self, 'DocBucket')

bedrock.S3DataSource(self, 'DataSource',
    bucket=doc_bucket,
    knowledge_base=kb,
    data_source_name='product-docs',
    chunking_strategy=bedrock.ChunkingStrategy.FIXED_SIZE
)
```

### Vector Type

The data type for the vectors when using a model to convert text into vector embeddings. Embeddings type may impact the availability of some embeddings models and vector stores. The following vector types are available:

- **Floating point**: More precise vector representation of the text, but more costly in storage.
- **Binary**: Not as precise vector representation of the text, but not as costly in storage as a standard floating-point (float32). Not all embedding models and vector stores support binary embeddings.

See [Supported embeddings models](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html) for information on the available models and their vector data types.

#### TypeScript

```ts
const kb = new bedrock.VectorKnowledgeBase(this, 'MyKnowledgeBase', {
  name: 'MyKnowledgeBase',
  vectorType: bedrock.VectorType.BINARY,
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});
```

#### Python

```python
kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
    name= 'MyKnowledgeBase',
    vector_type= bedrock.VectorType.BINARY,
    embeddings_model= bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
)
```

### Data Sources

Data sources are the various repositories or systems from which information is extracted and ingested into the knowledge base. These sources provide the raw content that will be processed, indexed, and made available for querying within the knowledge base system. Data sources can include various types of systems such as document management systems, databases, file storage systems, and content management platforms. Supported Data Sources include Amazon S3 buckets, Web Crawlers, SharePoint sites, Salesforce instances, and Confluence spaces.

- **Amazon S3**: You can either create a new data source using the `bedrock.S3DataSource(..)` class, or using the `kb.addS3DataSource(..)`.
- **Web Crawler**: You can either create a new data source using the `bedrock.WebCrawlerDataSource(..)` class, or using the `kb.addWebCrawlerDataSource(..)`.
- **Confluence**: You can either create a new data source using the `bedrock.ConfluenceDataSource(..)` class, or using the `kb.addConfluenceDataSource(..)`.
- **SharePoint**: You can either create a new data source using the `bedrock.SharePointDataSource(..)` class, or using the `kb.addSharePointDataSource(..)`.
- **Salesforce**: You can either create a new data source using the `bedrock.SalesforceDataSource(..)` class, or using the `kb.addSalesforceDataSource(..)`.
- **Custom**: You can either create a new data source using the `bedrock.CustomDataSource(..)` class, or using the `kb.addCustomDataSource(..)`. This allows you to add your own custom data source to the knowledge base.

More details about the different data sources can be found in the dedicated [Readme](../data-sources/README.md).

#### TypeScript

```ts
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-data-sources-integ-test');

const kb = new VectorKnowledgeBase(stack, 'MyKnowledgeBase', {
  name: 'MyKnowledgeBase',
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});

const bucket = new Bucket(stack, 'Bucket', {});
const lambdaFunction = new Function(stack, 'MyFunction', {
  runtime: cdk.aws_lambda.Runtime.PYTHON_3_9,
  handler: 'index.handler',
  code: cdk.aws_lambda.Code.fromInline('print("Hello, World!")'),
});

const secret = new Secret(stack, 'Secret');
const key = new Key(stack, 'Key');

kb.addWebCrawlerDataSource({
  sourceUrls: ['https://docs.aws.amazon.com/'],
  chunkingStrategy: ChunkingStrategy.HIERARCHICAL_COHERE,
  customTransformation: CustomTransformation.lambda({
    lambdaFunction: lambdaFunction,
    s3BucketUri: `s3://${bucket.bucketName}/chunk-processor/`,
  }),
});

kb.addS3DataSource({
  bucket,
  chunkingStrategy: ChunkingStrategy.SEMANTIC,
  parsingStrategy: ParsingStrategy.foundationModel({
    parsingModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  }),
});

kb.addConfluenceDataSource({
  dataSourceName: 'TestDataSource',
  authSecret: secret,
  kmsKey: key,
  confluenceUrl: 'https://example.atlassian.net',
  filters: [
    {
      objectType: ConfluenceObjectType.ATTACHMENT,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: ConfluenceObjectType.PAGE,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

kb.addSalesforceDataSource({
  authSecret: secret,
  endpoint: 'https://your-instance.my.salesforce.com',
  kmsKey: key,
  filters: [
    {
      objectType: SalesforceObjectType.ATTACHMENT,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: SalesforceObjectType.CONTRACT,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

kb.addSharePointDataSource({
  dataSourceName: 'SharepointDataSource',
  authSecret: secret,
  kmsKey: key,
  domain: 'yourdomain',
  siteUrls: ['https://yourdomain.sharepoint.com/sites/mysite'],
  tenantId: '888d0b57-69f1-4fb8-957f-e1f0bedf64de',
  filters: [
    {
      objectType: SharePointObjectType.PAGE,
      includePatterns: ['.*\\.pdf'],
      excludePatterns: ['.*private.*\\.pdf'],
    },
    {
      objectType: SharePointObjectType.FILE,
      includePatterns: ['.*public.*\\.pdf'],
      excludePatterns: ['.*confidential.*\\.pdf'],
    },
  ],
});

kb.addCustomDataSource({
  dataSourceName: 'CustomDataSource',
  chunkingStrategy: ChunkingStrategy.FIXED_SIZE,
});
```

#### Python

```python
from aws_cdk import (
    Stack,
    aws_s3 as s3,
    aws_lambda as _lambda,
    aws_secretsmanager as secretsmanager,
    aws_kms as kms
)
from constructs import Construct
from cdklabs.generative_ai_cdk_constructs import (
    bedrock
)

class PythonTestStack(Stack):

    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        kb = bedrock.VectorKnowledgeBase(self, 'MyKnowledgeBase',
                    embeddings_model= bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
                )

        docBucket = s3.Bucket(self, 'Bucket')

        function = _lambda.Function(self, 'MyFunction',
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler='index.handler',
            code=_lambda.Code.from_inline('print("Hello, World!")'),
        )

        kb.add_web_crawler_data_source(
            source_urls= ['https://docs.aws.amazon.com/'],
            chunking_strategy= bedrock.ChunkingStrategy.HIERARCHICAL_COHERE,
            custom_transformation= bedrock.CustomTransformation.lambda_(
                lambda_function= function,
                s3_bucket_uri= f's3://{docBucket.bucket_name}/chunk-processor/'
            )
        )

        kb.add_s3_data_source(
            bucket= docBucket,
            chunking_strategy= bedrock.ChunkingStrategy.SEMANTIC,
            parsing_strategy= bedrock.ParsingStrategy.foundation_model(
                parsing_model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0.as_i_model(self)
            )
        )

        secret = secretsmanager.Secret(self, 'Secret')
        key = kms.Key(self, 'Key')

        kb.add_confluence_data_source(
            data_source_name='TestDataSource',
            auth_secret=secret,
            kms_key=key,
            confluence_url='https://example.atlassian.net',
            filters=[
                bedrock.ConfluenceCrawlingFilters(
                    object_type=bedrock.ConfluenceObjectType.ATTACHMENT,
                    include_patterns= [".*\\.pdf"],
                    exclude_patterns= [".*private.*\\.pdf"],
                ),
                bedrock.ConfluenceCrawlingFilters(
                    object_type=bedrock.ConfluenceObjectType.PAGE,
                    include_patterns= [".*public.*\\.pdf"],
                    exclude_patterns= [".*confidential.*\\.pdf"],
                ),
            ]
        )

        kb.add_salesforce_data_source(
            auth_secret=secret,
            endpoint='https://your-instance.my.salesforce.com',
            kms_key=key,
            filters=[
                bedrock.SalesforceCrawlingFilters(
                    object_type=bedrock.SalesforceObjectType.ATTACHMENT,
                    include_patterns= [".*\\.pdf"],
                    exclude_patterns= [".*private.*\\.pdf"],
                ),
                bedrock.SalesforceCrawlingFilters(
                    object_type=bedrock.SalesforceObjectType.CONTRACT,
                    include_patterns= [".*public.*\\.pdf"],
                    exclude_patterns= [".*confidential.*\\.pdf"],
                ),
            ]
        )

        kb.add_share_point_data_source(
            data_source_name='SharepointDataSource',
            auth_secret=secret,
            kms_key=key,
            domain='yourDomain',
            site_urls= ['https://yourdomain.sharepoint.com/sites/mysite'],
            tenant_id='888d0b57-69f1-4fb8-957f-e1f0bedf64de',
            filters=[
                bedrock.SharePointCrawlingFilters(
                    object_type=bedrock.SharePointObjectType.PAGE,
                    include_patterns= [".*\\.pdf"],
                    exclude_patterns= [".*private.*\\.pdf"],
                ),
                bedrock.SharePointCrawlingFilters(
                    object_type=bedrock.SharePointObjectType.FILE,
                    include_patterns= [".*public.*\\.pdf"],
                    exclude_patterns= [".*confidential.*\\.pdf"],
                ),
            ]
        )

        kb.add_custom_data_source(
            data_source_name='CustomDataSource',
            chunking_strategy=bedrock.ChunkingStrategy.FIXED_SIZE,
        )

```

### Chunking Strategies

- **Default Chunking**: Applies Fixed Chunking with the default chunk size of 300 tokens and 20% overlap.

  #### Default Chunking Configuration

  ##### TypeScript

  ```ts
  ChunkingStrategy.DEFAULT;
  ```

  ##### Python

  ```python
  ChunkingStrategy.DEFAULT
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

  ##### Python

  ```python
  # Fixed Size Chunking with sane defaults.
  ChunkingStrategy.FIXED_SIZE

  # Fixed Size Chunking with custom values.
  ChunkingStrategy.fixed_size(
    max_tokens= 200,
    overlap_percentage= 25
  )
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

  ##### Python

  Python

  ```python
  # Hierarchical Chunking with the default for Cohere Models.
  ChunkingStrategy.HIERARCHICAL_COHERE

  # Hierarchical Chunking with the default for Titan Models.
  ChunkingStrategy.HIERARCHICAL_TITAN

  # Hierarchical Chunking with custom values. Tthe maximum chunk size depends on the model.
  # Amazon Titan Text Embeddings: 8192. Cohere Embed models: 512
  chunking_strategy= ChunkingStrategy.hierarchical(
      overlap_tokens=60,
      max_parent_token_size=1500,
      max_child_token_size=300
  )
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

  ##### Python

  ```python
  # Semantic Chunking with sane defaults.
  ChunkingStrategy.SEMANTIC

  # Semantic Chunking with custom values.
  ChunkingStrategy.semantic(
    buffer_size=0,
    breakpoint_percentile_threshold=95,
    max_tokens=300
  )
  ```

- **No Chunking**: This strategy treats each file as one chunk. If you choose this option, you may want to pre-process your documents by splitting them into separate files.

  #### No Chunking Configuration

  ##### TypeScript

  ```ts
  ChunkingStrategy.NONE;
  ```

  ##### Python

  ```python
  ChunkingStrategy.NONE
  ```

### Parsing Strategy

A parsing strategy in Amazon Bedrock is a configuration that determines how the service processes and interprets the contents of a document. It involves converting the document's contents into text and splitting it into smaller chunks for analysis. Amazon Bedrock offers two parsing strategies:

- **Default Parsing Strategy**: This strategy converts the document's contents into text and splits it into chunks using a predefined approach. It is suitable for most use cases but may not be optimal for specific document types or requirements.

- **Foundation Model Parsing Strategy**: This strategy uses a foundation model to describe the contents of the document. It is particularly useful for improved processing of PDF files with tables and images. To use this strategy, set the `parsingStrategy` in a data source as below.

  #### Foundation Model Parsing Configuration

  ##### TypeScript

  ```ts
  bedrock.ParsingStrategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  });
  ```

  ##### Python

  ```python
  bedrock.ParsingStrategy.foundation_model(
      parsing_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0
  )
  ```

### Custom Transformation

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

##### Python

```python
CustomTransformation.lambda_(
  lambda_function= function,
  s3_bucket_uri= f's3://{docBucket.bucket_name}/chunk-processor/'
)
```

### Context Enrichment

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

##### Python

```python
bedrock.ContextEnrichment.foundation_model(
  enrichment_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0
)
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

#### TypeScript

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

#### Python

```py
from aws_cdk import aws_kms as kms
from cdklabs.generative_ai_cdk_constructs import bedrock, kendra

# Create a KMS key
cmk = kms.Key(stack, 'cmk')

# Create a new Kendra index
index = kendra.KendraGenAiIndex(self, 'index',
    name='kendra-index-cdk',
    kms_key=cmk,
    document_capacity_units=1,  # 40K documents
    query_capacity_units=1      # 0.2 QPS
)

# Or import an existing index
index = kendra.KendraGenAiIndex.from_attrs(self, 'myindex',
    index_id='myindex',
    role=my_role
)

# Create a Kendra Knowledge Base
kb = bedrock.KendraKnowledgeBase(self, 'kb',
    name='kendra-kb-cdk',
    kendra_index=index
)
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

#### Python

```python
import aws_cdk as cdk
from aws_cdk import aws_s3 as s3
import bedrock

# Create an S3 bucket for data
data_bucket = s3.Bucket(self, "SampleBucket",
    removal_policy=cdk.RemovalPolicy.DESTROY,
    auto_delete_objects=True
)

# Use a multilingual embedding model
embedding_model = bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3

# Create a Neptune graph
graph = bedrock.NeptuneGraph(self, "NeptuneGraph",
    vector_search_dimension=embedding_model.vector_dimensions,
    # Graph customization goes here
)

# Create a notebook for the graph
notebook = graph.create_notebook()

# Create a graph knowledge base
kb = bedrock.GraphKnowledgeBase(self, "GraphKnowledgeBase",
    embedding_model=embedding_model,
    graph=graph
)

# Add an S3 data source
kb.add_s3_data_source(
    bucket=data_bucket,
    # Context enrichment configuration for GraphRAG
    # - This is the default and only valid combination of model and method
    # - Future versions may support additional models and enrichment methods
    # context_enrichment=bedrock.ContextEnrichment.foundation_model(
    #     enrichment_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0
    # )
)

# Output the graph explorer URL
cdk.CfnOutput(stack, "GraphExplorerUrl",
    value=notebook.graph_explorer_endpoint
)
```

### Data Sources

The Graph Knowledge Base currently supports the following data sources:

- Amazon S3 (with context enrichment for graph building)

For more information about GraphRAG capabilities, see the [AWS documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-build-graphs.html).

## Permissions and methods

Knowledge Bases provide several methods to grant permissions and perform operations:

### Grant Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `grant(grantee, ...actions)` | Grants the given principal identity permissions to perform actions on this knowledge base | `grantee`: The principal to grant permissions to<br>`actions`: The actions to grant (e.g., `bedrock:GetKnowledgeBase`, `bedrock:ListKnowledgeBases`) |
| `grantQuery(grantee)` | Grants the given identity permissions to query the knowledge base | `grantee`: The principal to grant permissions to |
| `grantRetrieve(grantee)` | Grants the given identity permissions to retrieve content from the knowledge base | `grantee`: The principal to grant permissions to |
| `grantRetrieveAndGenerate(grantee)` | Grants the given identity permissions to retrieve content from the knowledge base and generate responses | `grantee`: The principal to grant permissions to |

### Knowledge Base Methods

| Method | Description | Parameters |
|--------|-------------|------------|
| `addDataSource(dataSource)` | Adds a data source to the knowledge base | `dataSource`: The data source to add |
| `fromKnowledgeBaseAttributes(scope, id, attrs)` | Imports an existing knowledge base | `scope`: The CDK scope<br>`id`: The CDK ID<br>`attrs`: The knowledge base attributes |

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

You can import existing knowledge bases using the `fromKnowledgeBaseAttributes` method. This allows you to reference existing knowledge bases in your CDK application without creating new ones.

### Import Methods

| Method | Description | Parameters | Returns |
|--------|-------------|------------|---------|
| `fromKnowledgeBaseAttributes(scope, id, attrs)` | Imports an existing knowledge base using its attributes | `scope`: The CDK scope<br>`id`: The CDK ID<br>`attrs`: The knowledge base attributes | `IKnowledgeBase` |

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

##### Python

```python
imported_kb = bedrock.VectorKnowledgeBase.from_knowledge_base_attributes(
    self, 
    'ImportedKb',
    knowledge_base_id='kb-12345678',
    execution_role_arn='arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
    vector_store_type=bedrock.VectorStoreType.OPENSEARCH_SERVERLESS,
)
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

##### Python

```python
imported_kendra_kb = bedrock.KendraKnowledgeBase.from_knowledge_base_attributes(
    self, 
    'ImportedKendraKb',
    knowledge_base_id='kb-12345678',
    execution_role_arn='arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
    kendra_index=existing_kendra_index,
)
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

##### Python

```python
# Import a Graph Knowledge Base
imported_graph_kb = bedrock.GraphKnowledgeBase.from_knowledge_base_attributes(
    self, 
    'ImportedGraphKb',
    knowledge_base_id='kb-12345678',
    execution_role_arn='arn:aws:iam::123456789012:role/AmazonBedrockExecutionRoleForKnowledgeBase',
    graph_id='graph-12345678',
    field_mapping={
        'metadataField': 'AMAZON_BEDROCK_METADATA',
        'textField': 'AMAZON_BEDROCK_TEXT',
    }
)
```

## Supplemental Data Storage

Supplemental Data Storage is used to specify configurations for the storage location of the images extracted from multimodal documents in your data source. These images can be retrieved and returned to the end user. If configured, your data source should use a parsing strategy either a foundation model or Amazon Bedrock Data Automation.

### TypeScript

```typescript
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

// Create a bucket to store multimodal data extracted from input files
const supplementalBucket = new cdk.aws_s3.Bucket(stack, "SSucket", {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
  autoDeleteObjects: true,
});

// Create an S3 supplemental data storage location. The multimodal data storage bucket cannot 
// be the same as the data source bucket if using an S3 data source
const supplementalS3Storage = bedrock.SupplementalDataStorageLocation.s3({
  uri: `s3://${supplementalBucket.bucketName}/supplemental-data/`
});

// Use it with a knowledge base
const knowledgeBase = new bedrock.VectorKnowledgeBase(this, 'MyKnowledgeBase', {
  // Other properties...
  supplementalDataStorageLocations: [supplementalS3Storage],
});

// Grant the kb role access to the supplementalBucket bucket
supplementalBucket.grantReadWrite(kb.role);

// Configure the parsing strategy in your data source to use either foundation model or bedrock data automation
```

### Python

```python
import * as cdk from 'aws-cdk-lib';
import * as bedrock from '@cdklabs/generative-ai-cdk-constructs';

# Create a bucket to store multimodal data extracted from input files
supplemental_bucket = cdk.aws_s3.Bucket(self, "SSucket", 
    removal_policy=cdk.CfnDeletionPolicy.DESTROY,
    auto_delete_objects=True,
)

# Create an S3 supplemental data storage location. The multimodal data storage bucket cannot 
# be the same as the data source bucket if using an S3 data source
supplemental_s3_storage = bedrock.SupplementalDataStorageLocation.s3(
    uri=f"s3://{supplemental_bucket.bucket_name}/supplemental-data/"
)

# Use it with a knowledge base
knowledge_base = bedrock.VectorKnowledgeBase(self, 'MyKnowledgeBase', 
    # Other properties...
    supplemental_data_storage_locations=[supplemental_s3_storage],
)

# Grant the kb role access to the supplementalBucket bucket
supplemental_bucket.grant_read_write(knowledge_base.role)

# Configure the parsing strategy in your data source to use either foundation model or bedrock data automation
# End of Selection
```

### Supported Storage Types

Currently, the following storage types are supported:

#### S3 Storage

S3 storage is used to store supplemental data in an Amazon S3 bucket.

##### TypeScript

```typescript
const s3Storage = SupplementalDataStorageLocation.s3({
  uri: 's3://my-bucket/supplemental-data/'
});
```

##### Python

```python
s3Storage = bedrock.SupplementalDataStorageLocation.s3(
    uri=f"s3://mybucket/supplemental-data/"
)
```