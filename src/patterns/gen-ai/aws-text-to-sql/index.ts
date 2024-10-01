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
import { Aws, Duration, aws_events_targets as eventsTarget } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as events from 'aws-cdk-lib/aws-events';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as rds from 'aws-cdk-lib/aws-rds';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as stepfunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as tasks from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import {
  BaseClass,
  BaseClassProps,
} from '../../../common/base-class/base-class';
import { ConstructName } from '../../../common/base-class/construct-name-enum';
import { buildCustomResourceProvider } from '../../../common/helpers/custom-resource-provider-helper';
import * as eventBridgeHelper from '../../../common/helpers/eventbridge-helper';

import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import * as s3BucketHelper from '../../../common/helpers/s3-bucket-helper';
import {
  generatePhysicalNameV2,
  lambdaMemorySizeLimiter,
} from '../../../common/helpers/utils';
import * as vpcHelper from '../../../common/helpers/vpc-helper';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';


export enum DbName {
  MYSQL = 'MySQL',
  POSTGRESQL = 'PostgreSQL',
}

export enum MetatdataSource {
  CONFIG_FILE = 'config_file',
  KNOWLEDGE_BASE = 'knowledge_base',
}

export interface TextToSqlProps {
  /**
   * Optional. The construct creates a custom VPC based on vpcProps.
   * Providing both this and existingVpc is an error.
   *
   * @default - none
   */
  readonly vpcProps?: ec2.VpcProps;

  /**
   * Optional. An existing VPC can be used to deploy the construct.
   * Providing both this and vpcProps is an error.
   *
   * @default - none
   */
  readonly existingVpc?: ec2.IVpc;

  /**
   * Optional. An existing subnet group can be used to deploy the construct.
   *
   * @default - none
   */
  readonly existingSubnetGroup?: rds.SubnetGroup;

  /**
   * Optional. Security group for the lambda function which this construct will use.
   * If no exisiting security group is provided it will create one from the vpc.
   * @default - none
   */
  readonly existingLambdaSecurityGroup?: ec2.SecurityGroup;

  /**
   * Optional. Security group for the db instance which this construct will use.
   * If no exisiting security group is provided it will create one from the vpc.
   * @default - none
   */
  readonly existingDBSecurityGroup?: ec2.SecurityGroup;

  /**
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;
  /**
   * Enable observability. Warning: associated cost with the services
   * used. Best practice to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;

  /**
   * Database name. This is the target database against which the query will be generated.
   */
  readonly dbName: DbName;

  /**
   *  Database secret. DB credentials to connect to Database.
   */
  readonly databaseSecretARN: string;

  /**
   *  Optional. db port number.
   *  @default -1534
   */
  readonly dbPort?: number;

  /**
   * Optional. Allows to provide custom lambda code for all pre steps required before generating the query.
   * If not provided, default code will be used.
   *
   */
  readonly customQueryConfigurerLambdaProps?:
  | DockerLambdaCustomProps
  | undefined;

  /**
   * Optional. Allows to provide custom lambda code for generating the query.
   * If not provided, default code will be used.
   *
   */
  readonly customQueryGeneratorLambdaProps?:
  | DockerLambdaCustomProps
  | undefined;

  /**
   * Optional. Allows to provide custom lambda code for executing the query.
   * If not provided, default code will be used.
   *
   */
  readonly customQueryExecutorLambdaProps?: DockerLambdaCustomProps | undefined;

  /**
   * The source of metatdata. This metadata is required to reduce the natual language ambiguity
   * in order to generate the correct sql query. A knowledge layer is used to map the natural language
   * to the database schema.
   * Two metatdata source are supported:
   * 1: config_file - A local json file containing the knowledge layer key value pair.
   * 2: Knowledge base - Semantic search is used to fetch the knowledge layer from AWS knowledge base
   * @default - config_file
   */
  readonly metadataSource: string;

  /**
   * Optional. User provided props to override the default props for the S3 Bucket.
   *
   * @default - Default props are used
   */
  readonly configAssetsBucketProps?: s3.BucketProps;

