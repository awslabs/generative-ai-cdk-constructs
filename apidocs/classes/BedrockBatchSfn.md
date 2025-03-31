[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / BedrockBatchSfn

# Class: BedrockBatchSfn

A state machine fragment that creates a Bedrock Batch Inference Job and waits for its completion.

Input schema:
```
{
  "job_name": string,        // Required. Name of the batch inference job
  "manifest_keys": string[],    // Required. List of S3 keys of the input manifest files
  "model_id": string        // Required. Model ID to use.
}
```

Output schema:
```
{
  "status": string,        // Required. Status of the batch job. One of: "Completed" or "PartiallyCompleted"
  "bucket": string,        // Required. S3 bucket where the output is stored
  "keys": string[]         // Required. Array of S3 keys for the output files
}
```

Error schema:
```
{
  "status": string,        // Required. Status will be one of: "Failed", "Stopped", or "Expired"
  "error": string,         // Required. Error code
  "cause": string          // Required. Error message
}
```

## Extends

- `StateMachineFragment`

## Constructors

### new BedrockBatchSfn()

> **new BedrockBatchSfn**(`parent`, `id`, `props`): [`BedrockBatchSfn`](BedrockBatchSfn.md)

#### Parameters

##### parent

`Construct`

##### id

`string`

##### props

[`BedrockBatchSfnProps`](../interfaces/BedrockBatchSfnProps.md)

#### Returns

[`BedrockBatchSfn`](BedrockBatchSfn.md)

#### Overrides

`sfn.StateMachineFragment.constructor`

## Properties

### endStates

> `readonly` **endStates**: `INextable`[]

The states to chain onto if this fragment is used

#### Overrides

`sfn.StateMachineFragment.endStates`

***

### node

> `readonly` **node**: `Node`

The tree node.

#### Inherited from

`sfn.StateMachineFragment.node`

***

### startState

> `readonly` **startState**: `State`

The start state of this state machine fragment

#### Overrides

`sfn.StateMachineFragment.startState`

## Accessors

### id

#### Get Signature

> **get** **id**(): `string`

Descriptive identifier for this chainable

##### Returns

`string`

#### Inherited from

`sfn.StateMachineFragment.id`

## Methods

### next()

> **next**(`next`): `Chain`

Continue normal execution with the given state

#### Parameters

##### next

`IChainable`

#### Returns

`Chain`

#### Inherited from

`sfn.StateMachineFragment.next`

***

### prefixStates()

> **prefixStates**(`prefix`?): `StateMachineFragment`

Prefix the IDs of all states in this state machine fragment

Use this to avoid multiple copies of the state machine all having the
same state IDs.

#### Parameters

##### prefix?

`string`

The prefix to add. Will use construct ID by default.

#### Returns

`StateMachineFragment`

#### Inherited from

`sfn.StateMachineFragment.prefixStates`

***

### toSingleState()

> **toSingleState**(`options`?): `Parallel`

Wrap all states in this state machine fragment up into a single state.

This can be used to add retry or error handling onto this state
machine fragment.

Be aware that this changes the result of the inner state machine
to be an array with the result of the state machine in it. Adjust
your paths accordingly. For example, change 'outputPath' to
'$[0]'.

#### Parameters

##### options?

`SingleStateOptions`

#### Returns

`Parallel`

#### Inherited from

`sfn.StateMachineFragment.toSingleState`

***

### toString()

> **toString**(): `string`

Returns a string representation of this construct.

#### Returns

`string`

#### Inherited from

`sfn.StateMachineFragment.toString`

***

### isConstruct()

> `static` **isConstruct**(`x`): `x is Construct`

Checks if `x` is a construct.

Use this method instead of `instanceof` to properly detect `Construct`
instances, even when the construct library is symlinked.

Explanation: in JavaScript, multiple copies of the `constructs` library on
disk are seen as independent, completely different libraries. As a
consequence, the class `Construct` in each copy of the `constructs` library
is seen as a different class, and an instance of one class will not test as
`instanceof` the other class. `npm install` will not create installations
like this, but users may manually symlink construct libraries together or
use a monorepo tool: in those cases, multiple copies of the `constructs`
library can be accidentally installed, and `instanceof` will behave
unpredictably. It is safest to avoid using `instanceof`, and using
this type-testing method instead.

#### Parameters

##### x

`any`

Any object

#### Returns

`x is Construct`

true if `x` is an object created from a class which extends `Construct`.

#### Inherited from

`sfn.StateMachineFragment.isConstruct`
