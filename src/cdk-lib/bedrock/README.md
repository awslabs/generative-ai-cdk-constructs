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

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of foundation models (FMs) along with a broad set of capabilities for building generative AI applications.

This construct library includes CloudFormation L1 resources to deploy Bedrock features.

## Table of contents

- [API](#api)
- [Knowledge Bases](#knowledge-bases)
- [Agents](#agents)

## API

See the [API documentation](../../../apidocs/namespaces/bedrock/README.md).

## Knowledge Bases

With Knowledge Bases for Amazon Bedrock, you can give FMs and agents contextual information from your company’s private data sources for Retrieval Augmented Generation (RAG) to deliver more relevant, accurate, and customized responses.

### Create a Knowledge Base

A vector index on a vector store is required to create a Knowledge Base. This construct currently supports [Amazon OpenSearch Serverless](../opensearchserverless), [Amazon RDS Aurora PostgreSQL](../amazonaurora/), [Pinecone](../pinecone/) . By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control. For other resources you need to have the vector stores already created and credentials stored in AWS Secrets Manager. For Aurora, the construct provides an option to create a default `AmazonAuroraDefaultVectorStore` construct that will provision the vector store backed by Amazon Aurora for you. To learn more you can read [here](../amazonaurora/README.md).

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

Amazon Bedrock Knowledge Bases currently only supports S3 as a data source. The `S3DataSource` resource is used to configure how the Knowledge Base handles the data source.

Example of `OpenSearch Serverless`:

TypeScript

```ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { bedrock } from "@cdklabs/generative-ai-cdk-constructs";

const kb = new bedrock.KnowledgeBase(this, "KnowledgeBase", {
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction:
    "Use this knowledge base to answer questions about books. " +
    "It contains the full text of novels.",
});

const docBucket = new s3.Bucket(this, "DocBucket");

new bedrock.S3DataSource(this, "DataSource", {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: "books",
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

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase',
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
    max_tokens=500,
    overlap_percentage=20
)

```

Example of `Amazon RDS Aurora PostgreSQL` (manual, you must have Amazon RDS Aurora PostgreSQL already created):

TypeScript

```ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { amazonaurora, bedrock } from "@cdklabs/generative-ai-cdk-constructs";

const auroraDbManual = new amazonaurora.AmazonAuroraVectorStore({
  resourceArn: "arn:aws:rds:your-region:123456789876:cluster:aurora-cluster-manual",
  databaseName: "bedrock_vector_db",
  tableName: "bedrock_integration.bedrock_kb",
  credentialsSecretArn: "arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name",
  primaryKeyField: "id",
  vectorField: "embedding",
  textField: "chunks",
  metadataField: "metadata",
});

const kb = new bedrock.KnowledgeBase(this, "KnowledgeBase", {
  vectorStore: auroraDbManual,
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
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    amazonaurora
)

aurora = amazonaurora.AmazonAuroraVectorStore(
    credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
    database_name='bedrock_vector_db',
    metadata_field='metadata',
    primary_key_field='id',
    resource_arn='arn:aws:rds:your-region:123456789876:cluster:aurora-cluster-manual',
    table_name='bedrock_integration.bedrock_kb',
    text_field='chunks',
    vector_field='embedding',
)

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase',
            vector_store= aurora,
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

Example of `Amazon RDS Aurora PostgreSQL` (default):

TypeScript

```ts
import * as s3 from "aws-cdk-lib/aws-s3";
import { amazonaurora, bedrock } from "@cdklabs/generative-ai-cdk-constructs";

const auroraDb = new amazonaurora.AmazonAuroraDefaultVectorStore(this, "AuroraDefaultVectorStore", {
  embeddingsModelVectorDimension: BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3.vectorDimensions!,
});

const kb = new bedrock.KnowledgeBase(this, "KnowledgeBase", {
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
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    amazonaurora
)

dimension = bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3.vector_dimensions

aurora = amazonaurora.AmazonAuroraDefaultVectorStore(self, 'AuroraDefaultVectorStore',
    embeddings_model_vector_dimension=dimension
)

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase',
            vector_store= aurora,
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
import * as s3 from "aws-cdk-lib/aws-s3";
import { pinecone, bedrock } from "@cdklabs/generative-ai-cdk-constructs";

const pineconeds = new pinecone.PineconeVectorStore({
  connectionString: "https://your-index-1234567.svc.gcp-starter.pinecone.io",
  credentialsSecretArn: "arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name",
  textField: "question",
  metadataField: "metadata",
});

const kb = new bedrock.KnowledgeBase(this, "KnowledgeBase", {
  vectorStore: pineconeds,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    pinecone
)

pineconevs = pinecone.PineconeVectorStore(
            connection_string='https://your-index-1234567.svc.gcp-starter.pinecone.io',
            credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
            text_field='question',
            metadata_field='metadata'
        )

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase',
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

#### Knowledge Base - Data Sources

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

Typescript

```ts
const app = new cdk.App();
const stack = new cdk.Stack(app, "aws-cdk-bedrock-data-sources-integ-test");

const kb = new KnowledgeBase(stack, "MyKnowledgeBase", {
  name: "MyKnowledgeBase",
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_MULTILINGUAL_V3,
});

const bucket = new Bucket(stack, "Bucket", {});
const lambdaFunction = new Function(stack, "MyFunction", {
  runtime: cdk.aws_lambda.Runtime.PYTHON_3_9,
  handler: "index.handler",
  code: cdk.aws_lambda.Code.fromInline('print("Hello, World!")'),
});

const secret = new Secret(stack, "Secret");
const key = new Key(stack, "Key");

kb.addWebCrawlerDataSource({
  sourceUrls: ["https://docs.aws.amazon.com/"],
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
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0.asIModel(stack),
  }),
});

kb.addConfluenceDataSource({
  dataSourceName: "TestDataSource",
  authSecret: secret,
  kmsKey: key,
  confluenceUrl: "https://example.atlassian.net",
  filters: [
    {
      objectType: ConfluenceObjectType.ATTACHMENT,
      includePatterns: [".*\\.pdf"],
      excludePatterns: [".*private.*\\.pdf"],
    },
    {
      objectType: ConfluenceObjectType.PAGE,
      includePatterns: [".*public.*\\.pdf"],
      excludePatterns: [".*confidential.*\\.pdf"],
    },
  ],
});

kb.addSalesforceDataSource({
  authSecret: secret,
  endpoint: "https://your-instance.my.salesforce.com",
  kmsKey: key,
  filters: [
    {
      objectType: SalesforceObjectType.ATTACHMENT,
      includePatterns: [".*\\.pdf"],
      excludePatterns: [".*private.*\\.pdf"],
    },
    {
      objectType: SalesforceObjectType.CONTRACT,
      includePatterns: [".*public.*\\.pdf"],
      excludePatterns: [".*confidential.*\\.pdf"],
    },
  ],
});

kb.addSharePointDataSource({
  dataSourceName: "SharepointDataSource",
  authSecret: secret,
  kmsKey: key,
  domain: "yourdomain",
  siteUrls: ["https://yourdomain.sharepoint.com/sites/mysite"],
  tenantId: "888d0b57-69f1-4fb8-957f-e1f0bedf64de",
  filters: [
    {
      objectType: SharePointObjectType.PAGE,
      includePatterns: [".*\\.pdf"],
      excludePatterns: [".*private.*\\.pdf"],
    },
    {
      objectType: SharePointObjectType.FILE,
      includePatterns: [".*public.*\\.pdf"],
      excludePatterns: [".*confidential.*\\.pdf"],
    },
  ],
});
```

#### Knowledge Base - Chunking Strategies

- **Default Chunking**: Applies Fixed Chunking with the default chunk size of 300 tokens and 20% overlap.

  ```ts
  ChunkingStrategy.DEFAULT;
  ```

- **Fixed Size Chunking**: This method divides the data into fixed-size chunks, with each chunk
  containing a predetermined number of tokens. This strategy is useful when the data is uniform
  in size and structure.
  Typescript

  ```ts
  // Fixed Size Chunking with sane defaults.
  ChunkingStrategy.FIXED_SIZE;

  // Fixed Size Chunking with custom values.
  ChunkingStrategy.fixedSize({ maxTokens: 200, overlapPercentage: 25 });
  ```

- **Hierarchical Chunking**: This strategy organizes data into layers of chunks, with the first
  layer containing large chunks and the second layer containing smaller chunks derived from the first.
  It is ideal for data with inherent hierarchies or nested structures.

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

- **Semantic Chunking**: This method splits data into smaller documents based on groups of similar
  content derived from the text using natural language processing. It helps preserve contextual
  relationships and ensures accurate and contextually appropriate results.

  ```ts
  // Semantic Chunking with sane defaults.
  ChunkingStrategy.SEMANTIC;

  // Semantic Chunking with custom values.
  ChunkingStrategy.semantic({ bufferSize: 0, breakpointPercentileThreshold: 95, maxTokens: 300 });
  ```

- **No Chunking**: This strategy treats each file as one chunk. If you choose this option,
  you may want to pre-process your documents by splitting them into separate files.

  ```ts
  ChunkingStrategy.NONE;
  ```

#### Knowledge Base - Parsing Strategy

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

  ```ts
  bedrock.ParsingStategy.foundationModel({
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0.asIModel(stack),
  });
  ```

#### Knowledge Base - Custom Transformation

Custom Transformation in Amazon Bedrock is a feature that allows you to create and apply
custom processing steps to documents moving through a data source ingestion pipeline.

Custom Transformation uses AWS Lambda functions to process documents, enabling you to
perform custom operations such as data extraction, normalization, or enrichment. To
create a custom transformation, set the `customTransformation` in a data source as below.

```ts
CustomTransformation.lambda({
  lambdaFunction: lambdaFunction,
  s3BucketUri: `s3://${bucket.bucketName}/chunk-processor/`,
}),
```

## Agents

Enable generative AI applications to execute multistep tasks across company systems and data sources.

### Create an Agent

The following example creates an Agent with a simple instruction and default prompts that consults a Knowledge Base.

TypeScript

```ts
const agent = new bedrock.Agent(this, "Agent", {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: "You are a helpful and friendly agent that answers questions about literature.",
});

agent.addKnowledgeBase([kb]);
```

Python

```python
agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
)
  agent.add_knowledge_base(kb);
```

### Action Groups

An action group defines functions your agent can call. The functions are Lambda functions. The action group uses an OpenAPI schema to tell the agent what your functions do and how to call them.

```ts
const actionGroupFunction = new lambda_python.PythonFunction(this, "ActionGroupFunction", {
  runtime: lambda.Runtime.PYTHON_3_12,
  entry: path.join(__dirname, "../lambda/action-group"),
});

const actionGroup = new bedrock.AgentActionGroup(this, "MyActionGroup", {
  actionGroupName: "query-library",
  description: "Use these functions to get information about the books in the library.",
  actionGroupExecutor: {
    lambda: actionGroupFunction,
  },
  actionGroupState: "ENABLED",
  apiSchema: bedrock.ApiSchema.fromAsset(path.join(__dirname, "action-group.yaml")),
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

actionGroup = bedrock.AgentActionGroup(self,
    "MyActionGroup",
    action_group_name="query-library",
    description="Use these functions to get information about the books in the library.",
    action_group_executor= bedrock.ActionGroupExecutor(
      lambda_=action_group_function
    ),
    action_group_state="ENABLED",
    api_schema=bedrock.ApiSchema.from_asset("action-group.yaml"))

agent.add_action_group(actionGroup)
```

### Prepare the Agent

The `Agent` constructs take an optional parameter `shouldPrepareAgent` to indicate that the Agent should be prepared after any updates to an agent, Knowledge Base association, or action group. This may increase the time to create and update those resources. By default, this value is false .

Creating an agent alias will not prepare the agent, so if you create an alias with `addAlias` or by providing an `aliasName` when creating the agent then you should set `shouldPrepareAgent` to **_true_**.

#### Prompt Overrides

Bedrock Agents allows you to customize the prompts and LLM configuration for its different steps. You can disable steps or create a new prompt template. Prompt templates can be inserted from plain text files.

TypeScript

```ts
import { readFileSync } from "fs";

const orchestration = readFileSync("prompts/orchestration.txt", "utf-8");
const agent = new bedrock.Agent(this, "Agent", {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: "You are a helpful and friendly agent that answers questions about literature.",
  promptOverrideConfiguration: {
    promptConfigurations: [
      {
        promptType: bedrock.PromptType.PRE_PROCESSING,
        promptState: bedrock.PromptState.DISABLED,
        promptCreationMode: bedrock.PromptCreationMode.OVERRIDDEN,
        basePromptTemplate: "disabled",
        inferenceConfiguration: {
          temperature: 0.0,
          topP: 1,
          topK: 250,
          maximumLength: 1,
          stopSequences: ["\n\nHuman:"],
        },
      },
      {
        promptType: bedrock.PromptType.ORCHESTRATION,
        basePromptTemplate: orchestration,
        promptState: bedrock.PromptState.ENABLED,
        promptCreationMode: bedrock.PromptCreationMode.OVERRIDDEN,
        inferenceConfiguration: {
          temperature: 0.0,
          topP: 1,
          topK: 250,
          maximumLength: 2048,
          stopSequences: ["</invoke>", "</answer>", "</error>"],
        },
      },
    ],
  },
});
```

Python

```python
orchestration = open('prompts/orchestration.txt', encoding="utf-8").read()
agent = bedrock.Agent(self, "Agent",
            foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
            instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
            prompt_override_configuration= bedrock.PromptOverrideConfiguration(
                prompt_configurations=[
                    bedrock.PromptConfiguration(
                        prompt_type=bedrock.PromptType.PRE_PROCESSING,
                        prompt_state=bedrock.PromptState.DISABLED,
                        prompt_creation_mode=bedrock.PromptCreationMode.OVERRIDDEN,
                        base_prompt_template="disabled",
                        inference_configuration=bedrock.InferenceConfiguration(
                            temperature=0.0,
                            top_k=250,
                            top_p=1,
                            maximum_length=1,
                            stop_sequences=['\n\nHuman:'],
                        )
                    ),
                    bedrock.PromptConfiguration(
                        prompt_type=bedrock.PromptType.ORCHESTRATION,
                        prompt_state=bedrock.PromptState.ENABLED,
                        prompt_creation_mode=bedrock.PromptCreationMode.OVERRIDDEN,
                        base_prompt_template=orchestration,
                        inference_configuration=bedrock.InferenceConfiguration(
                            temperature=0.0,
                            top_k=250,
                            top_p=1,
                            maximum_length=2048,
                            stop_sequences=['</invoke>', '</answer>', '</error>'],
                        )
                    )
                ]
            ),
        )
```

### Agent Alias

After you have sufficiently iterated on your working draft and are satisfied with the behavior of your agent, you can set it up for deployment and integration into your application by creating aliases of your agent.

To deploy your agent, you need to create an alias. During alias creation, Amazon Bedrock automatically creates a version of your agent. The alias points to this newly created version. You can point the alias to a previously created version if necessary. You then configure your application to make API calls to that alias.

By default, the `Agent` resource does not create any aliases, and you can use the 'DRAFT' version.

#### Tracking the latest version

The `Agent` resource optionally takes an `aliasName` property that, if defined, will create an Alias that creates a new version on every change.

TypeScript

```ts
const agent = new bedrock.Agent(this, "Agent", {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: "You are a helpful and friendly agent that answers questions about literature.",
  knowledgeBases: [kb],
  aliasName: "latest",
});
```

Python

```python
agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
    knowledge_bases= [kb],
    alias_name='latest'
)
```

#### Specific version

Using the `addAlias` method you can create aliases with a specific agent version.

TypeScript

```ts
agent.addAlias({
  aliasName: "prod",
  agentVersion: "12",
});
```

Python

```python
agent.add_alias(
    alias_name='prod',
    agent_version='12'
)
```

Alternatively, you can use the `AgentAlias` resource if you want to create an Alias for an existing Agent.

TypeScript

```ts
const alias = new bedrock.AgentAlias(this, "ProdAlias", {
  agentId: "ABCDE12345",
  aliasName: "prod",
  agentVersion: "12",
});
```

Python

```python
alias = bedrock.AgentAlias(self, 'ProdAlias',
    agent_id='ABCDE12345',
    alias_name='prod',
    agent_version='12'
)
```

### Bedrock Guardrails

Amazon Bedrock's Guardrails feature enables you to implement robust governance and control mechanisms for your generative AI applications, ensuring alignment with your specific use cases and responsible AI policies. Guardrails empowers you to create multiple tailored policy configurations, each designed to address the unique requirements and constraints of different use cases. These policy configurations can then be seamlessly applied across multiple foundation models (FMs) and Agents, ensuring a consistent user experience and standardizing safety, security, and privacy controls throughout your generative AI ecosystem.

With Guardrails, you can define and enforce granular, customizable policies to precisely govern the behavior of your generative AI applications. You can configure the following policies in a guardrail to avoid undesirable and harmful content and remove sensitive information for privacy protection.

Content filters – Adjust filter strengths to block input prompts or model responses containing harmful content.

Denied topics – Define a set of topics that are undesirable in the context of your application. These topics will be blocked if detected in user queries or model responses.

Word filters – Configure filters to block undesirable words, phrases, and profanity. Such words can include offensive terms, competitor names etc.

Sensitive information filters – Block or mask sensitive information such as personally identifiable information (PII) or custom regex in user inputs and model responses.

You can create a Guardrail with a minimum blockedInputMessaging ,blockedOutputsMessaging and default content filter policy.

TypeScript

```ts
const guardrails = new bedrock.Guardrail(this, "bedrockGuardrails", {
  name: "my-BedrockGuardrails",
  description: "Legal ethical guardrails.",
});

// Optional - Add Sensitive information filters

guardrails.addSensitiveInformationPolicyConfig(
  [
    {
      type: bedrock.General.EMAIL,
      action: bedrock.PiiEntitiesConfigAction.BLOCK,
    },
    {
      type: bedrock.General.USERNAME,
      action: bedrock.PiiEntitiesConfigAction.BLOCK,
    },
  ],
  {
    name: "CUSTOMER_ID",
    description: "customer id",
    pattern: "/^[A-Z]{2}d{6}$/",
    action: "BLOCK",
  }
);

// Optional - Add contextual grounding

guardrails.addContextualGroundingPolicyConfig([
  {
    threshold: 0.5,
    filtersConfigType: bedrock.ContextualGroundingFilterConfigType.GROUNDING,
  },
  {
    threshold: 0.9,
    filtersConfigType: bedrock.ContextualGroundingFilterConfigType.RELEVANCE,
  },
]);

// Optional - Add Denied topics . You can use default Topic or create your custom Topic with createTopic function. The default Topics can also be overwritten.

const topic = new Topic(this, "topic");
topic.financialAdviceTopic();
topic.politicalAdviceTopic();

guardrails.addTopicPolicyConfig(topic);

// Optional - Add Word filters. You can upload words from a file with uploadWordPolicyFromFile function.

guardrails.uploadWordPolicyFromFile("./scripts/wordsPolicy.csv");

guardrails.addVersion("id1", "testversion");
```

Python

```python

    guardrails = bedrock.Guardrail(
        self,
        'bedrockGuardrails',
        name= "my-BedrockGuardrails",
        description= "Legal ethical guardrails.",
    )
    #Optional - Add Sensitive information filters

    guardrails.add_sensitive_information_policy_config(
        props= [
            bedrock.SensitiveInformationPolicyConfigProps(
                type= bedrock.General.EMAIL,
                action= bedrock.PiiEntitiesConfigAction.BLOCK
            ),
            bedrock.SensitiveInformationPolicyConfigProps(
                type= bedrock.General.USERNAME,
                action= bedrock.PiiEntitiesConfigAction.BLOCK
            ),
        ],
        name= "CUSTOMER_ID",
        description= "customer id",
        pattern= "/^[A-Z]{2}\d{6}$/",
        action= "BLOCK"
    )

    # Optional - Add contextual grounding

    guardrails.add_contextual_grounding_policy_config(
      props= [
        bedrock.ContextualGroundingPolicyConfigProps(
            threshold= 0.5,
            filters_config_type= bedrock.ContextualGroundingFilterConfigType.GROUNDING
        ),
        bedrock.ContextualGroundingPolicyConfigProps(
            threshold= 0.5,
            filters_config_type= bedrock.ContextualGroundingFilterConfigType.RELEVANCE
        ),
      ],
    )

    #Optional - Add Denied topics . You can use default Topic or create your custom Topic with createTopic function. The default Topics can also be overwritten.

    topic = bedrock.Topic(self,'topic')
    topic.financial_advice_topic()
    topic.political_advice_topic()

    guardrails.add_topic_policy_config(topic)

    #Optional - Add Word filters. You can upload words from a file with uploadWordPolicyFromFile function.

    guardrails.upload_word_policy_from_file('./scripts/wordsPolicy.csv')

    guardrails.add_version('id1', 'testversion');
```

## Prompt management

Amazon Bedrock provides the ability to create and save prompts using Prompt management so that you can save
time by applying the same prompt to different workflows. You can include variables in the prompt so that you can
adjust the prompt for different use case.

The `Prompt` resource allows you to create a new prompt.
Example of `Prompt`:

**TypeScript**

```ts
const cmk = new kms.Key(this, "cmk", {});
const claudeModel = BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0.asIModel(this);

const variant1 = PromptVariant.text({
  variantName: "variant1",
  model: claudeModel,
  templateConfiguration: {
    inputVariables: [{ name: "topic" }],
    text: "This is my first text prompt. Please summarize our conversation on: {{topic}}.",
  },
  inferenceConfiguration: {
    temperature: 1.0,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250,
  },
});

const prompt1 = new Prompt(this, "prompt1", {
  promptName: "prompt1",
  description: "my first prompt",
  defaultVariant: variant1,
  variants: [variant1],
  encryptionKey: cmk,
});
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
  templateConfiguration: {
    inputVariables: [{ name: "topic" }],
    text: "This is my second text prompt. Please summarize our conversation on: {{topic}}.",
  },
  inferenceConfiguration: {
    temperature: 0.5,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250,
  },
});

prompt1.addVariant(variant2);
```

### Prompt Version

A prompt version is a snapshot of a prompt at a specific point in time that you
create when you are satisfied with a set of configurations. Versions allow you to
deploy your prompt and easily switch between different configurations for your
prompt and update your application with the most appropriate version for your
use-case.

You can create a Prompt version by using the `PromptVersion` class or by using the `.createVersion(..)`
on a `Prompt` object.

**TypeScript**

```ts
new PromptVersion(prompt1, "my first version");
```

or alternatively:

```ts
prompt1.createVersion("my first version");
```
