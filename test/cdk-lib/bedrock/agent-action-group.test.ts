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
import { Annotations, Match } from 'aws-cdk-lib/assertions';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import { NagSuppressions } from 'cdk-nag';
import * as bedrock from '../../../src/cdk-lib/bedrock';

// mock lambda.Code.fromDockerBuild()
jest.mock('aws-cdk-lib/aws-lambda', () => {
  const actualLambda = jest.requireActual('aws-cdk-lib/aws-lambda');
  return {
    ...actualLambda,
    Code: {
      ...actualLambda.Code,
      fromDockerBuild: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
      fromAsset: jest.fn(() => actualLambda.Code.fromInline('mockCode')),
    },
  };
});

describe('AgentActionGroup', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  //let agent: bedrock.Agent;
  let actionGroupFunction: lambda.Function;
  const actionGroupAPISpec = 'mockApiSpec';

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'test-stack', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });

    // agent = new bedrock.Agent(stack, 'Agent', {
    //   foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    //   instruction: 'You provide support for developers working with CDK constructs.',
    //   idleSessionTTL: cdk.Duration.minutes(30),

    // });

    actionGroupFunction = new lambda.Function(stack, 'ActionGroupFunction', {
      code: lambda.Code.fromAsset('test/path'),
      runtime: lambda.Runtime.NODEJS_LATEST,
      handler: 'index.handler',
    });

    NagSuppressions.addResourceSuppressions(
      actionGroupFunction,
      [
        {
          id: 'AwsSolutions-IAM4',
          reason: 'ActionGroup Lambda uses the AWSLambdaBasicExecutionRole AWS Managed Policy.',
        },
      ],
      true,
    );
  });
  // moved to Agent.ts

  // test('actionGroupExecutor invocation policy is configured', () =>{
  //   new bedrock.AgentActionGroup(stack, 'ActionGroup', {
  //     description: 'Use these functions to get information about the books in the Project Gutenburg library.',
  //     actionGroupExecutor: actionGroupFunction,
  //     actionGroupState: 'ENABLED',
  //     apiSchema: bedrock.ApiSchema.fromInline(actionGroupAPISpec),
  //   });

  //   const template = Template.fromStack(stack);
  //   template.hasResourceProperties('AWS::Lambda::Permission', {
  //     Action: 'lambda:InvokeFunction',
  //     Principal: 'bedrock.amazonaws.com',
  //     SourceAccount: '123456789012',
  //   });
  // });

  test('Fails when both description and parentActionGroupSignature are provided', () => {
    expect(() => {
      new bedrock.AgentActionGroup(stack, 'ActionGroup', {
        actionGroupName: 'GetBookInformation',
        description: 'Use these functions to get information about the books in the Project Gutenburg library.',
        parentActionGroupSignature: 'AMAZON.UserInput',
        actionGroupExecutor: actionGroupFunction,
        actionGroupState: 'ENABLED',
        apiSchema: bedrock.ApiSchema.fromInline(actionGroupAPISpec),
      });
    }).toThrowError('Cannot specify both description and parentActionSignature');
  });

  // test('ApiSchema from S3', () => {
  //   const bucket = new s3.Bucket(stack, 'TestBucket');
  //   new bedrock.AgentActionGroup(stack, 'ActionGroup', {
  //     agent,
  //     description: 'Use these functions to get information about the books in the Project Gutenburg library.',
  //     actionGroupExecutor: actionGroupFunction,
  //     actionGroupState: 'ENABLED',
  //     apiSchema: bedrock.ApiSchema.fromBucket(bucket, 'test/api.yaml'),
  //   });
  //   const template = Template.fromStack(stack);
  //   template.hasResourceProperties('AWS::Bedrock::Agent', {
  //     apiSchema: {
  //       s3: {
  //         s3BucketName: {
  //           Ref: Match.stringLikeRegexp('^TestBucket'),
  //         },
  //         s3ObjectKey: 'test/api.yaml',
  //       },
  //     },
  //   });

  // });

  test('No unsuppressed Errors', () => {
    new bedrock.AgentActionGroup(stack, 'ActionGroup', {
      actionGroupName: 'GetBookInformation',
      description: 'Use these functions to get information about the books in the Project Gutenburg library.',
      actionGroupExecutor: actionGroupFunction,
      actionGroupState: 'ENABLED',
      apiSchema: bedrock.ApiSchema.fromInline(actionGroupAPISpec),
    });
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    expect(errors).toHaveLength(0);
  });
});