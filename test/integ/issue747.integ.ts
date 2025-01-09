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
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import * as bedrock from '../../src/cdk-lib/bedrock';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-agents-integ-test', {
  env: {
    region: 'eu-central-1',
  },
});

const agent = new bedrock.Agent(stack, 'Agent', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  instruction: 'You are a helpful and friendly agent that answers questions about literature.',
});

const agent2 = new bedrock.Agent(stack, 'Agent2', {
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  instruction: 'You are a helpful and friendly agent that answers questions about unicorns.',
});

const actionGroupFunction = new Function(stack, 'ActionGroupFunction', {
  runtime: Runtime.PYTHON_3_12,
  handler: 'index.lambda_handler',
  code: Code.fromInline(`
  def lambda_handler(event, context):
    return {
      'statusCode': 200,
      'body': 'Hello from Lambda!'
    }
  `),
});

const actionGroup = new bedrock.AgentActionGroup({
  name: 'my-ag',
  description: 'my action group',
  executor: bedrock.ActionGroupExecutor.fromlambdaFunction(actionGroupFunction),
  apiSchema: bedrock.ApiSchema.fromLocalAsset(__dirname + '/api-schema.yaml'),
});

agent.addActionGroup(actionGroup);
agent2.addActionGroup(actionGroup);

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
