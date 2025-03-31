[**@cdklabs/generative-ai-cdk-constructs**](../../../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../../../README.md) / [bedrock](../README.md) / AgentActionGroupProps

# Interface: AgentActionGroupProps

***************************************************************************
                        PROPS - Action Group Class
***************************************************************************

## Properties

### apiSchema?

> `readonly` `optional` **apiSchema**: [`ApiSchema`](../classes/ApiSchema.md)

The API Schema

#### Default

```ts
- No API Schema
```

***

### description?

> `readonly` `optional` **description**: `string`

A description of the action group.

#### Default

```ts
- No description
```

***

### enabled?

> `readonly` `optional` **enabled**: `boolean`

Specifies whether the action group is available for the agent to invoke or
not when sending an InvokeAgent request.

#### Default

```ts
true
```

***

### executor?

> `readonly` `optional` **executor**: [`ActionGroupExecutor`](../classes/ActionGroupExecutor.md)

The action group executor.

#### Default

```ts
- No executor
```

***

### forceDelete?

> `readonly` `optional` **forceDelete**: `boolean`

Specifies whether to delete the resource even if it's in use.

#### Default

```ts
false
```

***

### functionSchema?

> `readonly` `optional` **functionSchema**: `FunctionSchemaProperty`

Defines functions that each define parameters that the agent needs to invoke from the user.
NO L2 yet as this doesn't make much sense IMHO

***

### name

> `readonly` **name**: `string`

The name of the action group.

***

### parentActionGroupSignature?

> `readonly` `optional` **parentActionGroupSignature**: [`ParentActionGroupSignature`](../classes/ParentActionGroupSignature.md)

The AWS Defined signature for enabling certain capabilities in your agent.
When this property is specified, you must leave the description, apiSchema,
and actionGroupExecutor fields blank for this action group
