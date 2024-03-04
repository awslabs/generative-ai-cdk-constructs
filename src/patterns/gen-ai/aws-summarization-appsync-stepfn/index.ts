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
import { Duration, Aws, Stack } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfnTask from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BaseClass, BaseClassProps } from '../../../common/base-class/base-class';
import * as eventBridge from '../../../common/helpers/eventbridge-helper';
import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import * as redisHelper from '../../../common/helpers/redis-helper';
import * as s3BucketHelper from '../../../common/helpers/s3-bucket-helper';
import { generatePhysicalName, lambdaMemorySizeLimiter } from '../../../common/helpers/utils';
import * as vpcHelper from '../../../common/helpers/vpc-helper';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';

export interface SummarizationAppsyncStepfnProps {
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
   * Optional. Existing Redis cluster to cache the generated summary
   * for subsequent request of same document.
   *
   * @default - none
   */
  readonly existingRedisCulster?: elasticache.CfnCacheCluster;


  /**
   * Optional. Custom cfnCacheClusterProps for Redis.
   * Providing existingRedisCulster and cfnCacheClusterProps together will result in error.
   * @default cacheNodeType -  'cache.r6g.xlarge'
   * @default numCacheNodes- 1
   */
  readonly cfnCacheClusterProps?: elasticache.CfnCacheClusterProps;

  /**
   * Optional. Security group for the lambda function which this construct will use.
   * If no exisiting security group is provided it will create one from the vpc.
   * @default - none
   */
  readonly existingSecurityGroup?: ec2.ISecurityGroup;

  /**
   * Required. Cognito user pool used for authentication.
   *
   * @default - None
   */
  readonly cognitoUserPool: cognito.IUserPool;
  /**
   * Optional. Existing s3 Bucket to store the input document which needs to be summarized.
   * pdf is the supported input document format. If transformed (txt format) file is
   * available then this bucket is optional.
   *
   * @default - None
   */
  readonly existingInputAssetsBucketObj?: s3.IBucket;

  /**
   * Optional. User provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingInputAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketInputsAssetsProps?: s3.BucketProps;

  /**
   * Optional. The summary construct transform the input document into txt format. If the
   * transformation is not required then this flag can be set to false. If set to true
   * then a transformed asset bucket is created which transform the input document from
   * input asset bucket to txt format.
   *
   * @default - False
   */
  readonly isFileTransformationRequired?: string;

  /**
   * Optional. This bucket stores the transformed (txt) assets for generating summary.
   * If None is provided then this contruct will create one.
   * @default - None
   */
  readonly existingProcessedAssetsBucketObj?: s3.IBucket;


  /**
   * Optional. User provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingProcessedAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketProcessedAssetsProps?: s3.BucketProps;

  /**
   * Optional. Existing instance of EventBus. The summary construct integrate appsync with event bridge'
   * to route the request to step functions.
   *
   * @default - None
   */
  readonly existingBusInterface?: events.IEventBus;

  /**
    * Optional. A new custom EventBus is created with provided props.
    * Providing existingEventBusInterface and eventBusProps both will result in validation error.
    *
    * @default - None
    */
  readonly eventBusProps?: events.EventBusProps;

  /**
   * Optional - Existing merged Appsync GraphQL api.
   *
   * @default - None
   */
  readonly existingMergedApi?: appsync.CfnGraphQLApi;

  /**
   * Optional. User provided Name for summary api on appsync.
   * A graphql api will be created by this construct with this name.
   * @default 'summaryApi'
   */
  readonly summaryApiName?: string;
  /**
   * Enable observability. Warning: associated cost with the services
   * used. Best practice to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;
  /**
   * Optional. Chain type defines how to pass the document to LLM.
   * there are three types of chain types.
   * Stuff: Simply "stuff" all your documents into a single prompt.
   * Map-reduce: Summarize each document on it's own in a "map" step and then "reduce" the summaries into a final summary
   * Refine :  This constructs a response by looping over the input documents and iteratively updating its answer
   * @default - Stuff
   */
  readonly summaryChainType?: string;
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
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;
  /**
   * Optional. Allows to provide Embeddings custom lambda code
   * and settings instead of the existing
   */
  readonly customDocumentReaderDockerLambdaProps?: DockerLambdaCustomProps | undefined;
  /**
   * Optional. Allows to provide Input Validation custom lambda code
   * and settings instead of the existing
   */
  readonly customInputValidationDockerLambdaProps?: DockerLambdaCustomProps | undefined;
  /**
   * Optional. Allows to provide File Transformer custom lambda code
   * and settings instead of the existing
   */
  readonly customSummaryGeneratorDockerLambdaProps?: DockerLambdaCustomProps | undefined;

}

