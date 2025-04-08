# Amazon Bedrock Inference Profiles

Amazon Bedrock Inference Profiles provide a way to manage and optimize inference configurations for your foundation models. They allow you to define reusable configurations that can be applied across different prompts and agents.

## Table of Contents

- [Creating an Inference Profile](#creating-an-inference-profile)
- [Using Inference Profiles](#using-inference-profiles)
  - [With Agents](#with-agents)
- [Inference Configuration Properties](#inference-configuration-properties)
- [Types of Inference Profiles](#types-of-inference-profiles)
  - [Application Inference Profiles](#application-inference-profiles)
  - [System defined Inference Profiles](#system-defined-inference-profiles)
- [Prompt Routers](#prompt-routers)
- [Inference profile permissions](#inference-profile-permissions)
- [Import methods](#import-methods)

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

### With Agents

#### TypeScript

```ts
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
});

const agent = new bedrock.Agent(this, 'Agent', {
  foundationModel: cris,
  instruction: 'You are a helpful and friendly agent that answers questions about agriculture.',
});
```

#### Python

```python
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0
)

agent = bedrock.Agent(
    self,
    "Agent",
    foundation_model=cris,
    instruction="You are a helpful and friendly agent that answers questions about agriculture.",
)
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


### System Defined Inference Profiles

Cross-region inference enables you to seamlessly manage unplanned traffic bursts by utilizing compute across different AWS Regions. With cross-region inference, you can distribute traffic across multiple AWS Regions, enabling higher throughput and enhanced resilience during periods of peak demands.

You can build a CrossRegionInferenceProfile using a system defined inference profile. The inference profile will route requests to the Regions defined in the cross region (system-defined) inference profile that you choose. You can find the system defined inference profiles by navigating to your console (Amazon Bedrock -> Cross-region inference) or programmatically, for instance using boto3.

Before using creating a CrossRegionInferenceProfile, ensure that you have access to the models and regions defined in the inference profiles. For instance, if you see the system defined inference profile "us.anthropic.claude-3-5-sonnet-20241022-v2:0" defined in your region, the table mentions that inference requests will be routed to US East (Virginia) us-east-1, US East (Ohio) us-east-2 and US West (Oregon) us-west-2. Thus, you need to have model access enabled in those regions for the model anthropic.claude-3-5-sonnet-20241022-v2:0.

#### System Defined Profile Configuration

##### TypeScript

```ts
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
});
```

##### Python

```python
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0
)
```

For more information on cross region inference, please refer to [System defined inference profiles](https://github.com/krokoko/generative-ai-cdk-constructs/blob/main/src/cdk-lib/bedrock/README.md#system-defined-inference-profiles)

### Application Inference Profiles

Application inference profiles are user-defined profiles that help you track costs and model usage. They can be created for a single region or for multiple regions using a cross-region inference profile.

To create an application inference profile for one Region, specify a foundation model. Usage and costs for requests made to that Region with that model will be tracked.

To create an application inference profile for multiple Regions, specify a cross region (system-defined) inference profile. The inference profile will route requests to the Regions defined in the cross region (system-defined) inference profile that you choose. Usage and costs for requests made to the Regions in the inference profile will be tracked. You can find the system defined inference profiles by navigating to your console

#### TypeScript

```ts
// Create an application inference profile for one Region
// You can use the 'bedrock.BedrockFoundationModel' or pass the arn as a string
const appInfProfile1 = new ApplicationInferenceProfile(this, 'myapplicationprofile', {
  inferenceProfileName: 'claude 3 sonnet v1',
  modelSource: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  tags: [{ key: 'test', value: 'test' }],
});

// To create an application inference profile across regions, specify the cross region inference profile
const cris = bedrock.CrossRegionInferenceProfile.fromConfig({
  geoRegion: bedrock.CrossRegionInferenceProfileRegion.US,
  model: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0,
});

const appInfProfile2 = new ApplicationInferenceProfile(this, 'myapplicationprofile2', {
  inferenceProfileName: 'claude 3 sonnet v1',
  modelSource: cris,
});
```

#### Python

```python

# Create an application inference profile for one Region
# You can use the 'bedrock.BedrockFoundationModel' or pass the arn as a string
appInfProfile1 = bedrock.ApplicationInferenceProfile(self, 'myapplicationprofile',
  inference_profile_name='claude 3 sonnet v1',
  model_source=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  tags=[CfnTag(
    key="key",
    value="value"
  )]
)

# To create an application inference profile across regions, specify the cross region inference profile
cris = bedrock.CrossRegionInferenceProfile.from_config(
  geo_region= bedrock.CrossRegionInferenceProfileRegion.US,
  model= bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V2_0
)

appInfProfile2 = bedrock.ApplicationInferenceProfile(self, 'myapplicationprofile2',
  inference_profile_name='claude 35 sonnet v2',
  model_source=cris
)
```

## Prompt Routers

Amazon Bedrock intelligent prompt routing provides a single serverless endpoint for efficiently routing requests between different foundational models within the same model family. It can help you optimize for response quality and cost. They offer a comprehensive solution for managing multiple AI models through a single serverless endpoint, simplifying the process for you. Intelligent prompt routing predicts the performance of each model for each request, and dynamically routes each request to the model that it predicts is most likely to give the desired response at the lowest cost. More information about prompt routing in the [documentation](https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-routing.html).

### Default and Custom Prompt Routers

#### TypeScript

```ts
const variant = PromptVariant.text({
  variantName: 'variant1',
  promptText: 'What is the capital of France?',
  model: PromptRouter.fromDefaultId(DefaultPromptRouterIdentifier.ANTHROPIC_CLAUDE_V1, region),
});

new Prompt(stack, 'Prompt', {
  promptName: 'prompt-router-test',
  variants: [variant],
});
```

#### Python

```python
variant = bedrock.PromptVariant.text(
    variant_name='variant1',
    prompt_text='What is the capital of France?',
    model=bedrock.PromptRouter.from_default_id(bedrock.DefaultPromptRouterIdentifier.ANTHROPIC_CLAUDE_V1, region),
)

bedrock.Prompt(self, 'Prompt',
    prompt_name='prompt-router-test',
    variants=[variant],
)
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

## Import methods

You can import existing application inference profiles using the following methods:

### TypeScript

```ts
// Import a Cfn L1 construct created application inference profile
const cfnapp = new CfnApplicationInferenceProfile(this, 'mytestaip3', {
  inferenceProfileName: 'mytest',
  modelSource: {
    copyFrom: 'arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0',
  },
});

const appInfProfile3 = bedrock.ApplicationInferenceProfile.fromCfnApplicationInferenceProfile(cfnapp);

// Import an inference profile through attributes
const appInfProfile4 = bedrock.ApplicationInferenceProfile.fromApplicationInferenceProfileAttributes(this, 'TestAIP', {
  inferenceProfileArn: 'arn:aws:bedrock:us-east-1:XXXXX:application-inference-profile/ID',
  inferenceProfileIdentifier: 'arn:aws:bedrock:us-east-1:XXXXXXX:application-inference-profile/ID',
});
```

### Python

```python
# Import an inference profile through attributes
appInfProfile3 = bedrock.ApplicationInferenceProfile.from_application_inference_profile_attributes(self, 'TestAIP',
  inference_profile_arn='arn:aws:bedrock:us-east-1:XXXXX:application-inference-profile/ID',
  inference_profile_identifier='arn:aws:bedrock:us-east-1:XXXXXXX:application-inference-profile/ID',
)

# Import a Cfn L1 construct created application inference profile
cfnaip = CfnApplicationInferenceProfile(this, 'mytestaip4',
  inference_profile_name='mytest',
  model_source= CfnApplicationInferenceProfile.InferenceProfileModelSourceProperty(
    copy_from='arn:aws:bedrock:us-east-1::foundation-model/anthropic.claude-3-sonnet-20240229-v1:0'
  ),
)

appInfProfile4 = bedrock.ApplicationInferenceProfile.from_cfn_application_inference_profile(cfnaip);
```