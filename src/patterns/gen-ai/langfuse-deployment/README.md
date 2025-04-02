# CDK Constructs for deploying Langfuse on AWS

<!--BEGIN STABILITY BANNER-->

---

![Stability: Experimental](https://img.shields.io/badge/stability-Experimental-important.svg?style=for-the-badge)

> All classes are under active development and subject to non-backward compatible changes or removal in any
> future version. These are not subject to the [Semantic Versioning](https://semver.org/) model.
> This means that while you may use them, you may need to update your source code when upgrading to a newer version of this package.

---

<!--END STABILITY BANNER-->

This package provides example constructs for deploying [Langfuse](https://langfuse.com/) on AWS using fully-managed database services, and serverless compute on Fargate for Amazon ECS.

Langfuse is an Open Source LLM Engineering platform that helps teams collaboratively debug, analyze, and iterate on their LLM applications.

> :information_source: For production-ready, enterprise-grade deployments - check out the [Langfuse offerings through AWS Marketplace](https://aws.amazon.com/marketplace/seller-profile?id=seller-nmyz7ju7oafxu). These constructs provide an architecture for deploying the Open Source version of Langfuse, aimed at initial experimentation. They do not offer all the features and support customers can enjoy with Langfuse Enterprise Edition.


## Architecture overview

Langfuse v3 deployments involve multiple components, as discussed in their [official documentation on self-hosting](https://langfuse.com/self-hosting#architecture). In this pattern, shown also in the architecture diagram below, we use:

1. [AWS Fargate for Amazon ECS](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html) to host the required containers without the need to manage servers or clusters of Amazon EC2 instances
2. [Amazon RDS](https://aws.amazon.com/rds/postgresql/) for the Postgres OLTP store
3. [Amazon Elasticache](https://aws.amazon.com/elasticache/) for the Valkey cache
4. [Amazon EFS](https://aws.amazon.com/efs/) for durable managed storage to back the deployed [ClickHouse](https://clickhouse.com/docs/intro) OLAP system
5. [Amazon CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) for high-performance CDN and HTTPS connectivity to the deployed Langfuse service.

![](./architecture.png "Architecture diagram showing LLM applications and web browsers connecting to Langfuse through the above described components")

For an example of how to use these constructs to deploy Langfuse and integrate tracing into your CDK-defined AI applications - see [self-hosted-langfuse-tracing in aws-samples/generative-ai-cdk-constructs-samples](https://github.com/aws-samples/generative-ai-cdk-constructs-samples/tree/main/samples/self-hosted-langfuse-tracing).
