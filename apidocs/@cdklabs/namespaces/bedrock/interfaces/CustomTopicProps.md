[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / CustomTopicProps

# Interface: CustomTopicProps

Interface for creating a custom Topic

## Properties

### definition

> `readonly` **definition**: `string`

Provide a clear definition to detect and block user inputs and FM responses
that fall into this topic. Avoid starting with "don't".

#### Example

```ts
`Investment advice refers to inquiries, guidance, or recommendations
regarding the management or allocation of funds or assets with the goal of
generating returns or achieving specific financial objectives.`
```

***

### examples

> `readonly` **examples**: `string`[]

Representative phrases that refer to the topic. These phrases can represent
a user input or a model response. Add up to 5 phrases, up to 100 characters
each.

#### Example

```ts
"Where should I invest my money?"
```

***

### inputAction?

> `readonly` `optional` **inputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a topic is detected in the input.

***

### inputEnabled?

> `readonly` `optional` **inputEnabled**: `boolean`

Whether the topic filter is enabled for input.

***

### name

> `readonly` **name**: `string`

The name of the topic to deny.

***

### outputAction?

> `readonly` `optional` **outputAction**: [`GuardrailAction`](../enumerations/GuardrailAction.md)

The action to take when a topic is detected in the output.

***

### outputEnabled?

> `readonly` `optional` **outputEnabled**: `boolean`

Whether the topic filter is enabled for output.
