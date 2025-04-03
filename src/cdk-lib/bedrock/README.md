# Amazon Bedrock Construct Library

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

| **Language**                                                                                   | **Package**                             |
| :--------------------------------------------------------------------------------------------- | --------------------------------------- |
| ![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript | `@cdklabs/generative-ai-cdk-constructs` |
| ![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python             | `cdklabs.generative_ai_cdk_constructs`  |
| ![Java Logo](https://docs.aws.amazon.com/cdk/api/latest/img/java32.png) Java                   | `io.github.cdklabs.generative_ai_cdk_constructs`|
| ![.Net](https://docs.aws.amazon.com/cdk/api/latest/img/dotnet32.png) .Net                   | `CdkLabs.GenerativeAICdkConstructs`|
| ![Go](https://docs.aws.amazon.com/cdk/api/latest/img/go32.png) Go                   | `github.com/cdklabs/generative-ai-cdk-constructs-go/generative-ai-cdk-constructs`|

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies and Amazon through a single API, along with a broad set of capabilities you need to build generative AI applications with security, privacy, and responsible AI.

This construct library facilitates the deployment of Knowledge Bases, Bedrock Agents, Guardrails, Prompt Management, and Inference Pipelines. It leverages underlying CloudFormation L1 resources to provision these Bedrock features.

## Table of contents

- [API](#api)
- [Knowledge Bases](#knowledge-bases)
  - [Vector Knowledge Base](#vector-knowledge-base)
  - [Kendra Knowledge Base](#kendra-knowledge-base)
- [Agents](#agents)
  - [Create an Agent](#create-an-agent)
  - [Action groups](#action-groups)
  - [Prepare the Agent](#prepare-the-agent)
  - [Memory Configuration](#memory-configuration)
  - [Agent Collaboration](#agent-collaboration)
  - [Custom Orchestration](#custom-orchestration)
  - [Agent Alias](#agent-alias)
- [Guardrails](#bedrock-guardrails)
- [Prompt management](#prompt-management)
- [Application inference profile](#application-inference-profile)

## API

See the [API documentation](../../../apidocs/namespaces/bedrock/README.md).

## Knowledge Bases

Amazon Bedrock Knowledge Bases enable you to provide foundation models and agents with contextual information from your company's private data sources. This enhances the relevance, accuracy, and customization of their responses.

### Vector Knowledge Base

#### Create a vector Knowledge Base

A vector index on a vector store is required to create a vector Knowledge Base. This construct currently supports [Amazon OpenSearch Serverless](../opensearchserverless), [Amazon RDS Aurora PostgreSQL](../amazonaurora/), [Pinecone](../pinecone/) . By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control. For other resources you need to have the vector stores already created and credentials stored in AWS Secrets Manager. For Aurora, the construct provides an option to create a default `AmazonAuroraDefaultVectorStore` construct that will provision the vector store backed by Amazon Aurora for you. To learn more you can read [here](../amazonaurora/README.md).

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

#### Vector Knowledge Base Properties


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

### Initializer

Example of `OpenSearch Serverless`:

TypeScript

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

Python

```python

from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
            embeddings_model= bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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

Example of `Amazon RDS Aurora PostgreSQL`:

TypeScript

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

Python

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
  embeddings_model= foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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

Example of importing existing `Amazon RDS Aurora PostgreSQL` using `fromExistingAuroraVectorStore()` method.
**Note** - you need to provide `clusterIdentifier`, `databaseName`, `vpc`, `secret` and `auroraSecurityGroupId` used in deployment of your existing RDS Amazon Aurora DB, as well as `embeddingsModel` that you want to be used by a Knowledge Base for chunking:

TypeScript

```ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { amazonaurora, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const auroraDb = aurora.AmazonAuroraVectorStore.fromExistingAuroraVectorStore(stack, 'ExistingAuroraVectorStore', {
  clusterIdentifier: 'aurora-serverless-vector-cluster',
  databaseName: 'bedrock_vector_db',
  schemaName: 'bedrock_integration',
  tableName: 'bedrock_kb',
  vectorField: 'embedding',
  textField: 'chunks',
  metadataField: 'metadata',
  primaryKeyField: 'id',
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
  vpc: cdk.aws_ec2.Vpc.fromLookup(stack, 'VPC', {
    vpcId: 'vpc-0c1a234567ee8bc90',
  }),
  auroraSecurityGroupId: 'sg-012ef345678c98a76',,
  secret: cdk.aws_rds.DatabaseSecret.fromSecretCompleteArn(
    stack,
    'Secret',
    cdk.Stack.of(stack).formatArn({
      service: 'secretsmanager',
      resource: 'secret',
      resourceName: 'rds-db-credentials/cluster-1234567890',
      region: cdk.Stack.of(stack).region,
      account: cdk.Stack.of(stack).account,
      arnFormat: cdk.ArnFormat.COLON_RESOURCE_NAME,
    }),
  ),
});

const kb = new bedrock.VectorKnowledgeBase(this, "KnowledgeBase", {
  vectorStore: auroraDb,
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
  instruction:
    "Use this knowledge base to answer questions about books. " +
    "It contains the full text of novels.",
});

const docBucket = new s3.Bucket(this, "DocBucket");

new bedrock.S3DataSource(this, "DataSource", {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: "books",
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
});
```

Python

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

aurora_db = amazonaurora.AmazonAuroraVectorStore.from_existing_aurora_vector_store(
    self, 'ExistingAuroraVectorStore',
    cluster_identifier='aurora-serverless-vector-cluster',
    database_name='bedrock_vector_db',
    schema_name='bedrock_integration',
    table_name='bedrock_kb',
    vector_field='embedding',
    text_field='chunks',
    metadata_field='metadata',
    primary_key_field='id',
    embeddings_model=bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
    vpc=ec2.Vpc.from_lookup(self, 'VPC', vpc_id='vpc-0c1a234567ee8bc90'),
    aurora_security_group_id='sg-012ef345678c98a76',,
    secret=rds.DatabaseSecret.from_secret_complete_arn(
        self,
        'Secret',
        Stack.of(self).format_arn(
            service= 'secretsmanager',
            resource= 'secret',
            resource_name= 'rds-db-credentials/cluster-1234567890',
            region= Stack.of(self).region,
            account= Stack.of(self).account,
            arn_format= ArnFormat.COLON_RESOURCE_NAME
        )
    )
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
            vector_store= aurora_db,
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

Example of `Pinecone` (manual, you must have Pinecone vector store created):

TypeScript

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
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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

Python

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

#### Vector Knowledge Base - Vector Type

The data type for the vectors when using a model to convert text into vector embeddings. Embeddings type may impact the availability of some embeddings models and vector stores. The following vector types are available:

- Floating point: More precise vector representation of the text, but more costly in storage.
- Binary: Not as precise vector representation of the text, but not as costly in storage as a standard floating-point (float32). Not all embedding models and vector stores support binary embeddings

See [Supported embeddings models](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html) for information on the available models and their vector data types.

Typescript

```ts
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-data-sources-integ-test');

const kb = new VectorKnowledgeBase(stack, 'MyKnowledgeBase', {
  name: 'MyKnowledgeBase',
  vectorType: bedrock.VectorType.BINARY,
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});
```

Python

```python

from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock
)

kb = bedrock.VectorKnowledgeBase(self, 'KnowledgeBase',
    name= 'MyKnowledgeBase',
    vector_type= bedrock.VectorType.BINARY,
    embeddings_model= bedrock.BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
)
```


#### Vector Knowledge Base - Data Sources

Data sources are the various repositories or systems from which information is extracted and ingested into the
knowledge base. These sources provide the raw content that will be processed, indexed, and made available for
querying within the knowledge base system. Data sources can include various types of systems such as document
management systems, databases, file storage systems, and content management platforms. Suuported Data Sources
include Amazon S3 buckets, Web Crawlers, SharePoint sites, Salesforce instances, and Confluence spaces.

- **Amazon S3**. You can either create a new data source using the `bedrock.S3DataSource(..)` class, or using the
  `kb.addS3DataSource(..)`.
- **Web Crawler**. You can either create a new data source using the `bedrock.WebCrawlerDataSource(..)` class, or using the
  `kb.addWebCrawlerDataSource(..)`.
- **Confluence**. You can either create a new data source using the `bedrock.ConfluenceDataSource(..)` class, or using the
  `kb.addConfluenceDataSource(..)`.
- **SharePoint**. You can either create a new data source using the `bedrock.SharePointDataSource(..)` class, or using the
  `kb.addSharePointDataSource(..)`.
- **Salesforce**. You can either create a new data source using the `bedrock.SalesforceDataSource(..)` class, or using the
  `kb.addSalesforceDataSource(..)`.
- **Custom**. You can either create a new data source using the `bedrock.CustomDataSource(..)` class, or using the 
  `kb.addCustomDataSource(..)`. This allows you to add your own custom data source to the knowledge base.

Typescript

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
  parsingStrategy: ParsingStategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
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

Python

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
            parsing_strategy= bedrock.ParsingStategy.foundation_model(
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

#### Vector Knowledge Base - Chunking Strategies

- **Default Chunking**: Applies Fixed Chunking with the default chunk size of 300 tokens and 20% overlap.

  TypeScript

  ```ts
  ChunkingStrategy.DEFAULT;
  ```

  Python

  ```python
  ChunkingStrategy.DEFAULT
  ```

- **Fixed Size Chunking**: This method divides the data into fixed-size chunks, with each chunk
  containing a predetermined number of tokens. This strategy is useful when the data is uniform
  in size and structure.
  Typescript

  TypeScript

  ```ts
  // Fixed Size Chunking with sane defaults.
  ChunkingStrategy.FIXED_SIZE;

  // Fixed Size Chunking with custom values.
  ChunkingStrategy.fixedSize({ maxTokens: 200, overlapPercentage: 25 });
  ```

  Python

  ```python
  # Fixed Size Chunking with sane defaults.
  ChunkingStrategy.FIXED_SIZE

  # Fixed Size Chunking with custom values.
  ChunkingStrategy.fixed_size(
    max_tokens= 200,
    overlap_percentage= 25
  )
  ```

- **Hierarchical Chunking**: This strategy organizes data into layers of chunks, with the first
  layer containing large chunks and the second layer containing smaller chunks derived from the first.
  It is ideal for data with inherent hierarchies or nested structures.

  TypeScript

  ```ts
  // Hierarchical Chunking with the default for Cohere Models.
  ChunkingStrategy.HIERARCHICAL_COHERE;

  // Hierarchical Chunking with the default for Titan Models.
  ChunkingStrategy.HIERARCHICAL_TITAN;

  // Hierarchical Chunking with custom values. Tthe maximum chunk size depends on the model.
  // Amazon Titan Text Embeddings: 8192. Cohere Embed models: 512
  ChunkingStrategy.hierarchical({
    overlapTokens: 60,
    maxParentTokenSize: 1500,
    maxChildTokenSize: 300,
  });
  ```

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

- **Semantic Chunking**: This method splits data into smaller documents based on groups of similar
  content derived from the text using natural language processing. It helps preserve contextual
  relationships and ensures accurate and contextually appropriate results.

  TypeScript

  ```ts
  // Semantic Chunking with sane defaults.
  ChunkingStrategy.SEMANTIC;

  // Semantic Chunking with custom values.
  ChunkingStrategy.semantic({ bufferSize: 0, breakpointPercentileThreshold: 95, maxTokens: 300 });
  ```

  Python

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

- **No Chunking**: This strategy treats each file as one chunk. If you choose this option,
  you may want to pre-process your documents by splitting them into separate files.

  TypeScript

  ```ts
  ChunkingStrategy.NONE;
  ```

  Python

  ```python
  ChunkingStrategy.NONE
  ```

#### Vector Knowledge Base - Parsing Strategy

A parsing strategy in Amazon Bedrock is a configuration that determines how the service
processes and interprets the contents of a document. It involves converting the document's
contents into text and splitting it into smaller chunks for analysis. Amazon Bedrock offers
two parsing strategies:

- **Default Parsing Strategy**: This strategy converts the document's contents into text
  and splits it into chunks using a predefined approach. It is suitable for most use cases
  but may not be optimal for specific document types or requirements.

- **Foundation Model Parsing Strategy**: This strategy uses a foundation model to describe
  the contents of the document. It is particularly useful for improved processing of PDF files
  with tables and images. To use this strategy, set the `parsingStrategy` in a data source as below.

  TypeScript

  ```ts
  bedrock.ParsingStategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  });
  ```

  Python

  ```python
  bedrock.ParsingStategy.foundation_model(
      parsing_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0
  )
  ```

#### Knowledge Base - Custom Transformation

Custom Transformation in Amazon Bedrock is a feature that allows you to create and apply
custom processing steps to documents moving through a data source ingestion pipeline.

Custom Transformation uses AWS Lambda functions to process documents, enabling you to
perform custom operations such as data extraction, normalization, or enrichment. To
create a custom transformation, set the `customTransformation` in a data source as below.

TypeScript

```ts
CustomTransformation.lambda({
lambdaFunction: lambdaFunction,
s3BucketUri: `s3://${bucket.bucketName}/chunk-processor/`,
}),
```

Python

```python
CustomTransformation.lambda_(
  lambda_function= function,
  s3_bucket_uri= f's3://{docBucket.bucket_name}/chunk-processor/'
)
```

#### Knowledge Base - Enrichment configuration

Context Enrichment in Amazon Bedrock is a feature that allows you to enhance the context of your documents during the ingestion process. This is particularly useful for applications like Neptune GraphRAG, where you need to extract entities from chunks to build a knowledge graph.

Currently, context enrichment is only supported when using Neptune Analytics as a storage configuration.

The enrichment process uses Amazon Bedrock foundation models to perform operations like chunk entity extraction. To configure context enrichment, set the `contextEnrichment` in a data source as below.

TypeScript

```ts
bedrock.ContextEnrichment.foundationModel({
  enrichmentModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
});
```

Python

```python
bedrock.ContextEnrichment.foundation_model(
  enrichment_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0
)
```

### Kendra Knowledge Base

#### Create a Kendra Knowledge Base

With Amazon Bedrock Knowledge Bases, you can build a knowledge base from an Amazon Kendra GenAI index to create more sophisticated and accurate Retrieval Augmented Generation (RAG)-powered digital assistants. By combining an Amazon Kendra GenAI index with Amazon Bedrock Knowledge Bases, you can:

- Reuse your indexed content across multiple Amazon Bedrock applications without rebuilding indexes or re-ingesting data.
- Leverage the advanced GenAI capabilities of Amazon Bedrock while benefiting from the high-accuracy information retrieval of Amazon Kendra.
- Customize your digital assistant's behavior using the tools of Amazon Bedrock while maintaining the semantic accuracy of an Amazon Kendra GenAI index.

#### Kendra Knowledge Base properties

| Name | Type | Required | Description |
|------|------|----------|-------------|
| kendraIndex | IKendraGenAiIndex | Yes | The Kendra Index to use for the knowledge base. |
| name | string | No | The name of the knowledge base. If not provided, a name will be auto-generated. |
| description | string | No | Description of the knowledge base. |
| instruction | string | No | Instructions for the knowledge base. |
| existingRole | iam.IRole | No | An existing IAM role to use for the knowledge base. If not provided, a new role will be created. |

#### Initializer


TypeScript

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

Python

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

## Agents

Amazon Bedrock Agents allow generative AI applications to automate complex, multistep tasks by seamlessly integrating with your company's systems, APIs, and data sources.


### Agent Properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string | No | The name of the agent. Defaults to a name generated by CDK |
| instruction | string | Yes | The instruction used by the agent that determines how it will perform its task. Must have a minimum of 40 characters |
| foundationModel | IInvokable | Yes | The foundation model used for orchestration by the agent |
| existingRole | iam.IRole | No | The existing IAM Role for the agent to use. Must have a trust policy allowing Bedrock service to assume the role. Defaults to a new created role |
| shouldPrepareAgent | boolean | No | Specifies whether to automatically update the `DRAFT` version of the agent after making changes. Defaults to false |
| idleSessionTTL | Duration | No | How long sessions should be kept open for the agent. Session expires if no conversation occurs during this time. Defaults to 1 hour |
| kmsKey | kms.IKey | No | The KMS key of the agent if custom encryption is configured. Defaults to AWS managed key |
| description | string | No | A description of the agent. Defaults to no description |
| knowledgeBases | IKnowledgeBase[] | No | The KnowledgeBases associated with the agent |
| actionGroups | AgentActionGroup[] | No | The Action Groups associated with the agent |
| guardrail | IGuardrail | No | The guardrail that will be associated with the agent |
| promptOverrideConfiguration | PromptOverrideConfiguration | No | Overrides some prompt templates in different parts of an agent sequence configuration |
| userInputEnabled | boolean | No | Select whether the agent can prompt additional information from the user when it lacks enough information. Defaults to false |
| codeInterpreterEnabled | boolean | No | Select whether the agent can generate, run, and troubleshoot code when trying to complete a task. Defaults to false |
| forceDelete | boolean | No | Whether to delete the resource even if it's in use. Defaults to true |

### Create an Agent

The following example creates an Agent with a simple instruction and default prompts that consults a Knowledge Base.

### Initializer

TypeScript

```ts
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
});

agent.addKnowledgeBase(kb);
```

Python

```python
agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
    instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
)
  agent.add_knowledge_base(kb)
```

You can also use system defined inference profiles to enable cross region inference requests for supported models. For instance:

TypeScript

```ts
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
});

const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: cris,
  instruction: 'You are a helpful and friendly agent that answers questions about agriculture.',
});
```

Python

```python
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0
)

agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=cris,
    instruction="You are a helpful and friendly agent that answers questions about agriculture.",
)
```

For more information on cross region inference, please refer to [System defined inference profiles](#system-defined-inference-profiles)

### Action Groups

An action group defines functions your agent can call. The functions are Lambda functions. The action group uses an OpenAPI schema to tell the agent what your functions do and how to call them.

### Action Group Properties

| Name | Type | Required | Description |
|---|---|---|---|
| name | string | Yes | The name of the action group |
| description | string | No | A description of the action group |
| apiSchema | ApiSchema | No | The API Schema |
| executor | ActionGroupExecutor | No | The action group executor |
| enabled | boolean | No | Specifies whether the action group is available for the agent to invoke or not when sending an InvokeAgent request. Defaults to true |
| forceDelete | boolean | No | Specifies whether to delete the resource even if it's in use. Defaults to false |
| functionSchema | CfnAgent.FunctionSchemaProperty | No | Defines functions that each define parameters that the agent needs to invoke from the user |
| parentActionGroupSignature | ParentActionGroupSignature | No | The AWS Defined signature for enabling certain capabilities in your agent. When specified, description, apiSchema, and actionGroupExecutor must be blank |


### Initializer

```ts
const actionGroupFunction = new lambda_python.PythonFunction(this, 'ActionGroupFunction', {
  runtime: lambda.Runtime.PYTHON_3_12,
  entry: path.join(__dirname, '../lambda/action-group'),
});

const actionGroup = new AgentActionGroup({
  name: 'query-library',
  description: 'Use these functions to get information about the books in the library.',
  executor: bedrock.ActionGroupExecutor.fromlambdaFunction(actionGroupFunction),
  enabled: true,
  apiSchema: bedrock.ApiSchema.fromLocalAsset(path.join(__dirname, 'action-group.yaml')),
});

agent.addActionGroup(actionGroup);
```

Python

```python

action_group_function = PythonFunction(
            self,
            "LambdaFunction",
            runtime=Runtime.PYTHON_3_12,
            entry="./lambda",
            index="app.py",
            handler="lambda_handler",
)

actionGroup = bedrock.AgentActionGroup(
    name="query-library",
    description="Use these functions to get information about the books in the library.",
    executor= bedrock.ActionGroupExecutor.fromlambda_function(action_group_function),
    enabled=True,
    api_schema=bedrock.ApiSchema.from_local_asset("action-group.yaml"))

agent.add_action_group(actionGroup)
```

### Prepare the Agent

The `Agent` constructs take an optional parameter `shouldPrepareAgent` to indicate that the Agent should be prepared after any updates to an agent, Knowledge Base association, or action group. This may increase the time to create and update those resources. By default, this value is false .

Creating an agent alias will not prepare the agent, so if you create an alias using the `AgentAlias` resource then you should set `shouldPrepareAgent` to **_true_**.

#### Prompt Overrides

Bedrock Agents allows you to customize the prompts and LLM configuration for its different steps. You can disable steps or create a new prompt template. Prompt templates can be inserted from plain text files.

TypeScript

```ts
import { readFileSync } from 'fs';

const file = readFileSync(prompt_path, 'utf-8');

const agent = new bedrock.Agent(this, 'Agent', {
      foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
      instruction: 'You are a helpful and friendly agent that answers questions about literature.',
      userInputEnabled: true,
      codeInterpreterEnabled: false,
      shouldPrepareAgent:true,
      promptOverrideConfiguration: bedrock.PromptOverrideConfiguration.fromSteps(
        [
          {
            stepType: bedrock.AgentStepType.PRE_PROCESSING,
            stepEnabled: true,
            customPromptTemplate: file,
            inferenceConfig: {
              temperature: 0.0,
              topP: 1,
              topK: 250,
              maximumLength: 1,
              stopSequences: ["\n\nHuman:"],
            },
            foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1
          }
        ]
      )
    });
```

Python

```python
orchestration = open('prompts/orchestration.txt', encoding="utf-8").read()
agent = bedrock.Agent(self, "Agent",
            foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
            instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
            user_input_enabled=True,
            code_interpreter_enabled=False,
            should_prepare_agent=True,
            prompt_override_configuration= bedrock.PromptOverrideConfiguration.from_steps(
                steps=[
                    bedrock.PromptStepConfiguration(
                        step_type=bedrock.AgentStepType.PRE_PROCESSING,
                        step_enabled= True,
                        custom_prompt_template= file,
                        inference_config=bedrock.InferenceConfiguration(
                            temperature=0.0,
                            top_k=250,
                            top_p=1,
                            maximum_length=1,
                            stop_sequences=['\n\nHuman:'],
                        ),
                        foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1
                    ),
                ]
            ),
        )
```

### Memory Configuration

Agents can maintain context across multiple sessions and recall past interactions using memory. This feature is useful for creating a more coherent conversational experience.

#### Memory Options

You can configure memory for an agent using the `memory` property in the `AgentProps` interface. The memory configuration allows you to specify the type of memory and its properties.

TypeScript

```typescript
import { Agent, Memory, SessionSummaryMemoryProps } from 'src/cdk-lib/bedrock/agents';

const agent = new Agent(this, 'MyAgent', {
  name: 'MyAgent',
  instruction: 'Your instruction here',
  foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
  memory: Memory.sessionSummary({
        maxRecentSessions: 10, // Keep the last 20 session summaries
        memoryDurationDays: 20, // Retain summaries for 30 days
      }),
});
```

Python

```py
from src.cdk_lib.bedrock.agents import Agent, Memory, BedrockFoundationModel

agent = Agent(self, 'MyAgent',
    name='MyAgent',
    instruction='Your instruction here',
    foundation_model=BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
    memory=Memory.session_summary(
        max_recent_sessions=10,  # Keep the last 10 session summaries
        memory_duration_days=20,  # Retain summaries for 20 days
    ),
)
```

### Memory Properties

- **memoryDurationDays**: Duration in days for which session summaries are retained (1-365). Default is 30 days.
- **maxRecentSessions**: Maximum number of recent session summaries to include (minimum 1). Default is 20.

### Memory Types

Currently, the following memory type is supported:

- **SESSION_SUMMARY**: Uses memory summarization to enhance accuracy by summarizing sessions.

For more information on memory configuration, refer to the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html).

### Agent Collaboration

Agent Collaboration enables multiple Bedrock Agents to work together on complex tasks. This feature allows agents to specialize in different areas and collaborate to provide more comprehensive responses to user queries.

#### Collaboration Types

You can configure collaboration for an agent using the `agentCollaboration` and `agentCollaborators` properties in the `AgentProps` interface.

- **SUPERVISOR**: The agent acts as a supervisor that can delegate tasks to other agents.
- **SUPERVISOR_ROUTER**: The agent acts as a supervisor that can route requests to specialized agents.
- **DISABLED**: Collaboration is disabled (default).

#### Collaboration Example

TypeScript

```typescript
import { Agent, AgentCollaboratorType, RelayConversationHistoryType } from '@cdklabs/generative-ai-cdk-constructs';

// Create a specialized agent for customer support
const customerSupportAgent = new Agent(this, 'CustomerSupportAgent', {
  name: 'CustomerSupportAgent',
  instruction: 'You specialize in answering customer support questions about our products.',
  foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
});

// Create an agent alias for the specialized agent
const customerSupportAlias = new AgentAlias(this, 'CustomerSupportAlias', {
  agent: customerSupportAgent,
  aliasName: 'production',
});

// Create a main agent that can collaborate with the specialized agent
const mainAgent = new Agent(this, 'MainAgent', {
  name: 'MainAgent',
  instruction: 'You are a helpful assistant that can answer general questions and route specialized customer support questions to the customer support agent.',
  foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
  agentCollaboration: AgentCollaboratorType.SUPERVISOR,
  agentCollaborators: [
    new bedrock.AgentCollaborator({
      agentAlias: customerSupportAlias,
      collaborationInstruction: 'Route customer support questions to this agent.',
      collaboratorName: 'CustomerSupport',
      relayConversationHistory: true,
    }),
  ],
});
```

Python

```python
from cdklabs.generative_ai_cdk_constructs import (
    bedrock, 
    AgentCollaboratorType, 
    RelayConversationHistoryType
)

# Create a specialized agent for customer support
customer_support_agent = bedrock.Agent(self, 'CustomerSupportAgent',
    name='CustomerSupportAgent',
    instruction='You specialize in answering customer support questions about our products.',
    foundation_model=bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
)

# Create an agent alias for the specialized agent
customer_support_alias = bedrock.AgentAlias(self, 'CustomerSupportAlias', 
    agent=customer_support_agent,
    alias_name='production',
)

# Create a main agent that can collaborate with the specialized agent
main_agent = bedrock.Agent(self, 'MainAgent',
    name='MainAgent',
    instruction='You are a helpful assistant that can answer general questions and route specialized customer support questions to the customer support agent.',
    foundation_model=bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
    agent_collaboration=AgentCollaboratorType.SUPERVISOR,
    agent_collaborators=[
      bedrock.AgentCollaborator(
        agent_alias= customer_support_alias,
        collaboration_instruction= 'Route customer support questions to this agent.',
        collaborator_name= 'CustomerSupport',
        relay_conversation_history= true,
      )
    ],
)
```

For more information on agent collaboration, refer to the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-collaboration.html).

### Custom Orchestration

Custom Orchestration allows you to override the default agent orchestration flow with your own Lambda function. This enables more control over how the agent processes user inputs, handles knowledge base queries, and invokes action groups.

#### Orchestration Types

You can configure the orchestration type using the `orchestrationType` and `customOrchestration` properties in the `AgentProps` interface.

- **DEFAULT**: The default orchestration provided by Bedrock (default).
- **CUSTOM_ORCHESTRATION**: Custom orchestration using a Lambda function.

#### Custom Orchestration Example

TypeScript

```typescript
import { Agent, OrchestrationType, OrchestrationExecutor } from '@cdklabs/generative-ai-cdk-constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as path from 'path';

// Create a Lambda function for custom orchestration
const orchestrationFunction = new lambda.Function(this, 'OrchestrationFunction', {
  runtime: lambda.Runtime.PYTHON_3_10,
  handler: 'index.handler',
  code: lambda.Code.fromAsset(path.join(__dirname, 'lambda/orchestration')),
});

// Create an agent with custom orchestration
const agent = new Agent(this, 'CustomOrchestrationAgent', {
  name: 'CustomOrchestrationAgent',
  instruction: 'You are a helpful assistant with custom orchestration logic.',
  foundationModel: bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
  orchestrationType: OrchestrationType.CUSTOM_ORCHESTRATION,
  customOrchestration: {
    executor: OrchestrationExecutor.fromlambdaFunction(orchestrationFunction),
  },
});
```

Python

```python
from cdklabs.generative_ai_cdk_constructs import (
    bedrock, 
    OrchestrationType, 
    OrchestrationExecutor
)
import aws_cdk.aws_lambda as lambda_
import os

# Create a Lambda function for custom orchestration
orchestration_function = lambda_.Function(self, 'OrchestrationFunction',
    runtime=lambda_.Runtime.PYTHON_3_10,
    handler='index.handler',
    code=lambda_.Code.from_asset(os.path.join(os.path.dirname(__file__), 'lambda/orchestration')),
)

# Create an agent with custom orchestration
agent = bedrock.Agent(self, 'CustomOrchestrationAgent',
    name='CustomOrchestrationAgent',
    instruction='You are a helpful assistant with custom orchestration logic.',
    foundation_model=bedrock.BedrockFoundationModel.AMAZON_NOVA_LITE_V1,
    orchestration_type=OrchestrationType.CUSTOM_ORCHESTRATION,
    custom_orchestration=bedrock.CustomOrchestration(
      executor= OrchestrationExecutor.fromlambda_function(orchestration_function),
    )
)
```

The custom orchestration Lambda function receives events from Bedrock with the user's input and context, and it can control the flow of the conversation by deciding when to query knowledge bases, invoke action groups, or respond directly to the user.

For more information on custom orchestration, refer to the [AWS Bedrock documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/agents-custom-orchestration.html).

### Agent Alias

After you have sufficiently iterated on your working draft and are satisfied with the behavior of your agent, you can set it up for deployment and integration into your application by creating aliases of your agent.

To deploy your agent, you need to create an alias. During alias creation, Amazon Bedrock automatically creates a version of your agent. The alias points to this newly created version. You can point the alias to a previously created version if necessary. You then configure your application to make API calls to that alias.

By default, the `Agent` resource does not create any aliases, and you can use the 'DRAFT' version.

#### Specific version

You can use the `AgentAlias` resource if you want to create an Alias for an existing Agent.

TypeScript

```ts
const agentAlias2 = new bedrock.AgentAlias(this, 'myalias2', {
  aliasName: 'myalias',
  agent: agent,
  agentVersion: '1', // optional
  description: 'mytest'
});
```

Python

```python
agent_alias_2 = bedrock.AgentAlias(self, 'myalias2',
    alias_name='myalias',
    agent=agent,
    agent_version='1', # optional
    description='mytest'
)
```

## Bedrock Guardrails

Amazon Bedrock's Guardrails feature enables you to implement robust governance and control mechanisms for your generative AI applications, ensuring alignment with your specific use cases and responsible AI policies. Guardrails empowers you to create multiple tailored policy configurations, each designed to address the unique requirements and constraints of different use cases. These policy configurations can then be seamlessly applied across multiple foundation models (FMs) and Agents, ensuring a consistent user experience and standardizing safety, security, and privacy controls throughout your generative AI ecosystem.

With Guardrails, you can define and enforce granular, customizable policies to precisely govern the behavior of your generative AI applications. You can configure the following policies in a guardrail to avoid undesirable and harmful content and remove sensitive information for privacy protection.

Content filters – Adjust filter strengths to block input prompts or model responses containing harmful content.

Denied topics – Define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.

Word filters – Configure filters to block undesirable words, phrases, and profanity. Such words can include offensive terms, competitor names etc.

Sensitive information filters – Block or mask sensitive information such as personally identifiable information (PII) or custom regex in user inputs and model responses.

You can create a Guardrail with a minimum blockedInputMessaging ,blockedOutputsMessaging and default content filter policy.

TypeScript

```ts
const guardrails = new bedrock.Guardrail(this, 'bedrockGuardrails', {
  name: 'my-BedrockGuardrails',
  description: 'Legal ethical guardrails.',
});

// Optional - Add Sensitive information filters

guardrails.addPIIFilter({
  type: PIIType.General.ADDRESS,
  action: GuardrailAction.ANONYMIZE,
});

guardrails.addRegexFilter({
  name: 'TestRegexFilter',
  description: 'This is a test regex filter',
  pattern: '/^[A-Z]{2}d{6}$/',
  action: bedrock.GuardrailAction.ANONYMIZE,
});

// Optional - Add contextual grounding

guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.GROUNDING,
  threshold: 0.95,
});

guardrails.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.RELEVANCE,
  threshold: 0.95,
});

// Optional - Add Denied topics . You can use a Topic or create your custom Topic

guardrails.addDeniedTopicFilter(Topic.FINANCIAL_ADVICE);
guardrails.addDeniedTopicFilter(
  Topic.custom({
    name: 'Legal_Advice',
    definition:
      'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
    examples: [
      'Can I sue someone for this?',
      'What are my legal rights in this situation?',
      'Is this action against the law?',
      'What should I do to file a legal complaint?',
      'Can you explain this law to me?',
    ],
  })
);

// Optional - Add Word filters. You can upload words from a file with addWordFilterFromFile function.
guardrails.addWordFilter('drugs');
guardrails.addManagedWordListFilter(ManagedWordFilterType.PROFANITY);
guardrails.addWordFilterFromFile('./scripts/wordsPolicy.csv');

// versioning - if you change any guardrail configuration, a new version will be created
guardrails.createVersion('testversion');

// Importing existing guardrail
const importedGuardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
  guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
  guardrailVersion: '1', //optional
  kmsKey: kmsKey, //optional
});

// Importing Guardrails created through the L1 CDK CfnGuardrail construct
const cfnGuardrail = new CfnGuardrail(this, 'MyCfnGuardrail', {
  blockedInputMessaging: 'blockedInputMessaging',
  blockedOutputsMessaging: 'blockedOutputsMessaging',
  name: 'namemycfnguardrails',
  wordPolicyConfig: {
    wordsConfig: [
      {
        text: 'drugs',
      },
    ],
  },
});

const importedGuardrail = bedrock.Guardrail.fromCfnGuardrail(cfnGuardrail);
```

Python

```python
    guardrail = bedrock.Guardrail(self, 'myGuardrails',
        name='my-BedrockGuardrails',
        description= "Legal ethical guardrails.")

    # Optional - Add Sensitive information filters

    guardrail.add_pii_filter(
        type= bedrock.pii_type.General.ADDRESS,
        action= bedrock.GuardrailAction.ANONYMIZE,
    )

    guardrail.add_regex_filter(
        name= "TestRegexFilter",
        description= "This is a test regex filter",
        pattern= "/^[A-Z]{2}d{6}$/",
        action= bedrock.GuardrailAction.ANONYMIZE,
    )

    # Optional - Add contextual grounding

    guardrail.add_contextual_grounding_filter(
        type= bedrock.ContextualGroundingFilterType.GROUNDING,
        threshold= 0.95,
    )

    # Optional - Add Denied topics . You can use default Topic or create your custom Topic with createTopic function. The default Topics can also be overwritten.

    guardrail.add_contextual_grounding_filter(
        type= bedrock.ContextualGroundingFilterType.RELEVANCE,
        threshold= 0.95,
    )

    guardrail.add_denied_topic_filter(bedrock.Topic.FINANCIAL_ADVICE)

    guardrail.add_denied_topic_filter(
      bedrock.Topic.custom(
        name= "Legal_Advice",
        definition=
            "Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.",
        examples= [
            "Can I sue someone for this?",
            "What are my legal rights in this situation?",
            "Is this action against the law?",
            "What should I do to file a legal complaint?",
            "Can you explain this law to me?",
        ]
      )
    )

    # Optional - Add Word filters. You can upload words from a file with addWordFilterFromFile function.
    guardrail.add_word_filter("drugs")
    guardrail.add_managed_word_list_filter(bedrock.ManagedWordFilterType.PROFANITY)
    guardrail.add_word_filter_from_file("./scripts/wordsPolicy.csv")

    # versioning - if you change any guardrail configuration, a new version will be created
    guardrail.create_version("testversion")

    # Importing existing guardrail
    imported_guardrail = bedrock.Guardrail.from_guardrail_attributes(self, "TestGuardrail",
      guardrail_arn="arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl",
      guardrail_version="1",
      kms_key=kms_key
    )

    # Importing Guardrails created through the L1 CDK CfnGuardrail construct
    cfn_guardrail = cfnbedrock.CfnGuardrail(self, "MyCfnGuardrail",
        blocked_input_messaging="blockedInputMessaging",
        blocked_outputs_messaging="blockedOutputsMessaging",
        name="name",

        # the properties below are optional
        word_policy_config=cfnbedrock.CfnGuardrail.WordPolicyConfigProperty(
            words_config=[cfnbedrock.CfnGuardrail.WordConfigProperty(
                text="drugs"
            )]
        )
    )

    imported_guardrail = bedrock.Guardrail.from_cfn_guardrail(cfn_guardrail)



```

## Prompt management

Amazon Bedrock provides the ability to create and save prompts using Prompt management so that you can save
time by applying the same prompt to different workflows. You can include variables in the prompt so that you can
adjust the prompt for different use case.

The `Prompt` resource allows you to create a new prompt.
Example of a basic Text `Prompt`:

**TypeScript**

```ts
const cmk = new kms.Key(this, 'cmk', {});
const claudeModel = BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0;

const variant1 = PromptVariant.text({
  variantName: 'variant1',
  model: claudeModel,
  promptVariables: ['topic'],
  promptText: 'This is my first text prompt. Please summarize our conversation on: {{topic}}.',
  inferenceConfiguration: {
    temperature: 1.0,
    topP: 0.999,
    maxTokens: 2000,
  },
});

const prompt1 = new Prompt(this, 'prompt1', {
  promptName: 'prompt1',
  description: 'my first prompt',
  defaultVariant: variant1,
  variants: [variant1],
  kmsKey: cmk,
});
```

Python

```python
        cmk = kms.Key(self, "cmk")
        claude_model = bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0

        variant1 = bedrock.PromptVariant.text(
            variant_name="variant1",
            model=claude_model,
            prompt_variables=["topic"],
            prompt_text="This is my first text prompt. Please summarize our conversation on: {{topic}}.",
            inference_configuration={
                "temperature": 1.0,
                "top_p": 0.999,
                "maxTokens": 2000,
            }
        )

        prompt = bedrock.Prompt(
            self,
            "myprompt",
            prompt_name="prompt1",
            description="my first prompt",
            default_variant=variant1,
            variants=[variant1],
            kms_key=cmk
        )
```
Example of a "Chat" `Prompt`. Use this template type when the model supports the Converse API or the Anthropic Claude Messages API.
This allows you to include a System prompt and previous User messages and Assistant messages for context.

**TypeScript**

```ts
const cmk = new kms.Key(this, 'cmk', {});

const variantChat = PromptVariant.chat({
  variantName: 'variant1',
  model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
  messages: [
    ChatMessage.userMessage('From now on, you speak Japanese!'),
    ChatMessage.assistantMessage('Konnichiwa!'),
    ChatMessage.userMessage('From now on, you speak {{language}}!'),
  ],
  system: 'You are a helpful assistant that only speaks the language you`re told.',
  promptVariables: ['language'],
  toolConfiguration: {
    toolChoice: ToolChoice.AUTO,
    tools: [
      {
        toolSpec: {
          name: 'top_song',
          description: 'Get the most popular song played on a radio station.',
          inputSchema: {
            json: {
              type: 'object',
              properties: {
                sign: {
                  type: 'string',
                  description:
                    'The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR.',
                },
              },
              required: ['sign'],
            },
          },
        },
      },
    ],
  },
});

new Prompt(stack, 'prompt1', {
  promptName: 'prompt-chat',
  description: 'my first chat prompt',
  defaultVariant: variantChat,
  variants: [variantChat],
  kmsKey: cmk,
});
```

Python

```python

# Create KMS key
        cmk = kms.Key(self, "cmk")

        # Create tool specification
        tool_spec = CfnPrompt.ToolSpecificationProperty(
            name="top_song",
            description="Get the most popular song played on a radio station.",
            input_schema=CfnPrompt.ToolInputSchemaProperty(
                json={
                    "type": "object",
                    "properties": {
                        "sign": {
                            "type": "string",
                            "description": "The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR."
                        }
                    },
                    "required": ["sign"]
                }
            )
        )

        # Create tool configuration
        tool_config = bedrock.ToolConfiguration(
            tool_choice=bedrock.ToolChoice.AUTO,
            tools=[
                CfnPrompt.ToolProperty(
                    tool_spec=tool_spec
                )
            ]
        )

        # Create chat variant
        variant_chat = bedrock.PromptVariant.chat(
            variant_name="variant1",
            model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
            messages=[
                bedrock.ChatMessage.user("From now on, you speak Japanese!"),
                bedrock.ChatMessage.assistant("Konnichiwa!"),
                bedrock.ChatMessage.user("From now on, you speak {{language}}!"),
            ],
            system="You are a helpful assistant that only speaks the language you're told.",
            prompt_variables=["language"],
            tool_configuration=tool_config
        )

        # Create prompt
        prompt = bedrock.Prompt(
            self,
            "prompt1",
            prompt_name="prompt-chat",
            description="my first chat prompt",
            default_variant=variant_chat,
            variants=[variant_chat],
            kms_key=cmk
        )

```

### Prompt Variants

Prompt variants in the context of Amazon Bedrock refer to alternative configurations of a prompt,
including its message or the model and inference configurations used. Prompt variants allow you
to create different versions of a prompt, test them, and save the variant that works best for
your use case. You can add prompt variants to a prompt by creating a `PromptVariant` object and
specify the variants on prompt creation, or by using the `.addVariant(..)` method on a `Prompt` object.

Example of `PromptVariant`:

**TypeScript**

```ts
...

const variant2 = PromptVariant.text({
  variantName: "variant2",
  model: claudeModel,
  promptVariables: [ "topic" ],
  promptText: "This is my second text prompt. Please summarize our conversation on: {{topic}}.",
  inferenceConfiguration: {
    temperature: 0.5,
    topP: 0.999,
    maxTokens: 2000,
  },
});

prompt1.addVariant(variant2);
```

Python

```python
        
        variant2 = bedrock.PromptVariant.text(
            variant_name="variant2",
            model=claude_model,
            prompt_variables=["topic"],
            prompt_text="This is my second text prompt. Please summarize our conversation on: {{topic}}.",
            inference_configuration={
                "temperature": 0.5,
                "topP": 0.999,
                "maxTokens": 2000,
            }
        )

        prompt.add_variant(variant2)
```

### Prompt routing

Amazon Bedrock intelligent prompt routing provides a single serverless endpoint for efficiently routing requests between different foundational models within the same model family.
It can help you optimize for response quality and cost. They offer a comprehensive solution for managing multiple AI models through a single serverless endpoint, 
simplifying the process for you. Intelligent prompt routing predicts the performance of each model for each request, and dynamically routes each request to the model 
that it predicts is most likely to give the desired response at the lowest cost.
More information about prompt routing in the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html)

**TypeScript**

```ts
const variant = PromptVariant.text({
  variantName: 'variant1',
  promptText: 'What is the capital of France?',
  model: PromptRouter.fromDefaultId(DefaultPromptRouterIdentifier.ANTHROPIC_CLAUDE_V1, region),
});

new Prompt(stack, 'Prompt', {
  promptName: 'prompt-router-test',
  variants: [variant],
});
```

**Python**

```py
variant = bedrock.PromptVariant.text(
    variant_name='variant1',
    prompt_text='What is the capital of France?',
    model=bedrock.PromptRouter.from_default_id(bedrock.DefaultPromptRouterIdentifier.ANTHROPIC_CLAUDE_V1, region),
)

bedrock.Prompt(self, 'Prompt',
    prompt_name='prompt-router-test',
    variants=[variant],
)
```

### Prompt Version

A prompt version is a snapshot of a prompt at a specific point in time that you
create when you are satisfied with a set of configurations. Versions allow you
to deploy your prompt and easily switch between different configurations for your
prompt and update your application with the most appropriate version for your
use-case.

You can create a Prompt version by using the `PromptVersion` class or by using the `.createVersion(..)`
on a `Prompt` object. It is recommended to use the `.createVersion(..)` method. It uses a hash based mechanism
to update the version whenever a certain configuration property changes.

**TypeScript**

```ts
new PromptVersion(prompt1, 'my first version');
```

```python
bedrock.PromptVersion(self, "my first version")

```

or alternatively:

```ts
prompt1.createVersion('my first version');
```

```python
prompt.create_version("version1", "my first version")
```

## System defined inference profiles

You can build a CrossRegionInferenceProfile using a system defined inference profile. The inference profile will route requests to the Regions defined in the cross region (system-defined) inference profile that you choose. You can find the system defined inference profiles by navigating to your console (Amazon Bedrock -> Cross-region inference) or programmatically, for instance using [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock/client/list_inference_profiles.html).

Before using creating a CrossRegionInferenceProfile, ensure that you have access to the models and regions defined in the inference profiles. For instance, if you see the system defined inference profile "us.anthropic.claude-3-5-sonnet-20241022-v2:0" defined in your region, the table mentions that inference requests will be routed to US East (Virginia) us-east-1, US East (Ohio) us-east-2 and US West (Oregon) us-west-2. Thus, you need to have model access enabled in those regions for the model `anthropic.claude-3-5-sonnet-20241022-v2:0`. You can then create the CrossRegionInferenceProfile as follows:

TypeScript

```ts
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
});
```

Python

```python
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0
)
```

## Application inference profile

You can create an application inference profile with one or more Regions to track usage and costs when invoking a model.

To create an application inference profile for one Region, specify a foundation model. Usage and costs for requests made to that Region with that model will be tracked.

To create an application inference profile for multiple Regions, specify a cross region (system-defined) inference profile. The inference profile will route requests to the Regions defined in the cross region (system-defined) inference profile that you choose. Usage and costs for requests made to the Regions in the inference profile will be tracked. You can find the system defined inference profiles by navigating to your console (Amazon Bedrock -> Cross-region inference) or programmatically, for instance using [boto3](https://boto3.amazonaws.com/v1/documentation/api/latest/reference/services/bedrock/client/list_inference_profiles.html):

```
bedrock = session.client("bedrock", region_name="us-east-1")
bedrock.list_inference_profiles(typeEquals='SYSTEM_DEFINED')
```

Before using application inference profiles, ensure that:

- You have appropriate IAM permissions
- You have access to the models and regions defined in the inference profiles
- Ensure proper configuration of the required API permissions for inference profile-related actions

Specifically the role you are assuming needs to have permissions for following actions in the IAM policy

```
"Action": [
      "bedrock:GetInferenceProfile",
      "bedrock:ListInferenceProfiles",
      "bedrock:DeleteInferenceProfile"
      "bedrock:TagResource",
      "bedrock:UntagResource",
      "bedrock:ListTagsForResource"
  ]
