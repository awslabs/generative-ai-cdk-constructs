[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / PromptStepConfiguration

# Interface: PromptStepConfiguration

Contains configurations to override a prompt template in one part of an agent sequence.

## Extended by

- [`PromptStepConfigurationCustomParser`](PromptStepConfigurationCustomParser.md)

## Properties

### customPromptTemplate?

> `readonly` `optional` **customPromptTemplate**: `string`

The custom prompt template to be used.

#### Default

```ts
- The default prompt template will be used.
```

#### See

https://docs.aws.amazon.com/bedrock/latest/userguide/prompt-placeholders.html

***

### foundationModel?

> `readonly` `optional` **foundationModel**: [`IInvokable`](IInvokable.md)

The foundation model to use for this specific prompt step.
This allows using different models for different steps in the agent sequence.

#### Default

```ts
- The agent's default foundation model will be used.
```

***

### inferenceConfig?

> `readonly` `optional` **inferenceConfig**: [`InferenceConfiguration`](InferenceConfiguration.md)

The inference configuration parameters to use.

***

### stepEnabled?

> `readonly` `optional` **stepEnabled**: `boolean`

Whether to enable or skip this step in the agent sequence.

#### Default

```ts
- The default state for each step type is as follows.

    PRE_PROCESSING – ENABLED
    ORCHESTRATION – ENABLED
    KNOWLEDGE_BASE_RESPONSE_GENERATION – ENABLED
    POST_PROCESSING – DISABLED
```

***

### stepType

> `readonly` **stepType**: [`AgentStepType`](../enumerations/AgentStepType.md)

The step in the agent sequence where to set a specific prompt configuration.
