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
import * as integ from "@aws-cdk/integ-tests-alpha";
import * as cdk from "aws-cdk-lib";
import * as kms from "aws-cdk-lib/aws-kms";
import {
  ContentFilterStrength,
  ContentFilterType,
  ContextualGroundingFilterType,
  Guardrail,
  GuardrailAction,
  GuardrailSampleTopics,
  ManagedWordFilterType,
  PIIType,
} from "../../../../src/cdk-lib/bedrock";

const app = new cdk.App();
const stack = new cdk.Stack(app, "aws-cdk-bedrock-guardrails-integ-test");

const guardrail = new Guardrail(stack, "guardrails", {
  name: "test-guardrail",
  description: "This is a test guardrail",
  kmsKey: new kms.Key(stack, "guardrails-key", {
    enableKeyRotation: true,
  }),
  //wordFilters: ["test"],
  deniedTopics: [GuardrailSampleTopics.FINANCIAL_ADVICE],
});

guardrail.addContentFilter({
  type: ContentFilterType.MISCONDUCT,
  inputStrength: ContentFilterStrength.LOW,
  outputStrength: ContentFilterStrength.LOW,
});

guardrail.addPIIFilter({
  type: PIIType.General.ADDRESS,
  action: GuardrailAction.ANONYMIZE,
});

guardrail.addRegexFilter({
  name: "regex",
  pattern: "234242.*",
  action: GuardrailAction.ANONYMIZE,
});

guardrail.addDeniedTopicFilter(GuardrailSampleTopics.LEGAL_ADVICE);

guardrail.addContextualGroundingFilter({
  type: ContextualGroundingFilterType.GROUNDING,
  threshold: 0.95,
});

guardrail.addWordFilter("sex");
guardrail.addWordFilter("drugs");
guardrail.addManagedWordListFilter(ManagedWordFilterType.PROFANITY);

guardrail.createVersion();

new integ.IntegTest(app, "ServiceTest", {
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
