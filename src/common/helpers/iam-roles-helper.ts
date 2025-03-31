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

import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

export function createIAMRoleWithBasicExecutionPolicy(
  cdkStack: Construct,
  roleId: string,
  roleDescription: string,
): cdk.aws_iam.Role {
  const role = new cdk.aws_iam.Role(
    cdkStack,
    roleId,
    {
      description: roleDescription,
      assumedBy: new cdk.aws_iam.ServicePrincipal('lambda.amazonaws.com'),
    },
  );

  role.addManagedPolicy(
    cdk.aws_iam.ManagedPolicy.fromAwsManagedPolicyName(
      'service-role/AWSLambdaBasicExecutionRole',
    ),
  );

  return role;
}

export function addRolePolicies(role: cdk.aws_iam.Role, statements: cdk.aws_iam.PolicyStatementProps[]): cdk.aws_iam.Role {
  statements.forEach(props => {
    role.addToPolicy(new cdk.aws_iam.PolicyStatement(props));
  });
  return role;
}
