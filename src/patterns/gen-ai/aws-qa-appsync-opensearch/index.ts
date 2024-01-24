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
import * as openSearchServerless from 'aws-cdk-lib/aws-opensearchserverless';
import * as opensearchservice from 'aws-cdk-lib/aws-opensearchservice';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import * as opensearch_helper from '../../../common/helpers/opensearch-helper';
import * as s3_bucket_helper from '../../../common/helpers/s3-bucket-helper';
import { version } from '../../../common/helpers/utils';
import * as vpc_helper from '../../../common/helpers/vpc-helper';

/**
 * The properties for the QaAppsyncOpensearchProps class.
 */
export interface QaAppsyncOpensearchProps {
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
   * Existing Amazon OpenSearch Service domain.
   *
   * @default - None
   */
  readonly existingOpensearchDomain?: opensearchservice.IDomain;
  /**
   * Existing Amazon Amazon OpenSearch Serverless collection.
   *
   * @default - None
   */
  readonly existingOpensearchServerlessCollection?: openSearchServerless.CfnCollection;
  /**
   * Data Index name for the OpenSearch Service.
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
   * used. Best practive to enable by default.
   *
   * @default - true
   */
  readonly observability?: boolean;

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
   * Optional. Allows a user to configure
   * Lambda provisioned concurrency for consistent performance
   */
  readonly lambdaProvisionedConcurrency?: number | undefined;
}

/**
 * @summary The QaAppsyncOpensearch class.
 */
export class QaAppsyncOpensearch extends Construct {
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
  public readonly qaBus: events.IEventBus;
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
   * Returns an instance of appsync.IGraphqlApi created by the construct
   */
  public readonly graphqlApi: appsync.IGraphqlApi;

  /**
   * @summary Constructs a new instance of the RagAppsyncStepfnOpensearch class.
   * @param {cdk.App} scope - represents the scope for all the resources.
   * @param {string} id - this is a a scope-unique id.
   * @param {QaAppsyncOpensearchProps} props - user provided props for the construct.
   * @since 0.0.0
   * @access public
   */
  constructor(scope: Construct, id: string, props: QaAppsyncOpensearchProps) {
    super(scope, id);

    // stage
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }

    // observability
    let lambda_tracing = lambda.Tracing.ACTIVE;
    let enable_xray = true;
    let api_log_config = {
      fieldLogLevel: appsync.FieldLogLevel.ALL,
      retention: logs.RetentionDays.TEN_YEARS,
    };
    if (props.observability == false) {
      enable_xray = false;
      lambda_tracing = lambda.Tracing.DISABLED;
      api_log_config = {
        fieldLogLevel: appsync.FieldLogLevel.NONE,
        retention: logs.RetentionDays.TEN_YEARS,
      };
    }

