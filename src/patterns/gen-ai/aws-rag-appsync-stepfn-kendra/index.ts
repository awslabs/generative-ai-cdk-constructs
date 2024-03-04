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
import * as events from 'aws-cdk-lib/aws-events';
import * as targets from 'aws-cdk-lib/aws-events-targets';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as openSearchServerless from 'aws-cdk-lib/aws-opensearchserverless';
import * as opensearchservice from 'aws-cdk-lib/aws-opensearchservice';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as secret from 'aws-cdk-lib/aws-secretsmanager';
import * as stepfn from 'aws-cdk-lib/aws-stepfunctions';
import * as stepfn_task from 'aws-cdk-lib/aws-stepfunctions-tasks';
import { NagSuppressions } from 'cdk-nag';
import { Construct } from 'constructs';
import { buildDockerLambdaFunction } from '../../../common/helpers/lambda-builder-helper';
import * as opensearch_helper from '../../../common/helpers/opensearch-helper';
import * as s3_bucket_helper from '../../../common/helpers/s3-bucket-helper';
import { generatePhysicalName, version, lambdaMemorySizeLimiter } from '../../../common/helpers/utils';
import * as vpc_helper from '../../../common/helpers/vpc-helper';
import { DockerLambdaCustomProps } from '../../../common/props/DockerLambdaCustomProps';
import * as kendra from "aws-cdk-lib/aws-kendra";
import * as cdk from 'aws-cdk-lib';
import {CfnLogGroup} from "aws-cdk-lib/aws-logs";

enum EndpointTypes {
  GATEWAY = "Gateway",
  INTERFACE = "Interface",
}

interface EndpointDefinition {
  endpointName: ServiceEndpointTypes;
  endpointType: EndpointTypes;
  endpointGatewayService?: ec2.GatewayVpcEndpointAwsService;
  endpointInterfaceService?: ec2.InterfaceVpcEndpointAwsService;
}

export interface BuildKendraIndexProps {
  readonly kendraIndexProps?: kendra.CfnIndexProps | any;
  /**
   * Existing instance of Kendra Index object, Providing both this and kendraIndexProps will cause an error.
   *
   * @default - None
   */
  readonly existingIndexObj?: kendra.CfnIndex;
}

export interface BuildVpcProps {
  /**
   * Existing instance of a VPC, if this is set then the all Props are ignored
   */
  readonly existingVpc?: ec2.IVpc;
  /**
   * One of the default VPC configurations available in vpc-defaults
   */
  readonly defaultVpcProps: ec2.VpcProps;
  /**
   * User provided props to override the default props for the VPC.
   */
  readonly userVpcProps?: ec2.VpcProps;
  /**
   * Construct specified props that override both the default props
   * and user props for the VPC.
   */
  readonly constructVpcProps?: ec2.VpcProps;
}

export interface SecurityGroupRuleDefinition {
  readonly peer: ec2.IPeer // example: ec2.Peer.ipV4(vpc.vpcCiderBlock)
  readonly connection: ec2.Port
  readonly description?: string
  readonly remoteRule?: boolean
}


/**
 * The CFN NAG suppress rule interface
 * @interface CfnNagSuppressRule
 */
export interface CfnNagSuppressRule {
  readonly id: string;
  readonly reason: string;
}


