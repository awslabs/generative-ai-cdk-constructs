# Amazon Bedrock Data Sources

Amazon Bedrock Data Sources provide a way to connect and manage various data sources for your knowledge bases. They allow you to ingest, process, and index data from different sources to make it available for your AI applications.

## Table of Contents

- [Supported Data Sources](#supported-data-sources)
- [Data Source Properties](#data-source-properties)
- [Creating a Data Source](#creating-a-data-source)
  - [S3 Data Source Example](#s3-data-source-example)
  - [Web Crawler Data Source Example](#web-crawler-data-source-example)
  - [Confluence Data Source Example](#confluence-data-source-example)
  - [Salesforce Data Source Example](#salesforce-data-source-example)
  - [Sharepoint Data Source Example](#sharepoint-data-source-example)
  - [Custom Data Source Example](#custom-data-source-example)
- [Data Processing Configuration](#data-processing-configuration)
  - [Chunking Strategies](#chunking-strategies)
  - [Parsing Strategies](#parsing-strategies)
  - [Context Enrichment](#context-enrichment)
- [Import Methods](#import-methods)

## Supported Data Sources

Amazon Bedrock supports the following types of data sources: 

- S3
- Web Crawler
- Confluence
- Salesforce
- Sharepoint
- Custom

## Data Source Properties

Common properties for all data sources:

| Property | Type | Description |
|----------|------|-------------|
| dataSourceName | string | The name of the data source. |
| description | string | A description of the data source. |
| roleArn | string | The ARN of the IAM role that Bedrock can assume to access the data source. |
| tags | object | Key-value pairs to tag the data source. |

## Creating a Data Source

### S3 Data Source Example

#### TypeScript

```ts
const docBucket = new s3.Bucket(this, 'DocBucket');

const dataSource = new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'mydatasource',
  chunkingStrategy: bedrock.ChunkingStrategy.fixedSize({
    maxTokens: 500,
    overlapPercentage: 20
  }),
});
```

#### Python

```python
doc_bucket = s3.Bucket(self, 'DockBucket')

data_source = bedrock.S3DataSource(self, 'DataSource', 
  bucket=doc_bucket,
  knowledge_base=kb,
  data_source_name='mydatasource',
  chunking_strategy=bedrock.ChunkingStrategy.fixed_size(
    max_tokens=500,
    overlap_percentage=20
  ),
)
```

### Web Crawler Data Source Example

#### TypeScript

```ts
const dataSource = new bedrock.WebCrawlerDataSource(this, 'DataSource', {
  knowledgeBase: kb,
  sourceUrls: ['https://docs.aws.amazon.com/'],
  chunkingStrategy: ChunkingStrategy.HIERARCHICAL_COHERE,
  customTransformation: CustomTransformation.lambda({
    lambdaFunction: lambdaFunction,
    s3BucketUri: `s3://${bucket.bucketName}/chunk-processor/`,
  }),
});
```

#### Python

```python
data_source = bedrock.WebCrawlerDataSource(self, 'wcDataSource', 
  knowledge_base=kb,
  source_urls= ['https://docs.aws.amazon.com/'],
  chunking_strategy= bedrock.ChunkingStrategy.HIERARCHICAL_COHERE,
  custom_transformation= bedrock.CustomTransformation.lambda_(
      lambda_function= function,
      s3_bucket_uri= f's3://{docBucket.bucket_name}/chunk-processor/'
  )
)
```

### Confluence Data Source Example

#### TypeScript

```ts
const secret = new Secret(stack, 'Secret');
const key = new Key(stack, 'Key');

const dataSource = new bedrock.ConfluenceDataSource(this, 'webds', {
  knowledgeBase: kb,
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
```

#### Python

```python
secret = secretsmanager.Secret(self, 'Secret')
key = kms.Key(self, 'Key')

dataSource = bedrock.ConfluenceDataSource(self, 'confds',
    knowledge_base=kb,
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
```

### Salesforce Data Source Example

#### TypeScript

```ts
const secret = new Secret(stack, 'Secret');
const key = new Key(stack, 'Key');

const dataSource = new bedrock.SalesforceDataSource(this, 'sfds', {
  knowledgeBase: kb,
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
```

#### Python

```python
secret = secretsmanager.Secret(self, 'Secret')
key = kms.Key(self, 'Key')

bedrock.SalesforceceDataSource(self, 'confds',
    knowledge_base=kb,
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
```

### Sharepoint Data Source Example

#### TypeScript

```ts
const secret = new Secret(stack, 'Secret');
const key = new Key(stack, 'Key');

const dataSource = new bedrock.SharepointDataSource(this, 'spds', {
  knowledgeBase: kb,
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
```

#### Python

```python
secret = secretsmanager.Secret(self, 'Secret')
key = kms.Key(self, 'Key')

bedrock.SalesforceceDataSource(self, 'confds',
    knowledge_base=kb,
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
```

### Custom Data Source Example

#### TypeScript

```ts
const customDataSource = new CustomDataSource(this, 'MyCustomDataSource', {
  knowledgeBase: kb,
  dataSourceName: 'my-custom-data-source',
  description: 'Custom data source for specialized data',
  knowledgeBase: myKnowledgeBase,
  // Add custom configuration as needed
});
```

#### Python

```python
customDataSource = new CustomDataSource(self, 'MyCustomDataSource',
  knowledge_base=kb,
  data_source_name='CustomDataSource',
  chunking_strategy=bedrock.ChunkingStrategy.FIXED_SIZE,
  knowledge_base=kb,
);
```

## Data Processing Configuration

### Chunking Strategies

Amazon Bedrock provides several chunking strategies to split your source data:

#### Default Chunking

Applies Fixed Chunking with the default chunk size of 300 tokens and 20% overlap.

##### TypeScript

  ```ts
  ChunkingStrategy.DEFAULT;
  ```

##### Python

  ```python
  ChunkingStrategy.DEFAULT
  ```

#### Fixed Size Chunking Example

This method divides the data into fixed-size chunks, with each chunk containing a predetermined number of tokens. This strategy is useful when the data is uniform in size and structure. Typescript

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

#### Hierarchical Chunking

This strategy organizes data into layers of chunks, with the first
  layer containing large chunks and the second layer containing smaller chunks derived from the first.
  It is ideal for data with inherent hierarchies or nested structures.

##### TypeScript

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

##### Python

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

#### Semantic chunking

 This method splits data into smaller documents based on groups of similar
  content derived from the text using natural language processing. It helps preserve contextual
  relationships and ensures accurate and contextually appropriate results.

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

#### No Chunking

 This strategy treats each file as one chunk. If you choose this option,
  you may want to pre-process your documents by splitting them into separate files.

  TypeScript

  ```ts
  ChunkingStrategy.NONE;
  ```

  Python

  ```python
  ChunkingStrategy.NONE
  ```

### Parsing Strategies

A parsing strategy in Amazon Bedrock is a configuration that determines how the service
processes and interprets the contents of a document. It involves converting the document's
contents into text and splitting it into smaller chunks for analysis. Amazon Bedrock offers
two parsing strategies:

- **Default Parsing Strategy**: This strategy converts the document's contents into text
  and splits it into chunks using a predefined approach. It only parses text in text files,
  including .txt, .md, .html, .doc/.docx, .xls/.xlsx, and .pdf files. This parser doesn't incur any usage charges.

- **Foundation Model Parsing Strategy**: This strategy uses a foundation model to describe
  the contents of the document. It is particularly useful for improved processing of PDF files
  with tables and images. To use this strategy, set the `parsingStrategy` in a data source as below. 
  For the list of supported models, please refer to the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/knowledge-base-supported.html#knowledge-base-supported-parsing)

#### TypeScript

  ```ts
  bedrock.ParsingStrategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  });
  ```

#### Python

  ```python
  bedrock.ParsingStrategy.foundation_model(
      parsing_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0
  )
  ```

- **Bedrock Data Automation**: A fully-managed service that effectively processes multimodal data, without the need to provide any additional prompting. The cost of this parser depends on the number of pages in the document or number of images to be processed. Currently, only documents and images are supported, using standard output.

#### TypeScript
   ```ts
   const parsingStrategy = ParsingStrategy.bedrockDataAutomation();
   ```

#### Python
  ```python
  bedrock.ParsingStrategy.bedrock_data_automation()
  ```

If the chosen parsing strategy fails to parse a file, the Amazon Bedrock default parser is used as a fallback.

> warning
> If you choose Amazon Bedrock Data Automation or foundation models as a parser, the method that you choose will be used to parse all .pdf files in your data source, even if  the .pdf files contain only text. The default parser won’t be used to parse these .pdf files. Your account incurs charges for the use of Amazon Bedrock Data Automation or the foundation model in parsing these files.

For additional information regarding parsing, please refer to the [parsing documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/kb-advanced-parsing.html)

### Context Enrichment

Context Enrichment in Amazon Bedrock is a feature that allows you to enhance the context of your documents during the ingestion process. This is particularly useful for applications like Neptune GraphRAG, where you need to extract entities from chunks to build a knowledge graph.

Currently, context enrichment is only supported when using Neptune Analytics as a storage configuration.

The enrichment process uses Amazon Bedrock foundation models to perform operations like chunk entity extraction. To configure context enrichment, set the contextEnrichment in a data source as below.

#### Metadata Enrichment Example

##### TypeScript

```ts
bedrock.ContextEnrichment.foundationModel({
  enrichmentModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0,
});
```

##### Python

```py
bedrock.ContextEnrichment.foundation_model(
  enrichment_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_HAIKU_V1_0
)
```

## Import Methods

You can import existing data sources using the `fromDataSourceId` method.

### TypeScript

```ts
// Import an existing data source by ID
const importedDataSource = bedrock.DataSource.fromDataSourceId(this, 'ImportedDataSource', 'data-source-id');
```

### Python

```python
# Import an existing data source by ID
imported_data_source = bedrock.DataSource.from_data_source_id(
    self, 
    'ImportedDataSource',
    data_source_id='data-source-id'
)
```