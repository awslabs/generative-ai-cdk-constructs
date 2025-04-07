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
- [Best Practices](#best-practices)

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

#### TypeScript Example

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

#### Python Example

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

#### TypeScript Example

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

#### Python Example

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

#### TypeScript Example

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

#### Python Example

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

#### TypeScript Example

```ts
const customDataSource = new CustomDataSource(this, 'MyCustomDataSource', {
  dataSourceName: 'my-custom-data-source',
  description: 'Custom data source for specialized data',
  knowledgeBase: myKnowledgeBase,
  // Add custom configuration as needed
});
```

#### Python Example

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

1. **Fixed Size Chunking**
   ```ts
   const chunkingStrategy = ChunkingStrategy.fixedSize({
     maxTokens: 300,
     overlapPercentage: 20,
   });
   ```

2. **Hierarchical Chunking**
   ```ts
   const chunkingStrategy = ChunkingStrategy.hierarchical({
     overlapTokens: 60,
     maxParentTokenSize: 1500,
     maxChildTokenSize: 300,
   });
   ```

3. **Semantic Chunking**
   ```ts
   const chunkingStrategy = ChunkingStrategy.semantic({
     // Configuration for semantic chunking
   });
   ```

4. **No Chunking**
   ```ts
   const chunkingStrategy = ChunkingStrategy.noChunking();
   ```

### Parsing Strategies

Amazon Bedrock supports advanced parsing strategies:

1. **Foundation Model Parsing**
   ```ts
   const parsingStrategy = ParsingStategy.foundationModel({
     parsingModel: myModel,
     parsingPrompt: "Custom parsing instructions",
     parsingModality: ParsingModality.MULTIMODAL,
   });
   ```

2. **Data Automation Parsing**
   ```ts
   const parsingStrategy = ParsingStategy.dataAutomation({
     // Configuration for data automation parsing
   });
   ```

### Context Enrichment

Enhance your data with additional context:

```ts
const contextEnrichment = ContextEnrichment.foundationModel({
  enrichmentModel: myModel,
});
```

## Permissions and Methods

### Common Methods

All data sources inherit the following methods:

| Method | Description |
|--------|-------------|
| `grantRead(principal)` | Grants read permissions to the specified principal |
| `grantWrite(principal)` | Grants write permissions to the specified principal |
| `grantDelete(principal)` | Grants delete permissions to the specified principal |
| `grantInvoke(principal)` | Grants invoke permissions to the specified principal |

### S3 Data Source Methods

| Method | Description |
|--------|-------------|
| `grantBucketRead(principal)` | Grants read permissions to the S3 bucket |
| `grantBucketWrite(principal)` | Grants write permissions to the S3 bucket |
| `grantBucketDelete(principal)` | Grants delete permissions to the S3 bucket |

### Web Crawler Data Source Methods

| Method | Description |
|--------|-------------|
| `grantCrawl(principal)` | Grants permissions to crawl specified URLs |
| `grantProcess(principal)` | Grants permissions to process crawled content |

## Import Methods

### S3 Data Source

```ts
// Import an existing S3 data source
const s3DataSource = S3DataSource.fromS3DataSourceArn(this, 'ImportedS3DataSource', 'arn:aws:bedrock:region:account:data-source/data-source-id');

// Import an existing S3 data source by name
const s3DataSourceByName = S3DataSource.fromS3DataSourceName(this, 'ImportedS3DataSourceByName', 'my-s3-data-source');
```

### Web Crawler Data Source

```ts
// Import an existing web crawler data source
const webCrawlerDataSource = WebCrawlerDataSource.fromWebCrawlerDataSourceArn(this, 'ImportedWebCrawlerDataSource', 'arn:aws:bedrock:region:account:data-source/data-source-id');

// Import an existing web crawler data source by name
const webCrawlerDataSourceByName = WebCrawlerDataSource.fromWebCrawlerDataSourceName(this, 'ImportedWebCrawlerDataSourceByName', 'my-web-crawler-data-source');
```

### Custom Data Source

```ts
// Import an existing custom data source
const customDataSource = CustomDataSource.fromCustomDataSourceArn(this, 'ImportedCustomDataSource', 'arn:aws:bedrock:region:account:data-source/data-source-id');

// Import an existing custom data source by name
const customDataSourceByName = CustomDataSource.fromCustomDataSourceName(this, 'ImportedCustomDataSourceByName', 'my-custom-data-source');
```

## Best Practices

1. **Data Organization**
   - Organize your data sources logically by purpose or domain
   - Use meaningful names and descriptions
   - Tag data sources appropriately for better management

2. **Security**
   - Use IAM roles with least privilege
   - Encrypt sensitive data
   - Use VPC endpoints when accessing private resources

3. **Performance**
   - Configure appropriate chunking settings for your use case
   - Monitor data source performance and adjust settings as needed
   - Use appropriate indexing strategies

4. **Maintenance**
   - Regularly update data sources to keep information current
   - Monitor for errors or issues
   - Clean up unused or obsolete data sources

5. **Integration**
   - Test data source connections before deploying to production
   - Document data source configurations and dependencies
   - Implement proper error handling and retry mechanisms 