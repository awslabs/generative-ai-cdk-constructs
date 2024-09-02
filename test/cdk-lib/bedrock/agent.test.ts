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
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from 'aws-cdk-lib/aws-s3';
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

describe('Agent with guardrails through addGuardrail', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let kb: bedrock.KnowledgeBase;
  let agent: bedrock.Agent;
  let actionGroupFunction: lambda.Function;

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
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
      description: 'Documentation about CDK constructs.',
      instruction: 'Documentation about CDK constructs.',
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

    const apiSchemaBucket = new s3.Bucket(stack, 'TestBucket');
    const actiongroup = new bedrock.AgentActionGroup(stack, 'actionGroups', {
      actionGroupName: 'test-action-group',
      description: 'Use these functions to get information about the books in the Project Gutenburg library.',
      actionGroupState: 'ENABLED',
      actionGroupExecutor: {
        lambda: actionGroupFunction,
      },
      apiSchema: bedrock.ApiSchema.fromBucket(apiSchemaBucket, 'test/api.yaml'),
    });

    agent = new bedrock.Agent(stack, 'Agent', {
      foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
      instruction: 'You provide support for developers working with CDK constructs.',
      knowledgeBases: [kb],
      idleSessionTTL: cdk.Duration.minutes(30),
      promptOverrideConfiguration: {
        promptConfigurations: [preprocessingPrompt, orchestrationPrompt],
      },
      aliasName: 'prod',
      enableUserInput: true,
    });

    agent.addActionGroups([actiongroup]);

    const guardrail = new bedrock.Guardrail(stack, 'MyGuardrail', {
      name: 'my-custom-guardrail',
      blockedInputMessaging: 'Blocked input message',
      blockedOutputsMessaging: 'Blocked output message',
      filtersConfig: [
        {
          filtersConfigType: bedrock.FiltersConfigType.HATE,
          inputStrength: bedrock.FiltersConfigStrength.HIGH,
          outputStrength: bedrock.FiltersConfigStrength.HIGH,
        },
      ],
      kmsKeyArn: 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012',
    });

    agent.addGuardrail(guardrail);


  });

  test('Knowledge Base is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      Description: 'Documentation about CDK constructs.',
      Name: Match.stringLikeRegexp('^KB'),
      KnowledgeBaseConfiguration: {
        Type: 'VECTOR',
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelArn: 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',
        },
      },
    });
  });

  test('Data Source is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'test-docs',
      KnowledgeBaseId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^KB'),
          'KnowledgeBaseId',
        ],
      },
      DataSourceConfiguration: {
        Type: 'S3',
        S3Configuration: {
          BucketArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('^DocBucket'),
              'Arn',
            ],
          },
        },
      },

    });
  });

  test('Agent is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
      FoundationModel: 'anthropic.claude-v2:1',
      Instruction: 'You provide support for developers working with CDK constructs.',
      IdleSessionTTLInSeconds: 1800,
      PromptOverrideConfiguration: {
        PromptConfigurations: [
          {
            PromptType: 'PRE_PROCESSING',
            PromptState: 'DISABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is disabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 0,
              MaximumLength: 0,
              StopSequences: [],
            },
          },
          {
            PromptType: 'ORCHESTRATION',
            PromptState: 'ENABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is enabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 250,
              MaximumLength: 2048,
              StopSequences: ['</function_call>', '</answer>', '</error>'],
            },
          },
        ],
      },
      GuardrailConfiguration: {
        GuardrailIdentifier: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('MyGuardrail'), 'GuardrailId',
          ],
        },
        GuardrailVersion: {
          'Fn::GetAtt': [
            Match.stringLikeRegexp('MyGuardrail'), 'Version',
          ],
        },
      },
    });
  });

  test('Agent is created with one knowledge base', () => {
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Bedrock::KnowledgeBase', 1);
    template.hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        Type: Match.stringLikeRegexp('VECTOR'),
      },
      Name: Match.stringLikeRegexp('KBteststack'),
      RoleArn: {
        'Fn::GetAtt':
          [Match.stringLikeRegexp('KBRole'), 'Arn'],

      },

      Description: 'Documentation about CDK constructs.',
    });
  });

  test('Agent action group and ApiSchema from S3', () => {
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::Agent', {

      ActionGroups: [
        {
          ActionGroupName: 'UserInputAction',
          ActionGroupState: 'ENABLED',
          ParentActionGroupSignature: 'AMAZON.UserInput',
          SkipResourceInUseCheckOnDelete: false,
        },
        {
          ActionGroupExecutor: {
            Lambda: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('ActionGroupFunction'), 'Arn',
              ],
            },
          },
          ActionGroupName: 'test-action-group',
          ActionGroupState: 'ENABLED',
          ApiSchema: {
            S3: {
              S3BucketName: {
                Ref: Match.stringLikeRegexp('^TestBucket'),
              },
              S3ObjectKey: 'test/api.yaml',
            },
          },
        },
      ],
    });

  });

  test('Guardrail is associated', () => {
    const template = Template.fromStack(stack);
    console.log(template.toJSON());
    template.hasResourceProperties('AWS::Bedrock::Guardrail', {
      BlockedInputMessaging: 'Blocked input message',
      BlockedOutputsMessaging: 'Blocked output message',
      ContentPolicyConfig: {
        FiltersConfig: [
          {
            Type: 'HATE',
            InputStrength: 'HIGH',
            OutputStrength: 'HIGH',
          },
        ],
      },
      KmsKeyArn: 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012',
      Name: 'my-custom-guardrail',
    },
    );

  });

  test('Agent Alias is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::AgentAlias', {
      AgentId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^Agent'),
          'AgentId',
        ],
      },
      AgentAliasName: 'prod',
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