/**
 * Adds CFN NAG suppress rules to the CDK resource.
 * @param resource The CDK resource
 * @param rules The CFN NAG suppress rules
 */
 function addCfnSuppressRules(resource: cdk.Resource | cdk.CfnResource, rules: CfnNagSuppressRule[]) {
  if (resource instanceof cdk.Resource) {
    resource = resource.node.defaultChild as cdk.CfnResource;
  }

  if (resource.cfnOptions.metadata?.cfn_nag?.rules_to_suppress) {
    resource.cfnOptions.metadata?.cfn_nag.rules_to_suppress.push(...rules);
  } else {
    resource.addMetadata('cfn_nag', {
      rules_to_suppress: rules
    });
  }
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

  // If has modified constructor
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
      arrayMerge: (destinationArray, sourceArray) =>  destinationArray.concat(sourceArray),
      isMergeableObject: isPlainObject
    });
  } else {
    return deepmerge(DefaultProps, userProps, {
      arrayMerge: (_destinationArray, sourceArray) => sourceArray, // underscore allows arg to be ignored
      isMergeableObject: isPlainObject
    });
  }
}
function buildVpc(scope: Construct, props: BuildVpcProps): ec2.IVpc {
  if (props?.existingVpc) {
    return props?.existingVpc;
  }

  let cumulativeProps: ec2.VpcProps = props?.defaultVpcProps;

  cumulativeProps = consolidateProps(cumulativeProps, props?.userVpcProps, props?.constructVpcProps);

  const vpc = new ec2.Vpc(scope, "Vpc", cumulativeProps);

  // Add VPC FlowLogs with the default setting of trafficType:ALL and destination: CloudWatch Logs
  const flowLog: ec2.FlowLog = vpc.addFlowLog("FlowLog");

  SuppressMapPublicIpWarnings(vpc);
  SuppressEncryptedLogWarnings(flowLog);

  return vpc;
}

function SuppressMapPublicIpWarnings(vpc: ec2.Vpc) {
  // Add Cfn Nag suppression for PUBLIC subnets to suppress WARN W33: EC2 Subnet should not have MapPublicIpOnLaunch set to true
  vpc.publicSubnets.forEach((subnet) => {
    const cfnSubnet = subnet.node.defaultChild as ec2.CfnSubnet;
    addCfnSuppressRules(cfnSubnet, [
      {
        id: 'W33',
        reason: 'Allow Public Subnets to have MapPublicIpOnLaunch set to true'
      }
    ]);
  });
}
function SuppressEncryptedLogWarnings(flowLog: ec2.FlowLog) {
  // Add Cfn Nag suppression for CloudWatchLogs LogGroups data is encrypted
  const cfnLogGroup: CfnLogGroup = flowLog.logGroup?.node.defaultChild as CfnLogGroup;
  addCfnSuppressRules(cfnLogGroup, [
    {
      id: 'W84',
      reason: 'By default CloudWatchLogs LogGroups data is encrypted using the CloudWatch server-side encryption keys (AWS Managed Keys)'
    }
  ]);
}
export function DefaultIsolatedVpcProps(): ec2.VpcProps {
  return {
    natGateways: 0,
    subnetConfiguration: [
      {
        cidrMask: 18,
        name: "isolated",
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
      }
    ]
  } as ec2.VpcProps;
}

export enum ServiceEndpointTypes {
  DYNAMODB = "DDB",
  SNS = "SNS",
  SQS = "SQS",
  S3 = "S3",
  STEP_FUNCTIONS = "STEP_FUNCTIONS",
  SAGEMAKER_RUNTIME = "SAGEMAKER_RUNTIME",
  SECRETS_MANAGER = "SECRETS_MANAGER",
  SSM = "SSM",
  ECR_API = "ECR_API",
  ECR_DKR = "ECR_DKR",
  EVENTS = "CLOUDWATCH_EVENTS",
  KINESIS_FIREHOSE = "KINESIS_FIREHOSE",
  KINESIS_STREAMS = "KINESIS_STREAMS",
  KENDRA = "KENDRA"
}
function AddGatewayEndpoint(vpc: ec2.IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
  vpc.addGatewayEndpoint(interfaceTag, {
    service: service.endpointGatewayService as ec2.GatewayVpcEndpointAwsService,
  });
}

function CheckIfEndpointAlreadyExists(vpc: ec2.IVpc, interfaceTag: ServiceEndpointTypes): boolean {
  return vpc.node.children.some((child) => child.node.id === interfaceTag);
}

