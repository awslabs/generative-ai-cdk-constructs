[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md) • **Docs**

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / DeniedTopic

# Interface: DeniedTopic

Defines a topic to deny.

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

### examples?

> `readonly` `optional` **examples**: `string`[]

Representative phrases that refer to the topic. These phrases can represent
a user input or a model response. Add up to 5 phrases, up to 100 characters
each.

#### Example

```ts
"Where should I invest my money?"
```

***

### name

> `readonly` **name**: `string`

The name of the topic to deny.
