/**
 *  Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance
 *  with the License. A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the 'license' file accompanying this file. This file is distributed on an 'AS IS' BASIS, WITHOUT WARRANTIES
 *  OR CONDITIONS OF ANY KIND, express or implied. See the License for the specific language governing permissions
 *  and limitations under the License.
 */
import * as crypto from 'crypto';
import * as path from 'path';
import * as url from 'url';
import * as cdk from 'aws-cdk-lib';
import * as batch from 'aws-cdk-lib/aws-batch';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as aws_ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import { PolicyStatement, AnyPrincipal, Effect, AccountPrincipal } from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as cr from 'aws-cdk-lib/custom-resources';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { ConstructName } from '../../../common/base-class';
import { BaseClass, BaseClassProps } from '../../../common/base-class/base-class';
import * as s3_bucket_helper from '../../../common/helpers/s3-bucket-helper';
import * as vpc_helper from '../../../common/helpers/vpc-helper';
import { ServiceEndpointTypeEnum } from '../../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

export interface CrawlerTarget {
  /**
   * Target URL to be crawled.
   */
  readonly url: string;
  /**
   * Type of URL to be crawled.
   */
  readonly targetType: CrawlerTargetType;
  /**
   * Maximum number of requests to be made by crawler.
   *
   * @default - crawler limit
   */
  readonly maxRequests?: number;
  /**
   * Download files from the web site.
   *
   * @default - true
   */
  readonly downloadFiles?: boolean;
  /**
   * Maximum number of files to be downloaded.
   *
   * @default - crawler limit
   */
  readonly maxFiles?: number;
  /**
   * File types (extensions) to be downloaded.
   *
   * @default - all file types
   */
  readonly fileTypes?: string[];
  /**
   * Index pages that are disallowed by the robots.txt policy.
   *
   * @default - false
   */
  readonly ignoreRobotsTxt?: boolean;
  /**
   * Schedule the crawler to run every N hours following the completion of the previous job.
   *
   * @default - not scheduled
   */
  readonly crawlIntervalHours?: number;
}

export interface WebCrawlerProps {
  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;
  /**
   * Optional.CDK constructs provided collects anonymous operational
   * metrics to help AWS improve the quality and features of the
   * constructs. Data collection is subject to the AWS Privacy Policy
   * (https://aws.amazon.com/privacy/). To opt out of this feature,
   * simply disable it by setting the construct property
   * "enableOperationalMetric" to false for each construct used.
   *
   * @default - true
   */
  readonly enableOperationalMetric?: boolean;
  /**
   * Enable observability. Warning: associated cost with the services
   * used. Best practice to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;
  /**
   * Existing instance of S3 Bucket object, providing both this and `bucketOutputProps` will cause an error.
   *
   * @default - None
   */
  readonly existingOutputBucketObj?: s3.IBucket;
  /**
   * Optional user provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingOutputBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketOutputProps?: s3.BucketProps;
  /**
   * Optional An existing VPC in which to deploy the construct. Providing both this and
   * vpcProps is an error.
   *
   * @default - none
   */
  readonly existingVpc?: ec2.IVpc;
  /**
   * Optional custom properties for a VPC the construct will create. This VPC will
   * be used by the compute resources the construct creates. Providing
   * both this and existingVpc is an error.
   *
   * @default - none
   */
  readonly vpcProps?: ec2.VpcProps;
  /**
   *  Targets to be crawled.
   *
   * @default - none
   */
  readonly targets?: CrawlerTarget[];
}

export enum CrawlerTargetType {
  WEBSITE = 'website',
  RSS_FEED = 'rss_feed',
}

export class WebCrawler extends BaseClass {
  /**
   * Returns the instance of ec2.IVpc used by the construct
   */
  public readonly vpc: ec2.IVpc;
  /**
   * Returns the instance of S3 bucket used by the construct
   */
  public readonly dataBucket: s3.IBucket;
  /**
   * Returns the instance of SNS Topic used by the construct
   */
  public readonly snsTopic: sns.ITopic;
  /**
   * Returns the instance of Targets DynamoDB table
   */
  public readonly targetsTable: dynamodb.ITable;
  /**
   * Returns the instance of Jobs DynamoDB table
   */
  public readonly jobsTable: dynamodb.ITable;
  /**
   * Returns the instance of JobQueue used by the construct
   */
  public readonly jobQueue: batch.IJobQueue;
  /**
   * Returns the instance of JobDefinition used by the construct
   */
  public readonly webCrawlerJobDefinition: batch.IJobDefinition;

