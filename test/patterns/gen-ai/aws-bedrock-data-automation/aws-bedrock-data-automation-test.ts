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
import { Template } from 'aws-cdk-lib/assertions';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { AwsSolutionsChecks } from 'cdk-nag';
import { BedrockDataAutomation } from '../../../../src/patterns/gen-ai/aws-bedrock-data-automation';

describe('BedrockDataAutomation Construct', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let template: Template;

  beforeEach(() => {
    app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new cdk.Stack(app, 'undefined', {
      env: { account: cdk.Aws.ACCOUNT_ID, region: cdk.Aws.REGION },
    });
  });

  describe('Blueprint Resources', () => {
    beforeEach(() => {
      // Create construct with only blueprint required
      new BedrockDataAutomation(stack, 'TestConstruct', {
        isCustomBDABlueprintRequired: true,
        isBDAProjectRequired: false,
        isBDAInvocationRequired: false,
        isStatusRequired: false,
      });
      template = Template.fromStack(stack);
    });

    test('creates input bucket when no bucket name provided', () => {
      template.hasResourceProperties('AWS::S3::Bucket', {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: 'AES256',
              },
            },
          ],
        },
        PublicAccessBlockConfiguration: {
          BlockPublicAcls: true,
          BlockPublicPolicy: true,
          IgnorePublicAcls: true,
          RestrictPublicBuckets: true,
        },
        VersioningConfiguration: {
          Status: 'Enabled',
        },
      });
    });

    test('creates blueprint lambda function', () => {
      template.hasResourceProperties('AWS::Lambda::Function', {
        Handler: 'index.handler',
        Runtime: 'nodejs18.x',
        Environment: {
          Variables: {
            INPUT_BUCKET: {
              Ref: expect.any(String),
            },
          },
        },
      });
    });

    test('creates lambda role with correct policies', () => {
      template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
            },
          ],
        },
      });

      // Check for S3 policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: expect.arrayContaining([
            expect.objectContaining({
              Action: [
                's3:GetObject',
                's3:PutObject',
                's3:ListBucket',
              ],
              Effect: 'Allow',
            }),
          ]),
        },
      });

      // Check for Bedrock policy
      template.hasResourceProperties('AWS::IAM::Policy', {
        PolicyDocument: {
          Statement: expect.arrayContaining([
            expect.objectContaining({
              Action: ['bedrock:*'],
              Effect: 'Allow',
              Resource: '*',
            }),
          ]),
        },
      });
    });
  });

  describe('Project Resources', () => {
    beforeEach(() => {
      new BedrockDataAutomation(stack, 'TestConstruct', {
        isCustomBDABlueprintRequired: false,
        isBDAProjectRequired: true,
        isBDAInvocationRequired: false,
        isStatusRequired: false,
      });
      template = Template.fromStack(stack);
    });

    test('creates project function role with correct policies', () => {
      template.hasResourceProperties('AWS::IAM::Role', {
        AssumeRolePolicyDocument: {
          Statement: [
            {
              Action: 'sts:AssumeRole',
              Effect: 'Allow',
              Principal: {
                Service: 'lambda.amazonaws.com',
              },
            },
          ],
        },
      });
    });
  });

  describe('Invocation Resources', () => {
    test('throws error when input bucket not provided', () => {
      expect(() => {
        new BedrockDataAutomation(stack, 'TestConstruct', {
          isCustomBDABlueprintRequired: false,
          isBDAProjectRequired: false,
          isBDAInvocationRequired: true,
          isStatusRequired: false,
        });
      }).toThrow('Input bucket is required when isBDAInvocationRequired is true');
    });

    test('creates output bucket and uses existing input bucket', () => {
      const inputBucket = new s3.Bucket(stack, 'testBucket');

      new BedrockDataAutomation(stack, 'TestConstruct', {
        isCustomBDABlueprintRequired: false,
        isBDAProjectRequired: false,
        isBDAInvocationRequired: true,
        isStatusRequired: false,
        inputBucket: inputBucket,
      });

      template = Template.fromStack(stack);

      // Check output bucket is created
      template.hasResourceProperties('AWS::S3::Bucket', {
        BucketEncryption: {
          ServerSideEncryptionConfiguration: [
            {
              ServerSideEncryptionByDefault: {
                SSEAlgorithm: 'AES256',
              },
            },
          ],
        },
      });
    });
  });

  describe('Resource Access', () => {
    test('allows access to created resources', () => {
      const construct = new BedrockDataAutomation(stack, 'TestConstruct', {
        isCustomBDABlueprintRequired: true,
        isBDAProjectRequired: false,
        isBDAInvocationRequired: false,
        isStatusRequired: false,
      });

      expect(construct.bdaInputBucket).toBeDefined();
      expect(construct.bdaBlueprintLambdaFunction).toBeDefined();
    });
  });
});
