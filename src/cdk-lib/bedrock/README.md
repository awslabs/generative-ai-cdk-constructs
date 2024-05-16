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

This construct library includes CloudFormation L1 resources to deploy Bedrock features.

## Table of contents
- [API](#api)
- [Knowledge Bases](#knowledge-bases)
- [Agents](#agents)

## API
See the [API documentation](../../../apidocs/modules/bedrock.md).

## Knowledge Bases
With Knowledge Bases for Amazon Bedrock, you can give FMs and agents contextual information from your company’s private data sources for Retrieval Augmented Generation (RAG) to deliver more relevant, accurate, and customized responses.

### Create a Knowledge Base
A vector index on a vector store is required to create a Knowledge Base. This construct currently supports [Amazon OpenSearch Serverless](../opensearchserverless), [Amazon RDS Aurora PostgreSQL](../amazonaurora/), [Pinecone](../pinecone/) . By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control. For other resources you need to have the vector stores already created and credentials stored in AWS Secrets Manager. For Aurora, the construct provides an option to create a default `AmazonAuroraDefaultVectorStore` construct that will provision the vector store backed by Amazon Aurora for you. To learn more you can read [here](../amazonaurora/README.md).

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

Amazon Bedrock Knowledge Bases currently only supports S3 as a data source. The `S3DataSource` resource is used to configure how the Knowledge Base handles the data source.

Example of ``OpenSearch Serverless``:

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { bedrock, foundation_models } from '@cdklabs/generative-ai-cdk-constructs';

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  embeddingsModel: foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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
    foundation_models
)

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase', 
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
    max_tokens=500,
    overlap_percentage=20   
)
```

Example of ``Amazon RDS Aurora PostgreSQL``:

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { amazonaurora, bedrock, foundation_models } from '@cdklabs/generative-ai-cdk-constructs';

const auroraDb = new amazonaurora.AmazonAuroraVectorStore(stack, 'AuroraDefaultVectorStore', {
  embeddingsModel: foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
});

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: auroraDb,
  embeddingsModel: foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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
    aws_rds as rds,
    aws_ec2 as ec2,
    Stack,
    ArnFormat
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    amazonaurora,
    foundation_models
)

model = foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3
aurora_db = amazonaurora.AmazonAuroraVectorStore(self, 'AuroraDefaultVectorStore',
    embeddings_model=model
)

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase', 
            vector_store= aurora_db,
            embeddings_model= foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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

Example of importing existing ``Amazon RDS Aurora PostgreSQL`` using ``fromExistingAuroraVectorStore()`` method.
**Note** - you need to provide `clusterIdentifier`, `databaseName`, `vpc`, `secret` and `auroraSecurityGroupId` used in deployment of your existing RDS Amazon Aurora DB, as well as `embeddingsModel` that you want to be used by a Knowledge Base for chunking:

TypeScript

```ts
import * as s3 from 'aws-cdk-lib/aws-s3';
import { amazonaurora, bedrock, foundation_models } from '@cdklabs/generative-ai-cdk-constructs';

const auroraDb = aurora.AmazonAuroraVectorStore.fromExistingAuroraVectorStore(stack, 'ExistingAuroraVectorStore', {
  clusterIdentifier: 'aurora-serverless-vector-cluster',
  databaseName: 'bedrock_vector_db',
  schemaName: 'bedrock_integration',
  tableName: 'bedrock_kb',
  vectorField: 'embedding',
  textField: 'chunks',
  metadataField: 'metadata',
  primaryKeyField: 'id',
  embeddingsModel: foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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
    aws_rds as rds,
    aws_ec2 as ec2,
    Stack,
    ArnFormat
)
from cdklabs.generative_ai_cdk_constructs import (
    bedrock,
    amazonaurora,
    foundation_models
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
    embeddings_model=foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase', 
            vector_store= aurora_db,
            embeddings_model= foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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
import { pinecone, bedrock, foundation_models } from '@cdklabs/generative-ai-cdk-constructs';

const pineconeds = new pinecone.PineconeVectorStore({
  connectionString: 'https://your-index-1234567.svc.gcp-starter.pinecone.io',
  credentialsSecretArn: 'arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
  textField: 'question',
  metadataField: 'metadata'
});

const kb = new bedrock.KnowledgeBase(this, 'KnowledgeBase', {
  vectorStore: pineconeds,
  embeddingsModel: foundation_models.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
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
    pinecone,
    foundation_models
)

pineconevs = pinecone.PineconeVectorStore(
            connection_string='https://your-index-1234567.svc.gcp-starter.pinecone.io',
            credentials_secret_arn='arn:aws:secretsmanager:your-region:123456789876:secret:your-key-name',
            text_field='question',
            metadata_field='metadata'
        )

kb = bedrock.KnowledgeBase(self, 'KnowledgeBase', 
            vector_store= pineconevs,
            embeddings_model= foundation_models.BedrockFoundationModel.COHERE_EMBED_ENGLISH_V3,
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
  foundationModel: foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
  
});

agent.addKnowledgeBase([kb]);

```

Python
```python
agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    instruction="You are a helpful and friendly agent that answers questions about insurance claims.",
)
  agent.add_knowledge_base(kb);
```

### Action Groups
An action group defines functions your agent can call. The functions are Lambda functions. The action group uses an OpenAPI schema to tell the agent what your functions do and how to call them.

```ts
const actionGroupFunction = new lambda_python.PythonFunction(this, 'ActionGroupFunction', {
  runtime: lambda.Runtime.PYTHON_3_12,
  entry: path.join(__dirname, '../lambda/action-group'),
});

const actionGroup = new bedrock.AgentActionGroup(this,'MyActionGroup',{
  actionGroupName: 'query-library',
  description: 'Use these functions to get information about the books in the library.',
  actionGroupExecutor: actionGroupFunction,
  actionGroupState: "ENABLED",
  apiSchema: bedrock.ApiSchema.fromAsset(path.join(__dirname, 'action-group.yaml')),
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
    action_group_executor=action_group_function,
    action_group_state="ENABLED",
    api_schema=bedrock.ApiSchema.from_asset("action-group.yaml"))

agent.add_action_group(actionGroup)
```

### Prepare the Agent
The `Agent`  constructs take an optional parameter `shouldPrepareAgent` to indicate that the Agent should be prepared after any updates to an agent, Knowledge Base association, or action group. This may increase the time to create and update those resources. By default, this value is false .

Creating an agent alias will not prepare the agent, so if you create an alias with `addAlias` or by providing an `aliasName` when creating the agent then you should set `shouldPrepareAgent` to ***true***.

#### Prompt Overrides
Bedrock Agents allows you to customize the prompts and LLM configuration for its different steps. You can disable steps or create a new prompt template. Prompt templates can be inserted from plain text files.

TypeScript

```ts
import { readFileSync } from 'fs';

const orchestration = readFileSync('prompts/orchestration.txt', 'utf-8');
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: "You are a helpful and friendly agent that answers questions about literature.",
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
            foundation_model=foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
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
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
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
    foundation_model=foundation_models.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
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
agent.add_alias(
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