describe('Agent with guardrails through constructor', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let kb: bedrock.KnowledgeBase;
  let agent: bedrock.Agent;
  let actionGroupFunction: lambda.Function;

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
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
      description: 'Documentation about CDK constructs.',
      instruction: 'Documentation about CDK constructs.',
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

    const apiSchemaBucket = new s3.Bucket(stack, 'TestBucket');
    const actiongroup = new bedrock.AgentActionGroup(stack, 'actionGroups', {
      actionGroupName: 'test-action-group',
      description: 'Use these functions to get information about the books in the Project Gutenburg library.',
      actionGroupState: 'ENABLED',
      actionGroupExecutor: {
        lambda: actionGroupFunction,
      },
      apiSchema: bedrock.ApiSchema.fromBucket(apiSchemaBucket, 'test/api.yaml'),
    });

    agent = new bedrock.Agent(stack, 'Agent', {
      foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
      instruction: 'You provide support for developers working with CDK constructs.',
      knowledgeBases: [kb],
      idleSessionTTL: cdk.Duration.minutes(30),
      promptOverrideConfiguration: {
        promptConfigurations: [preprocessingPrompt, orchestrationPrompt],
      },
      guardrailConfiguration: {
        guardrailId: 'testId',
        guardrailVersion: 'version1',
      },
      aliasName: 'prod',
    });

    agent.addActionGroups([actiongroup]);

  });

  test('Knowledge Base is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      Description: 'Documentation about CDK constructs.',
      Name: Match.stringLikeRegexp('^KB'),
      KnowledgeBaseConfiguration: {
        Type: 'VECTOR',
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelArn: 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',
        },
      },
    });
  });

  test('Data Source is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'test-docs',
      KnowledgeBaseId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^KB'),
          'KnowledgeBaseId',
        ],
      },
      DataSourceConfiguration: {
        Type: 'S3',
        S3Configuration: {
          BucketArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('^DocBucket'),
              'Arn',
            ],
          },
        },
      },

    });
  });

  test('Agent is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
      FoundationModel: 'anthropic.claude-v2:1',
      Instruction: 'You provide support for developers working with CDK constructs.',
      IdleSessionTTLInSeconds: 1800,
      PromptOverrideConfiguration: {
        PromptConfigurations: [
          {
            PromptType: 'PRE_PROCESSING',
            PromptState: 'DISABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is disabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 0,
              MaximumLength: 0,
              StopSequences: [],
            },
          },
          {
            PromptType: 'ORCHESTRATION',
            PromptState: 'ENABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is enabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 250,
              MaximumLength: 2048,
              StopSequences: ['</function_call>', '</answer>', '</error>'],
            },
          },
        ],
      },
    });
  });

  test('Agent is created with one knowledge base', () => {
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Bedrock::KnowledgeBase', 1);
    template.hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        Type: Match.stringLikeRegexp('VECTOR'),
      },
      Name: Match.stringLikeRegexp('KBteststack'),
      RoleArn: {
        'Fn::GetAtt':
          [Match.stringLikeRegexp('KBRole'), 'Arn'],

      },

      Description: 'Documentation about CDK constructs.',
    });
  });

  test('Agent action group and ApiSchema from S3', () => {
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::Agent', {

      ActionGroups: [
        {
          ActionGroupName: 'UserInputAction',
          ActionGroupState: 'DISABLED',
          ParentActionGroupSignature: 'AMAZON.UserInput',
          SkipResourceInUseCheckOnDelete: false,
        },
        {
          ActionGroupExecutor: {
            Lambda: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('ActionGroupFunction'), 'Arn',
              ],
            },
          },
          ActionGroupName: 'test-action-group',
          ActionGroupState: 'ENABLED',
          ApiSchema: {
            S3: {
              S3BucketName: {
                Ref: Match.stringLikeRegexp('^TestBucket'),
              },
              S3ObjectKey: 'test/api.yaml',
            },
          },
        },
      ],
    });

  });

  test('Guardrail is associated', () => {
    const template = Template.fromStack(stack);
    console.log(template.toJSON());
    template.hasResourceProperties('AWS::Bedrock::Agent', {
      GuardrailConfiguration: {
        GuardrailIdentifier: 'testId',
        GuardrailVersion: 'version1',
      },
    },
    );

  });

  test('Agent Alias is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::AgentAlias', {
      AgentId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^Agent'),
          'AgentId',
        ],
      },
      AgentAliasName: 'prod',
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