  /**
   * Optional. Existing s3 Bucket to store the config files.
   *
   * @default - None
   */
  readonly existingconfigAssetsBucketObj?: s3.IBucket;

  /**
   * Optional. Existing instance of event bus, providing both this and `eventBusProps` will cause an error.
   *
   * @default - None.
   */
  readonly existingEventBusInterface?: events.IEventBus;

  /**
   * Optional user provided event bus props
   *
   * @default - Default props are used.
   */
  readonly eventBusProps?: events.EventBusProps;
}

export class TextToSql extends BaseClass {
  /**
   * Returns the instance of ec2.IVpc used by the construct
   */
  public readonly vpc: ec2.IVpc;

  /**
   * Returns the instance of subnet group used by the construct
   */
  public readonly subnetGroup: rds.SubnetGroup;

  /**
   * Returns the instance of ec2.ISecurityGroup used by the construct
   */
  public readonly lambdaSecurityGroup: ec2.SecurityGroup;

  /**
   * Returns the instance of ec2.ISecurityGroup used by the construct
   */
  public readonly dbSecurityGroup!: ec2.SecurityGroup;

  /**
   * Returns the instance of s3.IBucket used by the construct
   */
  public readonly configAssetBucket!: s3.IBucket;

  /**
   * Returns the instance of EventBus used by the construct
   */
  public readonly eventBus?: events.IEventBus;

  /**
   * Returns the instance of EventBus used by the construct
   */
  public readonly eventsRule?: events.Rule;


  /**
   * Returns the instance of feedback Queue  used by the construct
   */
  public readonly feedbackQueue: sqs.Queue;

  /**
   * Returns the instance of output Queue used by the construct
   */
  public readonly outputQueue: sqs.Queue;

  /**
   * Returns the Instance of stepfunction created by the construct
   */
  public readonly stepFunction?: stepfunctions.StateMachine;

  /**
   * Constructs a new instance of the TextToSql class.
   * @param {Construct} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {TextToSqlProps} props - user provided props for the construct.
   * @since 0.0.0
   * @public
   */
  constructor(scope: Construct, id: string, props: TextToSqlProps) {
    super(scope, id);

    const baseProps: BaseClassProps = {
      stage: props.stage,
      constructName: ConstructName.AWSTEXTTOSQL,
      constructId: id,
      observability: props.observability,
    };

    vpcHelper.CheckVpcProps(props);
    s3BucketHelper.CheckS3Props({
      existingBucketObj: props.existingconfigAssetsBucketObj,
      bucketProps: props.configAssetsBucketProps,
    });
    eventBridgeHelper.CheckEventBridgeProps(props);

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    // vpc
    if (props?.existingVpc && props?.existingSubnetGroup) {
      this.vpc = props.existingVpc;
      this.subnetGroup = props.existingSubnetGroup;
    } else {
      this.vpc = vpcHelper.buildVpc(scope, {
        defaultVpcProps: props?.vpcProps,
        vpcName: 'awsTextToSqlVpc',
      });
      this.subnetGroup = new rds.SubnetGroup(this, 'SubnetGroup', {
        vpc: this.vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
        description: 'Subnet group for Aurora Serverless',
      });
    }

    // add VPC endpoints for the compute environment
    vpcHelper.AddAwsServiceEndpoint(this, this.vpc,
      [vpcHelper.ServiceEndpointTypeEnum.S3,
        vpcHelper.ServiceEndpointTypeEnum.STEP_FUNCTIONS,
        vpcHelper.ServiceEndpointTypeEnum.EVENTS]);


    const dbPort = props.dbPort ? props.dbPort : 1534;

    // Security group
    if (props?.existingLambdaSecurityGroup) {
      this.lambdaSecurityGroup = props.existingLambdaSecurityGroup;
    } else {
      this.lambdaSecurityGroup = new ec2.SecurityGroup(
        this,
        'lambdaSecurityGroup',
        {
          vpc: this.vpc,
          allowAllOutbound: true,
        },
      );
    }
    if (props?.existingDBSecurityGroup) {
      this.dbSecurityGroup = props.existingDBSecurityGroup;
    } else {
      this.dbSecurityGroup = new ec2.SecurityGroup(this, 'DBSecurityGroup', {
        vpc: this.vpc,
      });
      // Add an inbound rule to allow traffic from the Lambda security group
      this.dbSecurityGroup.addIngressRule(
        ec2.Peer.securityGroupId(this.lambdaSecurityGroup.securityGroupId),
        ec2.Port.tcp(dbPort), // Assuming MySQL is running on port 3306
        'Allow Lambda function to access the database',
      );
    }

    // vpc flowloggroup
    const logGroup = new logs.LogGroup(this, 'textToSqlConstructVPCGroup');
    const vpcFlowLogrole = new iam.Role(this, 'textToSqlConstructRole', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
    });

