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

import * as cdk from 'aws-cdk-lib';
import { Match, Template } from 'aws-cdk-lib/assertions';
import { Key } from 'aws-cdk-lib/aws-kms';
import * as bedrock from '../../../src/cdk-lib/bedrock';

describe('CDK-Created-Guardrail', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack');
  });

  test('Basic Creation', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      // test defaults
      BlockedInputMessaging: 'Sorry, your query violates our usage policy.',
      BlockedOutputsMessaging: 'Sorry, I am unable to answer your question because of our usage policy.',
      // ensure others are undefined
      TopicPolicyConfig: Match.absent(),
      ContextualGroundingPolicyConfig: Match.absent(),
      ContentPolicyConfig: Match.absent(),
      WordPolicyConfig: Match.absent(),
      SensitiveInformationPolicyConfig: Match.absent(),
    });

    guardrail.name;
  });

  test('Basic Creation + KMS Key', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      // test defaults"
      kmsKey: Key.fromKeyArn(
        stack,
        'importedKey',
        'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
      ),
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      KmsKeyArn: 'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
    });
  });

  test('Topic Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      deniedTopics: [bedrock.Topic.FINANCIAL_ADVICE],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      TopicPolicyConfig: {
        TopicsConfig: [
          {
            Definition:
              "'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.",
            Examples: [
              'Can you suggest some good stocks to invest in right now?',
              "What's the best way to save for retirement?",
              'Should I put my money in a high-risk investment?',
              'How can I maximize my returns on investments?',
              'Is it a good time to buy real estate?',
            ],
            Name: 'Financial_Advice',
            Type: 'DENY',
          },
        ],
      },
    });
  });

  test('Topic Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addDeniedTopicFilter(bedrock.Topic.FINANCIAL_ADVICE);

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      TopicPolicyConfig: {
        TopicsConfig: [
          {
            Definition:
              "'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.",
            Examples: [
              'Can you suggest some good stocks to invest in right now?',
              "What's the best way to save for retirement?",
              'Should I put my money in a high-risk investment?',
              'How can I maximize my returns on investments?',
              'Is it a good time to buy real estate?',
            ],
            Name: 'Financial_Advice',
            Type: 'DENY',
          },
        ],
      },
    });
  });

  test('Content Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      contentFilters: [
        {
          type: bedrock.ContentFilterType.MISCONDUCT,
          inputStrength: bedrock.ContentFilterStrength.LOW,
          outputStrength: bedrock.ContentFilterStrength.LOW,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      ContentPolicyConfig: {
        FiltersConfig: [
          {
            InputStrength: 'LOW',
            OutputStrength: 'LOW',
            Type: 'MISCONDUCT',
          },
        ],
      },
    });
  });

  test('Content Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addContentFilter({
      type: bedrock.ContentFilterType.MISCONDUCT,
      inputStrength: bedrock.ContentFilterStrength.LOW,
      outputStrength: bedrock.ContentFilterStrength.LOW,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      ContentPolicyConfig: {
        FiltersConfig: [
          {
            InputStrength: 'LOW',
            OutputStrength: 'LOW',
            Type: 'MISCONDUCT',
          },
        ],
      },
    });
  });

  test('Contextual Grounding Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      contextualGroundingFilters: [
        {
          type: bedrock.ContextualGroundingFilterType.GROUNDING,
          threshold: 0.99,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      ContextualGroundingPolicyConfig: {
        FiltersConfig: [
          {
            Threshold: 0.99,
            Type: 'GROUNDING',
          },
        ],
      },
    });
  });

  test('Contextual Grounding Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addContextualGroundingFilter({
      type: bedrock.ContextualGroundingFilterType.GROUNDING,
      threshold: 0.99,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      ContextualGroundingPolicyConfig: {
        FiltersConfig: [
          {
            Threshold: 0.99,
            Type: 'GROUNDING',
          },
        ],
      },
    });
  });

  test('PII Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      piiFilters: [
        {
          type: bedrock.PIIType.General.ADDRESS,
          action: bedrock.GuardrailAction.ANONYMIZE,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      SensitiveInformationPolicyConfig: {
        PiiEntitiesConfig: [
          {
            Action: 'ANONYMIZE',
            Type: 'ADDRESS',
          },
        ],
      },
    });
  });

  test('PII Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addPIIFilter({
      type: bedrock.PIIType.General.ADDRESS,
      action: bedrock.GuardrailAction.ANONYMIZE,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      SensitiveInformationPolicyConfig: {
        PiiEntitiesConfig: [
          {
            Action: 'ANONYMIZE',
            Type: 'ADDRESS',
          },
        ],
      },
    });
  });

  test('Regex Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      regexFilters: [
        {
          name: 'TestRegexFilter',
          description: 'This is a test regex filter',
          pattern: '/^[A-Z]{2}d{6}$/',
          action: bedrock.GuardrailAction.ANONYMIZE,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      SensitiveInformationPolicyConfig: {
        RegexesConfig: [
          {
            Action: 'ANONYMIZE',
            Name: 'TestRegexFilter',
            Pattern: '/^[A-Z]{2}d{6}$/',
            Description: 'This is a test regex filter',
          },
        ],
      },
    });
  });

  test('Regex Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addRegexFilter({
      name: 'TestRegexFilter',
      description: 'This is a test regex filter',
      pattern: '/^[A-Z]{2}d{6}$/',
      action: bedrock.GuardrailAction.ANONYMIZE,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      SensitiveInformationPolicyConfig: {
        RegexesConfig: [
          {
            Action: 'ANONYMIZE',
            Name: 'TestRegexFilter',
            Pattern: '/^[A-Z]{2}d{6}$/',
            Description: 'This is a test regex filter',
          },
        ],
      },
    });
  });

  test('Word Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      wordFilters: [
        {
          text: 'reggaeton',
        },
        {
          text: 'alcohol',
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      WordPolicyConfig: {
        WordsConfig: [
          {
            Text: 'reggaeton',
          },
          {
            Text: 'alcohol',
          },
        ],
      },
    });
  });

  test('Word Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addWordFilter({
      text: 'reggaeton',
    });
    guardrail.addWordFilter({
      text: 'alcohol',
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      WordPolicyConfig: {
        WordsConfig: [
          {
            Text: 'reggaeton',
          },
          {
            Text: 'alcohol',
          },
        ],
      },
    });
  });

  test('Managed Word Filter - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
      managedWordListFilters: [
        {
          type: bedrock.ManagedWordFilterType.PROFANITY,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      WordPolicyConfig: {
        ManagedWordListsConfig: [
          {
            Type: 'PROFANITY',
          },
        ],
      },
    });
  });

  test('Managed Word Filter - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addManagedWordListFilter({
      type: bedrock.ManagedWordFilterType.PROFANITY,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      WordPolicyConfig: {
        ManagedWordListsConfig: [
          {
            Type: 'PROFANITY',
          },
        ],
      },
    });
  });

  test('All filters - Props', () => {
    new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
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
        },
        {
          text: 'alcohol',
        },
      ],
      managedWordListFilters: [
        {
          type: bedrock.ManagedWordFilterType.PROFANITY,
        },
      ],
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      TopicPolicyConfig: {
        TopicsConfig: [
          {
            Definition:
              "'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.",
            Examples: [
              'Can you suggest some good stocks to invest in right now?',
              "What's the best way to save for retirement?",
              'Should I put my money in a high-risk investment?',
              'How can I maximize my returns on investments?',
              'Is it a good time to buy real estate?',
            ],
            Name: 'Financial_Advice',
            Type: 'DENY',
          },
        ],
      },
      ContextualGroundingPolicyConfig: {
        FiltersConfig: [
          {
            Threshold: 0.99,
            Type: 'GROUNDING',
          },
        ],
      },
      ContentPolicyConfig: {
        FiltersConfig: [
          {
            InputStrength: 'LOW',
            OutputStrength: 'LOW',
            Type: 'MISCONDUCT',
          },
        ],
      },
      WordPolicyConfig: {
        WordsConfig: [
          {
            Text: 'reggaeton',
          },
          {
            Text: 'alcohol',
          },
        ],
        ManagedWordListsConfig: [
          {
            Type: 'PROFANITY',
          },
        ],
      },
      SensitiveInformationPolicyConfig: {
        RegexesConfig: [
          {
            Action: 'ANONYMIZE',
            Name: 'TestRegexFilter',
            Pattern: '/^[A-Z]{2}d{6}$/',
            Description: 'This is a test regex filter',
          },
        ],
        PiiEntitiesConfig: [
          {
            Action: 'ANONYMIZE',
            Type: 'ADDRESS',
          },
        ],
      },
    });
  });

  test('All filters - Method', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addDeniedTopicFilter(bedrock.Topic.FINANCIAL_ADVICE);

    guardrail.addContentFilter({
      type: bedrock.ContentFilterType.MISCONDUCT,
      inputStrength: bedrock.ContentFilterStrength.LOW,
      outputStrength: bedrock.ContentFilterStrength.LOW,
    });

    guardrail.addContextualGroundingFilter({
      type: bedrock.ContextualGroundingFilterType.GROUNDING,
      threshold: 0.99,
    });

    guardrail.addWordFilter({
      text: 'reggaeton',
    });
    guardrail.addWordFilter({
      text: 'alcohol',
    });

    guardrail.addManagedWordListFilter({
      type: bedrock.ManagedWordFilterType.PROFANITY,
    });

    guardrail.addPIIFilter({
      type: bedrock.PIIType.General.ADDRESS,
      action: bedrock.GuardrailAction.ANONYMIZE,
    });
    guardrail.addRegexFilter({
      name: 'TestRegexFilter',
      description: 'This is a test regex filter',
      pattern: '/^[A-Z]{2}d{6}$/',
      action: bedrock.GuardrailAction.ANONYMIZE,
    });

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::Guardrail', {
      Name: 'TestGuardrail',
      Description: 'This is a test guardrail',
      TopicPolicyConfig: {
        TopicsConfig: [
          {
            Definition:
              "'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.",
            Examples: [
              'Can you suggest some good stocks to invest in right now?',
              "What's the best way to save for retirement?",
              'Should I put my money in a high-risk investment?',
              'How can I maximize my returns on investments?',
              'Is it a good time to buy real estate?',
            ],
            Name: 'Financial_Advice',
            Type: 'DENY',
          },
        ],
      },
      ContextualGroundingPolicyConfig: {
        FiltersConfig: [
          {
            Threshold: 0.99,
            Type: 'GROUNDING',
          },
        ],
      },
      ContentPolicyConfig: {
        FiltersConfig: [
          {
            InputStrength: 'LOW',
            OutputStrength: 'LOW',
            Type: 'MISCONDUCT',
          },
        ],
      },
      WordPolicyConfig: {
        WordsConfig: [
          {
            Text: 'reggaeton',
          },
          {
            Text: 'alcohol',
          },
        ],
        ManagedWordListsConfig: [
          {
            Type: 'PROFANITY',
          },
        ],
      },
      SensitiveInformationPolicyConfig: {
        RegexesConfig: [
          {
            Action: 'ANONYMIZE',
            Name: 'TestRegexFilter',
            Pattern: '/^[A-Z]{2}d{6}$/',
            Description: 'This is a test regex filter',
          },
        ],
        PiiEntitiesConfig: [
          {
            Action: 'ANONYMIZE',
            Type: 'ADDRESS',
          },
        ],
      },
    });
  });

  test('Versioning', () => {
    const guardrail = new bedrock.Guardrail(stack, 'TestGuardrail', {
      name: 'TestGuardrail',
      description: 'This is a test guardrail',
    });

    guardrail.addDeniedTopicFilter(bedrock.Topic.FINANCIAL_ADVICE);

    guardrail.createVersion();

    Template.fromStack(stack).hasResourceProperties('AWS::Bedrock::GuardrailVersion', {
      GuardrailIdentifier: {
        'Fn::GetAtt': [Match.anyValue(), 'GuardrailId'],
      },
    });
  });
});