```

You can restrict to specific resources by applying "Resources" tag in the IAM policy.

```
"Resource": ["arn:aws:bedrock:*:*:application-inference-profile/*"]
```

TypeScript

```ts
// Create an application inference profile for one Region
// You can use the 'bedrock.BedrockFoundationModel' or pass the arn as a string
const appInfProfile1 = new ApplicationInferenceProfile(this, 'myapplicationprofile', {
  inferenceProfileName: 'claude 3 sonnet v1',
  modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  tags: [{ key: 'test', value: 'test' }],
});

// To create an application inference profile across regions, specify the cross region inference profile
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
});

const appInfProfile2 = new ApplicationInferenceProfile(this, 'myapplicationprofile2', {
  inferenceProfileName: 'claude 3 sonnet v1',
  modelSource: cris,
});

// Import a Cfn L1 construct created application inference profile
const cfnapp = new CfnApplicationInferenceProfile(this, 'mytestaip3', {
  inferenceProfileName: 'mytest',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
  },
});

const appInfProfile3 = bedrock.ApplicationInferenceProfile.fromCfnApplicationInferenceProfile(cfnapp);

// Import an inference profile through attributes
const appInfProfile4 = bedrock.ApplicationInferenceProfile.fromApplicationInferenceProfileAttributes(this, 'TestAIP', {
  inferenceProfileArn: 'arn:aws:bedrock:us-east-1:XXXXX:application-inference-profile/ID',
  inferenceProfileIdentifier: 'arn:aws:bedrock:us-east-1:XXXXXXX:application-inference-profile/ID',
});
```

Python

```python

