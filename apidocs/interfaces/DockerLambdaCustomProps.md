[**@cdklabs/generative-ai-cdk-constructs**](../README.md)

***

[@cdklabs/generative-ai-cdk-constructs](../README.md) / DockerLambdaCustomProps

# Interface: DockerLambdaCustomProps

DockerLambdaCustomProps

## Properties

### adotInstrumentation?

> `readonly` `optional` **adotInstrumentation**: `AdotInstrumentationConfig`

Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.

#### Default

```ts
- No ADOT instrumentation
```

#### Stability

stable

***

### allowAllIpv6Outbound?

> `readonly` `optional` **allowAllIpv6Outbound**: `boolean`

Whether to allow the Lambda to send all ipv6 network traffic.
If set to true, there will only be a single egress rule which allows all
outbound ipv6 traffic. If set to false, you must individually add traffic rules to allow the
Lambda to connect to network targets using ipv6.

Do not specify this property if the `securityGroups` or `securityGroup` property is set.
Instead, configure `allowAllIpv6Outbound` directly on the security group.

#### Default

```ts
false
```

#### Stability

stable

***

### applicationLogLevelV2?

> `readonly` `optional` **applicationLogLevelV2**: `ApplicationLogLevel`

Sets the application log level for the function.

#### Default

```ts
ApplicationLogLevel.INFO
```

#### Stability

stable

***

### architecture?

> `readonly` `optional` **architecture**: `Architecture`

The system architectures compatible with this lambda function.

#### Default

```ts
Architecture.X86_64
```

#### Stability

stable

***

### code

> `readonly` **code**: `DockerImageCode`

The source code of your Lambda function.
You can point to a file in an
Amazon Simple Storage Service (Amazon S3) bucket or specify your source
code as inline text.

#### Stability

stable

***

### codeSigningConfig?

> `readonly` `optional` **codeSigningConfig**: `ICodeSigningConfig`

Code signing config associated with this function.

#### Default

```ts
- Not Sign the Code
```

#### Stability

stable

***

### currentVersionOptions?

> `readonly` `optional` **currentVersionOptions**: `VersionOptions`

Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.

#### Default

- default options as described in `VersionOptions`

#### Stability

stable

***

### deadLetterQueue?

> `readonly` `optional` **deadLetterQueue**: `IQueue`

The SQS queue to use if DLQ is enabled.
If SNS topic is desired, specify `deadLetterTopic` property instead.

#### Default

- SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`

#### Stability

stable

***

### deadLetterQueueEnabled?

> `readonly` `optional` **deadLetterQueueEnabled**: `boolean`

Enabled DLQ.
If `deadLetterQueue` is undefined,
an SQS queue with default options will be defined for your Function.

#### Default

- false unless `deadLetterQueue` is set, which implies DLQ is enabled.

#### Stability

stable

***

### deadLetterTopic?

> `readonly` `optional` **deadLetterTopic**: `ITopic`

The SNS topic to use as a DLQ.
Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.

#### Default

```ts
- no SNS topic
```

#### Stability

stable

***

### environment?

> `readonly` `optional` **environment**: `Record`\<`string`, `string`\>

Key-value pairs that Lambda caches and makes available for your Lambda functions.
Use environment variables to apply configuration changes, such
as test and production environment configurations, without changing your
Lambda function source code.

#### Default

```ts
- No environment variables.
```

#### Stability

stable

***

### environmentEncryption?

> `readonly` `optional` **environmentEncryption**: `IKey`

The AWS KMS key that's used to encrypt your function's environment variables.

#### Default

```ts
- AWS Lambda creates and uses an AWS managed customer master key (CMK).
```

#### Stability

stable

***

### ephemeralStorageSize?

> `readonly` `optional` **ephemeralStorageSize**: `Size`

The size of the function’s /tmp directory in MiB.

#### Default

```ts
512 MiB
```

#### Stability

stable

***

### events?

> `readonly` `optional` **events**: `IEventSource`[]

Event sources for this function.
You can also add event sources using `addEventSource`.

#### Default

```ts
- No event sources.
```

#### Stability

stable

***

### filesystem?

> `readonly` `optional` **filesystem**: `FileSystem`

The filesystem configuration for the lambda function.

#### Default

```ts
- will not mount any filesystem
```

#### Stability

stable

***

### initialPolicy?

> `readonly` `optional` **initialPolicy**: `PolicyStatement`[]

Initial policy statements to add to the created Lambda Role.
You can call `addToRolePolicy` to the created lambda to add statements post creation.

#### Default

```ts
- No policy statements are added to the created Lambda role.
```

#### Stability

stable

***

### insightsVersion?

> `readonly` `optional` **insightsVersion**: `LambdaInsightsVersion`

Specify the version of CloudWatch Lambda insights to use for monitoring.

#### Default

```ts
- No Lambda Insights
```

#### Stability

stable

***

### ipv6AllowedForDualStack?

> `readonly` `optional` **ipv6AllowedForDualStack**: `boolean`

Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.
Only used if 'vpc' is supplied.

#### Default

```ts
false
```

#### Stability

stable

***

### loggingFormat?

> `readonly` `optional` **loggingFormat**: `LoggingFormat`

Sets the loggingFormat for the function.

#### Default

```ts
LoggingFormat.TEXT
```

#### Stability

stable

***

### logGroup?

> `readonly` `optional` **logGroup**: `ILogGroup`

The log group the function sends logs to.
By default, Lambda functions send logs to an automatically created default log group named /aws/lambda/\<function name\>.
However you cannot change the properties of this auto-created log group using the AWS CDK, e.g. you cannot set a different log retention.

Use the `logGroup` property to create a fully customizable LogGroup ahead of time, and instruct the Lambda function to send logs to it.

Providing a user-controlled log group was rolled out to commercial regions on 2023-11-16.
If you are deploying to another type of region, please check regional availability first.

#### Default

`/aws/lambda/${this.functionName}` - default log group created by Lambda

#### Stability

stable

***

### logRetention?

> `readonly` `optional` **logRetention**: `RetentionDays`

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

#### Default

```ts
logs.RetentionDays.INFINITE
```

#### Stability

stable

***

### logRetentionRetryOptions?

> `readonly` `optional` **logRetentionRetryOptions**: `LogRetentionRetryOptions`

When log retention is specified, a custom resource attempts to create the CloudWatch log group.
These options control the retry policy when interacting with CloudWatch APIs.

This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
`logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.