describe('Agent without guardrails', () => {
  let app: cdk.App;
  let stack: cdk.Stack;
  let kb: bedrock.KnowledgeBase;
  let agent: bedrock.Agent;
  let actionGroupFunction: lambda.Function;

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
      embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V1,
      description: 'Documentation about CDK constructs.',
      instruction: 'Documentation about CDK constructs.',
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

    const apiSchemaBucket = new s3.Bucket(stack, 'TestBucket');
    const actiongroup = new bedrock.AgentActionGroup(stack, 'actionGroups', {
      actionGroupName: 'test-action-group',
      description: 'Use these functions to get information about the books in the Project Gutenburg library.',
      actionGroupState: 'ENABLED',
      actionGroupExecutor: {
        lambda: actionGroupFunction,
      },
      apiSchema: bedrock.ApiSchema.fromBucket(apiSchemaBucket, 'test/api.yaml'),
    });

    agent = new bedrock.Agent(stack, 'Agent', {
      foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_V2_1,
      instruction: 'You provide support for developers working with CDK constructs.',
      knowledgeBases: [kb],
      idleSessionTTL: cdk.Duration.minutes(30),
      promptOverrideConfiguration: {
        promptConfigurations: [preprocessingPrompt, orchestrationPrompt],
      },
      aliasName: 'prod',
    });

    agent.addActionGroups([actiongroup]);

  });

  test('Knowledge Base is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      Description: 'Documentation about CDK constructs.',
      Name: Match.stringLikeRegexp('^KB'),
      KnowledgeBaseConfiguration: {
        Type: 'VECTOR',
        VectorKnowledgeBaseConfiguration: {
          EmbeddingModelArn: 'arn:aws:bedrock:us-east-1::foundation-model/amazon.titan-embed-text-v1',
        },
      },
    });
  });

  test('Data Source is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::DataSource', {
      Name: 'test-docs',
      KnowledgeBaseId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^KB'),
          'KnowledgeBaseId',
        ],
      },
      DataSourceConfiguration: {
        Type: 'S3',
        S3Configuration: {
          BucketArn: {
            'Fn::GetAtt': [
              Match.stringLikeRegexp('^DocBucket'),
              'Arn',
            ],
          },
        },
      },

    });
  });

  test('Agent is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Agent', {
      FoundationModel: 'anthropic.claude-v2:1',
      Instruction: 'You provide support for developers working with CDK constructs.',
      IdleSessionTTLInSeconds: 1800,
      PromptOverrideConfiguration: {
        PromptConfigurations: [
          {
            PromptType: 'PRE_PROCESSING',
            PromptState: 'DISABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is disabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 0,
              MaximumLength: 0,
              StopSequences: [],
            },
          },
          {
            PromptType: 'ORCHESTRATION',
            PromptState: 'ENABLED',
            PromptCreationMode: 'OVERRIDDEN',
            BasePromptTemplate: 'This prompt is enabled.',
            InferenceConfiguration: {
              Temperature: 0,
              TopP: 1.0,
              TopK: 250,
              MaximumLength: 2048,
              StopSequences: ['</function_call>', '</answer>', '</error>'],
            },
          },
        ],
      },
    });
  });

  test('Agent is created with one knowledge base', () => {
    const template = Template.fromStack(stack);
    template.resourceCountIs('AWS::Bedrock::KnowledgeBase', 1);
    template.hasResourceProperties('AWS::Bedrock::KnowledgeBase', {
      KnowledgeBaseConfiguration: {
        Type: Match.stringLikeRegexp('VECTOR'),
      },
      Name: Match.stringLikeRegexp('KBteststack'),
      RoleArn: {
        'Fn::GetAtt':
          [Match.stringLikeRegexp('KBRole'), 'Arn'],

      },

      Description: 'Documentation about CDK constructs.',
    });
  });

  test('Agent action group and ApiSchema from S3', () => {
    const template = Template.fromStack(stack);
    template.hasResourceProperties('AWS::Bedrock::Agent', {

      ActionGroups: [
        {
          ActionGroupName: 'UserInputAction',
          ActionGroupState: 'DISABLED',
          ParentActionGroupSignature: 'AMAZON.UserInput',
          SkipResourceInUseCheckOnDelete: false,
        },
        {
          ActionGroupExecutor: {
            Lambda: {
              'Fn::GetAtt': [
                Match.stringLikeRegexp('ActionGroupFunction'), 'Arn',
              ],
            },
          },
          ActionGroupName: 'test-action-group',
          ActionGroupState: 'ENABLED',
          ApiSchema: {
            S3: {
              S3BucketName: {
                Ref: Match.stringLikeRegexp('^TestBucket'),
              },
              S3ObjectKey: 'test/api.yaml',
            },
          },
        },
      ],
    });

  });

  test('Guardrail should not be associated', () => {
    const template = Template.fromStack(stack);
    expect(template.toJSON()).not.toHaveProperty('AWS::Bedrock::Guardrail');
  });

  test('Agent Alias is created', () => {
    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::AgentAlias', {
      AgentId: {
        'Fn::GetAtt': [
          Match.stringLikeRegexp('^Agent'),
          'AgentId',
        ],
      },
      AgentAliasName: 'prod',
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

describe('Imports', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Agent Alias Import', () => {
    // GIVEN
    const agentAlias = bedrock.AgentAlias.fromAliasArn(stack, 'alias',
      'arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN',
    );

    //THEN
    expect(agentAlias.agentId).toEqual('DNCJJYQKSU');
    expect(agentAlias.aliasId).toEqual('TCLCITFZTN');
    expect(agentAlias.aliasArn).toEqual('arn:aws:bedrock:us-east-1:123456789012:agent-alias/DNCJJYQKSU/TCLCITFZTN');
  });
});
