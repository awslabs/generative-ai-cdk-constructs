# Amazon Bedrock Data Sources

Amazon Bedrock Data Sources provide a way to connect and manage various data sources for your knowledge bases. They allow you to ingest, process, and index data from different sources to make it available for your AI applications.

## Table of Contents

- [Supported Data Sources](#supported-data-sources)
- [Creating a Data Source](#creating-a-data-source)
  - [S3 Data Source Example](#s3-data-source-example)
  - [Database Data Source Example](#database-data-source-example)
  - [Web Crawler Data Source Example](#web-crawler-data-source-example)
  - [Custom Data Source Example](#custom-data-source-example)
- [Data Source Properties](#data-source-properties)
- [Data Processing Configuration](#data-processing-configuration)
  - [Chunking Strategies](#chunking-strategies)
  - [Parsing Strategies](#parsing-strategies)
  - [Context Enrichment](#context-enrichment)
- [Permissions and Methods](#permissions-and-methods)
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

## Data Source Properties

Common properties for all data sources:

| Property | Type | Description |
|----------|------|-------------|
| dataSourceName | string | The name of the data source. |
| description | string | A description of the data source. |
| roleArn | string | The ARN of the IAM role that Bedrock can assume to access the data source. |
| tags | object | Key-value pairs to tag the data source. |

## Data Processing Configuration

### Chunking Strategies

Amazon Bedrock provides several chunking strategies to split your source data:

#### Fixed Size Chunking Example

##### TypeScript

```ts
const chunkingStrategy = ChunkingStrategy.fixedSize({
  maxTokens: 300,
  overlapPercentage: 20,
});
```

#### Hierarchical Chunking Example

##### TypeScript

```ts
const chunkingStrategy = ChunkingStrategy.hierarchical({
  maxTokens: 500,
  overlapPercentage: 10,
  hierarchyLevels: ['title', 'section', 'paragraph'],
});
```

### Parsing Strategies

Amazon Bedrock provides various parsing strategies to extract content from different file formats:

#### PDF Parsing Example

##### TypeScript

```ts
const parsingStrategy = ParsingStrategy.pdf({
  extractImages: true,
  extractTables: true,
});
```

#### HTML Parsing Example

##### TypeScript

```ts
const parsingStrategy = ParsingStrategy.html({
  extractLinks: true,
  extractMetadata: true,
});
```

### Context Enrichment

Amazon Bedrock allows you to enrich your data with additional context:

#### Metadata Enrichment Example

##### TypeScript

```ts
const enrichmentStrategy = EnrichmentStrategy.metadata({
  metadataFields: ['author', 'date', 'category'],
});
```

#### Entity Recognition Example

##### TypeScript

```ts
const enrichmentStrategy = EnrichmentStrategy.entityRecognition({
  entityTypes: ['PERSON', 'ORGANIZATION', 'LOCATION'],
});
```

## Permissions and Methods

### Data Source Methods

| Method | Description |
|--------|-------------|
| `startIngestionJob()` | Starts a new ingestion job for the data source |
| `stopIngestionJob(jobId)` | Stops a running ingestion job |
| `getIngestionJob(jobId)` | Gets information about a specific ingestion job |
| `listIngestionJobs()` | Lists all ingestion jobs for the data source |

### S3 Data Source Methods

| Method | Description |
|--------|-------------|
| `updateS3Prefix(prefix)` | Updates the S3 prefix for the data source |
| `updateS3Bucket(bucket)` | Updates the S3 bucket for the data source |

### Web Crawler Data Source Methods

| Method | Description |
|--------|-------------|
| `updateSourceUrls(urls)` | Updates the source URLs for the web crawler |
| `updateCrawlingScope(scope)` | Updates the crawling scope for the web crawler |
| `updateCrawlingRate(rate)` | Updates the crawling rate for the web crawler |

## Import Methods

### TypeScript

```ts
// Import an existing data source by ARN
const importedDataSource = bedrock.DataSource.fromDataSourceAttributes(this, 'ImportedDataSource', {
  dataSourceArn: 'arn:aws:bedrock:region:account:data-source/data-source-id',
  roleArn: 'arn:aws:iam::account:role/role-name',
});

// Import an existing data source by name
const importedDataSourceByName = bedrock.DataSource.fromDataSourceName(this, 'ImportedDataSourceByName', {
  dataSourceName: 'my-data-source',
});
```

### Python

```python
# Import an existing data source by ARN
imported_data_source = bedrock.DataSource.from_data_source_attributes(
    self, 
    'ImportedDataSource',
    data_source_arn='arn:aws:bedrock:region:account:data-source/data-source-id',
    role_arn='arn:aws:iam::account:role/role-name'
)

# Import an existing data source by name
imported_data_source_by_name = bedrock.DataSource.from_data_source_name(
    self, 
    'ImportedDataSourceByName',
    data_source_name='my-data-source'
)
```