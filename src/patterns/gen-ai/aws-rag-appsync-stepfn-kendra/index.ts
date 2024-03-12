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
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import { Bucket, BucketAccessControl, HttpMethods } from 'aws-cdk-lib/aws-s3';
import { StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Stack } from 'aws-cdk-lib/core';
import { AwsCustomResource, AwsCustomResourcePolicy, PhysicalResourceId } from 'aws-cdk-lib/custom-resources';
import { Construct } from 'constructs';
import { KendraConstruct } from '../../../common/helpers/kendra-construct';
import {
  AddAwsServiceEndpoint,
  createCheckJobsStatusFn,
  createKendraStartDataSync,
  createKendraWorkflowStepFunction,
  createStepFunctionsExecutionHandlerRole,
  createSyncRunTable, createUpdateKendraJobStatusFn, createDefaultIsolatedVpcProps, ServiceEndpointTypes,
} from '../../../common/helpers/kendra-helper';
import { buildVpc } from '../../../common/helpers/vpc-helper';


/**
 * The properties for the RagAppsyncStepfnKendraProps class.
 */
export interface RagAppsyncStepfnKendraProps {
  /**
     * Cognito user pool used for authentication.
     *
     * @default - None
     */
  readonly cognitoUserPool: cognito.IUserPool;

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
}

/**
 * @summary The RagAppsyncStepfnKendra class.
 */
export class RagAppsyncStepfnKendra extends Construct {
  public readonly vpc?: ec2.IVpc;
  public readonly kendraIndex: KendraConstruct;
  public readonly kendraInputBucket: Bucket;

  public readonly graphqlApi: appsync.IGraphqlApi;
  private readonly kendraIndexId: string;
  private readonly awsRegion: string;
  private readonly awsAccountId: string;
  kendraInputBucketArn: string;

  /**
     * Returns an instance of appsync.IGraphqlApi created by the construct
     */
  // @ts-ignore
  docProcessingStateMachine: StateMachine;
  // @ts-ignore
  stepFunctionsExecutionHandlerRole: cdk.aws_iam.Role;
  // @ts-ignore
  syncRunTable: Table;
  //   TODO(miketran): Right now, we support S3, then eventually will open it up to other data sources.
  private kendraDataSourceIndexId: string;
  private stack: Stack;
  cognito: any;


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
    this.awsAccountId = cdk.Stack.of(this).account;
    this.awsRegion = cdk.Stack.of(this).region;
    this.stack = cdk.Stack.of(this);

    // Staging environment
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
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
      });

      AddAwsServiceEndpoint(scope, this.vpc, ServiceEndpointTypes.KENDRA);
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
      CognitoUserPoolId: this.cognito.userPool.userPoolId,
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
            userPoolConfig: { userPool: props.cognitoUserPool },
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
    this.syncRunTable = createSyncRunTable(this);

    const kendraSyncLambda = createKendraStartDataSync(
      this.stack,
      this.syncRunTable,
      this.awsRegion,
      this.awsAccountId,
      this.kendraIndexId,
      this.kendraDataSourceIndexId,
    );
    const createCheckJobsStatusLambda: cdk.aws_lambda.Function = createCheckJobsStatusFn(
      this.stack,
      this.awsRegion,
      this.awsAccountId,
      this.kendraIndexId,
      this.kendraDataSourceIndexId,
      this.syncRunTable,
    );

    const updateKendraJobStatusLambda: cdk.aws_lambda.Function = createUpdateKendraJobStatusFn(
      this.stack,
      this.syncRunTable,
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

  }
}


