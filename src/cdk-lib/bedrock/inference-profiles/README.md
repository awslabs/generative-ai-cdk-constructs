# Amazon Bedrock Inference Profiles

Amazon Bedrock Inference Profiles provide a way to manage and optimize inference configurations for your foundation models. They allow you to define reusable configurations that can be applied across different prompts and agents.

## Table of Contents

- [Creating an Inference Profile](#creating-an-inference-profile)
- [Using Inference Profiles](#using-inference-profiles)
  - [With Prompts](#with-prompts)
  - [With Agents](#with-agents)
- [Inference Configuration Properties](#inference-configuration-properties)
- [Types of Inference Profiles](#types-of-inference-profiles)
  - [Application Inference Profiles](#application-inference-profiles)
  - [System defined Inference Profiles](#system-defined-inference-profiles)
- [Prompt Routers](#prompt-routers)
- [Inference profile permissions](#inference-profile-permissions)

## Creating an Inference Profile

### TypeScript

```ts
const profile = new InferenceProfile(this, 'MyProfile', {
  profileName: 'my-inference-profile',
  description: 'A profile for high-quality responses',
  inferenceConfiguration: {
    temperature: 0.7,
    topP: 0.9,
    maxTokens: 2000,
    stopSequences: ['Human:', 'Assistant:'],
  },
});
```

### Python

```python
profile = bedrock.InferenceProfile(
    self,
    "MyProfile",
    profile_name="my-inference-profile",
    description="A profile for high-quality responses",
    inference_configuration={
        "temperature": 0.7,
        "topP": 0.9,
        "maxTokens": 2000,
        "stopSequences": ["Human:", "Assistant:"],
    }
)
```

## Using Inference Profiles

Inference profiles can be used with prompts and agents to maintain consistent inference configurations across your application.

### With Prompts

#### Prompt with Inference Profile

##### TypeScript

```ts
const prompt = new Prompt(this, 'MyPrompt', {
  promptName: 'my-prompt',
  defaultVariant: PromptVariant.text({
    variantName: 'default',
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
    promptText: 'Hello, how can I help you?',
    inferenceConfiguration: profile.inferenceConfiguration,
  }),
});
```

### With Agents

#### Agent with Inference Profile

##### TypeScript

```ts
const agent = new Agent(this, 'MyAgent', {
  agentName: 'my-agent',
  instruction: 'You are a helpful assistant.',
  foundationModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  inferenceConfiguration: profile.inferenceConfiguration,
});
```

## Inference Configuration Properties

The following properties can be configured in an inference profile:

| Property | Type | Description |
|----------|------|-------------|
| temperature | number | Controls randomness in the output. Higher values (e.g., 0.8) make the output more random, while lower values (e.g., 0.2) make it more focused and deterministic. |
| topP | number | Controls diversity via nucleus sampling. Higher values (e.g., 0.9) allow more diverse outputs, while lower values (e.g., 0.1) make the output more focused. |
| maxTokens | number | The maximum number of tokens to generate in the response. |
| stopSequences | string[] | Sequences where the model should stop generating text. |
| topK | number | Controls diversity by limiting the number of tokens considered at each step. |
| anthropicVersion | string | The version of the Anthropic model to use (for Claude models). |
| responseFormat | object | Configuration for structured output formats. |

## Types of Inference Profiles

Amazon Bedrock offers two types of inference profiles:

### Application Inference Profiles

Application inference profiles are user-defined profiles that help you track costs and model usage. They can be created for a single region or for multiple regions using a cross-region inference profile.

#### TypeScript

```ts
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

// Create an application inference profile for a single region
const profile = new bedrock.ApplicationInferenceProfile(this, 'MyProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'A profile for high-quality responses',
  modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

// Create an application inference profile for multiple regions
const crossRegionProfile = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

const multiRegionProfile = new bedrock.ApplicationInferenceProfile(this, 'MultiRegionProfile', {
  inferenceProfileName: 'my-multi-region-profile',
  description: 'A profile for multi-region deployment',
  modelSource: crossRegionProfile,
});
```

### System Defined Inference Profiles

Cross-region inference enables you to seamlessly manage unplanned traffic bursts by utilizing compute across different AWS Regions. With cross-region inference, you can distribute traffic across multiple AWS Regions, enabling higher throughput and enhanced resilience during periods of peak demands.

#### System Defined Profile Configuration

##### TypeScript

```ts
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

// Create a cross-region inference profile for the US region
const usProfile = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

// Create a cross-region inference profile for the EU region
const euProfile = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.EU,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

// Create a cross-region inference profile for the APAC region
const apacProfile = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.APAC,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});
```

For more information on cross region inference, please refer to [System defined inference profiles](https://github.com/krokoko/generative-ai-cdk-constructs/blob/main/src/cdk-lib/bedrock/README.md#system-defined-inference-profiles)

## Prompt Routers

Prompt routers allow you to route requests to different foundation models based on the prompt content. Amazon Bedrock provides default prompt routers for specific model families.

### Default and Custom Prompt Routers

#### TypeScript

```ts
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';

// Use the default Anthropic Claude V1 router
const claudeRouter = bedrock.PromptRouter.fromDefaultId(
  bedrock.DefaultPromptRouterIdentifier.ANTHROPIC_CLAUDE_V1,
  'us-east-1'
);

// Use the default Meta Llama 3.1 router
const llamaRouter = bedrock.PromptRouter.fromDefaultId(
  bedrock.DefaultPromptRouterIdentifier.META_LLAMA_3_1,
  'us-east-1'
);

// Create a custom prompt router
const customRouter = new bedrock.PromptRouter({
  promptRouterId: 'my-custom-router',
  routingModels: [
    bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
    bedrock.BedrockFoundationModel.META_LLAMA_3_1_70B_INSTRUCT_V1,
  ],
}, 'us-east-1');
```

## Inference profile permissions

Use the `grantProfileUsage` method to grant appropriate permissions to resources that need to use the inference profile.

### Granting Profile Usage Permissions

#### TypeScript

```ts
import { bedrock } from '@cdklabs/generative-ai-cdk-constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';

// Create an application inference profile
const profile = new bedrock.ApplicationInferenceProfile(this, 'MyProfile', {
  inferenceProfileName: 'my-inference-profile',
  description: 'A profile for high-quality responses',
  modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

// Grant the Lambda function permission to use the inference profile
profile.grantProfileUsage(lambdaFunction);

// Use a system defined inference profile
const crossRegionProfile = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
});

// Grant permissions to use the cross-region inference profile
crossRegionProfile.grantProfileUsage(lambdaFunction);
```

The `grantProfileUsage` method adds the necessary IAM permissions to the resource, allowing it to use the inference profile. This includes permissions to call `bedrock:GetInferenceProfile` and `bedrock:ListInferenceProfiles` actions on the inference profile resource.
