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
import { Match, Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';
import { addRolePolicies, createIAMRoleWithBasicExecutionPolicy } from '../../../../src/common/helpers/iam-roles-helper';

describe('iam-roles-helper', () => {
  describe('createIAMRoleWithBasicExecutionPolicy', () => {
    it('creates an IAM role with a basic execution policy', () => {
      let app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new cdk.Stack(app);
      const roleId = 'TestRole';
      const roleDescription = 'Test Description';

      createIAMRoleWithBasicExecutionPolicy(stack, roleId, roleDescription);

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Role', {
        Description: roleDescription,
        AssumeRolePolicyDocument: Match.objectLike({
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: { Service: 'lambda.amazonaws.com' },
            },
          ],
        }),
      });

    });
  });
  describe('addRolePolicies', () => {
    it('adds policy statements to the IAM role', () => {
      let app = new cdk.App();
      cdk.Aspects.of(app).add(new AwsSolutionsChecks());
      const stack = new cdk.Stack(app);
      const role = createIAMRoleWithBasicExecutionPolicy(stack, 'TestRole', 'Test Description');

      addRolePolicies(role, [{
        actions: ['s3:GetObject'],
        resources: ['arn:aws:s3:::example-bucket/*'],
      }]);

      const template = Template.fromStack(stack);

      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: Match.objectLike({
          Statement: [
            {
              Action: 's3:GetObject',
              Effect: 'Allow',
              Resource: 'arn:aws:s3:::example-bucket/*',
            },
          ],
        }),
      });
    });
  });
});
