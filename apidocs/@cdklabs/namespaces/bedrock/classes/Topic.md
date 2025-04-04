[**@cdklabs/generative-ai-cdk-constructs**](../../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../../README.md) / [bedrock](../README.md) / Topic

# Class: Topic

Defines a topic to deny.

## Constructors

### Constructor

> `protected` **new Topic**(`props`): `Topic`

#### Parameters

##### props

[`CustomTopicProps`](../interfaces/CustomTopicProps.md)

#### Returns

`Topic`

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

> `readonly` `static` **FINANCIAL\_ADVICE**: `Topic`

***

### INAPPROPRIATE\_CONTENT

> `readonly` `static` **INAPPROPRIATE\_CONTENT**: `Topic`

***

### LEGAL\_ADVICE

> `readonly` `static` **LEGAL\_ADVICE**: `Topic`

***

### MEDICAL\_ADVICE

> `readonly` `static` **MEDICAL\_ADVICE**: `Topic`

***

### POLITICAL\_ADVICE

> `readonly` `static` **POLITICAL\_ADVICE**: `Topic`

## Methods

### custom()

> `static` **custom**(`props`): `Topic`

#### Parameters

##### props

[`CustomTopicProps`](../interfaces/CustomTopicProps.md)

#### Returns

`Topic`
