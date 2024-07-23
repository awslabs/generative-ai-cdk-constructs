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
import { ConstructsFactories } from '@aws-solutions-constructs/aws-constructs-factories';
import {
  EventbridgeToStepfunctions,
  EventbridgeToStepfunctionsProps,
} from '@aws-solutions-constructs/aws-eventbridge-stepfunctions';
import { Aws, Duration } from 'aws-cdk-lib';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as events from 'aws-cdk-lib/aws-events';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
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
import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import {
  generatePhysicalNameV2,
  lambdaMemorySizeLimiter,
} from '../../../common/helpers/utils';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';

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
   * Optional. Security group for the lambda function which this construct will use.
   * If no exisiting security group is provided it will create one from the vpc.
   * @default - none
   */
  readonly existingSecurityGroup?: ec2.ISecurityGroup;

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
  readonly dbName: string;

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
   * Optional. Allows to provide custom lambda code for requesting the feedback from the user.
   * If not provided, default code will be used.
   *
   */
  readonly customFeedbackLambdaProps?: DockerLambdaCustomProps | undefined;

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
   * Optional. Existing Knowledge base ID.
   *
   * @default - None
   */
  readonly existingKnowledgeBaseId?: string;
}

export class TextToSql extends BaseClass {
  /**
   * Returns the instance of ec2.IVpc used by the construct
   */
  public readonly vpc: ec2.IVpc;

  /**
   * Returns the instance of ec2.ISecurityGroup used by the construct
   */
  public readonly securityGroup: ec2.ISecurityGroup;

  /**
   * Returns the instance of s3.IBucket used by the construct
   */
  public readonly configAssetBucket: s3.IBucket;

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

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    // vpc
    if (props?.existingVpc) {
      this.vpc = props.existingVpc;
    } else {
      this.vpc = new ec2.Vpc(this, 'Vpc', props.vpcProps);
    }
    // Security group
    if (props?.existingSecurityGroup) {
      this.securityGroup = props.existingSecurityGroup;
    } else {
      this.securityGroup = new ec2.SecurityGroup(this, 'securityGroup', {
        vpc: this.vpc,
        allowAllOutbound: true,
      });
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

    // s3 bucket
    if (props?.existingconfigAssetsBucketObj) {
      this.configAssetBucket = props.existingconfigAssetsBucketObj;
    } else if (props?.configAssetsBucketProps) {
      const factories = new ConstructsFactories(this, 'resourceFactory');

      this.configAssetBucket = factories.s3BucketFactory('configBucket', {
        bucketProps: props.configAssetsBucketProps,
      }).s3Bucket;
    } else {
      const factories = new ConstructsFactories(this, 'resourceFactory');
      this.configAssetBucket = factories.s3BucketFactory(
        'configBucket',
        {},
      ).s3Bucket;
    }

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
                    this.configAssetBucket +
                    '/*',

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

    const queryConfigFunctionName = generatePhysicalNameV2(
      this,
      'queryconfigurerFunction' + this.stage,
      { maxLength: 63, lower: true },
    );


    const queryConfigFunctionProps = {
      functionName: queryConfigFunctionName,
      description:
        'Lambda function to do all config work before query generation',
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(__dirname, '../../../../lambda/aws-text-to-sql/query_config'),
      ),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
      environment: {
        DB_NAME: props.dbName,
        METADATA_SOURCE: props.metadataSource,
        CONFIG_BUCKET: this.configAssetBucket.bucketName,
        KB_ID: props.existingKnowledgeBaseId ?props.existingKnowledgeBaseId : '',
      },
    };

    // Lambda function to load  the config and do all pre steps before query generation.
    const queryConfigurerFunction = buildDockerLambdaFunction(
      this,
      'queryconfigurerFunction' + this.stage,
      queryConfigFunctionProps,
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
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,

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
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: textToSQLFunctionRole,
    };

