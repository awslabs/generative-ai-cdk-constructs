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

// eslint-disable-next-line import/no-extraneous-dependencies
import { expect as cdkExpect, haveResource, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { aws_bedrock as cdk_bedrock } from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import {
  BedrockFoundationModel,
  ChatMessage,
  CrossRegionInferenceProfile,
  CrossRegionInferenceProfileRegion,
  PromptVariant,
  Prompt,
  ToolChoice,
} from '../../../src/cdk-lib/bedrock';

describe('Prompt', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });
  // --------------------------------------------------------------------------
  test('creates a Prompt with custom encryption key', () => {
    // GIVEN
    const cmk = kms.Key.fromKeyArn(stack, 'cmk', 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012');

    const prompt = new Prompt(stack, 'prompt1', {
      promptName: 'prompt1',
      description: 'my cmk prompt',
      kmsKey: cmk,
    });
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my cmk prompt',
        CustomerEncryptionKeyArn: cmk.keyArn,
      }),
    );
    expect(prompt.promptName).toEqual('prompt1');
  });

  // --------------------------------------------------------------------------
  test('creates a Prompt with one variant - fromCdkFoundationModelId', () => {
    // GIVEN
    const variant1 = PromptVariant.text({
      variantName: 'variant1',
      model: BedrockFoundationModel.fromCdkFoundationModelId(
        cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0,
      ),
      promptVariables: ['topic'],
      promptText: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
      },
    });

    new Prompt(stack, 'prompt1', {
      promptName: 'prompt1',
      description: 'my prompt',
      defaultVariant: variant1,
      variants: [variant1],
    });
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my prompt',
        DefaultVariant: 'variant1',
        Variants: [
          {
            InferenceConfiguration: {
              Text: {
                MaxTokens: 2000,
                Temperature: 1,
                TopP: 0.999,
              },
            },
            Name: 'variant1',
            TemplateConfiguration: {
              Text: {
                InputVariables: [{ Name: 'topic' }],
                Text: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
              },
            },
            TemplateType: 'TEXT',
          },
        ],
      }),
    );
  });

  test('creates a Prompt with one TEXT variant - BedrockFoundationModel', () => {
    // GIVEN
    const variant1 = PromptVariant.text({
      variantName: 'variant1',
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
      promptVariables: ['topic'],
      promptText: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
      },
    });

    new Prompt(stack, 'prompt1', {
      promptName: 'prompt1',
      description: 'my prompt',
      defaultVariant: variant1,
      variants: [variant1],
    });
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my prompt',
        DefaultVariant: 'variant1',
        Variants: [
          {
            InferenceConfiguration: {
              Text: {
                MaxTokens: 2000,
                Temperature: 1,
                TopP: 0.999,
              },
            },
            Name: 'variant1',
            TemplateConfiguration: {
              Text: {
                InputVariables: [{ Name: 'topic' }],
                Text: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
              },
            },
            TemplateType: 'TEXT',
          },
        ],
      }),
    );
  });

  test('creates a Prompt with one CHAT variant - BedrockFoundationModel', () => {
    // GIVEN
    const variant1 = PromptVariant.chat({
      variantName: 'variantChat',
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
      },
      messages: [
        ChatMessage.user('From now on, you speak Japanese!'),
        ChatMessage.assistant('Konnichiwa!'),
        ChatMessage.user('From now on, you speak {{language}}!'),
      ],
      system: 'You are a helpful assistant that only speaks the language you`re told.',
      promptVariables: ['language'],
      toolConfiguration: {
        toolChoice: ToolChoice.AUTO,
        tools: [
          {
            toolSpec: {
              name: 'top_song',
              description: 'Get the most popular song played on a radio station.',
              inputSchema: {
                json: {
                  type: 'object',
                  properties: {
                    sign: {
                      type: 'string',
                      description:
                        'The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR.',
                    },
                  },
                  required: ['sign'],
                },
              },
            },
          },
        ],
      },
    });

    new Prompt(stack, 'prompt1', {
      promptName: 'promptChat',
      description: 'my chat prompt',
      defaultVariant: variant1,
      variants: [variant1],
    });
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::Prompt', {
        Name: 'promptChat',
        Description: 'my chat prompt',
        DefaultVariant: 'variantChat',
        Variants: [
          {
            InferenceConfiguration: {
              Text: {
                MaxTokens: 2000,
                Temperature: 1,
                TopP: 0.999,
              },
            },
            Name: 'variantChat',
            TemplateConfiguration: {
              Chat: {
                InputVariables: [
                  {
                    Name: 'language',
                  },
                ],
                Messages: [
                  {
                    Content: [
                      {
                        Text: 'From now on, you speak Japanese!',
                      },
                    ],
                    Role: 'user',
                  },
                  {
                    Content: [
                      {
                        Text: 'Konnichiwa!',
                      },
                    ],
                    Role: 'assistant',
                  },
                  {
                    Content: [
                      {
                        Text: 'From now on, you speak {{language}}!',
                      },
                    ],
                    Role: 'user',
                  },
                ],
                System: [
                  {
                    Text: 'You are a helpful assistant that only speaks the language you`re told.',
                  },
                ],
                ToolConfiguration: {
                  ToolChoice: {
                    Auto: {},
                  },
                  Tools: [
                    {
                      ToolSpec: {
                        Description: 'Get the most popular song played on a radio station.',
                        InputSchema: {
                          Json: {
                            type: 'object',
                            properties: {
                              sign: {
                                type: 'string',
                                description:
                                  'The call sign for the radio station for which you want the most popular song. Example calls signs are WZPZ and WKR.',
                              },
                            },
                            required: ['sign'],
                          },
                        },
                        Name: 'top_song',
                      },
                    },
                  ],
                },
              },
            },
            TemplateType: 'CHAT',
          },
        ],
      }),
    );
  });

  test('creates a Prompt with one variant - CRIS', () => {
    // GIVEN
    const cris = CrossRegionInferenceProfile.fromConfig({
      geoRegion: CrossRegionInferenceProfileRegion.US,
      model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
    });

    const variant1 = PromptVariant.text({
      variantName: 'variant1',
      model: cris,
      promptVariables: ['topic'],
      promptText: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
      },
    });

    new Prompt(stack, 'prompt1', {
      promptName: 'prompt1',
      description: 'my prompt',
      defaultVariant: variant1,
      variants: [variant1],
    });
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResourceLike('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my prompt',
        DefaultVariant: 'variant1',
        Variants: [
          {
            InferenceConfiguration: {
              Text: {
                MaxTokens: 2000,
                Temperature: 1,
                TopP: 0.999,
              },
            },
            Name: 'variant1',
            TemplateConfiguration: {
              Text: {
                InputVariables: [{ Name: 'topic' }],
                Text: 'This is my first text prompt. Please summarize our conversation on {{topic}}.',
              },
            },
            TemplateType: 'TEXT',
          },
        ],
      }),
    );
  });

  // --------------------------------------------------------------------------
  test('creates a prompt version', () => {
    // GIVEN
    const prompt = new Prompt(stack, 'prompt1', {
      promptName: 'prompt1',
      description: 'my versioned prompt',
    });

    prompt.createVersion('first version');
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my versioned prompt',
      }),
    );
    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::PromptVersion', {
        Description: 'first version',
      }),
    );
  });

  // --------------------------------------------------------------------------
  test('throws on invalid prompt name', () => {
    // GIVEN
    new Prompt(stack, 'prompt1', {
      promptName: '-my-prompt',
      description: 'my prompt',
    });
    // THEN
    expect(() => app.synth()).toThrow();
  });

  // --------------------------------------------------------------------------
  test('throws on invalid prompt variant number', () => {
    // GIVEN
    const variants = [1, 2, 3, 4].map(id =>
      PromptVariant.text({
        variantName: `variant${id}`,
        model: BedrockFoundationModel.fromCdkFoundationModelId(
          cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0,
        ),
        promptVariables: ['topic'],
        promptText: `This is my text prompt ${id}. Please summarize our conversation on {{topic}}.`,
        inferenceConfiguration: {
          temperature: 1.0,
          topP: 0.999,
          maxTokens: 2000,
        },
      }),
    );
    new Prompt(stack, 'prompt1', {
      promptName: 'my-prompt',
      description: 'my prompt',
      variants,
    });
    // THEN
    expect(() => app.synth()).toThrow(
      'Error: Too many variants specified. The maximum allowed is 3, but you have provided 4 variants.',
    );
  });
});

