# Design Guidelines

# Emerging Tech Constructs Design Guidelines

One of the Emerging Tech Constructs tenets states:

> **Constructs are Consistent** - once customers are familiar with the use of Constructs, they can adopt additional constructs easily. Customers familiar with using the CDK can easily adopt Constructs.

This document defines the ways in which Constructs are consistent. These rules have emerged as we built the original Emerging Tech Constructs, and not every Emerging Tech Construct adheres to every rule. We will go back and refactor non-compliant constructs over time, as we can do so without making breaking changes. When proposing a Emerging Tech Construct, use this document to drive your design.

## Overall Guidelines

**Constructs Can Be Self Contained**

While passing an existing resource to Construct is essential to the ability to link Constructs together, it should never be required. If your Construct requires the client to create a resource to pass in as an argument to the constructor then you have probably not defined your Construct correctly or what you are designing is not a good fit for the Emerging Tech Constructs library.

**Use CDK definitions to define a service or resource**

The construct should not create new classes or interfaces to describe services or resources. Although the new class may seem simpler now, as new capabilities are added to the construct the new class will acquire new properties – the ultimate result would be something equivalent to the CDK definition, but not compatible. The CDK definitions are well thought out and interact predictably with other CDK constructs, use them. If you want a client the ability to specify a few attributes of a ConstructProps without specifying every required value, then make the type of that attribute ConstructProps | any. This pattern exists several places in the Emerging Tech Constructs library.

Another practice that this rule prohibits is putting specific attributes of sub resources in your Emerging Tech Constructs Props object. For instance - if your VPC needs an Internet Gateway, then the client should send VPC Props that create the Internet Gateway, don't create a property at in your Construct Props object of InternetGateway: true.

**The client should have the option (but not requirement) to provide any props used within the construct**

When you supply a CDK defined props object to any CDK constructor within your construct (L1 or L2), your construct should be able to generate all the default values required to create that L1 or L2 construct. Alternatively, the client should be able to override any or all of those default props values to completely customize the construct.

There are exceptions to this rule. The Lambda Function L2 construct, for instance, cannot specify a default value for the Lambda code – the client must provide this. Also, at times the workings of the construct require specific props values to work. In this situation, those values will override user provided values. In general, the props values sent to a CDK constructor are generated like this:

```
let actualProps = overrideProps(defaultProps, userProvidedProps);
actualProps = overrideProps(actualProps, constructRequiredProps)
```

Construct required props should be minimized and listed in the README.md file for the Construct.
There is a possibility that the client could specify some props values that are incompatible with default props values.  That is the responsibility of the client – if they choose to not use the default implementation then they take responsibility for the configuration they specify.

**The Minimal Deployable Pattern Definition should be minimal**

While a client should have great flexibility to fully specify how a Construct is deployed, the minimal deployment should consist of a single new statement. At times things like table schema might require some additional code – but if your minimal deployable solution is more than a couple lines long or requires creating one or more services first then your construct is outside the patterns for the library.

**No Business Logic**

The Construct should be restricted to deploying infrastructure. In general this means no schema and no code (eg – no implemented Lambda functions). We don’t rule out the idea that some future use case will require a Lambda function to accomplish an architectural need, but we have not seen that yet. Avoid including coded Lambda functions in your construct unless you’ve talked to us in advance to avoid disappointment.

**Favor L2 CDK Constructs over L1**

L1 CDK constructs are merely thin code wrappers over the raw CloudFormation definitions – they bring little if any additional value to the table. L2 CDK constructs provide additional functionality, security and interoperability. Whenever possible, Emerging Tech Constructs interfaces should speak in terms of L2 CDK constructs. If your definition includes L1 constructs it may not be rejected, but you will be asked to explain the reasons requiring their use. 

## VPCs

Clients may choose to deploy their architectures for any number of reasons. VPC capability should be added to constructs when traffic within the construct can be restricted within a VPC. For instance, for the construct aws-lambda-sqs, traffic from the lambda function can be configured to use an ENI in a VPC, and an Interface Endpoint for SQS can accept those calls within that VPC - so the traffic stays within the VPC. Conversely, aws-sqs-lambda cannot be configured within a VPC because the traffic consists of Lambda polling SQS and invoking the Lambda function synchronously, none of which can be configured within a VPC (although calls between AWS resources stay on the AWS backbone and do not hit the open web).

## Naming

The name of a Emerging Tech Construct is composed by concatenating the construct's purpose and the names of the individual services or resources configured by the construct. When it is obvious what resource is being deployed by the service, use just the service name, such as SQS, SNS, DynamoDB, etc. When just the service name is ambiguous, append the specific resource type to the service name, such as SagemakerEndpoint (also do this for a different flavor of an already deployed service, such as DynamoDBStream).

