# Amazon Bedrock Prompt Management

Amazon Bedrock provides the ability to create and save prompts using Prompt management so that you can save time by applying the same prompt to different workflows. You can include variables in the prompt so that you can adjust the prompt for different use case.

The `Prompt` resource allows you to create a new prompt.

## Table of Contents

- [Basic Text Prompt](#basic-text-prompt)
- [Chat Prompt](#chat-prompt)
- [Prompt Variants](#prompt-variants)
- [Prompt Routing](#prompt-routing)
- [Permissions and Methods](#permissions-and-methods)
- [Import Methods](#import-methods)

## Basic Text Prompt

### TypeScript Example

```ts
const cmk = new kms.Key(this, 'cmk', {});
const claudeModel = BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0;

const variant1 = PromptVariant.text({
  variantName: 'variant1',
  model: claudeModel,
  promptVariables: ['topic'],
  promptText: 'This is my first text prompt. Please summarize our conversation on: {{topic}}.',
  inferenceConfiguration: {
    temperature: 1.0,
    topP: 0.999,
    maxTokens: 2000,
  },
});

const prompt1 = new Prompt(this, 'prompt1', {
  promptName: 'prompt1',
  description: 'my first prompt',
  defaultVariant: variant1,
  variants: [variant1],
  kmsKey: cmk,
});
```

### Python Example

```python
cmk = kms.Key(self, "cmk")
claude_model = bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0

variant1 = bedrock.PromptVariant.text(
    variant_name="variant1",
    model=claude_model,
    prompt_variables=["topic"],
    prompt_text="This is my first text prompt. Please summarize our conversation on: {{topic}}.",
    inference_configuration={
        "temperature": 1.0,
        "top_p": 0.999,
        "maxTokens": 2000,
    }
)

prompt = bedrock.Prompt(
    self,
    "myprompt",
    prompt_name="prompt1",
    description="my first prompt",
    default_variant=variant1,
    variants=[variant1],
    kms_key=cmk
)
```

## Chat Prompt

Use this template type when the model supports the Converse API or the Anthropic Claude Messages API. This allows you to include a System prompt and previous User messages and Assistant messages for context.

### TypeScript Example

```ts
const cmk = new kms.Key(this, 'cmk', {});

const variantChat = PromptVariant.chat({
  variantName: 'variant1',
  model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
  messages: [
    ChatMessage.userMessage('From now on, you speak Japanese!'),
    ChatMessage.assistantMessage('Konnichiwa!'),
    ChatMessage.userMessage('From now on, you speak {{language}}!'),
  ],
  system: 'You are a helpful assistant that only speaks the language you`re told.',
  promptVariables: ['language'],
  toolConfiguration: {
    toolChoice: ToolChoice.AUTO,
    tools: [
      {
        toolSpec: {
          name: 'top_song',
          description: 'Get the most popular song played on a radio station.',
          inputSchema: {
            json: {
              type: 'object',
              properties: {
                sign: {
                  type: 'string',
                  description:
                    'The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR.',
                },
              },
              required: ['sign'],
            },
          },
        },
      },
    ],
  },
});

new Prompt(stack, 'prompt1', {
  promptName: 'prompt-chat',
  description: 'my first chat prompt',
  defaultVariant: variantChat,
  variants: [variantChat],
  kmsKey: cmk,
});
```

### Python Example

```python
# Create KMS key
cmk = kms.Key(self, "cmk")

# Create tool specification
tool_spec = CfnPrompt.ToolSpecificationProperty(
    name="top_song",
    description="Get the most popular song played on a radio station.",
    input_schema=CfnPrompt.ToolInputSchemaProperty(
        json={
            "type": "object",
            "properties": {
                "sign": {
                    "type": "string",
                    "description": "The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR."
                }
            },
            "required": ["sign"]
        }
    )
)

# Create tool configuration
tool_config = bedrock.ToolConfiguration(
    tool_choice=bedrock.ToolChoice.AUTO,
    tools=[
        CfnPrompt.ToolProperty(
            tool_spec=tool_spec
        )
    ]
)

# Create chat variant
variant_chat = bedrock.PromptVariant.chat(
    variant_name="variant1",
    model=bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
    messages=[
        bedrock.ChatMessage.user("From now on, you speak Japanese!"),
        bedrock.ChatMessage.assistant("Konnichiwa!"),
        bedrock.ChatMessage.user("From now on, you speak {{language}}!"),
    ],
    system="You are a helpful assistant that only speaks the language you're told.",
    prompt_variables=["language"],
    tool_configuration=tool_config
)

# Create prompt
prompt = bedrock.Prompt(
    self,
    "prompt1",
    prompt_name="prompt-chat",
    description="my first chat prompt",
    default_variant=variant_chat,
    variants=[variant_chat],
    kms_key=cmk
)
```

## Prompt Variants

Prompt variants in the context of Amazon Bedrock refer to alternative configurations of a prompt, including its message or the model and inference configurations used. Prompt variants allow you to create different versions of a prompt, test them, and save the variant that works best for your use case. You can add prompt variants to a prompt by creating a `PromptVariant` object and specify the variants on prompt creation, or by using the `.addVariant(..)` method on a `Prompt` object.

### TypeScript Example

```ts
const variant2 = PromptVariant.text({
  variantName: "variant2",
  model: claudeModel,
  promptVariables: [ "topic" ],
  promptText: "This is my second text prompt. Please summarize our conversation on: {{topic}}.",
  inferenceConfiguration: {
    temperature: 0.5,
    topP: 0.999,
    maxTokens: 2000,
  },
});

prompt1.addVariant(variant2);
```

### Python Example

```python
variant2 = bedrock.PromptVariant.text(
    variant_name="variant2",
    model=claude_model,
    prompt_variables=["topic"],
    prompt_text="This is my second text prompt. Please summarize our conversation on: {{topic}}.",
    inference_configuration={
        "temperature": 0.5,
        "topP": 0.999,
        "maxTokens": 2000,
    }
)

prompt.add_variant(variant2)
```

## Prompt Routing

Amazon Bedrock intelligent prompt routing provides a single serverless endpoint for efficiently routing requests between different foundational models within the same model family. It can help you optimize for response quality and cost. They offer a comprehensive solution for managing multiple AI models through a single serverless endpoint, simplifying the process for you. Intelligent prompt routing predicts the performance of each model for each request, and dynamically routes each request to the model that it predicts is most likely to give the desired response at the lowest cost.

### TypeScript Example

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

### Python Example

```py
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

## Permissions and Methods

### Prompt Methods

| Method | Description |
|--------|-------------|
| `addVariant(variant)` | Adds a variant to the prompt |
| `createVersion(description?)` | Creates a new version of the prompt with an optional description |
| `grantGet(grantee)` | Grants the given identity permissions to get the prompt |

### PromptVariant Methods

| Method | Description |
|--------|-------------|
| `PromptVariant.text(props)` | Creates a text prompt variant |
| `PromptVariant.chat(props)` | Creates a chat prompt variant |
| `PromptVariant.agent(props)` | Creates an agent prompt variant |

### ChatMessage Methods

| Method | Description |
|--------|-------------|
| `ChatMessage.user(text)` | Creates a user message |
| `ChatMessage.assistant(text)` | Creates an assistant message |

### ToolChoice Methods

| Method | Description |
|--------|-------------|
| `ToolChoice.ANY` | Allows the model to use any tool |
| `ToolChoice.AUTO` | Allows the model to automatically decide which tool to use |
| `ToolChoice.specificTool(toolName)` | Forces the model to use a specific tool |

## Import Methods

```ts
// Import an existing prompt by ARN
const importedPrompt = bedrock.Prompt.fromPromptAttributes(this, 'ImportedPrompt', {
  promptArn: 'arn:aws:bedrock:region:account:prompt/prompt-id',
  kmsKeyArn: 'arn:aws:kms:region:account:key/key-id', // optional
  promptVersion: '1', // optional, defaults to 'DRAFT'
});
```

```python
# Import an existing prompt by ARN
imported_prompt = bedrock.Prompt.from_prompt_attributes(
    self, 
    'ImportedPrompt',
    prompt_arn='arn:aws:bedrock:region:account:prompt/prompt-id',
    kms_key_arn='arn:aws:kms:region:account:key/key-id',  # optional
    prompt_version='1'  # optional, defaults to 'DRAFT'
)
```
