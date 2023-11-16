# Design Guidelines

# AWS Generative AI CDK Constructs Design Guidelines

This document defines the ways in which our constructs are consistent with CDK and with one another, helping developers easily adopt the constructs. When proposing a new AWS Generative AI CDK Construct, use this document to drive your design.

## Overall Guidelines

**Constructs Can Be Self Contained**

While passing an existing resource to a construct is essential to the ability to link constructs together, it should never be required. If your construct requires the client to create a resource to pass in as an argument to the constructor, then you have probably not defined your construct correctly or what you are designing is not a good fit for the AWS Generative AI CDK Constructs.

**Use CDK definitions to define a service or resource**

The construct should not create new classes or interfaces to describe services or resources. Although the new class may seem simpler now, as new capabilities are added to the construct, the new class will acquire new properties – the ultimate result would be something equivalent to the CDK definition, but not compatible. The CDK definitions are well-thought-out and interact predictably with other CDK constructs. If you want to give a client the ability to specify a few attributes of a ConstructProps without specifying every required value, make the type of that attribute ConstructProps | any. This pattern exists several places in the AWS Generative AI CDK Constructs library.

Another practice that this rule prohibits is putting specific attributes of sub resources in your AWS Generative AI CDK Constructs Props object. For instance, if your VPC needs an Internet Gateway, then the client should send VPC Props that create the Internet Gateway, don't create a property at in your Construct Props object of InternetGateway: true.

**The client should have the option (but not requirement) to provide any props used within the construct**

When you supply a CDK-defined props object to any CDK constructor within your construct (L1 or L2), your construct should be able to generate all the default values required to create that L1 or L2 construct. Alternatively, the client should be able to override any or all of those default props values to completely customize the construct.

There are exceptions to this rule. The Lambda Function L2 construct, for instance, cannot specify a default value for the Lambda code – the client must provide this. Also, at times the workings of the construct require specific props values to work. In this situation, those values will override user provided values. In general, the props values sent to a CDK constructor are generated like this:

```
let actualProps = overrideProps(defaultProps, userProvidedProps);
actualProps = overrideProps(actualProps, constructRequiredProps)
```

Construct-required props should be minimized and listed in the README.md file for the construct.
There is a possibility that the client could specify some props values that are incompatible with default props values. That is the responsibility of the client – if they choose to not use the default implementation then they take responsibility for the configuration they specify.

**The Minimal Deployable Pattern Definition should be minimal**

While a client should have great flexibility to fully specify how a Construct is deployed, the minimal deployment should consist of a single new statement. At times things like table schema might require some additional code – but if your minimal deployable solution is more than a couple lines long or requires creating one or more services first then your construct is outside the patterns for the library.

**Business Logic**

The Construct don't have to be restricted to deploying infrastructure (eg – implemented Lambda functions). This is because we want to abstract the complexity of the underlying Generative AInology area. However, the business logic should be configurable to adapt to different use cases.

**Favor L2 CDK Constructs over L1**

L1 CDK constructs are merely thin code wrappers over the raw CloudFormation definitions – they bring little if any additional value to the table. L2 CDK constructs provide additional functionality, security and interoperability. Whenever possible, Generative AI Constructs interfaces should speak in terms of L2 CDK constructs. If your definition includes L1 constructs it may not be rejected, but you will be asked to explain the reasons requiring their use. 

## VPCs

Clients may choose to deploy their architectures for any number of reasons. VPC capability should be added to constructs when traffic within the construct can be restricted within a VPC.

## Naming

The name of an AWS Generative AI CDK Construct is composed by concatenating the construct's purpose and the names of the individual services or resources configured by the construct. When it is obvious what resource is being deployed by the service, use just the service name, such as SQS, SNS, DynamoDB, etc. When just the service name is ambiguous, append the specific resource type to the service name, such as SagemakerEndpoint (also do this for a different flavor of an already deployed service, such as DynamoDBStream). If you use a specific library, you can also add it to the name.

For the construct file name, separate the all lower-case service names by dashes and preface the whole name with “aws-“. For Example:

&emsp; &emsp; &emsp;aws-ragsource-apigateway-opensearch
&emsp; &emsp; &emsp;aws-apigateway-sagemakerendpoint

For the TypeScript class name, use Pascal casing and concatenate the names separated by “To”. For Example:

&emsp; &emsp; &emsp;RagApigatewayToOpensearch
&emsp; &emsp; &emsp;ApigatewayToSagemakerendpoint

Once again, these rules became clear as we wrote all of the existing constructs and not all of the early constructs comply with these rules.

# Service Usage in Constructs
It's important for consistency that services are implemented consistently across AWS Generative AI CDK Constructs – that clients specify the same properties. This section specifies the require attributes on your Construct Props interface for each service currently in the library, as well as the reasons behind any exceptions. We are unlikely to approve a construct with additional attributes, although we may if the proposed new attribute is appropriate for us to implement across all constructs using that service.

If you are creating a construct that uses a service for the first time, defining the appropriate interface is a key step and we will work with you.

This version of the document also lists which constructs currently violate these standards and whether making the object compliant would be a breaking change.

Existing Inconsistencies would not be published, that’s for our internal use – only the Required Properties and Attributes on Props would be published as requirements (along with specific notes).

This section will evolve as we add new constructs and use new services.

***
&copy; Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