    vpc_helper.CheckVpcProps(props);
    s3_bucket_helper.CheckS3Props({
      existingBucketObj: props.existingInputAssetsBucketObj,
      bucketProps: props.bucketInputsAssetsProps,
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
        securityGroupName: 'securityGroup' + stage,
      });
    }

    // vpc flowloggroup
    const logGroup = new logs.LogGroup(this, 'qaConstructLogGroup');
    const role = new iam.Role(this, 'qaConstructRole', {
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
      'serverAccessLogBucket' + stage,
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
    let inputAssetsBucket: s3.IBucket;

    if (!props.existingInputAssetsBucketObj) {
      let tmpBucket: s3.Bucket;
      if (!props.bucketInputsAssetsProps) {
        tmpBucket = new s3.Bucket(this, 'inputAssetsQABucket' + stage, {
          blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
          encryption: s3.BucketEncryption.S3_MANAGED,
          bucketName: 'input-asset-qa-bucket' + stage + '-' + Aws.ACCOUNT_ID,
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
          'InputAssetsQABucket' + stage,
          props.bucketInputsAssetsProps,
        );
      }
      inputAssetsBucket = tmpBucket;
      this.s3InputAssetsBucket = tmpBucket;
    } else {
      inputAssetsBucket = props.existingInputAssetsBucketObj;
    }

    // this is the one we manipulate, we know it exists
    this.s3InputAssetsBucketInterface = inputAssetsBucket;

    // GraphQL API
    const question_answering_graphql_api = new appsync.GraphqlApi(
      this,
      'questionAnsweringGraphqlApi',
      {
        name: 'questionAnsweringGraphqlApi' + stage,
        definition: appsync.Definition.fromFile(
          path.join(
            __dirname,
            '../../../../resources/gen-ai/aws-qa-appsync-opensearch/schema.graphql',
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
        xrayEnabled: enable_xray,
        logConfig: api_log_config,
      },
    );

    this.graphqlApi = question_answering_graphql_api;

    // If the user provides a mergedApi endpoint, the lambda
    // functions will use this endpoint to send their status updates
    const updateGraphQlApiEndpoint = !props.existingMergedApi
      ? question_answering_graphql_api.graphqlUrl
      : props.existingMergedApi.attrGraphQlUrl;
    const updateGraphQlApiId = !props.existingMergedApi
      ? question_answering_graphql_api.apiId
      : props.existingMergedApi.attrApiId;

    const job_status_data_source = new appsync.NoneDataSource(
      this,
      'NoneDataSourceQuestionAnswering',
      {
        api: this.graphqlApi,
        name: 'JobStatusDataSource',
      },
    );

    job_status_data_source.createResolver('updateQAJobStatusResolver', {
      fieldName: 'updateQAJobStatus',
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
      this.qaBus = new events.EventBus(
        this,
        'questionAnsweringEventBus' + stage,
        {
          eventBusName: 'questionAnsweringEventBus' + stage,
        },
      );
    } else {
      this.qaBus = props.existingBusInterface;
    }

    // create httpdatasource with question_answering_graphql_api
    const event_bridge_datasource = this.graphqlApi.addEventBridgeDataSource(
      'questionAnsweringEventBridgeDataSource' + stage,
      this.qaBus,
      {
        name: 'questionAnsweringEventBridgeDataSource' + stage,
      },
    );

    let SecretId = 'NONE';
    if (props.openSearchSecret) {
      SecretId = props.openSearchSecret.secretName;
    }

    // Lambda function used to validate inputs in the step function

    const question_answering_function_role = new iam.Role(
      this,
      'question_answering_function_role',
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
    question_answering_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'ec2:CreateNetworkInterface',
          'ec2:DeleteNetworkInterface',
          'ec2:AssignPrivateIpAddresses',
          'ec2:UnassignPrivateIpAddresses',
        ],
        resources: [
          'arn:aws:ec2:' + Aws.REGION + ':' + Aws.ACCOUNT_ID + ':*/*',
        ],
      }),
    );
    // Decribe only works if it's allowed on all resources.
    // Reference: https://docs.aws.amazon.com/lambda/latest/dg/configuration-vpc.html#vpc-permissions
    question_answering_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['ec2:DescribeNetworkInterfaces'],
        resources: ['*'],
      }),
    );

    // The lambda will access the opensearch credentials
    if (props.openSearchSecret) {
      props.openSearchSecret.grantRead(question_answering_function_role);
    }

    // The lambda will pull processed files and create embeddings
    question_answering_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject', 's3:GetObject*', 's3:GetBucket*', 's3:List*'],
        resources: [
          'arn:aws:s3:::' + this.s3InputAssetsBucketInterface?.bucketName,
          'arn:aws:s3:::' +
            this.s3InputAssetsBucketInterface?.bucketName +
            '/*',
        ],
      }),
    );

    if (props.existingOpensearchDomain) {
      question_answering_function_role.addToPolicy(
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: ['es:*'],
          resources: [
            'arn:aws:es:' +
              Aws.REGION +
              ':' +
              Aws.ACCOUNT_ID +
              ':domain/' +
              props.existingOpensearchDomain.domainName +
              '/*',
            'arn:aws:es:' +
              Aws.REGION +
              ':' +
              Aws.ACCOUNT_ID +
              ':domain/' +
              props.existingOpensearchDomain.domainName,
          ],
        }),
      );
    }

    if (props.existingOpensearchServerlessCollection) {
      question_answering_function_role.addToPolicy(new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['aoss:APIAccessAll'],
        resources: [
          'arn:aws:aoss:'+Aws.REGION+':'+Aws.ACCOUNT_ID+':collection/'+props.openSearchIndexName,
        ],
      }));
    }

    // Add Amazon Bedrock permissions to the IAM role for the Lambda function
    question_answering_function_role.addToPolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: [
          'bedrock:InvokeModel',
          'bedrock:InvokeModelWithResponseStream',
        ],
        resources: [
          'arn:aws:bedrock:' + Aws.REGION + '::foundation-model',
          'arn:aws:bedrock:' + Aws.REGION + '::foundation-model/*',
        ],
      }),
    );

    NagSuppressions.addResourceSuppressions(
      question_answering_function_role,
      [
        {
          id: 'AwsSolutions-IAM5',
          reason: 'AWSLambdaBasicExecutionRole is used.',
        },
      ],
      true,
    );

    const question_answering_function = new lambda.DockerImageFunction(
      this,
      'lambda_question_answering' + stage,
      {
        code: lambda.DockerImageCode.fromImageAsset(
          path.join(
            __dirname,
            '../../../../lambda/aws-qa-appsync-opensearch/question_answering/src',
          ),
        ),
        functionName: 'lambda_question_answering' + stage,
        description: 'Lambda function for question answering',
        vpc: this.vpc,
        tracing: lambda_tracing,
        vpcSubnets: { subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS },
        securityGroups: [this.securityGroup],
        memorySize: 1_769 * 4,
        timeout: Duration.minutes(15),
        role: question_answering_function_role,
        environment: {
          GRAPHQL_URL: updateGraphQlApiEndpoint,
          INPUT_BUCKET: this.s3InputAssetsBucketInterface.bucketName,
          OPENSEARCH_API_NAME: opensearch_helper.getOpenSearchApiName(props),
          OPENSEARCH_DOMAIN_ENDPOINT: opensearch_helper.getOpenSearchEndpoint(props),
          OPENSEARCH_INDEX: props.openSearchIndexName,
          OPENSEARCH_SECRET_ID: SecretId,
        },
        ...(props.lambdaProvisionedConcurrency && {
          currentVersionOptions: {
            provisionedConcurrentExecutions: props.lambdaProvisionedConcurrency,
          },
        }),
      },
    );

    question_answering_function.currentVersion;

    const enableOperationalMetric =
      props.enableOperationalMetric !== undefined && props.enableOperationalMetric !== null ? props.enableOperationalMetric : true;

    if (enableOperationalMetric) {
      const solutionId = `genai_cdk_${version}/${this.constructor.name}/${id}`;
      question_answering_function.addEnvironment(
        'AWS_SDK_UA_APP_ID',
        solutionId,
      );
    }

    // Add GraphQl permissions to the IAM role for the Lambda function
    question_answering_function.addToRolePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['appsync:GraphQL'],
        resources: [
          'arn:aws:appsync:' +
            Aws.REGION +
            ':' +
            Aws.ACCOUNT_ID +
            ':apis/' +
            updateGraphQlApiId +
            '/*',
        ],
      }),
    );

    this.qaBus.grantPutEventsTo(event_bridge_datasource.grantPrincipal);

    event_bridge_datasource.createResolver('QuestionAnsweringResolver', {
      fieldName: 'postQuestion',
      typeName: 'Mutation',
      requestMappingTemplate: appsync.MappingTemplate.fromString(
        `
                        {
                            "version": "2018-05-29",
                            "operation": "PutEvents",
                            "events": [{
                                "source": "questionanswering",
                                "detail": $util.toJson($context.arguments),
                                "detailType": "Question answering"
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
    });

    const rule = new events.Rule(this, 'QuestionAnsweringRule' + stage, {
      description: 'Rule to trigger question answering function',
      eventBus: this.qaBus,
      eventPattern: {
        source: ['questionanswering'],
      },
    });

    rule.addTarget(new targets.LambdaFunction(question_answering_function));
  }
}
