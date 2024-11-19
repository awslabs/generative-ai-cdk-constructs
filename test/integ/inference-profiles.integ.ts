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
  Agent,
  ApplicationInferenceProfile,
  BedrockFoundationModel,
  CrossRegionInferenceProfile,
  CrossRegionInferenceProfileRegion,
} from '../../src/cdk-lib/bedrock';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-guardrails-integ-test', {
  env: {
    region: 'us-west-2',
  },
});

new Agent(stack, 'TestAgent', {
  instruction: 'You are a test bot that needs to be very gentle and useful to the user',
  foundationModel: CrossRegionInferenceProfile.fromConfig({
    geoRegion: CrossRegionInferenceProfileRegion.US,
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  }),
  name: 'test-agent',
  description: 'test-description',
});

new ApplicationInferenceProfile(stack, 'TestAppProfile', {
  inferenceProfileName: 'my-app-inf-profile',
  tags: [{ key: 'projectId', value: 'supplyUSXRC28' }],
  modelSource: CrossRegionInferenceProfile.fromConfig({
    geoRegion: CrossRegionInferenceProfileRegion.US,
    model: BedrockFoundationModel.ANTHROPIC_CLAUDE_SONNET_V1_0,
  }),
});

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