For the construct file name, separate the all lower-case service names by dashes and preface the whole name with “aws-“. For Example:

&emsp; &emsp; &emsp;aws-ragsource-apigateway-opensearch
&emsp; &emsp; &emsp;aws-apigateway-sagemakerendpoint

For the Typescript class name, use Pascal casing and concatenate the names separated by “To”. For Example:

&emsp; &emsp; &emsp;RagApigatewayToOpensearch
&emsp; &emsp; &emsp;ApigatewayToSagemakerendpoint

Once again, these rules became clear as we wrote all of the existing constructs and not all of the early constructs comply with these rules.

# Service Usage in Constructs
It's important for consistency that services are implemented consistently across Emerging Tech Constructs – that clients specify the same properties for a Lambda function in aws-s3-lambda and aws-sqs-lambda. This section specifies the require attributes on your Construct Props interface for each service currently in the library, as well as the reasons behind any exceptions. We are unlikely to approve a construct with additional attributes, although we may if the proposed new attribute is appropriate for us to implement across all constructs using that service.

If you are creating a construct that uses a service for the first time, defining the appropriate interface is a key step and we will work with you.

This version of the document also lists what Constructs currently violate these standards and whether making the object compliant would be a breaking change.

Existing Inconsistencies would not be published, that’s for our internal use – only the Required Properties and Attributes on Props would be published as requirements (along with specific notes).
 

## API Gateway
**Required Attributes on Props**

| Name| Type | Description | Notes |
| --- | --- | --- | --- |
| apiGatewayProps| [`api.RestApiProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.RestApiProps.html)|Optional user-provided props to override the default props for the API Gateway.|aws-cloudfront-apigateway is an exception (Covered below). ||
| allow*Name*Operation/*Name*OperationTemplate| `boolean`| Whether to deploy API Gateway Method for *Name* operation on *Target*.|Required in pairs for integration with DDB and SQS. |
| logGroupProps? | [`logs.LogGroupProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_logs.LogGroupProps.html)|User provided props to override the default props for for the CloudWatchLogs LogGroup.| |

**Required Construct Properties**

| Name    | Type   | Description | Notes    |
| --- | --- | --- | ---|
| apiGateway	| [`api.RestApi`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_apigateway.RestApi.html)|Returns an instance of the api.RestApi created by the construct.| |
|apiGatewayCloudwatchRole	|[`iam.Role`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Role.html)|Returns an instance of the iam.Role created by the construct for API Gateway for CloudWatch access.| |
| apiGatewayLogGroup	|[`logs.LogGroup`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_logs.LogGroup.html)|Returns an instance of the LogGroup created by the construct for API Gateway access logging to CloudWatch.|
| apiGatewayRole| [`iam.Role`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Role.html)|Returns an instance of the iam.Role created by the construct for API Gateway.| |

## ElasticSearch
**Required Attributes on Props**

| Name    | Type | Description | Notes    |
| --- | --- | --- | --- |
| esDomainProps?| [`elasticsearch.CfnDomainProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticsearch.CfnDomainProps.html)|Optional user provided props to override the default props for the Elasticsearch Service.|
| domainName | `string`	| Domain name for the Cognito and the Elasticsearch Service. |


**Required Construct Properties**

| Name    | Type | Description | Notes    |
| --- | --- | --- | --- |
| elasticsearchDomain |[`elasticsearch.CfnDomain`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_elasticsearch.CfnDomain.html)|Returns an instance of `elasticsearch.CfnDomain` created by the construct.|
| elasticsearchDomainRole |[`iam.Role`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_iam.Role.html)|Returns an instance of `iam.Role` created by the construct for `elasticsearch.CfnDomain`.|

## EventBridge
**Required Attributes on Props**

| Name    | Type | Description | Notes    |
| --- | --- | --- | --- |
| eventRuleProps | [`events.RuleProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.RuleProps.html)|User provided eventRuleProps to override the defaults. |
| existingEventBusInterface? | [`events.IEventBus`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html)| Optional user-provided custom EventBus for construct to use. Providing both this and `eventBusProps` results an error.|
| eventBusProps?	| [`events.EventBusProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.EventBusProps.html)|Optional user-provided properties to override the default properties when creating a custom EventBus. Setting this value to `{}` will create a custom EventBus using all default properties. If neither this nor `existingEventBusInterface` is provided the construct will use the `default` EventBus. Providing both this and `existingEventBusInterface` results an error.|

**Required Construct Properties**

| Name    | Type | Description | Notes    |
| --- | --- | --- | --- |
| eventsRule | [`events.Rule`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.Rule.html)|Returns an instance of `events.Rule` created by the construct. Only exposed when EventBridge is the soure of events, not exposed when other services (Lambda, Fargate) are triggering events. |
| eventBus?	| [`events.IEventBus`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_events.IEventBus.html)|Returns the instance of `events.IEventBus` used by the construct| Required only for non-default Event Buses.|

## Lambda
**Required Attributes on Props**

| Name    | Type     | Description | Notes    |
| --- | --- | --- | --- |
| existingLambdaObj?	|[`lambda.Function`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html)|Existing instance of Lambda Function object, providing both this and `lambdaFunctionProps` will cause an error.||
| lambdaFunctionProps?	|[`lambda.FunctionProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.FunctionProps.html)|Optional user provided props to override the default props for the Lambda function.||

