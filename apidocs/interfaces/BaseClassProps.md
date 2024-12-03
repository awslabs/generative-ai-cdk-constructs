[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BaseClassProps

# Interface: BaseClassProps

## Properties

### constructId

> `readonly` **constructId**: `string`

construct id.

***

### constructName

> `readonly` **constructName**: [`ConstructName`](../enumerations/ConstructName.md)

name of the construct.

***

### observability?

> `readonly` `optional` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

#### Default

```ts
- true
```

***

### stage?

> `readonly` `optional` **stage**: `string`

Value will be appended to resources name.

#### Default

```ts
- _dev
```