const endpointSettings: EndpointDefinition[] = [
  {
    endpointName: ServiceEndpointTypes.DYNAMODB,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: ec2.GatewayVpcEndpointAwsService.DYNAMODB,
  },
  {
    endpointName: ServiceEndpointTypes.S3,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: ec2.GatewayVpcEndpointAwsService.S3,
  },
  {
    endpointName: ServiceEndpointTypes.STEP_FUNCTIONS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.STEP_FUNCTIONS,
  },
  {
    endpointName: ServiceEndpointTypes.SNS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SNS,
  },
  {
    endpointName: ServiceEndpointTypes.SQS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SQS,
  },
  {
    endpointName: ServiceEndpointTypes.SAGEMAKER_RUNTIME,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SAGEMAKER_RUNTIME,
  },
  {
    endpointName: ServiceEndpointTypes.SECRETS_MANAGER,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
  },
  {
    endpointName: ServiceEndpointTypes.SSM,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.SSM,
  },
  {
    endpointName: ServiceEndpointTypes.ECR_API,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.ECR
  },
  {
    endpointName: ServiceEndpointTypes.ECR_DKR,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.ECR_DOCKER
  },
  {
    endpointName: ServiceEndpointTypes.EVENTS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.CLOUDWATCH_EVENTS
  },
  {
    endpointName: ServiceEndpointTypes.KINESIS_FIREHOSE,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KINESIS_FIREHOSE
  },
  {
    endpointName: ServiceEndpointTypes.KINESIS_STREAMS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KINESIS_STREAMS
  },
  {
    endpointName: ServiceEndpointTypes.KENDRA,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: ec2.InterfaceVpcEndpointAwsService.KENDRA
  }
];