describe('Imported-Guardrail', () => {
  let stack: cdk.Stack;

  beforeEach(() => {
    const app = new cdk.App();
    stack = new cdk.Stack(app, 'TestStack2', {
      env: {
        account: '123456789012',
        region: 'us-east-1',
      },
    });
  });

  test('Basic Import - ARN', () => {
    const guardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
      guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
    });

    expect(guardrail.guardrailArn).toBe('arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl');
    expect(guardrail.guardrailId).toBe('oygh3o8g7rtl');
    expect(guardrail.guardrailVersion).toBe('DRAFT');
    expect(guardrail.kmsKey).toBeUndefined();
  });

  test('Basic Import - ARN + KMS + Version', () => {
    const kmsKey = Key.fromKeyArn(
      stack,
      'importedKey',
      'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
    );
    const guardrail = bedrock.Guardrail.fromGuardrailAttributes(stack, 'TestGuardrail', {
      guardrailArn: 'arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl',
      guardrailVersion: '1',
      kmsKey: kmsKey,
    });

    expect(guardrail.guardrailArn).toBe('arn:aws:bedrock:us-east-1:123456789012:guardrail/oygh3o8g7rtl');
    expect(guardrail.guardrailId).toBe('oygh3o8g7rtl');
    expect(guardrail.guardrailVersion).toBe('1');
    expect(guardrail.kmsKey!.keyArn).toBe(
      'arn:aws:kms:eu-central-1:123456789012:key/06484191-7d55-49fb-9be7-0baaf7fe8418',
    );
  });
});
