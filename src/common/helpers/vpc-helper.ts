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
import {
  CfnSubnet,
  FlowLog,
  GatewayVpcEndpointAwsService, InterfaceVpcEndpointAwsService,
  IpAddresses,
  IVpc, Peer, Port,
  SecurityGroup,
  SubnetType,
  Vpc,
  VpcProps,
} from 'aws-cdk-lib/aws-ec2';
import { CfnLogGroup } from 'aws-cdk-lib/aws-logs';
import { Construct } from 'constructs';
import { buildSecurityGroup } from './kendra-helper';
import { addCfnSuppressRules } from './utils';
import {
  EndpointDefinition,
  EndpointTypes,
  ServiceEndpointTypeEnum,
} from '../../patterns/gen-ai/aws-rag-appsync-stepfn-kendra/types';

export interface VpcPropsSet {
  readonly existingVpc?: IVpc;
  readonly vpcProps?: VpcProps;
  readonly deployVpc?: boolean;
}

export function CheckVpcProps(propsObject: VpcPropsSet | any) {
  let errorMessages = '';
  let errorFound = false;

  if ((propsObject.deployVpc || propsObject.vpcProps) && propsObject.existingVpc) {
    errorMessages += 'Error - Either provide an existingVpc or some combination of deployVpc and vpcProps, but not both.\n';
    errorFound = true;
  }

  if (errorFound) {
    throw new Error(errorMessages);
  }
}

export interface BuildVpcProps {
  /**
   * Existing instance of a VPC, if this is set then the all Props are ignored,
   * if this is not set then deafultVPC Props are used.
   */
  readonly existingVpc?: IVpc;
  /**
   * One of the default VPC configurations available in vpc-defaults
   */
  readonly defaultVpcProps: VpcProps;
  /**
   * User provided props to override the default props for the VPC.
   */
  readonly userVpcProps?: VpcProps;
  /**
   * Construct specified props that override both the default props
   * and user props for the VPC.
   */
  readonly constructVpcProps?: VpcProps;
}

export function buildVpc(scope: Construct, props: BuildVpcProps): IVpc {
  if (props?.existingVpc) {
    return props?.existingVpc;
  }

  let defaultVpcProps = DefaultVpcProps();

  let cumulativeProps: VpcProps = defaultVpcProps;

  // Merge props provided by construct builder and by the end user
  // If user provided props are empty, the vpc will use only the builder provided props
  //cumulativeProps = consolidateProps(cumulativeProps, props?.userVpcProps, props?.constructVpcProps);
  const vpc = new Vpc(scope, 'Vpc', cumulativeProps);

  // Add VPC FlowLogs with the default setting of trafficType:ALL and destination: CloudWatch Logs
  const flowLog: FlowLog = vpc.addFlowLog('FlowLog');

  suppressMapPublicIpWarnings(vpc);
  suppressEncryptedLogWarnings(flowLog);

  return vpc;

}

// get subnet id for passed vpc.
export function getPrivateSubnetIDs (vpc: IVpc): string [] {
  return vpc.privateSubnets.map(subnet => subnet.subnetId);
}

// get lambda security group for passed VPC
export function getlambdaSecuritygroup(scope: Construct, vpc: IVpc): SecurityGroup {
  let lambdaSecurityGroup = new SecurityGroup(scope, 'lambdaSecurityGroup', {
    vpc: vpc,
    allowAllOutbound: true,
    description: 'security group for lambda',
    securityGroupName: 'lambdaSecurityGroup',
  });
  return lambdaSecurityGroup;
}


/**
 * @internal This is an internal core function and should not be called directly by Solutions Constructs clients.
 *
 * Creates the default vpc props with public , private_with_egress and private_isolated subnet configuration.
 */
export function DefaultVpcProps(): VpcProps {
  return {
    subnetConfiguration: [
      {
        name: 'public',
        subnetType: SubnetType.PUBLIC,
        cidrMask: 24,
      },
      {
        name: 'private',
        subnetType: SubnetType.PRIVATE_WITH_EGRESS,
        cidrMask: 24,
      },
      {
        name: 'isolated',
        subnetType: SubnetType.PRIVATE_ISOLATED,
        cidrMask: 24,
      },
    ],
    ipAddresses: IpAddresses.cidr('10.0.0.0/16'),
  };
}

