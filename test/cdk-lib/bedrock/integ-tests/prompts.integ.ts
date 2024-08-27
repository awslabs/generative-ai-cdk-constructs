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
import { aws_bedrock as cdk_bedrock } from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { Prompt, PromptVariant } from '../../../../src/cdk-lib/bedrock/prompt';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-prompts-integ-test');


const cmk = new kms.Key(stack, 'cmk', {});
const claudeModel = cdk_bedrock.FoundationModel.fromFoundationModelId(stack, 'model1', cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0);
const variant1 = PromptVariant.text({
  name: 'variant1',
  model: claudeModel,
  templateConfiguration: {
    inputVariables: [{ name: 'topic' }],
    text: 'This is my first text prompt. Please summarize our conversation on: {{topic}}.',
  },
  inferenceConfiguration: {
    temperature: 1.0,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250,
  },
});

const prompt1 = new Prompt(stack, 'prompt1', {
  name: 'prompt1',
  description: 'my first prompt',
  defaultVariant: variant1,
  variants: [variant1],
  encryptionKey: cmk,
});

const variant2 = PromptVariant.text({
  name: 'variant2',
  model: claudeModel,
  templateConfiguration: {
    inputVariables: [{ name: 'topic' }],
    text: 'This is my second text prompt. Please summarize our conversation on: {{topic}}.',
  },
  inferenceConfiguration: {
    temperature: 0.5,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250,
  },
});

prompt1.addVariant(variant2);
prompt1.createVersion('my first version');

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

// integ_case.assertions.awsApiCall('bedrock-agent', 'GetPrompt', {
//   promptIdentifier: prompt1.promptArn
// })

app.synth();
