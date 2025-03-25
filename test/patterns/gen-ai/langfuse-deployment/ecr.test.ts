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

// External Dependencies:
import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks } from 'cdk-nag';

// Local Dependencies:
import { ECRRepoAndDockerImage } from '../../../../src/patterns/gen-ai/langfuse-deployment/ecr';

describe('ECRRepoAndDockerImage construct', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'TestStack', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
  });

  test('applies expected default props', () => {
    new ECRRepoAndDockerImage(stack, 'TestCache', {
      // Arbitrary AWS ECR Public image to test the construct works:
      dockerImageName: 'public.ecr.aws/sam/build-python3.13',
    });
    const template = Template.fromStack(stack);

    template.hasResourceProperties('AWS::ECR::Repository', {
      EmptyOnDelete: true,
    });
  });
});
