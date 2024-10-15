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
import { join } from 'node:path';
import { Duration, RemovalPolicy, Stack } from 'aws-cdk-lib';
import { FlowLogDestination, IVpc } from 'aws-cdk-lib/aws-ec2';
import { DockerImageAsset, Platform } from 'aws-cdk-lib/aws-ecr-assets';
import { Cluster, ContainerImage, CpuArchitecture, OperatingSystemFamily } from 'aws-cdk-lib/aws-ecs';
import { QueueProcessingFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { Key } from 'aws-cdk-lib/aws-kms';
import { BlockPublicAccess, Bucket, BucketEncryption, EventType, ObjectLockMode } from 'aws-cdk-lib/aws-s3';
import { SnsDestination } from 'aws-cdk-lib/aws-s3-notifications';
import { Topic } from 'aws-cdk-lib/aws-sns';
import { SqsSubscription } from 'aws-cdk-lib/aws-sns-subscriptions';
import { Queue } from 'aws-cdk-lib/aws-sqs';
import { StringParameter } from 'aws-cdk-lib/aws-ssm';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BaseClass, BaseClassProps, ConstructName } from '../../../common/base-class';

export interface LlamaIndexDataLoaderProps {
  /**
   * The directory to build the Docker image
   * @description The directory to build the Docker image.
   * @default __dirname + '/docker'
   */
  readonly dockerImageAssetDirectory?: string;

  /**
   * The default memory
   * @description The default memory.
   * @default 2048
   */
  readonly memoryLimitMiB?: number | undefined;

  /**
   * @description the container's logging level
   * @default 'WARNING'
   */
  readonly containerLoggingLevel?: string;

  /**
   * @description the S3 output to use
   * @default undefined
   */
  readonly outputBucket?: Bucket;