describe('Prompt-Import', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  // --------------------------------------------------------------------------
  test('Basic Import - ARN', () => {
    const prompt = Prompt.fromPromptAttributes(stack, 'TestPrompt', {
      promptArn: 'arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345',
    });

    expect(prompt.promptArn).toBe('arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345');
    expect(prompt.promptId).toBe('PROMPT12345');
    expect(prompt.promptVersion).toBe('DRAFT');
    expect(prompt.kmsKey).toBeUndefined();
  });

  // --------------------------------------------------------------------------
  test('Basic Import - ARN with version', () => {
    const prompt = Prompt.fromPromptAttributes(stack, 'TestPrompt', {
      promptArn: 'arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345',
      promptVersion: '1',
    });

    expect(prompt.promptArn).toBe('arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345');
    expect(prompt.promptId).toBe('PROMPT12345');
    expect(prompt.promptVersion).toBe('1');
    expect(prompt.kmsKey).toBeUndefined();
  });

  // --------------------------------------------------------------------------
  test('Basic Import - ARN + KMS', () => {
    const prompt = Prompt.fromPromptAttributes(stack, 'TestPrompt', {
      promptArn: 'arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345',
      kmsKey: kms.Key.fromKeyArn(stack, 'cmk', 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012'),
    });

    expect(prompt.promptArn).toBe('arn:aws:bedrock:us-east-1:123456789012:prompt/PROMPT12345');
    expect(prompt.promptId).toBe('PROMPT12345');
    expect(prompt.promptVersion).toBe('DRAFT');
    expect(prompt.kmsKey?.keyArn).toBe('arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012');
  });
});
