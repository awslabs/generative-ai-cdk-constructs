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
import { Function, IFunction } from 'aws-cdk-lib/aws-lambda';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import * as bedrock from '../../../../src/cdk-lib/bedrock';

describe('Action Groups', () => {
  /*******************************************************
   *                Action Group Executors				       *
   *******************************************************/
  describe('w/ Executors', () => {
    let stack: cdk.Stack;
    let agent: bedrock.Agent;
    let sampleLambda: IFunction;

    beforeEach(() => {
      const app = new cdk.App();
      stack = new cdk.Stack(app, 'TestStack');
      agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });
      sampleLambda = Function.fromFunctionAttributes(stack, 'myLambda', {
        functionArn: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
        sameEnvironment: true,
      });
    });

    test('Default Action Groups (Code, Input) - Disabled', () => {
      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'UserInputAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.UserInput',
            SkipResourceInUseCheckOnDelete: false,
          },
          {
            ActionGroupName: 'CodeInterpreterAction',
            ActionGroupState: 'DISABLED',
            ParentActionGroupSignature: 'AMAZON.CodeInterpreter',
            SkipResourceInUseCheckOnDelete: false,
          },
        ]),
      });
    });

    test('Default Action Groups (Code, Input) - Enabled', () => {
      // THEN
      new bedrock.Agent(stack, 'TestAgent2', {
        name: 'TestAgent2',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        userInputEnabled: true,
        codeInterpreterEnabled: true,
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent2',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'UserInputAction',
            ActionGroupState: 'ENABLED',
            ParentActionGroupSignature: 'AMAZON.UserInput',
            SkipResourceInUseCheckOnDelete: false,
          },
          {
            ActionGroupName: 'CodeInterpreterAction',
            ActionGroupState: 'ENABLED',
            ParentActionGroupSignature: 'AMAZON.CodeInterpreter',
            SkipResourceInUseCheckOnDelete: false,
          },
        ]),
      });
    });

    test('Core Creation - RETURN CONTROL', () => {
      // WHEN
      const myActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.RETURN_CONTROL,
      });
      agent.addActionGroup(myActionGroup);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'TestActionGroup',
            Description: 'This is a test action group',
            ActionGroupState: 'ENABLED',
            ActionGroupExecutor: {
              CustomControl: 'RETURN_CONTROL',
              Lambda: Match.absent(),
            },
            SkipResourceInUseCheckOnDelete: false,
          },
        ]),
      });
    });

    test('Core Creation - LAMBDA', () => {
      // WHEN
      const myActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.fromlambdaFunction(sampleLambda),
      });
      agent.addActionGroup(myActionGroup);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'TestActionGroup',
            Description: 'This is a test action group',
            ActionGroupState: 'ENABLED',
            SkipResourceInUseCheckOnDelete: false,
            ActionGroupExecutor: {
              CustomControl: Match.absent(),
              Lambda: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
            },
          },
        ]),
      });
    });
  });

  /*******************************************************
   *                API SCHEMAS			                     *
   *******************************************************/
  describe('w/ API Schemas', () => {
    let stack: cdk.Stack;
    let agent: bedrock.Agent;

    beforeEach(() => {
      const app = new cdk.App();
      stack = new cdk.Stack(app, 'TestStack');
      agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        description: 'This is a test agent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
      });
    });

    test('Local Asset', () => {
      // WHEN
      const myActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.RETURN_CONTROL,
        apiSchema: bedrock.ApiSchema.fromLocalAsset(__dirname + '/api-schema.yaml'),
      });
      agent.addActionGroup(myActionGroup);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'TestActionGroup',
            Description: 'This is a test action group',
            ActionGroupState: 'ENABLED',
            SkipResourceInUseCheckOnDelete: false,
            ActionGroupExecutor: Match.anyValue(),
            ApiSchema: {
              Payload: Match.stringLikeRegexp('openapi: 3.0.3.*'),
              S3: Match.absent(),
            },
          },
        ]),
      });
    });

    test('Inline', () => {
      // WHEN
      const myActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.RETURN_CONTROL,
        apiSchema: bedrock.ApiSchema.fromInline('some inline schema'),
      });
      agent.addActionGroup(myActionGroup);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'TestActionGroup',
            Description: 'This is a test action group',
            ActionGroupState: 'ENABLED',
            SkipResourceInUseCheckOnDelete: false,
            ActionGroupExecutor: Match.anyValue(),
            ApiSchema: {
              Payload: 'some inline schema',
              S3: Match.absent(),
            },
          },
        ]),
      });
    });

    test('S3 File', () => {
      // WHEN
      const myBucket = Bucket.fromBucketArn(stack, 'MyBucket', 'arn:aws:s3:::my-bucket-name');
      const myActionGroup = new bedrock.AgentActionGroup({
        name: 'TestActionGroup',
        description: 'This is a test action group',
        executor: bedrock.ActionGroupExecutor.RETURN_CONTROL,
        apiSchema: bedrock.ApiSchema.fromS3File(myBucket, 'schema-file.yaml'),
      });
      agent.addActionGroup(myActionGroup);

      // THEN
      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Description: 'This is a test agent',
        Instruction: 'This is a test instruction',
        ActionGroups: Match.arrayWith([
          {
            ActionGroupName: 'TestActionGroup',
            Description: 'This is a test action group',
            ActionGroupState: 'ENABLED',
            SkipResourceInUseCheckOnDelete: false,
            ActionGroupExecutor: Match.anyValue(),
            ApiSchema: {
              Payload: Match.absent(),
              S3: {
                S3BucketName: 'my-bucket-name',
                S3ObjectKey: 'schema-file.yaml',
              },
            },
          },
        ]),
      });
    });
  });
});