**Required Construct Properties**

| Name    | Type     |  Description | Notes    |
| --- | --- | --- | --- |
| lambdaFunction	|[`lambda.Function`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_lambda.Function.html)|Returns an instance of the Lambda function used in the pattern.|

## S3
**Required Attributes on Props**

| Name    | Type     | Description | Notes    |
| --- | --- | --- | --- |
| existingBucketInterface? | [`s3.IBucket`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html)|Existing S3 Bucket interface. Providing this property and `bucketProps` results in an error. | Use this instead of `existingBucketObj` to support a table object or interface.|
| existingBucketObj? | [`s3.Bucket`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html)|Existing instance of S3 Bucket object. If this is provided, then also providing bucketProps is an error. | Deprecated, please use `existingBucketInterface`.|
| bucketProps? | [`s3.BucketProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html)|Optional user provided props to override the default props for the S3 Bucket. |
| s3EventTypes?	| [`s3.EventType[]`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.EventType.html)|The S3 event types that will trigger the notification. Defaults to `s3.EventType.OBJECT_CREATED`	| Required only when construct responds to S3 events. |
| s3EventFilters?	| [`s3.NotificationKeyFilter[]`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.NotificationKeyFilter.html)|S3 object key filter rules to determine which objects trigger this event. If not specified, no filter rules will be applied.|Required only when construct responds to S3 events. |
|loggingBucketProps?|[`s3.BucketProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.BucketProps.html)|Optional user provided props to override the default props for the S3 Logging Bucket.|
| logS3AccessLogs? | `boolean`| Whether to turn on Access Logs for the S3 bucket with the associated storage costs. Enabling Access Logging is a best practice.|

**Required Construct Properties**

| Name    | Type     |  Description | Notes    |
| --- | --- | --- | --- |
| s3Bucket?	|[`s3.Bucket`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html)	| If the construct created a new bucket. If an existing bucket interface was submitted, this is `undefined`. |
| s3BucketInterface |[`s3.IBucket`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.IBucket.html)|Returns an instance of `s3.IBucket` created by the construct.|
| s3LoggingBucket	|[`s3.Bucket`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_s3.Bucket.html)	| Returns an instance of `s3.Bucket` created by the construct as the logging bucket for the primary bucket.|

## SNS
**Required Attributes on Props**

| Name    | Type     |  Description | Notes    |
| --- | --- | --- |--- |
| existingTopicObj?	| [`sns.Topic`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.Topic.html)|An optional, existing SNS topic to be used instead of the default topic. Providing both this and `topicProps` will cause an error. If the SNS Topic is encrypted with a Customer-Managed KMS Key, the key must be specified in the `existingTopicEncryptionKey` property. |
| existingTopicEncryptionKey? | [`kms.Key`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.Key.html) | If an existing topic is provided in the `existingTopicObj` property, and that topic is encrypted with a Customer-Managed KMS key, this property also needs to be set with same key. |
| topicProps?	| [`sns.TopicProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.TopicProps.html)|Optional user provided properties to override the default properties for the SNS topic. |
| enableEncryptionWithCustomerManagedKey?	| `boolean`|If no key is provided, this flag determines whether the SNS Topic is encrypted with a new CMK or an AWS managed key.|This flag is ignored if any of the following are defined: topicProps.masterKey, encryptionKey or encryptionKeyProps.| Sending messages from an AWS service to an encrypted Topic [requires a Customer Master key](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-key-management.html#compatibility-with-aws-services). Those constructs require these properties.  |
| encryptionKey?		| [`kms.Key`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.Key.html)|An optional, imported encryption key to encrypt the SNS Topic with.|
| encryptionKeyProps?		| [`kms.KeyProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.KeyProps.html)|Optional user provided properties to override the default properties for the KMS encryption key used to encrypt the SNS Topic with.	|

**Required Construct Properties**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| snsTopic	| [`sns.Topic`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sns.Topic.html)|Returns an instance of the SNS topic created by the pattern. |
| encryptionKey	| [`kms.Key`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.Key.html)|Returns an instance of `kms.Key` used for the SQS queue, and SNS Topic.| Only required when AWS service is writing to the SNS topic (similar to SQS). |

