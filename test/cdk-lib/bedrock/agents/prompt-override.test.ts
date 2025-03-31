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
import { Function } from 'aws-cdk-lib/aws-lambda';
import * as bedrock from '../../../../src/cdk-lib/bedrock';
import { AgentStepType, PromptOverrideConfiguration } from '../../../../src/cdk-lib/bedrock/agents/prompt-override';

describe('Prompt Override', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });
  /*******************************************************
   *                Basic Configurations			     *
   *******************************************************/
  describe('w/ Valid Configs', () => {
    test('Basic - Custom Parser', () => {
      const lambdaFunction = Function.fromFunctionArn(
        stack,
        'LambdaFunction',
        'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
      );
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        promptOverrideConfiguration: PromptOverrideConfiguration.withCustomParser({
          parser: lambdaFunction,
          steps: [
            {
              stepType: AgentStepType.PRE_PROCESSING,
              stepEnabled: true,
              useCustomParser: true,
              inferenceConfig: {
                temperature: 0,
                topP: 1.0,
                topK: 250,
                maximumLength: 2048,
                stopSequences: ['</function_call>', '</answer>', '</error>'],
              },
            },
            {
              stepType: AgentStepType.ORCHESTRATION,
              stepEnabled: false,
              useCustomParser: false,
            },
          ],
        }),
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        PromptOverrideConfiguration: {
          OverrideLambda: 'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
          PromptConfigurations: [
            {
              BasePromptTemplate: Match.absent(),
              InferenceConfiguration: {
                Temperature: 0,
                TopP: 1.0,
                TopK: 250,
                MaximumLength: 2048,
                StopSequences: ['</function_call>', '</answer>', '</error>'],
              },
              ParserMode: 'OVERRIDDEN',
              PromptCreationMode: Match.absent(),
              PromptState: 'ENABLED',
              PromptType: 'PRE_PROCESSING',
            },
            {
              BasePromptTemplate: Match.absent(),
              InferenceConfiguration: Match.absent(),
              ParserMode: 'DEFAULT',
              PromptCreationMode: Match.absent(),
              PromptState: 'DISABLED',
              PromptType: 'ORCHESTRATION',
            },
          ],
        },
      });
      expect(agent.promptOverrideConfiguration).toBeDefined();
      expect(agent.promptOverrideConfiguration?.parser).toBe(lambdaFunction);
      expect(agent.promptOverrideConfiguration?.steps).toHaveLength(2);
    });

    test('Basic - No Parser', () => {
      const agent = new bedrock.Agent(stack, 'TestAgent', {
        name: 'TestAgent',
        foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
        instruction: 'This is a test instruction',
        promptOverrideConfiguration: PromptOverrideConfiguration.fromSteps([
          {
            stepType: AgentStepType.PRE_PROCESSING,
            stepEnabled: true,
            inferenceConfig: {
              temperature: 0,
              topP: 1.0,
              topK: 250,
              maximumLength: 2048,
              stopSequences: ['</function_call>', '</answer>', '</error>'],
            },
          },
          {
            stepType: AgentStepType.ORCHESTRATION,
            stepEnabled: false,
          },
        ]),
      });

      Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
        AgentName: 'TestAgent',
        Instruction: 'This is a test instruction',
        PromptOverrideConfiguration: {
          OverrideLambda: Match.absent(),
          PromptConfigurations: [
            {
              BasePromptTemplate: Match.absent(),
              InferenceConfiguration: {
                Temperature: 0,
                TopP: 1.0,
                TopK: 250,
                MaximumLength: 2048,
                StopSequences: ['</function_call>', '</answer>', '</error>'],
              },
              ParserMode: Match.absent(),
              PromptCreationMode: Match.absent(),
              PromptState: 'ENABLED',
              PromptType: 'PRE_PROCESSING',
            },
            {
              BasePromptTemplate: Match.absent(),
              InferenceConfiguration: Match.absent(),
              ParserMode: Match.absent(),
              PromptCreationMode: Match.absent(),
              PromptState: 'DISABLED',
              PromptType: 'ORCHESTRATION',
            },
          ],
        },
      });
      expect(agent.promptOverrideConfiguration).toBeDefined();
      expect(agent.promptOverrideConfiguration?.parser).toBeUndefined();
      expect(agent.promptOverrideConfiguration?.steps).toHaveLength(2);
    });
  });
  /*******************************************************
   *               Invalid Configurations			     *
   *******************************************************/
  describe('w/ Invalid Configs', () => {
    test('Invalid Inference Config', () => {
      const lambdaFunction = Function.fromFunctionArn(
        stack,
        'LambdaFunction',
        'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
      );
      expect(() =>
        PromptOverrideConfiguration.withCustomParser({
          parser: lambdaFunction,
          steps: [
            {
              stepType: AgentStepType.PRE_PROCESSING,
              stepEnabled: true,
              useCustomParser: true,
              inferenceConfig: {
                temperature: -1,
                topP: 1.2,
                topK: 10000,
                maximumLength: 91119,
                stopSequences: ['</function_call>', '</answer>', '</error>', '</output>', '</response>'],
              },
            },
          ],
        }),
      ).toThrow(
        'Step PRE_PROCESSING: Temperature must be between 0 and 1, TopP must be between 0 and 1, ' +
          'TopK must be between 0 and 500, Maximum 4 stop sequences allowed, MaximumLength must be between 0 and 4096',
      );
    });

    test('Invalid Custom Parsing Config', () => {
      const lambdaFunction = Function.fromFunctionArn(
        stack,
        'LambdaFunction',
        'arn:aws:lambda:us-east-1:123456789012:function:BedrockAgents-ActionGroup-zx7xWhBeRC0Z',
      );
      expect(() =>
        PromptOverrideConfiguration.withCustomParser({
          parser: lambdaFunction,
          steps: [
            {
              stepType: AgentStepType.PRE_PROCESSING,
              stepEnabled: true,
              useCustomParser: false,
            },
          ],
        }),
      ).toThrow('At least one step must use custom parser');
    });
  });
});
