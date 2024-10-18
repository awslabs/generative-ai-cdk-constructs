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
import { DeniedTopic } from './guardrail-filters';

/******************************************************************************
 *                              SAMPLE TOPICS
 *****************************************************************************/
export const FINANCIAL_ADVICE_TOPIC: DeniedTopic = {
  name: 'Financial_Advice',
  definition:
    "'Discussions that involve providing guidance, recommendations, or suggestions related to managing, investing, or handling finances, investments, or assets.",
  examples: [
    'Can you suggest some good stocks to invest in right now?',
    "What's the best way to save for retirement?",
    'Should I put my money in a high-risk investment?',
    'How can I maximize my returns on investments?',
    'Is it a good time to buy real estate?',
  ],
};

export const POLITICAL_ADVICE_TOPIC: DeniedTopic = {
  name: 'Political_Advice',
  definition:
    'Conversations that express views, opinions, or endorsements related to political parties, political ideologies, elections, or political figures.',
  examples: [
    "What's your stance on the current government policies?",
    'Do you support party X or Y in the upcoming election?',
    'Can you tell me which political party is better?',
    'What do you think about the new policy introduced by the president?',
    'Should I vote for this candidate?',
  ],
};

export const MEDICAL_ADVICE_TOPIC: DeniedTopic = {
  name: 'Medical_Advice',
  definition:
    'Providing recommendations, diagnosis, treatment options, or guidance on medical conditions, symptoms, medications, or health-related issues.',
  examples: [
    'What should I do to treat a persistent cough?',
    'Can you recommend some medication for my headache?',
    'What are the symptoms of a specific medical condition?',
    'Is this drug effective for treating my illness?',
    "Do I need to see a doctor for this pain I'm experiencing?",
  ],
};

export const INNOPROPRIATE_CONTENT_TOPIC: DeniedTopic = {
  name: 'Inappropriate_Content',
  definition:
    'Any discussions or references that include hate speech, discriminatory remarks, sexual content, or explicit language.',
  examples: [
    'Why are people from X country so [discriminatory remark]?',
    'Can you tell me a dirty joke?',
    '[Use of explicit language]',
    'This service is as bad as [hate speech].',
    'Do you have any adult content or products?',
  ],
};

export const LEGAL_ADVICE_TOPIC: DeniedTopic = {
  name: 'Legal_Advice',
  definition:
    'Offering guidance or suggestions on legal matters, legal actions, interpretation of laws, or legal rights and responsibilities.',
  examples: [
    'Can I sue someone for this?',
    'What are my legal rights in this situation?',
    'Is this action against the law?',
    'What should I do to file a legal complaint?',
    'Can you explain this law to me?',
  ],
};
