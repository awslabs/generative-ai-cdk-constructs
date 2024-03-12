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
import { RemovalPolicy } from 'aws-cdk-lib';
import { Table } from 'aws-cdk-lib/aws-dynamodb';
import {
  GatewayVpcEndpointAwsService,
  InterfaceVpcEndpointAwsService,
  IVpc, Peer, Port, SecurityGroup, SecurityGroupProps,
  SubnetType, VpcProps,
} from 'aws-cdk-lib/aws-ec2';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import { DefinitionBody, StateMachine } from 'aws-cdk-lib/aws-stepfunctions';
import { Stack } from 'aws-cdk-lib/core';
import { Construct } from 'constructs';
import * as deepmerge from 'deepmerge';
import { addCfnSuppressRules, generatePhysicalName } from './utils';
import {
  EndpointDefinition,
  EndpointTypes,
  SecurityGroupRuleDefinition,
} from '../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

export function createS3DataSource(scope: Construct,
  targetIndex: kendra.CfnIndex,
  id: string,
  clientProps: Partial<kendra.CfnDataSourceProps>): kendra.CfnDataSource {

  // We go through some hoops here to extract the various inputs, because we need to narrow
  // the type to remove the union with IResolvable
  const dataSourceConfig = clientProps.dataSourceConfiguration as kendra.CfnDataSource.DataSourceConfigurationProperty;
  if (!dataSourceConfig) {
    throw new Error('Error - an S3 Kendra DataSource requires an DataSourceConfiguration prop');
  }

  const s3DataSourceConfig = dataSourceConfig.s3Configuration as kendra.CfnDataSource.S3DataSourceConfigurationProperty;

  if (!s3DataSourceConfig) {
    throw new Error('Error - an S3 Kendra DataSource requires an DataSourceConfiguration.S3Configuration prop');
  }

  // No Bucket name is an error
  if (!s3DataSourceConfig.bucketName) {
    throw new Error('Error - an S3 Kendra DataSource requires the DataSourceConfiguration.S3Configuration.bucketName prop');
  }

  // If there's no role, make a role and put it into defaultProps
  // Put bucket name in default props
  let defaultProps: kendra.CfnDataSourceProps = {
    indexId: targetIndex.ref,
    name: generatePhysicalName('', ['s3-datasource', id], 1000),
    type: 'S3',
  };

  // Return consolidated default and user props
  if (!clientProps.roleArn) {
    const s3CrawlPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            's3:GetObject',
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}/*`,
          ],
          effect: iam.Effect.ALLOW,
        }),
        new iam.PolicyStatement({
          actions: [
            's3:ListBucket',
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}`,
          ],
          effect: iam.Effect.ALLOW,
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            'kendra:BatchPutDocument',
            'kendra:BatchDeleteDocument',
          ],
          resources: [
            targetIndex.attrArn,
          ],
        }),
      ],
    });

    const dataSourceRole: iam.Role = new iam.Role(scope, `data-source-role-${id}`, {
      assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
      description: 'Policy for Kendra S3 Data Source',
      inlinePolicies: {
        s3CrawlPolicy,
      },
    });
    defaultProps = overrideProps(defaultProps, { roleArn: dataSourceRole.roleArn });
  }

  const consolidatedProps: kendra.CfnDataSourceProps = consolidateProps(defaultProps, clientProps);

  return new kendra.CfnDataSource(scope, `data-source-${id}`, consolidatedProps);
}

export function createKendraWorkflowStepFunction(
  cdkStack: Construct,
  updateKendraJobStatusFn: cdk.aws_lambda.IFunction,
  kendraSyncLambda: cdk.aws_lambda.IFunction,
  createCheckJobsStatusLambda: cdk.aws_lambda.IFunction,
): StateMachine {
  const docProcessingLogGroup = new cdk.aws_logs.LogGroup(cdkStack, 'DocProcessingStateMachineLog', {
    removalPolicy: RemovalPolicy.DESTROY,
  });
  // TODO(miketran): Eventually make this event driven
  const waitFor30Secs = new cdk.aws_stepfunctions.Wait(cdkStack, 'Wait 30 Seconds', {
    time: cdk.aws_stepfunctions.WaitTime.duration(cdk.Duration.seconds(30)),
  });

  const getKendraJobStatus = new cdk.aws_stepfunctions_tasks.LambdaInvoke(
    cdkStack,
    'Get Textract Job Status', {
      lambdaFunction: createCheckJobsStatusLambda,
      // Lambda's result in a field called "status" in the response
      outputPath: '$.Payload',
    });

  // Step function Def
  const docProcessingDefinition = new cdk.aws_stepfunctions_tasks.LambdaInvoke(
    cdkStack,
    'Starts a new Kendra Data Sync Job',
    {
      lambdaFunction: kendraSyncLambda,
      outputPath: '$.Payload',
    },
  )
    .next(getKendraJobStatus)
    .next(new cdk.aws_stepfunctions.Choice(cdkStack, 'Kendra DataSync Job Complete?')
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'FAILED'),
        new cdk.aws_stepfunctions_tasks.LambdaInvoke(
          cdkStack,
          'Update Document Status as Failure',
          {
            lambdaFunction: updateKendraJobStatusFn,
            outputPath: '$.Payload',
          },
        ))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'ABORTED'),
        new cdk.aws_stepfunctions_tasks.LambdaInvoke(
          cdkStack,
          'Update Document Status as Aborted',
          {

            lambdaFunction: updateKendraJobStatusFn,
            outputPath: '$.Payload',
          },
        ))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'INCOMPLETE'),
        new cdk.aws_stepfunctions_tasks.LambdaInvoke(
          cdkStack,
          'Update Document Status as Incomplete',
          {
            lambdaFunction: updateKendraJobStatusFn,
            outputPath: '$.Payload',
          },
        ))
      .when(cdk.aws_stepfunctions.Condition.stringEquals('$.KendraJobStatus', 'SUCCEEDED'),
        new cdk.aws_stepfunctions_tasks.LambdaInvoke(
          cdkStack,
          'Update Document Status as Completed',
          {
            lambdaFunction: updateKendraJobStatusFn,
            outputPath: '$.Payload',
          },
        ),
      )
      .otherwise(waitFor30Secs.next(getKendraJobStatus)),
    );

  const definitionDocProcessingBody = DefinitionBody.fromChainable(docProcessingDefinition);

  return new cdk.aws_stepfunctions.StateMachine(
    cdkStack,
    'DocProcessingStateMachine',
    {
      definitionBody: definitionDocProcessingBody,
      tracingEnabled: true,
      logs: {
        destination: docProcessingLogGroup,
        level: cdk.aws_stepfunctions.LogLevel.ALL,
      },
    },
  );
}


export function createSyncRunTable(cdkStack: Construct) {
  return new cdk.aws_dynamodb.Table(cdkStack, 'SyncRunTable', {
    partitionKey: {
      name: 'Id',
      type: cdk.aws_dynamodb.AttributeType.STRING,
    },
    sortKey: {
      name: 'CreatedOn',
      type: cdk.aws_dynamodb.AttributeType.STRING,
    },
    encryption: cdk.aws_dynamodb.TableEncryption.AWS_MANAGED,
    billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
    removalPolicy: RemovalPolicy.DESTROY,
  });
}

export function createKendraStartDataSync(
  cdkStack: Stack,
  syncRunTable: Table,
  awsRegion: string,
  awsAccountId: string,
  kendraIndexId: string,
  kendraDataSourceIndexId: string,
): cdk.aws_lambda.Function {

  let startDataSyncRole = new cdk.aws_iam.Role(
    cdkStack,
    'startDataSyncRole',
    {
      description: 'Role used by the Document Status Update Lambda function',
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    },
  );

  startDataSyncRole.addManagedPolicy(
    cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  startDataSyncRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:UpdateItem'],
      resources: [syncRunTable.tableArn],
    }),
  );

  startDataSyncRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['kendra:StartDataSourceSyncJob'],
      resources: [
        `arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}`,
        `arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}/data-source/${kendraDataSourceIndexId}`,
      ],
    }));

  return new cdk.aws_lambda.Function(
    cdkStack,
    'kendraStartDataSync',
    {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
      handler: 'start_sync.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('../lambdas/kendra_sync'),
      timeout: cdk.Duration.seconds(30),
      role: startDataSyncRole,
      environment: {
        KENDRA_INDEX_ID: kendraIndexId,
        KENDRA_DATA_SOURCE_INDEX_ID: kendraDataSourceIndexId,
        DOCUMENTS_TABLE: syncRunTable.tableName,
      },
    },
  );
}

export function createCheckJobsStatusFn(
  cdkStack: Stack,
  awsRegion: string,
  awsAccountId: string,
  kendraIndexId: string,
  kendraDataSourceIndexId: string,
  syncRunTable: Table): cdk.aws_lambda.Function {
  const checkJobStatusRole = new cdk.aws_iam.Role(
    cdkStack,
    'textTractLambdaRole',
    {
      description: 'Role used by the Text Extract Lambda function',
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    },
  );

  checkJobStatusRole.addManagedPolicy(
    cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  checkJobStatusRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['kendra:ListDataSourceSyncJobs'],
      resources: [`arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}`],
    }),
  );
  checkJobStatusRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['kendra:ListDataSourceSyncJobs'],
      resources: [`arn:aws:kendra:${awsRegion}:${awsAccountId}:index/${kendraIndexId}/data-source/${kendraDataSourceIndexId}`],
    }),
  );


  return new cdk.aws_lambda.Function(
    cdkStack,
    'checkJobStatusFN',
    {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
      handler: 'check_sync_status.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset('../lambdas/kendra_sync_status'),
      timeout: cdk.Duration.seconds(60),
      memorySize: 256,
      role: checkJobStatusRole,
      environment: {
        KENDRA_INDEX_ID: kendraIndexId,
        KENDRA_DATA_SOURCE_INDEX_ID: kendraDataSourceIndexId,
        DOCUMENTS_TABLE: syncRunTable.tableName,
      },
    },
  );
}


export function createUpdateKendraJobStatusFn(cdkStack: Stack, syncRunTable: Table): cdk.aws_lambda.Function {
  let updateKendraJobStatusRole = new cdk.aws_iam.Role(
    cdkStack,
    'updateKendraJobStatus',
    {
      description: 'Role used by the Document Status Update Lambda function',
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    },
  );

  updateKendraJobStatusRole.addManagedPolicy(
    cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  updateKendraJobStatusRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['dynamodb:PutItem', 'dynamodb:Query', 'dynamodb:GetItem', 'dynamodb:UpdateItem'],
      resources: [syncRunTable.tableArn],
    }),
  );

  return new cdk.aws_lambda.Function(
    cdkStack,
    'updateKendraJobStatusFn',
    {
      runtime: cdk.aws_lambda.Runtime.PYTHON_3_10,
      handler: 'update_job_status.lambda_handler',
      code: cdk.aws_lambda.Code.fromAsset(path.join(__dirname, '../../../../lambda/aws-rag-appsync-stepfn-kendra/kendra_job_manager/')),
      timeout: cdk.Duration.seconds(30),
      role: updateKendraJobStatusRole,
      environment: {
        DOCUMENTS_TABLE: syncRunTable.tableName,
      },
    },
  );
}

export function createStepFunctionsExecutionHandlerRole(
  cdkStack: Construct,
  docProcessingStateMachine: StateMachine) {
  const stepFunctionsExecutionHandlerRole = new cdk.aws_iam.Role(
    cdkStack,
    'stepFunctionsExecutionHandlerRole',
    {
      description: 'Role used by the stepFunctionsExecutionHandlerFn Lambda function',
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    },
  );
  stepFunctionsExecutionHandlerRole.node.addDependency(docProcessingStateMachine);

  stepFunctionsExecutionHandlerRole.addManagedPolicy(
    cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  stepFunctionsExecutionHandlerRole.addToPolicy(
    new cdk.aws_iam.PolicyStatement({
      actions: ['states:StartExecution'],
      resources: [
        docProcessingStateMachine.stateMachineArn,
      ],
    }),
  );

  return stepFunctionsExecutionHandlerRole;
}

/**
 * Creates the props to be used to instantiate a CDK L2 construct within a Solutions Construct
 *
 * @param defaultProps The default props to be used by the construct
 * @param clientProps Optional properties passed in from the client in the props object
 * @param constructProps Optional properties required by the construct for the construct to work (override any other values)
 * @returns The properties to use - all values prioritized:
 *  1) constructProps value
 *  2) clientProps value
 *  3) defaultProps value
 */
export function consolidateProps(defaultProps: object, clientProps?: object, constructProps?: object, concatArray: boolean = false): any {
  let result: object = defaultProps;

  if (clientProps) {
    result = overrideProps(result, clientProps, concatArray);
  }

  if (constructProps) {
    result = overrideProps(result, constructProps, concatArray);
  }

  return result;
}


function isObject(val: object) {
  return val != null && typeof val === 'object'
        && Object.prototype.toString.call(val) === '[object Object]';
}

function isPlainObject(o: object) {
  if (Array.isArray(o) === true) {
    return true;
  }

  if (isObject(o) === false) {
    return false;
  }

  // If this has modified constructor
  const ctor = o.constructor;
  if (typeof ctor !== 'function') {
    return false;
  }

  // If has modified prototype
  const prot = ctor.prototype;
  if (isObject(prot) === false) {
    return false;
  }

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
}

export function overrideProps(DefaultProps: object, userProps: object, concatArray: boolean = false): any {
  // Override the sensible defaults with user provided props
  if (concatArray) {
    return deepmerge(DefaultProps, userProps, {
      arrayMerge: (destinationArray, sourceArray) => destinationArray.concat(sourceArray),
      isMergeableObject: isPlainObject,
    });
  } else {
    return deepmerge(DefaultProps, userProps, {
      arrayMerge: (_destinationArray, sourceArray) => sourceArray, // underscore allows arg to be ignored
      isMergeableObject: isPlainObject,
    });
  }
}


export function createDefaultIsolatedVpcProps(): VpcProps {
  return {
    natGateways: 0,
    subnetConfiguration: [
      {
        cidrMask: 18,
        name: 'isolated',
        subnetType: SubnetType.PRIVATE_ISOLATED,
      },
    ],
  } as VpcProps;
}

export enum ServiceEndpointTypes {
  DYNAMODB = 'DDB',
  SNS = 'SNS',
  SQS = 'SQS',
  S3 = 'S3',
  STEP_FUNCTIONS = 'STEP_FUNCTIONS',
  SAGEMAKER_RUNTIME = 'SAGEMAKER_RUNTIME',
  SECRETS_MANAGER = 'SECRETS_MANAGER',
  SSM = 'SSM',
  ECR_API = 'ECR_API',
  ECR_DKR = 'ECR_DKR',
  EVENTS = 'CLOUDWATCH_EVENTS',
  KINESIS_FIREHOSE = 'KINESIS_FIREHOSE',
  KINESIS_STREAMS = 'KINESIS_STREAMS',
  KENDRA = 'KENDRA'
}

function AddGatewayEndpoint(vpc: IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
  vpc.addGatewayEndpoint(interfaceTag, {
    service: service.endpointGatewayService as GatewayVpcEndpointAwsService,
  });
}

function CheckIfEndpointAlreadyExists(vpc: IVpc, interfaceTag: ServiceEndpointTypes): boolean {
  return vpc.node.children.some((child) => child.node.id === interfaceTag);
}

const endpointSettings: EndpointDefinition[] = [
  {
    endpointName: ServiceEndpointTypes.DYNAMODB,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: GatewayVpcEndpointAwsService.DYNAMODB,
  },
  {
    endpointName: ServiceEndpointTypes.S3,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: GatewayVpcEndpointAwsService.S3,
  },
  {
    endpointName: ServiceEndpointTypes.STEP_FUNCTIONS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.STEP_FUNCTIONS,
  },
  {
    endpointName: ServiceEndpointTypes.SNS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SNS,
  },
  {
    endpointName: ServiceEndpointTypes.SQS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SQS,
  },
  {
    endpointName: ServiceEndpointTypes.SAGEMAKER_RUNTIME,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SAGEMAKER_RUNTIME,
  },
  {
    endpointName: ServiceEndpointTypes.SECRETS_MANAGER,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
  },
  {
    endpointName: ServiceEndpointTypes.SSM,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SSM,
  },
  {
    endpointName: ServiceEndpointTypes.ECR_API,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.ECR,
  },
  {
    endpointName: ServiceEndpointTypes.ECR_DKR,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.ECR_DOCKER,
  },
  {
    endpointName: ServiceEndpointTypes.EVENTS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.CLOUDWATCH_EVENTS,
  },
  {
    endpointName: ServiceEndpointTypes.KINESIS_FIREHOSE,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KINESIS_FIREHOSE,
  },
  {
    endpointName: ServiceEndpointTypes.KINESIS_STREAMS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KINESIS_STREAMS,
  },
  {
    endpointName: ServiceEndpointTypes.KENDRA,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KENDRA,
  },
];


export function AddAwsServiceEndpoint(
  scope: Construct,
  vpc: IVpc,
  interfaceTag: ServiceEndpointTypes,
) {
  if (CheckIfEndpointAlreadyExists(vpc, interfaceTag)) {
    return;
  }

  const service = endpointSettings.find(
    (endpoint) => endpoint.endpointName === interfaceTag,
  );

  if (!service) {
    throw new Error('Unsupported Service sent to AddServiceEndpoint');
  }

  if (service.endpointType === EndpointTypes.GATEWAY) {
    AddGatewayEndpoint(vpc, service, interfaceTag);
  }
  if (service.endpointType === EndpointTypes.INTERFACE) {
    AddInterfaceEndpoint(scope, vpc, service, interfaceTag);
  }

  // ESLint requires this return statement, so disabling SonarQube warning
  return; // NOSONAR
}


function AddInterfaceEndpoint(scope: Construct, vpc: IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
  const endpointDefaultSecurityGroup = buildSecurityGroup(
    scope,
    `${scope.node.id}-${service.endpointName}`,
    {
      vpc,
      allowAllOutbound: true,
    },
    [{ peer: Peer.ipv4(vpc.vpcCidrBlock), connection: Port.tcp(443) }],
    [],
  );

  vpc.addInterfaceEndpoint(interfaceTag, {
    service: service.endpointInterfaceService as InterfaceVpcEndpointAwsService,
    securityGroups: [endpointDefaultSecurityGroup],
  });
}

export function buildSecurityGroup(
  scope: Construct,
  name: string,
  props: SecurityGroupProps,
  ingressRules: SecurityGroupRuleDefinition[],
  egressRules: SecurityGroupRuleDefinition[],
): SecurityGroup {
  const newSecurityGroup = new SecurityGroup(scope, `${name}-security-group`, props);

  ingressRules.forEach(rule => {
    newSecurityGroup.addIngressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  egressRules.forEach(rule => {
    newSecurityGroup.addEgressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  addCfnSuppressRules(newSecurityGroup, [
    {
      id: 'W5',
      reason: 'Egress of 0.0.0.0/0 is default and generally considered OK',
    },
    {
      id: 'W40',
      reason: 'Egress IPProtocol of -1 is default and generally considered OK',
    },
  ]);

  return newSecurityGroup;
}

