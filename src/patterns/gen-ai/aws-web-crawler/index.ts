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
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import * as batch from 'aws-cdk-lib/aws-batch';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as aws_ecr_assets from 'aws-cdk-lib/aws-ecr-assets';
import * as ecs from 'aws-cdk-lib/aws-ecs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sns from 'aws-cdk-lib/aws-sns';
import { Construct } from 'constructs';
import { ConstructName } from '../../../common/base-class';
import { BaseClass, BaseClassProps } from '../../../common/base-class/base-class';

export interface CrawlerWebSite {
  /**
   * Web site URL to be crawled.
   */
  readonly url: string;
  /**
   * Maximum number of requests to be made.
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
   * File types to be downloaded.
   *
   * @default - all file types
   */
  readonly fileTypes?: string[];
  /**
   * Ignore robots.txt file.
   *
   * @default - false
   */
  readonly ignoreRobotsTxt?: boolean;
  /**
   * Schedule the crawler to run every N days.
   *
   * @default - not scheduled
   */
  readonly scheduleEveryNDays?: number;
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
   *  An existing VPC can be used to deploy the construct.
   *
   * @default - none
   */
  readonly existingVpc?: ec2.IVpc;
  /**
   *  Web sites to be crawled.
   *
   * @default - none
   */
  readonly webSites?: CrawlerWebSite[];
}

export class WebCrawler extends BaseClass {
  /**
   * Returns the instance of S3 bucket used by the construct
   */
  public readonly dataBucket: s3.IBucket;
  /**
   * Returns the instance of SNS Topic used by the construct
   */
  public readonly snsTopic: sns.ITopic;
  /**
   * Returns the instance of Sites DynamoDB table
   */
  public readonly sitesTable: dynamodb.ITable;
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

    const baseProps: BaseClassProps = {
      stage: props.stage,
      enableOperationalMetric: props.enableOperationalMetric,
      constructName: ConstructName.AWSWEBCRAWLER,
      constructId: id,
      observability: props.observability,
    };

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    const sitesTable = new dynamodb.Table(this, 'sitesTable', {
      partitionKey: { name: 'site_url', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const jobsTable = new dynamodb.Table(this, 'jobsTable', {
      partitionKey: { name: 'site_url', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'job_id', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
    });

    const dataBucket = new s3.Bucket(this, 'webCrawlerDataBucket', {
      accessControl: s3.BucketAccessControl.PRIVATE,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      enforceSSL: true,
    });

    const snsTopic = new sns.Topic(this, 'webCrawlerTopic');

    const computeEnvironment = new batch.FargateComputeEnvironment(this, 'webCrawlerEnvironment', {
      vpc:
        props.existingVpc ??
        new ec2.Vpc(this, 'webCrawlerVpc', {
          createInternetGateway: false,
          natGateways: 1,
        }),
      maxvCpus: 8,
      replaceComputeEnvironment: true,
      updateTimeout: cdk.Duration.minutes(30),
      updateToLatestImageVersion: true,
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
      managedPolicies: [iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AmazonECSTaskExecutionRolePolicy')],
    });

    const webCrawlerContainer = new batch.EcsFargateContainerDefinition(this, 'webCrawlerContainer', {
      cpu: 2,
      memory: cdk.Size.mebibytes(4096),
      image: ecs.ContainerImage.fromAsset(path.join(__dirname, '../../../../resources/gen-ai/aws-web-crawler-image'), {
        platform: aws_ecr_assets.Platform.LINUX_AMD64,
      }),
      jobRole: webCrawlerJobRole,
      environment: {
        AWS_DEFAULT_REGION: cdk.Stack.of(this).region,
        SITES_TABLE_NAME: sitesTable.tableName,
        JOBS_TABLE_NAME: jobsTable.tableName,
        DATA_BUCKET_NAME: dataBucket.bucketName,
        SNS_TOPIC_ARN: snsTopic.topicArn,
      },
    });

    sitesTable.grantReadWriteData(webCrawlerJobRole);
    jobsTable.grantReadWriteData(webCrawlerJobRole);
    dataBucket.grantReadWrite(webCrawlerJobRole);
    snsTopic.grantPublish(webCrawlerJobRole);

    const webCrawlerJobDefinition = new batch.EcsJobDefinition(this, 'webCrawlerJob', {
      container: webCrawlerContainer,
      retryAttempts: 3,
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

    this.dataBucket = dataBucket;
    this.snsTopic = snsTopic;
    this.sitesTable = sitesTable;
    this.jobsTable = jobsTable;
    this.jobQueue = jobQueue;
    this.webCrawlerJobDefinition = webCrawlerJobDefinition;
  }
}
