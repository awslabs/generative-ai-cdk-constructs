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

import { expect as cdkExpect, haveResource } from '@aws-cdk/assert';
import * as cdk from 'aws-cdk-lib';
import { AwsSolutionsChecks } from 'cdk-nag';
import { FiltersConfigStrength, FiltersConfigType } from '../../../src/cdk-lib/bedrock/content-policy';
import { Guardrail, GuardrailProps } from '../../../src/cdk-lib/bedrock/guardrails';
import { General, PiiEntitiesConfigAction } from '../../../src/cdk-lib/bedrock/pii-list';
import { Topic } from '../../../src/cdk-lib/bedrock/topic-list';


describe('Guardrail', () => {
  test('creates a Guardrail with default properties', () => {
    const app = new cdk.App();
    cdk.Aspects.of(app).add(new AwsSolutionsChecks());
    const stack = new cdk.Stack(app);
    const guardrail = new Guardrail(stack, 'MyGuardrail', {
      name: 'my-guardrail',
    });

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Guardrail', {
        Name: 'my-guardrail',
        BlockedInputMessaging: 'Sorry, your query voilates our usage policy.',
        BlockedOutputsMessaging: 'Sorry, I am unable to answer your question because of our usage policy.',
      }),
    );

    expect(guardrail.name).toEqual('my-guardrail');
    expect(guardrail.kmsKeyArn).toBeDefined();
  });

  test('creates a Guardrail with custom properties', () => {
    const stack = new cdk.Stack();
    const guardrailProps: GuardrailProps = {
      name: 'my-custom-guardrail',
      blockedInputMessaging: 'Blocked input message',
      blockedOutputsMessaging: 'Blocked output message',
      filtersConfig: [
        {
          filtersConfigType: FiltersConfigType.HATE,
          inputStrength: FiltersConfigStrength.HIGH,
          outputStrength: FiltersConfigStrength.HIGH,
        },
      ],
      kmsKeyArn: 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012',
    };

    const guardrail = new Guardrail(stack, 'MyGuardrail', guardrailProps);

    guardrail.addSensitiveInformationPolicyConfig([{
      type: General.EMAIL,
      action: PiiEntitiesConfigAction.BLOCK,
    },
    {
      type: General.USERNAME,
      action: PiiEntitiesConfigAction.BLOCK,
    }], {
      name: 'CUSTOMER_ID',
      description: 'customer id',
      pattern: '/^[A-Z]{2}\d{6}$/',
      action: 'BLOCK',
    });

    const topic = new Topic(stack, 'my-topic');
    topic.financialAdviceTopic();

    guardrail.addTopicPolicyConfig(topic);

    guardrail.addWordPolicyConfig([{
      text: 'Let it be',
    }]);

    cdkExpect(stack).to(
      haveResource('AWS::Bedrock::Guardrail', {
        Name: 'my-custom-guardrail',
        BlockedInputMessaging: 'Blocked input message',
        BlockedOutputsMessaging: 'Blocked output message',
        KmsKeyArn: 'arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012',
        ContentPolicyConfig: {
          FiltersConfig: [
            {
              InputStrength: 'HIGH',
              OutputStrength: 'HIGH',
              Type: 'HATE',
            },
          ],
        },
        SensitiveInformationPolicyConfig: {
          PiiEntitiesConfig: [
            {
              Action: 'BLOCK',
              Type: 'EMAIL',
            },
            {
              Action: 'BLOCK',
              Type: 'USERNAME',
            },
          ],
          RegexesConfig: [
            {
              Action: 'BLOCK',
              Description: 'customer id',
              Name: 'CUSTOMER_ID',
              Pattern: '/^[A-Z]{2}d{6}$/',
            },
          ],
        },
        TopicPolicyConfig: {
          TopicsConfig: [
            {
              Definition: 'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.',
              Examples: ['Can you suggest some good stocks to invest in right now?',
                "What's the best way to save for retirement?",
                'Should I put my money in a high-risk investment?',
                'How can I maximize my returns on investments?',
                'Is it a good time to buy real estate?'],
              Name: 'Financial_Advice',
              Type: 'DENY',
            },

          ],
        },
        WordPolicyConfig: {
          ManagedWordListsConfig: [
            {
              Type: 'PROFANITY',
            },
          ],
          WordsConfig: [
            {
              Text: 'Let it be',
            },
          ],
        },
      }),
    );

    expect(guardrail.name).toEqual('my-custom-guardrail');
    expect(guardrail.kmsKeyArn).toEqual('arn:aws:kms:region:XXXXX:key/12345678-1234-1234-1234-123456789012');

  });
});