#### Default

```ts
- Default AWS SDK retry options.
```

#### Stability

stable

***

### logRetentionRole?

> `readonly` `optional` **logRetentionRole**: `IRole`

The IAM role for the Lambda function associated with the custom resource that sets the retention policy.
This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
`logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.

#### Default

```ts
- A new role is created.
```

#### Stability

stable

***

### maxEventAge?

> `readonly` `optional` **maxEventAge**: `Duration`

The maximum age of a request that Lambda sends to a function for processing.
Minimum: 60 seconds
Maximum: 6 hours

#### Default

```ts
Duration.hours(6)
```

#### Stability

stable

***

### memorySize?

> `readonly` `optional` **memorySize**: `number`

The amount of memory, in MB, that is allocated to your Lambda function.
Lambda uses this value to proportionally allocate the amount of CPU
power. For more information, see Resource Model in the AWS Lambda
Developer Guide.

#### Default

```ts
128
```

#### Stability

stable

***

### onFailure?

> `readonly` `optional` **onFailure**: `IDestination`

The destination for failed invocations.

#### Default

```ts
- no destination
```

#### Stability

stable

***

### onSuccess?

> `readonly` `optional` **onSuccess**: `IDestination`

The destination for successful invocations.

#### Default

```ts
- no destination
```

#### Stability

stable

***

### paramsAndSecrets?

> `readonly` `optional` **paramsAndSecrets**: `ParamsAndSecretsLayerVersion`

Specify the configuration of Parameters and Secrets Extension.

#### Default

```ts
- No Parameters and Secrets Extension
```

#### Stability

stable

***

### profiling?

> `readonly` `optional` **profiling**: `boolean`

Enable profiling.

#### Default

```ts
- No profiling.
```

#### Stability

stable

***

### profilingGroup?

> `readonly` `optional` **profilingGroup**: `IProfilingGroup`

Profiling Group.

#### Default

- A new profiling group will be created if `profiling` is set.

#### Stability

stable

***

### recursiveLoop?

> `readonly` `optional` **recursiveLoop**: `RecursiveLoop`

Sets the Recursive Loop Protection for Lambda Function.
It lets Lambda detect and terminate unintended recursive loops.

#### Default

```ts
RecursiveLoop.Terminate
```

#### Stability

stable

***

### reservedConcurrentExecutions?

> `readonly` `optional` **reservedConcurrentExecutions**: `number`

The maximum of concurrent executions you want to reserve for the function.

#### Default

```ts
- No specific limit - account limit.
```

#### Stability

stable

***

### retryAttempts?

> `readonly` `optional` **retryAttempts**: `number`

The maximum number of times to retry when the function returns an error.
Minimum: 0
Maximum: 2

#### Default

```ts
2
```

#### Stability

stable

***

### runtimeManagementMode?

> `readonly` `optional` **runtimeManagementMode**: `RuntimeManagementMode`

Sets the runtime management configuration for a function's version.

#### Default

```ts
Auto
```

#### Stability

stable

***

### snapStart?

> `readonly` `optional` **snapStart**: `SnapStartConf`

Enable SnapStart for Lambda Function.
SnapStart is currently supported for Java 11, Java 17, Python 3.12, Python 3.13, and .NET 8 runtime

#### Default

```ts
- No snapstart
```

#### Stability

stable

***

### systemLogLevelV2?

> `readonly` `optional` **systemLogLevelV2**: `SystemLogLevel`

Sets the system log level for the function.

#### Default

```ts
SystemLogLevel.INFO
```

#### Stability

stable

***

### timeout?

> `readonly` `optional` **timeout**: `Duration`

The function execution time (in seconds) after which Lambda terminates the function.
Because the execution time affects cost, set this value
based on the function's expected execution time.

#### Default

```ts
Duration.seconds(3)
```

#### Stability

stable
