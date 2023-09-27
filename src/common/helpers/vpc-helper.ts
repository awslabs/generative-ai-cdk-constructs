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