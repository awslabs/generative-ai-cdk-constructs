[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / Topic

# Class: Topic

Defines a topic to deny.

## Constructors

### new Topic()

> `protected` **new Topic**(`props`): [`Topic`](Topic.md)

#### Parameters

##### props

[`CustomTopicProps`](../interfaces/CustomTopicProps.md)

#### Returns

[`Topic`](Topic.md)

## Properties

### definition

> `readonly` **definition**: `string`

Definition of the topic.

***

### examples?

> `readonly` `optional` **examples**: `string`[]

Representative phrases that refer to the topic.

***

### name

> `readonly` **name**: `string`

The name of the topic to deny.

***

### FINANCIAL\_ADVICE

> `readonly` `static` **FINANCIAL\_ADVICE**: [`Topic`](Topic.md)

***

### INAPPROPRIATE\_CONTENT

> `readonly` `static` **INAPPROPRIATE\_CONTENT**: [`Topic`](Topic.md)

***

### LEGAL\_ADVICE

> `readonly` `static` **LEGAL\_ADVICE**: [`Topic`](Topic.md)

***

### MEDICAL\_ADVICE

> `readonly` `static` **MEDICAL\_ADVICE**: [`Topic`](Topic.md)

***

### POLITICAL\_ADVICE

> `readonly` `static` **POLITICAL\_ADVICE**: [`Topic`](Topic.md)

## Methods

### custom()

> `static` **custom**(`props`): [`Topic`](Topic.md)

#### Parameters

##### props

[`CustomTopicProps`](../interfaces/CustomTopicProps.md)

#### Returns

[`Topic`](Topic.md)
