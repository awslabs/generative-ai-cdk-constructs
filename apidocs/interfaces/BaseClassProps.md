[@cdklabs/generative-ai-cdk-constructs](../README.md) / BaseClassProps

# Interface: BaseClassProps

## Table of contents

### Properties

- [constructId](BaseClassProps.md#constructid)
- [constructorName](BaseClassProps.md#constructorname)
- [enableOperationalMetric](BaseClassProps.md#enableoperationalmetric)
- [observability](BaseClassProps.md#observability)
- [stage](BaseClassProps.md#stage)

## Properties

### constructId

• `Readonly` **constructId**: `string`

construct id.

___

### constructorName

• `Readonly` **constructorName**: `string`

name of the construct.

___

### enableOperationalMetric

• `Optional` `Readonly` **enableOperationalMetric**: `boolean`

Optional.CDK constructs provided collects anonymous operational
metrics to help AWS improve the quality and features of the
constructs. Data collection is subject to the AWS Privacy Policy
(https://aws.amazon.com/privacy/). To opt out of this feature,
simply disable it by setting the construct property
"enableOperationalMetric" to false for each construct used.

**`Default`**

```ts
- true
```

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
