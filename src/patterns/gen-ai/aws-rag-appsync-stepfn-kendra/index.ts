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
import { Duration, RemovalPolicy } from 'aws-cdk-lib';
import * as appsync from 'aws-cdk-lib/aws-appsync';
import * as cognito from 'aws-cdk-lib/aws-cognito';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { DockerImageFunctionProps } from 'aws-cdk-lib/aws-lambda/lib/image-function';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Bucket, BucketAccessControl, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Stack } from 'aws-cdk-lib/core';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { BaseClass, BaseClassProps, ConstructName } from '../../../common/base-class';
import { createKendraSyncRunTable } from '../../../common/helpers/dynamodb-helper';
import { KendraConstruct } from '../../../common/helpers/kendra-construct';
import {
  createKendraWorkflowStepFunction,
  createStepFunctionsExecutionHandlerRole,
  getKendraStartDataSyncLambdaRole,
  getGeneratePresignedUrlLambdaRole,
  getCheckJobStatusLambdaRole,
  getUpdateKendraJobStatusLambdaRole,
  getStartKendraSyncStepFnRole,
} from '../../../common/helpers/kendra-helper';
import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import { lambdaMemorySizeLimiter } from '../../../common/helpers/utils';
import { AddAwsServiceEndpoint, buildVpc, createDefaultIsolatedVpcProps, ServiceEndpointTypeEnum } from '../../../common/helpers/vpc-helper';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';

/**
 * The properties for the RagAppsyncStepfnKendraProps class.
 */
export interface RagAppsyncStepfnKendraProps {
  existingSecurityGroup: any;
  /**
     * Cognito user pool used for authentication.
     *
     * @default - None
     */
  readonly cognitoUserPool: cognito.UserPool;

  observability: boolean;
  stage: any;
  /**
     *
     *
     * @default - Optional user provided props to override the default props for the Kendra index. Is this required?
     */
  readonly kendraIndexProps?: kendra.CfnIndexProps;
  /**
     * A list of data sources that will provide data to the Kendra index. ?At least 1 must be specified. We will do majority of
     * processing for some data sources (S3 crawler initially), but for others the props must be complete (e.g. proper roleArn, etc.)
     *
     * @default - empty list (no data sources)
     */
  readonly kendraDataSourcesProps: Array<kendra.CfnDataSourceProps | any>;
  /**
     * Optional - index permissions to grant to the Lambda function. One or more of the following
     * may be specified: `Read`, `SubmitFeedback` and `Write`. Default is `["Read", "SubmitFeedback"]`. Read is
     * all the operations IAM defines as Read and List. SubmitFeedback is only the SubmitFeedback action. Write is all the
     * operations IAM defines as Write and Tag. This functionality may be overridden by providing a specific role arn in lambdaFunctionProps
     *
     * @default - ["Read", "SubmitFeedback"]
     */
  readonly indexPermissions?: string[];
  /**
     * Existing instance of a Kendra Index. Providing both this and kendraIndexProps will cause an error.
     *
     * @default - None
     */
  readonly existingKendraIndexObj?: kendra.CfnIndex;
  /**
     * Existing instance of Lambda Function object, providing both this and `lambdaFunctionProps` will cause an error.
     *
     * @default - None
     */
  readonly existingLambdaObj?: lambda.Function;
  /**
     * User provided props to override the default props for the Lambda function.
     *
     * @default - Default properties are used.
     */
  readonly lambdaFunctionProps?: lambda.FunctionProps;
  /**
     * An existing VPC for the construct to use (construct will NOT create a new VPC in this case)
     */
  readonly existingVpc?: ec2.IVpc;
  /**
     * Properties to override default properties if deployVpc is true
     */
  readonly vpcProps?: ec2.VpcProps;
  /**
     * Whether to deploy a new VPC
     *
     * @default - false
     */
  readonly deployVpc?: boolean;
  /**
     * Optional Name for the Lambda function environment variable set to the index id for the Kendra index.
     *
     * @default - KENDRA_INDEX_ID
     */
  readonly indexIdEnvironmentVariableName?: string;
  /**
   * Optional. Allows to provide Generate Pre-signed Url custom lambda code
   * and settings instead of the existing
   */
  readonly generatePresignedUrlLambdaProps?: DockerLambdaCustomProps | undefined;
  /**
   * Optional. Allows to provide Kendra Start Data Sync Job custom lambda code
   * and settings instead of the existing
   */
  readonly kendraStartDataSyncLambdaProps?: DockerLambdaCustomProps | undefined;
  /**
   * Optional. Allows to provide Check Sync Job Status custom lambda code
   * and settings instead of the existing
   */
  readonly checkJobsStatusLambdaProps?: DockerLambdaCustomProps | undefined;
  /**
   * Optional. Allows to provide Update Kndra Sync Job Status custom lambda code
   * and settings instead of the existing
   */
  readonly updateKendraJobStatusLambdaProps?: DockerLambdaCustomProps | undefined;
}

