# Amazon Bedrock Construct Library
<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---
<!--END STABILITY BANNER-->


| **Language**     | **Package**        |
|:-------------|-----------------|
|![Typescript Logo](https://docs.aws.amazon.com/cdk/api/latest/img/typescript32.png) TypeScript|`@cdklabs/generative-ai-cdk-constructs`|
|![Python Logo](https://docs.aws.amazon.com/cdk/api/latest/img/python32.png) Python|`cdklabs.generative_ai_cdk_constructs`|

[Amazon Bedrock](https://aws.amazon.com/bedrock/) is a fully managed service that offers a choice of foundation models (FMs) along with a broad set of capabilities for building generative AI applications.

CloudFormation does not currently support any Bedrock resource types. This construct library includes L2 resources and custom resources to deploy Bedrock features.

## Table of contents
- [API](#api)
- [Knowledge Bases](#knowledge-bases)
- [Agents](#agents)

## API
See the [API documentation](../../../apidocs/modules/bedrock.md).

## Knowledge Bases
With Knowledge Bases for Amazon Bedrock, you can give FMs and agents contextual information from your company’s private data sources for Retrieval Augmented Generation (RAG) to deliver more relevant, accurate, and customized responses.

### Create a Knowledge Base
A vector index on a vector store is required to create a Knowledge Base. This construct currently supports [Amazon OpenSearch Serverless](../opensearchserverless), [Amazon RDS Aurora PostgreSQL](../amazonaurora/), [Pinecone](../pinecone/) and [Redis Enterprise Cloud](../redisenterprisecloud/). By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control. For other resources you need to have the vector stores already created and credentials stored in AWS Secrets Manager. For Aurora, the construct provides an option to create a default `AmazonAuroraDefaultVectorStore` construct that will provision the vector store backed by Amazon Aurora for you. To learn more you can read [here](../amazonaurora/README.md).

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

Amazon Bedrock Knowledge Bases currently only supports S3 as a data source. The `S3DataSource` resource is used to configure how the Knowledge Base handles the data source.

Example of ``OpenSearch Serverless``:

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction: 'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
  maxTokens: 500,
  overlapPercentage: 20,
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

Example of ``Amazon RDS Aurora PostgreSQL`` (manual, you must have Amazon RDS Aurora PostgreSQL already created):

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { amazonaurora, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const auroraDbManual = new amazonaurora.AmazonAuroraVectorStore(
  {
    resourceArn: 'arn:aws:rds:your-region:123456789876:cluster:aurora-cluster-manual',
    databaseName: 'bedrock_vector_db',
    tableName: 'bedrock_integration.bedrock_kb',
    credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
    primaryKeyField: 'id',
    vectorField: 'embedding',
    textField: 'chunks',
    metadataField: 'metadata',
  });

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: auroraDbManual,
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
  instruction: 'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
  maxTokens: 500,
  overlapPercentage: 20,
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
    max_tokens=500,
    overlap_percentage=20   
)

```

Example of ``Amazon RDS Aurora PostgreSQL`` (default):

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { amazonaurora, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const auroraDb = new amazonaurora.AmazonAuroraDefaultVectorStore(stack, 'AuroraDefaultVectorStore', {
  embeddingsModel: BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3.vectorDimensions!,
});

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: auroraDb,
  embeddingsModel: bedrock.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
  instruction: 'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
  maxTokens: 500,
  overlapPercentage: 20,
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
    max_tokens=500,
    overlap_percentage=20   
)
```

Example of ``Pinecone`` (manual, you must have Pinecone vector store created):

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { pinecone, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const pinecone = new pinecone.PineconVectorStore({
  connectionString: 'https://your-index-1234567.svc.gcp-starter.pinecone.io',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name'
});

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: pinecone,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction: 'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
  maxTokens: 500,
  overlapPercentage: 20,
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
    max_tokens=500,
    overlap_percentage=20   
)
```

Example of ``Redis Enterprise Cloud`` (manual, you must have Redis Enterprise Cloud vector store created):

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { redisenterprisecloud, bedrock } from '@cdklabs/generative-ai-cdk-constructs';

const redisEnterpriseVectorStore = new redisenterprisecloud.RedisEnterpriseVectorStore({
  endpoint: 'redis-endpoint',
  vectorIndexName: 'your-index-name',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name'
});

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: redisEnterpriseVectorStore,
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  instruction: 'Use this knowledge base to answer questions about books. ' +
    'It contains the full text of novels.',
});

const docBucket = new s3.Bucket(this, 'DocBucket');

new bedrock.S3DataSource(this, 'DataSource', {
  bucket: docBucket,
  knowledgeBase: kb,
  dataSourceName: 'books',
  chunkingStrategy: bedrock.ChunkingStrategy.FIXED_SIZE,
  maxTokens: 500,
  overlapPercentage: 20,
});
```

Python
```python

from aws_cdk import (
    aws_s3 as s3,
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    redisenterprisecloud
)

redisds = redisenterprisecloud.RedisEnterpriseVectorStoreProps(
            credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
            endpoint='redis-endpoint',
            vector_index_name='your-index-name',
        )

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase', 
            vector_store= redisds,
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
    max_tokens=500,
    overlap_percentage=20   
)
```

## Agents
Enable generative AI applications to execute multistep tasks across company systems and data sources.

### Create an Agent
The following example creates an Agent with a simple instruction and default prompts that consults a Knowledge Base.

TypeScript

```ts
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
  knowledgeBases: [kb],
});
```

Python
```python
agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
    knowledge_bases= [kb]
)
```

### Action Groups
An action group defines functions your agent can call. The functions are Lambda functions. The action group uses an OpenAPI schema to tell the agent what your functions do and how to call them.

```ts
const actionGroupFunction = new lambda_python.PythonFunction(this, 'ActionGroupFunction', {
  runtime: lambda.Runtime.PYTHON_3_12,
  entry: path.join(__dirname, '../lambda/action-group'),
});

agent.addActionGroup({
  actionGroupName: 'query-library',
  description: 'Use these functions to get information about the books in the library.',
  actionGroupExecutor: actionGroupFunction,
  actionGroupState: "ENABLED",
  apiSchema: bedrock.ApiSchema.fromAsset(path.join(__dirname, 'action-group.yaml')),
});
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

agent.add_action_group(
            action_group_name="query-library",
            description="Use these functions to get information about the books in the library.",
            action_group_executor=action_group_function,
            action_group_state="ENABLED",
            api_schema=bedrock.ApiSchema.from_asset("action-group.yaml"),  
        )
```

### Prepare the Agent
The `Agent` and `AgentActionGroup` constructs take an optional parameter `shouldPrepareAgent` to indicate that the Agent should be prepared after any updates to an agent, Knowledge Base association, or action group. This may increase the time to create and update those resources.

Creating an agent alias will also prepare the agent, so if you create an alias with `addAlias` or by providing an `aliasName` when creating the agent then you should not set `shouldPrepareAgent` to ***true*** on other resources.

#### Prompt Overrides
Bedrock Agents allows you to customize the prompts and LLM configuration for its different steps. You can disable steps or create a new prompt template. Prompt templates can be inserted from plain text files.

TypeScript

```ts
import { readFileSync } from 'fs';

const orchestration = readFileSync('prompts/orchestration.txt', 'utf-8');
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: "You are a helpful and friendly agent that answers questions about literature.",
  knowledgeBases: [kb],
  promptOverrideConfiguration: {
    promptConfigurations: [
      {
        promptType: bedrock.PromptType.PRE_PROCESSING,
        promptState: bedrock.PromptState.DISABLED,
        promptCreationMode:  bedrock.PromptCreationMode.OVERRIDDEN,
        basePromptTemplate: "disabled",
        inferenceConfiguration: {
          temperature:  0.0,
          topP: 1,
          topK: 250,
          maximumLength: 1,
          stopSequences: ['\n\nHuman:'],
        }
      },
      {
        promptType: bedrock.PromptType.ORCHESTRATION,
        basePromptTemplate: orchestration,
        promptState: bedrock.PromptState.ENABLED,
        promptCreationMode:  bedrock.PromptCreationMode.OVERRIDDEN,
        inferenceConfiguration: {
          temperature:  0.0,
          topP: 1,
          topK: 250,
          maximumLength: 2048,
          stopSequences: ['</invoke>', '</answer>', '</error>'],
        },
      },
    ]
  }
});
```

Python
```python
orchestration = open('prompts/orchestration.txt', encoding="utf-8").read()
agent = bedrock.Agent(self, "Agent",
            foundation_model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
            instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
            knowledge_bases= [kb],
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
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
  knowledgeBases: [kb],
  aliasName: 'latest',
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
  aliasName: 'prod',
  agentVersion: '12',
});
```

Python

```python
agent.add_alias(self, 'ProdAlias', 
  alias_name='prod',
  agent_version='12'
)
```

Alternatively, you can use the `AgentAlias` resource if you want to create an Alias for an existing Agent.

TypeScript

```ts
const alias = new bedrock.AgentAlias(this, 'ProdAlias', {
  agentId:  'ABCDE12345',
  aliasName: 'prod',
  agentVersion: '12',
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
