[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / Memory

# Class: Memory

Memory class for managing Bedrock Agent memory configurations. Enables conversational context retention
across multiple sessions through session identifiers. Memory context is stored with unique
memory IDs per user, allowing access to conversation history and summaries. Supports viewing
stored sessions and clearing memory.

## See

https://docs.aws.amazon.com/bedrock/latest/userguide/agents-memory.html

## Constructors

### Constructor

> **new Memory**(): `Memory`

#### Returns

`Memory`

## Properties

### SESSION\_SUMMARY

> `readonly` `static` **SESSION\_SUMMARY**: `MemoryConfigurationProperty`

Returns session summary memory with default configuration.

#### Default

```ts
memoryDurationDays=30, maxRecentSessions=20
```

## Methods

### sessionSummary()

> `static` **sessionSummary**(`props`): `MemoryConfigurationProperty`

Creates a session summary memory with custom configuration.

#### Parameters

##### props

[`SessionSummaryMemoryProps`](../interfaces/SessionSummaryMemoryProps.md)

Optional memory configuration properties

#### Returns

`MemoryConfigurationProperty`

Memory configuration object
