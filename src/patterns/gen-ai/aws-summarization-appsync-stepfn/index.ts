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
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as elasticache from 'aws-cdk-lib/aws-elasticache';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambdaFunction from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as sfn from 'aws-cdk-lib/aws-stepfunctions';
import * as sfnTask from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import * as eventBridge from '../../../common/helpers/eventbridge-helper';
import * as redisHelper from '../../../common/helpers/redis-helper';
import * as s3BucketHelper from '../../../common/helpers/s3-bucket-helper';
import * as vpcHelper from '../../../common/helpers/vpc-helper';

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
  readonly existingEventBusInterface?: events.IEventBus;

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
   * Optional. Logging configuration for AppSync
   * @default - fieldLogLevel - None
   */
  readonly logConfig?: appsync.LogConfig;

  /**
   * Optional.  xray enablement for AppSync
   * @default - false
   */
  readonly xrayEnabled?: boolean;

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
   * Value will be appended to resources name.
   *
   * @default - _dev
   */
  readonly stage?: string;
}

export class SummarizationAppsyncStepfn extends Construct {
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
   * Logging configuration for AppSync
   * @default - fieldLogLevel - None
   */
  public readonly logConfig: appsync.LogConfig;

  /**
   * Step function
   * @default - fieldLogLevel - None
   */
  public readonly stateMachine: sfn.StateMachine;


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

    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }

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
    // bucket for input document
    s3BucketHelper.CheckS3Props({
      existingBucketObj: props.existingInputAssetsBucketObj,
      bucketProps: props.bucketInputsAssetsProps,
    });

    if (props?.existingInputAssetsBucketObj) {
      this.inputAssetBucket = props.existingInputAssetsBucketObj;
    } else if (props?.bucketInputsAssetsProps) {
      this.inputAssetBucket = new s3.Bucket(this,
        'inputAssetsBucket'+stage, props.bucketInputsAssetsProps);
    } else {
      const bucketName= 'input-assets-bucket'+stage+'-'+cdk.Aws.ACCOUNT_ID;
      this.inputAssetBucket = new s3.Bucket(this, 'inputAssetsBucket'+stage,
        {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: bucketName,
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
        'processedAssetsBucket'+stage, props.bucketProcessedAssetsProps);
    } else {
      const bucketName= 'processed-assets-bucket'+stage+'-'+cdk.Aws.ACCOUNT_ID;

      this.processedAssetBucket = new s3.Bucket(this, 'processedAssetsBucket'+stage,
        {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: bucketName,
        });
    }

    // set up redis cluster
    redisHelper.CheckRedisClusterProps(props);


    // build redis cluster only when cfnCacheClusterProps is set
    if (props?.cfnCacheClusterProps) {
      const redisSecurityGroup =redisHelper.getRedisSecurityGroup(this, {
        existingVpc: this.vpc,
      });
      this.redisCluster = redisHelper.buildRedisCluster(this, {
        existingVpc: this.vpc,
        cfnCacheClusterProps: props.cfnCacheClusterProps,
        subnetIds: vpcHelper.getPrivateSubnetIDs(this.vpc),
        inboundSecurityGroup: this.securityGroup,
        redisSecurityGroup: redisSecurityGroup,
      });
      redisHelper.setInboundRules(redisSecurityGroup, this.securityGroup);
    } else {
      this.redisCluster= props?.existingRedisCulster!;
    }

    const redisHost = this.redisCluster?.attrRedisEndpointAddress!;
    const redisPort = this.redisCluster?.attrRedisEndpointPort!;


    eventBridge.CheckEventBridgeProps(props);
    // Create event bridge
    this.eventBridgeBus = eventBridge.buildEventBus(this, {
      existingEventBusInterface: props.existingEventBusInterface,
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


    const isXrayEnabled= props?.xrayEnabled || false;
    const apiName = props.summaryApiName || 'summaryApi';


    if (props?.logConfig) {
      this.logConfig = props.logConfig;
    } else {
      this.logConfig= {
        fieldLogLevel: appsync.FieldLogLevel.NONE,
      };
    }

    // graphql api for summary. client invoke this api with given schema and cognito user pool auth.
    const summarizationGraphqlApi = new appsync.GraphqlApi(this, 'summarizationGraphqlApi'+stage,
      {
        name: apiName+stage,
        logConfig: this.logConfig,
        schema: appsync.SchemaFile.fromAsset(path.join(__dirname, '../../../../resources/gen-ai/aws-summarization-appsync-stepfn/schema.graphql')),
        authorizationConfig: authorizationConfig,
        xrayEnabled: isXrayEnabled,
      });
    this.graphqlApi= summarizationGraphqlApi;

    // If the user provides a mergedApi endpoint, the lambda
    // functions will use this endpoint to send their status updates
    const updateGraphQlApiEndpoint = !props.existingMergedApi ? summarizationGraphqlApi.graphqlUrl : props.existingMergedApi.attrGraphQlUrl;
    const updateGraphQlApiId = !props.existingMergedApi ? summarizationGraphqlApi.apiId : props.existingMergedApi.attrApiId;

    // Lambda function to validate Input
    const inputValidatorLambda =
    new lambdaFunction.DockerImageFunction(this, 'inputValidatorLambda'+stage,
      {
        code: lambdaFunction.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/input_validator')),
        functionName: 'summary_input_validator'+stage,
        description: 'Lambda function to validate input for summary api',
        vpc: this.vpc,
        tracing: lambdaFunction.Tracing.ACTIVE,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 1,
        timeout: cdk.Duration.minutes(5),
        environment: {
          GRAPHQL_URL: updateGraphQlApiEndpoint,
        },
      });


    const transformedAssetBucketName = this.processedAssetBucket.bucketName;
    const inputAssetBucketName = this.inputAssetBucket.bucketName;
    const isFileTransformationRequired = props?.isFileTransformationRequired || 'false';

    const documentReaderLambda = new lambdaFunction.DockerImageFunction(this, 'documentReaderLambda'+stage, {
      code: lambdaFunction.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/document_reader')),
      functionName: 'summary_document_reader'+stage,
      description: 'Lambda function to read the input transformed document',
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: 1_769 * 1,
      tracing: lambdaFunction.Tracing.ACTIVE,
      timeout: cdk.Duration.minutes(5),
      environment: {
        REDIS_HOST: redisHost,
        REDIS_PORT: redisPort,
        TRANSFORMED_ASSET_BUCKET: transformedAssetBucketName,
        INPUT_ASSET_BUCKET: inputAssetBucketName,
        IS_FILE_TRANSFORMED: isFileTransformationRequired,
        GRAPHQL_URL: updateGraphQlApiEndpoint,

      },
    });

    const summaryChainType = props?.summaryChainType || 'stuff';

    const generateSummarylambda = new lambdaFunction.DockerImageFunction(this, 'generateSummarylambda'+stage, {
      functionName: 'summary_generator'+stage,
      description: 'Lambda function to generate the summary',
      code: lambdaFunction.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/summary_generator')),
      vpc: this.vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: 1_769 * 4,
      timeout: cdk.Duration.minutes(10),
      environment: {
        REDIS_HOST: redisHost,
        REDIS_PORT: redisPort,
        ASSET_BUCKET_NAME: transformedAssetBucketName,
        GRAPHQL_URL: updateGraphQlApiEndpoint,
        SUMMARY_LLM_CHAIN_TYPE: summaryChainType,
      },
    });

    this.inputAssetBucket?.grantRead(generateSummarylambda);
    this.processedAssetBucket?.grantReadWrite(generateSummarylambda);
    this.inputAssetBucket?.grantRead(documentReaderLambda);
    this.processedAssetBucket?.grantReadWrite(documentReaderLambda);


    documentReaderLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          's3:PutObject',
          'appsync:GraphQL'],
        resources: ['arn:aws:s3:::' + inputAssetBucketName + '/*',
          'arn:aws:s3:::' + transformedAssetBucketName + '/*',
          'arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'],
      }),
    );

    generateSummarylambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          's3:PutObject',
          'appsync:GraphQL',
          'bedrock:*'],
        resources: ['arn:aws:s3:::' + inputAssetBucketName + '/*',
          'arn:aws:s3:::' + transformedAssetBucketName + '/*',
          'arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'
          , '*'],

      }),
    );


    inputValidatorLambda.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject',
          's3:GetBucketLocation',
          's3:ListBucket',
          'appsync:GraphQL'],

        resources: ['arn:aws:s3:::' + inputAssetBucketName + '/*',
          'arn:aws:s3:::' + transformedAssetBucketName + '/*',
          'arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'],
      }),
    );

    // create datasource at appsync
    const SummaryStatusDataSource = new appsync.NoneDataSource
    (this, 'noneDataSource'+stage, {
      api: summarizationGraphqlApi,
      name: 'SummaryStatusDataSource',
    });

    SummaryStatusDataSource.createResolver
    ('summaryResponseresolver'+stage, {
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
      queueName: 'summarydlq'+stage,
      retentionPeriod: cdk.Duration.days(7),
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
    }).iterator(
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

    const summarizationLogGroup = new logs.LogGroup(this, 'summarizationLogGroup', {});


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
      timeout: cdk.Duration.minutes(15),
      logs: {
        destination: summarizationLogGroup,
        level: sfn.LogLevel.ALL,
      },
      tracingEnabled: true,
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

  }
}
