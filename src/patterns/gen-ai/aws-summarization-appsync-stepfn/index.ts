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
import * as appsyncMergedApi from '../../../common/helpers/appsyncmergedapi-helper';
import * as eventBridge from '../../../common/helpers/eventbridge-helper';
import * as redisHelper from '../../../common/helpers/redis-helper';
import * as s3BucketHelper from '../../../common/helpers/s3-bucket-helper';
import * as vpcHelper from '../../../common/helpers/vpc-helper';

export interface SummarizationAppsyncStepfnProps {
  /**
   * Optional custom properties for a VPC the construct will create. This VPC will
   * be used by the Lambda functions the construct creates. Providing
   * both this and existingVpc is an error.
   *
   * @default - none
   */
  readonly userVpcProps?: ec2.VpcProps;
  /**
   * Optional An existing VPC in which to deploy the construct. Providing both this and
   * vpcProps is an error.
   *
   * @default - none
   */
  readonly existingVpc?: ec2.IVpc;

  /**
   * Optional redis cluster to cache the generated summary for subsequent request of same document.
   *
   * @default - none
   */
  readonly redisCulster?: elasticache.CfnCacheCluster;


  /**
   * cfnCacheClusterProps
   * @default cacheNodeType -  'cache.r6g.xlarge'
   * @default numCacheNodes- 1
   */
  readonly cfnCacheClusterProps?: elasticache.CfnCacheClusterProps;

  /**
   * security group for the lambda function which this construct will create.
   *
   * @default - none
   */
  readonly existingSecurityGroup?: ec2.SecurityGroup;

  /**
   *  user pool id is required if the app sync authentication type is
   * AMAZON_COGNITO_USER_POOLS
   * @default None
   */
  readonly userPoolId: string;
  /**
   * TODO- THIS IS NOT REQUIRED ANY MORE.
   *
   * @default - none
   */
  readonly mergeApiKeySecret: string;

  /**
   * TODO- THIS IS NOT REQUIRED ANY MORE.
   *
   * @default - none
   */
  //anthropicSecretId: string;


  /**
   * Optional Existing s3 Bucket to store the input document which needs to be summarized.
   * pdf is the supported input document format. If transformed (txt format) file is
   * available then this bucket is optional.
   *
   * @default - None
   */
  readonly existingInputAssetsBucket?: s3.IBucket;

  /**
   * Optional user provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingInputAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketInputsAssetsProps?: s3.BucketProps;

  /**
   * Optional Existing s3 Bucket to store the transformed document (in txt format) which needs to be summarized.
   *
   *
   * @default - None
   */
  readonly existingTransformedAssetsBucketObj?: s3.IBucket;

  /**
   *  Optional s3 Bucket props to create S3 bucket for this construct.

   */
  readonly bucketProps?: s3.BucketProps;
  /**
   * Existing instance of a custom EventBus.
   *
   * @default - None
   */
  readonly existingEventBusInterface?: events.IEventBus;
  /**
    * A new custom EventBus is created with provided props.
    *
    * @default - None
    */
  readonly eventBusProps?: events.EventBusProps;

  /**
   * Optional, existing merge api
   * schema for multiple source api.
   * @default None
   */
  readonly existingMergeApi: appsync.CfnGraphQLApi;

  /**
   * Optional, Name  of merged api on appsync. merge api is used to provide federated
   * schema for multiple source api.
   * @default 'mergedApi'
   */
  readonly appsyncMergedApiName?: string;

  /**
   * Name  of summary api on appsync.
   * @default 'summaryApi'
   */
  readonly summaryApiName?: string;
  /**
   * user provided appsync props
   *
   * @default - Default props are used.
   */
  readonly cfnGraphQLApiProps?: appsync.CfnGraphQLApiProps;

  /**
   * Service principle role which Appsync assumes.
   * @default None
   */
  readonly appsyncServicePrincipleRole: string;

  /**
   * Logging configuration for AppSync
   * @default - fieldLogLevel - None
   */
  readonly logConfig?: appsync.LogConfig;
  /**
   * x ray enablement for AppSync
   * @default - false
   */
  readonly xrayEnabled?: boolean;
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
  public readonly eventBridgeBus: events.IEventBus | undefined;
  /**
   * Returns an instance of appsync.CfnGraphQLApi for merge api created by the construct
   */
  public readonly mergeApi: appsync.CfnGraphQLApi | undefined;