/**
 * @summary The RagAppsyncStepfnKendra class.
 */
export class RagAppsyncStepfnKendra extends BaseClass {
  public readonly vpc?: ec2.IVpc;
  public readonly kendraIndex: KendraConstruct;
  public readonly kendraInputBucket: Bucket;

  public readonly graphqlApi: appsync.IGraphqlApi;
  private readonly kendraIndexId: string;
  private readonly awsRegion: string;
  private readonly awsAccountId: string;
  lambdaTracing: lambda.Tracing = lambda.Tracing.ACTIVE;
  kendraInputBucketArn: string;
  public readonly securityGroup: ec2.ISecurityGroup;

  /**
     * Returns an instance of appsync.IGraphqlApi created by the construct
     */
  docProcessingStateMachine: StateMachine;
  stepFunctionsExecutionHandlerRole: cdk.aws_iam.Role;
  removalPolicy: RemovalPolicy;
  syncRunTable: Table;
  //   TODO(miketran): Right now, we support S3, then eventually will open it up to other data sources.
  private kendraDataSourceIndexId: string;
  private stack: Stack;
  cognito: cognito.UserPool;


  /**
     * @summary Constructs a new instance of the RagAppsyncStepfnKendra class.
     * @param {cdk.App} scope - represents the scope for all the resources.
     * @param {string} id - this is a scope-unique id.
     * @param {RagAppsyncStepfnKendraProps} props - user provided props for the construct.
     * @since 0.0.0
     * @access public
   */
  constructor(scope: Construct, id: string, props: RagAppsyncStepfnKendraProps) {
    super(scope, id);

    const baseProps: BaseClassProps = {
      stage: props.stage,
      constructName: ConstructName.AWSRAGAPPSYNCSTEPFNKENDRA,
      constructId: id,
      observability: props.observability,
    };

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    this.cognito = props.cognitoUserPool;

    this.awsAccountId = cdk.Stack.of(this).account;
    this.awsRegion = cdk.Stack.of(this).region;
    this.stack = cdk.Stack.of(this);
    this.removalPolicy = cdk.RemovalPolicy.DESTROY;

    // Staging environment
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }

    if (props?.existingVpc) {
      this.vpc = props.existingVpc;
    } else {
      this.vpc = new ec2.Vpc(this, 'Vpc', props.vpcProps);
    }

    if (props?.existingSecurityGroup) {
      this.securityGroup = props.existingSecurityGroup;
    } else {
      this.securityGroup = new ec2.SecurityGroup(this, 'securityGroup', {
        vpc: this.vpc,
        allowAllOutbound: true,
        securityGroupName: 'securityGroup' + stage,
      });
    }

    let enableXRay = true;
    let apiLogConfig = {
      fieldLogLevel: appsync.FieldLogLevel.ALL,
      retention: logs.RetentionDays.TEN_YEARS,
    };

    if (props.observability === false) {
      enableXRay = false;
      apiLogConfig = {
        fieldLogLevel: appsync.FieldLogLevel.NONE,
        retention: logs.RetentionDays.TEN_YEARS,
      };
    }

    if (props.kendraIndexProps && props.existingKendraIndexObj) {
      throw new Error('You may not provide both kendraIndexProps and existingKendraIndexObj');
    }

    if (props.kendraIndexProps && props.kendraDataSourcesProps) {
      throw new Error('You may not provide both kendraDataSourcesProps and existingKendraIndexObj');
    }

    if (props.deployVpc || props.existingVpc) {
      this.vpc = buildVpc(scope, {
        defaultVpcProps: createDefaultIsolatedVpcProps(),
        existingVpc: props.existingVpc,
        userVpcProps: props.vpcProps,
        constructVpcProps: {
          enableDnsHostnames: true,
          enableDnsSupport: true,
        },
        vpcName: 'ragAppSyncStepfnKendraVpc',
      });

      AddAwsServiceEndpoint(scope, this.vpc, [ServiceEndpointTypeEnum.KENDRA]);
    }
    this.kendraInputBucket = new Bucket(this, 'kendraInputBucket', {
      accessControl: BucketAccessControl.PRIVATE,
      enforceSSL: true,
      eventBridgeEnabled: true,
    });

    this.cognito = props.cognitoUserPool;


