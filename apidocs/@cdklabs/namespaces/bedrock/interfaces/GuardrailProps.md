[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / GuardrailProps

# Interface: GuardrailProps

Properties for creating a Guardrail.

## Properties

### blockedInputMessaging?

> `readonly` `optional` **blockedInputMessaging**: `string`

The message to return when the guardrail blocks a prompt.

#### Default

```ts
"Sorry, your query violates our usage policy."
```

***

### blockedOutputsMessaging?

> `readonly` `optional` **blockedOutputsMessaging**: `string`

The message to return when the guardrail blocks a model response.

#### Default

```ts
"Sorry, I am unable to answer your question because of our usage policy."
```

***

### contentFilters?

> `readonly` `optional` **contentFilters**: [`ContentFilter`](ContentFilter.md)[]

The content filters to apply to the guardrail.
Note, if one of

***

### contextualGroundingFilters?

> `readonly` `optional` **contextualGroundingFilters**: [`ContextualGroundingFilter`](ContextualGroundingFilter.md)[]

The contextual grounding filters to apply to the guardrail.

***

### deniedTopics?

> `readonly` `optional` **deniedTopics**: [`Topic`](../classes/Topic.md)[]

Up to 30 denied topics to block user inputs or model responses associated with the topic.

***

### description?

> `readonly` `optional` **description**: `string`

The description of the guardrail.

***

### kmsKey?

> `readonly` `optional` **kmsKey**: `IKey`

A custom KMS key to use for encrypting data.

#### Default

```ts
"Your data is encrypted by default with a key that AWS owns and manages for you."
```

***

### managedWordListFilters?

> `readonly` `optional` **managedWordListFilters**: [`ManagedWordFilter`](ManagedWordFilter.md)[]

The managed word filters to apply to the guardrail.

***

### name

> `readonly` **name**: `string`

The name of the guardrail.

***

### piiFilters?

> `readonly` `optional` **piiFilters**: [`PIIFilter`](PIIFilter.md)[]

The PII filters to apply to the guardrail.

***

### regexFilters?

> `readonly` `optional` **regexFilters**: [`RegexFilter`](RegexFilter.md)[]

The regular expression (regex) filters to apply to the guardrail.

***

### wordFilters?

> `readonly` `optional` **wordFilters**: [`WordFilter`](WordFilter.md)[]

The word filters to apply to the guardrail.