  /**
   * Returns an instance of appsync.CfnGraphQLApi for summary created by the construct
   */
  public readonly summaryGraphqlApi: appsync.IGraphqlApi | undefined;

  /**
   * Returns an instance of redis cluster created by the construct
   */
  public readonly redisCluster: elasticache.CfnCacheCluster | undefined;

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
  public readonly assetBucket: s3.IBucket | undefined;


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

    if (props?.existingVpc) {
      this.vpc = props.existingVpc;
    } else {
      this.vpc = vpcHelper.buildVpc(this, props);
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
          securityGroupName: 'securityGroup'+stage,
        },
      );
    }

    // bucket for input document
    s3BucketHelper.CheckS3Props({
      existingBucketObj: props.existingInputAssetsBucket,
      bucketProps: props.bucketInputsAssetsProps,
    });

    if (props?.existingInputAssetsBucket) {
      this.assetBucket = props?.existingInputAssetsBucket;
      if (props?.bucketInputsAssetsProps) {
        this.assetBucket = new s3.Bucket(this, 'processedAssetsBucket'+stage, props.bucketInputsAssetsProps);
      } else {
        this.assetBucket = new s3.Bucket(this, 'processedAssetsBucket'+stage,
          {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            bucketName: 'processed-assets-bucket'+stage+'-'+cdk.Aws.ACCOUNT_ID,
          });
      }


      // build redis cluster only when cfnCacheClusterProps is set
      if (props?.cfnCacheClusterProps) {
        this.redisCluster = redisHelper.buildRedisCluster(this, {
          existingVpc: this.vpc,
          cfnCacheClusterProps: props.cfnCacheClusterProps,
          redisSecurityGroupname: 'redisSecuritygroup'+stage,
          subnetIds: vpcHelper.getPrivateSubnetIDs(this.vpc),
          redisSubnetGroupId: 'redisSecuritygroup'+stage,
        });
      }

      eventBridge.CheckEventBridgeProps(props);
      // Create event bridge
      this.eventBridgeBus = eventBridge.buildEventBus(this, {
        existingEventBusInterface: props.existingEventBusInterface,
        eventBusProps: props.eventBusProps,
      });

      // NOT REQUIRED BECAUSE NO API KEY IS USED, LAMBDA WILL DIRECTLY CALL APPSYNC MUTATION
      //const summaryEventbus = this.eventBridge.eventBus;


      appsyncMergedApi.checkAuthenticationTypeProps(props);

      // Create merge api with default settings only when cfnGraphQLApiProps is set

      appsyncMergedApi.checkAppsyncMergedApiProps(props);

      if (props?.cfnGraphQLApiProps) {
        this.mergeApi = appsyncMergedApi.buildMergedAPI(this, 'appsyncMergedApi'+stage, {
          cfnGraphQLApiProps: props.cfnGraphQLApiProps,
          userPoolId: props.userPoolId,
          appsyncServicePrincipleRole: props.appsyncServicePrincipleRole,
        });
      } else {
        this.mergeApi = props.existingMergeApi;
      }

      const mergeApiRole = new iam.Role(this, 'mergedapirole'+stage, {
        assumedBy: new iam.ServicePrincipal(props.appsyncServicePrincipleRole),
      });
      const mergeApiId = this.mergeApi.attrApiId;
      const mergeapiurl = this.mergeApi.attrGraphQlUrl;

      // const logConfig: appsync.LogConfig = {
      //   retention: logs.RetentionDays.ONE_WEEK,
      //   fieldLogLevel: appsync.FieldLogLevel.ALL,
      // };

      // cognito auth for app sync
      const cognitoUserPool = cognito.UserPool.fromUserPoolId(this,
        'cognitoUserPool'+stage, props.userPoolId);

      const authorizationConfig: appsync.AuthorizationConfig = {
        defaultAuthorization: {
          authorizationType: appsync.AuthorizationType.USER_POOL,
          userPoolConfig: { userPool: cognitoUserPool },
        },
        additionalAuthorizationModes: [
          {
            authorizationType: appsync.AuthorizationType.IAM,
          },
        ],
      };


      const isXrayEnabled= props?.xrayEnabled || false;
      const apiName = props?.summaryApiName+stage || 'summaryApi'+stage;

      // graphql api for summary. client invoke this api with given schema and cognito user pool auth.
      const summarizationGraphqlApi = new appsync.GraphqlApi(this, 'summarizationGraphqlApi'+stage,
        {
          name: apiName,
          logConfig: props.logConfig,
          schema: appsync.SchemaFile.fromAsset(path.join(__dirname, '../../../../resources/gen-ai/aws-summarization-appsync-stepfn/schema.graphql')),
          authorizationConfig: authorizationConfig,
          xrayEnabled: isXrayEnabled,
        });
      this.summaryGraphqlApi= summarizationGraphqlApi;

      // If the user provides a mergedApi endpoint, the lambda
      // functions will use this endpoint to send their status updates

      const updateGraphQlApiId = !mergeApiId ? summarizationGraphqlApi.apiId : mergeApiId;


      // associate source api with merge api
      const sourceApiAssociationConfigProperty:
      appsync.CfnSourceApiAssociation.SourceApiAssociationConfigProperty = {
        mergeType: 'mergeType',
      };

      const sourceApiAssociation = new appsync.CfnSourceApiAssociation(this,
        'sourceApiAssociations'+stage,
        {
          mergedApiIdentifier: mergeApiId,
          sourceApiAssociationConfig: sourceApiAssociationConfigProperty,
          sourceApiIdentifier: summarizationGraphqlApi.apiId,
        });

      sourceApiAssociation.node.addDependency(summarizationGraphqlApi);


      mergeApiRole.addToPolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['appsync:SourceGraphQL'],
          resources: [
            'arn:aws:appsync:' + cdk.Aws.REGION + ':' + cdk.Aws.ACCOUNT_ID
           + ':apis/' + summarizationGraphqlApi.apiId + '/*',
          ],
        }),
      );

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
          GRAPHQL_URL: !mergeapiurl ? summarizationGraphqlApi.graphqlUrl : mergeapiurl,
        },
      });


      // set default redisport and redishost value if cluster is not present
      const redisHost = this.redisCluster?.attrRedisEndpointAddress || '0000';
      const redisPort = this.redisCluster?.attrRedisEndpointPort || '0000';
      const bucketName = this.assetBucket.bucketName;

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
          REDISHOST: redisHost,
          REDISPORT: redisPort,
          ASSETBUCKETNAME: bucketName,
        // NEED BOTO 3 FOR BEDROCK AS LAYER
        //ANTHROPICSECRETID: props.anthropicSecretId,
        },
      });

      const generateSummarylambda = new lambdaFunction.DockerImageFunction(this, 'generateSummarylambda'+stage, {
        code: lambdaFunction.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-summarization-appsync-stepfn/summary_generator')),
        vpc: this.vpc,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 4,
        timeout: cdk.Duration.minutes(10),
        environment: {
          REDISHOST: redisHost,
          REDISPORT: redisPort,
          ASSETBUCKETNAME: bucketName,
          // NEED BOTO 3 FOR BEDROCK AS LAYER
          // ANTHROPICSECRETID: props.anthropicSecretId,
          TRANSFORMERSCACHE: '/tmp',
        },
      });

      documentReaderLambda.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:GetObject',
            's3:GetBucketLocation',
            's3:ListBucket',
            's3:PutObject',
            'appsync:GraphQL'],
          resources: ['arn:aws:s3:::' + bucketName + '/*',
            'arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'],
        }),
      );

      generateSummarylambda.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['appsync:GraphQL'],
          resources: ['arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'],
        }),
      );

      inputValidatorLambda.addToRolePolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['s3:GetObject',
            's3:GetBucketLocation',
            's3:ListBucket',
            'appsync:GraphQL'],

          resources: ['arn:aws:s3:::' + bucketName + '/*',
            'arn:aws:appsync:'+cdk.Aws.REGION+':'+cdk.Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*'],
        }),
      );

      // use bedrock
      //const anthropicSecretId = secrets.Secret.fromSecretNameV2(this, 'anthropicSecretId', props.anthropicSecretId);

      // api key not needed
      //const graphqlApiKey = secrets.Secret.fromSecretNameV2(this, 'apiKeySecret', props.mergeApiKeySecret);

      //anthropicSecretId.grantRead(generateSummarylambda);
      //anthropicSecretId.grantRead(documentReaderLambda);

      // graphqlApiKey.grantRead(generateSummarylambda);
      //graphqlApiKey.grantRead(documentReaderLambda);


      // create datasource at appsync
      const noneDataSource = new appsync.NoneDataSource(this, 'noneDataSource'+stage, {
        api: summarizationGraphqlApi,
        name: 'noneDataSource',
      });

      noneDataSource.createResolver('summaryResponseresolver'+stage, {
        typeName: 'Query',
        fieldName: 'none',
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          '{ "version": "2017-02-28", "payload": $util.toJson($context.args) ',
        ),

        responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($context.result)'),
      });

      // step functions
      const inputValidationTask = new sfnTask.LambdaInvoke(this, 'Validate Input ', {
        lambdaFunction: inputValidatorLambda,
        outputPath: '$.Payload',
        resultPath: '$.validation_result',
      });

      const documentReaderTask = new sfnTask.LambdaInvoke(this, 'Read document and check summary in cache ', {
        lambdaFunction: documentReaderLambda,
        outputPath: '$.Payload',
        resultPath: '$.document_result',
      });

      const createChunksAndSummarizeTask = new sfnTask.LambdaInvoke(this, 'Create chunks and summarize ', {
        lambdaFunction: generateSummarylambda,
        outputPath: '$.Payload',
      });

      const generateSummaryTask = new sfnTask.LambdaInvoke(this, 'Generate Summary with llm', {
        lambdaFunction: generateSummarylambda,
        outputPath: '$.Payload',
        resultPath: '$.summary_result',
      });

      // event bridge api connection, NOT NEEDED AS NO API KEY AUTH IS USED

      // const eventBridgeApiconnection = new events.Connection(this, 'Connection', {
      //   authorization: events.Authorization.apiKey('x-api-key', cdk.SecretValue.secretsManager(props.mergeApiKeySecret)),
      //   description: 'Connection with API Key x-api-key',
      // });

      //eventBridgeApiconnection.node.addDependency(graphqlApiKey);

      const dlq: sqs.Queue = new sqs.Queue(this, 'dlq', {
        queueName: 'summarydlq'+stage,
        retentionPeriod: cdk.Duration.days(7),
      });

      // const destination = new events.ApiDestination(this, 'destination', {
      //   apiDestinationName: 'summarization_destination_api',
      //   connection: eventBridgeApiconnection,
      //   endpoint: mergeapiurl,
      //   description: 'Calling summary subscription with API key x-api-key',
      // });

      // summary subscription rule
      // new events.Rule(this, 'SummarySubscriptionRule', {

      //   eventBus: summaryEventbus,
      //   eventPattern: {
      //     source: ['aws.events.summarization'],
      //   },
      //   targets: [
      //     new targets.ApiDestination(destination, {
      //       deadLetterQueue: dlq,
      //       retryAttempts: 1,
      //       event: events.RuleTargetInput.fromObject({
      //         query:
      //           'mutation updateSummaryJobStatus($summaryjobid:ID,$summary:String,$summaryjobstatus:String,$filename:String){updateSummaryJobStatus(summaryjobid:$summaryjobid,summary:$summary,summaryjobstatus:$summaryjobstatus,filename:$filename){summaryjobid summary summaryjobstatus filename}}',
      //         operationName: 'updateSummaryJobStatus',
      //         variables: {
      //           filename: events.EventField.fromPath('$.detail.filename'),
      //           summary: events.EventField.fromPath('$.detail.summary'),
      //           summaryjobid: events.EventField.fromPath('$.detail.summaryjobid'),
      //           summaryjobstatus: events.EventField.fromPath('$.detail.summaryjobstatus'),
      //         },
      //       }),
      //     }),
      //   ],
      //   enabled: true,
      //   description: 'Summary Subscription Rule',
      // });

      //  NOT REQUIRED
      // const publishStatusMessage = new sfnTask.EventBridgePutEvents(this, 'publish status message', {
      //   entries: [
      //     {
      //       detail: sfn.TaskInput.fromObject({
      //         'summary.$': '$.summary',
      //         'summaryjobstatus.$': '$.summaryjobstatus',
      //         'summaryjobid.$': '$.summaryjobid',
      //         'filename.$': '$.filename',
      //       }),
      //       eventBus: this.eventBridgeBus,
      //       detailType: 'MessageFromStepFunctions',
      //       source: 'step.functions',
      //     },
      //   ],
      // });

      const publishValidationFailureMessage = new sfnTask.EventBridgePutEvents(
        this,
        'publish validation failure message',
        {
          entries: [
            {
              detail: sfn.TaskInput.fromObject({
                'summary.$': '$.summary',
                'summaryjobstatus.$': '$.summaryjobstatus',
                'summaryjobid.$': '$.summaryjobid',
                'filename.$': '$.filename',
              }),
              eventBus: this.eventBridgeBus,
              detailType: 'MessageFromStepFunctions',
              source: 'step.functions',
            },
          ],
        },
      );

      const jobSuccess= new sfn.Succeed(this, 'succeeded', {
        comment: 'AWS summary Job succeeded',
      });
      const jobFailed= new sfn.Fail(this, 'failed', {
        comment: 'AWS summary Job failed',
      });
      // step function choice steps
      const validateInputChoice = new sfn.Choice(this, 'is Valid Parameters?', {
        outputPath: '$.validation_result.Payload.results',
      });

      const summaryfromCacheChoice = new sfn.Choice(this, 'is Summary in Cache?', {
        outputPath: '$.s3_reader_result.Payload',
      });

      const tokenLimitBurstChoice = new sfn.Choice(this, 'is Token Limit breached?', {
        outputPath: '$',
      });

      // step function, run files in parallel
      const runFilesInparallel = new sfn.Map(this, 'Run Files in Parallel', {
        maxConcurrency: 100,
      }).iterator(
        documentReaderTask.next(
          summaryfromCacheChoice
            .when(
              sfn.Condition.booleanEquals('$.s3_reader_result.Payload.isSummaryAvailable', true),
              jobSuccess,
            )
            .when(
              sfn.Condition.stringEquals('$.s3_reader_result.Payload.summaryjobstatus', 'Error'),
              jobFailed,
            )
            .otherwise(
              tokenLimitBurstChoice
                .when(
                  sfn.Condition.booleanEquals('$.isTokenLimitBreached', true),
                  createChunksAndSummarizeTask.next(jobSuccess),
                )
                .otherwise(generateSummaryTask.next(jobSuccess)),
            ),
        ),
      );

      const summarizationLogGroup = new logs.LogGroup(this, 'summarizationLogGroup', {});

      // step function definition
      const definition = inputValidationTask.next(
        validateInputChoice
          .when(
            sfn.Condition.booleanEquals('$.validation_result.Payload.isValid', false),
            publishValidationFailureMessage,
          )
          .otherwise(runFilesInparallel),
      );

      // step function

      const summarizationStepFunction = new sfn.StateMachine(this, 'summarizationStepFunction', {
        definition,
        timeout: cdk.Duration.minutes(15),
        logs: {
          destination: summarizationLogGroup,
          level: sfn.LogLevel.ALL,
        },
        tracingEnabled: true,
      });

      // event bridge datasource for summarization api
      const eventBridgeDataSource = summarizationGraphqlApi.addEventBridgeDataSource(
        'eventBridgeDataSource',
        this.eventBridgeBus,
      );

      this.eventBridgeBus.grantPutEventsTo(eventBridgeDataSource.grantPrincipal);

      // add resolver on summary graphql schema
      eventBridgeDataSource.createResolver('generateSummary', {
        typeName: 'Mutation',
        fieldName: 'createSummary',
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          ' { "version": "2018-05-29", "operation": "PutEvents",  "events": [{"source":"summary", } ',
        ),

        responseMappingTemplate: appsync.MappingTemplate.fromString(
          '#if($ctx.error)$utilerror($ctx.error.message, $ctx.error.type, $ctx.result) #end $util.toJson($ctx.result)',
        ),
      });

      new events.Rule(this, 'SummaryMutationRule', {
        description: 'Summary Mutation Rule',
        eventBus: this.eventBridgeBus,
        eventPattern: {
          source: ['summarization'],
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
}
