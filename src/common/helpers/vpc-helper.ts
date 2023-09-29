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
import { Construct } from "constructs";

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

export function buildVpc(scope: Construct, props: BuildVpcProps): ec2.IVpc {
  if (props?.existingVpc) {
    return props?.existingVpc;
  }
  
  let cumulativeProps: ec2.VpcProps = props?.defaultVpcProps;

  // Merge props provided by construct builder and by the end user
  // If user provided props are empty, the vpc will use only the builder provided props
  //cumulativeProps = consolidateProps(cumulativeProps, props?.userVpcProps, props?.constructVpcProps);

  const vpc = new ec2.Vpc(scope, "Vpc", cumulativeProps);

  return vpc;
}