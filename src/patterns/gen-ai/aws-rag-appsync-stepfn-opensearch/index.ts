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
import { Duration, Aws } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as opensearchservice from 'aws-cdk-lib/aws-opensearchservice';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';
import * as stepfn from 'aws-cdk-lib/aws-stepfunctions';
import * as stepfn_task from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { Construct } from 'constructs';
import * as s3_bucket_helper from '../../../common/helpers/s3-bucket-helper';
import * as vpc_helper from '../../../common/helpers/vpc-helper';

/**
 * The properties for the RagAppsyncStepfnOpensearch class.
 */
export interface RagAppsyncStepfnOpensearchProps {
  /**
   * Optional custom properties for a VPC the construct will create. This VPC will
   * be used by the Lambda functions the construct creates. Providing
   * both this and existingVpc is an error.
   *
   * @default - none
   */
  readonly vpcProps?: ec2.VpcProps;
  /**
   * Optional An existing VPC in which to deploy the construct. Providing both this and
   * vpcProps is an error.
   *
   * @default - none
   */
  readonly existingVpc?: ec2.IVpc;
  /**
   * Optional existing security group allowing access to opensearch. Used by the lambda functions
   * built by this construct. If not provided, the construct will create one.
   *
   * @default - none
   */
  readonly existingSecurityGroup?: ec2.ISecurityGroup;
  /**
   * Optional Existing instance of an EventBridge bus. If not provided, the construct will create one.
   *
   * @default - None
   */
  readonly existingIngestionBusInterface?: events.IEventBus;
  /**
   * Existing instance of S3 Bucket object, providing both this and `bucketInputsAssetsProps` will cause an error.
   *
   * @default - None
   */
  readonly existingInputAssetsBucketObj?: s3.IBucket;
  /**
   * Optional user provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingInputAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketInputsAssetsProps?: s3.BucketProps;
  /**
   * Existing instance of S3 Bucket object, providing both this and `bucketProcessedAssetsProps` will cause an error.
   *
   * @default - None
   */
  readonly existingProcessedAssetsBucketObj?: s3.IBucket;
  /**
   * Optional user provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingProcessedAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly bucketProcessedAssetsProps?: s3.BucketProps;
  /**
     * Existing Amazon OpenSearch Service domain.
     *
     * @default - None
     */
  readonly existingOpensearchDomain: opensearchservice.IDomain;
  /**
   * Index name for the OpenSearch Service.
   *
   * @default - None
   */
  readonly openSearchIndexName: string;
  /**
     * Optional. SecretsManager secret to authenticate against the OpenSearch Service domain if
     * domain is configured with Username/Password.
     *
     * @default - None
     */
  readonly openSearchSecret?: secret.ISecret;
  /**
   * Existing merged Appsync GraphQL api.
   *
   * @default - None
   */
  readonly existingMergedApi?: appsync.CfnGraphQLApi;
  /**
   * Cognito user pool used for authentication.
   *
   * @default - None
   */
  readonly cognitoUserPool: cognito.IUserPool;
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
}

/**
   * @summary The RagApiGatewayOpensearch class.
   */
export class RagAppsyncStepfnOpensearch extends Construct {
  /**
   * Returns the instance of ec2.IVpc used by the construct
   */
  public readonly vpc: ec2.IVpc;
  /**
   * Returns the instance of ec2.ISecurityGroup used by the construct
   */
  public readonly securityGroup: ec2.ISecurityGroup;
  /**
   * Returns the instance of events.IEventBus used by the construct
   */
  public readonly ingestionBus: events.IEventBus;
  /**
   * Returns an instance of s3.IBucket created by the construct
   */
  public readonly s3InputAssetsBucketInterface: s3.IBucket;
  /**
   * Returns an instance of s3.Bucket created by the construct.
   * IMPORTANT: If existingInputAssetsBucketObj was provided in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly s3InputAssetsBucket?: s3.Bucket;
  /**
   * Returns an instance of s3.IBucket created by the construct
   */
  public readonly s3ProcessedAssetsBucketInterface: s3.IBucket;
  /**
   * Returns an instance of s3.Bucket created by the construct.
   * IMPORTANT: If existingProcessedAssetsBucketObj was provided in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly s3ProcessedAssetsBucket?: s3.Bucket;
  /**
   * Returns an instance of appsync.IGraphqlApi created by the construct
   */
  public readonly graphqlApi: appsync.IGraphqlApi;
  /**
   * Returns an instance of stepfn.StateMachine created by the construct
   */
  public readonly stateMachine: stepfn.StateMachine;