  /**
   * @description the VPC to use
   * @default undefined
   */
  readonly vpc?: IVpc;

  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;
  /**
   * Enable observability. Warning: associated cost with the services
   * used. Best practive to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;

}

export class LlamaIndexDataLoader extends BaseClass {

  public readonly outputBucket: Bucket;
  public readonly queueProcessingFargateService: QueueProcessingFargateService;

  private readonly logBucket?: Bucket;
  private readonly bucketKey?: Key;
  private readonly dockerImageAssetDirectory: string;
  private readonly memoryLimitMiB: number;
  private readonly containerLoggingLevel: string;

  constructor(scope: Construct, id: string, props: LlamaIndexDataLoaderProps) {
    super(scope, id);

    const baseProps: BaseClassProps = {
      stage: props.stage,
      constructName: ConstructName.AWSLLAMAINDEXDATALOADER,
      constructId: id,
      observability: props.observability,
    };

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    // Update the optional properties to their defaults
    this.dockerImageAssetDirectory = props.dockerImageAssetDirectory ?? join(
      __dirname, '..', '..', '..', '..', 'resources', 'gen-ai', 'aws-llama-index-data-loader', 'docker',
    );
    this.memoryLimitMiB = props.memoryLimitMiB ?? 2048;
    this.containerLoggingLevel = props.containerLoggingLevel ?? 'WARNING';
    let bucketsInvolved = [];
    if (props.outputBucket) {
      this.outputBucket = props.outputBucket;
    } else {
      this.bucketKey = new Key(this, 'LogBucketKey', {
        enableKeyRotation: true,
      });
      this.logBucket = new Bucket(this, 'LogBucket', {
        enforceSSL: true,
        versioned: true,
        encryption: BucketEncryption.KMS,
        encryptionKey: this.bucketKey,
        bucketKeyEnabled: true,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        objectLockEnabled: true,
        objectLockDefaultRetention: {
          mode: ObjectLockMode.GOVERNANCE,
          duration: Duration.days(1),
        },
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      });
      bucketsInvolved.push(this.logBucket);
      this.outputBucket = new Bucket(this, 'Output', {
        enforceSSL: true,
        versioned: true,
        serverAccessLogsBucket: this.logBucket,
        serverAccessLogsPrefix: 'output-bucket-access-logs',
        encryption: BucketEncryption.KMS,
        encryptionKey: this.bucketKey,
        bucketKeyEnabled: true,
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        objectLockEnabled: true,
        objectLockDefaultRetention: {
          mode: ObjectLockMode.GOVERNANCE,
          duration: Duration.days(1),
        },
        lifecycleRules: [
          {
            id: 'AbortIncompleteMultipartUpload',
            enabled: true,
            abortIncompleteMultipartUploadAfter: Duration.days(1),
          },
        ],
      });
    }
    bucketsInvolved.push(this.outputBucket);
    // Create a new SSM Parameter holding a String
    const circuitBreakerParameter = new StringParameter(this, 'CircuitBreaker', {
      stringValue: 'False',
    });
    const asset = new DockerImageAsset(this, 'Image', {
      directory: this.dockerImageAssetDirectory,
      platform: Platform.LINUX_AMD64,
    });
    const queue = new Queue(this, 'Queue', {
      visibilityTimeout: Duration.seconds(300),
      enforceSSL: true,
      deadLetterQueue: {
        maxReceiveCount: 3,
        queue: new Queue(this, 'DeadLetterQueue', {
          enforceSSL: true,
        }),
      },
    });
    const queueProcessingFargateService = new QueueProcessingFargateService(this, 'Service', {
      cluster: props.vpc === undefined ? new Cluster(this, 'Cluster', {
        containerInsights: true,
      }) : undefined,
      vpc: props.vpc,
      memoryLimitMiB: this.memoryLimitMiB,
      runtimePlatform: {
        cpuArchitecture: CpuArchitecture.X86_64,
        operatingSystemFamily: OperatingSystemFamily.LINUX,
      },
      queue: queue,
      image: ContainerImage.fromDockerImageAsset(asset),
      healthCheck: {
        command: ['CMD-SHELL', '/usr/src/app/healthcheck.sh'],
        interval: Duration.seconds(30),
        timeout: Duration.seconds(30),
        retries: 3,
        startPeriod: Duration.seconds(5),
      },
      enableLogging: true,
      environment: {
        CIRCUIT_BREAKER_SSM_PARAMETER_NAME: circuitBreakerParameter.parameterName,
        LOGGING_LEVEL: this.containerLoggingLevel,
        BUCKET_NAME: this.outputBucket.bucketName,
      },
      minScalingCapacity: 0,
      maxScalingCapacity: 10,
      scalingSteps:
            [
              { upper: 0, change: -1 },
              { lower: 1, change: +1 }, // because `minScalingCapacity` set at zero
              { lower: 100, change: +1 },
              { lower: 500, change: +5 },
            ],
    });
    this.queueProcessingFargateService = queueProcessingFargateService;

    // Setup Default S3 Example if Docker asset directory is missing
    if (!props.dockerImageAssetDirectory) {
      const rawBucket = new Bucket(this, 'Raw', {
        enforceSSL: true,
        versioned: true,
        serverAccessLogsBucket: this.logBucket,
        encryption: BucketEncryption.KMS,
        encryptionKey: this.bucketKey,
        bucketKeyEnabled: true,
        serverAccessLogsPrefix: 'raw-bucket-access-logs',
        blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
        removalPolicy: RemovalPolicy.DESTROY,
        autoDeleteObjects: true,
        objectLockEnabled: true,
        objectLockDefaultRetention: {
          mode: ObjectLockMode.GOVERNANCE,
          duration: Duration.days(1),
        },
        lifecycleRules: [
          {
            id: 'AbortIncompleteMultipartUpload',
            enabled: true,
            abortIncompleteMultipartUploadAfter: Duration.days(1),
          },
        ],
      });
      bucketsInvolved.push(rawBucket);
      const topicKey = new Key(this, 'TopicKey', {
        enableKeyRotation: true,
      });
      const topic = new Topic(this, 'Topic', {
        enforceSSL: true,
        masterKey: topicKey,
      });
      topicKey.addToResourcePolicy(
        new PolicyStatement({
          actions: ['kms:Decrypt', 'kms:GenerateDataKey*'],
          resources: ['*'],
          principals: [new ServicePrincipal('s3.amazonaws.com')],
        }),
      );
      topic.grantPublish(new ServicePrincipal('s3.amazonaws.com'));
      rawBucket.addEventNotification(
        EventType.OBJECT_CREATED,
        new SnsDestination(topic),
      );
      topic.addSubscription(
        new SqsSubscription(queue),
      );
      this.queueProcessingFargateService.taskDefinition.addToTaskRolePolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['s3:GetObject'],
          resources: [rawBucket.bucketArn, rawBucket.bucketArn + '/*'],
        }),
      );
      if (rawBucket.encryptionKey) {
        rawBucket.encryptionKey.grantDecrypt(this.queueProcessingFargateService.taskDefinition.taskRole);
        this.queueProcessingFargateService.taskDefinition.taskRole.addToPrincipalPolicy(
          new PolicyStatement({
            effect: Effect.ALLOW,
            actions: ['kms:GenerateDataKey'],
            resources: [rawBucket.encryptionKey.keyArn],
          }),
        );
      }
    }
    this.queueProcessingFargateService.cluster.vpc.addFlowLog('FlowLog', {
      destination: FlowLogDestination.toS3(this.logBucket, 'vpc-flow-logs'),
    });
    circuitBreakerParameter.grantRead(this.queueProcessingFargateService.taskDefinition.taskRole);
    this.queueProcessingFargateService.taskDefinition.addToTaskRolePolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['s3:PutObject'],
        resources: [this.outputBucket.bucketArn, this.outputBucket.bucketArn + '/*'],
      }),
    );
    if (this.outputBucket.encryptionKey) {
      this.outputBucket.encryptionKey.grantDecrypt(this.queueProcessingFargateService.taskDefinition.taskRole);
      this.queueProcessingFargateService.taskDefinition.taskRole.addToPrincipalPolicy(
        new PolicyStatement({
          effect: Effect.ALLOW,
          actions: ['kms:GenerateDataKey'],
          resources: [this.outputBucket.encryptionKey.keyArn],
        }),
      );
    }

    ////////////////////////////////////////////////////////////////////////
    // NagSuppressions
    ////////////////////////////////////////////////////////////////////////
    if (this.logBucket) {
      NagSuppressions.addResourceSuppressions(this.logBucket,
        [
          {
            id: 'AwsSolutions-S1',
            reason: 'There is no need to enable access logging for the AccessLogs bucket.',
          },
        ],
        true,
      );
    }
    NagSuppressions.addResourceSuppressions(bucketsInvolved,
      [
        {
          id: 'HIPAA.Security-S3BucketReplicationEnabled',
          reason: 'Replication for this use case is uneccessary.',
        },
        {
          id: 'NIST.800.53.R4-S3BucketReplicationEnabled',
          reason: 'Replication for this use case is uneccessary.',

        },
        {
          id: 'NIST.800.53.R5-S3BucketReplicationEnabled',
          reason: 'Replication for this use case is uneccessary.',
        },
        {
          id: 'PCI.DSS.321-S3BucketReplicationEnabled',
          reason: 'Replication for this use case is uneccessary.',
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressions([this.queueProcessingFargateService.cluster.vpc],
      [
        {
          id: 'HIPAA.Security-VPCSubnetAutoAssignPublicIpDisabled',
          reason: 'default vpc creation',
        },
        {
          id: 'NIST.800.53.R5-VPCSubnetAutoAssignPublicIpDisabled',
          reason: 'default vpc creation',
        },
        {
          id: 'PCI.DSS.321-VPCSubnetAutoAssignPublicIpDisabled',
          reason: 'default vpc creation',
        },
        {
          id: 'HIPAA.Security-VPCNoUnrestrictedRouteToIGW',
          reason: 'default vpc creation',
        },
        {
          id: 'NIST.800.53.R5-VPCNoUnrestrictedRouteToIGW',
          reason: 'default vpc creation',
        },
        {
          id: 'PCI.DSS.321-VPCNoUnrestrictedRouteToIGW',
          reason: 'default vpc creation',
        },
      ],
      true,
    );

    // Suppress findings for the BucketNotificationsHandler
    // https://github.com/aws/aws-cdk/issues/9552
    const bucketNotifications = Stack.of(this).node.tryFindChild('BucketNotificationsHandler050a0587b7544547bf325f094a3db834');
    if (bucketNotifications) {
      NagSuppressions.addResourceSuppressions(bucketNotifications,
        [
          {
            id: 'AwsSolutions-IAM4',
            reason: 'AWSLambdaBasicExecutionRole is used by `addEventNotification`',
            appliesTo: ['Policy::arn:<AWS::Partition>:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole'],
          },
          {
            id: 'AwsSolutions-IAM5',
            reason: 'Suppress all AwsSolutions-IAM5 findings for this stack',
            appliesTo: ['Resource::*'],
          },
          {
            id: 'HIPAA.Security-IAMNoInlinePolicy',
            reason: 'Inline policies are part of the BucketHandlerNotification',
          },
          {
            id: 'NIST.800.53.R4-IAMNoInlinePolicy',
            reason: 'Inline policies are part of the BucketHandlerNotification',
          },
          {
            id: 'NIST.800.53.R5-IAMNoInlinePolicy',
            reason: 'Inline policies are part of the BucketHandlerNotification',
          },
          {
            id: 'PCI.DSS.321-IAMNoInlinePolicy',
            reason: 'Inline policies are part of the BucketHandlerNotification',
          },
        ],
        true,
      );
    }
    NagSuppressions.addResourceSuppressions(this.queueProcessingFargateService,
      [
        {
          id: 'AwsSolutions-ECS2',
          reason: 'Environmental variables are okay',
        },
      ],
      true,
    );
    NagSuppressions.addResourceSuppressions(this.queueProcessingFargateService.taskDefinition,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'The ecr:GetAuthorizationToken requires "*"',
          appliesTo: [
            'Resource::*',
            'Resource::<Raw72517081.Arn>/*',
            'Resource::<OutputAB65CDDE.Arn>/*',
          ],
        },
      ],
      true,
    );

    // Inline policies
    let taskDefinitionRoles = [
      this.queueProcessingFargateService.taskDefinition.taskRole,
    ];
    if (this.queueProcessingFargateService.taskDefinition.executionRole) {
      taskDefinitionRoles.push(this.queueProcessingFargateService.taskDefinition.executionRole);
    }
    NagSuppressions.addResourceSuppressions(taskDefinitionRoles,
      [
        {
          id: 'HIPAA.Security-IAMNoInlinePolicy',
          reason: 'Inline policies are acceptable for this use case.',
        },
        {
          id: 'NIST.800.53.R4-IAMNoInlinePolicy',
          reason: 'Inline policies are acceptable for this use case.',
        },
        {
          id: 'NIST.800.53.R5-IAMNoInlinePolicy',
          reason: 'Inline policies are acceptable for this use case.',
        },
        {
          id: 'PCI.DSS.321-IAMNoInlinePolicy',
          reason: 'Inline policies are acceptable for this use case.',
        },
      ],
      true,
    );

    // Unencrypted CloudWatch logging
    NagSuppressions.addResourceSuppressions(this.queueProcessingFargateService.taskDefinition,
      [
        {
          id: 'HIPAA.Security-CloudWatchLogGroupEncrypted',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'NIST.800.53.R4-CloudWatchLogGroupEncrypted',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'NIST.800.53.R5-CloudWatchLogGroupEncrypted',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'PCI.DSS.321-CloudWatchLogGroupEncrypted',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'HIPAA.Security-CloudWatchLogGroupRetentionPeriod',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'NIST.800.53.R4-CloudWatchLogGroupRetentionPeriod',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'NIST.800.53.R5-CloudWatchLogGroupRetentionPeriod',
          reason: 'CloudWatch logging is not encrypted',
        },
        {
          id: 'PCI.DSS.321-CloudWatchLogGroupRetentionPeriod',
          reason: 'CloudWatch logging is not encrypted',
        },
      ],
      true,
    );
  }
}