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
import { Construct } from 'constructs';


export interface VpcPropsSet {
  readonly existingVpc?: ec2.IVpc;
  readonly vpcProps?: ec2.VpcProps;
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
  readonly existingVpc?: ec2.IVpc;
  /**
   * One of the default VPC configurations available in vpc-defaults
   */
  //readonly defaultVpcProps: ec2.VpcProps;
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

export function buildVpc(scope: Construct, props: BuildVpcProps): ec2.IVpc {
  if (props?.existingVpc) {
    return props?.existingVpc;
  }

  let defaultVpcProps=DefaultVpcProps();

  let cumulativeProps: ec2.VpcProps = defaultVpcProps;

  // Merge props provided by construct builder and by the end user
  // If user provided props are empty, the vpc will use only the builder provided props
  //cumulativeProps = consolidateProps(cumulativeProps, props?.userVpcProps, props?.constructVpcProps);
  const vpc = new ec2.Vpc(scope, 'Vpc', cumulativeProps);
  return vpc;

}

// get subnet id for passed vpc.
export function getPrivateSubnetIDs (vpc: ec2.IVpc): string [] {
  return vpc.privateSubnets.map(subnet => subnet.subnetId);
}

// get lambda security group for passed VPC
export function getlambdaSecuritygroup(scope: Construct, vpc: ec2.IVpc) : ec2.SecurityGroup {
  let lambdaSecurityGroup= new ec2.SecurityGroup(scope, 'lambdaSecurityGroup', {
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
function DefaultVpcProps(): ec2.VpcProps {
  return {
    subnetConfiguration: [
      {
        name: 'public',
        subnetType: ec2.SubnetType.PUBLIC,
        cidrMask: 24,
      },
      {
        name: 'private',
        subnetType: ec2.SubnetType.PRIVATE_WITH_EGRESS,
        cidrMask: 24,
      },
      {
        name: 'isolated',
        subnetType: ec2.SubnetType.PRIVATE_ISOLATED,
        cidrMask: 24,
      },
    ],
    ipAddresses: ec2.IpAddresses.cidr('10.0.0.0/16'),
  };
}