  /**
     * @summary Constructs a new instance of the RagAppsyncStepfnOpensearch class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a a scope-unique id.
     * @param {RagAppsyncStepfnOpensearchProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
     */
  constructor(scope: Construct, id: string, props: RagAppsyncStepfnOpensearchProps) {
    super(scope, id);

    // stage
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }

    vpc_helper.CheckVpcProps(props);
    s3_bucket_helper.CheckS3Props({
      existingBucketObj: props.existingInputAssetsBucketObj,
      bucketProps: props.bucketInputsAssetsProps,
    });
    s3_bucket_helper.CheckS3Props({
      existingBucketObj: props.existingProcessedAssetsBucketObj,
      bucketProps: props.bucketProcessedAssetsProps,
    });

    // This helper will take care of the props combination
    //this.vpc = vpc_helper.buildVpc(this, {defaultVpcProps: {}, userVpcProps: props.vpcProps});

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
          securityGroupName: 'securityGroup'+stage,
        },
      );
    }

    // Bucket containing the inputs assets (documents - multiple modalities) uploaded by the user
    let inputAssetsBucket: s3.IBucket;

    if (!props.existingInputAssetsBucketObj) {
      let tmpBucket: s3.Bucket;
      if (!props.bucketInputsAssetsProps) {
        tmpBucket = new s3.Bucket(this, 'inputAssetsBucket'+stage,
          {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            bucketName: 'input-assets-bucket'+stage+'-'+Aws.ACCOUNT_ID,
          });
      } else {
        tmpBucket = new s3.Bucket(this, 'InputAssetsBucket'+stage, props.bucketInputsAssetsProps);
      }
      inputAssetsBucket = tmpBucket;
      this.s3InputAssetsBucket = tmpBucket;
    } else {
      inputAssetsBucket = props.existingInputAssetsBucketObj;
    }

    // this is the one we manipulate, we know it exists
    this.s3InputAssetsBucketInterface = inputAssetsBucket;

    // Bucket containing the processed assets (documents - text format) uploaded by the user
    let processedAssetsBucket: s3.IBucket;

    if (!props.existingProcessedAssetsBucketObj) {
      let tmpBucket: s3.Bucket;
      if (!props.bucketInputsAssetsProps) {
        tmpBucket = new s3.Bucket(this, 'processedAssetsBucket'+stage,
          {
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            encryption: s3.BucketEncryption.S3_MANAGED,
            bucketName: 'processed-assets-bucket'+stage+'-'+Aws.ACCOUNT_ID,
          });
      } else {
        tmpBucket = new s3.Bucket(this, 'processedAssetsBucket'+stage, props.bucketProcessedAssetsProps);
      }
      processedAssetsBucket = tmpBucket;
      this.s3ProcessedAssetsBucket = tmpBucket;
    } else {
      processedAssetsBucket = props.existingProcessedAssetsBucketObj;
    }

    // this is the one we manipulate, we know it exists
    this.s3ProcessedAssetsBucketInterface = processedAssetsBucket;

    // GraphQL API
    const ingestion_graphql_api = new appsync.GraphqlApi(
      this,
      'ingestionGraphqlApi',
      {
        name: 'ingestionGraphqlApi'+stage,
        schema: appsync.SchemaFile.fromAsset(path.join(__dirname, '../../../../resources/gen-ai/aws-rag-appsync-stepfn-opensearch/schema.graphql')),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: { userPool: props.cognitoUserPool },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: appsync.AuthorizationType.IAM,
            },
          ],
        },
        xrayEnabled: true,
        logConfig: {
          fieldLogLevel: appsync.FieldLogLevel.ALL,
          retention: logs.RetentionDays.ONE_YEAR,
        },
      },
    );

    this.graphqlApi=ingestion_graphql_api;

    // If the user provides a mergedApi endpoint, the lambda
    // functions will use this endpoint to send their status updates
    const updateGraphQlApiEndpoint = !props.existingMergedApi ? ingestion_graphql_api.graphqlUrl : props.existingMergedApi.attrGraphQlUrl;
    const updateGraphQlApiId = !props.existingMergedApi ? ingestion_graphql_api.apiId : props.existingMergedApi.attrApiId;

    const job_status_data_source = new appsync.NoneDataSource(
      this,
      'NoneDataSourceIngestion',
      {
        api: this.graphqlApi,
        name: 'JobStatusDataSource',
      },
    );

    job_status_data_source.createResolver(
      'updateIngestionJobStatusResolver',
      {
        fieldName: 'updateIngestionJobStatus',
        typeName: 'Mutation',
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          `
                    {
                        "version": "2017-02-28",
                        "payload": $util.toJson($context.args)
                    }
                    `,
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromString('$util.toJson($context.result)'),
      },

    );

    if (!props.existingIngestionBusInterface) {
      this.ingestionBus = new events.EventBus(this, 'ingestionEventBus'+stage,
        {
          eventBusName: 'ingestionEventBus'+stage,
        },
      );
    } else {
      this.ingestionBus = props.existingIngestionBusInterface;
    }

    // create httpdatasource with ingestion_graphql_api
    const event_bridge_datasource = this.graphqlApi.addEventBridgeDataSource(
      'ingestionEventBridgeDataSource'+stage,
      this.ingestionBus,
      {
        name: 'ingestionEventBridgeDataSource'+stage,
      },
    );

    // Lambda function used to validate inputs in the step function
    const validate_input_function = new lambda.DockerImageFunction(
      this,
      'lambda_function_validation_input'+stage,
      {
        code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/input_validation/src')),
        functionName: 'ingestion_input_validation_docker'+stage,
        description: 'Lambda function for validating input files formats',
        vpc: this.vpc,
        tracing: lambda.Tracing.ACTIVE,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 4,
        timeout: Duration.minutes(15),
        environment: {
          GRAPHQL_URL: updateGraphQlApiEndpoint,
        },
      },
    );

    // Add GraphQl permissions to the IAM role for the Lambda function
    validate_input_function.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'appsync:GraphQL',
      ],
      resources: [
        'arn:aws:appsync:'+ Aws.REGION+':'+Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*',
      ],
    }));

    const s3_transformer_job_function = new lambda.DockerImageFunction(
      this,
      'lambda_function_s3_file_transformer'+stage,
      {
        code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/s3_file_transformer/src')),
        functionName: 's3_file_transformer_docker'+stage,
        description: 'Lambda function for converting files from their input format to text',
        vpc: this.vpc,
        tracing: lambda.Tracing.ACTIVE,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 4,
        timeout: Duration.minutes(15),
        environment: {
          INPUT_BUCKET: this.s3InputAssetsBucketInterface.bucketName,
          OUTPUT_BUCKET: this.s3ProcessedAssetsBucketInterface.bucketName,
          GRAPHQL_URL: updateGraphQlApiEndpoint,
        },
      },
    );

    // The lambda will pull documents from the input bucket, transform them, and upload
    // the artifacts to the processed bucket
    // we don't use grant read here since it has no effect in case of existing buckets provided by the user
    s3_transformer_job_function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          's3:GetObject',
          's3:GetObject*',
          's3:GetBucket*',
          's3:List*',
        ],
        resources: [
          'arn:aws:s3:::' + this.s3InputAssetsBucketInterface?.bucketName,
          'arn:aws:s3:::' + this.s3InputAssetsBucketInterface?.bucketName + '/*',
        ],
      }),
    );

    s3_transformer_job_function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:PutObjectRetention',
          's3:List*',
          's3:GetBucket*',
          's3:Abort*',
          's3:DeleteObject*',
          's3:PutObjectLegalHold',
          's3:PutObjectTagging',
          's3:PutObjectVersionTagging',
          's3:PutObject',
          's3:GetObject*'],
        resources: [
          'arn:aws:s3:::' + this.s3ProcessedAssetsBucketInterface?.bucketName,
          'arn:aws:s3:::' + this.s3ProcessedAssetsBucketInterface?.bucketName + '/*',
        ],
      }),
    );

    // Add GraphQl permissions to the IAM role for the Lambda function
    s3_transformer_job_function.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'appsync:GraphQL',
      ],
      resources: [
        'arn:aws:appsync:'+ Aws.REGION+':'+Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*',
      ],
    }));

    let SecretId = 'None';
    if (props.openSearchSecret) {SecretId = props.openSearchSecret.secretName;}

    // Lambda function performing the embedding job
    const embeddings_job_function = new lambda.DockerImageFunction(
      this,
      'lambda_function_embeddings_job'+stage,
      {
        code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/embeddings_job/src')),
        functionName: 'embeddings_job_docker'+stage,
        description: 'Lambda function for creating documents chunks, embeddings and storing them in Amazon Opensearch',
        vpc: this.vpc,
        tracing: lambda.Tracing.ACTIVE,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 4,
        timeout: Duration.minutes(15),
        environment: {
          OUTPUT_BUCKET: this.s3ProcessedAssetsBucketInterface.bucketName,
          GRAPHQL_URL: updateGraphQlApiEndpoint,
          OPENSEARCH_INDEX: props.openSearchIndexName,
          OPENSEARCH_DOMAIN_ENDPOINT: props.existingOpensearchDomain.domainEndpoint,
          OPENSEARCH_SECRET_ID: SecretId,
        },
      },
    );

    // The lambda will access the opensearch credentials
    if (props.openSearchSecret) {props.openSearchSecret.grantRead(embeddings_job_function);}

    embeddings_job_function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          's3:GetObject',
          's3:GetObject*',
          's3:GetBucket*',
          's3:List*',
        ],
        resources: [
          'arn:aws:s3:::' + this.s3ProcessedAssetsBucketInterface?.bucketName,
          'arn:aws:s3:::' + this.s3ProcessedAssetsBucketInterface?.bucketName + '/*',
        ],
      }),
    );

    embeddings_job_function.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['es:*'],
      resources: [
        'arn:aws:es:'+Aws.REGION+':'+Aws.ACCOUNT_ID+':domain/'+props.existingOpensearchDomain.domainName+'/*',
        'arn:aws:es:'+Aws.REGION+':'+Aws.ACCOUNT_ID+':domain/'+props.existingOpensearchDomain.domainName,
      ],
    }));

    // Add Amazon Bedrock permissions to the IAM role for the Lambda function
    embeddings_job_function.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: ['bedrock:*'],
      resources: [
        '*',
      ],
    }));

    // Add GraphQl permissions to the IAM role for the Lambda function
    embeddings_job_function.addToRolePolicy(new iam.PolicyStatement({
      effect: iam.Effect.ALLOW,
      actions: [
        'appsync:GraphQL',
      ],
      resources: [
        'arn:aws:appsync:'+ Aws.REGION+':'+Aws.ACCOUNT_ID+':apis/'+updateGraphQlApiId+'/*',
      ],
    }));

    // Step function definition
    const inputValidationTask = new stepfn_task.LambdaInvoke(
      this,
      'Validate Ingestion Input',
      {
        lambdaFunction: validate_input_function,
        resultPath: '$.validation_result',
      },
    );

    const fileTransformationTask = new stepfn_task.LambdaInvoke(
      this,
      'Download and transform document to raw text',
      {
        lambdaFunction: s3_transformer_job_function,
        resultPath: '$.s3_transformer_result',
      },
    );

    const embeddingsTask = new stepfn_task.LambdaInvoke(
      this,
      'Generate embeddings from processed documents and store them',
      {
        lambdaFunction: embeddings_job_function,
        resultPath: '$.Payload',
      },
    );

    const validate_input_choice = new stepfn.Choice(
      this,
      'Is Valid Ingestion Parameters?',
      {
        outputPath: '$.validation_result.Payload.files',
      },
    );

    const run_files_in_parallel = new stepfn.Map(
      this,
      'Map State',
      {
        maxConcurrency: 100,
      },
    ).iterator(fileTransformationTask);

    const jobFailed = new stepfn.Fail(this, 'Job Failed', {
      cause: 'Validation job failed',
      error: 'DescribeJob returned FAILED',
    });

    const definition = inputValidationTask.next(validate_input_choice.when(
      stepfn.Condition.booleanEquals('$.validation_result.Payload.isValid', false), jobFailed).otherwise(run_files_in_parallel.next(embeddingsTask)));

    const ingestion_step_function = new stepfn.StateMachine(
      this,
      'IngestionStateMachine',
      {
        stateMachineName: 'IngestionStateMachine'+stage,
        definitionBody: stepfn.DefinitionBody.fromChainable(definition),
        timeout: Duration.minutes(30),
        logs: {
          destination: new logs.LogGroup(this, 'ingestionStepFunctionLogGroup'),
          level: stepfn.LogLevel.ALL,
        },
        tracingEnabled: true,
      },
    );

    this.stateMachine=ingestion_step_function;

    this.ingestionBus.grantPutEventsTo(event_bridge_datasource.grantPrincipal);

    event_bridge_datasource.createResolver(
      'ingestDocumentResolver',
      {
        fieldName: 'ingestDocuments',
        typeName: 'Mutation',
        requestMappingTemplate: appsync.MappingTemplate.fromString(
          `
                    {
                        "version": "2018-05-29",
                        "operation": "PutEvents",
                        "events": [{
                            "source": "ingestion",
                            "detail": $util.toJson($context.arguments),
                            "detailType": "genAIdemo"
                        }
                        ]
                    } 
                    `,
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromString(
          `
                    #if($ctx.error)
                        $util.error($ctx.error.message, $ctx.error.type, $ctx.result)
                    #end
                        $util.toJson($ctx.result)
                    `,
        ),
      },
    );

    const rule = new events.Rule(
      this,
      'ingestionRule'+stage,
      {
        description: 'Rule to trigger ingestion function',
        eventBus: this.ingestionBus,
        eventPattern: {
          source: ['ingestion'],
        },
      },
    );

    rule.addTarget(new targets.SfnStateMachine(this.stateMachine));

  }
}