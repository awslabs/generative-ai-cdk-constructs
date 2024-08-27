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

import { expect as cdkExpect, haveResource, haveResourceLike } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import * as kms from 'aws-cdk-lib/aws-kms';
import { aws_bedrock as cdk_bedrock } from 'aws-cdk-lib';
import { Prompt, PromptVariant } from '../../../src/cdk-lib/bedrock/prompt';


describe('Prompt', () => {
  let app: cdk.App;
  let stack: cdk.Stack;

  beforeEach(() => {
    app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('creates a Prompt with custom encryption key', () => {
    // GIVEN
    const cmk = kms.Key.fromKeyArn(stack, 'cmk', 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012')

    const prompt = new Prompt(stack, 'prompt1', {
      name: 'prompt1',
      description: 'my cmk prompt',
      encryptionKey: cmk
    })
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my cmk prompt',
        CustomerEncryptionKeyArn: cmk.keyArn
      })
    );
    expect(prompt.name).toEqual('prompt1');
  });

  test('creates a Prompt with one variant', () => {
    // GIVEN
    const variant1 = PromptVariant.text({
      name: 'variant1',
      model: cdk_bedrock.FoundationModel.fromFoundationModelId(stack, 'model1', cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0),
      templateConfiguration: {
        inputVariables: [{ name: "topic" }],
        text: "This is my first text prompt. Please summarize our conversation on {{topic}}."
      },
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
        topK: 250
      }
    })

    new Prompt(stack, 'prompt1', {
      name: 'prompt1',
      description: 'my prompt',
      defaultVariant: variant1,
      variants: [variant1],
    })
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
                TopK: 250,
                TopP: 0.999
              }
            },
            Name: "variant1",
            TemplateConfiguration: {
              Text: {
                InputVariables: [{ Name: "topic" }],
                "Text": "This is my first text prompt. Please summarize our conversation on {{topic}}."
              }
            },
            TemplateType: "TEXT"
          }
        ]
      })
    );
  })

  test('creates a prompt version', () => {
    // GIVEN
    const prompt = new Prompt(stack, 'prompt1', {
      name: 'prompt1',
      description: 'my versioned prompt',
    })

    prompt.createVersion('first version')
    // WHEN & THEN

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Prompt', {
        Name: 'prompt1',
        Description: 'my versioned prompt',
      })
    );
    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::PromptVersion', {
        Description: 'first version',
      })
    );
  });

  test('throws on invalid prompt name', () => {
    //GIVEN
    new Prompt(stack, 'prompt1', {
      name: '-my-prompt',
      description: 'my prompt',
    })
    // THEN
    expect(() => app.synth()).toThrow()
  })

  test('throws on invalid prompt variant number', () => {
    //GIVEN
    const variants = [1, 2, 3, 4].map(id => (PromptVariant.text({
      name: `variant${id}`,
      model: cdk_bedrock.FoundationModel.fromFoundationModelId(stack, `model${id}`, cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0),
      templateConfiguration: {
        inputVariables: [{ name: "topic" }],
        text: `This is my text prompt ${id}. Please summarize our conversation on {{topic}}.`
      },
      inferenceConfiguration: {
        temperature: 1.0,
        topP: 0.999,
        maxTokens: 2000,
        topK: 250
      }
    })))
    new Prompt(stack, 'prompt1', {
      name: 'my-prompt',
      description: 'my prompt',
      variants,
    })
    // THEN
    expect(() => app.synth()).toThrow("Error: Too many variants specified. The maximum allowed is 3, but you have provided 4 variants.")
  })
})