# Create an application inference profile for one Region
# You can use the 'bedrock.BedrockFoundationModel' or pass the arn as a string
appInfProfile1 = bedrock.ApplicationInferenceProfile(self, 'myapplicationprofile',
  inference_profile_name='claude 3 sonnet v1',
  model_source=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  tags=[CfnTag(
    key="key",
    value="value"
  )]
)

# To create an application inference profile across regions, specify the cross region inference profile
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0
)

appInfProfile2 = bedrock.ApplicationInferenceProfile(self, 'myapplicationprofile2',
  inference_profile_name='claude 35 sonnet v2',
  model_source=cris
)

# Import an inference profile through attributes
appInfProfile3 = bedrock.ApplicationInferenceProfile.from_application_inference_profile_attributes(self, 'TestAIP',
  inference_profile_arn='arn:aws:bedrock:us-east-1:XXXXX:application-inference-profile/ID',
  inference_profile_identifier='arn:aws:bedrock:us-east-1:XXXXXXX:application-inference-profile/ID',
)

# Import a Cfn L1 construct created application inference profile
cfnaip = CfnApplicationInferenceProfile(this, 'mytestaip4',
  inference_profile_name='mytest',
  model_source= CfnApplicationInferenceProfile.InferenceProfileModelSourceProperty(
    copy_from='arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0'
  ),
)

appInfProfile4 = bedrock.ApplicationInferenceProfile.from_cfn_application_inference_profile(cfnaip);
```
