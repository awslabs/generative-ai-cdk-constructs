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
import {
  BedrockFoundationModel,
  Agent,
  AgentCollaboratorType,
  AgentCollaborator,
  AgentAlias,
} from '../../src/cdk-lib/bedrock';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const customerSupportAgent = new Agent(this, 'CustomerSupportAgent', {
      foundationModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_HAIKU_V1_0,
      instruction: 'You specialize in answering customer support questions about our products.',
      userInputEnabled: true,
      shouldPrepareAgent: true,
    });

    const prodAlias = new AgentAlias(this, 'CustomerSupportAlias', {
      agent: customerSupportAgent,
    });

    new Agent(this, 'MainAgent', {
      name: 'MainAgent',
      instruction: 'You are a helpful assistant that can answer general questions and route specialized customer support questions to the customer support agent.',
      foundationModel: BedrockFoundationModel.ANTHROPIC_CLAUDE_3_5_HAIKU_V1_0,
      agentCollaboration: AgentCollaboratorType.SUPERVISOR_ROUTER,
      agentCollaborators: [
        new AgentCollaborator({
          agentAlias: prodAlias,
          collaborationInstruction: 'Route customer support questions to this agent.',
          collaboratorName: 'CustomerSupport',
          relayConversationHistory: true,
        }),
      ],
      shouldPrepareAgent: true,
    });
  }
}

// Integration test
const app = new cdk.App();
const stack = new TestStack(app, 'AgentMemoryTest', {
  env: {
    region: 'us-east-1',
  },
});

new integ.IntegTest(app, 'AgentMemoryTest-Integ', {
  testCases: [stack],
  cdkCommandOptions: {
    deploy: {
      args: {
        rollback: false,
      },
    },
  },
});

app.synth();