export function AddAwsServiceEndpoint(
  scope: Construct,
  vpc: ec2.IVpc,
  interfaceTag: ServiceEndpointTypes
) {
  if (CheckIfEndpointAlreadyExists(vpc, interfaceTag)) {
    return;
  }

  const service = endpointSettings.find(
    (endpoint) => endpoint.endpointName === interfaceTag
  );

  if (!service) {
    throw new Error("Unsupported Service sent to AddServiceEndpoint");
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

function AddInterfaceEndpoint(scope: Construct, vpc: ec2.IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypes) {
  const endpointDefaultSecurityGroup = buildSecurityGroup(
    scope,
    `${scope.node.id}-${service.endpointName}`,
    {
      vpc,
      allowAllOutbound: true,
    },
    [{ peer: ec2.Peer.ipv4(vpc.vpcCidrBlock), connection: ec2.Port.tcp(443) }],
    []
  );

  vpc.addInterfaceEndpoint(interfaceTag, {
    service: service.endpointInterfaceService as ec2.InterfaceVpcEndpointAwsService,
    securityGroups: [endpointDefaultSecurityGroup],
  });
}

export function buildSecurityGroup(
  scope: Construct,
  name: string,
  props: ec2.SecurityGroupProps,
  ingressRules: SecurityGroupRuleDefinition[],
  egressRules: SecurityGroupRuleDefinition[]
): ec2.SecurityGroup {
  const newSecurityGroup = new ec2.SecurityGroup(scope, `${name}-security-group`, props);

  ingressRules.forEach(rule => {
    newSecurityGroup.addIngressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  egressRules.forEach(rule => {
    newSecurityGroup.addEgressRule(rule.peer, rule.connection, rule.description, rule.remoteRule);
  });

  addCfnSuppressRules(newSecurityGroup, [
    {
      id: "W5",
      reason:
        "Egress of 0.0.0.0/0 is default and generally considered OK",
    },
    {
      id: "W40",
      reason:
        "Egress IPProtocol of -1 is default and generally considered OK",
    },
  ]);

  return newSecurityGroup;
}

function DefaultKendraIndexProps(id: string, roleArn?: string): kendra.CfnIndexProps {
  return {
    name: generatePhysicalName("", ["KendraIndex", id], 1000),
    roleArn,
    edition: 'DEVELOPER_EDITION',
  } as kendra.CfnIndexProps;
}

function buildKendraIndex(scope: Construct, id: string, props: BuildKendraIndexProps): kendra.CfnIndex {
  // Conditional lambda function creation
  if (props.existingIndexObj) {
    // The client provided an Index, so we'll do nothing and return it to them
    return props.existingIndexObj;
  } else {

    let indexRoleArn: string = "";

    // If the client provided a role, then don't bother creating a new one that we don't need
    if (!props.kendraIndexProps?.roleArn) {
      indexRoleArn = CreateKendraIndexLoggingRole(scope, id);
    }
    const defaultIndexProperties = DefaultKendraIndexProps(id, indexRoleArn);

    const consolidatedIndexProperties = consolidateProps(defaultIndexProperties, props.kendraIndexProps);
    const newIndex = new kendra.CfnIndex(scope, `kendra-index-${id}`, consolidatedIndexProperties);
    addCfnSuppressRules(newIndex, [{
      id: "W80",
      reason: "We consulted the Kendra TFC and they confirmed the default encryption is sufficient for general use cases"
    }]);

    return newIndex;
  }
}

function AddMultipleKendraDataSources(scope: Construct,
  id: string,
  kendraIndex: kendra.CfnIndex,
  clientDataSourceProps: Array<Partial<kendra.CfnDataSourceProps>>): kendra.CfnDataSource[] {

  const returnDataSources: kendra.CfnDataSource[] = [];
  clientDataSourceProps.forEach((props, index) => {
    returnDataSources.push(AddKendraDataSource(scope, `${id}${index}`, kendraIndex, props));
  });
  return returnDataSources;
}



 function AddKendraDataSource(scope: Construct,
  id: string, index: kendra.CfnIndex,
  clientDataSourceProps: kendra.CfnDataSourceProps | any): kendra.CfnDataSource {

  if  (clientDataSourceProps.type === 'S3') {
    return CreateS3DataSource(scope, index, id, clientDataSourceProps);
  } else {
    if (clientDataSourceProps.indexId) {
      throw new Error('Invalid DataSource prop specified - Construct must set the indexId prop');
    }
    return new kendra.CfnDataSource(scope, `kendra-data-source-${id}`, {
      ...clientDataSourceProps,
      indexId: index.attrId
    });
  }
}

function CreateS3DataSource(scope: Construct,
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
    type: 'S3'
  };

  // Return consolidated default and user props
  if (!clientProps.roleArn) {
    const s3CrawlPolicy = new iam.PolicyDocument({
      statements: [
        new iam.PolicyStatement({
          actions: [
            "s3:GetObject"
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}/*`
          ],
          effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          actions: [
            "s3:ListBucket"
          ],
          resources: [
            `arn:aws:s3:::${s3DataSourceConfig.bucketName}`
          ],
          effect: iam.Effect.ALLOW
        }),
        new iam.PolicyStatement({
          effect: iam.Effect.ALLOW,
          actions: [
            "kendra:BatchPutDocument",
            "kendra:BatchDeleteDocument"
          ],
          resources: [
            targetIndex.attrArn
          ]
        }),
      ]
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

function CreateKendraIndexLoggingRole(scope: Construct, id: string): string {
  const allowKendraToLogPolicy = new iam.PolicyDocument({
    statements: [
      new iam.PolicyStatement({
        resources: ['*'],
        actions: [
          "cloudwatch:PutMetricData"
        ],
        effect: iam.Effect.ALLOW,
        conditions: {
          StringEquals: {
            "cloudwatch:namespace": "AWS/Kendra"
          }
        }
      }),
      new iam.PolicyStatement({
        resources: [`arn:aws:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*`],
        actions: [
          "logs:CreateLogGroup"
        ],
        effect: iam.Effect.ALLOW,
      }),
      new iam.PolicyStatement({
        resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*`],
        actions: [
          "logs:DescribeLogGroups"
        ],
        effect: iam.Effect.ALLOW,
      }),
      new iam.PolicyStatement({
        resources: [`arn:${Aws.PARTITION}:logs:${Aws.REGION}:${Aws.ACCOUNT_ID}:log-group:/aws/kendra/*:log-stream:*`],
        actions: [
          'logs:CreateLogStream',
          'logs:PutLogEvents',
          'logs:DescribeLogStream',
        ],
        effect: iam.Effect.ALLOW,
      }),
    ],
  });

  const indexRole: iam.Role = new iam.Role(scope, `kendra-index-role-${id}`, {
    assumedBy: new iam.ServicePrincipal('kendra.amazonaws.com'),
    description: 'Allow Kendra index to write CloudWatch Logs',
    inlinePolicies: {
      AllowLogging: allowKendraToLogPolicy,
    },
  });
  addCfnSuppressRules(indexRole, [{
    id: "W11",
    reason: "PutMetricData does not allow resource specification, " +
      "scope is narrowed by the namespace condition. " +
      "https://docs.aws.amazon.com/service-authorization/latest/reference/list_amazoncloudwatch.html"
  }]);
  return indexRole.roleArn;
}

// @summary Confirm each entry is a correct value, uppercase each entry
export function normalizeKendraPermissions(rawPermissions: string[]): string[] {
  const validPermissions = ["READ", "SUBMITFEEDBACK", "WRITE"];

  const result = rawPermissions.map<string>((s) => {
    const upperCaseValue = s.toUpperCase();
    if (!validPermissions.includes(upperCaseValue)) {
      throw new Error(`Invalid indexPermission value - valid values are "READ", "SUBMITFEEDBACK" and "WRITE"`);
    }
    return upperCaseValue;
  });
  return result;
}



/**
 * The properties for the RagAppsyncStepfnKendraProps class.
 */
export interface RagAppsyncStepfnKendraProps {
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
  public readonly kendraIndex?: kendra.CfnIndex;
  public readonly kendraDataSources: kendra.CfnDataSource[];

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

    // Staging environment
    let stage = '-dev';
    if (props?.stage) {
      stage = props.stage;
    }

    if (props.kendraIndexProps && props.existingKendraIndexObj) {
      throw new Error('You may not provide both kendraIndexProps and existingKendraIndexObj');
    }

    if (props.kendraIndexProps && props.kendraDataSourcesProps) {
      throw new Error('You may not provide both kendraDataSourcesProps and existingKendraIndexObj');
    }

    if (props.deployVpc || props.existingVpc) {
      this.vpc = buildVpc(scope, {
        defaultVpcProps: DefaultIsolatedVpcProps(),
        existingVpc: props.existingVpc,
        userVpcProps: props.vpcProps,
        constructVpcProps: {
          enableDnsHostnames: true,
          enableDnsSupport: true,
        },
      });

      AddAwsServiceEndpoint(scope, this.vpc, ServiceEndpointTypes.KENDRA);
    }

    this.kendraIndex = buildKendraIndex(this, id, {
      kendraIndexProps: props.kendraIndexProps,
      existingIndexObj: props.existingKendraIndexObj
    });

    this.kendraDataSources = AddMultipleKendraDataSources(this, id, this.kendraIndex, props.kendraDataSourcesProps);

    // // Update Lambda function IAM policy with correct privileges to Kendra index
    // const normalizedPermissions = props.indexPermissions ? normalizeKendraPermissions(props.indexPermissions) : undefined;
    //
    // // Configure environment variables to pass to lambdas
    // const indexIdEnvironmentVariableName = props.indexIdEnvironmentVariableName || 'KENDRA_INDEX_ID';


  }
}