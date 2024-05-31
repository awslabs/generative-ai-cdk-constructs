[@cdklabs/generative-ai-cdk-constructs](../README.md) / BaseClassProps

# Interface: BaseClassProps

## Table of contents

### Properties

- [constructId](BaseClassProps.md#constructid)
- [constructName](BaseClassProps.md#constructname)
- [observability](BaseClassProps.md#observability)
- [stage](BaseClassProps.md#stage)

## Properties

### constructId

• `Readonly` **constructId**: `string`

construct id.

___

### constructName

• `Readonly` **constructName**: [`ConstructName`](../enums/ConstructName.md)

name of the construct.

___

### observability

• `Optional` `Readonly` **observability**: `boolean`

Enable observability. Warning: associated cost with the services
used. Best practice to enable by default.

**`Default`**

```ts
- true
```

___

### stage

• `Optional` `Readonly` **stage**: `string`

Value will be appended to resources name.

**`Default`**

```ts
- _dev
```