export class SummarizationAppsyncStepfn extends BaseClass {
  /**
   * Returns an instance of events.IEventBus created by the construct
   */
  public readonly eventBridgeBus: events.IEventBus;
  /**
   * Returns an instance of appsync.CfnGraphQLApi for summary created by the construct
   */
  public readonly graphqlApi: appsync.IGraphqlApi ;
  /**
   * Returns an instance of redis cluster created by the construct
   */
  public readonly redisCluster: elasticache.CfnCacheCluster;
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
  public readonly inputAssetBucket: s3.IBucket;
  /**
   * Returns the instance of s3.IBucket used by the construct
   */
  public readonly processedAssetBucket: s3.IBucket;
  /**
   * Step function
   * @default - fieldLogLevel - None
   */
  public readonly stateMachine: sfn.StateMachine;
  /**
   * Returns an instance of lambda.DockerImageFunction used for the summary generation job created by the construct
   */
  public readonly summaryGeneratorLambdaFunction: lambda.DockerImageFunction;
  /**
   * Returns an instance of lambda.DockerImageFunction used for the document reading job created by the construct
   */
  public readonly documentReaderLambdaFunction: lambda.DockerImageFunction;
  /**
   * Returns an instance of lambda.DockerImageFunction used for the input validation job created by the construct
   */
  public readonly inputValidationLambdaFunction: lambda.DockerImageFunction;


