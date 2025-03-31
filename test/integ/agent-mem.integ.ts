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
  CrossRegionInferenceProfile,
  CrossRegionInferenceProfileRegion,
  Agent,
} from '../../src/cdk-lib/bedrock';
import { Memory } from '../../src/cdk-lib/bedrock/agents/memory';

class TestStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const model = BedrockFoundationModel.AMAZON_NOVA_PRO_V1;

    const inferenceProfile = CrossRegionInferenceProfile.fromConfig({
      geoRegion: CrossRegionInferenceProfileRegion.US,
      model: model,
    });

    new Agent(this, 'Agent', {
      name: 'test-mem-default',
      instruction: "You're a nice agent saying Konnichiwa in Hiragana at the start of every interaction",
      description: 'Agent description.',
      foundationModel: inferenceProfile,
      shouldPrepareAgent: true,
      memory: Memory.SESSION_SUMMARY,
    });

    new Agent(this, 'Agent2', {
      name: 'test-mem-custom',
      instruction: "You're a nice agent saying Konnichiwa in Hiragana at the start of every interaction",
      description: 'Agent description.',
      foundationModel: inferenceProfile,
      shouldPrepareAgent: true,
      memory: Memory.sessionSummary({
        maxRecentSessions: 10,
        memoryDurationDays: 20,
      }),
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