  /**
   * @summary Constructs a new instance of the WebCrawler class.
   * @param {Construct} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {WebCrawlerProps} props - user provided props for the construct.
   * @since 0.0.0
   * @access public
   */
  constructor(scope: Construct, id: string, props: WebCrawlerProps) {
    super(scope, id);

    vpc_helper.CheckVpcProps(props);
    s3_bucket_helper.CheckS3Props({
      existingBucketObj: props.existingOutputBucketObj,
      bucketProps: props.bucketOutputProps,
    });

    if (props?.existingVpc) {
      this.vpc = props.existingVpc;
    } else if (props.vpcProps) {
      this.vpc = new ec2.Vpc(this, 'webCrawlerVpc', props.vpcProps);
    } else {
      this.vpc = new ec2.Vpc(this, 'webCrawlerVpc', {
        createInternetGateway: true,
        natGateways: 1,
      });
    };

    // add VPC endpoints for the compute environment
    vpc_helper.AddAwsServiceEndpoint(this, this.vpc, ServiceEndpointTypeEnum.ECR_API);
    vpc_helper.AddAwsServiceEndpoint(this, this.vpc, ServiceEndpointTypeEnum.ECR_DKR);
    vpc_helper.AddAwsServiceEndpoint(this, this.vpc, ServiceEndpointTypeEnum.S3);

    // vpc flowloggroup
    const logGroup = new logs.LogGroup(this, 'webCrawlerConstructLogGroup');
    const role = new iam.Role(this, 'webCrawlerConstructRole', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
    });

