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
A vector index on a vector store is required to create a Knowledge Base. This construct currently only supports [Amazon OpenSearch Serverless](../opensearchserverless). By default, this resource will create an OpenSearch Serverless vector collection and index for each Knowledge Base you create, but you can provide an existing collection and/or index to have more control.

The resource accepts an `instruction` prop that is provided to any Bedrock Agent it is associated with so the agent can decide when to query the Knowledge Base.

Amazon Bedrock Knowledge Bases currently only supports S3 as a data source. The `S3DataSource` resource is used to configure how the Knowledge Base handles the data source.

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

## Agents
Enable generative AI applications to execute multistep tasks across company systems and data sources.

### Create an Agent
The following example creates an Agent with a simple instruction and default prompts that consults a Knowledge Base.

```ts
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
  knowledgeBases: [kb],
});
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

### Prepare the Agent
The `Agent` and `AgentActionGroup` constructs take an optional parameter `shouldPrepareAgent` to indicate that the Agent should be prepared after any updates to an agent, Knowledge Base association, or action group. This may increase the time to create and update those resources.

Creating an agent alias will also prepare the agent, so if you create an alias with `addAlias` or by providing an `aliasName` when creating the agent then you should not set `shouldPrepareAgent` to ***true*** on other resources.

#### Prompt Overrides
Bedrock Agents allows you to customize the prompts and LLM configuration for its different steps. You can disable steps or create a new prompt template. Prompt templates can be inserted from plain text files.

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

### Agent Alias
After you have sufficiently iterated on your working draft and are satisfied with the behavior of your agent, you can set it up for deployment and integration into your application by creating aliases of your agent.

To deploy your agent, you need to create an alias. During alias creation, Amazon Bedrock automatically creates a version of your agent. The alias points to this newly created version. You can point the alias to a previously created version if necessary. You then configure your application to make API calls to that alias.

By default, the `Agent` resource does not create any aliases, and you can use the 'DRAFT' version.

#### Tracking the latest version
The `Agent` resource optionally takes an `aliasName` property that, if defined, will create an Alias that creates a new version on every change.

```ts
const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
  knowledgeBases: [kb],
  aliasName: 'latest',
});
```

#### Specific version
Using the `addAlias` method you can create aliases with a specific agent version.

```ts
agent.addAlias({
  aliasName: 'prod',
  agentVersion: '12',
});
```

Alternatively, you can use the `AgentAlias` resource if you want to create an Alias for an existing Agent.

```ts
const alias = new bedrock.AgentAlias(this, 'ProdAlias', {
  agentId:  'ABCDE12345',
  aliasName: 'prod',
  agentVersion: '12',
});
```