    this.kendraIndex = new KendraConstruct(this, 'llmDemoIndex', {
      IndexName: 'llmDemoKendraIndex',
      Edition: 'DEVELOPER_EDITION',
      kendraDataSyncInputBucketName: this.kendraInputBucket.bucketName,
      CognitoUserPoolId: this.cognito.userPoolId,
    });

    this.kendraIndexId = this.kendraIndex.KendraIndexId;
    this.kendraDataSourceIndexId = this.kendraIndex.KendraDataSourceIndexId;

    this.kendraInputBucketArn = this.kendraInputBucket.bucketArn;

    this.kendraInputBucket.addCorsRule({
      allowedOrigins: ['*'],
      allowedMethods: [HttpMethods.GET, HttpMethods.PUT, HttpMethods.POST, HttpMethods.DELETE, HttpMethods.HEAD],
      allowedHeaders: ['*'],
      exposedHeaders: ['ETag'], // For Storage Put with Object size > 5MB
      maxAge: 3000,
    });

    const kendraACL = [
      {
        keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/BusinessTeam1/`,
        aclEntries: [
          {
            Name: 'BusinessTeam1',
            Type: 'GROUP',
            Access: 'ALLOW',
          },
          {
            Name: 'Admin',
            Type: 'GROUP',
            Access: 'ALLOW',
          },
        ],
      },
      {
        keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/BusinessTeam2/`,
        aclEntries: [
          {
            Name: 'BusinessTeam2',
            Type: 'GROUP',
            Access: 'ALLOW',
          },
          {
            Name: 'Admin',
            Type: 'GROUP',
            Access: 'ALLOW',
          },
        ],
      },
      {
        keyPrefix: `s3://${this.kendraInputBucket.bucketName}/public/AdminsOnly/`,
        aclEntries: [
          {
            Name: 'Admin',
            Type: 'GROUP',
            Access: 'ALLOW',
          },
        ],
      },
    ];

    const kendraAclUploader = new AwsCustomResource(this, 'kendraAclUploader', {
      onUpdate: {
        action: 'putObject',
        parameters: {
          Body: JSON.stringify(kendraACL),
          Bucket: this.kendraInputBucket.bucketName,
          CacheControl: 'max-age=0, no-cache, no-store, must-revalidate',
          ContentType: 'application/json',
          Key: 'kendra_acl.json',
        },
        physicalResourceId: PhysicalResourceId.of('kendra_acl'),
        service: 'S3',
      },
      policy: AwsCustomResourcePolicy.fromStatements([
        new PolicyStatement({
          actions: ['s3:PutObject'],
          resources: [this.kendraInputBucket.arnForObjects('kendra_acl.json')],
        }),
      ]),
    });

    this.kendraIndex.node.addDependency(kendraAclUploader);


    new cdk.CfnOutput(this, 'KendraAccessControlListUrl', {
      value: `s3://${this.kendraInputBucket.bucketName}/kendra_acl.json`,
    });

    // TODO(miketran): Fix this schema.
    const ingestionGraphqlApi = new appsync.GraphqlApi(
      this,
      'ingestionGraphqlApi',
      {
        name: 'ingestionGraphqlApi' + stage,
        definition: appsync.Definition.fromFile(
          path.join(__dirname, '../../../../resources/gen-ai/aws-rag-appsync-stepfn-kendra/schema.graphql'),
        ),
        authorizationConfig: {
          defaultAuthorization: {
            authorizationType: appsync.AuthorizationType.USER_POOL,
            userPoolConfig: { userPool: this.cognito },
          },
          additionalAuthorizationModes: [
            {
              authorizationType: appsync.AuthorizationType.IAM,
            },
          ],
        },
        xrayEnabled: enableXRay,
        logConfig: apiLogConfig,
      },
    );
    this.graphqlApi = ingestionGraphqlApi;
    this.syncRunTable = createKendraSyncRunTable(this);

    const lambdaPropsEnv = {
      KENDRA_INDEX_ID: this.kendraIndexId,
      KENDRA_DATA_SOURCE_INDEX_ID: this.kendraDataSourceIndexId,
      DOCUMENTS_TABLE: this.syncRunTable.tableName,
      S3_BUCKET_NAME: this.kendraInputBucket.bucketName,
    };

