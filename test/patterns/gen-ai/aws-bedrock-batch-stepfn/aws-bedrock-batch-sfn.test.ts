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

import { App, Aspects, Aws, aws_iam as iam, aws_s3 as s3, aws_stepfunctions as sfn, Duration, Stack } from 'aws-cdk-lib';
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import { AwsSolutionsChecks, NagSuppressions } from 'cdk-nag';
import { BedrockBatchSfn } from '../../../../src/patterns/gen-ai/aws-bedrock-batch-stepfn';

describe('Bedrock Batch SFN Construct', () => {
  let app: App;
  let stack: Stack;
  let template: Template;
  let bedrockBatchSfnFragment: BedrockBatchSfn;
  let batchBucket: s3.Bucket;

  beforeAll(() => {
    app = new App({
      context: {
        'aws:cdk:bundling-stacks': [],
      },
    });
    Aspects.of(app).add(new AwsSolutionsChecks());
    stack = new Stack(app, 'BedrockBatchSfnTestStack', {
      env: { account: Aws.ACCOUNT_ID, region: Aws.REGION },
    });

    batchBucket = new s3.Bucket(stack, 'BedrockBatchBucket');
    NagSuppressions.addResourceSuppressions(batchBucket, [
      {
        id: 'AwsSolutions-S1',
        reason: 'This is a test bucket',
      },
      {
        id: 'AwsSolutions-S10',
        reason: 'This is a test bucket',
      },
    ]);

    const batchPolicy = new iam.ManagedPolicy(stack, 'BatchPolicy', {});

    batchPolicy.addStatements(
      new iam.PolicyStatement({
        sid: 'Inference',
        actions: ['bedrock:InvokeModel', 'bedrock:CreateModelInvocationJob'],
        resources: [
          `arn:aws:bedrock:${stack.region}::foundation-model/*`,
        ],
      }),
    );

    NagSuppressions.addResourceSuppressions(batchPolicy, [
      {
        id: 'AwsSolutions-IAM5',
        reason: 'This is a test role',
      },
    ]);

    bedrockBatchSfnFragment = new BedrockBatchSfn(stack, 'AwsBedrockBatchSfn', {
      bedrockBatchInputBucket: batchBucket,
      bedrockBatchOutputBucket: batchBucket,
      bedrockBatchPolicy: batchPolicy,
      timeout: Duration.hours(48),
    });

    const inputState = new sfn.Pass(stack, 'InputState', {
      parameters: {
        job_name: 'test_job',
        manifest_keys: ['test_key.jsonl'],
        model_id: 'test.model-v1',
      },
    });

    const outputState = new sfn.Pass(stack, 'OutputState');

    const failState = new sfn.Fail(stack, 'FailState', {
      causePath: sfn.JsonPath.stringAt('$.cause'),
      errorPath: sfn.JsonPath.stringAt('$.error'),
    });

    const chain = inputState
      .next(bedrockBatchSfnFragment)
      .next(outputState);

    bedrockBatchSfnFragment.endStates.map((endState) => {
      if (endState instanceof sfn.TaskStateBase) {
        endState.addCatch(failState);
      }
    });

    const stateMachine = new sfn.StateMachine(stack, 'StateMachine', {
      definitionBody: sfn.DefinitionBody.fromChainable(chain),
    });

    NagSuppressions.addResourceSuppressions(stateMachine, [
      {
        id: 'AwsSolutions-IAM5',
        reason: 'This is a test role',
      },
      {
        id: 'AwsSolutions-SF1',
        reason: 'This is a test state machine',
      },
      {
        id: 'AwsSolutions-SF2',
        reason: 'This is a test state machine',
      },
    ], true);

    template = Template.fromStack(stack);
  });

  test('No unsuppressed CDK Nag Errors', () => {
    const errors = Annotations.fromStack(stack).findError(
      '*',
      Match.stringLikeRegexp('AwsSolutions-.*'),
    );
    const errorData = errors.map((error) => error.entry.data);
    expect(errorData).toHaveLength(0);
  });

  test('Lambda function count', () => {
    template.resourceCountIs('AWS::Lambda::Function', 2);
  });

  test('Single BedrockInferenceJobEventHandler exists', () => {
    // Assert that the BedrockInferenceJobEventHandler exists with a node id including "BedrockInferenceJobEventHandler330899f022e34160002006bb8b09cc5b"
    const lambdas = template.findResources('AWS::Lambda::Function');
    const lambdaIds = Object.keys(lambdas);
    const bedrockInferenceJobEventHandlerIds = lambdaIds.filter((id) => id.includes('BedrockInferenceJobEventHandler330899f022e34160002006bb8b09cc5b'));
    expect(bedrockInferenceJobEventHandlerIds.length).toBe(1);
  });

  test('BedrockInferenceJobEventHandler can read the output bucket', () => {
    const policies = template.findResources('AWS::IAM::Policy', {
      Properties: {
        PolicyDocument: {
          Statement: Match.arrayWith([
            Match.objectLike({
              Action: [
                's3:GetObject*',
                's3:GetBucket*',
                's3:List*',
              ],
              Effect: 'Allow',
              Resource: Match.arrayWith([
                {
                  'Fn::GetAtt': [
                    Match.stringLikeRegexp(batchBucket.node.id),
                    'Arn',
                  ],
                },
              ]),
            }),
          ]),
        },
      },
    });
    const policyIds = Object.keys(policies);
    const bedrockInferenceJobEventHandlerPolicyIds = policyIds.filter((id) => id.includes('BedrockInferenceJobEventHandler330899f022e34160002006bb8b09cc5b'));
    expect(bedrockInferenceJobEventHandlerPolicyIds.length).toBe(1);
  });

  test('state machine includes create model invocation job task with wait for task token', () => {
    template.hasResourceProperties('AWS::StepFunctions::StateMachine', {
      DefinitionString: {
        'Fn::Join': [
          '',
          Match.arrayWith([
            Match.stringLikeRegexp('"CreateModelInvocationJobTask":{"End":true,'),
            Match.stringLikeRegexp(':states:::lambda:invoke.waitForTaskToken'),
          ]),
        ],
      },
    });
  });
});