    // vpc flowlogs
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup, role),
    });

    const baseProps: BaseClassProps = {
      stage: props.stage,
      enableOperationalMetric: props.enableOperationalMetric,
      constructName: ConstructName.AWSWEBCRAWLER,
      constructId: id,
      observability: props.observability,
    };

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    const targetsTable = new dynamodb.Table(this, 'targetsTable', {
      partitionKey: { name: 'target_url', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });

    const jobsTable = new dynamodb.Table(this, 'jobsTable', {
      partitionKey: { name: 'target_url', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'job_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      pointInTimeRecovery: true,
      encryption: dynamodb.TableEncryption.AWS_MANAGED,
    });

    // bucket for storing server access logging
    const serverAccessLogBucket = new s3.Bucket(
      this,
      'serverAccessLogBucket' + this.stage,
      {
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        versioned: true,
        lifecycleRules: [
          {
            expiration: cdk.Duration.days(90),
          },
        ],
      },
    );

    // Bucket containing the output data uploaded by the crawler
    let dataBucket: s3.IBucket;

    if (!props.existingOutputBucketObj) {
      let tmpBucket: s3.Bucket;
      if (!props.bucketOutputProps) {
        tmpBucket = new s3.Bucket(this, 'webCrawlerDataBucket' + this.stage, {
          accessControl: s3.BucketAccessControl.PRIVATE,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: 'outputBucket' + this.stage + '-' + cdk.Aws.ACCOUNT_ID,
          serverAccessLogsBucket: serverAccessLogBucket,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [
            {
              expiration: cdk.Duration.days(90),
            },
          ],
        });
      } else {
        tmpBucket = new s3.Bucket(
          this,
          'webCrawlerDataBucket' + this.stage,
          props.bucketOutputProps,
        );
      }
      dataBucket = tmpBucket;
      this.dataBucket = tmpBucket;
    } else {
      dataBucket = props.existingOutputBucketObj;
    }

    const snsTopic = new sns.Topic(this, 'webCrawlerTopic', {
      masterKey: kms.Alias.fromAliasName(scope, 'aws-managed-key', 'alias/aws/sns'),
    });

    // Apply topic policy to enforce only the topic owner can publish and subscribe to this topic
    snsTopic.addToResourcePolicy(
      new PolicyStatement({
        sid: 'TopicOwnerOnlyAccess',
        resources: [
          `${snsTopic.topicArn}`,
        ],
        actions: [
          'SNS:Publish',
          'SNS:RemovePermission',
          'SNS:SetTopicAttributes',
          'SNS:DeleteTopic',
          'SNS:ListSubscriptionsByTopic',
          'SNS:GetTopicAttributes',
          'SNS:Receive',
          'SNS:AddPermission',
          'SNS:Subscribe',
        ],
        principals: [new AccountPrincipal(cdk.Stack.of(snsTopic).account)],
        effect: Effect.ALLOW,
        conditions:
              {
                StringEquals: {
                  'AWS:SourceOwner': cdk.Stack.of(snsTopic).account,
                },
              },
      }),
    );

    // Apply Topic policy to enforce encryption of data in transit
    snsTopic.addToResourcePolicy(
      new PolicyStatement({
        sid: 'HttpsOnly',
        resources: [
          `${snsTopic.topicArn}`,
        ],
        actions: [
          'SNS:Publish',
          'SNS:RemovePermission',
          'SNS:SetTopicAttributes',
          'SNS:DeleteTopic',
          'SNS:ListSubscriptionsByTopic',
          'SNS:GetTopicAttributes',
          'SNS:Receive',
          'SNS:AddPermission',
          'SNS:Subscribe',
        ],
        principals: [new AnyPrincipal()],
        effect: Effect.DENY,
        conditions:
          {
            Bool: {
              'aws:SecureTransport': 'false',
            },
          },
      }),
    );

    const computeEnvironment = new batch.FargateComputeEnvironment(this, 'webCrawlerEnvironment', {
      vpc: this.vpc,
      maxvCpus: 8,
      replaceComputeEnvironment: true,
      updateTimeout: cdk.Duration.minutes(30),
      updateToLatestImageVersion: true,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
    });

    const jobQueue = new batch.JobQueue(this, 'webCrawlerJobQueue', {
      computeEnvironments: [
        {
          computeEnvironment,
          order: 1,
        },
      ],
      priority: 1,
    });

    const webCrawlerJobRole = new iam.Role(this, 'webCrawlerJobRole', {
      assumedBy: new iam.ServicePrincipal('ecs-tasks.amazonaws.com'),
      inlinePolicies: {
        FargateContainerServiceRolePolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'ecr:BatchCheckLayerAvailability',
                'ecr:GetDownloadUrlForLayer',
                'ecr:BatchGetImage',
              ],
              effect: iam.Effect.ALLOW,
              resources: [
                'arn:' + cdk.Aws.PARTITION + ':ecr:' + cdk.Aws.REGION+ ':' + cdk.Aws.ACCOUNT_ID + ':repository/*',
              ],
            }),
            new iam.PolicyStatement({
              actions: [
                'ecr:GetAuthorizationToken',
              ],
              effect: iam.Effect.ALLOW,
              resources: [
                '*',
              ],
            }),
            new iam.PolicyStatement({
              actions: [
                'logs:CreateLogStream',
                'logs:PutLogEvents',
              ],
              effect: iam.Effect.ALLOW,
              resources: [
                'arn:' + cdk.Aws.PARTITION + ':logs:' + cdk.Aws.REGION+ ':' + cdk.Aws.ACCOUNT_ID + ':log-group:*',
              ],
            }),
          ],
        }),
      },
    });

    const webCrawlerContainer = new batch.EcsFargateContainerDefinition(this, 'webCrawlerContainer', {
      cpu: 2,
      memory: cdk.Size.mebibytes(6144),
      image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../../../resources/gen-ai/aws-web-crawler-container'), {
        platform: aws_ecr_assets.Platform.LINUX_AMD64,
      }),
      jobRole: webCrawlerJobRole,
      environment: {
        AWS_DEFAULT_REGION: cdk.Stack.of(this).region,
        TARGETS_TABLE_NAME: targetsTable.tableName,
        JOBS_TABLE_NAME: jobsTable.tableName,
        DATA_BUCKET_NAME: dataBucket.bucketName,
        SNS_TOPIC_ARN: snsTopic.topicArn,
      },
    });

    targetsTable.grantReadWriteData(webCrawlerJobRole);
    jobsTable.grantReadWriteData(webCrawlerJobRole);
    dataBucket.grantReadWrite(webCrawlerJobRole);
    snsTopic.grantPublish(webCrawlerJobRole);

    NagSuppressions.addResourceSuppressions(
      webCrawlerJobRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'Role has been scoped.',
        },
        {
          id: 'AwsSolutions-IAM4',
          reason: 'The AWSLambdaBasicExecutionRole managed policy is required for ' +
                  'the Lambda function to write logs to CloudWatch.',
        },
      ],
      true,
    );

    const webCrawlerJobDefinition = new batch.EcsJobDefinition(this, 'webCrawlerJob', {
      container: webCrawlerContainer,
      retryAttempts: 1,
      timeout: cdk.Duration.hours(36),
      retryStrategies: [
        batch.RetryStrategy.of(batch.Action.EXIT, batch.Reason.CANNOT_PULL_CONTAINER),
        batch.RetryStrategy.of(
          batch.Action.EXIT,
          batch.Reason.custom({
            onExitCode: '137',
          }),
        ),
      ],
    });

    for (const target of props.targets ?? []) {
      let targetUrl = target.url.trim();
      if (!/^https?:\/\//.test(targetUrl.toLowerCase())) {
        targetUrl = `https://${targetUrl}`;
      }

      let target_s3_key = encodeURIComponent(url.parse(targetUrl).hostname?.replace(/\./g, '-').substring(0, 30) ?? targetUrl);
      const hash = crypto
        .createHash('sha256')
        .update(targetUrl)
        .digest('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .substring(0, 12);
      target_s3_key = `${target_s3_key}-${hash}`;

      const custom_resource = new cr.AwsCustomResource(this, `target-${target_s3_key}`, {
        onCreate: {
          service: 'DynamoDB',
          action: 'putItem',
          parameters: {
            TableName: targetsTable.tableArn,
            Item: {
              target_url: { S: targetUrl },
              target_s3_key: { S: target_s3_key },
              target_type: { S: target.targetType },
              sitemaps: { L: [] },
              max_requests: { N: `${target.maxRequests ?? 0}` },
              max_files: { N: `${target.maxFiles ?? 0}` },
              download_files: { BOOL: target.downloadFiles ?? true },
              file_types: { L: target.fileTypes ?? [] },
              ignore_robots_txt: { BOOL: target.ignoreRobotsTxt ?? false },
              crawl_interval_hours: { N: `${target.crawlIntervalHours ?? 0}` },
              last_finished_job_id: { S: '' },
              last_finished_job_date: { S: '' },
              created_at: { N: `${Date.now()}` },
              updated_at: { N: `${Date.now()}` },
            },
          },
          physicalResourceId: cr.PhysicalResourceId.of(targetUrl),
        },
        onUpdate: {
          service: 'DynamoDB',
          action: 'updateItem',
          parameters: {
            TableName: targetsTable.tableArn,
            Key: {
              target_url: { S: targetUrl },
            },
            UpdateExpression:
              'SET target_type = :target_type, max_requests = :max_requests, max_files = :max_files, download_files = :download_files, file_types = :file_types, ignore_robots_txt = :ignore_robots_txt, crawl_interval_hours = :crawl_interval_hours',
            ExpressionAttributeValues: {
              ':target_type': { S: target.targetType },
              ':max_requests': { N: `${target.maxRequests ?? 0}` },
              ':max_files': { N: `${target.maxFiles ?? 0}` },
              ':download_files': { BOOL: target.downloadFiles ?? true },
              ':file_types': { L: target.fileTypes ?? [] },
              ':ignore_robots_txt': { BOOL: target.ignoreRobotsTxt ?? false },
              ':crawl_interval_hours': { N: `${target.crawlIntervalHours ?? 0}` },
            },
            ReturnValues: 'UPDATED_NEW',
          },
        },
        onDelete: {
          service: 'DynamoDB',
          action: 'deleteItem',
          parameters: {
            TableName: targetsTable.tableArn,
            Key: {
              target_url: { S: targetUrl },
            },
          },
        },
        policy: cr.AwsCustomResourcePolicy.fromStatements([
          new iam.PolicyStatement({
            actions: ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:DeleteItem', 'dynamodb:UpdateItem'],
            resources: [targetsTable.tableArn],
          }),
        ]),
      });

      NagSuppressions.addResourceSuppressions(
        custom_resource,
        [
          {
            id: 'AwsSolutions-L1',
            reason: 'Provided by cdk, cannot configure runtime.',
          },
        ],
        true,
      );

    }

    const schedulerFunction = new lambda.Function(this, 'webCrawlerSchedulerFunction', {
      runtime: lambda.Runtime.PYTHON_3_12,
      handler: 'lambda.handler',
      timeout: cdk.Duration.minutes(15),
      memorySize: 256,
      code: lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-web-crawler-scheduler')),
      logGroup: new logs.LogGroup(this, 'webCrawlerSchedulerLogGroup', { retention: logs.RetentionDays.ONE_WEEK }),
      environment: {
        TARGETS_TABLE_NAME: targetsTable.tableName,
        JOBS_TABLE_NAME: jobsTable.tableName,
        JOB_QUEUE_ARN: jobQueue.jobQueueArn,
        JOB_DEFINITION_ARN: webCrawlerJobDefinition.jobDefinitionArn,
      },
    });

    targetsTable.grantReadWriteData(schedulerFunction);
    jobsTable.grantReadWriteData(schedulerFunction);
    schedulerFunction.addToRolePolicy(
      new iam.PolicyStatement({
        actions: ['batch:SubmitJob'],
        resources: [webCrawlerJobDefinition.jobDefinitionArn, jobQueue.jobQueueArn],
      }),
    );

    const rule = new events.Rule(this, 'webCrawlerSchedulerRule', {
      schedule: events.Schedule.expression('cron(0/15 * * * ? *)'),
    });

    rule.addTarget(new targets.LambdaFunction(schedulerFunction));

    this.dataBucket = dataBucket;
    this.snsTopic = snsTopic;
    this.targetsTable = targetsTable;
    this.jobsTable = jobsTable;
    this.jobQueue = jobQueue;
    this.webCrawlerJobDefinition = webCrawlerJobDefinition;
  }
}
