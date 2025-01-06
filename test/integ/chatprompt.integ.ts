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

import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';

import * as kms from 'aws-cdk-lib/aws-kms';
import { PromptVariant, Prompt, BedrockFoundationModel, ChatMessage, ToolChoice } from '../../src/cdk-lib/bedrock';
const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-chat-prompts-integ-test');

const cmk = new kms.Key(stack, 'cmk', {});

const variantChat = PromptVariant.chat({
  variantName: 'variant1',
  model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
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
  promptName: 'prompt-chat',
  description: 'my first chat prompt',
  defaultVariant: variantChat,
  variants: [variantChat],
  kmsKey: cmk,
});

const variantText = PromptVariant.text({
  variantName: 'variant1',
  model: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_SONNET_V1_0,
  promptText: 'Hey',
});

new Prompt(stack, 'prompt2', {
  promptName: 'prompt-text',
  description: 'my first text prompt',
  defaultVariant: variantText,
  variants: [variantText],
  kmsKey: cmk,
});

// const integ_case =
new integ.IntegTest(app, 'ServiceTest', {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true,
      },
    },
  },
});

app.synth();