  /**
     * @summary Constructs a new instance of the SummarizationAppsyncStepfn class.
     * @param {Construct} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {SummarizationAppsyncStepfnProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: SummarizationAppsyncStepfnProps) {
    super(scope, id);

    const baseProps: BaseClassProps={
      stage: props.stage,
      enableOperationalMetric: props.enableOperationalMetric,
      constructorName: this.constructor.name,
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
      this.securityGroup = new ec2.SecurityGroup(
        this,
        'securityGroup',
        {
          vpc: this.vpc,
          allowAllOutbound: true,
        },
      );
    }

    // vpc flowloggroup
    const logGroup = new logs.LogGroup(this, 'summarizationConstructLogGroup');
    const vpcFlowLogrole = new iam.Role(this, 'summarizationConstructRole', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
    });

    // vpc flowlogs
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup, vpcFlowLogrole),
    });

    // bucket for storing server access logging
    const serverAccessLogBucket = new s3.Bucket(this,
      'serverAccessLogBucket'+this.stage,
      {
        blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
        encryption: s3.BucketEncryption.S3_MANAGED,
        enforceSSL: true,
        versioned: true,
        lifecycleRules: [{
          expiration: Duration.days(90),
        }],
      });


    // bucket for input document
    s3BucketHelper.CheckS3Props({
      existingBucketObj: props.existingInputAssetsBucketObj,
      bucketProps: props.bucketInputsAssetsProps,
    });

    if (props?.existingInputAssetsBucketObj) {
      this.inputAssetBucket = props.existingInputAssetsBucketObj;
    } else if (props?.bucketInputsAssetsProps) {
      this.inputAssetBucket = new s3.Bucket(this,
        'inputAssetsSummaryBucket'+this.stage, props.bucketInputsAssetsProps);
    } else {
      const bucketName= 'input-assets-summary-bucket'+this.stage+'-'+Aws.ACCOUNT_ID;
      this.inputAssetBucket = new s3.Bucket(this, 'inputAssetsSummaryBucket'+this.stage,
        {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: bucketName,
          serverAccessLogsBucket: serverAccessLogBucket,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [{
            expiration: Duration.days(90),
          }],
        });
    }

    // bucket for transformed document
    s3BucketHelper.CheckS3Props({
      existingBucketObj: props.existingProcessedAssetsBucketObj,
      bucketProps: props.bucketProcessedAssetsProps,
    });

    if (props?.existingProcessedAssetsBucketObj) {
      this.processedAssetBucket = props.existingProcessedAssetsBucketObj;
    } else if (props?.bucketProcessedAssetsProps) {
      this.processedAssetBucket = new s3.Bucket(this,
        'processedAssetsSummaryBucket'+this.stage, props.bucketProcessedAssetsProps);
    } else {
      const bucketName= 'processed-assets-summary-bucket'+this.stage+'-'+Aws.ACCOUNT_ID;

      this.processedAssetBucket = new s3.Bucket(this, 'processedAssetsSummaryBucket'+this.stage,
        {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: bucketName,
          serverAccessLogsBucket: serverAccessLogBucket,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [{
            expiration: Duration.days(90),
          }],
        });
    }


    // set up redis cluster
    redisHelper.CheckRedisClusterProps(props);


    // build redis cluster only when cfnCacheClusterProps is set
    if (props?.cfnCacheClusterProps) {
      const redisSecurityGroup =redisHelper.getRedisSecurityGroup(this, {
        existingVpc: this.vpc,
      });
      const redisProps = {
        existingVpc: this.vpc,
        cfnCacheClusterProps: props.cfnCacheClusterProps,
        subnetIds: vpcHelper.getPrivateSubnetIDs(this.vpc),
        inboundSecurityGroup: this.securityGroup,
        redisSecurityGroup: redisSecurityGroup,
        redisPort: 8686,
      };
      this.redisCluster = redisHelper.buildRedisCluster(this, redisProps);
      redisHelper.setInboundRules(redisSecurityGroup, this.securityGroup, redisProps.redisPort);
    } else {
      this.redisCluster= props?.existingRedisCulster!;
    }

    const redisHost = this.redisCluster?.attrRedisEndpointAddress!;
    const redisPort = this.redisCluster?.attrRedisEndpointPort!;


    eventBridge.CheckEventBridgeProps(props);
    // Create event bridge
    this.eventBridgeBus = eventBridge.buildEventBus(this, {
      existingEventBusInterface: props.existingBusInterface,
      eventBusProps: props.eventBusProps,
    });

    // make it generic for other auth config as well
    const authorizationConfig: appsync.AuthorizationConfig = {
      defaultAuthorization: {
        authorizationType: appsync.AuthorizationType.USER_POOL,
        userPoolConfig: { userPool: props.cognitoUserPool },
      },
      additionalAuthorizationModes: [
        {
          authorizationType: appsync.AuthorizationType.IAM,
        },
      ],
    };

    const apiName = props.summaryApiName || 'summaryApi';

    // graphql api for summary. client invoke this api with given schema and cognito user pool auth.
    const summarizationGraphqlApi = new appsync.GraphqlApi(this, 'summarizationGraphqlApi'+this.stage,
      {
        name: apiName+this.stage,
        logConfig: {
          fieldLogLevel: this.fieldLogLevel,
          retention: this.retention,
        },
        definition: appsync.Definition.fromFile(
          path.join(__dirname, '../../../../resources/gen-ai/aws-summarization-appsync-stepfn/schema.graphql'),
        ),
        authorizationConfig: authorizationConfig,
        xrayEnabled: this.enablexray,
      });
    this.graphqlApi= summarizationGraphqlApi;

    // If the user provides a mergedApi endpoint, the lambda
    // functions will use this endpoint to send their status updates
    const updateGraphQlApiEndpoint = !props.existingMergedApi ? summarizationGraphqlApi.graphqlUrl : props.existingMergedApi.attrGraphQlUrl;
    const updateGraphQlApiId = !props.existingMergedApi ? summarizationGraphqlApi.apiId : props.existingMergedApi.attrApiId;

    // bucket
    const transformedAssetBucketName = this.processedAssetBucket.bucketName;
    const inputAssetBucketName = this.inputAssetBucket.bucketName;
    const isFileTransformationRequired = props?.isFileTransformationRequired || 'false';

    // role
    const inputvalidatorLambdaRole = new iam.Role(this, 'inputvalidatorLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
            ],
            resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`],
          })],
        }),
      },
    });

    // Minimum permissions for a Lambda function to execute while accessing a resource within a VPC
    inputvalidatorLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:CreateNetworkInterface',
        'ec2:DeleteNetworkInterface',
        'ec2:AssignPrivateIpAddresses',
        'ec2:UnassignPrivateIpAddresses',
      ],
      resources: [
        'arn:' + Aws.PARTITION + ':ec2:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':*/*',
      ],
    }));
    // Decribe only works if it's allowed on all resources.
    // Reference: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-permissions
    inputvalidatorLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:DescribeNetworkInterfaces',
      ],
      resources: [
        '*',
      ],
    }));

    inputvalidatorLambdaRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          'appsync:GraphQL'],

        resources: ['arn:' + Aws.PARTITION + ':s3:::' + inputAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':s3:::' + transformedAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':apis/'+updateGraphQlApiId + '/*'],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      inputvalidatorLambdaRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used.',
        },
      ],
      true,
    );

    const construct_input_validation_lambda_props = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/input_validator')),
      functionName: 'summary_input_validator'+this.stage,
      description: 'Lambda function to validate input for summary api',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 1),
      timeout: Duration.minutes(5),
      role: inputvalidatorLambdaRole,
      environment: {
        GRAPHQL_URL: updateGraphQlApiEndpoint,
      },
    };

    // Lambda function used to validate inputs in the step function
    const inputValidatorLambda = buildDockerLambdaFunction(this,
      'inputValidatorLambda' + this.stage,
      construct_input_validation_lambda_props,
      props.customInputValidationDockerLambdaProps,
    );

    // role
    const documentReaderLambdaRole = new iam.Role(this, 'documentReaderLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
            ],
            resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`],
          })],
        }),
      },
    });

    // Minimum permissions for a Lambda function to execute while accessing a resource within a VPC
    documentReaderLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:CreateNetworkInterface',
        'ec2:DeleteNetworkInterface',
        'ec2:AssignPrivateIpAddresses',
        'ec2:UnassignPrivateIpAddresses',
      ],
      resources: [
        'arn:' + Aws.PARTITION + ':ec2:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':*/*',
      ],
    }));
    // Decribe only works if it's allowed on all resources.
    // Reference: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-permissions
    documentReaderLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:DescribeNetworkInterfaces',
      ],
      resources: [
        '*',
      ],
    }));

    documentReaderLambdaRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          's3:PutObject',
          'appsync:GraphQL'],
        resources: ['arn:' + Aws.PARTITION + ':s3:::' + inputAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':s3:::' + transformedAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':appsync:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':apis/' + updateGraphQlApiId + '/*'],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      documentReaderLambdaRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used',
        },
      ],
      true,
    );

    const construct_document_reader_lambda_props = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/document_reader')),
      functionName: 'summary_document_reader'+this.stage,
      description: 'Lambda function to read the input transformed document',
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 1),
      tracing: this.lambdaTracing,
      timeout: Duration.minutes(5),
      role: documentReaderLambdaRole,
      environment: {
        REDIS_HOST: redisHost,
        REDIS_PORT: redisPort,
        TRANSFORMED_ASSET_BUCKET: transformedAssetBucketName,
        INPUT_ASSET_BUCKET: inputAssetBucketName,
        IS_FILE_TRANSFORMED: isFileTransformationRequired,
        GRAPHQL_URL: updateGraphQlApiEndpoint,

      },
    };

    // Lambda function used to read documents in the step function
    const documentReaderLambda = buildDockerLambdaFunction(this,
      'documentReaderLambda' + this.stage,
      construct_document_reader_lambda_props,
      props.customDocumentReaderDockerLambdaProps,
    );

    const summaryChainType = props?.summaryChainType || 'stuff';

    // role
    const summaryGeneratorLambdaRole = new iam.Role(this, 'summaryGeneratorLambdaRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
      inlinePolicies: {
        LambdaFunctionServiceRolePolicy: new iam.PolicyDocument({
          statements: [new iam.PolicyStatement({
            actions: [
              'logs:CreateLogGroup',
              'logs:CreateLogStream',
              'logs:PutLogEvents',
            ],
            resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`],
          })],
        }),
      },
    });

    // Minimum permissions for a Lambda function to execute while accessing a resource within a VPC
    summaryGeneratorLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:CreateNetworkInterface',
        'ec2:DeleteNetworkInterface',
        'ec2:AssignPrivateIpAddresses',
        'ec2:UnassignPrivateIpAddresses',
      ],
      resources: [
        'arn:' + Aws.PARTITION + ':ec2:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':*/*',
      ],
    }));
    // Decribe only works if it's allowed on all resources.
    // Reference: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-permissions
    summaryGeneratorLambdaRole.addToPolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'ec2:DescribeNetworkInterfaces',
      ],
      resources: [
        '*',
      ],
    }));

    summaryGeneratorLambdaRole.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          's3:PutObject',
          'appsync:GraphQL',
          'bedrock:InvokeModel',
          'bedrock:InvokeModelWithResponseStream'],
        resources: ['arn:' + Aws.PARTITION +':s3:::' + inputAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':s3:::' + transformedAssetBucketName + '/*',
          'arn:' + Aws.PARTITION + ':appsync:'+ Aws.REGION +':' + Aws.ACCOUNT_ID + ':apis/' + updateGraphQlApiId + '/*',
          'arn:' + Aws.PARTITION + ':bedrock:'+ Aws.REGION +'::foundation-model/*'],

      }),
    );

    NagSuppressions.addResourceSuppressions(
      summaryGeneratorLambdaRole,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used.',
        },
      ],
      true,
    );

    const construct_generate_summary_lambda_props = {
      functionName: 'summary_generator'+this.stage,
      description: 'Lambda function to generate the summary',
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/summary_generator')),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(10),
      tracing: this.lambdaTracing,
      role: summaryGeneratorLambdaRole,
      environment: {
        REDIS_HOST: redisHost,
        REDIS_PORT: redisPort,
        ASSET_BUCKET_NAME: transformedAssetBucketName,
        GRAPHQL_URL: updateGraphQlApiEndpoint,
        SUMMARY_LLM_CHAIN_TYPE: summaryChainType,
      },
    };

    // Lambda function used to generate the summary in the step function
    const generateSummarylambda = buildDockerLambdaFunction(this,
      'generateSummarylambda' + this.stage,
      construct_generate_summary_lambda_props,
      props.customSummaryGeneratorDockerLambdaProps,
    );

    this.inputAssetBucket?.grantRead(generateSummarylambda);
    this.processedAssetBucket?.grantReadWrite(generateSummarylambda);
    this.inputAssetBucket?.grantRead(documentReaderLambda);
    this.processedAssetBucket?.grantReadWrite(documentReaderLambda);


    const lambdaFunctions=[documentReaderLambda, generateSummarylambda, inputValidatorLambda];
    this.updateConstructTrackingCode( baseProps, scope, lambdaFunctions);


    // create datasource at appsync
    const SummaryStatusDataSource = new appsync.NoneDataSource
    (this, 'noneDataSource'+this.stage, {
      api: summarizationGraphqlApi,
      name: 'SummaryStatusDataSource',
    });

    SummaryStatusDataSource.createResolver
    ('summaryResponseresolver'+this.stage, {
      typeName: 'Mutation',
      fieldName: 'updateSummaryJobStatus',
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        '{ "version": "2017-02-28", "payload": $util.toJson($context.args) }',
      ),

      responseMappingTemplate: appsync.MappingTemplate.fromString(
        '$util.toJson($context.result)'),
    });

    // step functions
    const inputValidationTask = new sfnTask.LambdaInvoke(this, 'Validate Input ', {
      lambdaFunction: inputValidatorLambda,
      resultPath: '$.validation_result',
    });

    const documentReaderTask = new sfnTask.LambdaInvoke(this, 'Read document and check summary in cache ', {
      lambdaFunction: documentReaderLambda,
      resultPath: '$.document_result',
    });


    const generateSummaryTask = new sfnTask.LambdaInvoke(this, 'Generate Summary with llm', {
      lambdaFunction: generateSummarylambda,
      resultPath: '$.summary_result',
    });

    const dlq: sqs.Queue = new sqs.Queue(this, 'dlq', {
      queueName: 'summarydlq'+this.stage,
      retentionPeriod: Duration.days(7),
      enforceSSL: true,
    });


    const jobFailed= new sfn.Fail(this, 'Failed', {
      comment: 'AWS summary Job failed',
    });

    const jobSuccess= new sfn.Succeed(this, 'succeeded', {
      comment: 'AWS summary Job succeeded',
    });

    // step function choice steps
    const validateInputChoice = new sfn.Choice(this, 'is Valid Parameters?', {
      outputPath: '$.validation_result.Payload.files',
    });

    const summaryfromCacheChoice = new sfn.Choice(this, 'is Summary in Cache?', {
    });

    const fileStatusForSummarization = new sfn.Choice(this, 'is file status ready for summarization?', {
      outputPath: '$.document_result.Payload',
    });


    // step function, run files in parallel
    const runFilesInparallel = new sfn.Map(this, 'Run Files in Parallel', {
      maxConcurrency: 100,
    }).itemProcessor(
      documentReaderTask.next(
        summaryfromCacheChoice
          .when(
            sfn.Condition.booleanEquals('$.document_result.Payload.is_summary_available', true),
            jobSuccess,
          ).otherwise(
            fileStatusForSummarization.when(
              sfn.Condition.stringMatches('$.document_result.Payload.status', 'Error'),
              jobSuccess,
            ).otherwise(
              generateSummaryTask.next(jobSuccess),
            ),
          ),
      ),
    );

    const maxLogGroupNameLength = 255;
    const logGroupPrefix = '/aws/vendedlogs/states/constructs/';
    const maxGeneratedNameLength = maxLogGroupNameLength - logGroupPrefix.length;
    const nameParts: string[] = [
      Stack.of(scope).stackName, // Name of the stack
      scope.node.id, // Construct ID
      'StateMachineLogSummarization', // Literal string for log group name portion
    ];
    const logGroupName = generatePhysicalName(logGroupPrefix, nameParts, maxGeneratedNameLength);
    const summarizationLogGroup = new logs.LogGroup(this, 'summarizationLogGroup', {
      logGroupName: logGroupName,
    });

    // step function definition
    const definition = inputValidationTask.next(
      validateInputChoice
        .when(
          sfn.Condition.booleanEquals('$.validation_result.Payload.isValid', false),
          jobFailed,
        )
        .otherwise(runFilesInparallel),
    );

    // step function

    const summarizationStepFunction = new sfn.StateMachine(this, 'summarizationStepFunction', {
      definitionBody: sfn.DefinitionBody.fromChainable(definition),
      timeout: Duration.minutes(15),
      logs: {
        destination: summarizationLogGroup,
        level: sfn.LogLevel.ALL,
      },
      tracingEnabled: this.enablexray,
    });
    this.stateMachine=summarizationStepFunction;
    // event bridge datasource for summarization api
    const eventBridgeDataSource = summarizationGraphqlApi.addEventBridgeDataSource(
      'eventBridgeDataSource',
      this.eventBridgeBus,
    );

    this.eventBridgeBus.grantPutEventsTo(eventBridgeDataSource.grantPrincipal);

    // add resolver on summary graphql schema
    eventBridgeDataSource.createResolver('generateSummary', {
      typeName: 'Mutation',
      fieldName: 'generateSummary',
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        `
         {
          "version": "2018-05-29",
          "operation": "PutEvents",
          "events": [{
              "source": "summary",
              "detail": $util.toJson($context.arguments),
              "detailType": "genAIdemo"
          }
          ]
  } 
  `,
      ),

      responseMappingTemplate: appsync.MappingTemplate.fromString(
        '#if($ctx.error)$utilerror($ctx.error.message, $ctx.error.type, $ctx.result) #end $util.toJson($ctx.result)',
      ),
    });

    new events.Rule(this, 'SummaryMutationRule', {
      description: 'Summary Mutation Rule',
      eventBus: this.eventBridgeBus,
      eventPattern: {
        source: ['summary'],
      },
      targets: [
        new targets.SfnStateMachine(summarizationStepFunction, {
          deadLetterQueue: dlq,
          retryAttempts: 1,
        }),
      ],
    });

    this.documentReaderLambdaFunction = documentReaderLambda;
    this.inputValidationLambdaFunction = inputValidatorLambda;
    this.summaryGeneratorLambdaFunction = generateSummarylambda;

  }
}

