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
import { Code, Function } from 'aws-cdk-lib/aws-lambda';
import * as bedrock from '../../src/cdk-lib/bedrock';
import { AgentActionGroup } from '../../src/cdk-lib/bedrock/agents/action-group';
import { Agent } from '../../src/cdk-lib/bedrock/agents/agent';
import { ActionGroupExecutor } from '../../src/cdk-lib/bedrock/agents/api-executor';
import { ApiSchema } from '../../src/cdk-lib/bedrock/agents/api-schema';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-guardrails-integ-test', {
  env: {
    region: 'eu-central-1',
  },
});

// ----------------------------------------------------
// Create Managed RAG Architecture
// ----------------------------------------------------
const kb = new bedrock.KnowledgeBase(stack, 'KnowledgeBase', {
  embeddingsModel: bedrock.BedrockFoundationModel.TITAN_EMBED_TEXT_V2_1024,
  instruction:
    'Contains a curated list of FAQs, the Selling Guide. It establishes and communicates the rules of the road for eligible borrowers, loans, and processes to uphold loan quality.',
});

const agent = new Agent(stack, 'Agent', {
  name: 'mortgage-processing-agent',
  description: 'An agent to process mortgage applications',
  foundationModel: bedrock.BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  instruction:
    'You are a customer service agent who has access to knowledge about mortgage products and services. You can help customers apply for a mortgage and answer questions about loan terms, interest rates, and mortgage eligibility. You can guide customers through the steps to submit documents or get appraisals completed. You can explain refinance and modification options to customers and provide resources on mortgage assistance programs. You can also answer internal questions about loan underwriting process, credit requirements, and guidelines for mortgage servicers and lenders. Your goal is to provide excellent service to customers and help them through the homebuying and mortgage financing process. Always ask follow-up question to get general information required before giving the user an answer.',
});

const myLambdaFunction = new Function(stack, 'LambdaFunction', {
  //define inline
  code: Code.fromInline('exports.handler = function(event, context, callback) { callback(null, "hello world"); }'),
  handler: 'index.handler',
  runtime: cdk.aws_lambda.Runtime.NODEJS_18_X,
  environment: {
    KNOWLEDGE_BASE_ID: kb.knowledgeBaseId,
  },
});

const ag = new AgentActionGroup({
  name: 'mortgage-processing-agent-action-group',
  description: 'An action group to process mortgage applications',
  executor: ActionGroupExecutor.fromlambdaFunction(myLambdaFunction),
  apiSchema: ApiSchema.fromLocalAsset(__dirname + '/api-schema.yaml'),
});

agent.addKnowledgeBase(kb);
agent.addActionGroup(ag);

// create your agent

const guardrails = new bedrock.Guardrail(stack, 'bedrockGuardrails', {
  name: 'my-BedrockGuardrails',
  description: 'Legal ethical guardrails.',
});

guardrails.addDeniedTopicFilter(bedrock.Topic.FINANCIAL_ADVICE);

agent.addGuardrail(guardrails);

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