    // vpc flowlogs
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(
        logGroup,
        vpcFlowLogrole,
      ),
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

    // config asset bucket
    if (props?.existingconfigAssetsBucketObj) {
      this.configAssetBucket = props.existingconfigAssetsBucketObj;
    } else if (props?.configAssetsBucketProps) {
      this.configAssetBucket = new s3.Bucket(
        this,
        'configasset' + this.stage,
        props.configAssetsBucketProps,
      );
    } else {
      this.configAssetBucket = new s3.Bucket(
        this,
        'configasset' + this.stage,
        {
          accessControl: s3.BucketAccessControl.PRIVATE,
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName:
            'configasset' +
            this.stage.toLowerCase() +
            '-' +
            cdk.Aws.REGION +
            '-' +
            cdk.Aws.ACCOUNT_ID,
          serverAccessLogsBucket: serverAccessLogBucket,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [
            {
              expiration: cdk.Duration.days(90),
            },
          ],
        },
      );
    }

    const configFilePath = path.join(
      __dirname,
      '../../../../resources/gen-ai/aws-text-to-sql',
    );

    const textToSQLFunctionRole = new iam.Role(
      this,
      'queryConfigFunctionRole',
      {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        inlinePolicies: {
          LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
            statements: [
              new iam.PolicyStatement({
                actions: [
                  'logs:CreateLogGroup',
                  'logs:CreateLogStream',
                  'logs:PutLogEvents',
                  'bedrock:InvokeModel',
                  'bedrock:InvokeModelWithResponseStream',
                  's3:GetObject',
                  's3:GetBucketLocation',
                  's3:ListBucket',
                  's3:PutObject',
                ],
                resources: [
                  `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
                  'arn:' +
                    Aws.PARTITION +
                    ':s3:::' +
                    this.configAssetBucket.bucketName +
                    '/*',
                  `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
                  'arn:' +
                    Aws.PARTITION +
                    ':bedrock:' +
                    Aws.REGION +
                    '::foundation-model/*',
                ],
              }),
            ],
          }),
        },
      },
    );

    // Minimum permissions for a Lambda function to execute while accessing a resource within a VPC
    textToSQLFunctionRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'ec2:CreateNetworkInterface',
          'ec2:DeleteNetworkInterface',
          'ec2:AssignPrivateIpAddresses',
          'ec2:UnassignPrivateIpAddresses',
        ],
        resources: [
          'arn:' +
            Aws.PARTITION +
            ':ec2:' +
            Aws.REGION +
            ':' +
            Aws.ACCOUNT_ID +
            ':*/*',
        ],
      }),
    );

    textToSQLFunctionRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ec2:DescribeNetworkInterfaces'],
        resources: ['*'],
      }),
    );

    textToSQLFunctionRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:ListBucket'],
        resources: [
          'arn:' + Aws.PARTITION + ':s3:::' + this.configAssetBucket.bucketName,
        ],
      }),
    );

    const configLoaderPolicy = new iam.ManagedPolicy(this, 'AuroraPgPolicy', {
      managedPolicyName: generatePhysicalNameV2(this, 'configLoaderPolicy', {
        maxLength: 32,
        lower: true,
      }),
      statements: [
        new iam.PolicyStatement({
          actions: [
            'ec2:DescribeInstances',
            'ec2:CreateNetworkInterface',
            'ec2:AttachNetworkInterface',
            'ec2:DescribeNetworkInterfaces',
            'autoscaling:CompleteLifecycleAction',
            'ec2:DeleteNetworkInterface',
          ],
          resources: ['*'],
        }),

        new iam.PolicyStatement({
          actions: [
            'logs:CreateLogGroup',
            'logs:CreateLogStream',
            'logs:PutLogEvents',
            'bedrock:InvokeModel',
            'bedrock:InvokeModelWithResponseStream',
            's3:GetObject',
            's3:GetBucketLocation',
            's3:ListBucket',
            's3:PutObject',
          ],
          resources: [
            `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
            'arn:' +
              Aws.PARTITION +
              ':s3:::' +
              this.configAssetBucket.bucketName +
              '/*',
            `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
            'arn:' +
              Aws.PARTITION +
              ':bedrock:' +
              Aws.REGION +
              '::foundation-model/*',
          ],
        }),
      ],
    });

    const customResource = buildCustomResourceProvider({
      providerName: 'ConfigFileLoaderCRProvider',
      vpc: this.vpc,
      securityGroup: this.lambdaSecurityGroup,
      codePath: path.join(__dirname, '../../../../lambda/aws-text-to-sql'),
      handler: 'custom_resources.on_event',
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_12,
    });

    const crProvider = customResource.getProvider(this);
    crProvider.role.addManagedPolicy(configLoaderPolicy);

    const configFileLoader = new cdk.CustomResource(this, 'ConfigFileLoader', {
      resourceType: 'Custom::ConfigFileLoader',
      serviceToken: crProvider.serviceToken,
      properties: {
        configBucket: this.configAssetBucket.bucketName,
        configFilePath: configFilePath,
      },
    });

    configFileLoader.node.addDependency(this.configAssetBucket);
    //crProvider.role.node.addDependency(configLoaderPolicy);

    NagSuppressions.addResourceSuppressions(
      textToSQLFunctionRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used.',
        },
      ],
      true,
    );

    const reformulateQuestionFunctionName = generatePhysicalNameV2(
      this,
      'reformulateQuestionFunction' + this.stage,
      { maxLength: 63, lower: true },
    );

    const reformulateQuestionFunctionProps = {
      functionName: reformulateQuestionFunctionName,
      description: 'Lambda function to reformulate user question',
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(
          __dirname,
          '../../../../lambda/aws-text-to-sql/reformulate_question',
        ),
      ),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [this.lambdaSecurityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
      environment: {
        DB_NAME: props.dbName,
        METADATA_SOURCE: props.metadataSource,
        CONFIG_BUCKET: this.configAssetBucket.bucketName,
      },
    };

    // Lambda function to load  the config and do all pre steps before query generation.
    const reformulateQuestionFunction = buildDockerLambdaFunction(
      this,
      'reformulateQuestionFunction' + this.stage,
      reformulateQuestionFunctionProps,
      props.customQueryConfigurerLambdaProps,
    );

    const queryGeneratorFunctionName = generatePhysicalNameV2(
      this,
      'queryGeneratorFunction' + this.stage,
      { maxLength: 63, lower: true },
    );

    const queryGeneratorFunctionProps = {
      functionName: queryGeneratorFunctionName,
      description:
        'Lambda function to generate the query based on user question.',
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(
          __dirname,
          '../../../../lambda/aws-text-to-sql/query_generator',
        ),
      ),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [this.lambdaSecurityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
      environment: {
        DB_NAME: props.dbName,
        CONFIG_BUCKET: this.configAssetBucket.bucketName,
        SECRET_ARN: props.databaseSecretARN,
      },
    };

    // Lambda function used to generate the query
    const queryGeneratorFunction = buildDockerLambdaFunction(
      this,
      'queryGeneratorFunction' + this.stage,
      queryGeneratorFunctionProps,
      props.customQueryGeneratorLambdaProps,
    );

    // Lambda function used to execute the query

    const queryExecutorFunctionName = generatePhysicalNameV2(
      this,
      'queryExecutorFunctionName' + this.stage,
      { maxLength: 63, lower: true },
    );

    const queryExecutorFunctionProps = {
      functionName: queryExecutorFunctionName,
      description: 'Lambda function to execute the query.',
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(
          __dirname,
          '../../../../lambda/aws-text-to-sql/query_executor',
        ),
      ),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [this.lambdaSecurityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
      environment: {
        DB_NAME: props.dbName,
        CONFIG_BUCKET: this.configAssetBucket.bucketName,
        SECRET_ARN: props.databaseSecretARN,
      },
    };

    // Lambda function used to generate the query
    const queryExecutorFunction = buildDockerLambdaFunction(
      this,
      'queryExecutorFunctionName' + this.stage,
      queryExecutorFunctionProps,
      props.customQueryExecutorLambdaProps,
    );

    // lambda function for autocorrect loop

    const autocorrectQueryFunctionName = generatePhysicalNameV2(
      this,
      'autocorrectQueryFunction' + this.stage,
      { maxLength: 63, lower: true },
    );

    const autocorrectQueryFunctionProps = {
      functionName: autocorrectQueryFunctionName,
      description: 'Lambda function to keep the count of autocorrect loop.',
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(
          __dirname,
          '../../../../lambda/aws-text-to-sql/query_autocorrect',
        ),
      ),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_ISOLATED },
      securityGroups: [this.lambdaSecurityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
    };

    const autocorrectQueryFunction = buildDockerLambdaFunction(
      this,
      'autocorrectQueryFunction' + this.stage,
      autocorrectQueryFunctionProps,
      undefined,
    );

    const feedbackQueueName = generatePhysicalNameV2(
      this,
      'feedbackQueue' + this.stage,
      { maxLength: 63, lower: true },
    );

    const queue = new sqs.Queue(this, 'userFeedbackQueue', {
      queueName: feedbackQueueName,
      visibilityTimeout: Duration.seconds(3600),
    });

    queue.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        principals: [new iam.AnyPrincipal()],
        actions: ['sqs:*'],
        resources: [queue.queueArn],
        conditions: {
          Bool: {
            'aws:SecureTransport': 'false',
          },
        },
      }),
    );
    this.feedbackQueue = queue;

    const outputQueueName = generatePhysicalNameV2(
      this,
      'outputQueue' + this.stage,
      { maxLength: 63, lower: true },
    );

    const outputQueue = new sqs.Queue(this, 'outputQueue', {
      queueName: outputQueueName,
      visibilityTimeout: Duration.seconds(3600),
    });

    outputQueue.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.DENY,
        principals: [new iam.AnyPrincipal()],
        actions: ['sqs:*'],
        resources: [outputQueue.queueArn],
        conditions: {
          Bool: {
            'aws:SecureTransport': 'false',
          },
        },
      }),
    );
    this.outputQueue = outputQueue;


    const dbsecret = secretsmanager.Secret.fromSecretCompleteArn(this, 'dbsecret', props.databaseSecretARN);
    dbsecret.grantRead(queryGeneratorFunction);
    dbsecret.grantRead(queryExecutorFunction);


    const reformulateQuestionState = new tasks.LambdaInvoke(
      this,
      'reformulate_question',
      {
        lambdaFunction: reformulateQuestionFunction,
        inputPath: '$.detail',
        resultPath: '$.queryConfig',
      },
    );

    const reformulatedQuestionFeedbackState = new tasks.SqsSendMessage(
      this,
      'get_feedback_on_reformulated_question',
      {
        queue,
        messageBody: stepfunctions.TaskInput.fromObject({
          message:
            'Following is the reformulated question. Do you agree with the new question?',
          reformualted_question: stepfunctions.TaskInput.fromJsonPathAt(
            '$.reformulated_user_question',
          ),
          user_question:
            stepfunctions.TaskInput.fromJsonPathAt('$.user_question'),
          question_unique_id: stepfunctions.TaskInput.fromJsonPathAt(
            '$.question_unique_id',
          ),
          execute_sql_strategy: stepfunctions.TaskInput.fromJsonPathAt(
            '$.execute_sql_strategy',
          ),
          execution_start_time: stepfunctions.TaskInput.fromJsonPathAt(
            '$.execution_start_time',
          ),
          TaskToken: stepfunctions.JsonPath.taskToken,
        }),
        integrationPattern:
          stepfunctions.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      },
    );
    const alternateQueryGeneratorState = new tasks.LambdaInvoke(
      this,
      'generate_alternate_query',
      {
        lambdaFunction: queryGeneratorFunction,
        resultPath: '$.queryConfig',
      },
    );

    // SF loggroup
    const sflogGroup = new logs.LogGroup(this, 'TextToSqlStepFunctionLogGroup', {
      logGroupName: '/aws/vendedlogs/states/TextToSqlStepFunction',
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });


    const autocorrectChoiceState = new stepfunctions.Choice(
      this,
      'is_autocorrect_required?',
      {
      },
    );

    const configureCountState = new stepfunctions.Pass(
      this,
      'configure_count',
      {
        result: stepfunctions.Result.fromObject({
          count: 3,
          index: 0,
          step: 1,
        }),
        resultPath: '$.iterator',
      },
    );

    const iteratorState = new tasks.LambdaInvoke(this, 'iterator', {
      lambdaFunction: autocorrectQueryFunction,
      resultPath: '$.iterator',
    });

    const isCountReachedState = new stepfunctions.Choice(
      this,
      'is_count_reached',
      {
        //inputPath: '$.iterator',
      },
    );

    // const queryGeneratorTwoState = new tasks.LambdaInvoke(
    //   this,
    //   'generate_query_path_two',
    //   {
    //     lambdaFunction: queryGeneratorFunction,
    //     resultPath: '$.queryConfig',
    //   },
    // );

    const outputState = new tasks.SqsSendMessage(this, 'publish_query_result', {
      queue: outputQueue,
      messageBody: stepfunctions.TaskInput.fromObject({
        result: stepfunctions.TaskInput.fromJsonPathAt(
          '$.queryConfig.Payload.result',
        ),
        user_question:
          stepfunctions.TaskInput.fromJsonPathAt('$.user_question'),
        question_unique_id: stepfunctions.TaskInput.fromJsonPathAt(
          '$.question_unique_id',
        ),
      }),
    });

    const alternateQueryCorrectChoiceState = new stepfunctions.Choice(
      this,
      'is_alternate_query_correct?',
      {
        //inputPath: '$.queryConfig.Payload',
      },
    );
    const alternateQueryExecutorState = new tasks.LambdaInvoke(
      this,
      'execute_alternate_query',
      {
        lambdaFunction: queryExecutorFunction,
        resultPath: '$.queryConfig',
      },
    ).next(
      alternateQueryCorrectChoiceState
        .when(
          stepfunctions.Condition.stringEquals(
            '$.queryConfig.Payload.status',
            'QUERY_ERROR',
          ),
          iteratorState,
        )
        .otherwise(outputState),
    );

    const queryExecutorState = new tasks.LambdaInvoke(this, 'execute_query', {
      lambdaFunction: queryExecutorFunction,
      resultPath: '$.queryConfig',
    }).next(
      autocorrectChoiceState
        .when(
          stepfunctions.Condition.stringEquals(
            '$.queryConfig.Payload.status',
            'QUERY_ERROR',
          ),
          configureCountState
            .next(iteratorState)
            .next(
              isCountReachedState
                .when(
                  stepfunctions.Condition.booleanEquals(
                    '$.iterator.Payload.continue',
                    true,
                  ),
                  alternateQueryGeneratorState.next(alternateQueryExecutorState),
                )
                .otherwise(outputState),
            ),
        )
        .otherwise(outputState),
    );

    const feedbackChoiceStateOne = new stepfunctions.Choice(
      this,
      'is_feedback_req_on_reformualted_question?',
      {
        inputPath: '$.queryConfig.Payload',
      },
    );
    // const feedbackChoiceStateTwo = new stepfunctions.Choice(
    //   this,
    //   'is_feedback_req_on_generated_query_path_two?',
    //   {},
    // );

    const executeQueryChoiceState = new stepfunctions.Choice(
      this,
      'is_query_execution_req?',
      {},
    )
      .when(
        stepfunctions.Condition.stringEquals(
          '$.execute_sql_strategy',
          'disabled',
        ),
        outputState,
      )
      .otherwise(queryExecutorState);

    const generatedQueryFeedbackState = new tasks.SqsSendMessage(
      this,
      'get_feedback_on_generated_query',
      {
        queue,
        messageBody: stepfunctions.TaskInput.fromObject({
          message:
            'Following is the generated query. Do you agree with it or want to override?',
          generated_query: stepfunctions.JsonPath.stringAt(
            '$.queryConfig.Payload.result',
          ),
          execute_sql_strategy: stepfunctions.TaskInput.fromJsonPathAt(
            '$.execute_sql_strategy',
          ),
          execution_start_time: stepfunctions.TaskInput.fromJsonPathAt(
            '$.execution_start_time',
          ),

          reformualted_question: stepfunctions.TaskInput.fromJsonPathAt(
            '$.reformulated_user_question',
          ),
          user_question:
            stepfunctions.TaskInput.fromJsonPathAt('$.user_question'),
          question_unique_id: stepfunctions.TaskInput.fromJsonPathAt(
            '$.question_unique_id',
          ),

          TaskToken: stepfunctions.JsonPath.taskToken,
        }),
        integrationPattern:
          stepfunctions.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      },
    ).next(executeQueryChoiceState);

    const generateQueryfeedbackChoiceState = new stepfunctions.Choice(
      this,
      'is_feedback_req_on_generated_query ?',
      {},
    )
      .when(
        stepfunctions.Condition.stringEquals(
          '$.queryConfig.Payload.sql_validation_strategy',
          'human',
        ),
        generatedQueryFeedbackState,
      )
      .otherwise(executeQueryChoiceState);

    const queryGeneratorState = new tasks.LambdaInvoke(this, 'generate_query', {
      lambdaFunction: queryGeneratorFunction,
      resultPath: '$.queryConfig',
    }).next(generateQueryfeedbackChoiceState);

    // event bridge
    // Create an IAM role for Events to start the State Machine
    const eventsRole = new iam.Role(this, 'EventsRuleRole', {
      assumedBy: new iam.ServicePrincipal('events.amazonaws.com'),
    });

    if (props?.existingEventBusInterface) {
      this.eventBus = props.existingEventBusInterface;
    } else if (props?.eventBusProps) {
      this.eventBus = eventBridgeHelper.buildEventBus(this, {
        eventBusProps: props.eventBusProps,
      });
    } else {
      this.eventBus = new events.EventBus(
        this,
        'textToSqlBus' + props.stage,
        {
          eventBusName: generatePhysicalNameV2(
            this,
            'textToSql' + this.stage,
            { maxLength: 63, lower: true },
          ),
        },
      );
    }

    this.stepFunction = new stepfunctions.StateMachine(
      this,
      'textToSqlStepFunction' + props.stage,
      {
        definition: reformulateQuestionState.next(
          feedbackChoiceStateOne
            .when(
              stepfunctions.Condition.stringEquals(
                '$.semantic_layer_strategy',
                'human',
              ),
              reformulatedQuestionFeedbackState.next(queryGeneratorState),
            )
            .otherwise(queryGeneratorState),
        ),
        logs: {
          destination: sflogGroup,
          level: stepfunctions.LogLevel.ALL,
        },
        tracingEnabled: true,
        timeout: Duration.days(90),

      },

    );


    this.eventsRule = new events.Rule(this, 'EventsRule', {
      eventBus: this.eventBus,
      targets: [new eventsTarget.SfnStateMachine(
        this.stepFunction, {
          role: eventsRole,
        },
      )],
      eventPattern: {
        source: ['webclient'],
      },
    });

    this.eventBus.grantPutEventsTo(this.stepFunction);

    // Grant the start execution permission to the Events service
    this.stepFunction.grantStartExecution(eventsRole);
  } // end construct


}
