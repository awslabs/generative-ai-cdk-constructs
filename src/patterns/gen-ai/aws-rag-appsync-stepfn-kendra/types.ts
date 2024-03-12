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
import * as ec2 from 'aws-cdk-lib/aws-ec2';
import * as kendra from 'aws-cdk-lib/aws-kendra';
import { ServiceEndpointTypes } from './index';

export enum EndpointTypes {
  GATEWAY = 'Gateway',
  INTERFACE = 'Interface',
}

export interface EndpointDefinition {
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
  readonly peer: ec2.IPeer; // example: ec2.Peer.ipV4(vpc.vpcCiderBlock)
  readonly connection: ec2.Port;
  readonly description?: string;
  readonly remoteRule?: boolean;
}


/**
 * The CFN NAG suppress rule interface
 * @interface CfnNagSuppressRule
 */
export interface CfnNagSuppressRule {
  readonly id: string;
  readonly reason: string;
}

export enum ServiceEndpointTypeEnum {
  DYNAMODB= 'DDB',
  ECR_API= 'ECR_API',
  ECR_DKR= 'ECR_DKR',
  EVENTS= 'CLOUDWATCH_EVENTS',
  KENDRA= 'KENDRA',
  KINESIS_FIREHOSE= 'KINESIS_FIREHOSE',
  KINESIS_STREAMS= 'KINESIS_STREAMS',
  S3= 'S3',
  SAGEMAKER_RUNTIME= 'SAGEMAKER_RUNTIME',
  SECRETS_MANAGER= 'SECRETS_MANAGER',
  SNS= 'SNS',
  SQS= 'SQS',
  SSM= 'SSM',
  STEP_FUNCTIONS= 'STEP_FUNCTIONS',
}

export interface ServiceEndpointTypes {
  DYNAMODB: 'DDB';
  ECR_API: 'ECR_API';
  ECR_DKR: 'ECR_DKR';
  EVENTS: 'CLOUDWATCH_EVENTS';
  KENDRA: 'KENDRA';
  KINESIS_FIREHOSE: 'KINESIS_FIREHOSE';
  KINESIS_STREAMS: 'KINESIS_STREAMS';
  S3: 'S3';
  SAGEMAKER_RUNTIME: 'SAGEMAKER_RUNTIME';
  SECRETS_MANAGER: 'SECRETS_MANAGER';
  SNS: 'SNS';
  SQS: 'SQS';
  SSM: 'SSM';
  STEP_FUNCTIONS: 'STEP_FUNCTIONS';
}