export function suppressMapPublicIpWarnings(vpc: Vpc) {
  // Add Cfn Nag suppression for PUBLIC subnets to suppress WARN W33: EC2 Subnet should not have MapPublicIpOnLaunch set to true
  vpc.publicSubnets.forEach((subnet) => {
    const cfnSubnet = subnet.node.defaultChild as CfnSubnet;
    addCfnSuppressRules(cfnSubnet, [
      {
        id: 'W33',
        reason: 'Allow Public Subnets to have MapPublicIpOnLaunch set to true',
      },
    ]);
  });
}

export function suppressEncryptedLogWarnings(flowLog: FlowLog) {
  // Add Cfn Nag suppression for CloudWatchLogs LogGroups data is encrypted
  const cfnLogGroup: CfnLogGroup = flowLog.logGroup?.node.defaultChild as CfnLogGroup;
  addCfnSuppressRules(cfnLogGroup, [
    {
      id: 'W84',
      reason: 'By default CloudWatchLogs LogGroups data is encrypted using the CloudWatch server-side encryption keys (AWS Managed Keys)',
    },
  ]);
}

function AddInterfaceEndpoint(scope: Construct, vpc: IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypeEnum) {
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

function AddGatewayEndpoint(vpc: IVpc, service: EndpointDefinition, interfaceTag: ServiceEndpointTypeEnum) {
  vpc.addGatewayEndpoint(interfaceTag, {
    service: service.endpointGatewayService as GatewayVpcEndpointAwsService,
  });
}

function CheckIfEndpointAlreadyExists(vpc: IVpc, interfaceTag: ServiceEndpointTypeEnum): boolean {
  return vpc.node.children.some((child) => child.node.id === interfaceTag);
}

const endpointSettings: EndpointDefinition[] = [
  {
    endpointName: ServiceEndpointTypeEnum.DYNAMODB,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: GatewayVpcEndpointAwsService.DYNAMODB,
  },
  {
    endpointName: ServiceEndpointTypeEnum.S3,
    endpointType: EndpointTypes.GATEWAY,
    endpointGatewayService: GatewayVpcEndpointAwsService.S3,
  },
  {
    endpointName: ServiceEndpointTypeEnum.STEP_FUNCTIONS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.STEP_FUNCTIONS,
  },
  {
    endpointName: ServiceEndpointTypeEnum.SNS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SNS,
  },
  {
    endpointName: ServiceEndpointTypeEnum.SQS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SQS,
  },
  {
    endpointName: ServiceEndpointTypeEnum.SAGEMAKER_RUNTIME,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SAGEMAKER_RUNTIME,
  },
  {
    endpointName: ServiceEndpointTypeEnum.SECRETS_MANAGER,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SECRETS_MANAGER,
  },
  {
    endpointName: ServiceEndpointTypeEnum.SSM,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.SSM,
  },
  {
    endpointName: ServiceEndpointTypeEnum.ECR_API,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.ECR,
  },
  {
    endpointName: ServiceEndpointTypeEnum.ECR_DKR,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.ECR_DOCKER,
  },
  {
    endpointName: ServiceEndpointTypeEnum.EVENTS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.CLOUDWATCH_EVENTS,
  },
  {
    endpointName: ServiceEndpointTypeEnum.KINESIS_FIREHOSE,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KINESIS_FIREHOSE,
  },
  {
    endpointName: ServiceEndpointTypeEnum.KINESIS_STREAMS,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KINESIS_STREAMS,
  },
  {
    endpointName: ServiceEndpointTypeEnum.KENDRA,
    endpointType: EndpointTypes.INTERFACE,
    endpointInterfaceService: InterfaceVpcEndpointAwsService.KENDRA,
  },
];

export function AddAwsServiceEndpoint(
  scope: Construct,
  vpc: IVpc,
  interfaceTag: ServiceEndpointTypeEnum,
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
