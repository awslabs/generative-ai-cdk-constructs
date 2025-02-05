import * as integ from '@aws-cdk/integ-tests-alpha';
import * as cdk from 'aws-cdk-lib';
import * as bedrock from '../../src/cdk-lib/bedrock';
import { BedrockCwDashboard } from '../../src/patterns/gen-ai/aws-bedrock-cw-dashboard';

const app = new cdk.App();
const stack = new cdk.Stack(app, 'aws-cdk-bedrock-agents-integ-test', {
  env: {
    //region: 'eu-central-1',
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
  wordFilters: ['reggaeton', 'alcohol'],
  managedWordListFilters: [bedrock.ManagedWordFilterType.PROFANITY],
});

const dashboard = new BedrockCwDashboard(stack, 'dashboard');

dashboard.addGuardrailMonitoring(guardrail);

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
