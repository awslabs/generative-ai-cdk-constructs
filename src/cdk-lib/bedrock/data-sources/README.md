# Amazon Bedrock Data Sources

Amazon Bedrock Data Sources provide a way to connect and manage various data sources for your knowledge bases. They allow you to ingest, process, and index data from different sources to make it available for your AI applications.

## Table of Contents

- [Supported Data Sources](#supported-data-sources)
- [Data Source Properties](#data-source-properties)
- [Creating a Data Source](#creating-a-data-source)
  - [S3 Data Source Example](#s3-data-source-example)
  - [Database Data Source Example](#database-data-source-example)
  - [Web Crawler Data Source Example](#web-crawler-data-source-example)
  - [Custom Data Source Example](#custom-data-source-example)
- [Data Processing Configuration](#data-processing-configuration)
  - [Chunking Strategies](#chunking-strategies)
  - [Parsing Strategies](#parsing-strategies)
  - [Context Enrichment](#context-enrichment)
- [Import Methods](#import-methods)

## Supported Data Sources

Amazon Bedrock supports the following types of data sources:

1. **S3 Data Sources**
   - Connect to S3 buckets containing documents, text files, or other data
   - Support for various file formats (PDF, DOCX, TXT, etc.)
   - Automatic content extraction and processing

2. **Database Data Sources**
   - Connect to relational databases (RDS, Aurora)
   - Support for NoSQL databases (DynamoDB)
   - Real-time data synchronization

3. **Web Crawler Data Sources**
   - Crawl web pages from specified URLs
   - Configure crawling scope and rate
   - Filter content using include/exclude patterns

4. **Custom Data Sources**
   - Create custom data sources for specialized use cases
   - Implement custom data processing logic
   - Integrate with external systems

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
const dataSource = new S3DataSource(this, 'MyS3DataSource', {
  dataSourceName: 'my-s3-data-source',
  description: 'Data source for company documents',
  s3Bucket: 'my-company-documents',
  s3Prefix: 'documents/',
  dataSourceConfiguration: {
    chunkingConfiguration: {
      chunkSize: 1000,
      chunkOverlap: 100,
    },
    documentProcessingConfiguration: {
      textExtractionConfiguration: {
        enableTextExtraction: true,
      },
    },
  },
});
```

#### Python

```python
data_source = bedrock.S3DataSource(
    self,
    "MyS3DataSource",
    data_source_name="my-s3-data-source",
    description="Data source for company documents",
    s3_bucket="my-company-documents",
    s3_prefix="documents/",
    data_source_configuration={
        "chunkingConfiguration": {
            "chunkSize": 1000,
            "chunkOverlap": 100,
        },
        "documentProcessingConfiguration": {
            "textExtractionConfiguration": {
                "enableTextExtraction": True,
            },
        },
    }
)
```

### Database Data Source Example

#### TypeScript

```ts
const dbDataSource = new DatabaseDataSource(this, 'MyDBDataSource', {
  dataSourceName: 'my-db-data-source',
  description: 'Data source for product information',
  connectionConfiguration: {
    databaseType: 'RDS',
    connectionString: 'postgresql://user:password@host:5432/dbname',
    vpcConfiguration: {
      vpcId: 'vpc-12345678',
      subnetIds: ['subnet-1', 'subnet-2'],
      securityGroupIds: ['sg-12345678'],
    },
  },
  dataSourceConfiguration: {
    tableConfigurations: [
      {
        tableName: 'products',
        columnConfigurations: [
          {
            columnName: 'description',
            dataType: 'TEXT',
          },
        ],
      },
    ],
  },
});
```

#### Python

```python
db_data_source = bedrock.DatabaseDataSource(
    self,
    "MyDBDataSource",
    data_source_name="my-db-data-source",
    description="Data source for product information",
    connection_configuration={
        "databaseType": "RDS",
        "connectionString": "postgresql://user:password@host:5432/dbname",
        "vpcConfiguration": {
            "vpcId": "vpc-12345678",
            "subnetIds": ["subnet-1", "subnet-2"],
            "securityGroupIds": ["sg-12345678"],
        },
    },
    data_source_configuration={
        "tableConfigurations": [
            {
                "tableName": "products",
                "columnConfigurations": [
                    {
                        "columnName": "description",
                        "dataType": "TEXT",
                    },
                ],
            },
        ],
    }
)
```

### Web Crawler Data Source Example

#### TypeScript

```ts
const webCrawlerDataSource = new WebCrawlerDataSource(this, 'MyWebCrawlerDataSource', {
  dataSourceName: 'my-web-crawler-data-source',
  description: 'Data source for company website',
  sourceUrls: ['https://www.example.com'],
  crawlingScope: CrawlingScope.SUBDOMAINS,
  crawlingRate: 300,
  filters: {
    includePatterns: ['/blog/', '/docs/'],
    excludePatterns: ['/private/', '/admin/'],
  },
  maxPages: 1000,
});
```

#### Python

```python
web_crawler_data_source = bedrock.WebCrawlerDataSource(
    self,
    "MyWebCrawlerDataSource",
    data_source_name="my-web-crawler-data-source",
    description="Data source for company website",
    source_urls=["https://www.example.com"],
    crawling_scope=bedrock.CrawlingScope.SUBDOMAINS,
    crawling_rate=300,
    filters={
        "includePatterns": ["/blog/", "/docs/"],
        "excludePatterns": ["/private/", "/admin/"],
    },
    max_pages=1000,
)
```

### Custom Data Source Example

#### TypeScript

```ts
const customDataSource = new CustomDataSource(this, 'MyCustomDataSource', {
  dataSourceName: 'my-custom-data-source',
  description: 'Custom data source for specialized data',
  knowledgeBase: myKnowledgeBase,
  // Add custom configuration as needed
});
```

#### Python

```python
custom_data_source = bedrock.CustomDataSource(
    self,
    "MyCustomDataSource",
    data_source_name="my-custom-data-source",
    description="Custom data source for specialized data",
    knowledge_base=my_knowledge_base,
    # Add custom configuration as needed
)
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
  and splits it into chunks using a predefined approach. It is suitable for most use cases
  but may not be optimal for specific document types or requirements.

- **Foundation Model Parsing Strategy**: This strategy uses a foundation model to describe
  the contents of the document. It is particularly useful for improved processing of PDF files
  with tables and images. To use this strategy, set the `parsingStrategy` in a data source as below.

#### TypeScript

  ```ts
  bedrock.ParsingStategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  });
  ```

#### Python

  ```python
  bedrock.ParsingStategy.foundation_model(
      parsing_model=BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0
  )
  ```

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