    // Lambda function used to generate the query
    const queryExecutorFunction = buildDockerLambdaFunction(
      this,
      'queryExecutorFunctionName' + this.stage,
      queryExecutorFunctionProps,
      props.customQueryExecutorLambdaProps,
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

    // STEP FUNCTION
    //const startState = new stepfunctions.Pass(this, "StartState");

    //const endState = new stepfunctions.Pass(this, 'EndState');

    const queryConfigState = new tasks.LambdaInvoke(
      this,
      'Query Config state',
      {
        lambdaFunction: queryConfigurerFunction,
        outputPath: '$.',
        resultPath: '$.queryConfig',
        payload: stepfunctions.TaskInput.fromObject({
          user_question: stepfunctions.JsonPath.stringAt('$.user_question'),
        }),

      },
    );

    const reformulatedQuestionFeedbackState = new tasks.SqsSendMessage(
      this,
      'reformulatedQuestionFeedbackState',
      {
        queue,
        messageBody: stepfunctions.TaskInput.fromObject({
          message: 'Following is the reformulated question. Do you agree with the new question?',
          reformualted_question: stepfunctions.JsonPath.stringAt('$.queryConfig.new_user_question'),
          TaskToken: stepfunctions.JsonPath.taskToken,
        }),
        integrationPattern:
          stepfunctions.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      },
    );

    const generatedQueryFeedbackOneState = new tasks.SqsSendMessage(
      this,
      'generatedQueryFeedbackOneState',
      {
        queue,
        messageBody: stepfunctions.TaskInput.fromObject({
          message: 'Following is the generated query. Do you agree with it or want to override?',
          generated_query: stepfunctions.JsonPath.stringAt('$.queryConfig.validated_sql_query'),
          TaskToken: stepfunctions.JsonPath.taskToken,
        }),
        integrationPattern:
          stepfunctions.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      },
    );

    const generatedQueryFeedbackTwoState = new tasks.SqsSendMessage(
      this,
      'generatedQueryFeedbackTwoState',
      {
        queue,
        messageBody: stepfunctions.TaskInput.fromObject({
          message: 'Following is the generated query. Do you agree with it or want to override?',
          generated_query: stepfunctions.JsonPath.stringAt('$.queryConfig.validated_sql_query'),
          TaskToken: stepfunctions.JsonPath.taskToken,
        }),
        integrationPattern:
          stepfunctions.IntegrationPattern.WAIT_FOR_TASK_TOKEN,
      },
    );

    const queryGeneratorOneState = new tasks.LambdaInvoke(
      this,
      'queryGeneratorOneState',
      {
        lambdaFunction: queryGeneratorFunction,
        outputPath: '$.queryGenerated',
        resultPath: '$.queryConfig',
        inputPath: '$.',
      },
    );

    const queryGeneratorTwoState = new tasks.LambdaInvoke(
      this,
      'queryGeneratorTwoState',
      {
        lambdaFunction: queryGeneratorFunction,
        outputPath: '$.status',
      },
    );

    const queryExecutorState = new tasks.LambdaInvoke(
      this,
      'Query Executor state',
      {
        lambdaFunction: queryExecutorFunction,
        outputPath: '$.status',
      },
    );

    const feedbackChoiceStateOne = new stepfunctions.Choice(
      this,
      'feedbackChoiceStateOne',
      {
        inputPath: '$.queryConfig',
        outputPath: '$.',

      },
    );
    const feedbackChoiceStateTwo = new stepfunctions.Choice(
      this,
      'feedbackChoiceStateTwo',
      {
        outputPath: '$.is_feed_back_req',
      },
    );
    const feedbackChoiceStateThree = new stepfunctions.Choice(
      this,
      'feedbackChoiceStateThree',
      {
        outputPath: '$.is_feed_back_req',
      },
    );

    const constructProps: EventbridgeToStepfunctionsProps = {
      stateMachineProps: {
        definition: queryConfigState
          .next(
            feedbackChoiceStateOne
              .when(
                stepfunctions.Condition.stringEquals(
                  '$.semantic_layer_strategy',
                  'human',
                ),
                reformulatedQuestionFeedbackState.next(
                  queryGeneratorOneState.next(
                    feedbackChoiceStateTwo
                      .when(
                        stepfunctions.Condition.stringEquals(
                          '$.sql_validation_strategy',
                          'human',
                        ),
                        generatedQueryFeedbackOneState.next(queryExecutorState),
                      )
                      .otherwise(queryExecutorState),
                  ),
                ),
              )
              .otherwise(
                queryGeneratorTwoState.next(
                  feedbackChoiceStateThree
                    .when(
                      stepfunctions.Condition.booleanEquals(
                        '$.is_generated_sql_feedback_req',
                        true,
                      ),
                      generatedQueryFeedbackTwoState.next(queryExecutorState),
                    )
                    .otherwise(queryExecutorState),
                ),
              ),
          ),
      },
      eventRuleProps: {
        schedule: events.Schedule.rate(Duration.days(1)),
      },
    };

    new EventbridgeToStepfunctions(
      this,
      'test-eventbridge-stepfunctions-stack',
      constructProps,
    );
  }
}
