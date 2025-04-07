# Amazon Bedrock Inference Profiles

Amazon Bedrock Inference Profiles provide a way to manage and optimize inference configurations for your foundation models. They allow you to define reusable configurations that can be applied across different prompts and agents.

## Creating an Inference Profile

### TypeScript Example

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

### Python Example

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

## Best Practices

1. **Create Reusable Profiles**: Define profiles for common use cases like high-quality responses, creative writing, or code generation.

2. **Version Control**: Keep track of different versions of your inference profiles to maintain consistency across environments.

3. **Documentation**: Document the purpose and expected behavior of each inference profile to help team members understand when to use them.

4. **Testing**: Test different inference configurations to find the optimal settings for your specific use case.

5. **Monitoring**: Monitor the performance of your inference profiles and adjust configurations as needed based on real-world usage. 