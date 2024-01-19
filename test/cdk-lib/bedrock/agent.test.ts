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
import { Annotations, Match, Template } from 'aws-cdk-lib/assertions';
import * as s3 from 'aws-cdk-lib/aws-s3';
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

let app: cdk.App;
let stack: cdk.Stack;
let kb: bedrock.KnowledgeBase;

beforeAll(() => {
  app = new cdk.App();
  stack = new cdk.Stack(app, 'test-stack', {
    env: {
      account: '123456789012',
      region: 'us-east-1',
    },
  });
  const bucket = new s3.Bucket(stack, 'DocBucket');
  kb = new bedrock.KnowledgeBase(stack, 'KB', {
    embeddingsModel: bedrock.BedrockKBEmbeddingsModel.TITAN_EMBED_TEXT_V1,
    description: 'Documentation about CDK constructs.',
  });
  new bedrock.S3DataSource(stack, 'DataSource', {
    bucket,
    knowledgeBase: kb,
    dataSourceName: 'test-docs',
  });

  const preprocessingPrompt: bedrock.PromptConfiguration = {
    promptType: bedrock.PromptType.PRE_PROCESSING,
    promptState: bedrock.PromptState.DISABLED,
    promptCreationMode: bedrock.PromptCreationMode.OVERRIDDEN,
    basePromptTemplate: 'This prompt is disabled.',
    inferenceConfiguration: {
      temperature: 0,
      topP: 1.0,
      topK: 0,
      maximumLength: 0,
      stopSequences: [],
    },
  };

  const orchestrationPrompt: bedrock.PromptConfiguration = {
    promptType: bedrock.PromptType.ORCHESTRATION,
    promptState: bedrock.PromptState.ENABLED,
    promptCreationMode: bedrock.PromptCreationMode.OVERRIDDEN,
    basePromptTemplate: 'This prompt is enabled.',
    inferenceConfiguration: {
      temperature: 0,
      topP: 1.0,
      topK: 250,
      maximumLength: 2048,
      stopSequences: ['</function_call>', '</answer>', '</error>'],
    },
  };

  new bedrock.Agent(stack, 'Agent', {
    foundationModel: bedrock.BedrockAgentsFoundationModel.ANTHROPIC_CLAUDE_V2_1,
    instruction: 'You provide support for developers working with CDK constructs.',
    knowledgeBases: [kb],
    idleSessionTTL: cdk.Duration.minutes(30),
    promptOverrideConfiguration: {
      promptConfigurations: [preprocessingPrompt, orchestrationPrompt],
    },
  });
});

describe('Bedrock Agents', () => {
  describe('Knowledge Base', () => {
    test('Knowledge Base is created', () => {
      Template.fromStack(stack).hasResourceProperties('Custom::Bedrock-KnowledgeBase', {
        description: 'Documentation about CDK constructs.',
        name: Match.stringLikeRegexp('^KB'),
        knowledgeBaseConfiguration: {
          type: 'VECTOR',
          vectorKnowledgeBaseConfiguration: {
            embeddingModelArn: 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',
          },
        },
      });
    });
  });

  describe('Data Source', () => {
    test('Data Source is created', () => {
      Template.fromStack(stack).hasResourceProperties('Custom::Bedrock-DataSource', {
        name: 'test-docs',
        knowledgeBaseId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^KB'),
            'knowledgeBaseId',
          ],
        },
        dataSourceConfiguration: {
          type: 'S3',
          s3Configuration: {
            bucketArn: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('^DocBucket'),
                'Arn',
              ],
            },
          },
        },
      });
    });
  });

  describe('Agent', () => {
    test('matches snapshot', () => {
      expect(Template.fromStack(stack).toJSON()).toMatchSnapshot();
    });

    test('Agent is created', () => {
      Template.fromStack(stack).hasResourceProperties('Custom::Bedrock-Agent', {
        foundationModel: 'anthropic.claude-v2:1',
        instruction: 'You provide support for developers working with CDK constructs.',
        idleSessionTTLInSeconds: 1800,
        promptOverrideConfiguration: {
          promptConfigurations: [
            {
              promptType: 'PRE_PROCESSING',
              promptState: 'DISABLED',
              promptCreationMode: 'OVERRIDDEN',
              basePromptTemplate: 'This prompt is disabled.',
              inferenceConfiguration: {
                temperature: 0,
                topP: 1.0,
                topK: 0,
                maximumLength: 0,
                stopSequences: [],
              },
            },
            {
              promptType: 'ORCHESTRATION',
              promptState: 'ENABLED',
              promptCreationMode: 'OVERRIDDEN',
              basePromptTemplate: 'This prompt is enabled.',
              inferenceConfiguration: {
                temperature: 0,
                topP: 1.0,
                topK: 250,
                maximumLength: 2048,
                stopSequences: ['</function_call>', '</answer>', '</error>'],
              },
            },
          ],
        },
      });
    });

    test('Agent is created with one knowledge base', () => {
      const template = Template.fromStack(stack);
      template.resourceCountIs('Custom::Bedrock-AgentKnowledgeBase', 1);
      template.hasResourceProperties('Custom::Bedrock-AgentKnowledgeBase', {
        agentId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^Agent'),
            'agentId',
          ],
        },
        knowledgeBaseId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^KB'),
            'knowledgeBaseId',
          ],
        },
        description: 'Documentation about CDK constructs.',
      });
    });

    test('Agent Alias is created', () => {
      Template.fromStack(stack).hasResourceProperties('Custom::Bedrock-AgentAlias', {
        agentId: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('^Agent'),
            'agentId',
          ],
        },
        aliasName: 'prod',
      });
    });

    test('No unsuppressed Errors', () => {
      const errors = Annotations.fromStack(stack).findError(
        '*',
        Match.stringLikeRegexp('AwsSolutions-.*'),
      );
      expect(errors).toHaveLength(0);
    });
  });
});