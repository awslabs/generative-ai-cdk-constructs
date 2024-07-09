// ~~ Generated by projen. To modify, edit .projenrc.ts and run "npx projen".
import type { aws_codeguruprofiler, aws_iam, aws_kms, aws_lambda, aws_logs, aws_sns, aws_sqs, Duration, Size } from 'aws-cdk-lib';

/**
 * DockerLambdaCustomProps
 */
export interface DockerLambdaCustomProps {
  /**
   * The source code of your Lambda function.
   * You can point to a file in an
   * Amazon Simple Storage Service (Amazon S3) bucket or specify your source
   * code as inline text.
   */
  readonly code: aws_lambda.DockerImageCode;
  /**
   * The function execution time (in seconds) after which Lambda terminates the function.
   * Because the execution time affects cost, set this value
   * based on the function's expected execution time.
   * @default Duration.seconds(3)
   */
  readonly timeout?: Duration;
  /**
   * Sets the system log level for the function.
   * @default "INFO"
   */
  readonly systemLogLevel?: string;
  /**
   * Enable SnapStart for Lambda Function.
   * SnapStart is currently supported only for Java 11, 17 runtime
   * @default - No snapstart
   */
  readonly snapStart?: aws_lambda.SnapStartConf;
  /**
   * Sets the runtime management configuration for a function's version.
   * @default Auto
   */
  readonly runtimeManagementMode?: aws_lambda.RuntimeManagementMode;
  /**
   * The maximum of concurrent executions you want to reserve for the function.
   * @default - No specific limit - account limit.
   */
  readonly reservedConcurrentExecutions?: number;
  /**
   * Profiling Group.
   * @default - A new profiling group will be created if `profiling` is set.
   */
  readonly profilingGroup?: aws_codeguruprofiler.IProfilingGroup;
  /**
   * Enable profiling.
   * @default - No profiling.
   */
  readonly profiling?: boolean;
  /**
   * Specify the configuration of Parameters and Secrets Extension.
   * @default - No Parameters and Secrets Extension
   */
  readonly paramsAndSecrets?: aws_lambda.ParamsAndSecretsLayerVersion;
  /**
   * The amount of memory, in MB, that is allocated to your Lambda function.
   * Lambda uses this value to proportionally allocate the amount of CPU
   * power. For more information, see Resource Model in the AWS Lambda
   * Developer Guide.
   * @default 128
   */
  readonly memorySize?: number;
  /**
   * The IAM role for the Lambda function associated with the custom resource that sets the retention policy.
   * This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
   * `logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.
   * @default - A new role is created.
   */
  readonly logRetentionRole?: aws_iam.IRole;
  /**
   * When log retention is specified, a custom resource attempts to create the CloudWatch log group.
   * These options control the retry policy when interacting with CloudWatch APIs.
   *
   * This is a legacy API and we strongly recommend you migrate to `logGroup` if you can.
   * `logGroup` allows you to create a fully customizable log group and instruct the Lambda function to send logs to it.
   * @default - Default AWS SDK retry options.
   */
  readonly logRetentionRetryOptions?: aws_lambda.LogRetentionRetryOptions;
  /**
   * The number of days log events are kept in CloudWatch Logs.
   * When updating
   * this property, unsetting it doesn't remove the log retention policy. To
   * remove the retention policy, set the value to `INFINITE`.
   *
   * This is a legacy API and we strongly recommend you move away from it if you can.
   * Instead create a fully customizable log group with `logs.LogGroup` and use the `logGroup` property
   * to instruct the Lambda function to send logs to it.
   * Migrating from `logRetention` to `logGroup` will cause the name of the log group to change.
   * Users and code and referencing the name verbatim will have to adjust.
   *
   * In AWS CDK code, you can access the log group name directly from the LogGroup construct:
   * ```ts
   * import * as logs from 'aws-cdk-lib/aws-logs';
   *
   * declare const myLogGroup: logs.LogGroup;
   * myLogGroup.logGroupName;
   * ```
   * @default logs.RetentionDays.INFINITE
   */
  readonly logRetention?: aws_logs.RetentionDays;
  /**
   * The log group the function sends logs to.
   * By default, Lambda functions send logs to an automatically created default log group named /aws/lambda/\<function name\>.
   * However you cannot change the properties of this auto-created log group using the AWS CDK, e.g. you cannot set a different log retention.
   *
   * Use the `logGroup` property to create a fully customizable LogGroup ahead of time, and instruct the Lambda function to send logs to it.
   *
   * Providing a user-controlled log group was rolled out to commercial regions on 2023-11-16.
   * If you are deploying to another type of region, please check regional availability first.
   * @default `/aws/lambda/${this.functionName}` - default log group created by Lambda
   */
  readonly logGroup?: aws_logs.ILogGroup;
  /**
   * Sets the loggingFormat for the function.
   * @default LoggingFormat.TEXT
   */
  readonly loggingFormat?: aws_lambda.LoggingFormat;
  /**
   * Sets the logFormat for the function.
   * @default "Text"
   */
  readonly logFormat?: string;
  /**
   * Allows outbound IPv6 traffic on VPC functions that are connected to dual-stack subnets.
   * Only used if 'vpc' is supplied.
   * @default false
   */
  readonly ipv6AllowedForDualStack?: boolean;
  /**
   * Specify the version of CloudWatch Lambda insights to use for monitoring.
   * @default - No Lambda Insights
   */
  readonly insightsVersion?: aws_lambda.LambdaInsightsVersion;
  /**
   * Initial policy statements to add to the created Lambda Role.
   * You can call `addToRolePolicy` to the created lambda to add statements post creation.
   * @default - No policy statements are added to the created Lambda role.
   */
  readonly initialPolicy?: Array<aws_iam.PolicyStatement>;
  /**
   * The filesystem configuration for the lambda function.
   * @default - will not mount any filesystem
   */
  readonly filesystem?: aws_lambda.FileSystem;
  /**
   * Event sources for this function.
   * You can also add event sources using `addEventSource`.
   * @default - No event sources.
   */
  readonly events?: Array<aws_lambda.IEventSource>;
  /**
   * The size of the function’s /tmp directory in MiB.
   * @default 512 MiB
   */
  readonly ephemeralStorageSize?: Size;
  /**
   * The AWS KMS key that's used to encrypt your function's environment variables.
   * @default - AWS Lambda creates and uses an AWS managed customer master key (CMK).
   */
  readonly environmentEncryption?: aws_kms.IKey;
  /**
   * Key-value pairs that Lambda caches and makes available for your Lambda functions.
   * Use environment variables to apply configuration changes, such
   * as test and production environment configurations, without changing your
   * Lambda function source code.
   * @default - No environment variables.
   */
  readonly environment?: Record<string, string>;
  /**
   * The SNS topic to use as a DLQ.
   * Note that if `deadLetterQueueEnabled` is set to `true`, an SQS queue will be created
   * rather than an SNS topic. Using an SNS topic as a DLQ requires this property to be set explicitly.
   * @default - no SNS topic
   */
  readonly deadLetterTopic?: aws_sns.ITopic;
  /**
   * Enabled DLQ.
   * If `deadLetterQueue` is undefined,
   * an SQS queue with default options will be defined for your Function.
   * @default - false unless `deadLetterQueue` is set, which implies DLQ is enabled.
   */
  readonly deadLetterQueueEnabled?: boolean;
  /**
   * The SQS queue to use if DLQ is enabled.
   * If SNS topic is desired, specify `deadLetterTopic` property instead.
   * @default - SQS queue with 14 day retention period if `deadLetterQueueEnabled` is `true`
   */
  readonly deadLetterQueue?: aws_sqs.IQueue;
  /**
   * Options for the `lambda.Version` resource automatically created by the `fn.currentVersion` method.
   * @default - default options as described in `VersionOptions`
   */
  readonly currentVersionOptions?: aws_lambda.VersionOptions;
  /**
   * Code signing config associated with this function.
   * @default - Not Sign the Code
   */
  readonly codeSigningConfig?: aws_lambda.ICodeSigningConfig;
  /**
   * The system architectures compatible with this lambda function.
   * @default Architecture.X86_64
   */
  readonly architecture?: aws_lambda.Architecture;
  /**
   * Sets the application log level for the function.
   * @default "INFO"
   */
  readonly applicationLogLevel?: string;
  /**
   * Specify the configuration of AWS Distro for OpenTelemetry (ADOT) instrumentation.
   * @default - No ADOT instrumentation
   */
  readonly adotInstrumentation?: aws_lambda.AdotInstrumentationConfig;
  /**
   * The maximum number of times to retry when the function returns an error.
   * Minimum: 0
   * Maximum: 2
   * @default 2
   */
  readonly retryAttempts?: number;
  /**
   * The destination for successful invocations.
   * @default - no destination
   */
  readonly onSuccess?: aws_lambda.IDestination;
  /**
   * The destination for failed invocations.
   * @default - no destination
   */
  readonly onFailure?: aws_lambda.IDestination;
  /**
   * The maximum age of a request that Lambda sends to a function for processing.
   * Minimum: 60 seconds
   * Maximum: 6 hours
   * @default Duration.hours(6)
   */
  readonly maxEventAge?: Duration;
}
