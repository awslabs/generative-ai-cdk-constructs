[@cdklabs/generative-ai-cdk-constructs](../README.md) / DockerLambdaCustomProps

# Interface: DockerLambdaCustomProps

DockerLambdaCustomProps

## Table of contents

### Properties

- [adotInstrumentation](DockerLambdaCustomProps.md#adotinstrumentation)
- [applicationLogLevel](DockerLambdaCustomProps.md#applicationloglevel)
- [architecture](DockerLambdaCustomProps.md#architecture)
- [code](DockerLambdaCustomProps.md#code)
- [codeSigningConfig](DockerLambdaCustomProps.md#codesigningconfig)
- [currentVersionOptions](DockerLambdaCustomProps.md#currentversionoptions)
- [deadLetterQueue](DockerLambdaCustomProps.md#deadletterqueue)
- [deadLetterQueueEnabled](DockerLambdaCustomProps.md#deadletterqueueenabled)
- [deadLetterTopic](DockerLambdaCustomProps.md#deadlettertopic)
- [environment](DockerLambdaCustomProps.md#environment)
- [environmentEncryption](DockerLambdaCustomProps.md#environmentencryption)
- [ephemeralStorageSize](DockerLambdaCustomProps.md#ephemeralstoragesize)
- [events](DockerLambdaCustomProps.md#events)
- [filesystem](DockerLambdaCustomProps.md#filesystem)
- [initialPolicy](DockerLambdaCustomProps.md#initialpolicy)
- [insightsVersion](DockerLambdaCustomProps.md#insightsversion)
- [ipv6AllowedForDualStack](DockerLambdaCustomProps.md#ipv6allowedfordualstack)
- [logFormat](DockerLambdaCustomProps.md#logformat)
- [logGroup](DockerLambdaCustomProps.md#loggroup)
- [logRetention](DockerLambdaCustomProps.md#logretention)
- [logRetentionRetryOptions](DockerLambdaCustomProps.md#logretentionretryoptions)
- [logRetentionRole](DockerLambdaCustomProps.md#logretentionrole)
- [loggingFormat](DockerLambdaCustomProps.md#loggingformat)
- [maxEventAge](DockerLambdaCustomProps.md#maxeventage)
- [memorySize](DockerLambdaCustomProps.md#memorysize)
- [onFailure](DockerLambdaCustomProps.md#onfailure)
- [onSuccess](DockerLambdaCustomProps.md#onsuccess)
- [paramsAndSecrets](DockerLambdaCustomProps.md#paramsandsecrets)
- [profiling](DockerLambdaCustomProps.md#profiling)
- [profilingGroup](DockerLambdaCustomProps.md#profilinggroup)
- [reservedConcurrentExecutions](DockerLambdaCustomProps.md#reservedconcurrentexecutions)
- [retryAttempts](DockerLambdaCustomProps.md#retryattempts)
- [runtimeManagementMode](DockerLambdaCustomProps.md#runtimemanagementmode)
- [snapStart](DockerLambdaCustomProps.md#snapstart)
- [systemLogLevel](DockerLambdaCustomProps.md#systemloglevel)
- [timeout](DockerLambdaCustomProps.md#timeout)

## Properties

### adotInstrumentation

• `Optional` `Readonly` **adotInstrumentation**: `AdotInstrumentationConfig`

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

**`Default`**

```ts
- No ADOT instrumentation
```

**`Stability`**

stable

___

### applicationLogLevel

• `Optional` `Readonly` **applicationLogLevel**: `string`

Sets the application log level for the function.

**`Default`**

```ts
"INFO"
```

**`Stability`**

stable

___

### architecture

• `Optional` `Readonly` **architecture**: `Architecture`

The system architectures compatible with this lambda function.

**`Default`**

```ts
Architecture.X86_64
```

**`Stability`**

stable

___

### code

• `Readonly` **code**: `DockerImageCode`

The source code of your Lambda function.
You can point to a file in an
Amazon Simple Storage Service (Amazon S3) bucket or specify your source
code as inline text.

**`Stability`**

stable

___

### codeSigningConfig

• `Optional` `Readonly` **codeSigningConfig**: `ICodeSigningConfig`

Code signing config associated with this function.

**`Default`**

```ts
- Not Sign the Code
```

**`Stability`**

stable

___

### currentVersionOptions

• `Optional` `Readonly` **currentVersionOptions**: `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

**`Default`**

- default options as described in `VersionOptions`

**`Stability`**

stable

___

### deadLetterQueue

• `Optional` `Readonly` **deadLetterQueue**: `IQueue`

The SQS queue to use if DLQ is enabled.
If SNS topic is desired, specify `deadLetterTopic` property instead.

**`Default`**

- SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

**`Stability`**

stable

___

### deadLetterQueueEnabled

• `Optional` `Readonly` **deadLetterQueueEnabled**: `boolean`

Enabled DLQ.
If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

**`Default`**

- false unless `deadLetterQueue` is set, which implies DLQ is enabled.

**`Stability`**

stable

___

### deadLetterTopic

• `Optional` `Readonly` **deadLetterTopic**: `ITopic`

The SNS topic to use as a DLQ.
Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

**`Default`**

```ts
- no SNS topic
```

**`Stability`**

stable

___

### environment

• `Optional` `Readonly` **environment**: `Record`\<`string`, `string`\>

Key-value pairs that Lambda caches and makes available for your Lambda functions.
Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

**`Default`**

```ts
- No environment variables.
```

**`Stability`**

stable

___

### environmentEncryption

• `Optional` `Readonly` **environmentEncryption**: `IKey`

The AWS KMS key that's used to encrypt your function's environment variables.

**`Default`**

```ts
- AWS Lambda creates and uses an AWS managed customer master key (CMK).
```

**`Stability`**

stable

___

### ephemeralStorageSize

• `Optional` `Readonly` **ephemeralStorageSize**: `Size`

The size of the function’s /tmp directory in MiB.

**`Default`**

```ts
512 MiB
```

**`Stability`**

stable

___

### events

• `Optional` `Readonly` **events**: `IEventSource`[]

Event sources for this function.
You can also add event sources using `addEventSource`.

**`Default`**

```ts
- No event sources.
```

**`Stability`**

stable

___

### filesystem

• `Optional` `Readonly` **filesystem**: `FileSystem`

The filesystem configuration for the lambda function.

**`Default`**

```ts
- will not mount any filesystem
```

**`Stability`**

stable

___

### initialPolicy

• `Optional` `Readonly` **initialPolicy**: `PolicyStatement`[]

Initial policy statements to add to the created Lambda Role.
You can call `addToRolePolicy` to the created lambda to add statements post creation.

**`Default`**

```ts
- No policy statements are added to the created Lambda role.
```

**`Stability`**

stable

___

### insightsVersion

• `Optional` `Readonly` **insightsVersion**: `LambdaInsightsVersion`

Specify the version of CloudWatch Lambda insights to use for monitoring.

**`Default`**

```ts
- No Lambda Insights
```

**`Stability`**

stable

___

### ipv6AllowedForDualStack

• `Optional` `Readonly` **ipv6AllowedForDualStack**: `boolean`

Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.
Only used if 'vpc' is supplied.

**`Default`**

```ts
false
```

**`Stability`**

stable

___

### logFormat

• `Optional` `Readonly` **logFormat**: `string`

Sets the logFormat for the function.

**`Default`**

```ts
"Text"
```

**`Stability`**

stable

___

### logGroup

• `Optional` `Readonly` **logGroup**: `ILogGroup`

The log group the function sends logs to.
By default, Lambda functions send logs to an automatically created default log group named /aws/lambda/\<function name\>.
However you cannot change the properties of this auto-created log group using the AWS CDK, e.g. you cannot set a different log retention.

Use the `logGroup` property to create a fully customizable LogGroup ahead of time, and instruct the Lambda function to send logs to it.

Providing a user-controlled log group was rolled out to commercial regions on 2023-11-16.
If you are deploying to another type of region, please check regional availability first.

**`Default`**

`/aws/lambda/${this.functionName}` - default log group created by Lambda

**`Stability`**

stable

___

### logRetention

• `Optional` `Readonly` **logRetention**: `RetentionDays`

The number of days log events are kept in CloudWatch Logs.
When updating
this property, unsetting it doesn't remove the log retention policy. To
remove the retention policy, set the value to `INFINITE`.

This is a legacy API and we strongly recommend you move away from it if you can.
Instead create a fully customizable log group with `logs.LogGroup` and use the `logGroup` property
to instruct the Lambda function to send logs to it.
Migrating from `logRetention` to `logGroup` will cause the name of the log group to change.
Users and code and referencing the name verbatim will have to adjust.

In AWS CDK code, you can access the log group name directly from the LogGroup construct:
```ts
import * as logs from 'aws-cdk-lib/aws-logs';

declare const myLogGroup: logs.LogGroup;
myLogGroup.logGroupName;
```

**`Default`**

```ts
logs.RetentionDays.INFINITE
```

**`Stability`**

stable

___

### logRetentionRetryOptions

• `Optional` `Readonly` **logRetentionRetryOptions**: `LogRetentionRetryOptions`

When log retention is specified, a custom resource attempts to create the CloudWatch log group.
These options control the retry policy when interacting with CloudWatch APIs.

This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
`logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.

**`Default`**

```ts
- Default AWS SDK retry options.
```

**`Stability`**

stable

___

### logRetentionRole

• `Optional` `Readonly` **logRetentionRole**: `IRole`

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.
This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
`logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.

**`Default`**

```ts
- A new role is created.
```

**`Stability`**

stable

___

### loggingFormat

• `Optional` `Readonly` **loggingFormat**: `LoggingFormat`

Sets the loggingFormat for the function.

**`Default`**

```ts
LoggingFormat.TEXT
```

**`Stability`**

stable

___

### maxEventAge

• `Optional` `Readonly` **maxEventAge**: `Duration`

The maximum age of a request that Lambda sends to a function for processing.
Minimum: 60 seconds
Maximum: 6 hours

**`Default`**

```ts
Duration.hours(6)
```

**`Stability`**

stable

___

### memorySize

• `Optional` `Readonly` **memorySize**: `number`

The amount of memory, in MB, that is allocated to your Lambda function.
Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

**`Default`**

```ts
128
```

**`Stability`**

stable

___

### onFailure

• `Optional` `Readonly` **onFailure**: `IDestination`

The destination for failed invocations.

**`Default`**

```ts
- no destination
```

**`Stability`**

stable

___

### onSuccess

• `Optional` `Readonly` **onSuccess**: `IDestination`

The destination for successful invocations.

**`Default`**

```ts
- no destination
```

**`Stability`**

stable

___

### paramsAndSecrets

• `Optional` `Readonly` **paramsAndSecrets**: `ParamsAndSecretsLayerVersion`

Specify the configuration of Parameters and Secrets Extension.

**`Default`**

```ts
- No Parameters and Secrets Extension
```

**`Stability`**

stable

___

### profiling

• `Optional` `Readonly` **profiling**: `boolean`

Enable profiling.

**`Default`**

```ts
- No profiling.
```

**`Stability`**

stable

___

### profilingGroup

• `Optional` `Readonly` **profilingGroup**: `IProfilingGroup`

Profiling Group.

**`Default`**

- A new profiling group will be created if `profiling` is set.

**`Stability`**

stable

___

### reservedConcurrentExecutions

• `Optional` `Readonly` **reservedConcurrentExecutions**: `number`

The maximum of concurrent executions you want to reserve for the function.

**`Default`**

```ts
- No specific limit - account limit.
```

**`Stability`**

stable

___

### retryAttempts

• `Optional` `Readonly` **retryAttempts**: `number`

The maximum number of times to retry when the function returns an error.
Minimum: 0
Maximum: 2

**`Default`**

```ts
2
```

**`Stability`**

stable

___

### runtimeManagementMode

• `Optional` `Readonly` **runtimeManagementMode**: `RuntimeManagementMode`

Sets the runtime management configuration for a function's version.

**`Default`**

```ts
Auto
```

**`Stability`**

stable

___

### snapStart

• `Optional` `Readonly` **snapStart**: `SnapStartConf`

Enable SnapStart for Lambda Function.
SnapStart is currently supported only for Java 11, 17 runtime

**`Default`**

```ts
- No snapstart
```

**`Stability`**

stable

___

### systemLogLevel

• `Optional` `Readonly` **systemLogLevel**: `string`

Sets the system log level for the function.

**`Default`**

```ts
"INFO"
```

**`Stability`**

stable

___

### timeout

• `Optional` `Readonly` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates the function.
Because the execution time affects cost, set this value
based on the function's expected execution time.

**`Default`**

```ts
Duration.seconds(3)
```

**`Stability`**

stable
