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
import * as s3 from 'aws-cdk-lib/aws-s3';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { BaseClass, BaseClassProps, ConstructName } from '../../../common/base-class';
import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import * as s3_bucket_helper from '../../../common/helpers/s3-bucket-helper';
import { lambdaMemorySizeLimiter } from '../../../common/helpers/utils';
import * as vpc_helper from '../../../common/helpers/vpc-helper';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';

/**
 * The properties for the ContentGenerationAppSyncLambdaProps class.
 */
export interface ContentGenerationAppSyncLambdaProps {
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
  readonly existingBusInterface?: events.IEventBus;
  /**
   * Existing instance of S3 Bucket object, providing both this and `generatedAssetsBucketProps` will cause an error.
   *
   * @default - None
   */
  readonly existingGeneratedAssetsBucketObj?: s3.IBucket;
  /**
   * Optional user provided props to override the default props for the S3 Bucket.
   * Providing both this and `existingGeneratedAssetsBucketObj` will cause an error.
   *
   * @default - Default props are used
   */
  readonly generatedAssetsBucketProps?: s3.BucketProps;
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
   * used. Best practive to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;
  /**
   * Optional. Allows a user to configure
   * Lambda provisioned concurrency for consistent performance
   */
  readonly lambdaProvisionedConcurrency?: number | undefined;
  /**
   * Optional. Allows to provide custom lambda code
   * and settings instead of the existing
   */
  readonly customDockerLambdaProps?: DockerLambdaCustomProps | undefined;
}

/**
 * The ContentGenerationAppSyncLambda class.
 */
export class ContentGenerationAppSyncLambda extends BaseClass {
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
  public readonly generatedImageBus: events.IEventBus;
  /**
   * Returns an instance of s3.IBucket created by the construct
   */
  public readonly s3GenerateAssetsBucketInterface: s3.IBucket;
  /**
   * Returns an instance of s3.Bucket created by the construct.
   * IMPORTANT: If existingGeneratedAssetsBucketObj was provided in Pattern Construct Props,
   * this property will be undefined
   */
  public readonly s3GenerateAssetsBucket?: s3.Bucket;
  /**
   * Returns an instance of appsync.GraphqlApi created by the construct
   */
  public readonly graphqlApi: appsync.GraphqlApi;
  /**
   * Returns an instance of appsync.GraphqlApi created by the construct
   */
  public readonly cgLambdaFunction: lambda.DockerImageFunction;