## SQS
**Required Attributes on Props**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| queueProps?	| [`sqs.QueueProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.QueueProps.html)|Optional user provided props to override the default props for the SQS queue.|
| existingQueueObj?|[`sqs.Queue`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.Queue.html)|Existing SQS queue to be used instead of the default queue. Providing both this and `queueProps` will cause an error. If the SQS queue is encrypted, the KMS key utilized for encryption must be a customer managed CMK.|
| deployDeadLetterQueue?	| `boolean`	|Whether to create a secondary queue to be used as a dead letter queue. Defaults to `true`.|
| deadLetterQueueProps?	| [`sqs.QueueProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.QueueProps.html)|Optional user provided props to override the default props for the SQS queue.|
| maxReceiveCount	| `int`	| The number of times a message can be unsuccessfully dequeued before being moved to the dead letter queue. Defaults to `15`. |
| enableQueuePurging	| `boolean`	| Whether to grant additional permissions to the Lambda function enabling it to purge the SQS queue. Defaults to `false`. | This is only on 2 constructs, docs talk about a Lambda function role.|
|enableEncryptionWithCustomerManagedKey?|`boolean`|If no key is provided, this flag determines whether the queue is encrypted with a new CMK or an AWS managed key. |This flag is ignored if any of the following are defined: queueProps.encryptionMasterKey, encryptionKey or encryptionKeyProps.|
|encryptionKey?|[`kms.Key`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.Key.html)|An optional, imported encryption key to encrypt the SQS Queue with.|Sending messages from an AWS service to an encrypted queue [requires a Customer Master key](https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-key-management.html#compatibility-with-aws-services). Those constructs require these properties. |
|encryptionKeyProps?|[`kms.KeyProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.Key.html#construct-props)|Optional user provided properties to override the default properties for the KMS encryption key used to encrypt the SQS queue with.|


**Required Construct Properties**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| sqsQueue	|[`sqs.Queue`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.Queue.html)|Returns an instance of the SQS queue created by the pattern.|
| deadLetterQueue?	|[`sqs.Queue`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_sqs.Queue.html)|Returns an instance of the SQS queue created by the pattern.|
| encryptionKey	| [`kms.IKey`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_kms.IKey.html)| Returns an instance of `kms.Key` used for the SQS queue.| Only for service to SQS constructs that require a non-default CMK. |

## Step Functions
**Required Attributes on Props**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| stateMachineProps	|[`sfn.StateMachineProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions.StateMachineProps.html)|Optional user provided props to override the default props for `sfn.StateMachine`|
| logGroupProps? | [`logs.LogGroupProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_logs.LogGroupProps.html)|Optional user provided props to override the default props for for the CloudWatchLogs LogGroup.|
| createCloudWatchAlarms? | `boolean`|Whether to create recommended CloudWatch alarms.|

**Required Construct Properties**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| stateMachine| [`sfn.StateMachine`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions.StateMachine.html)|Returns an instance of `sfn.StateMachine` created by the construct.|
| stateMachineLogGroup|[`logs.ILogGroup`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_logs.ILogGroup.html)|Returns an instance of the `logs.ILogGroup` created by the construct for StateMachine.|
| cloudwatchAlarms? | [`cloudwatch.Alarm[]`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_cloudwatch.Alarm.html)|Returns a list of `cloudwatch.Alarm` created by the construct.|

## VPC
**Required Attributes on Props**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| existingVpc? | [`ec2.IVpc`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html)|An existing VPC in which to deploy the construct. Providing both this and `vpcProps` is an error.|
| deployVpc? |`boolean`|Whether to create a new VPC based on `vpcProps` into which to deploy this pattern. Setting this to true will deploy the minimal, most private VPC to run the pattern:<ul><li> One isolated subnet in each Availability Zone used by the CDK program</li><li>`enableDnsHostnames` and `enableDnsSupport` will both be set to true</li></ul>If this property is `true` then `existingVpc` cannot be specified. Defaults to `false`.|
| vpcProps? |[`ec2.VpcProps`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.VpcProps.html)|Optional user-provided properties to override the default properties for the new VPC. `enableDnsHostnames`, `enableDnsSupport`, `natGateways` and `subnetConfiguration` are set by the Construct, so any values for those properties supplied here will be overrriden. If `deployVpc?` is not `true` then this property will be ignored. |

**Required Construct Properties**

| Name    | Type     | Description | Notes    |
| --- | --- | --- |--- |
| vpc? |[`ec2.IVpc`](https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_ec2.IVpc.html)| Returns an instance of the VPC created by the pattern, if `deployVpc?` is `true`, or `existingVpc?` is provided.                 |

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.