    const generatePresignedUrlRole = getGeneratePresignedUrlLambdaRole(this, this.kendraInputBucket);
    const constructGeneratePresignedUrlLambdaProps = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/generate_presigned_url/src')),
      functionName: 's3_pre_signed_links_generator_docker' + stage,
      description: 'Lambda function for pre-signed links generation',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769),
      timeout: Duration.minutes(15),
      role: generatePresignedUrlRole,
      environment: lambdaPropsEnv,
    };
    const generatePresignedUrlLambda = buildDockerLambdaFunction(
      this,
      'generatePresignedUrlFN',
      constructGeneratePresignedUrlLambdaProps,
      props.generatePresignedUrlLambdaProps,
    );

    const startDataSyncRole = getKendraStartDataSyncLambdaRole(
      this, this.syncRunTable, this.awsRegion, this.awsAccountId, this.kendraIndexId, this.kendraDataSourceIndexId,
    );
    const constructStartDataSyncJobLambdaProps = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_sync/src')),
      functionName: 'kendra_start_sync_job_docker' + stage,
      description: 'Lambda function for Kendra  sync job starting',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769),
      timeout: Duration.minutes(15),
      role: startDataSyncRole,
      environment: lambdaPropsEnv,
    };
    const kendraSyncLambda = buildDockerLambdaFunction(
      this,
      'kendraStartDataSync',
      constructStartDataSyncJobLambdaProps,
      props.kendraStartDataSyncLambdaProps,
    );

    const checkJobStatusLambdaRole = getCheckJobStatusLambdaRole(
      this, this.awsRegion, this.awsAccountId, this.kendraIndexId, this.kendraDataSourceIndexId,
    );
    const constructCheckJobStatusLambdaProps: DockerImageFunctionProps = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_sync_status/src')),
      functionName: 'kendra_check_sync_job_status_docker' + stage,
      description: 'Lambda function for getting kendra sync status',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769),
      timeout: Duration.minutes(15),
      environment: lambdaPropsEnv,
      role: checkJobStatusLambdaRole,
    };

    const createCheckJobsStatusLambda = buildDockerLambdaFunction(
      this,
      'checkJobStatusFN',
      constructCheckJobStatusLambdaProps,
      props.checkJobsStatusLambdaProps,
    );

    const updateKendraJobStatusLambdaRole = getUpdateKendraJobStatusLambdaRole(this, this.syncRunTable);
    const constructKendraJobStatusLambdaProps = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_job_manager/src')),
      functionName: 'kendra_job_manager_docker' + stage,
      description: 'Lambda function for Kendra job status updates',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769),
      timeout: Duration.minutes(15),
      role: updateKendraJobStatusLambdaRole,
      environment: lambdaPropsEnv,
    };
    const updateKendraJobStatusLambda = buildDockerLambdaFunction(
      this,
      'updateKendraJobStatusFn',
      constructKendraJobStatusLambdaProps,
      props.updateKendraJobStatusLambdaProps,
    );

    this.docProcessingStateMachine = createKendraWorkflowStepFunction(
      this.stack,
      updateKendraJobStatusLambda,
      kendraSyncLambda,
      createCheckJobsStatusLambda,
    );

    this.stepFunctionsExecutionHandlerRole = createStepFunctionsExecutionHandlerRole(
      this.stack,
      this.docProcessingStateMachine,
    );

    const startKendraSyncStepFnRole = getStartKendraSyncStepFnRole(this, this.docProcessingStateMachine);
    const constructStartKendraSyncStepFnLambdaProps = {
      code: lambda.DockerImageCode.fromImageAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/start_kendra_sync_stepfn/src')),
      functionName: 'start_kndra_sync_step_fn' + stage,
      description: 'Lambda for starting execution',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769),
      timeout: Duration.minutes(15),
      role: startKendraSyncStepFnRole,
      environment: {
        ...lambdaPropsEnv,
        STEP_FUNCTION_ARN: this.docProcessingStateMachine.stateMachineArn,
      },
    };

    const startKendraStepFnLambda = buildDockerLambdaFunction(
      this,
      'startKendraStepFnLambda',
      constructStartKendraSyncStepFnLambdaProps,
      undefined,
    );

    const presignedUrlDataSource = ingestionGraphqlApi.addLambdaDataSource(
      'presignedUrlDataSource',
      generatePresignedUrlLambda,
    );

    presignedUrlDataSource.createResolver('presignedUrlResolver', {
      typeName: 'Mutation',
      fieldName: 'generatePresignedUrl',
    });

    const kendraSyncLambdaDataSource = ingestionGraphqlApi.addLambdaDataSource(
      'kendraSyncLambdaDataSource',
      startKendraStepFnLambda,
    );
    kendraSyncLambdaDataSource.createResolver('kendraSyncLambdaResolver',
      {
        typeName: 'Mutation',
        fieldName: 'startKendraSyncJob',
        requestMappingTemplate: appsync.MappingTemplate.fromString(`
    {
      "version": "2017-02-28",
      "operation": "Invoke",
      "payload": {}
    }
  `),
        responseMappingTemplate: appsync.MappingTemplate.fromString(`
    $util.toJson($context.result)
  `),
      });

  }
}


