# Design Guidelines

# Generative AI Constructs Design Guidelines

One of the Generative AI Constructs tenets states:

> **Constructs are Consistent** - once customers are familiar with the use of Constructs, they can adopt additional constructs easily. Customers familiar with using the CDK can easily adopt Constructs.

This document defines the ways in which Constructs are consistent. When proposing a Generative AI Construct, use this document to drive your design.

## Overall Guidelines

**Avoid custom resources**

Even though this construct library is experimental, we will challenge contributions containing custom resources (CRs). CRs have been historically used in this library, and they have caused several issues:
- They are difficult to maintain and debug
- They introduce additional failure points and complexity
- They often require external dependencies (Lambda functions)
- They can lead to inconsistent behavior across different AWS regions
- They may break when AWS makes changes to underlying services 

While custom resources might be justified in specific scenarios (e.g., interacting with third-party services or implementing unique functionality), we will review these cases individually. Instead, prefer using native AWS constructs and services whenever possible, even if it means accepting some limitations in functionality.

**Use Core CDK design guidelines**

The core CDK library provides a [design guidelines document](https://github.com/aws/aws-cdk/blob/main/docs/DESIGN_GUIDELINES.md). The purpose of this document is to provide guidelines for designing the APIs in the AWS Construct Library in order to ensure a consistent and integrated experience across the entire AWS surface area.

This is even more important if you design a construct which should eventually graduate to the core CDK library. For instance, if you are building a L2 construct for a service which doesn't have an official L2 construct yet, following those guidelines is crucial to make the construct compliant and streamline the review process.

**Keep L3 Constructs focused and manageable**

L3 constructs should be designed with a "do one thing and do it well" philosophy. While it's tempting to create large, feature-rich constructs that handle multiple use cases, experience has shown that such constructs often suffer from low adoption rates and impose significant cognitive load on users. Those constructs require significant maintenance efforts, and provide limited flexibility and customization for end users.

- **Single Responsibility**: Each L3 construct should solve a specific, well-defined problem or use case. Avoid creating "Swiss Army knife" constructs that try to handle multiple distinct scenarios.

- **Limited Scope**: If a construct requires more than 5-7 configuration properties or creates more than 6-8 underlying resources, consider breaking it down into smaller, more focused constructs.

- **Clear Boundaries**: The construct's purpose and limitations should be immediately apparent from its name and interface. Users shouldn't need to understand complex internal implementations to use it effectively.

Consider breaking down a construct when:
- It has too many optional configuration parameters
- It implements multiple distinct patterns or architectural solutions
- Users frequently need to understand its internals to use it effectively
- The construct's documentation becomes too complex to maintain

**The Minimal Deployable Pattern Definition should be minimal**

When designing a construct, the minimal configuration required to deploy it should be as small as possible. This means that default values should be provided for most properties, and only the essential parameters should be mandatory.

- Required properties should be limited to those absolutely necessary for the construct to function
- All other properties should have sensible defaults
- Default values should follow AWS best practices
- The minimal configuration should result in a secure and functional deployment

In simpler terms, you can think of it as "Be opinionated by default, flexible when required".

Example:

✅ Good:

```
// Only requires essential parameters
new ApiGateway(this, 'Api', {
  handler: myLambdaFunction // Only the handler is required
});
```

❌ Avoid:
```
// Too many required parameters
new ApiGateway(this, 'Api', {
  handler: myLambdaFunction,
  stageName: 'prod', // Should have a default
  cors: true, // Should have a default
  authorization: 'IAM', // Should have a default
  logRetention: 30 // Should have a default
});
```

There is a possibility that the client could specify some props values that are incompatible with default props values.  That is the responsibility of the client – if they choose to not use the default implementation then they take responsibility for the configuration they specify.

**Business Logic**

The Construct don't have to be restricted to deploying infrastructure (eg – implemented Lambda functions). This is because we want to abstract the complexity of the underlying Generative AI workflow area. However, the business logic should be configurable to adapt to different use cases.

**Favor L2 CDK Constructs over L1**

L1 CDK constructs are merely thin code wrappers over the raw CloudFormation definitions – they bring little if any additional value to the table. L2 CDK constructs provide additional functionality, security and interoperability. Whenever possible, Generative AI Constructs interfaces should speak in terms of L2 CDK constructs. If your definition includes L1 constructs it may not be rejected, but you will be asked to explain the reasons requiring their use. 

## VPCs

Clients may choose to deploy their architectures for any number of reasons. VPC capability should be added to constructs when traffic within the construct can be restricted within a VPC.

## Naming

The name of a Generative AI Construct is composed by concatenating the construct's purpose and the names of the individual services or resources configured by the construct. When it is obvious what resource is being deployed by the service, use just the service name, such as SQS, SNS, DynamoDB, etc. When just the service name is ambiguous, append the specific resource type to the service name, such as SagemakerEndpoint (also do this for a different flavor of an already deployed service, such as DynamoDBStream). If you use a specific library, you can also add it to the name.

For the construct file name, separate the all lower-case service names by dashes and preface the whole name with “aws-“. For Example:

&emsp; &emsp; &emsp;aws-ragsource-apigateway-opensearch
&emsp; &emsp; &emsp;aws-apigateway-sagemakerendpoint

For the Typescript class name, use Pascal casing and concatenate the names separated by “To”. For Example:

&emsp; &emsp; &emsp;RagApigatewayToOpensearch
&emsp; &emsp; &emsp;ApigatewayToSagemakerendpoint

Once again, these rules became clear as we wrote all of the existing constructs and not all of the early constructs comply with these rules.

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.