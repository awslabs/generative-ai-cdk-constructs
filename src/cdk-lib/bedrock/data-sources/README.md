# Amazon Bedrock Data Sources

Amazon Bedrock Data Sources provide a way to connect and manage various data sources for your knowledge bases. They allow you to ingest, process, and index data from different sources to make it available for your AI applications.

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

3. **API Data Sources**
   - Connect to REST APIs
   - Support for GraphQL endpoints
   - Custom data transformation

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

## Data Source Properties

Common properties for all data sources:

| Property | Type | Description |
|----------|------|-------------|
| dataSourceName | string | The name of the data source. |
| description | string | A description of the data source. |
| roleArn | string | The ARN of the IAM role that Bedrock can assume to access the data source. |
| tags | object | Key-value pairs to tag the data source. |

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