  /**
   * Constructs a new instance of the ContentGenerationAppSyncLambda class.
   * @param {cdk.App} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {ContentGenerationAppSyncLambdaProps} props - user provided props for the construct.
   * @since 0.0.0
   * @public
   */
  constructor(scope: Construct, id: string, props: ContentGenerationAppSyncLambdaProps) {
    super(scope, id);

    const baseProps: BaseClassProps = {
      stage: props.stage,
      constructName: ConstructName.AWSCONTENTGENAPPSYNCLAMBDA,
      constructId: id,
      observability: props.observability,
    };

    this.updateEnvSuffix(baseProps);
    this.addObservabilityToConstruct(baseProps);

    vpc_helper.CheckVpcProps(props);
    s3_bucket_helper.CheckS3Props({
      existingBucketObj: props.existingGeneratedAssetsBucketObj,
      bucketProps: props.generatedAssetsBucketProps,
    });

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
        securityGroupName: 'securityGroup' + this.stage,
      });
    }

    // vpc flowloggroup
    const logGroup = new logs.LogGroup(this, 'generateImageConstructLogGroup');
    const role = new iam.Role(this, 'generateImageConstructRole', {
      assumedBy: new iam.ServicePrincipal('vpc-flow-logs.amazonaws.com'),
    });

    // vpc flowlogs
    new ec2.FlowLog(this, 'FlowLog', {
      resourceType: ec2.FlowLogResourceType.fromVpc(this.vpc),
      destination: ec2.FlowLogDestination.toCloudWatchLogs(logGroup, role),
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
            expiration: Duration.days(90),
          },
        ],
      },
    );

    // Bucket containing the inputs assets (documents - text format) uploaded by the user
    let generatedAssetsBucket: s3.IBucket;

    if (!props.existingGeneratedAssetsBucketObj) {
      let tmpBucket: s3.Bucket;
      if (!props.generatedAssetsBucketProps) {
        tmpBucket = new s3.Bucket(this, 'generatedAssetsBucket' + this.stage, {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: 'generated-asset-bucket' + this.stage + '-' + Aws.ACCOUNT_ID,
          serverAccessLogsBucket: serverAccessLogBucket,
          enforceSSL: true,
          versioned: true,
          lifecycleRules: [
            {
              expiration: Duration.days(90),
            },
          ],
        });
      } else {
        tmpBucket = new s3.Bucket(
          this,
          'generatedAssetsBucket' + this.stage,
          props.generatedAssetsBucketProps,
        );
      }
      generatedAssetsBucket = tmpBucket;
      this.s3GenerateAssetsBucket = tmpBucket;
    } else {
      generatedAssetsBucket = props.existingGeneratedAssetsBucketObj;
    }

    // this is the one we manipulate, we know it exists
    this.s3GenerateAssetsBucketInterface = generatedAssetsBucket;

    // GraphQL API
    const generate_image_graphql_api = new appsync.GraphqlApi(
      this,
      'generateImageGraphqlApi',
      {
        name: 'generateImageGraphqlApi' + this.stage,
        definition: appsync.Definition.fromFile(
          path.join(
            __dirname,
            '../../../../resources/gen-ai/aws-contentgen-appsync-lambda/schema.graphql',
          ),
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
        xrayEnabled: this.enablexray,
        logConfig: {
          fieldLogLevel: this.fieldLogLevel,
          retention: this.retention,
        },
      },
    );

    this.graphqlApi = generate_image_graphql_api;
    // If the user provides a mergedApi endpoint, the lambda
    // functions will use this endpoint to send their status updates
    const updateGraphQlApiEndpoint = !props.existingMergedApi
      ? generate_image_graphql_api.graphqlUrl
      : props.existingMergedApi.attrGraphQlUrl;
    const updateGraphQlApiId = !props.existingMergedApi
      ? generate_image_graphql_api.apiId
      : props.existingMergedApi.attrApiId;

    const job_status_data_source = new appsync.NoneDataSource(
      this,
      'NoneDataSourceQuestionAnswering',
      {
        api: this.graphqlApi,
        name: 'JobStatusDataSource',
      },
    );

    job_status_data_source.createResolver('updateGenImageJobStatusResolver', {
      fieldName: 'updateGenerateImageStatus',
      typeName: 'Mutation',
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        `
                          {
                              "version": "2017-02-28",
                              "payload": $util.toJson($context.args)
                          }
                          `,
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromString(
        '$util.toJson($context.result)',
      ),
    });

    if (!props.existingBusInterface) {
      this.generatedImageBus = new events.EventBus(
        this,
        'generateImageEventBus' + this.stage,
        {
          eventBusName: 'generateImageEventBus' + this.stage,
        },
      );
    } else {
      this.generatedImageBus = props.existingBusInterface;
    }

    // create httpdatasource with generate_image_graphql_api
    const event_bridge_datasource = this.graphqlApi.addEventBridgeDataSource(
      'generateImageEventBridgeDataSource' + this.stage,
      this.generatedImageBus,
      {
        name: 'generateImageEventBridgeDataSource' + this.stage,
      },
    );

    // Lambda function used to validate inputs in the step function

    const generate_image_function_role = new iam.Role(
      this,
      'generate_image_function_role',
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
                ],
                resources: [
                  `arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/lambda/*`,
                ],
              }),
            ],
          }),
        },
      },
    );

    // Minimum permissions for a Lambda function to execute while accessing a resource within a VPC
    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
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
      }),
    );
    // Decribe only works if it's allowed on all resources.
    // Reference: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-permissions
    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ec2:DescribeNetworkInterfaces'],
        resources: ['*'],
      }),
    );


    // The lambda will genearte image and upload to s3
    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject', 's3:GetBucket', 's3:ListBucket', 's3:PutObject'],
        resources: [
          'arn:' + Aws.PARTITION + ':s3:::' + this.s3GenerateAssetsBucketInterface.bucketName + '/*',

        ],
      }),
    );

    // Add Amazon Bedrock permissions to the IAM role for the Lambda function
    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'bedrock:InvokeModel',
          'bedrock:InvokeModelWithResponseStream',
        ],
        resources: [
          'arn:' + Aws.PARTITION + ':bedrock:' + Aws.REGION + '::foundation-model',
          'arn:' + Aws.PARTITION + ':bedrock:' + Aws.REGION + '::foundation-model/*',
        ],
      }),
    );

    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'comprehend:DetectToxicContent',
        ],
        resources: ['*'],
      }),
    );
    generate_image_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'rekognition:DetectModerationLabels',
          'rekognition:DetectText',
          'rekognition:DetectLabels',
          'rekognition:DetectFaces',
        ],
        resources: ['*'],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      generate_image_function_role,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used.',
        },
      ],
      true,
    );

    const construct_docker_lambda_props = {
      code: lambda.DockerImageCode.fromImageAsset(
        path.join(
          __dirname,
          '../../../../lambda/aws-contentgen-appsync-lambda/src',
        ),
      ),
      functionName: 'lambda_generate_image' + this.stage,
      description: 'Lambda function for generating image',
      vpc: this.vpc,
      tracing: this.lambdaTracing,
      vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
      securityGroups: [this.securityGroup],
      memorySize: lambdaMemorySizeLimiter(this, 1_769 * 4),
      timeout: Duration.minutes(15),
      role: generate_image_function_role,
      environment: {
        GRAPHQL_URL: updateGraphQlApiEndpoint,
        OUTPUT_BUCKET: this.s3GenerateAssetsBucketInterface.bucketName,

      },
      ...(props.lambdaProvisionedConcurrency && {
        currentVersionOptions: {
          provisionedConcurrentExecutions: props.lambdaProvisionedConcurrency,
        },
      }),
    };

    const generate_image_function = buildDockerLambdaFunction(this,
      'lambda_content_generation' + this.stage,
      construct_docker_lambda_props,
      props.customDockerLambdaProps,
    );

    generate_image_function.currentVersion;

    const lambdaFunctions = [generate_image_function];
    this.updateConstructUsageMetricCode( baseProps, scope, lambdaFunctions);


    // Add GraphQl permissions to the IAM role for the Lambda function
    generate_image_function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['appsync:GraphQL'],
        resources: [
          'arn:' + Aws.PARTITION + ':appsync:' +
            Aws.REGION +
            ':' +
            Aws.ACCOUNT_ID +
            ':apis/' +
            updateGraphQlApiId +
            '/*',
        ],
      }),
    );

    this.generatedImageBus.grantPutEventsTo(event_bridge_datasource.grantPrincipal);

    event_bridge_datasource.createResolver('GenerateImageResolver', {
      fieldName: 'generateImage',
      typeName: 'Mutation',
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        `
                {
                  "version": "2018-05-29",
                  "operation": "PutEvents",
                  "events": [{
                      "source": "textToImage",
                      "detail": $util.toJson($context.arguments),
                      "detailType": "genAIdemo"
                  }]
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
    });

    const rule = new events.Rule(this, 'textToImageRule' + this.stage, {
      description: 'Rule to trigger textToImage function',
      eventBus: this.generatedImageBus,
      eventPattern: {
        source: ['textToImage'],
      },
    });

    rule.addTarget(new targets.LambdaFunction(generate_image_function));

    this.cgLambdaFunction = generate_image_function;
  }
}
