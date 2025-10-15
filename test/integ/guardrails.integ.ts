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
import * as bedrock from '../../src/cdk-lib/bedrock';
import { BedrockCwDashboard } from '../../src/patterns/gen-ai/aws-bedrock-cw-dashboard';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-agents-integ-test', {
  env: {
    // region: 'eu-central-1',
  },
});

const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
  name: 'TestGuardrailMetrics',
  description: 'This is a test guardrail',
  deniedTopics: [bedrock.Topic.FINANCIAL_ADVICE],
  contentFilters: [
    {
      type: bedrock.ContentFilterType.MISCONDUCT,
      inputStrength: bedrock.ContentFilterStrength.LOW,
      outputStrength: bedrock.ContentFilterStrength.LOW,
    },
  ],
  contextualGroundingFilters: [
    {
      type: bedrock.ContextualGroundingFilterType.GROUNDING,
      threshold: 0.99,
    },
  ],
  piiFilters: [
    {
      type: bedrock.PIIType.General.ADDRESS,
      action: bedrock.GuardrailAction.ANONYMIZE,
    },
  ],
  regexFilters: [
    {
      name: 'TestRegexFilter',
      description: 'This is a test regex filter',
      pattern: '/^[A-Z]{2}d{6}$/',
      action: bedrock.GuardrailAction.ANONYMIZE,
    },
  ],
  wordFilters: [
    {
      text: 'reggaeton',
      inputAction: bedrock.GuardrailAction.BLOCK,
      outputAction: bedrock.GuardrailAction.NONE,
    },
  ],
  managedWordListFilters: [
    {
      type: bedrock.ManagedWordFilterType.PROFANITY,
      inputAction: bedrock.GuardrailAction.BLOCK,
      outputAction: bedrock.GuardrailAction.NONE,
    },
  ],
});

const dashboard = new BedrockCwDashboard(stack, 'dashboard');

dashboard.addGuardrailMonitoring(guardrail);
dashboard.addAllGuardrailsMonitoring();

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
