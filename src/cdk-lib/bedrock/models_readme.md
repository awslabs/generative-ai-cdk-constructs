# Amazon Bedrock Foundation Models

The `models.ts` file provides a comprehensive set of foundation models available in Amazon Bedrock, along with utilities for working with these models in CDK applications.

## Table of Contents

- [Overview](#overview)
- [Model Properties](#model-properties)
- [Using Models](#using-models)
  - [Creating a Model](#creating-a-model)
  - [Importing from CDK Models](#importing-from-cdk-models)
  - [Granting Permissions](#granting-permissions)
- [Model Capabilities](#model-capabilities)
  - [Agent Support](#agent-support)
  - [Knowledge Base Support](#knowledge-base-support)
  - [Cross-Region Support](#cross-region-support)
  - [Embedding Models](#embedding-models)

## Overview

The `BedrockFoundationModel` class provides a CDK-friendly way to work with Amazon Bedrock foundation models. It implements the `IInvokable` interface, which allows you to grant permissions to invoke these models.c

## Model Properties

Each model has the following properties:

| Property | Type | Description |
|----------|------|-------------|
| modelId | string | The ID of the model (e.g., 'anthropic.claude-3-sonnet-20240229-v1:0') |
| modelArn | string | The ARN of the model |
| invokableArn | string | The ARN used for invoking the model |
| supportsAgents | boolean | Whether the model can be used with Bedrock Agents |
| optimizedForAgents | boolean | Whether the model is optimized for use with Bedrock Agents |
| legacy | boolean | Whether the model is a legacy version (has a newer version available) |
| supportsCrossRegion | boolean | Whether the model can be used with cross-region inference profiles |
| vectorDimensions | number | For embedding models, the dimension of the vectors |
| supportsKnowledgeBase | boolean | Whether the model can be used with Knowledge Bases |
| supportedVectorType | VectorType[] | For embedding models, the supported vector types |

When creating a model, you can specify these properties in the `BedrockFoundationModelProps` interface:

### TypeScript

```ts
const model = new BedrockFoundationModel('model-id', {
  supportsAgents: true,
  optimizedForAgents: true,
  legacy: false,
  supportsKnowledgeBase: false,
  supportsCrossRegion: true,
  vectorDimensions: 1536,
  supportedVectorType: [VectorType.FLOATING_POINT],
});
```

### Python

```python
model = BedrockFoundationModel('model-id', 
    supports_agents=True,
    optimized_for_agents=True,
    legacy=False,
    supports_knowledge_base=False,
    supports_cross_region=True,
    vector_dimensions=1536,
    supported_vector_type=[VectorType.FLOATING_POINT],
)
```

## Using Models

### Creating a Model

You can create a model using the static properties or by instantiating a new `BedrockFoundationModel`:

#### TypeScript

```ts
// Using a predefined model
const claudeModel = BedrockFoundationModel.ANTHROPIC_CLAUDE_3_SONNET_V1_0;

// Creating a custom model
const customModel = new BedrockFoundationModel('custom.model-id', {
  supportsAgents: true,
  supportsKnowledgeBase: true,
});
```

#### Python

```python
# Using a predefined model
claude_model = BedrockFoundationModel.ANTHROPIC_CLAUDE_3_SONNET_V1_0

# Creating a custom model
custom_model = BedrockFoundationModel('custom.model-id', 
    supports_agents=True,
    supports_knowledge_base=True,
)
```

### Importing from CDK Models

You can also import models from the AWS CDK's `FoundationModel` or `FoundationModelIdentifier`:

#### TypeScript

```ts
import { FoundationModel } from 'aws-cdk-lib/aws-bedrock';

// Import from FoundationModel
const cdkModel = FoundationModel.CLAUDE_3_SONNET;
const bedrockModel = BedrockFoundationModel.fromCdkFoundationModel(cdkModel, {
  supportsAgents: true,
});

// Import from FoundationModelIdentifier
const modelId = FoundationModelIdentifier.CLAUDE_3_SONNET;
const bedrockModelFromId = BedrockFoundationModel.fromCdkFoundationModelId(modelId, {
  supportsAgents: true,
});
```

#### Python

```python
import { FoundationModel } from 'aws-cdk-lib/aws-bedrock';

// Import from FoundationModel
const cdkModel = FoundationModel.CLAUDE_3_SONNET;
const bedrockModel = BedrockFoundationModel.fromCdkFoundationModel(cdkModel, {
  supportsAgents: true,
});

// Import from FoundationModelIdentifier
const modelId = FoundationModelIdentifier.CLAUDE_3_SONNET;
const bedrockModelFromId = BedrockFoundationModel.fromCdkFoundationModelId(modelId, {
  supportsAgents: true,
});
```

### Granting Permissions

You can grant permissions to invoke a model:

#### TypeScript

```ts
// Grant permissions to invoke the model in the current region
model.grantInvoke(role);

// Grant permissions to invoke the model in all regions
model.grantInvokeAllRegions(role);
```

#### Python

```python
# Grant permissions to invoke the model in the current region
model.grant_invoke(role);

# Grant permissions to invoke the model in all regions
model.grant_invoke_all_regions(role);
```

## Model Capabilities

### Agent Support

Models with `supportsAgents: true` can be used with Bedrock Agents. Some models are also optimized for agents with `optimizedForAgents: true`.

### Knowledge Base Support

Models with `supportsKnowledgeBase: true` can be used with Bedrock Knowledge Bases, typically for embedding text into vectors.

### Cross-Region Support

Models with `supportsCrossRegion: true` can be used with cross-region inference profiles.

### Embedding Models

Embedding models have specific properties:

- `vectorDimensions`: The dimension of the vectors (e.g., 1536, 1024, 512, 256)
- `supportedVectorType`: The supported vector types (FLOATING_POINT, BINARY)

Example usage with a knowledge base:

#### TypeScript

```ts
import { VectorKnowledgeBase } from 'aws-cdk-lib/aws-bedrock';

const knowledgeBase = new VectorKnowledgeBase(this, 'MyKnowledgeBase', {
  embeddingsModel: BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
  vectorType: VectorType.FLOATING_POINT,
  // Other properties...
});
```

#### Python

```python
from aws_cdk import CfnOutput
from aws_cdk.aws_bedrock import VectorKnowledgeBase

knowledge_base = VectorKnowledgeBase(self, 'MyKnowledgeBase', 
    embeddings_model=BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
    vector_type=VectorType.FLOATING_POINT,
    # Other properties...
)
```