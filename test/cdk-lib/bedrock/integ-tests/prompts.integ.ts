import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import { Prompt, PromptVariant } from '../../../../src/cdk-lib/bedrock/prompt';
import * as kms from 'aws-cdk-lib/aws-kms';
import { aws_bedrock as cdk_bedrock } from 'aws-cdk-lib';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-prompts-integ-test');


const cmk = new kms.Key(stack, 'cmk', {})
const claudeModel = cdk_bedrock.FoundationModel.fromFoundationModelId(stack, 'model1', cdk_bedrock.FoundationModelIdentifier.ANTHROPIC_CLAUDE_3_SONNET_20240229_V1_0)
const variant1 = PromptVariant.text({
  name: 'variant1',
  model: claudeModel,
  templateConfiguration: {
    inputVariables: [{ name: "topic" }],
    text: "This is my first text prompt. Please summarize our conversation on: {{topic}}."
  },
  inferenceConfiguration: {
    temperature: 1.0,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250
  }
})

const prompt1 = new Prompt(stack, 'prompt1', {
  name: 'prompt1',
  description: 'my first prompt',
  defaultVariant: variant1,
  variants: [variant1],
  encryptionKey: cmk
})

const variant2 = PromptVariant.text({
  name: 'variant2',
  model: claudeModel,
  templateConfiguration: {
    inputVariables: [{ name: "topic" }],
    text: "This is my second text prompt. Please summarize our conversation on: {{topic}}."
  },
  inferenceConfiguration: {
    temperature: 0.5,
    topP: 0.999,
    maxTokens: 2000,
    topK: 250
  }
})

prompt1.addVariant(variant2)
prompt1.createVersion('my first version')

// const integ_case = 
new integ.IntegTest(app, 'ServiceTest', {
  testCases: [stack],
  cdkCommandOptions: {
    destroy: {
      args: {
        force: true
      }
    }
  }
});

// integ_case.assertions.awsApiCall('bedrock-agent', 'GetPrompt', {
//   promptIdentifier: prompt1.promptArn
// })

app.synth();
